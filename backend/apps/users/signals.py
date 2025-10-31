from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.translation import gettext_lazy as _

from apps.users.models import CustomUser, FarmerProfile, VendorProfile, DriverProfile, AdminProfile


@receiver(post_save, sender=CustomUser)
def create_user_profile(sender, instance, created, **kwargs):
    """Create appropriate profile when a user is created"""
    if created:
        profile_models = {
            'FARMER': FarmerProfile,
            'VENDOR': VendorProfile,
            'DRIVER': DriverProfile,
            'ADMIN': AdminProfile,
        }
        
        profile_model = profile_models.get(instance.user_type)
        if profile_model:
            # Create basic profile
            profile_model.objects.create(user=instance)


@receiver(post_save, sender=CustomUser)
def save_user_profile(sender, instance, **kwargs):
    """Save the user's profile when user is saved"""
    profile = instance.get_profile()
    if profile:
        profile.save()