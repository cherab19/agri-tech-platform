from rest_framework import serializers
from django.utils.translation import gettext_lazy as _
from apps.users.models import AdminProfile
from .user_serializers import UserRegistrationSerializer, CustomUserSerializer


class AdminProfileSerializer(serializers.ModelSerializer):
    """Serializer for AdminProfile model"""
    user = CustomUserSerializer(read_only=True)
    admin_role_display = serializers.CharField(
        source='get_admin_role_display',
        read_only=True
    )
    
    class Meta:
        model = AdminProfile
        fields = [
            'id', 'user', 'admin_role', 'admin_role_display',
            'employee_id', 'department', 'can_manage_users',
            'can_manage_finances', 'can_manage_operations',
            'can_view_reports', 'can_configure_system', 'is_active',
            'last_login_ip', 'login_count', 'created_at', 'updated_at'
        ]
        read_only_fields = [
            'id', 'user', 'last_login_ip', 'login_count',
            'created_at', 'updated_at'
        ]


class AdminRegistrationSerializer(UserRegistrationSerializer):
    """Serializer for admin registration including profile data"""
    admin_role = serializers.ChoiceField(
        choices=AdminProfile.ADMIN_ROLES,
        required=True
    )
    employee_id = serializers.CharField(required=True, max_length=50)
    department = serializers.CharField(required=True, max_length=100)
    can_manage_users = serializers.BooleanField(default=False)
    can_manage_finances = serializers.BooleanField(default=False)
    can_manage_operations = serializers.BooleanField(default=False)
    can_view_reports = serializers.BooleanField(default=True)
    can_configure_system = serializers.BooleanField(default=False)
    
    class Meta(UserRegistrationSerializer.Meta):
        fields = UserRegistrationSerializer.Meta.fields + [
            'admin_role', 'employee_id', 'department', 'can_manage_users',
            'can_manage_finances', 'can_manage_operations', 'can_view_reports',
            'can_configure_system'
        ]
    
    def create(self, validated_data):
        """Create admin user and profile"""
        # Extract profile data
        profile_data = {
            'admin_role': validated_data.pop('admin_role'),
            'employee_id': validated_data.pop('employee_id'),
            'department': validated_data.pop('department'),
            'can_manage_users': validated_data.pop('can_manage_users'),
            'can_manage_finances': validated_data.pop('can_manage_finances'),
            'can_manage_operations': validated_data.pop('can_manage_operations'),
            'can_view_reports': validated_data.pop('can_view_reports'),
            'can_configure_system': validated_data.pop('can_configure_system'),
        }
        
        # Set user type to ADMIN
        validated_data['user_type'] = 'ADMIN'
        
        # Create user
        user = super().create(validated_data)
        
        # Create admin profile
        AdminProfile.objects.create(user=user, **profile_data)
        
        return user