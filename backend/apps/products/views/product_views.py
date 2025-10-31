from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, RetrieveAPIView
from django.utils.translation import gettext_lazy as _
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from django.db.models import Q

from apps.products.models import Product
from apps.products.serializers import (
    ProductListSerializer,
    ProductDetailSerializer,
    ProductCreateSerializer,
    ProductUpdateSerializer,
)
from apps.users.permissions import (
    IsAdminUser, 
    IsFarmerUser, 
    IsOwnerOrAdmin,
    IsAdminOrReadOnly,
)


class ProductListView(ListAPIView):
    """View for listing products with filtering and search"""
    permission_classes = [permissions.AllowAny]
    serializer_class = ProductListSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['category', 'quality_grade', 'is_organic', 'farmer__farmerprofile__region']
    search_fields = [
        'name', 'name_am', 'name_om', 'name_so',
        'description', 'description_am', 'description_om', 'description_so',
        'farmer__farmerprofile__cooperative_name'
    ]
    ordering_fields = ['price', 'rating', 'created_at', 'total_sold']
    ordering = ['-created_at']
    
    def get_queryset(self):
        """Filter products based on query parameters"""
        queryset = Product.objects.filter(
            is_active=True, 
            is_approved=True
        ).select_related(
            'farmer', 'category'
        ).prefetch_related(
            'farmer__farmerprofile'
        )
        
        # Filter by availability
        available_only = self.request.query_params.get('available_only')
        if available_only and available_only.lower() == 'true':
            queryset = queryset.filter(available_quantity__gt=0)
        
        # Filter by price range
        min_price = self.request.query_params.get('min_price')
        max_price = self.request.query_params.get('max_price')
        if min_price:
            queryset = queryset.filter(price__gte=min_price)
        if max_price:
            queryset = queryset.filter(price__lte=max_price)
        
        # Filter by farmer region
        region = self.request.query_params.get('region')
        if region:
            queryset = queryset.filter(
                farmer__farmerprofile__region__icontains=region
            )
        
        return queryset


class ProductDetailView(RetrieveAPIView):
    """View for retrieving product details"""
    permission_classes = [permissions.AllowAny]
    queryset = Product.objects.filter(is_active=True, is_approved=True)
    serializer_class = ProductDetailSerializer
    lookup_field = 'id'
    
    def get_queryset(self):
        """Prefetch related data for performance"""
        return Product.objects.filter(
            is_active=True, 
            is_approved=True
        ).select_related(
            'farmer', 'category'
        ).prefetch_related(
            'farmer__farmerprofile'
        )


class ProductCreateView(APIView):
    """View for creating products (farmers only)"""
    permission_classes = [permissions.IsAuthenticated, IsFarmerUser]
    
    def post(self, request):
        serializer = ProductCreateSerializer(
            data=request.data,
            context={'request': request}
        )
        
        if serializer.is_valid():
            product = serializer.save()
            
            # Create initial inventory record
            from apps.products.models import Inventory
            
            Inventory.objects.create(
                product=product,
                transaction_type='STOCK_IN',
                quantity=product.available_quantity,
                previous_quantity=0,
                reason='Initial stock',
                created_by=request.user
            )
            
            return Response(
                {
                    'message': _('Product created successfully. It will be available after approval.'),
                    'product': ProductDetailSerializer(product).data
                },
                status=status.HTTP_201_CREATED
            )
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProductUpdateView(APIView):
    """View for updating products (owner or admin)"""
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrAdmin]
    
    def get_object(self, product_id):
        try:
            product = Product.objects.get(id=product_id)
            self.check_object_permissions(self.request, product)
            return product
        except Product.DoesNotExist:
            return None
    
    def put(self, request, product_id):
        product = self.get_object(product_id)
        if not product:
            return Response(
                {'error': _('Product not found.')},
                status=status.HTTP_404_NOT_FOUND
            )
        
        serializer = ProductUpdateSerializer(
            product,
            data=request.data,
            partial=True,
            context={'request': request}
        )
        
        if serializer.is_valid():
            product = serializer.save()
            
            return Response(
                {
                    'message': _('Product updated successfully.'),
                    'product': ProductDetailSerializer(product).data
                },
                status=status.HTTP_200_OK
            )
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProductDeleteView(APIView):
    """View for deleting products (owner or admin)"""
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrAdmin]
    
    def get_object(self, product_id):
        try:
            product = Product.objects.get(id=product_id)
            self.check_object_permissions(self.request, product)
            return product
        except Product.DoesNotExist:
            return None
    
    def delete(self, request, product_id):
        product = self.get_object(product_id)
        if not product:
            return Response(
                {'error': _('Product not found.')},
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Soft delete by deactivating
        product.is_active = False
        product.save()
        
        return Response(
            {'message': _('Product deleted successfully.')},
            status=status.HTTP_200_OK
        )


class FarmerProductListView(ListAPIView):
    """View for listing products of a specific farmer"""
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ProductListSerializer
    
    def get_queryset(self):
        """Get products for the current farmer"""
        user = self.request.user
        
        if user.user_type == 'FARMER':
            # Farmer viewing their own products
            return Product.objects.filter(
                farmer=user
            ).select_related('category').order_by('-created_at')
        elif user.user_type == 'ADMIN':
            # Admin viewing all products
            farmer_id = self.request.query_params.get('farmer_id')
            if farmer_id:
                return Product.objects.filter(
                    farmer_id=farmer_id
                ).select_related('category', 'farmer').order_by('-created_at')
            else:
                return Product.objects.all().select_related('category', 'farmer').order_by('-created_at')
        else:
            return Product.objects.none()


class ProductSearchView(ListAPIView):
    """View for advanced product search"""
    permission_classes = [permissions.AllowAny]
    serializer_class = ProductListSerializer
    
    def get_queryset(self):
        queryset = Product.objects.filter(
            is_active=True, 
            is_approved=True,
            available_quantity__gt=0
        ).select_related('farmer', 'category')
        
        search_query = self.request.query_params.get('q')
        category_id = self.request.query_params.get('category')
        region = self.request.query_params.get('region')
        min_price = self.request.query_params.get('min_price')
        max_price = self.request.query_params.get('max_price')
        quality_grade = self.request.query_params.get('quality_grade')
        is_organic = self.request.query_params.get('is_organic')
        
        # Text search
        if search_query:
            queryset = queryset.filter(
                Q(name__icontains=search_query) |
                Q(name_am__icontains=search_query) |
                Q(name_om__icontains=search_query) |
                Q(name_so__icontains=search_query) |
                Q(description__icontains=search_query) |
                Q(farmer__farmerprofile__cooperative_name__icontains=search_query)
            )
        
        # Category filter
        if category_id:
            queryset = queryset.filter(category_id=category_id)
        
        # Region filter
        if region:
            queryset = queryset.filter(
                farmer__farmerprofile__region__icontains=region
            )
        
        # Price range filter
        if min_price:
            queryset = queryset.filter(price__gte=min_price)
        if max_price:
            queryset = queryset.filter(price__lte=max_price)
        
        # Quality grade filter
        if quality_grade:
            queryset = queryset.filter(quality_grade=quality_grade)
        
        # Organic filter
        if is_organic and is_organic.lower() == 'true':
            queryset = queryset.filter(is_organic=True)
        
        return queryset.order_by('-created_at')