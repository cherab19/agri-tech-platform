from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import RetrieveAPIView, ListAPIView
from django.utils.translation import gettext_lazy as _
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from apps.users.models import VendorProfile, CustomUser
from apps.users.serializers import VendorProfileSerializer
from apps.users.permissions import IsAdminUser, IsVendorUser


class VendorProfileView(RetrieveAPIView):
    """View for retrieving and updating vendor profile"""
    permission_classes = [permissions.IsAuthenticated, IsVendorUser | IsAdminUser]
    serializer_class = VendorProfileSerializer
    
    def get_object(self):
        user = self.request.user
        if user.user_type == 'VENDOR':
            return user.vendorprofile
        else:
            # Admin accessing vendor profile
            vendor_id = self.kwargs.get('id')
            return VendorProfile.objects.get(id=vendor_id)
    
    def put(self, request, *args, **kwargs):
        """Update vendor profile"""
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VendorListView(ListAPIView):
    """View for listing vendors (admin only)"""
    permission_classes = [permissions.IsAuthenticated, IsAdminUser]
    queryset = VendorProfile.objects.select_related('user').all()
    serializer_class = VendorProfileSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['business_type', 'region', 'city', 'is_active']
    search_fields = [
        'business_name', 
        'tin_number',
        'contact_person',
        'user__username',
        'user__phone_number'
    ]
    ordering_fields = ['created_at', 'current_balance']
    ordering = ['-created_at']


class VendorDashboardView(APIView):
    """View for vendor dashboard data"""
    permission_classes = [permissions.IsAuthenticated, IsVendorUser]
    
    def get(self, request):
        vendor_profile = request.user.vendorprofile
        
        # Mock data - will be replaced with actual analytics
        dashboard_data = {
            'profile': VendorProfileSerializer(vendor_profile).data,
            'stats': {
                'total_orders': 25,           # Will come from orders app
                'pending_orders': 2,          # Will come from orders app
                'completed_orders': 20,       # Will come from orders app
                'total_spent': 150000.00,     # Will come from payments app
                'monthly_spending': 45000.00, # Will come from analytics
                'credit_balance': float(vendor_profile.current_balance),
            },
            'recent_activity': [
                {
                    'type': 'order_placed',
                    'message': 'Order placed for fresh vegetables',
                    'timestamp': '2024-01-15T09:15:00Z'
                },
                {
                    'type': 'payment_made',
                    'message': 'Payment completed for order #12344',
                    'timestamp': '2024-01-14T14:20:00Z'
                }
            ]
        }
        
        return Response(dashboard_data, status=status.HTTP_200_OK)