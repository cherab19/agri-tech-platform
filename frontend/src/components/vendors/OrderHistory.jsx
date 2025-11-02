import React, { useState, useEffect } from 'react';
import { useApi } from '../../../hooks/useApi';
import { useAuth } from '../../../contexts/AuthContext';
import LoadingSpinner from '../../common/LoadingSpinner';
import { formatCurrency, formatDate } from '../../../utils/formatters';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: '',
    startDate: '',
    endDate: ''
  });
  
  const { user } = useAuth();
  const api = useApi();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get(`/vendors/${user.cooperativeId}/orders`);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter(order => {
    let matches = true;
    
    if (filters.status) {
      matches = matches && order.status === filters.status;
    }
    
    if (filters.startDate) {
      matches = matches && new Date(order.created_at) >= new Date(filters.startDate);
    }
    
    if (filters.endDate) {
      const endDate = new Date(filters.endDate);
      endDate.setHours(23, 59, 59);
      matches = matches && new Date(order.created_at) <= endDate;
    }
    
    return matches;
  });

  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: 'status-pending',
      confirmed: 'status-confirmed',
      ready: 'status-ready',
      picked_up: 'status-picked-up',
      in_transit: 'status-in-transit',
      delivered: 'status-delivered',
      cancelled: 'status-cancelled'
    };
    return `status-badge ${statusClasses[status] || 'status-pending'}`;
  };

  const handleReorder = async (order) => {
    // Implement reorder functionality
    console.log('Reordering:', order);
    // This would add all items from the order back to cart
  };

  const handleViewDetails = (orderId) => {
    window.location.href = `/vendor/orders/${orderId}`;
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="order-history">
      <div className="page-header">
        <h2>Order History</h2>
        <p>View and manage your past orders</p>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="filter-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="ready">Ready</option>
            <option value="picked_up">Picked Up</option>
            <option value="in_transit">In Transit</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
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
          onClick={() => setFilters({ status: '', startDate: '', endDate: '' })}
        >
          Clear Filters
        </button>
      </div>

      {/* Orders List */}
      <div className="orders-list">
        {filteredOrders.length === 0 ? (
          <div className="empty-state">
            <p>No orders found matching your criteria.</p>
            <button 
              className="btn-primary"
              onClick={() => window.location.href = '/vendor/marketplace'}
            >
              Start Shopping
            </button>
          </div>
        ) : (
          filteredOrders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <h3>Order #{order.order_number}</h3>
                  <p className="order-date">{formatDate(order.created_at)}</p>
                </div>
                <div className="order-status">
                  <span className={getStatusBadge(order.status)}>
                    {order.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="order-details">
                <div className="detail-row">
                  <div className="detail-item">
                    <strong>Farmer:</strong>
                    <span>{order.farmer_cooperative_name}</span>
                  </div>
                  <div className="detail-item">
                    <strong>Items:</strong>
                    <span>{order.items_count} products</span>
                  </div>
                  <div className="detail-item">
                    <strong>Total Amount:</strong>
                    <span>{formatCurrency(order.total_amount)}</span>
                  </div>
                </div>

                {order.driver && (
                  <div className="detail-row">
                    <div className="detail-item">
                      <strong>Driver:</strong>
                      <span>{order.driver.name}</span>
                    </div>
                    <div className="detail-item">
                      <strong>Vehicle:</strong>
                      <span>{order.driver.vehicle_type} ({order.driver.vehicle_number})</span>
                    </div>
                  </div>
                )}

                <div className="order-items-preview">
                  <strong>Items:</strong>
                  <div className="items-list">
                    {order.items.slice(0, 3).map(item => (
                      <span key={item.id} className="item-tag">
                        {item.product_name} ({item.quantity} {item.unit})
                      </span>
                    ))}
                    {order.items.length > 3 && (
                      <span className="more-items">
                        +{order.items.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="order-actions">
                <button 
                  className="btn-outline"
                  onClick={() => handleViewDetails(order.id)}
                >
                  View Details
                </button>
                
                {order.status === 'delivered' && (
                  <button 
                    className="btn-secondary"
                    onClick={() => handleReorder(order)}
                  >
                    Reorder
                  </button>
                )}
                
                {order.status === 'delivered' && (
                  <button className="btn-outline">
                    Download Invoice
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Summary */}
      {filteredOrders.length > 0 && (
        <div className="orders-summary">
          <div className="summary-item">
            <span>Total Orders:</span>
            <strong>{filteredOrders.length}</strong>
          </div>
          <div className="summary-item">
            <span>Total Spent:</span>
            <strong>
              {formatCurrency(
                filteredOrders.reduce((sum, order) => sum + order.total_amount, 0)
              )}
            </strong>
          </div>
          <div className="summary-item">
            <span>Completed Orders:</span>
            <strong>
              {filteredOrders.filter(order => order.status === 'delivered').length}
            </strong>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;