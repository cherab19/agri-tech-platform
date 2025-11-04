import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import AssignedOrders from '../../components/drivers/DeliveryManagement/AssignedOrders';
import DeliveryHistory from '../../components/drivers/DeliveryHistory';
import LoadingSpinner from '../../components/common/LoadingSpinner';


const DeliveriesPage = () => {
  const [activeTab, setActiveTab] = useState('assigned');
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user || user.role !== 'driver') {
    return (
      <div className="access-denied">
        <h2>Access Denied</h2>
        <p>You need to be logged in as a driver to access this page.</p>
      </div>
    );
  }

  return (
    <div className="deliveries-page">
      {/* Page Header */}
      <div className="page-header">
        <div className="header-content">
          <h1>Delivery Management</h1>
          <p>Manage your assigned deliveries and track your delivery history</p>
        </div>
        <div className="driver-stats">
          <div className="stat-card">
            <div className="stat-icon">🚚</div>
            <div className="stat-info">
              <span className="stat-value">12</span>
              <span className="stat-label">Active Deliveries</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-info">
              <span className="stat-value">ETB 2,450</span>
              <span className="stat-label">Earnings Today</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-info">
              <span className="stat-value">4.8</span>
              <span className="stat-label">Average Rating</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="deliveries-tabs">
        <nav className="tab-navigation">
          <button
            className={`tab-button ${activeTab === 'assigned' ? 'active' : ''}`}
            onClick={() => setActiveTab('assigned')}
          >
            <span className="tab-icon">📦</span>
            <span className="tab-label">Assigned Deliveries</span>
            <span className="tab-badge">5</span>
          </button>
          <button
            className={`tab-button ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            <span className="tab-icon">📊</span>
            <span className="tab-label">Delivery History</span>
            <span className="tab-badge">127</span>
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'assigned' && (
          <div className="tab-panel active">
            <AssignedOrders />
          </div>
        )}
        {activeTab === 'history' && (
          <div className="tab-panel active">
            <DeliveryHistory />
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          <button className="action-btn">
            <span className="action-icon">📍</span>
            <span className="action-text">Update Location</span>
          </button>
          <button className="action-btn">
            <span className="action-icon">📞</span>
            <span className="action-text">Contact Support</span>
          </button>
          <button className="action-btn">
            <span className="action-icon">🔄</span>
            <span className="action-text">Refresh Orders</span>
          </button>
          <button className="action-btn">
            <span className="action-icon">📱</span>
            <span className="action-text">Go Online</span>
          </button>
        </div>
      </div>

      {/* Driver Status Panel */}
      <div className="driver-status-panel">
        <div className="status-card">
          <h4>Current Status</h4>
          <div className="status-indicator">
            <div className="status-dot online"></div>
            <span>Online - Available for deliveries</span>
          </div>
          <div className="status-info">
            <div className="info-item">
              <strong>Vehicle:</strong>
              <span>Toyota Hilux (3A-4567)</span>
            </div>
            <div className="info-item">
              <strong>Capacity:</strong>
              <span>2,000 kg</span>
            </div>
            <div className="info-item">
              <strong>Current Location:</strong>
              <span>Addis Ababa, Bole</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveriesPage;