from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.translation import gettext_lazy as _

from apps.users.models import CustomUser, FarmerProfile, VendorProfile, DriverProfile, AdminProfile


@receiver(post_save, sender=CustomUser)
def create_user_profile(sender, instance, created, **kwargs):
    """Create appropriate profile when a user is created"""
    if created:
        # NOTE: Auto-creating full profile objects on user creation can fail when
        # the profile model contains non-nullable fields (e.g. DriverProfile).
        # Instead of creating incomplete profiles (which causes IntegrityError),
        # we skip automatic creation here and let admins or dedicated flows create
        # profiles with the required data.
        # If you want certain profile types to be auto-created with defaults,
        # implement that logic here carefully ensuring all required fields are
        # provided.
        return


@receiver(post_save, sender=CustomUser)
def save_user_profile(sender, instance, **kwargs):
    """Save the user's profile when user is saved"""
    profile = instance.get_profile()
    if profile:
        profile.save()