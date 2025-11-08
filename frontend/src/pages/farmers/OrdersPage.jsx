import React, { useState, useEffect } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { FarmerLoading } from '../../components/common/LoadingSpinner'
import { notify } from '../../components/common/Notification'
import './orders-page.scss'
import { useAuth } from '../../contexts/AuthContext'
import { farmersService } from '../../services/api/farmers'

const OrdersPage = () => {
  const { t } = useLanguage()
  const { user, token } = useAuth()
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('all')
  const [orders, setOrders] = useState([])

  // derive a cooperative id defensively from user object
  const coopId = user?.cooperative_id || user?.cooperativeId || user?.cooperative?.id || user?.id

  useEffect(() => {
    const fetchOrders = async () => {
      setInitialLoading(true)
      try {
        // Use farmer-specific incoming orders endpoint if available
        let res
        if (coopId) {
          res = await farmersService.getIncomingOrders(coopId, token)
        } else {
          // fallback: request generic orders list (may return permissions error)
          res = await fetch('/api/orders')
          res = await (res.ok ? res.json() : [])
        }
        const data = res && res.data ? res.data : res
        const list = Array.isArray(data) ? data : (data.results || [])
        setOrders(list)
      } catch (err) {
        console.error('Failed to fetch farmer orders', err)
        setOrders([])
      } finally {
        setInitialLoading(false)
      }
    }

    fetchOrders()
  }, [coopId, token])

  const statusTabs = [
    { key: 'all', label: t('orders.all_orders', 'All Orders'), count: orders.length },
    { key: 'pending', label: t('orders.pending', 'Pending'), count: orders.filter(o => o.status === 'pending').length },
    { key: 'accepted', label: t('orders.accepted', 'Accepted'), count: orders.filter(o => o.status === 'accepted').length },
    { key: 'ready', label: t('orders.ready', 'Ready for Pickup'), count: orders.filter(o => o.status === 'ready').length },
    { key: 'completed', label: t('orders.completed', 'Completed'), count: orders.filter(o => o.status === 'completed').length },
    { key: 'cancelled', label: t('orders.cancelled', 'Cancelled'), count: orders.filter(o => o.status === 'cancelled').length }
  ]

  const filteredOrders = activeTab === 'all' ? orders : orders.filter(order => order.status === activeTab)

  const getStatusBadge = (status) => {
    const statusConfig = {
      'pending': { class: 'warning', text: t('orders.pending', 'Pending') },
      'accepted': { class: 'info', text: t('orders.accepted', 'Accepted') },
      'ready': { class: 'primary', text: t('orders.ready', 'Ready for Pickup') },
      'completed': { class: 'success', text: t('orders.completed', 'Completed') },
      'cancelled': { class: 'danger', text: t('orders.cancelled', 'Cancelled') }
    }
    
    const config = statusConfig[status] || statusConfig.pending
    return `badge bg-${config.class} bg-opacity-25 text-${config.class}`
  }

  const handleOrderAction = async (orderId, action) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      let message = ''
      switch (action) {
        case 'accept':
          message = t('orders.order_accepted', 'Order accepted successfully')
          break
        case 'reject':
          message = t('orders.order_rejected', 'Order rejected successfully')
          break
        case 'ready':
          message = t('orders.marked_ready', 'Order marked as ready for pickup')
          break
        default:
          message = t('orders.action_completed', 'Action completed successfully')
      }
      
      notify.success(message)
    } catch (error) {
      notify.error(t('orders.action_failed', 'Failed to complete action'))
    } finally {
      setLoading(false)
    }
  }

  const getActionButtons = (order) => {
    switch (order.status) {
      case 'pending':
        return (
          <div className="btn-group btn-group-sm">
            <button
              className="btn btn-success"
              onClick={() => handleOrderAction(order.id, 'accept')}
              disabled={loading}
            >
              <i className="fas fa-check me-1"></i>
              {t('orders.accept', 'Accept')}
            </button>
            <button
              className="btn btn-danger"
              onClick={() => handleOrderAction(order.id, 'reject')}
              disabled={loading}
            >
              <i className="fas fa-times me-1"></i>
              {t('orders.reject', 'Reject')}
            </button>
          </div>
        )
      case 'accepted':
        return (
          <button
            className="btn btn-primary btn-sm"
            onClick={() => handleOrderAction(order.id, 'ready')}
            disabled={loading}
          >
            <i className="fas fa-check-double me-1"></i>
            {t('orders.mark_ready', 'Mark Ready')}
          </button>
        )
      case 'ready':
        return (
          <span className="text-muted small">
            {t('orders.awaiting_pickup', 'Awaiting driver pickup')}
          </span>
        )
      case 'completed':
        return (
          <span className="text-success small">
            <i className="fas fa-check-circle me-1"></i>
            {t('orders.delivered', 'Delivered')}
          </span>
        )
      case 'cancelled':
        return (
          <span className="text-danger small">
            <i className="fas fa-ban me-1"></i>
            {t('orders.cancelled', 'Cancelled')}
          </span>
        )
      default:
        return null
    }
  }

  if (initialLoading) {
    return (
      <div className="orders-page-loading">
        <FarmerLoading />
      </div>
    )
  }

  return (
    <div className="orders-page">
      {/* Page Header */}
      <div className="page-header py-4 bg-white border-bottom">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col">
              <h1 className="h2 fw-bold mb-1">
                {t('orders.order_management', 'Order Management')}
              </h1>
              <p className="text-muted mb-0">
                {t('orders.manage_incoming', 'Manage incoming orders from vendors')}
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
                        {orders.filter(o => o.status === 'pending').length}
                      </div>
                      <div className="stat-label text-muted small">
                        {t('orders.pending', 'Pending')}
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
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0 py-3">
              <h5 className="fw-bold mb-0">
                {statusTabs.find(tab => tab.key === activeTab)?.label}
              </h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead>
                    <tr>
                      <th>{t('orders.order_id', 'Order ID')}</th>
                      <th>{t('orders.product', 'Product')}</th>
                      <th>{t('orders.vendor', 'Vendor')}</th>
                      <th>{t('orders.quantity', 'Quantity')}</th>
                      <th>{t('orders.total', 'Total')}</th>
                      <th>{t('orders.status', 'Status')}</th>
                      <th>{t('orders.delivery_date', 'Delivery Date')}</th>
                      <th>{t('orders.driver', 'Driver')}</th>
                      <th>{t('orders.actions', 'Actions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr key={order.id}>
                        <td>
                          <span className="fw-semibold text-primary">{order.id}</span>
                        </td>
                        <td>
                          <div className="fw-semibold">{order.product}</div>
                          <small className="text-muted">₦{order.price}/{order.unit}</small>
                        </td>
                        <td>{order.vendor}</td>
                        <td>
                          {order.quantity} {order.unit}
                        </td>
                        <td>
                          <span className="fw-bold">₦{order.total.toLocaleString()}</span>
                        </td>
                        <td>
                          <span className={getStatusBadge(order.status)}>
                            {getStatusBadge(order.status).includes('warning') ? t('orders.pending', 'Pending') :
                             getStatusBadge(order.status).includes('info') ? t('orders.accepted', 'Accepted') :
                             getStatusBadge(order.status).includes('primary') ? t('orders.ready', 'Ready') :
                             getStatusBadge(order.status).includes('success') ? t('orders.completed', 'Completed') :
                             t('orders.cancelled', 'Cancelled')}
                          </span>
                        </td>
                        <td>
                          <div className="small">
                            {new Date(order.deliveryDate).toLocaleDateString()}
                          </div>
                        </td>
                        <td>
                          <span className={`small ${
                            order.driver === 'Not assigned' ? 'text-muted' : 'text-dark'
                          }`}>
                            {order.driver}
                          </span>
                        </td>
                        <td>
                          {getActionButtons(order)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Empty State */}
              {filteredOrders.length === 0 && (
                <div className="text-center py-5">
                  <div className="empty-state-icon mb-3">
                    <i className="fas fa-clipboard-list text-muted" style={{ fontSize: '3rem' }}></i>
                  </div>
                  <h5 className="text-muted mb-2">
                    {t('orders.no_orders', 'No Orders Found')}
                  </h5>
                  <p className="text-muted mb-3">
                    {activeTab === 'all' 
                      ? t('orders.no_orders_description', 'You don\'t have any orders yet. Your orders will appear here when vendors place them.')
                      : t('orders.no_filtered_orders', `No orders with status "${statusTabs.find(tab => tab.key === activeTab)?.label}"`)
                    }
                  </p>
                  {activeTab !== 'all' && (
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => setActiveTab('all')}
                    >
                      {t('orders.view_all_orders', 'View All Orders')}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrdersPage