import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../contexts/LanguageContext'
import { VendorLoading } from '../../components/common/LoadingSpinner'
import { notify } from '../../components/common/Notification'
import './marketplace-page.scss'
import { vendorsService } from '../../services/api/vendors'
import { productsService } from '../../services/api/products'

const MarketplacePage = () => {
  const { t } = useLanguage()
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('popular')

  const categories = [
    { value: 'all', label: t('marketplace.all_categories', 'All Categories') },
    { value: 'vegetables', label: t('marketplace.vegetables', 'Vegetables') },
    { value: 'fruits', label: t('marketplace.fruits', 'Fruits') },
    { value: 'grains', label: t('marketplace.grains', 'Grains') },
    { value: 'tubers', label: t('marketplace.tubers', 'Tubers') },
    { value: 'legumes', label: t('marketplace.legumes', 'Legumes') }
  ]

  // products state will be populated from the backend
  const [products, setProducts] = useState([])
  const [initialLoading, setInitialLoading] = useState(true)

  const fetchProducts = async () => {
    try {
      const res = await vendorsService.getAvailableProducts({ available_only: true })
      const data = res && res.data ? res.data : res
      // backend returns an array or { results: [] }
      const list = Array.isArray(data) ? data : (data.results || [])
      setProducts(list)
    } catch (err) {
      // No fallback data — show empty state and let user know via console
      console.error('Failed to fetch available products', err)
    } finally {
      setInitialLoading(false)
    }
  }

  useEffect(() => {
    // fetch live products on mount
    fetchProducts()
    // optionally we could return a cleanup or interval here in the future
  }, [])

  const filteredProducts = products.filter(product => {
    const farmerName = product.farmer_cooperative_name || ''
    const matchesSearch = (product.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         farmerName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || (product.category || '').toLowerCase() === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      case 'popular':
      default:
        return b.reviews - a.reviews
    }
  })

  const handleAddToCart = async (product) => {
    setLoading(true)
    try {
      // Fetch fresh product details from backend before adding to cart
      let detailRes
      try {
        detailRes = await productsService.getProduct(product.id)
      } catch (fetchErr) {
        console.warn('Failed to fetch product detail before add to cart, using card data', fetchErr)
      }

      const detailedProduct = detailRes && detailRes.data ? detailRes.data : (detailRes || product)

      // TODO: call cart context addToCart when integrated; for now simulate and notify
      // e.g. addToCart(detailedProduct, 1)
      await new Promise(resolve => setTimeout(resolve, 300))
      notify.success(t('marketplace.added_to_cart', 'Product added to cart successfully'))
    } catch (error) {
      notify.error(t('marketplace.add_to_cart_failed', 'Failed to add product to cart'))
    } finally {
      setLoading(false)
    }
  }

  const handleQuickOrder = async (product) => {
    setLoading(true)
    try {
      // Fetch fresh product details from backend before quick ordering
      let detailRes
      try {
        detailRes = await productsService.getProduct(product.id)
      } catch (fetchErr) {
        console.warn('Failed to fetch product detail before quick order, using card data', fetchErr)
      }

      const detailedProduct = detailRes && detailRes.data ? detailRes.data : (detailRes || product)

      // TODO: place a real quick-order request using detailedProduct
      await new Promise(resolve => setTimeout(resolve, 300))
      notify.success(t('marketplace.quick_order_placed', 'Quick order placed successfully'))
    } catch (error) {
      notify.error(t('marketplace.quick_order_failed', 'Failed to place quick order'))
    } finally {
      setLoading(false)
    }
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <i
        key={index}
        className={`fas fa-star ${index < Math.floor(rating) ? 'text-warning' : 'text-light'}`}
      ></i>
    ))
  }

  if (loading || initialLoading) {
    return (
      <div className="marketplace-page-loading">
        <VendorLoading />
      </div>
    )
  }

  return (
    <div className="marketplace-page">
      {/* Page Header */}
      <div className="page-header py-4 bg-white border-bottom">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col">
              <h1 className="h2 fw-bold mb-1">
                {t('marketplace.marketplace', 'Marketplace')}
              </h1>
              <p className="text-muted mb-0">
                {t('marketplace.find_fresh_produce', 'Find fresh produce directly from farmers')}
              </p>
            </div>
            <div className="col-auto">
              <div className="cart-indicator">
                <a href="/vendor/cart" className="btn btn-primary position-relative">
                  <i className="fas fa-shopping-cart me-2"></i>
                  {t('marketplace.cart', 'Cart')}
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    3
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="filters-section py-3 bg-light border-bottom">
        <div className="container-fluid">
          <div className="row g-3 align-items-center">
            <div className="col-lg-4 col-md-6">
              <div className="search-box">
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0">
                    <i className="fas fa-search text-muted"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control border-start-0"
                    placeholder={t('marketplace.search_products', 'Search products or farmers...')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <select
                className="form-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-lg-3 col-md-6">
              <select
                className="form-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="popular">{t('marketplace.most_popular', 'Most Popular')}</option>
                <option value="rating">{t('marketplace.highest_rated', 'Highest Rated')}</option>
                <option value="price-low">{t('marketplace.price_low_high', 'Price: Low to High')}</option>
                <option value="price-high">{t('marketplace.price_high_low', 'Price: High to Low')}</option>
              </select>
            </div>
            <div className="col-lg-2 col-md-6">
              <div className="results-count text-muted">
                {t('marketplace.found', 'Found')} {sortedProducts.length} {t('marketplace.products', 'products')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="products-grid py-4">
        <div className="container-fluid">
          <div className="row g-4">
            {sortedProducts.map((product) => (
              <div key={product.id} className="col-xl-4 col-lg-6 col-md-6">
                <div className="product-card">
                  <Link to={`/product/${product.id}`} className="text-decoration-none text-dark d-block h-100">
                    <div className="card border-0 shadow-sm h-100">
                      {/* Product Image */}
                      <div className="product-image position-relative">
                        <img
                          src={product.image}
                          className="card-img-top"
                          style={{ height: '200px', objectFit: 'cover' }}
                          alt={product.name}
                        />
                        {product.organic && (
                          <span className="position-absolute top-0 start-0 m-2 badge bg-success">
                            <i className="fas fa-leaf me-1"></i>
                            {t('marketplace.organic', 'Organic')}
                          </span>
                        )}
                        <div className="position-absolute top-0 end-0 m-2">
                          <button className="btn btn-light btn-sm rounded-circle" onClick={(e) => e.stopPropagation()}>
                            <i className="far fa-heart"></i>
                          </button>
                        </div>
                      </div>

                        <div className="card-body">
                        {/* Product Info */}
                        <div className="product-info mb-3">
                          <h5 className="product-name fw-semibold mb-1">
                            {product.name}
                          </h5>
                        <p className="product-farmer text-muted small mb-2">
                          {t('marketplace.by', 'By')} {product.farmer_cooperative_name || ''}
                        </p>
                        
                        {/* Rating */}
                        <div className="product-rating d-flex align-items-center mb-2">
                          <div className="stars me-2">
                            {renderStars(product.rating)}
                          </div>
                          <span className="rating-value fw-semibold me-1">
                            {product.rating}
                          </span>
                          <span className="reviews-count text-muted small">
                            ({product.reviews} {t('marketplace.reviews', 'reviews')})
                          </span>
                        </div>

                        {/* Availability */}
                        <div className="product-availability d-flex justify-content-between align-items-center mb-2">
                            <span className="availability text-success small">
                            <i className="fas fa-check-circle me-1"></i>
                            {t('marketplace.in_stock', 'In Stock')} ({product.available_quantity || product.available || 0} {product.unit || ''})
                          </span>
                          <span className="delivery-time text-muted small">
                            <i className="fas fa-truck me-1"></i>
                            {product.deliveryTime}
                          </span>
                        </div>
                      </div>

                      {/* Price and Actions */}
                                  <div className="product-actions">
                                  <div className="d-flex justify-content-between align-items-center">
                                    <div className="price-section">
                                    <h4 className="price fw-bold text-primary mb-0">
                                      ETB{product.price}
                                      <small className="text-muted">/{product.unit}</small>
                                    </h4>
                                    <small className="text-muted">
                                      {t('marketplace.min_order', 'Min. order')}: {product.min_order_quantity || product.minOrder || 1} {product.unit || ''}
                                    </small>
                                    </div>
                                    <div className="action-buttons">
                                    <button
                                      className="btn btn-outline-primary btn-sm me-2"
                                      onClick={(e) => { e.stopPropagation(); handleAddToCart(product) }}
                                      disabled={loading}
                                    >
                                      <i className="fas fa-cart-plus me-1"></i>
                                      {t('marketplace.add_to_cart', 'Add to Cart')}
                                    </button>
                                    <button
                                      className="btn btn-primary btn-sm"
                                      onClick={(e) => { e.stopPropagation(); handleQuickOrder(product) }}
                                      disabled={loading}
                                    >
                                      {t('marketplace.order', 'Order')}
                                    </button>
                                    </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                    </Link>
                </div>
              </div>
            ))}
                            </div>

                            {/* Empty State */}
          {sortedProducts.length === 0 && (
            <div className="text-center py-5">
              <div className="empty-state-icon mb-3">
                <i className="fas fa-search text-muted" style={{ fontSize: '3rem' }}></i>
              </div>
              <h5 className="text-muted mb-2">
                {t('marketplace.no_products_found', 'No Products Found')}
              </h5>
              <p className="text-muted mb-3">
                {t('marketplace.try_different_search', 'Try adjusting your search or filter criteria to find more products.')}
              </p>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('all')
                }}
              >
                {t('marketplace.clear_filters', 'Clear Filters')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MarketplacePage