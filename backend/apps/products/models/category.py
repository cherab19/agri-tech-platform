from django.db import models
from django.utils.translation import gettext_lazy as _


class Category(models.Model):
    """Product category model"""
    name = models.CharField(
        max_length=100,
        unique=True,
        verbose_name=_('Category Name')
    )
    name_am = models.CharField(
        max_length=100,
        blank=True,
        verbose_name=_('Category Name (Amharic)')
    )
    name_om = models.CharField(
        max_length=100,
        blank=True,
        verbose_name=_('Category Name (Afaan Oromo)')
    )
    name_so = models.CharField(
        max_length=100,
        blank=True,
        verbose_name=_('Category Name (Somali)')
    )
    description = models.TextField(
        blank=True,
        verbose_name=_('Description')
    )
    description_am = models.TextField(
        blank=True,
        verbose_name=_('Description (Amharic)')
    )
    description_om = models.TextField(
        blank=True,
        verbose_name=_('Description (Afaan Oromo)')
    )
    description_so = models.TextField(
        blank=True,
        verbose_name=_('Description (Somali)')
    )
    image = models.ImageField(
        upload_to='categories/',
        null=True,
        blank=True,
        verbose_name=_('Category Image')
    )
    is_active = models.BooleanField(
        default=True,
        verbose_name=_('Is Active')
    )
    parent = models.ForeignKey(
        'self',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='subcategories',
        verbose_name=_('Parent Category')
    )
    order = models.PositiveIntegerField(
        default=0,
        verbose_name=_('Display Order')
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name=_('Created At')
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name=_('Updated At')
    )
    
    class Meta:
        db_table = 'product_categories'
        verbose_name = _('Product Category')
        verbose_name_plural = _('Product Categories')
        ordering = ['order', 'name']
    
    def __str__(self):
        return self.name
    
    @property
    def has_subcategories(self):
        """Check if category has subcategories"""
        return self.subcategories.filter(is_active=True).exists()
    
    @property
    def active_products_count(self):
        """Get count of active products in this category"""
        return self.products.filter(is_active=True, is_approved=True).count()
    
    def get_name(self, language='en'):
        """Get category name in specified language"""
        language_map = {
            'en': self.name,
            'am': self.name_am or self.name,
            'om': self.name_om or self.name,
            'so': self.name_so or self.name,
        }
        return language_map.get(language, self.name)
    
    def get_description(self, language='en'):
        """Get category description in specified language"""
        language_map = {
            'en': self.description,
            'am': self.description_am or self.description,
            'om': self.description_om or self.description,
            'so': self.description_so or self.description,
        }
        return language_map.get(language, self.description)