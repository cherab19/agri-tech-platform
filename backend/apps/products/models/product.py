from django.db import models
from django.utils.translation import gettext_lazy as _
from django.core.validators import MinValueValidator
from django.conf import settings


class Product(models.Model):
    """Product model for farmer's produce"""
    UNIT_CHOICES = (
        ('KG', _('Kilogram')),
        ('G', _('Gram')),
        ('L', _('Liter')),
        ('ML', _('Milliliter')),
        ('PIECE', _('Piece')),
        ('BUNCH', _('Bunch')),
        ('BAG', _('Bag')),
        ('CRATE', _('Crate')),
    )
    
    QUALITY_GRADES = (
        ('PREMIUM', _('Premium')),
        ('STANDARD', _('Standard')),
        ('ECONOMY', _('Economy')),
    )
    
    farmer = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        limit_choices_to={'user_type': 'FARMER'},
        related_name='products',
        verbose_name=_('Farmer Cooperative')
    )
    category = models.ForeignKey(
        'Category',
        on_delete=models.PROTECT,
        related_name='products',
        verbose_name=_('Category')
    )
    name = models.CharField(
        max_length=255,
        verbose_name=_('Product Name')
    )
    name_am = models.CharField(
        max_length=255,
        blank=True,
        verbose_name=_('Product Name (Amharic)')
    )
    name_om = models.CharField(
        max_length=255,
        blank=True,
        verbose_name=_('Product Name (Afaan Oromo)')
    )
    name_so = models.CharField(
        max_length=255,
        blank=True,
        verbose_name=_('Product Name (Somali)')
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
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0)],
        verbose_name=_('Price per Unit')
    )
    unit = models.CharField(
        max_length=10,
        choices=UNIT_CHOICES,
        verbose_name=_('Unit of Measurement')
    )
    quality_grade = models.CharField(
        max_length=10,
        choices=QUALITY_GRADES,
        default='STANDARD',
        verbose_name=_('Quality Grade')
    )
    min_order_quantity = models.DecimalField(
        max_digits=8,
        decimal_places=2,
        default=1,
        validators=[MinValueValidator(0)],
        verbose_name=_('Minimum Order Quantity')
    )
    max_order_quantity = models.DecimalField(
        max_digits=8,
        decimal_places=2,
        null=True,
        blank=True,
        validators=[MinValueValidator(0)],
        verbose_name=_('Maximum Order Quantity')
    )
    available_quantity = models.DecimalField(
        max_digits=8,
        decimal_places=2,
        default=0,
        validators=[MinValueValidator(0)],
        verbose_name=_('Available Quantity')
    )
    image = models.ImageField(
        upload_to='products/',
        null=True,
        blank=True,
        verbose_name=_('Product Image')
    )
    images = models.JSONField(
        default=list,
        blank=True,
        verbose_name=_('Additional Images')
    )
    is_organic = models.BooleanField(
        default=False,
        verbose_name=_('Is Organic')
    )
    is_active = models.BooleanField(
        default=True,
        verbose_name=_('Is Active')
    )
    is_approved = models.BooleanField(
        default=False,
        verbose_name=_('Is Approved')
    )
    rating = models.DecimalField(
        max_digits=3,
        decimal_places=2,
        default=0.0,
        verbose_name=_('Rating')
    )
    review_count = models.PositiveIntegerField(
        default=0,
        verbose_name=_('Review Count')
    )
    total_sold = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0,
        verbose_name=_('Total Quantity Sold')
    )
    tags = models.JSONField(
        default=list,
        blank=True,
        verbose_name=_('Product Tags')
    )
    harvest_date = models.DateField(
        null=True,
        blank=True,
        verbose_name=_('Harvest Date')
    )
    expiry_date = models.DateField(
        null=True,
        blank=True,
        verbose_name=_('Expiry Date')
    )
    storage_instructions = models.TextField(
        blank=True,
        verbose_name=_('Storage Instructions')
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
        db_table = 'products'
        verbose_name = _('Product')
        verbose_name_plural = _('Products')
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['is_active', 'is_approved']),
            models.Index(fields=['category', 'is_active']),
            models.Index(fields=['farmer', 'is_active']),
        ]
    
    def __str__(self):
        return f"{self.name} - {self.farmer.username}"
    
    @property
    def is_available(self):
        """Check if product is available for order"""
        return (
            self.is_active and 
            self.is_approved and 
            self.available_quantity > 0
        )
    
    @property
    def farmer_cooperative_name(self):
        """Get farmer cooperative name"""
        farmer_profile = self.farmer.get_profile()
        return farmer_profile.cooperative_name if farmer_profile else self.farmer.username
    
    @property
    def farmer_region(self):
        """Get farmer region"""
        farmer_profile = self.farmer.get_profile()
        return farmer_profile.region if farmer_profile else ""
    
    def get_name(self, language='en'):
        """Get product name in specified language"""
        language_map = {
            'en': self.name,
            'am': self.name_am or self.name,
            'om': self.name_om or self.name,
            'so': self.name_so or self.name,
        }
        return language_map.get(language, self.name)
    
    def get_description(self, language='en'):
        """Get product description in specified language"""
        language_map = {
            'en': self.description,
            'am': self.description_am or self.description,
            'om': self.description_om or self.description,
            'so': self.description_so or self.description,
        }
        return language_map.get(language, self.description)
    
    def update_rating(self, new_rating):
        """Update product rating when new review is added"""
        total_rating = (self.rating * self.review_count) + new_rating
        self.review_count += 1
        self.rating = total_rating / self.review_count
        self.save()
    
    def reduce_quantity(self, quantity):
        """Reduce available quantity when order is placed"""
        if quantity > self.available_quantity:
            raise ValueError(_("Insufficient quantity available"))
        
        self.available_quantity -= quantity
        self.total_sold += quantity
        self.save()
    
    def increase_quantity(self, quantity):
        """Increase available quantity"""
        self.available_quantity += quantity
        self.save()