from rest_framework import permissions
from django.utils.translation import gettext_lazy as _


class IsAdminUser(permissions.BasePermission):
    """Check if user is an administrator"""
    
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.user_type == 'ADMIN'


class IsFarmerUser(permissions.BasePermission):
    """Check if user is a farmer cooperative"""
    
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.user_type == 'FARMER'


class IsVendorUser(permissions.BasePermission):
    """Check if user is a vendor cooperative"""
    
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.user_type == 'VENDOR'


class IsDriverUser(permissions.BasePermission):
    """Check if user is a truck driver"""
    
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.user_type == 'DRIVER'


class IsStaffUser(permissions.BasePermission):
    """Check if user is system staff"""
    
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.user_type == 'STAFF'


class IsOwnerOrAdmin(permissions.BasePermission):
    """Check if user is owner of the resource or admin"""
    
    def has_object_permission(self, request, view, obj):
        # Admin can access any object
        if request.user.user_type == 'ADMIN':
            return True
        
        # User can access their own objects
        if hasattr(obj, 'user'):
            return obj.user == request.user
        elif hasattr(obj, 'id'):
            return obj.id == request.user.id
        
        return False


class IsAdminOrReadOnly(permissions.BasePermission):
    """Allow read-only access to all, but write only to admin"""
    
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        
        return request.user.is_authenticated and request.user.user_type == 'ADMIN'


class HasAdminPermission(permissions.BasePermission):
    """Check if admin has specific permission"""
    
    def __init__(self, permission_type):
        self.permission_type = permission_type
    
    def has_permission(self, request, view):
        if not request.user.is_authenticated or request.user.user_type != 'ADMIN':
            return False
        
        admin_profile = request.user.get_profile()
        if not admin_profile:
            return False
        
        return admin_profile.has_permission(self.permission_type)