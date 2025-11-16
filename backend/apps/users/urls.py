from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    UserRegistrationView,
    UserLoginView,
    UserProfileView,
    VendorListView,
    VendorProfileView,
    FarmerListView,
    FarmerProfileView,
    DriverListView,
    DriverProfileView,
)

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', UserProfileView.as_view(), name='profile'),

    # Vendor endpoints
    path('vendors/', VendorListView.as_view(), name='vendor-list'),
    path('vendors/<int:id>/', VendorProfileView.as_view(), name='vendor-detail'),

    # Farmer endpoints
    path('farmers/', FarmerListView.as_view(), name='farmer-list'),
    path('farmers/<int:id>/', FarmerProfileView.as_view(), name='farmer-detail'),

    # Driver endpoints
    path('drivers/', DriverListView.as_view(), name='driver-list'),
    path('drivers/<int:id>/', DriverProfileView.as_view(), name='driver-detail'),
]