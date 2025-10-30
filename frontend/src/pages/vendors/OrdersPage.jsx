import React, { useState } from 'react'
import { useLanguage } from '../../../contexts/LanguageContext'
import { VendorLoading } from '../../components/common/LoadingSpinner'
import { notify } from '../../components/common/Notification'
import './orders-page.scss'

const OrdersPage = () => {
  const { t } = useLanguage()
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('all')

  const orders = [
    {
      id: 'ORD-006',
      products: [
        { name: 'Fresh Tomatoes', quantity: 50, unit: 'kg', price: 120 },
        { name: 'Green Peppers', quantity: 25, unit: 'kg', price: 180 }
      ],
      farmer: 'Green Valley Farmers',
      total: 10500,
      status: 'delivered',
      orderDate: '2024-01-15',
      deliveryDate: '2024-01-16',
      driver: 'Abebe Tesfaye',
      trackingId: 'TRK-789012',
      paymentStatus: 'paid'
    },
    {
      id: 'ORD-007',
      products: [
        { name: 'Carrots', quantity: 100, unit: 'kg', price: 90 }
      ],
      farmer: 'Highland Growers',
      total: 9000,
      status: 'in-transit',
      orderDate: '2024-01-14',
      deliveryDate: '2024-01-17',
      driver: 'Mekonnen Alemu',
      trackingId: 'TRK-789013',
      paymentStatus: 'paid'
    },
    {
      id: 'ORD-008',
      products: [
        { name: 'Onions', quantity: 75, unit: 'kg', price: 75 },
        { name: 'Potatoes', quantity: 50, unit: 'kg', price: 60 }
      ],
      farmer: 'Rift Valley Farms',
      total: 8625,
      status: 'processing',
      orderDate: '2024-01-16',
      deliveryDate: '2024-01-18',
      driver: 'Not assigned',
      trackingId: 'TRK-789014',
      paymentStatus: 'pending'
    },
    {
      id: 'ORD-009',
      products: [
        { name: 'Bananas', quantity: 10, unit: 'bunch', price: 150 }
      ],
      farmer: 'Tropical Fruits Coop',
      total: 1500,
      status: 'cancelled',
      orderDate: '2024-01-12',
      deliveryDate: '2024-01-14',
      driver: 'Not assigned',
      trackingId: 'TRK-789015',
      paymentStatus: 'refunded'
    }
  ]

  const statusTabs = [
    { key: 'all', label: t('orders.all_orders', 'All Orders'), count: orders.length },
    { key: 'processing', label: t('orders.processing', 'Processing'), count: orders.filter(o => o.status === 'processing').length },
    { key: 'in-transit', label: t('orders.in_transit', 'In Transit'), count: orders.filter(o => o.status === 'in-transit').length },
    { key: 'delivered', label: t('orders.delivered', 'Delivered'), count: orders.filter(o => o.status === 'delivered').length },
    { key: 'cancelled', label: t('orders.cancelled', 'Cancelled'), count: orders.filter(o => o.status === 'cancelled').length }
  ]

  const filteredOrders = activeTab === 'all' 
    ? orders 
    : orders.filter(order => order.status === activeTab)

  const getStatusBadge = (status) => {
    const statusConfig = {
      'processing': { class: 'warning', text: t('orders.processing', 'Processing') },
      'in-transit': { class: 'info', text: t('orders.in_transit', 'In Transit') },
      'delivered': { class: 'success', text: t('orders.delivered', 'Delivered') },
      'cancelled': { class: 'danger', text: t('orders.cancelled', 'Cancelled') }
    }
    
    const config = statusConfig[status] || statusConfig.processing
    return `badge bg-${config.class} bg-opacity-25 text-${config.class}`
  }

  const getPaymentStatusBadge = (status) => {
    const statusConfig = {
      'paid': { class: 'success', text: t('orders.paid', 'Paid') },
      'pending': { class: 'warning', text: t('orders.pending', 'Pending') },
      'refunded': { class: 'info', text: t('orders.refunded', 'Refunded') },
      'failed': { class: 'danger', text: t('orders.failed', 'Failed') }
    }
    
    const config = statusConfig[status] || statusConfig.pending
    return `badge bg-${config.class} bg-opacity-25 text-${config.class}`
  }

  const handleTrackOrder = (orderId) => {
    notify.info(t('orders.tracking_redirect', 'Redirecting to tracking page...'))
    // In a real app, this would navigate to the tracking page
  }

  const handleReorder = async (order) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      notify.success(t('orders.reorder_success', 'Items added to cart for reorder'))
    } catch (error) {
      notify.error(t('orders.reorder_failed', 'Failed to reorder items'))
    } finally {
      setLoading(false)
    }
  }

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm(t('orders.confirm_cancel', 'Are you sure you want to cancel this order?'))) {
      return
    }

    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      notify.success(t('orders.cancel_success', 'Order cancelled successfully'))
    } catch (error) {
      notify.error(t('orders.cancel_failed', 'Failed to cancel order'))
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="orders-page-loading">
        <VendorLoading />
      </div>
    )
  }

  return (
    <div className="vendor-orders-page">
      {/* Page Header */}
      <div className="page-header py-4 bg-white border-bottom">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col">
              <h1 className="h2 fw-bold mb-1">
                {t('orders.my_orders', 'My Orders')}
              </h1>
              <p className="text-muted mb-0">
                {t('orders.manage_track_orders', 'Manage and track your orders')}
              </p>
            </div>
            <div className="col-auto">
              <div className="orders-stats">
                <div className="row g-3">
                  <div className="col-auto">
                    <div className="stat-item text-center">
                      <div className="stat-value text-primary fw-bold">{orders.length}</div>
                      <div className="stat-label text-muted small">
                        {t('orders.total_orders', 'Total Orders')}
                      </div>
                    </div>
                  </div>
                  <div className="col-auto">
                    <div className="stat-item text-center">
                      <div className="stat-value text-warning fw-bold">
                        {orders.filter(o => o.status === 'processing').length}
                      </div>
                      <div className="stat-label text-muted small">
                        {t('orders.processing', 'Processing')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="status-tabs py-3 bg-light border-bottom">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <div className="d-flex flex-wrap gap-2">
                {statusTabs.map((tab) => (
                  <button
                    key={tab.key}
                    className={`btn btn-sm ${
                      activeTab === tab.key ? 'btn-primary' : 'btn-outline-primary'
                    } position-relative`}
                    onClick={() => setActiveTab(tab.key)}
                  >
                    {tab.label}
                    {tab.count > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="orders-list py-4">
        <div className="container-fluid">
          <div className="row g-4">
            {filteredOrders.map((order) => (
              <div key={order.id} className="col-12">
                <div className="order-card card border-0 shadow-sm">
                  <div className="card-body">
                    {/* Order Header */}
                    <div className="order-header d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <h5 className="order-id fw-bold text-primary mb-1">
                          {order.id}
                        </h5>
                        <p className="order-farmer text-muted mb-0">
                          {t('orders.from', 'From')} {order.farmer}
                        </p>
                      </div>
                      <div className="text-end">
                        <div className="order-total h5 fw-bold text-dark mb-1">
                          ₦{order.total.toLocaleString()}
                        </div>
                        <div className="order-date text-muted small">
                          {new Date(order.orderDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    {/* Order Products */}
                    <div className="order-products mb-3">
                      <h6 className="fw-semibold mb-2">
                        {t('orders.products', 'Products')}:
                      </h6>
                      <div className="products-list">
                        {order.products.map((product, index) => (
                          <div key={index} className="product-item d-flex justify-content-between align-items-center py-1">
                            <span className="product-name">
                              {product.quantity} {product.unit} {product.name}
                            </span>
                            <span className="product-price fw-semibold">
                              ₦{(product.quantity * product.price).toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Details */}
                    <div className="order-details row g-3 mb-3">
                      <div className="col-md-3">
                        <strong>{t('orders.delivery_date', 'Delivery Date')}:</strong>
                        <br />
                        <span className="text-muted">
                          {new Date(order.deliveryDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="col-md-3">
                        <strong>{t('orders.driver', 'Driver')}:</strong>
                        <br />
                        <span className="text-muted">{order.driver}</span>
                      </div>
                      <div className="col-md-3">
                        <strong>{t('orders.tracking_id', 'Tracking ID')}:</strong>
                        <br />
                        <span className="text-muted">{order.trackingId}</span>
                      </div>
                      <div className="col-md-3">
                        <strong>{t('orders.payment_status', 'Payment Status')}:</strong>
                        <br />
                        <span className={getPaymentStatusBadge(order.paymentStatus)}>
                          {order.paymentStatus === 'paid' ? t('orders.paid', 'Paid') :
                           order.paymentStatus === 'pending' ? t('orders.pending', 'Pending') :
                           order.paymentStatus === 'refunded' ? t('orders.refunded', 'Refunded') :
                           t('orders.failed', 'Failed')}
                        </span>
                      </div>
                    </div>

                    {/* Order Footer */}
                    <div className="order-footer d-flex justify-content-between align-items-center">
                      <div className="order-status">
                        <span className={getStatusBadge(order.status)}>
                          {order.status === 'processing' ? t('orders.processing', 'Processing') :
                           order.status === 'in-transit' ? t('orders.in_transit', 'In Transit') :
                           order.status === 'delivered' ? t('orders.delivered', 'Delivered') :
                           t('orders.cancelled', 'Cancelled')}
                        </span>
                      </div>
                      <div className="order-actions">
                        {order.status === 'processing' && (
                          <button
                            className="btn btn-outline-danger btn-sm me-2"
                            onClick={() => handleCancelOrder(order.id)}
                            disabled={loading}
                          >
                            <i className="fas fa-times me-1"></i>
                            {t('orders.cancel', 'Cancel')}
                          </button>
                        )}
                        {order.status === 'in-transit' && (
                          <button
                            className="btn btn-outline-primary btn-sm me-2"
                            onClick={() => handleTrackOrder(order.id)}
                          >
                            <i className="fas fa-map-marker-alt me-1"></i>
                            {t('orders.track', 'Track')}
                          </button>
                        )}
                        {(order.status === 'delivered' || order.status === 'cancelled') && (
                          <button
                            className="btn btn-outline-success btn-sm"
                            onClick={() => handleReorder(order)}
                            disabled={loading}
                          >
                            <i className="fas fa-redo me-1"></i>
                            {t('orders.reorder', 'Reorder')}
                          </button>
                        )}
                        <button className="btn btn-outline-secondary btn-sm ms-2">
                          <i className="fas fa-eye me-1"></i>
                          {t('orders.view_details', 'Details')}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredOrders.length === 0 && (
            <div className="text-center py-5">
              <div className="empty-state-icon mb-3">
                <i className="fas fa-clipboard-list text-muted" style={{ fontSize: '3rem' }}></i>
              </div>
              <h5 className="text-muted mb-2">
                {t('orders.no_orders_found', 'No Orders Found')}
              </h5>
              <p className="text-muted mb-3">
                {activeTab === 'all' 
                  ? t('orders.no_orders_description', 'You haven\'t placed any orders yet. Start shopping to see your orders here.')
                  : t('orders.no_filtered_orders', `No orders with status "${statusTabs.find(tab => tab.key === activeTab)?.label}"`)
                }
              </p>
              {activeTab !== 'all' ? (
                <button
                  className="btn btn-outline-primary"
                  onClick={() => setActiveTab('all')}
                >
                  {t('orders.view_all_orders', 'View All Orders')}
                </button>
              ) : (
                <a href="/vendor/marketplace" className="btn btn-primary">
                  <i className="fas fa-store me-2"></i>
                  {t('orders.start_shopping', 'Start Shopping')}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default OrdersPage