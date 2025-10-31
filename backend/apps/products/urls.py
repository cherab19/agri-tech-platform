from django.urls import path, include

from apps.products.views import (
    # Category views
    CategoryListView,
    CategoryDetailView,
    CategoryCreateView,
    CategoryUpdateView,
    
    # Product views
    ProductListView,
    ProductDetailView,
    ProductCreateView,
    ProductUpdateView,
    ProductDeleteView,
    FarmerProductListView,
    ProductSearchView,
)

# Category URLs
category_urlpatterns = [
    path('', CategoryListView.as_view(), name='category-list'),
    path('create/', CategoryCreateView.as_view(), name='category-create'),
    path('<int:category_id>/', CategoryDetailView.as_view(), name='category-detail'),
    path('<int:category_id>/update/', CategoryUpdateView.as_view(), name='category-update'),
]

# Product URLs
product_urlpatterns = [
    path('', ProductListView.as_view(), name='product-list'),
    path('search/', ProductSearchView.as_view(), name='product-search'),
    path('create/', ProductCreateView.as_view(), name='product-create'),
    path('my-products/', FarmerProductListView.as_view(), name='farmer-product-list'),
    path('<int:product_id>/', ProductDetailView.as_view(), name='product-detail'),
    path('<int:product_id>/update/', ProductUpdateView.as_view(), name='product-update'),
    path('<int:product_id>/delete/', ProductDeleteView.as_view(), name='product-delete'),
]

# Main URL patterns
urlpatterns = [
    path('categories/', include(category_urlpatterns)),
    path('', include(product_urlpatterns)),
]