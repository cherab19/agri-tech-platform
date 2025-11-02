import React, { useState, useEffect } from 'react';
import { useApi } from '../../hooks/useApi';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../common/LoadingSpinner';
import { formatCurrency, formatDate } from '../../utils/formatters';

const DeliveryHistory = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: '',
    startDate: '',
    endDate: '',
    paymentStatus: ''
  });
  
  const { user } = useAuth();
  const api = useApi();

  useEffect(() => {
    fetchDeliveryHistory();
  }, []);

  const fetchDeliveryHistory = async () => {
    try {
      const response = await api.get(`/drivers/${user.id}/deliveries/history`);
      setDeliveries(response.data);
    } catch (error) {
      console.error('Error fetching delivery history:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredDeliveries = deliveries.filter(delivery => {
    let matches = true;
    
    if (filters.status) {
      matches = matches && delivery.delivery_status === filters.status;
    }
    
    if (filters.paymentStatus) {
      matches = matches && delivery.payment_status === filters.paymentStatus;
    }
    
    if (filters.startDate) {
      matches = matches && new Date(delivery.completed_at) >= new Date(filters.startDate);
    }
    
    if (filters.endDate) {
      const endDate = new Date(filters.endDate);
      endDate.setHours(23, 59, 59);
      matches = matches && new Date(delivery.completed_at) <= endDate;
    }
    
    return matches;
  });

  const getStatusBadge = (status) => {
    const statusClasses = {
      delivered: 'status-delivered',
      cancelled: 'status-cancelled',
      failed: 'status-failed'
    };
    return `status-badge ${statusClasses[status] || 'status-delivered'}`;
  };

  const getPaymentBadge = (paymentStatus) => {
    const paymentClasses = {
      paid: 'payment-paid',
      pending: 'payment-pending',
      processing: 'payment-processing',
      failed: 'payment-failed'
    };
    return `payment-badge ${paymentClasses[paymentStatus] || 'payment-pending'}`;
  };

  const calculateEarnings = () => {
    return filteredDeliveries.reduce((total, delivery) => {
      if (delivery.payment_status === 'paid') {
        return total + delivery.delivery_fee;
      }
      return total;
    }, 0);
  };

  const calculatePendingEarnings = () => {
    return filteredDeliveries.reduce((total, delivery) => {
      if (delivery.payment_status === 'pending' || delivery.payment_status === 'processing') {
        return total + delivery.delivery_fee;
      }
      return total;
    }, 0);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="delivery-history">
      <div className="page-header">
        <h2>Delivery History</h2>
        <p>Track your completed deliveries and earnings</p>
      </div>

      {/* Earnings Summary */}
      <div className="earnings-summary">
        <div className="earning-card">
          <div className="earning-icon">💰</div>
          <div className="earning-details">
            <span className="earning-label">Total Earned</span>
            <span className="earning-amount">{formatCurrency(calculateEarnings())}</span>
          </div>
        </div>
        
        <div className="earning-card">
          <div className="earning-icon">⏳</div>
          <div className="earning-details">
            <span className="earning-label">Pending Payment</span>
            <span className="earning-amount">{formatCurrency(calculatePendingEarnings())}</span>
          </div>
        </div>
        
        <div className="earning-card">
          <div className="earning-icon">📦</div>
          <div className="earning-details">
            <span className="earning-label">Total Deliveries</span>
            <span className="earning-amount">{filteredDeliveries.length}</span>
          </div>
        </div>
        
        <div className="earning-card">
          <div className="earning-icon">⭐</div>
          <div className="earning-details">
            <span className="earning-label">Average Rating</span>
            <span className="earning-amount">4.8/5</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="filter-group">
          <label htmlFor="status">Delivery Status</label>
          <select
            id="status"
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
          >
            <option value="">All Statuses</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="paymentStatus">Payment Status</label>
          <select
            id="paymentStatus"
            value={filters.paymentStatus}
            onChange={(e) => setFilters(prev => ({ ...prev, paymentStatus: e.target.value }))}
          >
            <option value="">All Payments</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="startDate">From Date</label>
          <input
            type="date"
            id="startDate"
            value={filters.startDate}
            onChange={(e) => setFilters(prev => ({ ...prev, startDate: e.target.value }))}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="endDate">To Date</label>
          <input
            type="date"
            id="endDate"
            value={filters.endDate}
            onChange={(e) => setFilters(prev => ({ ...prev, endDate: e.target.value }))}
          />
        </div>

        <button 
          className="btn-secondary"
          onClick={() => setFilters({ status: '', startDate: '', endDate: '', paymentStatus: '' })}
        >
          Clear Filters
        </button>
      </div>

      {/* Deliveries List */}
      <div className="deliveries-list">
        {filteredDeliveries.length === 0 ? (
          <div className="empty-state">
            <p>No delivery history found for the selected period.</p>
          </div>
        ) : (
          filteredDeliveries.map(delivery => (
            <div key={delivery.id} className="delivery-card">
              <div className="delivery-header">
                <div className="delivery-info">
                  <h3>Delivery #{delivery.delivery_number}</h3>
                  <p className="delivery-date">
                    {formatDate(delivery.completed_at || delivery.created_at)}
                  </p>
                </div>
                <div className="delivery-status">
                  <span className={getStatusBadge(delivery.delivery_status)}>
                    {delivery.delivery_status.toUpperCase()}
                  </span>
                  <span className={getPaymentBadge(delivery.payment_status)}>
                    {delivery.payment_status.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="delivery-details">
                <div className="detail-row">
                  <div className="detail-item">
                    <strong>From:</strong>
                    <span>{delivery.farmer_cooperative_name}</span>
                  </div>
                  <div className="detail-item">
                    <strong>To:</strong>
                    <span>{delivery.vendor_cooperative_name}</span>
                  </div>
                  <div className="detail-item">
                    <strong>Delivery Fee:</strong>
                    <span>{formatCurrency(delivery.delivery_fee)}</span>
                  </div>
                </div>

                <div className="detail-row">
                  <div className="detail-item">
                    <strong>Distance:</strong>
                    <span>{delivery.distance} km</span>
                  </div>
                  <div className="detail-item">
                    <strong>Duration:</strong>
                    <span>{delivery.duration} minutes</span>
                  </div>
                  <div className="detail-item">
                    <strong>Completed:</strong>
                    <span>{formatDate(delivery.completed_at)}</span>
                  </div>
                </div>

                {delivery.rating && (
                  <div className="rating-section">
                    <strong>Vendor Rating:</strong>
                    <div className="rating-stars">
                      {'★'.repeat(delivery.rating)}{'☆'.repeat(5 - delivery.rating)}
                      <span className="rating-text">({delivery.rating}/5)</span>
                    </div>
                    {delivery.feedback && (
                      <p className="feedback">"{delivery.feedback}"</p>
                    )}
                  </div>
                )}
              </div>

              <div className="delivery-actions">
                <button 
                  className="btn-outline"
                  onClick={() => window.location.href = `/driver/deliveries/${delivery.id}`}
                >
                  View Details
                </button>
                
                {delivery.payment_status === 'paid' && (
                  <button className="btn-outline">
                    Download Receipt
                  </button>
                )}
                
                {delivery.payment_status === 'pending' && (
                  <span className="pending-payment">
                    Payment processing...
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Summary */}
      {filteredDeliveries.length > 0 && (
        <div className="history-summary">
          <div className="summary-item">
            <span>Total Completed Deliveries:</span>
            <strong>
              {filteredDeliveries.filter(d => d.delivery_status === 'delivered').length}
            </strong>
          </div>
          <div className="summary-item">
            <span>Total Earnings:</span>
            <strong>{formatCurrency(calculateEarnings())}</strong>
          </div>
          <div className="summary-item">
            <span>Pending Payments:</span>
            <strong>{formatCurrency(calculatePendingEarnings())}</strong>
          </div>
          <div className="summary-item">
            <span>Success Rate:</span>
            <strong>
              {((filteredDeliveries.filter(d => d.delivery_status === 'delivered').length / filteredDeliveries.length) * 100).toFixed(1)}%
            </strong>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryHistory;