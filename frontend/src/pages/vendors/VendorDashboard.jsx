import React from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import { useLanguage } from '../../../contexts/LanguageContext'
import { VendorLoading } from '../../components/common/LoadingSpinner'
import './vendor-dashboard.scss'

const VendorDashboard = () => {
  const { user } = useAuth()
  const { t } = useLanguage()

  // Mock data for dashboard
  const dashboardStats = [
    {
      title: t('vendor.total_orders', 'Total Orders'),
      value: '18',
      change: '+5',
      trend: 'up',
      icon: 'fas fa-shopping-cart',
      color: 'primary'
    },
    {
      title: t('vendor.monthly_spending', 'Monthly Spending'),
      value: '₦156,800',
      change: '+18%',
      trend: 'up',
      icon: 'fas fa-money-bill-wave',
      color: 'success'
    },
    {
      title: t('vendor.pending_deliveries', 'Pending Deliveries'),
      value: '3',
      change: '-2',
      trend: 'down',
      icon: 'fas fa-truck',
      color: 'warning'
    },
    {
      title: t('vendor.savings', 'Total Savings'),
      value: '₦42,500',
      change: '+12%',
      trend: 'up',
      icon: 'fas fa-piggy-bank',
      color: 'info'
    }
  ]

  const recentOrders = [
    {
      id: 'ORD-006',
      product: 'Fresh Tomatoes',
      farmer: 'Green Valley Farmers',
      quantity: 50,
      status: 'delivered',
      amount: 6000,
      deliveryDate: '2024-01-15'
    },
    {
      id: 'ORD-007',
      product: 'Green Peppers',
      farmer: 'Oromia Farm Coop',
      quantity: 25,
      status: 'in-transit',
      amount: 4500,
      deliveryDate: '2024-01-16'
    },
    {
      id: 'ORD-008',
      product: 'Carrots',
      farmer: 'Highland Growers',
      quantity: 100,
      status: 'processing',
      amount: 9000,
      deliveryDate: '2024-01-17'
    },
    {
      id: 'ORD-009',
      product: 'Onions',
      farmer: 'Rift Valley Farms',
      quantity: 75,
      status: 'delivered',
      amount: 5625,
      deliveryDate: '2024-01-14'
    }
  ]

  const quickActions = [
    {
      title: t('vendor.browse_products', 'Browse Products'),
      description: t('vendor.browse_products_desc', 'Explore fresh produce from farmers'),
      icon: 'fas fa-search',
      link: '/vendor/marketplace',
      color: 'primary'
    },
    {
      title: t('vendor.quick_order', 'Quick Order'),
      description: t('vendor.quick_order_desc', 'Reorder your frequently bought items'),
      icon: 'fas fa-bolt',
      link: '/vendor/quick-order',
      color: 'success'
    },
    {
      title: t('vendor.track_orders', 'Track Orders'),
      description: t('vendor.track_orders_desc', 'Monitor your current deliveries'),
      icon: 'fas fa-map-marker-alt',
      link: '/vendor/tracking',
      color: 'warning'
    },
    {
      title: t('vendor.manage_account', 'Manage Account'),
      description: t('vendor.manage_account_desc', 'Update business information'),
      icon: 'fas fa-cog',
      link: '/vendor/settings',
      color: 'info'
    }
  ]

  const popularProducts = [
    {
      name: 'Fresh Tomatoes',
      farmer: 'Green Valley Farmers',
      price: 120,
      unit: 'kg',
      rating: 4.8,
      orders: 45
    },
    {
      name: 'Green Peppers',
      farmer: 'Oromia Farm Coop',
      price: 180,
      unit: 'kg',
      rating: 4.6,
      orders: 32
    },
    {
      name: 'Carrots',
      farmer: 'Highland Growers',
      price: 90,
      unit: 'kg',
      rating: 4.9,
      orders: 28
    }
  ]

  if (!user) {
    return (
      <div className="vendor-dashboard-loading">
        <VendorLoading />
      </div>
    )
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      'processing': { class: 'warning', text: t('vendor.processing', 'Processing') },
      'in-transit': { class: 'info', text: t('vendor.in_transit', 'In Transit') },
      'delivered': { class: 'success', text: t('vendor.delivered', 'Delivered') },
      'cancelled': { class: 'danger', text: t('vendor.cancelled', 'Cancelled') }
    }
    
    const config = statusConfig[status] || statusConfig.processing
    return `badge bg-${config.class} bg-opacity-25 text-${config.class}`
  }

  return (
    <div className="vendor-dashboard">
      {/* Dashboard Header */}
      <div className="dashboard-header py-4">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col">
              <h1 className="h2 fw-bold mb-1">
                {t('vendor.dashboard', 'Vendor Dashboard')}
              </h1>
              <p className="text-muted mb-0">
                {t('vendor.welcome_back', 'Welcome back')}, <strong>{user.name}</strong>
              </p>
            </div>
            <div className="col-auto">
              <div className="cooperative-badge bg-primary text-white px-3 py-2 rounded-pill">
                <i className="fas fa-store me-2"></i>
                {user.cooperative || t('vendor.cooperative', 'Vendors Cooperative')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="dashboard-stats py-4 bg-light">
        <div className="container-fluid">
          <div className="row g-3">
            {dashboardStats.map((stat, index) => (
              <div key={index} className="col-xl-3 col-lg-6 col-md-6">
                <div className="stat-card">
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <div className={`stat-icon bg-${stat.color}-subtle text-${stat.color} rounded-circle p-3 me-3`}>
                          <i className={stat.icon}></i>
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="stat-title text-muted mb-1">
                            {stat.title}
                          </h6>
                          <div className="d-flex align-items-baseline">
                            <h4 className="stat-value fw-bold mb-0 me-2">
                              {stat.value}
                            </h4>
                            <span className={`stat-change small ${
                              stat.trend === 'up' ? 'text-success' : 'text-danger'
                            }`}>
                              <i className={`fas fa-arrow-${stat.trend} me-1`}></i>
                              {stat.change}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-content py-4">
        <div className="container-fluid">
          <div className="row g-4">
            {/* Left Column - Quick Actions & Recent Orders */}
            <div className="col-lg-8">
              {/* Quick Actions */}
              <div className="quick-actions-section">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h3 className="h5 fw-bold mb-0">
                    {t('vendor.quick_actions', 'Quick Actions')}
                  </h3>
                  <a href="/vendor/marketplace" className="btn btn-outline-primary btn-sm">
                    {t('vendor.explore_more', 'Explore More')}
                  </a>
                </div>
                <div className="row g-3">
                  {quickActions.map((action, index) => (
                    <div key={index} className="col-lg-6 col-md-6">
                      <a href={action.link} className="quick-action-card text-decoration-none">
                        <div className="card border-0 shadow-sm h-100 transition-all">
                          <div className="card-body text-center p-4">
                            <div className={`action-icon bg-${action.color}-subtle text-${action.color} rounded-circle p-3 mb-3 mx-auto`}>
                              <i className={action.icon}></i>
                            </div>
                            <h6 className="action-title fw-semibold mb-2">
                              {action.title}
                            </h6>
                            <p className="action-desc text-muted small mb-0">
                              {action.description}
                            </p>
                          </div>
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Orders */}
              <div className="recent-orders mt-4">
                <div className="card border-0 shadow-sm">
                  <div className="card-header bg-white border-0 py-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="fw-bold mb-0">
                        {t('vendor.recent_orders', 'Recent Orders')}
                      </h5>
                      <a href="/vendor/orders" className="btn btn-outline-primary btn-sm">
                        {t('vendor.view_all', 'View All')}
                      </a>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-hover align-middle">
                        <thead>
                          <tr>
                            <th>{t('vendor.order_id', 'Order ID')}</th>
                            <th>{t('vendor.product', 'Product')}</th>
                            <th>{t('vendor.farmer', 'Farmer')}</th>
                            <th>{t('vendor.quantity', 'Quantity')}</th>
                            <th>{t('vendor.amount', 'Amount')}</th>
                            <th>{t('vendor.status', 'Status')}</th>
                            <th>{t('vendor.delivery', 'Delivery')}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentOrders.map((order) => (
                            <tr key={order.id}>
                              <td className="fw-semibold">{order.id}</td>
                              <td>{order.product}</td>
                              <td className="small">{order.farmer}</td>
                              <td>{order.quantity} kg</td>
                              <td>₦{order.amount.toLocaleString()}</td>
                              <td>
                                <span className={getStatusBadge(order.status)}>
                                  {order.status === 'processing' ? t('vendor.processing', 'Processing') :
                                   order.status === 'in-transit' ? t('vendor.in_transit', 'In Transit') :
                                   order.status === 'delivered' ? t('vendor.delivered', 'Delivered') :
                                   t('vendor.cancelled', 'Cancelled')}
                                </span>
                              </td>
                              <td className="small">
                                {new Date(order.deliveryDate).toLocaleDateString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Popular Products & Quick Stats */}
            <div className="col-lg-4">
              {/* Popular Products */}
              <div className="popular-products mb-4">
                <div className="card border-0 shadow-sm">
                  <div className="card-header bg-white border-0 py-3">
                    <h5 className="fw-bold mb-0">
                      {t('vendor.popular_products', 'Popular Products')}
                    </h5>
                  </div>
                  <div className="card-body">
                    <div className="products-list">
                      {popularProducts.map((product, index) => (
                        <div key={index} className="product-item d-flex align-items-center mb-3 pb-3 border-bottom">
                          <div className="product-image me-3">
                            <div className="bg-light rounded-circle d-flex align-items-center justify-content-center" 
                                 style={{ width: '40px', height: '40px' }}>
                              <i className="fas fa-carrot text-primary"></i>
                            </div>
                          </div>
                          <div className="flex-grow-1">
                            <h6 className="product-name fw-semibold mb-1">
                              {product.name}
                            </h6>
                            <p className="product-farmer text-muted small mb-1">
                              {product.farmer}
                            </p>
                            <div className="d-flex justify-content-between align-items-center">
                              <span className="product-price fw-bold text-success">
                                ₦{product.price}/{product.unit}
                              </span>
                              <div className="product-rating small">
                                <i className="fas fa-star text-warning"></i>
                                {product.rating}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <a href="/vendor/marketplace" className="btn btn-outline-primary w-100 mt-2">
                      {t('vendor.browse_all', 'Browse All Products')}
                    </a>
                  </div>
                </div>
              </div>

              {/* Delivery Schedule */}
              <div className="delivery-schedule">
                <div className="card border-0 shadow-sm">
                  <div className="card-header bg-white border-0 py-3">
                    <h5 className="fw-bold mb-0">
                      {t('vendor.todays_deliveries', 'Today\'s Deliveries')}
                    </h5>
                  </div>
                  <div className="card-body">
                    <div className="delivery-item d-flex align-items-center justify-content-between mb-3">
                      <div>
                        <h6 className="mb-1">Fresh Tomatoes</h6>
                        <small className="text-muted">Green Valley Farmers</small>
                      </div>
                      <span className="badge bg-success bg-opacity-25 text-success">
                        {t('vendor.expected', 'Expected')}
                      </span>
                    </div>
                    <div className="delivery-item d-flex align-items-center justify-content-between">
                      <div>
                        <h6 className="mb-1">Green Peppers</h6>
                        <small className="text-muted">Oromia Farm Coop</small>
                      </div>
                      <span className="badge bg-warning bg-opacity-25 text-warning">
                        {t('vendor.in_transit', 'In Transit')}
                      </span>
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

export default VendorDashboard