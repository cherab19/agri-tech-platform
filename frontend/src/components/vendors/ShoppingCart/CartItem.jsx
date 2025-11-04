import React from 'react';
import { formatCurrency } from '../../../utils/formatters';

const CartItem = ({ item, onUpdateQuantity, onRemoveItem }) => {
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= item.maxQuantity) {
      onUpdateQuantity(item.productId, item.farmerCooperativeId, newQuantity);
    }
  };

  const handleRemove = () => {
    onRemoveItem(item.productId, item.farmerCooperativeId);
  };

  const totalPrice = item.price * item.quantity;

  return (
    <div className="cart-item">
      <div className="item-image">
        <img 
          src={item.image || '/images/default-product.jpg'} 
          alt={item.productName}
        />
      </div>
      
      <div className="item-details">
        <h4 className="item-name">{item.productName}</h4>
        <p className="item-farmer">From: {item.farmerCooperativeName}</p>
        <p className="item-price">{formatCurrency(item.price)} per {item.unit}</p>
        
        {item.quantity > item.maxQuantity && (
          <p className="stock-warning">
            Only {item.maxQuantity} {item.unit} available
          </p>
        )}
      </div>
      
      <div className="item-controls">
        <div className="quantity-controls">
          <button
            type="button"
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={item.quantity <= 1}
            className="quantity-btn"
          >
            −
          </button>
          
          <input
            type="number"
            min="1"
            max={item.maxQuantity}
            value={item.quantity}
            onChange={(e) => {
              const newQuantity = parseInt(e.target.value) || 1;
              handleQuantityChange(newQuantity);
            }}
            className="quantity-input"
          />
          
          <button
            type="button"
            onClick={() => handleQuantityChange(item.quantity + 1)}
            disabled={item.quantity >= item.maxQuantity}
            className="quantity-btn"
          >
            +
          </button>
        </div>
        
        <div className="item-total">
          {formatCurrency(totalPrice)}
        </div>
        
        <button
          onClick={handleRemove}
          className="remove-btn"
          title="Remove item"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default CartItem;