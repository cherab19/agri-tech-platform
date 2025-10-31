from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import RetrieveAPIView, ListAPIView
from django.utils.translation import gettext_lazy as _
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from apps.users.models import AdminProfile, CustomUser
from apps.users.serializers import AdminProfileSerializer
from apps.users.permissions import IsAdminUser


class AdminProfileView(RetrieveAPIView):
    """View for retrieving and updating admin profile"""
    permission_classes = [permissions.IsAuthenticated, IsAdminUser]
    serializer_class = AdminProfileSerializer
    
    def get_object(self):
        return self.request.user.adminprofile
    
    def put(self, request, *args, **kwargs):
        """Update admin profile"""
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AdminListView(ListAPIView):
    """View for listing admins (admin only)"""
    permission_classes = [permissions.IsAuthenticated, IsAdminUser]
    queryset = AdminProfile.objects.select_related('user').all()
    serializer_class = AdminProfileSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['admin_role', 'department', 'is_active']
    search_fields = [
        'employee_id',
        'department',
        'user__username',
        'user__email'
    ]
    ordering_fields = ['created_at']
    ordering = ['-created_at']


class AdminDashboardView(APIView):
    """View for admin dashboard data"""
    permission_classes = [permissions.IsAuthenticated, IsAdminUser]
    
    def get(self, request):
        admin_profile = request.user.adminprofile
        
        # Mock data - will be replaced with actual analytics
        dashboard_data = {
            'profile': AdminProfileSerializer(admin_profile).data,
            'platform_stats': {
                'total_users': 150,           # Will come from analytics
                'total_farmers': 45,          # Will come from analytics
                'total_vendors': 35,          # Will come from analytics
                'total_drivers': 20,          # Will come from analytics
                'active_orders': 15,          # Will come from orders app
                'total_revenue': 250000.00,   # Will come from payments app
                'commission_earned': 12500.00,# Will come from payments app
            },
            'recent_activity': [
                {
                    'type': 'user_registered',
                    'message': 'New farmer cooperative registered',
                    'timestamp': '2024-01-15T07:30:00Z'
                },
                {
                    'type': 'order_placed',
                    'message': 'New order placed worth ETB 5,000',
                    'timestamp': '2024-01-14T12:15:00Z'
                },
                {
                    'type': 'payment_processed',
                    'message': 'Payment processed for order #12342',
                    'timestamp': '2024-01-14T11:45:00Z'
                }
            ]
        }
        
        return Response(dashboard_data, status=status.HTTP_200_OK)


class UserManagementView(APIView):
    """View for user management operations (admin only)"""
    permission_classes = [permissions.IsAuthenticated, IsAdminUser]
    
    def patch(self, request, user_id):
        """Update user status (activate/deactivate/verify)"""
        try:
            user = CustomUser.objects.get(id=user_id)
            
            # Update fields if provided
            if 'is_active' in request.data:
                user.is_active = request.data['is_active']
            
            if 'is_verified' in request.data:
                user.is_verified = request.data['is_verified']
            
            user.save()
            
            return Response(
                {
                    'message': _('User updated successfully.'),
                    'user': CustomUserSerializer(user).data
                },
                status=status.HTTP_200_OK
            )
        except CustomUser.DoesNotExist:
            return Response(
                {'error': _('User not found.')},
                status=status.HTTP_404_NOT_FOUND
            )
    
    def delete(self, request, user_id):
        """Delete user (soft delete by deactivating)"""
        try:
            user = CustomUser.objects.get(id=user_id)
            user.is_active = False
            user.save()
            
            return Response(
                {'message': _('User deactivated successfully.')},
                status=status.HTTP_200_OK
            )
        except CustomUser.DoesNotExist:
            return Response(
                {'error': _('User not found.')},
                status=status.HTTP_404_NOT_FOUND
            )