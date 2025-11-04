import React, { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useLanguage } from '../../contexts/LanguageContext'
import { useApi } from '../../hooks/useApi'
import DriverLoading from '../../components/common/LoadingSpinner'
import AssignedOrders from '../../components/drivers/DeliveryManagement/AssignedOrders'
import DeliveryHistory from '../../components/drivers/DeliveryHistory'
import StatusUpdater from '../../components/drivers/DeliveryManagement/StatusUpdater'
import { formatCurrency } from '../../utils/formatters'
import './DriverDashboard.scss'

const DriverDashboard = () => {
  const { user } = useAuth()
  const { t } = useLanguage()
  const api = useApi()

  const [activeTab, setActiveTab] = useState('overview')
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [driverStatus, setDriverStatus] = useState('online')

  useEffect(() => {
    if (user) {
      fetchDashboardData()
    }
  }, [user])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const [statsResponse, assignedOrdersResponse] = await Promise.all([
        api.get(`/drivers/${user.id}/stats`),
        api.get(`/drivers/${user.id}/orders/assigned`)
      ])

      setDashboardData({
        stats: statsResponse.data,
        assignedOrders: assignedOrdersResponse.data
      })
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (orderId, newStatus, notes = '') => {
    try {
      await api.patch(`/orders/${orderId}/delivery-status`, {
        status: newStatus,
        driver_id: user.id,
        driver_notes: notes
      })
      
      // Refresh dashboard data
      fetchDashboardData()
      setSelectedOrder(null)
    } catch (error) {
      console.error('Error updating delivery status:', error)
    }
  }

  const toggleDriverStatus = async () => {
    const newStatus = driverStatus === 'online' ? 'offline' : 'online'
    try {
      await api.patch(`/drivers/${user.id}/availability`, {
        available: newStatus === 'online'
      })
      setDriverStatus(newStatus)
    } catch (error) {
      console.error('Error updating driver status:', error)
    }
  }

  if (!user || loading) {
    return (
      <div className="driver-dashboard-loading">
        <DriverLoading />
        <p className="text-center mt-3">{t('common.loading', 'Loading...')}</p>
      </div>
    )
  }

  const { stats, assignedOrders } = dashboardData || {}

  return (
    <div className="driver-dashboard">
      <div className="container-fluid py-4">
        {/* Header Section */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="dashboard-header">
              <div className="header-content">
                <div className="driver-info">
                  <div className="driver-avatar">
                    <i className="fas fa-user-circle"></i>
                  </div>
                  <div className="driver-details">
                    <h1 className="driver-name">{user.name}</h1>
                    <p className="driver-id">ID: {user.driver_id}</p>
                    <div className="driver-meta">
                      <span className="vehicle-info">
                        <i className="fas fa-truck"></i>
                        {user.vehicle_type} • {user.vehicle_number}
                      </span>
                      <span className="region-info">
                        <i className="fas fa-map-marker-alt"></i>
                        {user.region}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="status-control">
                  <div className={`status-indicator ${driverStatus}`}>
                    <span className="status-dot"></span>
                    {driverStatus === 'online' ? t('driver.online', 'Online') : t('driver.offline', 'Offline')}
                  </div>
                  <button 
                    className={`status-toggle-btn ${driverStatus}`}
                    onClick={toggleDriverStatus}
                  >
                    {driverStatus === 'online' ? t('driver.go_offline', 'Go Offline') : t('driver.go_online', 'Go Online')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon pending">
                  <i className="fas fa-clock"></i>
                </div>
                <div className="stat-content">
                  <h3 className="stat-value">{stats?.pending_deliveries || 0}</h3>
                  <p className="stat-label">{t('driver.pending_deliveries', 'Pending Deliveries')}</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon in-progress">
                  <i className="fas fa-shipping-fast"></i>
                </div>
                <div className="stat-content">
                  <h3 className="stat-value">{stats?.active_deliveries || 0}</h3>
                  <p className="stat-label">{t('driver.active_deliveries', 'Active Deliveries')}</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon completed">
                  <i className="fas fa-check-circle"></i>
                </div>
                <div className="stat-content">
                  <h3 className="stat-value">{stats?.completed_today || 0}</h3>
                  <p className="stat-label">{t('driver.completed_today', 'Completed Today')}</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon earnings">
                  <i className="fas fa-money-bill-wave"></i>
                </div>
                <div className="stat-content">
                  <h3 className="stat-value">{formatCurrency(stats?.today_earnings || 0)}</h3>
                  <p className="stat-label">{t('driver.today_earnings', "Today's Earnings")}</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon rating">
                  <i className="fas fa-star"></i>
                </div>
                <div className="stat-content">
                  <h3 className="stat-value">{stats?.average_rating || '4.8'}/5</h3>
                  <p className="stat-label">{t('driver.average_rating', 'Average Rating')}</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon distance">
                  <i className="fas fa-route"></i>
                </div>
                <div className="stat-content">
                  <h3 className="stat-value">{stats?.total_distance || 0}km</h3>
                  <p className="stat-label">{t('driver.total_distance', 'Total Distance')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="dashboard-tabs">
              <nav className="tab-navigation">
                <button
                  className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
                  onClick={() => setActiveTab('overview')}
                >
                  <i className="fas fa-chart-line"></i>
                  {t('driver.overview', 'Overview')}
                </button>
                <button
                  className={`tab-button ${activeTab === 'assigned' ? 'active' : ''}`}
                  onClick={() => setActiveTab('assigned')}
                >
                  <i className="fas fa-tasks"></i>
                  {t('driver.assigned_deliveries', 'Assigned Deliveries')}
                  {assignedOrders?.length > 0 && (
                    <span className="tab-badge">{assignedOrders.length}</span>
                  )}
                </button>
                <button
                  className={`tab-button ${activeTab === 'history' ? 'active' : ''}`}
                  onClick={() => setActiveTab('history')}
                >
                  <i className="fas fa-history"></i>
                  {t('driver.delivery_history', 'Delivery History')}
                </button>
                <button
                  className={`tab-button ${activeTab === 'earnings' ? 'active' : ''}`}
                  onClick={() => setActiveTab('earnings')}
                >
                  <i className="fas fa-chart-bar"></i>
                  {t('driver.earnings_analytics', 'Earnings & Analytics')}
                </button>
              </nav>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="row">
          <div className="col-12">
            <div className="tab-content">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="tab-panel active">
                  <div className="row">
                    {/* Quick Actions */}
                    <div className="col-lg-4 mb-4">
                      <div className="quick-actions-card">
                        <h3 className="card-title">
                          {t('driver.quick_actions', 'Quick Actions')}
                        </h3>
                        <div className="action-buttons">
                          <button className="action-btn primary">
                            <i className="fas fa-map-marked-alt"></i>
                            {t('driver.update_location', 'Update Location')}
                          </button>
                          <button className="action-btn secondary">
                            <i className="fas fa-phone"></i>
                            {t('driver.contact_support', 'Contact Support')}
                          </button>
                          <button 
                            className="action-btn secondary"
                            onClick={fetchDashboardData}
                          >
                            <i className="fas fa-sync-alt"></i>
                            {t('driver.refresh_orders', 'Refresh Orders')}
                          </button>
                          <button className="action-btn outline">
                            <i className="fas fa-qrcode"></i>
                            {t('driver.scan_qr', 'Scan QR Code')}
                          </button>
                        </div>
                      </div>

                      {/* Recent Activity */}
                      <div className="recent-activity-card">
                        <h3 className="card-title">
                          {t('driver.recent_activity', 'Recent Activity')}
                        </h3>
                        <div className="activity-list">
                          {stats?.recent_activities?.map((activity, index) => (
                            <div key={index} className="activity-item">
                              <div className="activity-icon">
                                <i className={`fas fa-${activity.icon}`}></i>
                              </div>
                              <div className="activity-content">
                                <p className="activity-text">{activity.description}</p>
                                <span className="activity-time">{activity.time}</span>
                              </div>
                            </div>
                          )) || (
                            <p className="text-muted text-center py-3">
                              {t('driver.no_recent_activity', 'No recent activity')}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Assigned Deliveries Preview */}
                    <div className="col-lg-8">
                      <div className="deliveries-preview-card">
                        <div className="card-header">
                          <h3 className="card-title">
                            {t('driver.assigned_deliveries', 'Assigned Deliveries')}
                          </h3>
                          <button 
                            className="view-all-btn"
                            onClick={() => setActiveTab('assigned')}
                          >
                            {t('driver.view_all', 'View All')}
                          </button>
                        </div>
                        <div className="deliveries-list">
                          {(assignedOrders?.slice(0, 3) || []).map(order => (
                            <div key={order.id} className="delivery-item">
                              <div className="delivery-info">
                                <h4 className="delivery-number">
                                  #{order.delivery_number}
                                </h4>
                                <p className="delivery-route">
                                  <i className="fas fa-map-marker-alt text-danger"></i>
                                  {order.pickup_location} → 
                                  <i className="fas fa-map-marker-alt text-success"></i>
                                  {order.delivery_location}
                                </p>
                                <div className="delivery-meta">
                                  <span className="delivery-time">
                                    <i className="fas fa-clock"></i>
                                    {order.estimated_time}
                                  </span>
                                  <span className="delivery-fee">
                                    <i className="fas fa-money-bill"></i>
                                    {formatCurrency(order.delivery_fee)}
                                  </span>
                                </div>
                              </div>
                              <div className="delivery-actions">
                                <button 
                                  className="btn-action primary"
                                  onClick={() => setSelectedOrder(order)}
                                >
                                  {t('driver.update_status', 'Update Status')}
                                </button>
                                <button className="btn-action outline">
                                  {t('driver.view_details', 'View Details')}
                                </button>
                              </div>
                            </div>
                          )) || (
                            <div className="empty-state">
                              <i className="fas fa-box-open"></i>
                              <p>{t('driver.no_assigned_deliveries', 'No assigned deliveries at the moment')}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Performance Metrics */}
                      <div className="performance-card">
                        <h3 className="card-title">
                          {t('driver.performance_metrics', 'Performance Metrics')}
                        </h3>
                        <div className="metrics-grid">
                          <div className="metric-item">
                            <div className="metric-value">{stats?.on_time_rate || '95'}%</div>
                            <div className="metric-label">{t('driver.on_time_rate', 'On-Time Delivery')}</div>
                          </div>
                          <div className="metric-item">
                            <div className="metric-value">{stats?.completion_rate || '98'}%</div>
                            <div className="metric-label">{t('driver.completion_rate', 'Completion Rate')}</div>
                          </div>
                          <div className="metric-item">
                            <div className="metric-value">{stats?.customer_rating || '4.8'}/5</div>
                            <div className="metric-label">{t('driver.customer_rating', 'Customer Rating')}</div>
                          </div>
                          <div className="metric-item">
                            <div className="metric-value">{stats?.weekly_earnings ? formatCurrency(stats.weekly_earnings) : formatCurrency(0)}</div>
                            <div className="metric-label">{t('driver.weekly_earnings', 'Weekly Earnings')}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Assigned Deliveries Tab */}
              {activeTab === 'assigned' && (
                <div className="tab-panel active">
                  <AssignedOrders />
                </div>
              )}

              {/* Delivery History Tab */}
              {activeTab === 'history' && (
                <div className="tab-panel active">
                  <DeliveryHistory />
                </div>
              )}

              {/* Earnings & Analytics Tab */}
              {activeTab === 'earnings' && (
                <div className="tab-panel active">
                  <div className="row">
                    <div className="col-lg-8">
                      <div className="earnings-card">
                        <h3 className="card-title">
                          {t('driver.earnings_overview', 'Earnings Overview')}
                        </h3>
                        <div className="earnings-chart">
                          {/* Placeholder for earnings chart */}
                          <div className="chart-placeholder">
                            <i className="fas fa-chart-line"></i>
                            <p>{t('driver.earnings_chart_coming_soon', 'Earnings chart coming soon')}</p>
                          </div>
                        </div>
                        <div className="earnings-breakdown">
                          <h4>{t('driver.earnings_breakdown', 'Earnings Breakdown')}</h4>
                          <div className="breakdown-list">
                            <div className="breakdown-item">
                              <span className="breakdown-label">{t('driver.today_earnings', "Today's Earnings")}</span>
                              <span className="breakdown-value">{formatCurrency(stats?.today_earnings || 0)}</span>
                            </div>
                            <div className="breakdown-item">
                              <span className="breakdown-label">{t('driver.weekly_earnings', 'Weekly Earnings')}</span>
                              <span className="breakdown-value">{formatCurrency(stats?.weekly_earnings || 0)}</span>
                            </div>
                            <div className="breakdown-item">
                              <span className="breakdown-label">{t('driver.monthly_earnings', 'Monthly Earnings')}</span>
                              <span className="breakdown-value">{formatCurrency(stats?.monthly_earnings || 0)}</span>
                            </div>
                            <div className="breakdown-item total">
                              <span className="breakdown-label">{t('driver.total_earnings', 'Total Earnings')}</span>
                              <span className="breakdown-value">{formatCurrency(stats?.total_earnings || 0)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="payout-card">
                        <h3 className="card-title">
                          {t('driver.payout_info', 'Payout Information')}
                        </h3>
                        <div className="payout-details">
                          <div className="payout-item">
                            <span className="payout-label">{t('driver.next_payout', 'Next Payout')}</span>
                            <span className="payout-value">{formatCurrency(stats?.next_payout || 0)}</span>
                          </div>
                          <div className="payout-item">
                            <span className="payout-label">{t('driver.payout_date', 'Payout Date')}</span>
                            <span className="payout-value">{stats?.next_payout_date || '15th Oct 2024'}</span>
                          </div>
                          <div className="payout-item">
                            <span className="payout-label">{t('driver.payment_method', 'Payment Method')}</span>
                            <span className="payout-value">TeleBirr</span>
                          </div>
                        </div>
                        <button className="btn-primary full-width">
                          {t('driver.request_payout', 'Request Payout')}
                        </button>
                      </div>

                      <div className="analytics-card">
                        <h3 className="card-title">
                          {t('driver.performance_analytics', 'Performance Analytics')}
                        </h3>
                        <div className="analytics-list">
                          <div className="analytics-item">
                            <span className="analytics-label">{t('driver.deliveries_completed', 'Deliveries Completed')}</span>
                            <span className="analytics-value">{stats?.total_deliveries || 0}</span>
                          </div>
                          <div className="analytics-item">
                            <span className="analytics-label">{t('driver.avg_delivery_time', 'Avg. Delivery Time')}</span>
                            <span className="analytics-value">{stats?.avg_delivery_time || '45'} min</span>
                          </div>
                          <div className="analytics-item">
                            <span className="analytics-label">{t('driver.peak_hours', 'Peak Hours')}</span>
                            <span className="analytics-value">2-5 PM</span>
                          </div>
                          <div className="analytics-item">
                            <span className="analytics-label">{t('driver.busiest_day', 'Busiest Day')}</span>
                            <span className="analytics-value">{t('common.friday', 'Friday')}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Status Update Modal */}
      {selectedOrder && (
        <StatusUpdater
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onStatusUpdate={handleStatusUpdate}
        />
      )}
    </div>
  )
}

export default DriverDashboard