from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import RetrieveAPIView, ListAPIView
from django.utils.translation import gettext_lazy as _
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from apps.users.models import FarmerProfile, CustomUser
from apps.users.serializers import FarmerProfileSerializer
from apps.users.permissions import IsAdminUser, IsFarmerUser


class FarmerProfileView(RetrieveAPIView):
    """View for retrieving and updating farmer profile"""
    permission_classes = [permissions.IsAuthenticated, IsFarmerUser | IsAdminUser]
    serializer_class = FarmerProfileSerializer
    
    def get_object(self):
        user = self.request.user
        if user.user_type == 'FARMER':
            return user.farmerprofile
        else:
            # Admin accessing farmer profile
            farmer_id = self.kwargs.get('id')
            return FarmerProfile.objects.get(id=farmer_id)
    
    def put(self, request, *args, **kwargs):
        """Update farmer profile"""
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FarmerListView(ListAPIView):
    """View for listing farmers (admin only)"""
    permission_classes = [permissions.IsAuthenticated, IsAdminUser]
    queryset = FarmerProfile.objects.select_related('user').all()
    serializer_class = FarmerProfileSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['cooperative_type', 'region', 'is_active']
    search_fields = [
        'cooperative_name', 
        'registration_number',
        'user__username',
        'user__phone_number'
    ]
    ordering_fields = ['created_at', 'rating', 'total_sales']
    ordering = ['-created_at']


class FarmerDashboardView(APIView):
    """View for farmer dashboard data"""
    permission_classes = [permissions.IsAuthenticated, IsFarmerUser]
    
    def get(self, request):
        farmer_profile = request.user.farmerprofile
        
        # Mock data - will be replaced with actual analytics
        dashboard_data = {
            'profile': FarmerProfileSerializer(farmer_profile).data,
            'stats': {
                'total_products': 15,  # Will come from products app
                'active_orders': 3,    # Will come from orders app
                'pending_orders': 2,   # Will come from orders app
                'total_earnings': float(farmer_profile.total_sales),
                'monthly_earnings': 25000.00,  # Will come from analytics
                'customer_rating': float(farmer_profile.rating),
            },
            'recent_activity': [
                {
                    'type': 'order_received',
                    'message': 'New order received for 50kg of tomatoes',
                    'timestamp': '2024-01-15T10:30:00Z'
                },
                {
                    'type': 'payment_received',
                    'message': 'Payment received for order #12345',
                    'timestamp': '2024-01-14T15:45:00Z'
                }
            ]
        }
        
        return Response(dashboard_data, status=status.HTTP_200_OK)