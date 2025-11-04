import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApi } from '../../../hooks/useApi';
import { useAuth } from '../../../contexts/AuthContext';
import { validateProduct } from '../../../utils/validators';
import LoadingSpinner from '../../common/LoadingSpinner';
import Notification from '../../common/Notification';

const EditProductForm = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    price: '',
    quantity: '',
    unit: 'kg',
    description: '',
    image: null,
    currentImage: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  
  const { user } = useAuth();
  const api = useApi();

  const productTypes = [
    'Vegetables', 'Fruits', 'Grains', 'Legumes', 'Spices', 
    'Coffee', 'Tea', 'Dairy', 'Poultry', 'Other'
  ];

  const units = ['kg', 'g', 'lb', 'piece', 'bundle', 'crate'];

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/products/${productId}`);
      const product = response.data;
      setFormData({
        name: product.name,
        type: product.type,
        price: product.price,
        quantity: product.quantity,
        unit: product.unit,
        description: product.description || '',
        image: null,
        currentImage: product.image
      });
    } catch (error) {
      showNotification('Error fetching product', 'error');
      navigate('/farmer/products');
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData(prev => ({ ...prev, image: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateProduct(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const submitData = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && key !== 'currentImage') {
          submitData.append(key, formData[key]);
        }
      });

      await api.put(`/products/${productId}`, submitData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      showNotification('Product updated successfully!', 'success');
      setTimeout(() => {
        navigate('/farmer/products');
      }, 2000);
    } catch (error) {
      showNotification('Error updating product', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 5000);
  };

  if (fetching) return <LoadingSpinner />;

  return (
    <div className="edit-product-form">
      <div className="page-header">
        <h2>Edit Product</h2>
        <button 
          className="btn-secondary"
          onClick={() => navigate('/farmer/products')}
        >
          Back to Products
        </button>
      </div>

      {notification.show && (
        <Notification message={notification.message} type={notification.type} />
      )}

      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label htmlFor="name">Product Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="type">Product Type *</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className={errors.type ? 'error' : ''}
          >
            <option value="">Select Type</option>
            {productTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {errors.type && <span className="error-text">{errors.type}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price">Price (ETB) *</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              className={errors.price ? 'error' : ''}
            />
            {errors.price && <span className="error-text">{errors.price}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="quantity">Quantity *</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="0"
              step="0.01"
              className={errors.quantity ? 'error' : ''}
            />
            {errors.quantity && <span className="error-text">{errors.quantity}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="unit">Unit *</label>
            <select
              id="unit"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
            >
              {units.map(unit => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <div className="form-group">
          <label>Current Image</label>
          {formData.currentImage ? (
            <div className="current-image">
              <img src={formData.currentImage} alt="Current product" />
            </div>
          ) : (
            <p>No image uploaded</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="image">Update Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
          <small>Leave empty to keep current image</small>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={() => navigate('/farmer/products')}>
            Cancel
          </button>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Updating Product...' : 'Update Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProductForm;