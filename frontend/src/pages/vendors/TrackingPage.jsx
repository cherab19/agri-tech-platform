import React, { useState, useEffect } from 'react'
import { useLanguage } from '../../../contexts/LanguageContext'
import { VendorLoading } from '../../components/common/LoadingSpinner'
import './tracking-page.scss'

const TrackingPage = () => {
  const { t } = useLanguage()
  const [loading, setLoading] = useState(true)
  const [activeOrder, setActiveOrder] = useState(null)

  // Mock delivery data
  const deliveryData = {
    orderId: 'ORD-007',
    farmer: 'Highland Growers',
    driver: 'Mekonnen Alemu',
    vehicle: 'Toyota Truck - A1234',
    phone: '+251 911 234 567',
    estimatedDelivery: '2024-01-17T14:00:00',
    currentStatus: 'in-transit',
    trackingId: 'TRK-789013',
    products: [
      { name: 'Carrots', quantity: 100, unit: 'kg' }
    ],
    total: 9000,
    timeline: [
      {
        status: 'order-placed',
        title: t('tracking.order_placed', 'Order Placed'),
        description: t('tracking.order_placed_desc', 'Your order has been confirmed'),
        timestamp: '2024-01-14T09:30:00',
        completed: true
      },
      {
        status: 'order-accepted',
        title: t('tracking.order_accepted', 'Order Accepted'),
        description: t('tracking.order_accepted_desc', 'Farmer has accepted your order'),
        timestamp: '2024-01-14T10:15:00',
        completed: true
      },
      {
        status: 'driver-assigned',
        title: t('tracking.driver_assigned', 'Driver Assigned'),
        description: t('tracking.driver_assigned_desc', 'Mekonnen Alemu is assigned for delivery'),
        timestamp: '2024-01-14T11:00:00',
        completed: true
      },
      {
        status: 'picked-up',
        title: t('tracking.picked_up', 'Picked Up'),
        description: t('tracking.picked_up_desc', 'Driver has picked up goods from farmer'),
        timestamp: '2024-01-16T08:30:00',
        completed: true
      },
      {
        status: 'in-transit',
        title: t('tracking.in_transit', 'In Transit'),
        description: t('tracking.in_transit_desc', 'Goods are on the way to your location'),
        timestamp: '2024-01-16T09:00:00',
        completed: true,
        current: true
      },
      {
        status: 'out-for-delivery',
        title: t('tracking.out_for_delivery', 'Out for Delivery'),
        description: t('tracking.out_for_delivery_desc', 'Driver is in your area'),
        timestamp: null,
        completed: false
      },
      {
        status: 'delivered',
        title: t('tracking.delivered', 'Delivered'),
        description: t('tracking.delivered_desc', 'Order delivered successfully'),
        timestamp: null,
        completed: false
      }
    ],
    currentLocation: {
      lat: 9.0054,
      lng: 38.7636,
      address: 'Bole Road, Near Friendship City Center',
      lastUpdated: '2024-01-16T10:30:00'
    },
    estimatedArrival: '30-45 minutes'
  }

  useEffect(() => {
    // Simulate API call to fetch tracking data
    const fetchTrackingData = async () => {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1500))
      setActiveOrder(deliveryData)
      setLoading(false)
    }

    fetchTrackingData()
  }, [])

  const getStatusIcon = (status) => {
    const icons = {
      'order-placed': 'fas fa-shopping-cart',
      'order-accepted': 'fas fa-check-circle',
      'driver-assigned': 'fas fa-user',
      'picked-up': 'fas fa-box',
      'in-transit': 'fas fa-truck',
      'out-for-delivery': 'fas fa-map-marker-alt',
      'delivered': 'fas fa-check-double'
    }
    return icons[status] || 'fas fa-info-circle'
  }

  const getStatusColor = (status) => {
    const colors = {
      'order-placed': 'secondary',
      'order-accepted': 'info',
      'driver-assigned': 'primary',
      'picked-up': 'warning',
      'in-transit': 'info',
      'out-for-delivery': 'primary',
      'delivered': 'success'
    }
    return colors[status] || 'secondary'
  }

  const formatTime = (timestamp) => {
    if (!timestamp) return t('tracking.pending', 'Pending')
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatDate = (timestamp) => {
    if (!timestamp) return ''
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="tracking-page-loading">
        <VendorLoading />
      </div>
    )
  }

  if (!activeOrder) {
    return (
      <div className="tracking-page">
        <div className="container text-center py-5">
          <div className="empty-state">
            <i className="fas fa-truck text-muted mb-3" style={{ fontSize: '3rem' }}></i>
            <h3>{t('tracking.no_active_deliveries', 'No Active Deliveries')}</h3>
            <p className="text-muted">
              {t('tracking.no_active_deliveries_desc', 'You don\'t have any active deliveries to track at the moment.')}
            </p>
            <a href="/vendor/orders" className="btn btn-primary">
              {t('tracking.view_orders', 'View Orders')}
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="tracking-page">
      {/* Page Header */}
      <div className="page-header py-4 bg-white border-bottom">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col">
              <h1 className="h2 fw-bold mb-1">
                {t('tracking.track_delivery', 'Track Delivery')}
              </h1>
              <p className="text-muted mb-0">
                {t('tracking.real_time_updates', 'Real-time updates for your delivery')}
              </p>
            </div>
            <div className="col-auto">
              <div className="tracking-badge bg-primary text-white px-3 py-2 rounded-pill">
                <i className="fas fa-shipping-fast me-2"></i>
                {t('tracking.tracking_id', 'Tracking ID')}: {activeOrder.trackingId}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Summary */}
      <div className="delivery-summary py-4 bg-light">
        <div className="container-fluid">
          <div className="row g-4">
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <div className="row g-4">
                    <div className="col-md-6">
                      <div className="info-item">
                        <label className="text-muted small">
                          {t('tracking.order_id', 'Order ID')}
                        </label>
                        <div className="fw-bold text-primary">
                          {activeOrder.orderId}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="info-item">
                        <label className="text-muted small">
                          {t('tracking.farmer', 'Farmer')}
                        </label>
                        <div className="fw-bold">
                          {activeOrder.farmer}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="info-item">
                        <label className="text-muted small">
                          {t('tracking.driver', 'Driver')}
                        </label>
                        <div className="fw-bold">
                          {activeOrder.driver}
                        </div>
                        <small className="text-muted">
                          {activeOrder.vehicle}
                        </small>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="info-item">
                        <label className="text-muted small">
                          {t('tracking.estimated_arrival', 'Estimated Arrival')}
                        </label>
                        <div className="fw-bold text-success">
                          {activeOrder.estimatedArrival}
                        </div>
                        <small className="text-muted">
                          {new Date(activeOrder.estimatedDelivery).toLocaleString()}
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body text-center">
                  <div className="delivery-status mb-3">
                    <div className={`status-icon bg-${getStatusColor(activeOrder.currentStatus)} bg-opacity-10 text-${getStatusColor(activeOrder.currentStatus)} rounded-circle p-3 mx-auto mb-3`}>
                      <i className={getStatusIcon(activeOrder.currentStatus)} style={{ fontSize: '2rem' }}></i>
                    </div>
                    <h4 className="fw-bold text-capitalize">
                      {activeOrder.timeline.find(step => step.current)?.title || 
                       activeOrder.timeline[activeOrder.timeline.length - 1]?.title}
                    </h4>
                    <p className="text-muted mb-0">
                      {activeOrder.timeline.find(step => step.current)?.description || 
                       t('tracking.delivery_in_progress', 'Delivery in progress')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="tracking-content py-4">
        <div className="container-fluid">
          <div className="row g-4">
            {/* Delivery Timeline */}
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white border-0 py-3">
                  <h5 className="fw-bold mb-0">
                    {t('tracking.delivery_timeline', 'Delivery Timeline')}
                  </h5>
                </div>
                <div className="card-body">
                  <div className="timeline">
                    {activeOrder.timeline.map((step, index) => (
                      <div key={step.status} className="timeline-item">
                        <div className="timeline-marker">
                          <div className={`marker ${step.completed ? 'completed' : ''} ${step.current ? 'current' : ''}`}>
                            <i className={getStatusIcon(step.status)}></i>
                          </div>
                          {index < activeOrder.timeline.length - 1 && (
                            <div className="timeline-connector"></div>
                          )}
                        </div>
                        <div className="timeline-content">
                          <div className="timeline-header d-flex justify-content-between align-items-start mb-1">
                            <h6 className={`fw-semibold mb-0 ${step.completed ? 'text-dark' : 'text-muted'}`}>
                              {step.title}
                            </h6>
                            <div className="timeline-time text-end">
                              <div className="time fw-semibold small">
                                {formatTime(step.timestamp)}
                              </div>
                              <div className="date text-muted small">
                                {formatDate(step.timestamp)}
                              </div>
                            </div>
                          </div>
                          <p className={`timeline-description small mb-0 ${step.completed ? 'text-muted' : 'text-light'}`}>
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Order Details & Actions */}
            <div className="col-lg-4">
              {/* Order Summary */}
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-header bg-white border-0 py-3">
                  <h6 className="fw-bold mb-0">
                    {t('tracking.order_summary', 'Order Summary')}
                  </h6>
                </div>
                <div className="card-body">
                  <div className="products-list mb-3">
                    {activeOrder.products.map((product, index) => (
                      <div key={index} className="product-item d-flex justify-content-between align-items-center py-2 border-bottom">
                        <div>
                          <div className="fw-semibold small">{product.name}</div>
                          <small className="text-muted">
                            {product.quantity} {product.unit}
                          </small>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="order-total d-flex justify-content-between align-items-center fw-bold fs-5">
                    <span>{t('tracking.total', 'Total')}</span>
                    <span className="text-primary">₦{activeOrder.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Driver Contact */}
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white border-0 py-3">
                  <h6 className="fw-bold mb-0">
                    {t('tracking.driver_contact', 'Driver Contact')}
                  </h6>
                </div>
                <div className="card-body">
                  <div className="driver-info text-center">
                    <div className="driver-avatar bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                         style={{ width: '60px', height: '60px' }}>
                      <i className="fas fa-user"></i>
                    </div>
                    <h6 className="fw-semibold mb-1">{activeOrder.driver}</h6>
                    <p className="text-muted small mb-3">{activeOrder.vehicle}</p>
                    <div className="contact-buttons">
                      <a 
                        href={`tel:${activeOrder.phone}`}
                        className="btn btn-primary btn-sm w-100 mb-2"
                      >
                        <i className="fas fa-phone me-2"></i>
                        {t('tracking.call_driver', 'Call Driver')}
                      </a>
                      <button className="btn btn-outline-primary btn-sm w-100">
                        <i className="fas fa-comment me-2"></i>
                        {t('tracking.message_driver', 'Message')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrackingPage