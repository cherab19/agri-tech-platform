from django.urls import path, include
from rest_framework_simplejwt.views import TokenVerifyView

from apps.users.views import (
    # Auth views
    UserRegistrationView,
    UserLoginView,
    UserLogoutView,
    PasswordChangeView,
    TokenRefreshView,
    
    # User views
    UserProfileView,
    UserDetailView,
    UserListView,
    
    # Farmer views
    FarmerProfileView,
    FarmerListView,
    FarmerDashboardView,
    
    # Vendor views
    VendorProfileView,
    VendorListView,
    VendorDashboardView,
    
    # Driver views
    DriverProfileView,
    DriverListView,
    DriverDashboardView,
    
    # Admin views
    AdminProfileView,
    AdminListView,
    AdminDashboardView,
    UserManagementView,
)

# Auth URLs
auth_urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='user-register'),
    path('login/', UserLoginView.as_view(), name='user-login'),
    path('logout/', UserLogoutView.as_view(), name='user-logout'),
    path('password/change/', PasswordChangeView.as_view(), name='password-change'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token-verify'),
]

# User URLs
user_urlpatterns = [
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    path('list/', UserListView.as_view(), name='user-list'),
    path('<int:id>/', UserDetailView.as_view(), name='user-detail'),
]

# Farmer URLs
farmer_urlpatterns = [
    path('profile/', FarmerProfileView.as_view(), name='farmer-profile'),
    path('profile/<int:id>/', FarmerProfileView.as_view(), name='farmer-profile-detail'),
    path('list/', FarmerListView.as_view(), name='farmer-list'),
    path('dashboard/', FarmerDashboardView.as_view(), name='farmer-dashboard'),
]

# Vendor URLs
vendor_urlpatterns = [
    path('profile/', VendorProfileView.as_view(), name='vendor-profile'),
    path('profile/<int:id>/', VendorProfileView.as_view(), name='vendor-profile-detail'),
    path('list/', VendorListView.as_view(), name='vendor-list'),
    path('dashboard/', VendorDashboardView.as_view(), name='vendor-dashboard'),
]

# Driver URLs
driver_urlpatterns = [
    path('profile/', DriverProfileView.as_view(), name='driver-profile'),
    path('profile/<int:id>/', DriverProfileView.as_view(), name='driver-profile-detail'),
    path('list/', DriverListView.as_view(), name='driver-list'),
    path('dashboard/', DriverDashboardView.as_view(), name='driver-dashboard'),
]

# Admin URLs
admin_urlpatterns = [
    path('profile/', AdminProfileView.as_view(), name='admin-profile'),
    path('list/', AdminListView.as_view(), name='admin-list'),
    path('dashboard/', AdminDashboardView.as_view(), name='admin-dashboard'),
    path('users/<int:user_id>/manage/', UserManagementView.as_view(), name='user-management'),
]

# Main URL patterns
urlpatterns = [
    path('', include([
        path('auth/', include(auth_urlpatterns)),
        path('users/', include(user_urlpatterns)),
        path('farmers/', include(farmer_urlpatterns)),
        path('vendors/', include(vendor_urlpatterns)),
        path('drivers/', include(driver_urlpatterns)),
        path('admins/', include(admin_urlpatterns)),
    ])),
]