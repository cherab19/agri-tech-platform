from django.db import models
from django.utils.translation import gettext_lazy as _
from django.conf import settings


class AdminProfile(models.Model):
    ADMIN_ROLES = (
        ('SUPER_ADMIN', _('Super Administrator')),
        ('FINANCE_MANAGER', _('Finance Manager')),
        ('OPERATIONS_MANAGER', _('Operations Manager')),
        ('SUPPORT_STAFF', _('Support Staff')),
    )
    
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='adminprofile',
        verbose_name=_('User')
    )
    admin_role = models.CharField(
        max_length=20,
        choices=ADMIN_ROLES,
        verbose_name=_('Admin Role')
    )
    employee_id = models.CharField(
        max_length=50,
        unique=True,
        verbose_name=_('Employee ID')
    )
    department = models.CharField(
        max_length=100,
        verbose_name=_('Department')
    )
    can_manage_users = models.BooleanField(
        default=False,
        verbose_name=_('Can Manage Users')
    )
    can_manage_finances = models.BooleanField(
        default=False,
        verbose_name=_('Can Manage Finances')
    )
    can_manage_operations = models.BooleanField(
        default=False,
        verbose_name=_('Can Manage Operations')
    )
    can_view_reports = models.BooleanField(
        default=True,
        verbose_name=_('Can View Reports')
    )
    can_configure_system = models.BooleanField(
        default=False,
        verbose_name=_('Can Configure System')
    )
    is_active = models.BooleanField(
        default=True,
        verbose_name=_('Is Active')
    )
    last_login_ip = models.GenericIPAddressField(
        null=True, 
        blank=True,
        verbose_name=_('Last Login IP')
    )
    login_count = models.PositiveIntegerField(
        default=0,
        verbose_name=_('Login Count')
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name=_('Created At')
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name=_('Updated At')
    )
    
    class Meta:
        db_table = 'admin_profiles'
        verbose_name = _('Admin Profile')
        verbose_name_plural = _('Admin Profiles')
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.user.username} - {self.get_admin_role_display()}"
    
    def has_permission(self, permission_type):
        """Check if admin has specific permission"""
        permission_map = {
            'manage_users': self.can_manage_users,
            'manage_finances': self.can_manage_finances,
            'manage_operations': self.can_manage_operations,
            'view_reports': self.can_view_reports,
            'configure_system': self.can_configure_system,
        }
        return permission_map.get(permission_type, False)