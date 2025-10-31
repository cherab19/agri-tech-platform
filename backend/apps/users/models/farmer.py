from django.db import models
from django.utils.translation import gettext_lazy as _
from django.conf import settings


class FarmerProfile(models.Model):
    COOPERATIVE_TYPES = (
        ('SMALL', _('Small Cooperative (1-10 members)')),
        ('MEDIUM', _('Medium Cooperative (11-50 members)')),
        ('LARGE', _('Large Cooperative (50+ members)')),
    )
    
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='farmerprofile',
        verbose_name=_('User')
    )
    cooperative_name = models.CharField(
        max_length=255,
        verbose_name=_('Cooperative Name')
    )
    cooperative_type = models.CharField(
        max_length=10,
        choices=COOPERATIVE_TYPES,
        verbose_name=_('Cooperative Type')
    )
    registration_number = models.CharField(
        max_length=50,
        unique=True,
        verbose_name=_('Registration Number')
    )
    total_members = models.PositiveIntegerField(
        default=1,
        verbose_name=_('Total Members')
    )
    region = models.CharField(
        max_length=100,
        verbose_name=_('Region')
    )
    zone = models.CharField(
        max_length=100,
        blank=True,
        verbose_name=_('Zone')
    )
    woreda = models.CharField(
        max_length=100,
        verbose_name=_('Woreda')
    )
    kebele = models.CharField(
        max_length=100,
        verbose_name=_('Kebele')
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
    bank_name = models.CharField(
        max_length=100,
        blank=True,
        verbose_name=_('Bank Name')
    )
    bank_account_number = models.CharField(
        max_length=50,
        blank=True,
        verbose_name=_('Bank Account Number')
    )
    is_active = models.BooleanField(
        default=True,
        verbose_name=_('Is Active')
    )
    rating = models.DecimalField(
        max_digits=3,
        decimal_places=2,
        default=0.0,
        verbose_name=_('Rating')
    )
    total_sales = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0.00,
        verbose_name=_('Total Sales')
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
        db_table = 'farmer_profiles'
        verbose_name = _('Farmer Profile')
        verbose_name_plural = _('Farmer Profiles')
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.cooperative_name} - {self.user.username}"
    
    @property
    def full_address(self):
        """Return the full address of the cooperative"""
        address_parts = [self.kebele, self.woreda, self.zone, self.region]
        return ', '.join(filter(None, address_parts))