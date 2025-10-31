from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from django.utils.html import format_html

from apps.products.models import Category, Product, Inventory


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = [
        'name', 'name_am', 'parent', 'is_active', 
        'active_products_count', 'order', 'created_at'
    ]
    list_filter = ['is_active', 'parent', 'created_at']
    search_fields = ['name', 'name_am', 'name_om', 'name_so']
    readonly_fields = ['created_at', 'updated_at', 'active_products_count']
    list_editable = ['order', 'is_active']
    
    fieldsets = (
        (None, {'fields': ('name', 'name_am', 'name_om', 'name_so')}),
        (_('Description'), {
            'fields': (
                'description', 'description_am', 'description_om', 'description_so'
            ),
            'classes': ('collapse',)
        }),
        (_('Settings'), {
            'fields': ('image', 'parent', 'order', 'is_active')
        }),
        (_('Metadata'), {
            'fields': ('created_at', 'updated_at', 'active_products_count'),
            'classes': ('collapse',)
        }),
    )


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = [
        'name', 'farmer_cooperative_name', 'category', 'price', 'unit',
        'available_quantity', 'is_approved', 'is_active', 'rating', 'created_at'
    ]
    list_filter = [
        'category', 'is_approved', 'is_active', 'is_organic', 
        'quality_grade', 'created_at'
    ]
    search_fields = [
        'name', 'name_am', 'name_om', 'name_so',
        'farmer__username', 'farmer__farmerprofile__cooperative_name'
    ]
    readonly_fields = [
        'created_at', 'updated_at', 'rating', 'review_count',
        'total_sold', 'farmer_cooperative_name', 'farmer_region'
    ]
    list_editable = ['is_approved', 'is_active', 'price']
    
    fieldsets = (
        (None, {'fields': ('farmer', 'category')}),
        (_('Product Information'), {
            'fields': (
                'name', 'name_am', 'name_om', 'name_so',
                'description', 'description_am', 'description_om', 'description_so',
                'price', 'unit', 'quality_grade'
            )
        }),
        (_('Inventory'), {
            'fields': (
                'min_order_quantity', 'max_order_quantity', 'available_quantity'
            )
        }),
        (_('Media'), {
            'fields': ('image', 'images'),
            'classes': ('collapse',)
        }),
        (_('Properties'), {
            'fields': (
                'is_organic', 'tags', 'harvest_date', 'expiry_date',
                'storage_instructions'
            )
        }),
        (_('Status'), {
            'fields': ('is_active', 'is_approved', 'rating', 'review_count')
        }),
        (_('Sales'), {
            'fields': ('total_sold',),
            'classes': ('collapse',)
        }),
        (_('Farmer Information'), {
            'fields': ('farmer_cooperative_name', 'farmer_region'),
            'classes': ('collapse',)
        }),
        (_('Metadata'), {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def farmer_cooperative_name(self, obj):
        return obj.farmer_cooperative_name
    farmer_cooperative_name.short_description = _('Cooperative Name')
    
    def farmer_region(self, obj):
        return obj.farmer_region
    farmer_region.short_description = _('Region')


@admin.register(Inventory)
class InventoryAdmin(admin.ModelAdmin):
    list_display = [
        'product', 'transaction_type', 'quantity',
        'previous_quantity', 'new_quantity', 'created_by', 'created_at'
    ]
    list_filter = ['transaction_type', 'created_at']
    search_fields = [
        'product__name', 'reference_id', 'reason',
        'created_by__username'
    ]
    readonly_fields = [
        'created_at', 'previous_quantity', 'new_quantity'
    ]
    
    fieldsets = (
        (None, {'fields': ('product', 'transaction_type')}),
        (_('Quantity Information'), {
            'fields': (
                'quantity', 'previous_quantity', 'new_quantity'
            )
        }),
        (_('Details'), {
            'fields': ('reason', 'reference_id', 'notes', 'created_by')
        }),
        (_('Metadata'), {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )
    
    def has_add_permission(self, request):
        """Prevent manual addition of inventory records"""
        return False
    
    def has_change_permission(self, request, obj=None):
        """Prevent editing of inventory records"""
        return False