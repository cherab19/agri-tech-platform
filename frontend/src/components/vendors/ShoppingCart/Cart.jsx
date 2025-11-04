import React from 'react';
import CartItem from './CartItem';
import { formatCurrency } from '../../../utils/formatters';

const Cart = ({ cartItems, onUpdateQuantity, onRemoveItem, onCheckout }) => {
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateItemsCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const groupItemsByFarmer = () => {
    const grouped = {};
    cartItems.forEach(item => {
      if (!grouped[item.farmerCooperativeId]) {
        grouped[item.farmerCooperativeId] = {
          farmerName: item.farmerCooperativeName,
          items: []
        };
      }
      grouped[item.farmerCooperativeId].items.push(item);
    });
    return grouped;
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <div className="empty-icon">🛒</div>
        <h2>Your Cart is Empty</h2>
        <p>Add some fresh products from the marketplace to get started.</p>
        <button 
          className="btn-primary"
          onClick={() => window.location.href = '/vendor/marketplace'}
        >
          Browse Products
        </button>
      </div>
    );
  }

  const groupedItems = groupItemsByFarmer();

  return (
    <div className="cart">
      <div className="cart-header">
        <h2>Shopping Cart</h2>
        <p className="cart-summary">
          {calculateItemsCount()} item{calculateItemsCount() !== 1 ? 's' : ''} from {Object.keys(groupedItems).length} farmer{Object.keys(groupedItems).length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {Object.entries(groupedItems).map(([farmerId, farmerData]) => (
            <div key={farmerId} className="farmer-group">
              <div className="farmer-header">
                <h3>From: {farmerData.farmerName}</h3>
              </div>
              {farmerData.items.map(item => (
                <CartItem
                  key={`${item.productId}-${item.farmerCooperativeId}`}
                  item={item}
                  onUpdateQuantity={onUpdateQuantity}
                  onRemoveItem={onRemoveItem}
                />
              ))}
            </div>
          ))}
        </div>

        <div className="cart-summary-sidebar">
          <div className="summary-card">
            <h3>Order Summary</h3>
            
            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal ({calculateItemsCount()} items):</span>
                <span>{formatCurrency(calculateSubtotal())}</span>
              </div>
              <div className="summary-row">
                <span>Delivery Fee:</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="summary-row">
                <span>Platform Commission:</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="summary-row total">
                <span>Estimated Total:</span>
                <span>{formatCurrency(calculateSubtotal())}</span>
              </div>
            </div>

            <div className="checkout-actions">
              <button 
                className="btn-primary checkout-btn"
                onClick={onCheckout}
              >
                Proceed to Checkout
              </button>
              
              <button 
                className="btn-secondary continue-shopping"
                onClick={() => window.location.href = '/vendor/marketplace'}
              >
                Continue Shopping
              </button>
            </div>

            <div className="security-notice">
              <span className="lock-icon">🔒</span>
              <small>Your payment information is secure and encrypted</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;