from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, RetrieveAPIView
from django.utils.translation import gettext_lazy as _
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from apps.products.models import Category
from apps.products.serializers import (
    CategorySerializer,
    CategoryDetailSerializer,
    CategoryCreateSerializer,
)
from apps.users.permissions import IsAdminUser, IsAdminOrReadOnly


class CategoryListView(ListAPIView):
    """View for listing categories"""
    permission_classes = [permissions.AllowAny]
    queryset = Category.objects.filter(is_active=True, parent__isnull=True)
    serializer_class = CategorySerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    search_fields = ['name', 'name_am', 'name_om', 'name_so']
    ordering_fields = ['order', 'name', 'created_at']
    ordering = ['order', 'name']
    
    def get_queryset(self):
        """Filter categories based on query parameters"""
        queryset = super().get_queryset()
        
        # Include subcategories if requested
        include_subcategories = self.request.query_params.get('include_subcategories')
        if include_subcategories:
            queryset = queryset.prefetch_related('subcategories')
        
        return queryset


class CategoryDetailView(RetrieveAPIView):
    """View for retrieving category details"""
    permission_classes = [permissions.AllowAny]
    queryset = Category.objects.filter(is_active=True)
    serializer_class = CategoryDetailSerializer
    lookup_field = 'id'
    
    def get_queryset(self):
        """Prefetch related data for performance"""
        return Category.objects.filter(is_active=True).prefetch_related(
            'subcategories', 'products'
        )


class CategoryCreateView(APIView):
    """View for creating categories (admin only)"""
    permission_classes = [permissions.IsAuthenticated, IsAdminUser]
    
    def post(self, request):
        serializer = CategoryCreateSerializer(data=request.data)
        
        if serializer.is_valid():
            category = serializer.save()
            
            return Response(
                {
                    'message': _('Category created successfully.'),
                    'category': CategorySerializer(category).data
                },
                status=status.HTTP_201_CREATED
            )
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CategoryUpdateView(APIView):
    """View for updating categories (admin only)"""
    permission_classes = [permissions.IsAuthenticated, IsAdminUser]
    
    def put(self, request, category_id):
        try:
            category = Category.objects.get(id=category_id)
        except Category.DoesNotExist:
            return Response(
                {'error': _('Category not found.')},
                status=status.HTTP_404_NOT_FOUND
            )
        
        serializer = CategoryCreateSerializer(
            category, 
            data=request.data, 
            partial=True
        )
        
        if serializer.is_valid():
            category = serializer.save()
            
            return Response(
                {
                    'message': _('Category updated successfully.'),
                    'category': CategorySerializer(category).data
                },
                status=status.HTTP_200_OK
            )
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)