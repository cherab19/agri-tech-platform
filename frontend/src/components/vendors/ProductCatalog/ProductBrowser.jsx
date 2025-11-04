import React, { useState, useEffect } from 'react';
import { useApi } from '../../../hooks/useApi';
import ProductCard from './ProductCard';
import ProductFilters from './ProductFilters';
import LoadingSpinner from '../../common/LoadingSpinner';

const ProductBrowser = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: '',
    minPrice: '',
    maxPrice: '',
    region: '',
    search: ''
  });

  const api = useApi();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, filters]);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products/available');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];

    if (filters.type) {
      filtered = filtered.filter(product => product.type === filters.type);
    }

    if (filters.minPrice) {
      filtered = filtered.filter(product => product.price >= parseFloat(filters.minPrice));
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(product => product.price <= parseFloat(filters.maxPrice));
    }

    if (filters.region) {
      filtered = filtered.filter(product => 
        product.farmer_region?.toLowerCase().includes(filters.region.toLowerCase())
      );
    }

    if (filters.search) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.type.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.farmer_cooperative_name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="product-browser">
      <div className="browser-header">
        <h2>Available Products</h2>
        <p>Browse and order fresh produce directly from farmers</p>
      </div>

      <ProductFilters 
        filters={filters} 
        onFilterChange={handleFilterChange}
        productCount={filteredProducts.length}
        totalProducts={products.length}
      />

      <div className="products-grid">
        {filteredProducts.length === 0 ? (
          <div className="empty-state">
            <p>No products found matching your criteria.</p>
            <button 
              className="btn-primary"
              onClick={() => setFilters({
                type: '', minPrice: '', maxPrice: '', region: '', search: ''
              })}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={onAddToCart}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ProductBrowser;