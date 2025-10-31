from rest_framework import serializers
from django.contrib.auth import authenticate
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.password_validation import validate_password
from apps.users.models import CustomUser


class CustomUserSerializer(serializers.ModelSerializer):
    """Serializer for CustomUser model"""
    user_type_display = serializers.CharField(
        source='get_user_type_display', 
        read_only=True
    )
    
    class Meta:
        model = CustomUser
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name',
            'user_type', 'user_type_display', 'phone_number',
            'language_preference', 'is_verified', 'is_active',
            'date_joined', 'last_login', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'date_joined', 'last_login', 'created_at', 'updated_at']


class UserRegistrationSerializer(serializers.ModelSerializer):
    """Serializer for user registration"""
    password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[validate_password],
        style={'input_type': 'password'}
    )
    password_confirm = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'}
    )
    
    class Meta:
        model = CustomUser
        fields = [
            'username', 'email', 'first_name', 'last_name',
            'phone_number', 'user_type', 'language_preference',
            'password', 'password_confirm'
        ]
    
    def validate(self, attrs):
        """Validate that passwords match"""
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError({
                "password_confirm": _("Passwords do not match.")
            })
        
        # Validate phone number uniqueness
        if CustomUser.objects.filter(phone_number=attrs['phone_number']).exists():
            raise serializers.ValidationError({
                "phone_number": _("A user with this phone number already exists.")
            })
        
        return attrs
    
    def create(self, validated_data):
        """Create a new user"""
        validated_data.pop('password_confirm')
        password = validated_data.pop('password')
        
        user = CustomUser.objects.create_user(
            **validated_data,
            password=password
        )
        
        return user


class UserLoginSerializer(serializers.Serializer):
    """Serializer for user login"""
    username = serializers.CharField(required=True)
    password = serializers.CharField(
        required=True,
        style={'input_type': 'password'}
    )
    user_type = serializers.ChoiceField(
        choices=CustomUser.USER_TYPES,
        required=False
    )
    
    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')
        user_type = attrs.get('user_type')
        
        if username and password:
            user = authenticate(
                request=self.context.get('request'),
                username=username,
                password=password
            )
            
            if not user:
                raise serializers.ValidationError(
                    _('Unable to log in with provided credentials.'),
                    code='authorization'
                )
            
            if not user.is_active:
                raise serializers.ValidationError(
                    _('User account is disabled.'),
                    code='authorization'
                )
            
            # Validate user type if provided
            if user_type and user.user_type != user_type:
                raise serializers.ValidationError(
                    _('Invalid user type for this account.'),
                    code='authorization'
                )
            
            attrs['user'] = user
        else:
            raise serializers.ValidationError(
                _('Must include "username" and "password".'),
                code='authorization'
            )
        
        return attrs


class UserProfileSerializer(serializers.ModelSerializer):
    """Serializer for user profile"""
    profile_data = serializers.SerializerMethodField()
    
    class Meta:
        model = CustomUser
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name',
            'user_type', 'phone_number', 'language_preference',
            'is_verified', 'is_active', 'date_joined', 'last_login',
            'profile_data'
        ]
        read_only_fields = ['id', 'user_type', 'date_joined', 'last_login']
    
    def get_profile_data(self, obj):
        """Get profile data based on user type"""
        profile = obj.get_profile()
        if profile:
            from . import (
                FarmerProfileSerializer,
                VendorProfileSerializer,
                DriverProfileSerializer,
                AdminProfileSerializer
            )
            
            serializer_map = {
                'FARMER': FarmerProfileSerializer,
                'VENDOR': VendorProfileSerializer,
                'DRIVER': DriverProfileSerializer,
                'ADMIN': AdminProfileSerializer,
            }
            
            serializer_class = serializer_map.get(obj.user_type)
            if serializer_class:
                return serializer_class(profile).data
        
        return None


class PasswordChangeSerializer(serializers.Serializer):
    """Serializer for password change"""
    old_password = serializers.CharField(
        required=True,
        style={'input_type': 'password'}
    )
    new_password = serializers.CharField(
        required=True,
        validators=[validate_password],
        style={'input_type': 'password'}
    )
    new_password_confirm = serializers.CharField(
        required=True,
        style={'input_type': 'password'}
    )
    
    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError(_("Old password is not correct."))
        return value
    
    def validate(self, attrs):
        if attrs['new_password'] != attrs['new_password_confirm']:
            raise serializers.ValidationError({
                "new_password_confirm": _("Passwords do not match.")
            })
        return attrs
    
    def save(self, **kwargs):
        user = self.context['request'].user
        user.set_password(self.validated_data['new_password'])
        user.save()
        return user