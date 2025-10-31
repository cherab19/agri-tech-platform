from rest_framework import serializers
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from apps.users.models import DriverProfile
from .user_serializers import UserRegistrationSerializer, CustomUserSerializer


class DriverProfileSerializer(serializers.ModelSerializer):
    """Serializer for DriverProfile model"""
    user = CustomUserSerializer(read_only=True)
    vehicle_type_display = serializers.CharField(
        source='get_vehicle_type_display',
        read_only=True
    )
    license_type_display = serializers.CharField(
        source='get_license_type_display',
        read_only=True
    )
    is_license_valid = serializers.BooleanField(read_only=True)
    
    class Meta:
        model = DriverProfile
        fields = [
            'id', 'user', 'driver_id', 'vehicle_type', 'vehicle_type_display',
            'vehicle_plate_number', 'vehicle_capacity_kg', 'license_number',
            'license_type', 'license_type_display', 'license_expiry_date',
            'is_license_valid', 'region', 'city', 'phone_number_2',
            'emergency_contact_name', 'emergency_contact_phone', 'is_available',
            'is_verified', 'rating', 'total_deliveries', 'total_earnings',
            'bank_name', 'bank_account_number', 'created_at', 'updated_at'
        ]
        read_only_fields = [
            'id', 'user', 'rating', 'total_deliveries', 'total_earnings',
            'created_at', 'updated_at'
        ]
    
    def validate_license_expiry_date(self, value):
        """Validate that license expiry date is in the future"""
        if value <= timezone.now().date():
            raise serializers.ValidationError(
                _("License expiry date must be in the future.")
            )
        return value


class DriverRegistrationSerializer(UserRegistrationSerializer):
    """Serializer for driver registration including profile data"""
    driver_id = serializers.CharField(required=True, max_length=50)
    vehicle_type = serializers.ChoiceField(
        choices=DriverProfile.VEHICLE_TYPES,
        required=True
    )
    vehicle_plate_number = serializers.CharField(required=True, max_length=20)
    vehicle_capacity_kg = serializers.IntegerField(required=True, min_value=1)
    license_number = serializers.CharField(required=True, max_length=50)
    license_type = serializers.ChoiceField(
        choices=DriverProfile.LICENSE_TYPES,
        required=True
    )
    license_expiry_date = serializers.DateField(required=True)
    region = serializers.CharField(required=True, max_length=100)
    city = serializers.CharField(required=True, max_length=100)
    phone_number_2 = serializers.CharField(required=False, allow_blank=True, max_length=15)
    emergency_contact_name = serializers.CharField(
        required=False, 
        allow_blank=True, 
        max_length=255
    )
    emergency_contact_phone = serializers.CharField(
        required=False, 
        allow_blank=True, 
        max_length=15
    )
    bank_name = serializers.CharField(required=False, allow_blank=True, max_length=100)
    bank_account_number = serializers.CharField(
        required=False, 
        allow_blank=True, 
        max_length=50
    )
    
    class Meta(UserRegistrationSerializer.Meta):
        fields = UserRegistrationSerializer.Meta.fields + [
            'driver_id', 'vehicle_type', 'vehicle_plate_number',
            'vehicle_capacity_kg', 'license_number', 'license_type',
            'license_expiry_date', 'region', 'city', 'phone_number_2',
            'emergency_contact_name', 'emergency_contact_phone',
            'bank_name', 'bank_account_number'
        ]
    
    def create(self, validated_data):
        """Create driver user and profile"""
        # Extract profile data
        profile_data = {
            'driver_id': validated_data.pop('driver_id'),
            'vehicle_type': validated_data.pop('vehicle_type'),
            'vehicle_plate_number': validated_data.pop('vehicle_plate_number'),
            'vehicle_capacity_kg': validated_data.pop('vehicle_capacity_kg'),
            'license_number': validated_data.pop('license_number'),
            'license_type': validated_data.pop('license_type'),
            'license_expiry_date': validated_data.pop('license_expiry_date'),
            'region': validated_data.pop('region'),
            'city': validated_data.pop('city'),
            'phone_number_2': validated_data.pop('phone_number_2', ''),
            'emergency_contact_name': validated_data.pop('emergency_contact_name', ''),
            'emergency_contact_phone': validated_data.pop('emergency_contact_phone', ''),
            'bank_name': validated_data.pop('bank_name', ''),
            'bank_account_number': validated_data.pop('bank_account_number', ''),
        }
        
        # Set user type to DRIVER
        validated_data['user_type'] = 'DRIVER'
        
        # Create user
        user = super().create(validated_data)
        
        # Create driver profile
        DriverProfile.objects.create(user=user, **profile_data)
        
        return user