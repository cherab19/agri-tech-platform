from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _

from apps.users.models import (
    CustomUser,
    FarmerProfile,
    VendorProfile,
    DriverProfile,
    AdminProfile,
)


class FarmerProfileInline(admin.StackedInline):
    model = FarmerProfile
    can_delete = False
    verbose_name_plural = _('Farmer Profile')
    fk_name = 'user'


class VendorProfileInline(admin.StackedInline):
    model = VendorProfile
    can_delete = False
    verbose_name_plural = _('Vendor Profile')
    fk_name = 'user'


class DriverProfileInline(admin.StackedInline):
    model = DriverProfile
    can_delete = False
    verbose_name_plural = _('Driver Profile')
    fk_name = 'user'


class AdminProfileInline(admin.StackedInline):
    model = AdminProfile
    can_delete = False
    verbose_name_plural = _('Admin Profile')
    fk_name = 'user'


@admin.register(CustomUser)
class CustomUserAdmin(BaseUserAdmin):
    list_display = [
        'username', 'email', 'phone_number', 'user_type', 
        'is_verified', 'is_active', 'created_at'
    ]
    list_filter = [
        'user_type', 'is_verified', 'is_active', 'is_staff', 
        'language_preference', 'created_at'
    ]
    search_fields = [
        'username', 'email', 'phone_number', 'first_name', 'last_name'
    ]
    ordering = ['-created_at']
    readonly_fields = ['created_at', 'updated_at', 'last_login']
    
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        (_('Personal Info'), {
            'fields': (
                'first_name', 'last_name', 'email', 'phone_number',
                'language_preference'
            )
        }),
        (_('Permissions'), {
            'fields': (
                'user_type', 'is_verified', 'is_active', 'is_staff', 
                'is_superuser', 'groups', 'user_permissions'
            )
        }),
        (_('Important dates'), {
            'fields': ('last_login', 'date_joined', 'created_at', 'updated_at')
        }),
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': (
                'username', 'email', 'phone_number', 'user_type',
                'password1', 'password2', 'language_preference'
            ),
        }),
    )
    
    def get_inline_instances(self, request, obj=None):
        """Show appropriate inline based on user type"""
        if not obj:
            return []
        
        inline_map = {
            'FARMER': FarmerProfileInline,
            'VENDOR': VendorProfileInline,
            'DRIVER': DriverProfileInline,
            'ADMIN': AdminProfileInline,
        }
        
        inline_class = inline_map.get(obj.user_type)
        if inline_class:
            return [inline_class(self.model, self.admin_site)]
        
        return []


@admin.register(FarmerProfile)
class FarmerProfileAdmin(admin.ModelAdmin):
    list_display = [
        'cooperative_name', 'user', 'cooperative_type', 'region',
        'total_members', 'is_active', 'rating', 'total_sales'
    ]
    list_filter = ['cooperative_type', 'region', 'is_active', 'created_at']
    search_fields = [
        'cooperative_name', 'registration_number', 'user__username',
        'user__phone_number'
    ]
    readonly_fields = ['created_at', 'updated_at', 'rating', 'total_sales']
    
    fieldsets = (
        (None, {'fields': ('user',)}),
        (_('Cooperative Information'), {
            'fields': (
                'cooperative_name', 'cooperative_type', 'registration_number',
                'total_members'
            )
        }),
        (_('Location'), {
            'fields': (
                'region', 'zone', 'woreda', 'kebele',
                'latitude', 'longitude'
            )
        }),
        (_('Financial'), {
            'fields': (
                'bank_name', 'bank_account_number', 'total_sales'
            )
        }),
        (_('Status'), {
            'fields': ('is_active', 'rating')
        }),
        (_('Metadata'), {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(VendorProfile)
class VendorProfileAdmin(admin.ModelAdmin):
    list_display = [
        'business_name', 'user', 'business_type', 'city',
        'is_active', 'credit_limit', 'current_balance'
    ]
    list_filter = ['business_type', 'region', 'city', 'is_active', 'created_at']
    search_fields = [
        'business_name', 'tin_number', 'contact_person',
        'user__username', 'user__phone_number'
    ]
    readonly_fields = ['created_at', 'updated_at', 'current_balance']
    
    fieldsets = (
        (None, {'fields': ('user',)}),
        (_('Business Information'), {
            'fields': (
                'business_name', 'business_type', 'tin_number',
                'contact_person', 'business_license_number'
            )
        }),
        (_('Location'), {
            'fields': (
                'region', 'city', 'sub_city', 'woreda', 'kebele',
                'house_number', 'latitude', 'longitude'
            )
        }),
        (_('Financial'), {
            'fields': ('credit_limit', 'current_balance')
        }),
        (_('Status'), {
            'fields': ('is_active',)
        }),
        (_('Metadata'), {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(DriverProfile)
class DriverProfileAdmin(admin.ModelAdmin):
    list_display = [
        'user', 'driver_id', 'vehicle_type', 'vehicle_plate_number',
        'is_available', 'is_verified', 'rating', 'total_deliveries'
    ]
    list_filter = [
        'vehicle_type', 'region', 'is_available', 'is_verified',
        'created_at'
    ]
    search_fields = [
        'driver_id', 'vehicle_plate_number', 'license_number',
        'user__username', 'user__phone_number'
    ]
    readonly_fields = [
        'created_at', 'updated_at', 'rating', 
        'total_deliveries', 'total_earnings'
    ]
    
    fieldsets = (
        (None, {'fields': ('user',)}),
        (_('Driver Information'), {
            'fields': ('driver_id',)
        }),
        (_('Vehicle Information'), {
            'fields': (
                'vehicle_type', 'vehicle_plate_number', 'vehicle_capacity_kg'
            )
        }),
        (_('License Information'), {
            'fields': (
                'license_number', 'license_type', 'license_expiry_date'
            )
        }),
        (_('Location'), {
            'fields': ('region', 'city')
        }),
        (_('Contact Information'), {
            'fields': (
                'phone_number_2', 'emergency_contact_name',
                'emergency_contact_phone'
            )
        }),
        (_('Financial'), {
            'fields': (
                'bank_name', 'bank_account_number', 'total_earnings'
            )
        }),
        (_('Status'), {
            'fields': (
                'is_available', 'is_verified', 'rating', 'total_deliveries'
            )
        }),
        (_('Metadata'), {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(AdminProfile)
class AdminProfileAdmin(admin.ModelAdmin):
    list_display = [
        'user', 'admin_role', 'employee_id', 'department',
        'is_active', 'login_count'
    ]
    list_filter = ['admin_role', 'department', 'is_active', 'created_at']
    search_fields = [
        'employee_id', 'department', 'user__username', 'user__email'
    ]
    readonly_fields = [
        'created_at', 'updated_at', 'last_login_ip', 'login_count'
    ]
    
    fieldsets = (
        (None, {'fields': ('user',)}),
        (_('Admin Information'), {
            'fields': (
                'admin_role', 'employee_id', 'department'
            )
        }),
        (_('Permissions'), {
            'fields': (
                'can_manage_users', 'can_manage_finances',
                'can_manage_operations', 'can_view_reports',
                'can_configure_system'
            )
        }),
        (_('Status'), {
            'fields': ('is_active',)
        }),
        (_('Login Information'), {
            'fields': ('last_login_ip', 'login_count')
        }),
        (_('Metadata'), {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )