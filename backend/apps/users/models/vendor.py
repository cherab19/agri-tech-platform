from django.db import models
from django.utils.translation import gettext_lazy as _
from django.conf import settings


class VendorProfile(models.Model):
    BUSINESS_TYPES = (
        ('RETAILER', _('Retail Shop')),
        ('WHOLESALER', _('Wholesaler')),
        ('SUPERMARKET', _('Supermarket')),
        ('RESTAURANT', _('Restaurant/Hotel')),
        ('OTHER', _('Other')),
    )
    
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='vendorprofile',
        verbose_name=_('User')
    )
    business_name = models.CharField(
        max_length=255,
        verbose_name=_('Business Name')
    )
    business_type = models.CharField(
        max_length=15,
        choices=BUSINESS_TYPES,
        verbose_name=_('Business Type')
    )
    tin_number = models.CharField(
        max_length=50,
        unique=True,
        verbose_name=_('TIN Number')
    )
    contact_person = models.CharField(
        max_length=255,
        verbose_name=_('Contact Person')
    )
    region = models.CharField(
        max_length=100,
        verbose_name=_('Region')
    )
    city = models.CharField(
        max_length=100,
        verbose_name=_('City')
    )
    sub_city = models.CharField(
        max_length=100,
        verbose_name=_('Sub City')
    )
    woreda = models.CharField(
        max_length=100,
        verbose_name=_('Woreda')
    )
    kebele = models.CharField(
        max_length=100,
        verbose_name=_('Kebele')
    )
    house_number = models.CharField(
        max_length=50,
        blank=True,
        verbose_name=_('House Number')
    )
    latitude = models.DecimalField(
        max_digits=9, 
        decimal_places=6,
        null=True, 
        blank=True,
        verbose_name=_('Latitude')
    )
    longitude = models.DecimalField(
        max_digits=9, 
        decimal_places=6,
        null=True, 
        blank=True,
        verbose_name=_('Longitude')
    )
    business_license_number = models.CharField(
        max_length=100,
        blank=True,
        verbose_name=_('Business License Number')
    )
    is_active = models.BooleanField(
        default=True,
        verbose_name=_('Is Active')
    )
    credit_limit = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0.00,
        verbose_name=_('Credit Limit')
    )
    current_balance = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0.00,
        verbose_name=_('Current Balance')
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
        db_table = 'vendor_profiles'
        verbose_name = _('Vendor Profile')
        verbose_name_plural = _('Vendor Profiles')
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.business_name} - {self.user.username}"
    
    @property
    def full_address(self):
        """Return the full business address"""
        address_parts = [
            self.house_number,
            self.kebele,
            self.woreda,
            self.sub_city,
            self.city,
            self.region
        ]
        return ', '.join(filter(None, address_parts))