import React from 'react';

const ProductFilters = ({ filters, onFilterChange, productCount, totalProducts }) => {
  const productTypes = [
    'Vegetables', 'Fruits', 'Grains', 'Legumes', 'Spices', 
    'Coffee', 'Tea', 'Dairy', 'Poultry', 'Other'
  ];

  const regions = [
    'Addis Ababa', 'Oromia', 'Amhara', 'Tigray', 'SNNPR', 
    'Somali', 'Afar', 'Dire Dawa', 'Harari', 'Benishangul-Gumuz', 'Gambela'
  ];

  const handleFilterUpdate = (key, value) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  const clearFilters = () => {
    onFilterChange({
      type: '',
      minPrice: '',
      maxPrice: '',
      region: '',
      search: ''
    });
  };

  return (
    <div className="product-filters">
      <div className="filters-header">
        <h3>Filters</h3>
        <span className="product-count">
          Showing {productCount} of {totalProducts} products
        </span>
      </div>

      <div className="filters-grid">
        {/* Search Filter */}
        <div className="filter-group">
          <label htmlFor="search">Search Products</label>
          <input
            type="text"
            id="search"
            placeholder="Search by name, type, or farmer..."
            value={filters.search}
            onChange={(e) => handleFilterUpdate('search', e.target.value)}
          />
        </div>

        {/* Product Type Filter */}
        <div className="filter-group">
          <label htmlFor="type">Product Type</label>
          <select
            id="type"
            value={filters.type}
            onChange={(e) => handleFilterUpdate('type', e.target.value)}
          >
            <option value="">All Types</option>
            {productTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Region Filter */}
        <div className="filter-group">
          <label htmlFor="region">Farmer Region</label>
          <select
            id="region"
            value={filters.region}
            onChange={(e) => handleFilterUpdate('region', e.target.value)}
          >
            <option value="">All Regions</option>
            {regions.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>

        {/* Price Range Filters */}
        <div className="filter-group price-range">
          <label>Price Range (ETB)</label>
          <div className="price-inputs">
            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice}
              onChange={(e) => handleFilterUpdate('minPrice', e.target.value)}
              min="0"
            />
            <span className="price-separator">-</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(e) => handleFilterUpdate('maxPrice', e.target.value)}
              min="0"
            />
          </div>
        </div>

        {/* Clear Filters */}
        <div className="filter-group">
          <button 
            className="btn-secondary clear-filters"
            onClick={clearFilters}
          >
            Clear All Filters
          </button>
        </div>
      </div>

      {/* Active Filters Display */}
      {(filters.type || filters.minPrice || filters.maxPrice || filters.region || filters.search) && (
        <div className="active-filters">
          <strong>Active Filters:</strong>
          {filters.search && (
            <span className="active-filter">
              Search: "{filters.search}"
              <button onClick={() => handleFilterUpdate('search', '')}>×</button>
            </span>
          )}
          {filters.type && (
            <span className="active-filter">
              Type: {filters.type}
              <button onClick={() => handleFilterUpdate('type', '')}>×</button>
            </span>
          )}
          {filters.region && (
            <span className="active-filter">
              Region: {filters.region}
              <button onClick={() => handleFilterUpdate('region', '')}>×</button>
            </span>
          )}
          {(filters.minPrice || filters.maxPrice) && (
            <span className="active-filter">
              Price: {filters.minPrice || '0'} - {filters.maxPrice || '∞'} ETB
              <button onClick={() => {
                handleFilterUpdate('minPrice', '');
                handleFilterUpdate('maxPrice', '');
              }}>×</button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductFilters;