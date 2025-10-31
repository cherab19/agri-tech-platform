from rest_framework import serializers
from django.utils.translation import gettext_lazy as _
from django.utils import timezone

from apps.products.models import Product, Category
from apps.users.serializers import FarmerProfileSerializer
from .category_serializers import CategorySerializer


class ProductSerializer(serializers.ModelSerializer):
    """Basic product serializer"""
    farmer_cooperative_name = serializers.CharField(read_only=True)
    farmer_region = serializers.CharField(read_only=True)
    is_available = serializers.BooleanField(read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    
    class Meta:
        model = Product
        fields = [
            'id', 'farmer', 'farmer_cooperative_name', 'farmer_region',
            'category', 'category_name', 'name', 'name_am', 'name_om', 'name_so',
            'description', 'description_am', 'description_om', 'description_so',
            'price', 'unit', 'quality_grade', 'min_order_quantity',
            'max_order_quantity', 'available_quantity', 'image', 'images',
            'is_organic', 'is_active', 'is_approved', 'is_available',
            'rating', 'review_count', 'total_sold', 'tags',
            'harvest_date', 'expiry_date', 'storage_instructions',
            'created_at', 'updated_at'
        ]
        read_only_fields = [
            'id', 'farmer_cooperative_name', 'farmer_region', 'is_available',
            'rating', 'review_count', 'total_sold', 'created_at', 'updated_at'
        ]


class ProductDetailSerializer(ProductSerializer):
    """Detailed product serializer with farmer information"""
    farmer_profile = serializers.SerializerMethodField()
    category_details = CategorySerializer(source='category', read_only=True)
    
    class Meta(ProductSerializer.Meta):
        fields = ProductSerializer.Meta.fields + ['farmer_profile', 'category_details']
    
    def get_farmer_profile(self, obj):
        """Get farmer profile data"""
        farmer_profile = obj.farmer.get_profile()
        if farmer_profile:
            return FarmerProfileSerializer(farmer_profile).data
        return None


class ProductListSerializer(serializers.ModelSerializer):
    """Serializer for product listing (optimized for lists)"""
    farmer_cooperative_name = serializers.CharField(read_only=True)
    farmer_region = serializers.CharField(read_only=True)
    is_available = serializers.BooleanField(read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    
    class Meta:
        model = Product
        fields = [
            'id', 'farmer_cooperative_name', 'farmer_region',
            'category', 'category_name', 'name', 'name_am', 'name_om', 'name_so',
            'price', 'unit', 'quality_grade', 'min_order_quantity',
            'available_quantity', 'image', 'is_organic', 'is_available',
            'rating', 'review_count', 'created_at'
        ]
        read_only_fields = fields


class ProductCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating products"""
    
    class Meta:
        model = Product
        fields = [
            'category', 'name', 'name_am', 'name_om', 'name_so',
            'description', 'description_am', 'description_om', 'description_so',
            'price', 'unit', 'quality_grade', 'min_order_quantity',
            'max_order_quantity', 'available_quantity', 'image', 'images',
            'is_organic', 'tags', 'harvest_date', 'expiry_date',
            'storage_instructions'
        ]
    
    def validate_price(self, value):
        """Validate price is positive"""
        if value <= 0:
            raise serializers.ValidationError(
                _("Price must be greater than zero.")
            )
        return value
    
    def validate_available_quantity(self, value):
        """Validate available quantity is non-negative"""
        if value < 0:
            raise serializers.ValidationError(
                _("Available quantity cannot be negative.")
            )
        return value
    
    def validate_harvest_date(self, value):
        """Validate harvest date is not in the future"""
        if value and value > timezone.now().date():
            raise serializers.ValidationError(
                _("Harvest date cannot be in the future.")
            )
        return value
    
    def validate_expiry_date(self, value):
        """Validate expiry date is after harvest date"""
        harvest_date = self.initial_data.get('harvest_date')
        if value and harvest_date and value <= harvest_date:
            raise serializers.ValidationError(
                _("Expiry date must be after harvest date.")
            )
        return value
    
    def create(self, validated_data):
        """Create product with current farmer as owner"""
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            validated_data['farmer'] = request.user
        
        return super().create(validated_data)


class ProductUpdateSerializer(serializers.ModelSerializer):
    """Serializer for updating products"""
    
    class Meta:
        model = Product
        fields = [
            'category', 'name', 'name_am', 'name_om', 'name_so',
            'description', 'description_am', 'description_om', 'description_so',
            'price', 'unit', 'quality_grade', 'min_order_quantity',
            'max_order_quantity', 'available_quantity', 'image', 'images',
            'is_organic', 'is_active', 'tags', 'harvest_date', 'expiry_date',
            'storage_instructions'
        ]
    
    def validate_available_quantity(self, value):
        """Validate available quantity is non-negative"""
        if value < 0:
            raise serializers.ValidationError(
                _("Available quantity cannot be negative.")
            )
        return value
    
    def update(self, instance, validated_data):
        """Update product and create inventory record if quantity changes"""
        old_quantity = instance.available_quantity
        new_quantity = validated_data.get('available_quantity', old_quantity)
        
        # Update the product
        product = super().update(instance, validated_data)
        
        # Create inventory record if quantity changed
        if old_quantity != new_quantity:
            from apps.products.models import Inventory
            
            Inventory.objects.create(
                product=product,
                transaction_type='ADJUSTMENT',
                quantity=new_quantity,
                previous_quantity=old_quantity,
                reason='Manual quantity adjustment',
                created_by=self.context.get('request').user
            )
        
        return product