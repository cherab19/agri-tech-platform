import React, { useState, useEffect } from 'react';
import { useApi } from '../../../hooks/useApi';
import { useAuth } from '../../../contexts/AuthContext';
import LoadingSpinner from '../../common/LoadingSpinner';
import Notification from '../../common/Notification';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const { user } = useAuth();
  const api = useApi();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get(`/farmers/${user.id}/products`);
      setProducts(response.data);
    } catch (error) {
      showNotification('Error fetching products', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/products/${productId}`);
        showNotification('Product deleted successfully', 'success');
        fetchProducts();
      } catch (error) {
        showNotification('Error deleting product', 'error');
      }
    }
  };

  const toggleAvailability = async (productId, currentStatus) => {
    try {
      await api.patch(`/products/${productId}`, {
        availability: !currentStatus
      });
      showNotification('Product availability updated', 'success');
      fetchProducts();
    } catch (error) {
      showNotification('Error updating product', 'error');
    }
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 5000);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="product-list">
      <div className="page-header">
        <h2>My Products</h2>
        <button 
          className="btn-primary"
          onClick={() => window.location.href = '/farmer/products/add'}
        >
          Add New Product
        </button>
      </div>

      {notification.show && (
        <Notification message={notification.message} type={notification.type} />
      )}

      <div className="products-grid">
        {products.length === 0 ? (
          <div className="empty-state">
            <p>No products listed yet. Add your first product to get started.</p>
          </div>
        ) : (
          products.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.image || '/images/default-product.jpg'} alt={product.name} />
                <span className={`availability-badge ${product.availability ? 'available' : 'unavailable'}`}>
                  {product.availability ? 'Available' : 'Unavailable'}
                </span>
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-type">{product.type}</p>
                <p className="product-price">ETB {product.price}</p>
                <p className="product-quantity">Available: {product.quantity} {product.unit}</p>
                <p className="product-description">{product.description}</p>
              </div>
              <div className="product-actions">
                <button 
                  className="btn-secondary"
                  onClick={() => window.location.href = `/farmer/products/edit/${product.id}`}
                >
                  Edit
                </button>
                <button 
                  className={product.availability ? 'btn-warning' : 'btn-success'}
                  onClick={() => toggleAvailability(product.id, product.availability)}
                >
                  {product.availability ? 'Make Unavailable' : 'Make Available'}
                </button>
                <button 
                  className="btn-danger"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;