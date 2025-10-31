from rest_framework import serializers
from django.utils.translation import gettext_lazy as _
from apps.users.models import VendorProfile
from .user_serializers import UserRegistrationSerializer, CustomUserSerializer


class VendorProfileSerializer(serializers.ModelSerializer):
    """Serializer for VendorProfile model"""
    user = CustomUserSerializer(read_only=True)
    business_type_display = serializers.CharField(
        source='get_business_type_display',
        read_only=True
    )
    full_address = serializers.CharField(read_only=True)
    
    class Meta:
        model = VendorProfile
        fields = [
            'id', 'user', 'business_name', 'business_type',
            'business_type_display', 'tin_number', 'contact_person',
            'region', 'city', 'sub_city', 'woreda', 'kebele',
            'house_number', 'latitude', 'longitude', 'full_address',
            'business_license_number', 'is_active', 'credit_limit',
            'current_balance', 'created_at', 'updated_at'
        ]
        read_only_fields = [
            'id', 'user', 'current_balance', 'created_at', 'updated_at'
        ]


class VendorRegistrationSerializer(UserRegistrationSerializer):
    """Serializer for vendor registration including profile data"""
    business_name = serializers.CharField(required=True, max_length=255)
    business_type = serializers.ChoiceField(
        choices=VendorProfile.BUSINESS_TYPES,
        required=True
    )
    tin_number = serializers.CharField(required=True, max_length=50)
    contact_person = serializers.CharField(required=True, max_length=255)
    region = serializers.CharField(required=True, max_length=100)
    city = serializers.CharField(required=True, max_length=100)
    sub_city = serializers.CharField(required=True, max_length=100)
    woreda = serializers.CharField(required=True, max_length=100)
    kebele = serializers.CharField(required=True, max_length=100)
    house_number = serializers.CharField(required=False, allow_blank=True, max_length=50)
    latitude = serializers.DecimalField(
        required=False, 
        max_digits=9, 
        decimal_places=6,
        allow_null=True
    )
    longitude = serializers.DecimalField(
        required=False, 
        max_digits=9, 
        decimal_places=6,
        allow_null=True
    )
    business_license_number = serializers.CharField(
        required=False, 
        allow_blank=True, 
        max_length=100
    )
    
    class Meta(UserRegistrationSerializer.Meta):
        fields = UserRegistrationSerializer.Meta.fields + [
            'business_name', 'business_type', 'tin_number', 'contact_person',
            'region', 'city', 'sub_city', 'woreda', 'kebele', 'house_number',
            'latitude', 'longitude', 'business_license_number'
        ]
    
    def create(self, validated_data):
        """Create vendor user and profile"""
        # Extract profile data
        profile_data = {
            'business_name': validated_data.pop('business_name'),
            'business_type': validated_data.pop('business_type'),
            'tin_number': validated_data.pop('tin_number'),
            'contact_person': validated_data.pop('contact_person'),
            'region': validated_data.pop('region'),
            'city': validated_data.pop('city'),
            'sub_city': validated_data.pop('sub_city'),
            'woreda': validated_data.pop('woreda'),
            'kebele': validated_data.pop('kebele'),
            'house_number': validated_data.pop('house_number', ''),
            'latitude': validated_data.pop('latitude', None),
            'longitude': validated_data.pop('longitude', None),
            'business_license_number': validated_data.pop('business_license_number', ''),
        }
        
        # Set user type to VENDOR
        validated_data['user_type'] = 'VENDOR'
        
        # Create user
        user = super().create(validated_data)
        
        # Create vendor profile
        VendorProfile.objects.create(user=user, **profile_data)
        
        return user