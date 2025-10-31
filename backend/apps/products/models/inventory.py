from django.db import models
from django.utils.translation import gettext_lazy as _
from django.core.validators import MinValueValidator


class Inventory(models.Model):
    """Inventory tracking model for product quantities"""
    TRANSACTION_TYPES = (
        ('STOCK_IN', _('Stock In')),
        ('STOCK_OUT', _('Stock Out')),
        ('ADJUSTMENT', _('Adjustment')),
        ('SOLD', _('Sold')),
        ('RETURNED', _('Returned')),
    )
    
    product = models.ForeignKey(
        'Product',
        on_delete=models.CASCADE,
        related_name='inventory_records',
        verbose_name=_('Product')
    )
    transaction_type = models.CharField(
        max_length=15,
        choices=TRANSACTION_TYPES,
        verbose_name=_('Transaction Type')
    )
    quantity = models.DecimalField(
        max_digits=8,
        decimal_places=2,
        validators=[MinValueValidator(0)],
        verbose_name=_('Quantity')
    )
    previous_quantity = models.DecimalField(
        max_digits=8,
        decimal_places=2,
        validators=[MinValueValidator(0)],
        verbose_name=_('Previous Quantity')
    )
    new_quantity = models.DecimalField(
        max_digits=8,
        decimal_places=2,
        validators=[MinValueValidator(0)],
        verbose_name=_('New Quantity')
    )
    reason = models.CharField(
        max_length=255,
        blank=True,
        verbose_name=_('Reason for Change')
    )
    reference_id = models.CharField(
        max_length=100,
        blank=True,
        verbose_name=_('Reference ID (e.g., Order ID)')
    )
    notes = models.TextField(
        blank=True,
        verbose_name=_('Additional Notes')
    )
    created_by = models.ForeignKey(
        'users.CustomUser',
        on_delete=models.SET_NULL,
        null=True,
        verbose_name=_('Created By')
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name=_('Created At')
    )
    
    class Meta:
        db_table = 'inventory_records'
        verbose_name = _('Inventory Record')
        verbose_name_plural = _('Inventory Records')
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['product', 'created_at']),
            models.Index(fields=['transaction_type', 'created_at']),
        ]
    
    def __str__(self):
        return f"{self.product.name} - {self.transaction_type} - {self.quantity}"
    
    def save(self, *args, **kwargs):
        """Calculate new quantity before saving"""
        if not self.pk:  # Only for new records
            if self.transaction_type in ['STOCK_IN', 'RETURNED']:
                self.new_quantity = self.previous_quantity + self.quantity
            elif self.transaction_type in ['STOCK_OUT', 'SOLD']:
                self.new_quantity = self.previous_quantity - self.quantity
            elif self.transaction_type == 'ADJUSTMENT':
                self.new_quantity = self.quantity  # For adjustments, quantity is the new value
        
        super().save(*args, **kwargs)