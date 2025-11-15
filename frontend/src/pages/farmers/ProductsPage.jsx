import React, { useState, useEffect } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { FarmerLoading } from '../../components/common/LoadingSpinner'
import { notify } from '../../components/common/Notification'
import './products-page.scss'
import { apiClient } from '../../services/api/apiClient'
import { useAuth } from '../../contexts/AuthContext'
import { productsService } from '../../services/api/products'

const ProductsPage = () => {
  const { t } = useLanguage()
  const { user, token } = useAuth()
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchMyProducts = async () => {
      setInitialLoading(true)
      try {
        const res = token
          ? await apiClient.get('/products/my-products/', { headers: { Authorization: `Bearer ${token}` } })
          : await apiClient.get('/products/my-products/')
        const data = res && res.data ? res.data : res
        const list = Array.isArray(data) ? data : (data.results || [])
        setProducts(list)
      } catch (err) {
        console.error('Failed to fetch my products', err)
        setProducts([])
      } finally {
        setInitialLoading(false)
      }
    }

    fetchMyProducts()
  }, [token])

  const categories = [
    t('products.vegetables', 'Vegetables'),
    t('products.fruits', 'Fruits'),
    t('products.grains', 'Grains'),
    t('products.tubers', 'Tubers'),
    t('products.legumes', 'Legumes')
  ]

  const handleStatusChange = async (productId, newStatus) => {
    setLoading(true)
    try {
      // Map newStatus to API payload; backend expects is_active flag
      const payload = { is_active: newStatus === 'active' }
      await productsService.updateProduct(productId, payload, token)

      setProducts(prev => prev.map(product =>
        product.id === productId ? { ...product, status: newStatus, is_active: payload.is_active } : product
      ))

      notify.success(t('products.status_updated', 'Product status updated successfully'))
    } catch (error) {
      notify.error(t('products.update_failed', 'Failed to update product status'))
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm(t('products.confirm_delete', 'Are you sure you want to delete this product?'))) {
      return
    }

    setLoading(true)
    try {
      await productsService.deleteProduct(productId, token)
      setProducts(prev => prev.filter(product => product.id !== productId))
      notify.success(t('products.deleted', 'Product deleted successfully'))
    } catch (error) {
      notify.error(t('products.delete_failed', 'Failed to delete product'))
    } finally {
      setLoading(false)
    }
  }

  const getProductStatus = (product) => {
    if (product.status) return product.status
    if (product.available_quantity != null) {
      if (Number(product.available_quantity) <= 0) return 'out-of-stock'
      // low-stock threshold (example: < min_order_quantity * 2)
      if (product.min_order_quantity && Number(product.available_quantity) < Number(product.min_order_quantity) * 2) return 'low-stock'
    }
    if (product.is_active === false) return 'inactive'
    return 'active'
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      'active': { class: 'success', text: t('products.active', 'Active') },
      'low-stock': { class: 'warning', text: t('products.low_stock', 'Low Stock') },
      'out-of-stock': { class: 'danger', text: t('products.out_of_stock', 'Out of Stock') },
      'inactive': { class: 'secondary', text: t('products.inactive', 'Inactive') }
    }
    
    const config = statusConfig[status] || statusConfig.inactive
    return `badge bg-${config.class} bg-opacity-25 text-${config.class}`
  }

  if (initialLoading) {
    return (
      <div className="products-page-loading">
        <FarmerLoading />
      </div>
    )
  }

  return (
    <div className="products-page">
      {/* Page Header */}
      <div className="page-header py-4 bg-white border-bottom">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col">
              <h1 className="h2 fw-bold mb-1">
                {t('products.my_products', 'My Products')}
              </h1>
              <p className="text-muted mb-0">
                {t('products.manage_inventory', 'Manage your agricultural products and inventory')}
              </p>
            </div>
            <div className="col-auto">
              <a href="/farmer/products/add" className="btn btn-primary">
                <i className="fas fa-plus me-2"></i>
                {t('products.add_product', 'Add New Product')}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Products Summary */}
      <div className="products-summary py-4 bg-light">
        <div className="container-fluid">
          <div className="row g-3">
            <div className="col-lg-3 col-md-6">
              <div className="summary-card text-center p-3 bg-white rounded shadow-sm">
                <h3 className="fw-bold text-primary mb-1">{products.length}</h3>
                <p className="text-muted mb-0 small">
                  {t('products.total_products', 'Total Products')}
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="summary-card text-center p-3 bg-white rounded shadow-sm">
                <h3 className="fw-bold text-success mb-1">
                  {products.filter(p => getProductStatus(p) === 'active').length}
                </h3>
                <p className="text-muted mb-0 small">
                  {t('products.active_products', 'Active Products')}
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="summary-card text-center p-3 bg-white rounded shadow-sm">
                <h3 className="fw-bold text-warning mb-1">
                  {products.filter(p => getProductStatus(p) === 'low-stock').length}
                </h3>
                <p className="text-muted mb-0 small">
                  {t('products.low_stock', 'Low Stock')}
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="summary-card text-center p-3 bg-white rounded shadow-sm">
                <h3 className="fw-bold text-danger mb-1">
                  {products.filter(p => getProductStatus(p) === 'out-of-stock').length}
                </h3>
                <p className="text-muted mb-0 small">
                  {t('products.out_of_stock', 'Out of Stock')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products List */}
      <div className="products-list py-4">
        <div className="container-fluid">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0 py-3">
              <div className="row align-items-center">
                <div className="col">
                  <h5 className="fw-bold mb-0">
                    {t('products.all_products', 'All Products')}
                  </h5>
                </div>
                <div className="col-auto">
                  <div className="input-group input-group-sm" style={{ width: '250px' }}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={t('products.search_products', 'Search products...')}
                    />
                    <button className="btn btn-outline-secondary" type="button">
                      <i className="fas fa-search"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead>
                    <tr>
                      <th>{t('products.product', 'Product')}</th>
                      <th>{t('products.category', 'Category')}</th>
                      <th>{t('products.price', 'Price')}</th>
                      <th>{t('products.quantity', 'Quantity')}</th>
                      <th>{t('products.available', 'Available')}</th>
                      <th>{t('products.status', 'Status')}</th>
                      <th>{t('products.actions', 'Actions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="product-image me-3">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="rounded"
                                width="40"
                                height="40"
                              />
                            </div>
                            <div>
                              <div className="fw-semibold">{product.name}</div>
                            </div>
                          </div>
                        </td>
                        <td>{product.category}</td>
                        <td>
                          <span className="fw-semibold">ETB{product.price}</span>
                          <small className="text-muted">/{product.unit}</small>
                        </td>
                        {(() => {
                          const qty = product.quantity ?? product.available_quantity ?? 0
                          const avail = product.available_quantity ?? product.available ?? 0
                          const status = getProductStatus(product)
                          return (
                            <>
                              <td>{qty} {product.unit}</td>
                              <td>{avail} {product.unit}</td>
                              <td>
                                <span className={getStatusBadge(status)}>
                                  {status === 'active' ? t('products.active', 'Active') :
                                   status === 'low-stock' ? t('products.low_stock', 'Low Stock') :
                                   status === 'out-of-stock' ? t('products.out_of_stock', 'Out of Stock') :
                                   t('products.inactive', 'Inactive')}
                                </span>
                              </td>
                            </>
                          )
                        })()}
                        <td>
                          <div className="btn-group btn-group-sm">
                            <a
                              href={`/farmer/products/edit/${product.id}`}
                              className="btn btn-outline-primary"
                            >
                              <i className="fas fa-edit"></i>
                            </a>
                            <button
                              className="btn btn-outline-danger"
                              onClick={() => handleDeleteProduct(product.id)}
                              disabled={loading}
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Empty State */}
              {products.length === 0 && (
                <div className="text-center py-5">
                  <div className="empty-state-icon mb-3">
                    <i className="fas fa-seedling text-muted" style={{ fontSize: '3rem' }}></i>
                  </div>
                  <h5 className="text-muted mb-2">
                    {t('products.no_products', 'No Products Found')}
                  </h5>
                  <p className="text-muted mb-3">
                    {t('products.start_listing', 'Start listing your agricultural products to reach more vendors')}
                  </p>
                  <a href="/farmer/products/add" className="btn btn-primary">
                    <i className="fas fa-plus me-2"></i>
                    {t('products.add_first_product', 'Add Your First Product')}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsPage