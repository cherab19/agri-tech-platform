import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useLanguage } from '../../contexts/LanguageContext'
import { FarmerLoading } from '../../components/common/LoadingSpinner'
import './farmer-dashboard.scss'

const FarmerDashboard = () => {
  const { user } = useAuth()
  const { t } = useLanguage()

  // Mock data for dashboard
  const dashboardStats = [
    {
      title: t('farmer.total_products', 'Total Products'),
      value: '24',
      change: '+12%',
      trend: 'up',
      icon: 'fas fa-seedling',
      color: 'success'
    },
    {
      title: t('farmer.active_orders', 'Active Orders'),
      value: '8',
      change: '+3',
      trend: 'up',
      icon: 'fas fa-shopping-cart',
      color: 'primary'
    },
    {
      title: t('farmer.pending_payments', 'Pending Payments'),
      value: '₦45,600',
      change: '-₦12,400',
      trend: 'down',
      icon: 'fas fa-money-bill-wave',
      color: 'warning'
    },
    {
      title: t('farmer.monthly_revenue', 'Monthly Revenue'),
      value: '₦189,200',
      change: '+23%',
      trend: 'up',
      icon: 'fas fa-chart-line',
      color: 'info'
    }
  ]

  const recentActivities = [
    {
      id: 1,
      type: 'order',
      message: t('farmer.new_order', 'New order received for 50kg of tomatoes'),
      time: '2 hours ago',
      status: 'success'
    },
    {
      id: 2,
      type: 'payment',
      message: t('farmer.payment_received', 'Payment received for maize delivery'),
      time: '5 hours ago',
      status: 'success'
    },
    {
      id: 3,
      type: 'product',
      message: t('farmer.low_stock', 'Carrots stock is running low'),
      time: '1 day ago',
      status: 'warning'
    },
    {
      id: 4,
      type: 'delivery',
      message: t('farmer.delivery_scheduled', 'Delivery scheduled for tomorrow morning'),
      time: '1 day ago',
      status: 'info'
    }
  ]

  const quickActions = [
    {
      title: t('farmer.add_product', 'Add New Product'),
      description: t('farmer.add_product_desc', 'List new agricultural products for sale'),
      icon: 'fas fa-plus-circle',
      link: '/farmer/products/add',
      color: 'success'
    },
    {
      title: t('farmer.view_orders', 'View Orders'),
      description: t('farmer.view_orders_desc', 'Check incoming orders and manage status'),
      icon: 'fas fa-clipboard-list',
      link: '/farmer/orders',
      color: 'primary'
    },
    {
      title: t('farmer.manage_inventory', 'Manage Inventory'),
      description: t('farmer.manage_inventory_desc', 'Update stock levels and availability'),
      icon: 'fas fa-boxes',
      link: '/farmer/products',
      color: 'warning'
    },
    {
      title: t('farmer.view_reports', 'View Reports'),
      description: t('farmer.view_reports_desc', 'Sales analytics and performance metrics'),
      icon: 'fas fa-chart-bar',
      link: '/farmer/analytics',
      color: 'info'
    }
  ]

  if (!user) {
    return (
      <div className="farmer-dashboard-loading">
        <FarmerLoading />
      </div>
    )
  }

  return (
    <div className="farmer-dashboard">
      {/* Dashboard Header */}
      <div className="dashboard-header py-4">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col">
              <h1 className="h2 fw-bold mb-1">
                {t('farmer.dashboard', 'Farmer Dashboard')}
              </h1>
              <p className="text-muted mb-0">
                {t('farmer.welcome_back', 'Welcome back')}, <strong>{user.name}</strong>
              </p>
            </div>
            <div className="col-auto">
              <div className="cooperative-badge bg-primary text-white px-3 py-2 rounded-pill">
                <i className="fas fa-users me-2"></i>
                {user.cooperative || t('farmer.cooperative', 'Farmers Cooperative')}
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
            {/* Quick Actions */}
            <div className="col-lg-8">
              <div className="quick-actions-section">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h3 className="h5 fw-bold mb-0">
                    {t('farmer.quick_actions', 'Quick Actions')}
                  </h3>
                  <a href="/farmer/products" className="btn btn-outline-primary btn-sm">
                    {t('farmer.view_all', 'View All')}
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

              {/* Recent Orders Preview */}
              <div className="recent-orders mt-4">
                <div className="card border-0 shadow-sm">
                  <div className="card-header bg-white border-0 py-3">
                    <h5 className="fw-bold mb-0">
                      {t('farmer.recent_orders', 'Recent Orders')}
                    </h5>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-hover align-middle">
                        <thead>
                          <tr>
                            <th>{t('farmer.order_id', 'Order ID')}</th>
                            <th>{t('farmer.product', 'Product')}</th>
                            <th>{t('farmer.quantity', 'Quantity')}</th>
                            <th>{t('farmer.status', 'Status')}</th>
                            <th>{t('farmer.action', 'Action')}</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="fw-semibold">#ORD-001</td>
                            <td>Fresh Tomatoes</td>
                            <td>50 kg</td>
                            <td>
                              <span className="badge bg-warning bg-opacity-25 text-warning">
                                {t('farmer.pending', 'Pending')}
                              </span>
                            </td>
                            <td>
                              <button className="btn btn-outline-primary btn-sm">
                                {t('farmer.view', 'View')}
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td className="fw-semibold">#ORD-002</td>
                            <td>Green Peppers</td>
                            <td>25 kg</td>
                            <td>
                              <span className="badge bg-success bg-opacity-25 text-success">
                                {t('farmer.completed', 'Completed')}
                              </span>
                            </td>
                            <td>
                              <button className="btn btn-outline-primary btn-sm">
                                {t('farmer.view', 'View')}
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="col-lg-4">
              <div className="recent-activities">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-header bg-white border-0 py-3">
                    <h5 className="fw-bold mb-0">
                      {t('farmer.recent_activities', 'Recent Activities')}
                    </h5>
                  </div>
                  <div className="card-body">
                    <div className="activities-list">
                      {recentActivities.map((activity) => (
                        <div key={activity.id} className="activity-item d-flex align-items-start mb-3 pb-3 border-bottom">
                          <div className={`activity-icon bg-${activity.status}-subtle text-${activity.status} rounded-circle p-2 me-3`}>
                            <i className={`fas fa-${
                              activity.type === 'order' ? 'shopping-cart' :
                              activity.type === 'payment' ? 'money-bill' :
                              activity.type === 'product' ? 'box' : 'truck'
                            }`}></i>
                          </div>
                          <div className="flex-grow-1">
                            <p className="activity-message mb-1 small">
                              {activity.message}
                            </p>
                            <small className="activity-time text-muted">
                              {activity.time}
                            </small>
                          </div>
                        </div>
                      ))}
                    </div>
                    <a href="/farmer/activities" className="btn btn-outline-primary w-100 mt-3">
                      {t('farmer.view_all_activities', 'View All Activities')}
                    </a>
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

export default FarmerDashboard