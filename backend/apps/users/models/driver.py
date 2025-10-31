from django.db import models
from django.utils.translation import gettext_lazy as _
from django.conf import settings


class DriverProfile(models.Model):
    VEHICLE_TYPES = (
        ('PICKUP', _('Pickup Truck')),
        ('MINI_TRUCK', _('Mini Truck')),
        ('TRUCK_3T', _('3 Ton Truck')),
        ('TRUCK_5T', _('5 Ton Truck')),
        ('TRUCK_10T', _('10 Ton Truck')),
        ('OTHER', _('Other')),
    )
    
    LICENSE_TYPES = (
        ('L3', _('L3 - Light Vehicle')),
        ('C1', _('C1 - Medium Truck')),
        ('C2', _('C2 - Heavy Truck')),
        ('C3', _('C3 - Extra Heavy')),
    )
    
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='driverprofile',
        verbose_name=_('User')
    )
    driver_id = models.CharField(
        max_length=50,
        unique=True,
        verbose_name=_('Driver ID')
    )
    vehicle_type = models.CharField(
        max_length=15,
        choices=VEHICLE_TYPES,
        verbose_name=_('Vehicle Type')
    )
    vehicle_plate_number = models.CharField(
        max_length=20,
        unique=True,
        verbose_name=_('Vehicle Plate Number')
    )
    vehicle_capacity_kg = models.PositiveIntegerField(
        verbose_name=_('Vehicle Capacity (kg)')
    )
    license_number = models.CharField(
        max_length=50,
        unique=True,
        verbose_name=_('License Number')
    )
    license_type = models.CharField(
        max_length=5,
        choices=LICENSE_TYPES,
        verbose_name=_('License Type')
    )
    license_expiry_date = models.DateField(
        verbose_name=_('License Expiry Date')
    )
    region = models.CharField(
        max_length=100,
        verbose_name=_('Region')
    )
    city = models.CharField(
        max_length=100,
        verbose_name=_('City')
    )
    phone_number_2 = models.CharField(
        max_length=15,
        blank=True,
        verbose_name=_('Secondary Phone Number')
    )
    emergency_contact_name = models.CharField(
        max_length=255,
        blank=True,
        verbose_name=_('Emergency Contact Name')
    )
    emergency_contact_phone = models.CharField(
        max_length=15,
        blank=True,
        verbose_name=_('Emergency Contact Phone')
    )
    is_available = models.BooleanField(
        default=True,
        verbose_name=_('Is Available')
    )
    is_verified = models.BooleanField(
        default=False,
        verbose_name=_('Is Verified')
    )
    rating = models.DecimalField(
        max_digits=3,
        decimal_places=2,
        default=0.0,
        verbose_name=_('Rating')
    )
    total_deliveries = models.PositiveIntegerField(
        default=0,
        verbose_name=_('Total Deliveries')
    )
    total_earnings = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0.00,
        verbose_name=_('Total Earnings')
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
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name=_('Created At')
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name=_('Updated At')
    )
    
    class Meta:
        db_table = 'driver_profiles'
        verbose_name = _('Driver Profile')
        verbose_name_plural = _('Driver Profiles')
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.user.get_full_name()} - {self.vehicle_plate_number}"
    
    @property
    def is_license_valid(self):
        """Check if driver's license is still valid"""
        from django.utils import timezone
        return self.license_expiry_date > timezone.now().date()