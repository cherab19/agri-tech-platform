from rest_framework import serializers
from django.utils.translation import gettext_lazy as _

from apps.products.models import Category


class CategorySerializer(serializers.ModelSerializer):
    """Basic category serializer"""
    active_products_count = serializers.IntegerField(read_only=True)
    has_subcategories = serializers.BooleanField(read_only=True)
    
    class Meta:
        model = Category
        fields = [
            'id', 'name', 'name_am', 'name_om', 'name_so',
            'description', 'description_am', 'description_om', 'description_so',
            'image', 'is_active', 'parent', 'order',
            'active_products_count', 'has_subcategories',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class CategoryDetailSerializer(CategorySerializer):
    """Detailed category serializer with subcategories"""
    subcategories = CategorySerializer(many=True, read_only=True)
    parent_name = serializers.CharField(
        source='parent.name',
        read_only=True
    )
    
    class Meta(CategorySerializer.Meta):
        fields = CategorySerializer.Meta.fields + ['subcategories', 'parent_name']


class CategoryCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating categories"""
    
    class Meta:
        model = Category
        fields = [
            'name', 'name_am', 'name_om', 'name_so',
            'description', 'description_am', 'description_om', 'description_so',
            'image', 'parent', 'order', 'is_active'
        ]
    
    def validate_name(self, value):
        """Validate that category name is unique"""
        if Category.objects.filter(name=value).exists():
            raise serializers.ValidationError(
                _("A category with this name already exists.")
            )
        return value
    
    def validate_parent(self, value):
        """Validate that parent category is not itself"""
        if value and value == self.instance:
            raise serializers.ValidationError(
                _("A category cannot be its own parent.")
            )
        return value