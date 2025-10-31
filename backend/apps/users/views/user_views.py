from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import RetrieveAPIView, ListAPIView
from django.utils.translation import gettext_lazy as _
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from apps.users.models import CustomUser
from apps.users.serializers import (
    UserProfileSerializer,
    CustomUserSerializer,
)
from apps.users.permissions import IsAdminUser, IsOwnerOrAdmin


class UserProfileView(RetrieveAPIView):
    """View for retrieving and updating user profile"""
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrAdmin]
    serializer_class = UserProfileSerializer
    
    def get_object(self):
        return self.request.user
    
    def put(self, request, *args, **kwargs):
        """Update user profile"""
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserDetailView(RetrieveAPIView):
    """View for retrieving specific user details (admin only)"""
    permission_classes = [permissions.IsAuthenticated, IsAdminUser]
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    lookup_field = 'id'


class UserListView(ListAPIView):
    """View for listing users (admin only)"""
    permission_classes = [permissions.IsAuthenticated, IsAdminUser]
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['user_type', 'is_active', 'is_verified']
    search_fields = ['username', 'email', 'phone_number', 'first_name', 'last_name']
    ordering_fields = ['created_at', 'last_login', 'username']
    ordering = ['-created_at']
    
    def get_queryset(self):
        """Filter queryset based on query parameters"""
        queryset = super().get_queryset()
        
        # Filter by user type if provided
        user_type = self.request.query_params.get('user_type')
        if user_type:
            queryset = queryset.filter(user_type=user_type)
        
        return queryset