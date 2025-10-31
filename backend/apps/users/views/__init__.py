from .auth_views import (
    UserRegistrationView,
    UserLoginView,
    UserLogoutView,
    PasswordChangeView,
    TokenRefreshView,
)
from .user_views import (
    UserProfileView,
    UserDetailView,
    UserListView,
)
from .farmer_views import (
    FarmerProfileView,
    FarmerListView,
    FarmerDashboardView,
)
from .vendor_views import (
    VendorProfileView,
    VendorListView,
    VendorDashboardView,
)
from .driver_views import (
    DriverProfileView,
    DriverListView,
    DriverDashboardView,
)
from .admin_views import (
    AdminProfileView,
    AdminListView,
    AdminDashboardView,
    UserManagementView,
)

__all__ = [
    'UserRegistrationView',
    'UserLoginView',
    'UserLogoutView',
    'PasswordChangeView',
    'TokenRefreshView',
    'UserProfileView',
    'UserDetailView',
    'UserListView',
    'FarmerProfileView',
    'FarmerListView',
    'FarmerDashboardView',
    'VendorProfileView',
    'VendorListView',
    'VendorDashboardView',
    'DriverProfileView',
    'DriverListView',
    'DriverDashboardView',
    'AdminProfileView',
    'AdminListView',
    'AdminDashboardView',
    'UserManagementView',
]