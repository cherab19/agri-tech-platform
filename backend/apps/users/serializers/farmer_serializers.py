from rest_framework import serializers
from django.utils.translation import gettext_lazy as _
from apps.users.models import FarmerProfile, CustomUser
from .user_serializers import UserRegistrationSerializer, CustomUserSerializer


class FarmerProfileSerializer(serializers.ModelSerializer):
    """Serializer for FarmerProfile model"""
    user = CustomUserSerializer(read_only=True)
    cooperative_type_display = serializers.CharField(
        source='get_cooperative_type_display',
        read_only=True
    )
    full_address = serializers.CharField(read_only=True)
    
    class Meta:
        model = FarmerProfile
        fields = [
            'id', 'user', 'cooperative_name', 'cooperative_type',
            'cooperative_type_display', 'registration_number',
            'total_members', 'region', 'zone', 'woreda', 'kebele',
            'latitude', 'longitude', 'full_address', 'bank_name',
            'bank_account_number', 'is_active', 'rating', 'total_sales',
            'created_at', 'updated_at'
        ]
        read_only_fields = [
            'id', 'user', 'rating', 'total_sales', 
            'created_at', 'updated_at'
        ]


class FarmerRegistrationSerializer(UserRegistrationSerializer):
    """Serializer for farmer registration including profile data"""
    cooperative_name = serializers.CharField(required=True, max_length=255)
    cooperative_type = serializers.ChoiceField(
        choices=FarmerProfile.COOPERATIVE_TYPES,
        required=True
    )
    registration_number = serializers.CharField(required=True, max_length=50)
    total_members = serializers.IntegerField(required=True, min_value=1)
    region = serializers.CharField(required=True, max_length=100)
    zone = serializers.CharField(required=False, allow_blank=True, max_length=100)
    woreda = serializers.CharField(required=True, max_length=100)
    kebele = serializers.CharField(required=True, max_length=100)
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
    bank_name = serializers.CharField(required=False, allow_blank=True, max_length=100)
    bank_account_number = serializers.CharField(
        required=False, 
        allow_blank=True, 
        max_length=50
    )
    
    class Meta(UserRegistrationSerializer.Meta):
        fields = UserRegistrationSerializer.Meta.fields + [
            'cooperative_name', 'cooperative_type', 'registration_number',
            'total_members', 'region', 'zone', 'woreda', 'kebele',
            'latitude', 'longitude', 'bank_name', 'bank_account_number'
        ]
    
    def create(self, validated_data):
        """Create farmer user and profile"""
        # Extract profile data
        profile_data = {
            'cooperative_name': validated_data.pop('cooperative_name'),
            'cooperative_type': validated_data.pop('cooperative_type'),
            'registration_number': validated_data.pop('registration_number'),
            'total_members': validated_data.pop('total_members'),
            'region': validated_data.pop('region'),
            'zone': validated_data.pop('zone', ''),
            'woreda': validated_data.pop('woreda'),
            'kebele': validated_data.pop('kebele'),
            'latitude': validated_data.pop('latitude', None),
            'longitude': validated_data.pop('longitude', None),
            'bank_name': validated_data.pop('bank_name', ''),
            'bank_account_number': validated_data.pop('bank_account_number', ''),
        }
        
        # Set user type to FARMER
        validated_data['user_type'] = 'FARMER'
        
        # Create user
        user = super().create(validated_data)
        
        # Create farmer profile
        FarmerProfile.objects.create(user=user, **profile_data)
        
        return user