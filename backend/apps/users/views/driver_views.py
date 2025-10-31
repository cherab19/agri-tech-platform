from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import RetrieveAPIView, ListAPIView
from django.utils.translation import gettext_lazy as _
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from apps.users.models import DriverProfile, CustomUser
from apps.users.serializers import DriverProfileSerializer
from apps.users.permissions import IsAdminUser, IsDriverUser


class DriverProfileView(RetrieveAPIView):
    """View for retrieving and updating driver profile"""
    permission_classes = [permissions.IsAuthenticated, IsDriverUser | IsAdminUser]
    serializer_class = DriverProfileSerializer
    
    def get_object(self):
        user = self.request.user
        if user.user_type == 'DRIVER':
            return user.driverprofile
        else:
            # Admin accessing driver profile
            driver_id = self.kwargs.get('id')
            return DriverProfile.objects.get(id=driver_id)
    
    def put(self, request, *args, **kwargs):
        """Update driver profile"""
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DriverListView(ListAPIView):
    """View for listing drivers (admin only)"""
    permission_classes = [permissions.IsAuthenticated, IsAdminUser]
    queryset = DriverProfile.objects.select_related('user').all()
    serializer_class = DriverProfileSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['vehicle_type', 'region', 'is_available', 'is_verified']
    search_fields = [
        'driver_id', 
        'vehicle_plate_number',
        'license_number',
        'user__username',
        'user__phone_number'
    ]
    ordering_fields = ['created_at', 'rating', 'total_deliveries']
    ordering = ['-created_at']


class DriverDashboardView(APIView):
    """View for driver dashboard data"""
    permission_classes = [permissions.IsAuthenticated, IsDriverUser]
    
    def get(self, request):
        driver_profile = request.user.driverprofile
        
        # Mock data - will be replaced with actual analytics
        dashboard_data = {
            'profile': DriverProfileSerializer(driver_profile).data,
            'stats': {
                'active_deliveries': 2,       # Will come from orders app
                'completed_deliveries': driver_profile.total_deliveries,
                'pending_deliveries': 1,      # Will come from orders app
                'total_earnings': float(driver_profile.total_earnings),
                'monthly_earnings': 12000.00, # Will come from analytics
                'customer_rating': float(driver_profile.rating),
            },
            'recent_activity': [
                {
                    'type': 'delivery_assigned',
                    'message': 'New delivery assigned to Addis Ababa',
                    'timestamp': '2024-01-15T08:00:00Z'
                },
                {
                    'type': 'delivery_completed',
                    'message': 'Delivery completed for order #12343',
                    'timestamp': '2024-01-14T16:30:00Z'
                }
            ]
        }
        
        return Response(dashboard_data, status=status.HTTP_200_OK)