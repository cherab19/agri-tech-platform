import React, { useState } from 'react';

const ProductCard = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  const handleAddToCart = async () => {
    if (quantity < 1 || quantity > product.quantity) return;
    
    setAddingToCart(true);
    try {
      await onAddToCart({
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity: quantity,
        unit: product.unit,
        farmerCooperativeId: product.farmer_cooperative_id,
        farmerCooperativeName: product.farmer_cooperative_name,
        farmerRegion: product.farmer_region,
        image: product.image,
        maxQuantity: product.quantity
      });
      setQuantity(1);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setAddingToCart(false);
    }
  };

  const maxQuantity = Math.min(product.quantity, 100);

  return (
    <div className="product-card">
      <div className="product-image">
        <img 
          src={product.image || '/images/default-product.jpg'} 
          alt={product.name}
          onError={(e) => {
            e.target.src = '/images/default-product.jpg';
          }}
        />
        {product.quantity < 10 && product.quantity > 0 && (
          <span className="low-stock-badge">Low Stock</span>
        )}
        {product.quantity === 0 && (
          <span className="out-of-stock-badge">Out of Stock</span>
        )}
      </div>
      
      <div className="product-content">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-type">{product.type}</p>
        
        <div className="farmer-info">
          <span className="farmer-name">From: {product.farmer_cooperative_name}</span>
          <span className="farmer-region">📍 {product.farmer_region}</span>
        </div>
        
        <div className="product-price">
          <span className="price">ETB {product.price}</span>
          <span className="unit">per {product.unit}</span>
        </div>
        
        <div className="product-availability">
          <span className={`stock-status ${product.quantity > 0 ? 'in-stock' : 'out-of-stock'}`}>
            {product.quantity > 0 
              ? `${product.quantity} ${product.unit} available`
              : 'Out of stock'
            }
          </span>
        </div>

        {product.quantity > 0 && (
          <div className="product-actions">
            <div className="quantity-selector">
              <label htmlFor={`quantity-${product.id}`}>Quantity:</label>
              <div className="quantity-controls">
                <button
                  type="button"
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  id={`quantity-${product.id}`}
                  type="number"
                  min="1"
                  max={maxQuantity}
                  value={quantity}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 1;
                    setQuantity(Math.max(1, Math.min(maxQuantity, value)));
                  }}
                  className="quantity-input"
                />
                <button
                  type="button"
                  onClick={() => setQuantity(prev => Math.min(maxQuantity, prev + 1))}
                  disabled={quantity >= maxQuantity}
                >
                  +
                </button>
              </div>
              <span className="unit-label">{product.unit}</span>
            </div>
            
            <button
              className="btn-primary add-to-cart-btn"
              onClick={handleAddToCart}
              disabled={addingToCart || product.quantity < 1}
            >
              {addingToCart ? (
                <>
                  <span className="spinner"></span>
                  Adding...
                </>
              ) : (
                <>
                  <span className="cart-icon">🛒</span>
                  Add to Cart
                </>
              )}
            </button>
          </div>
        )}

        {product.description && (
          <p className="product-description">{product.description}</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;