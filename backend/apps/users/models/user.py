from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.apps import apps


class CustomUser(AbstractUser):
    USER_TYPES = (
        ('FARMER', _('Farmer Cooperative')),
        ('VENDOR', _('Vendor Cooperative')),
        ('DRIVER', _('Truck Driver')),
        ('STAFF', _('System Staff')),
        ('ADMIN', _('Administrator')),
    )
    
    LANGUAGES = (
        ('en', 'English'),
        ('am', 'Amharic'),
        ('om', 'Afaan Oromo'),
        ('so', 'Somali'),
    )
    
    user_type = models.CharField(
        max_length=10, 
        choices=USER_TYPES,
        verbose_name=_('User Type')
    )
    phone_number = models.CharField(
        max_length=15, 
        unique=True,
        verbose_name=_('Phone Number')
    )
    language_preference = models.CharField(
        max_length=5, 
        choices=LANGUAGES,
        default='am',
        verbose_name=_('Language Preference')
    )
    is_verified = models.BooleanField(
        default=False,
        verbose_name=_('Is Verified')
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name=_('Created At')
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name=_('Updated At')
    )
    
    # Remove fields from AbstractUser that we don't need
    first_name = models.CharField(
        _("first name"), 
        max_length=150, 
        blank=True
    )
    last_name = models.CharField(
        _("last name"), 
        max_length=150, 
        blank=True
    )
    email = models.EmailField(
        _("email address"), 
        blank=True
    )
    
    class Meta:
        db_table = 'users'
        verbose_name = _('User')
        verbose_name_plural = _('Users')
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.username} ({self.get_user_type_display()})"
    
    @property
    def full_name(self):
        """Return the full name of the user"""
        if self.first_name and self.last_name:
            return f"{self.first_name} {self.last_name}"
        return self.username
    
    def get_profile(self):
        """Get the related profile based on user type"""
        # Use a lazy model lookup to avoid import-time circular references
        profile_model_names = {
            'FARMER': 'FarmerProfile',
            'VENDOR': 'VendorProfile',
            'DRIVER': 'DriverProfile',
            'ADMIN': 'AdminProfile',
        }

        model_name = profile_model_names.get(self.user_type)
        if not model_name:
            return None

        ProfileModel = apps.get_model('users', model_name)
        try:
            return getattr(self, f"{self.user_type.lower()}profile")
        except ProfileModel.DoesNotExist:
            return None