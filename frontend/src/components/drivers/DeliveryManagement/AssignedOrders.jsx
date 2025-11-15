import React, { useState, useEffect } from 'react';
import './AssignedOrders.scss';
import { useApi } from '../../../hooks/useApi';
import { useAuth } from '../../../contexts/AuthContext';
import LoadingSpinner from '../../common/LoadingSpinner';
import Notification from '../../common/Notification';
import StatusUpdater from './StatusUpdater';

const AssignedOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  
  const { user } = useAuth();
  const api = useApi();

  useEffect(() => {
    fetchAssignedOrders();
  }, []);

  const fetchAssignedOrders = async () => {
    try {
      const response = await api.get(`/drivers/${user.id}/orders/assigned`);
      setOrders(response.data);
    } catch (error) {
      showNotification('Error fetching assigned orders', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus, notes = '') => {
    try {
      await api.patch(`/orders/${orderId}/delivery-status`, {
        status: newStatus,
        driver_id: user.id,
        driver_notes: notes
      });
      showNotification('Delivery status updated successfully', 'success');
      fetchAssignedOrders();
      setSelectedOrder(null);
    } catch (error) {
      showNotification('Error updating delivery status', 'error');
    }
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 5000);
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      assigned: 'status-assigned',
      going_for_pickup: 'status-going',
      picked_up: 'status-picked-up',
      in_transit: 'status-transit',
      delivered: 'status-delivered'
    };
    return `status-badge ${statusClasses[status] || 'status-assigned'}`;
  };

  const getNextAction = (currentStatus) => {
    const actions = {
      assigned: 'Start Pickup',
      going_for_pickup: 'Mark as Picked Up',
      picked_up: 'Start Delivery',
      in_transit: 'Mark as Delivered'
    };
    return actions[currentStatus];
  };

  const getNextStatus = (currentStatus) => {
    const statusFlow = {
      assigned: 'going_for_pickup',
      going_for_pickup: 'picked_up',
      picked_up: 'in_transit',
      in_transit: 'delivered'
    };
    return statusFlow[currentStatus];
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="assigned-orders">
      <div className="page-header">
        <h2>My Deliveries</h2>
        <p>Manage your assigned delivery orders</p>
      </div>

      {notification.show && (
        <Notification message={notification.message} type={notification.type} />
      )}

      {/* Use the same overview card wrapper so dashboard styles apply */}
      <div className="deliveries-preview-card">
        <div className="card-header">
          <h3 className="card-title">Assigned Deliveries</h3>
        </div>

        <div className="deliveries-list">
          {orders.length === 0 ? (
            <div className="empty-state">
              <p>No assigned deliveries at the moment.</p>
              <p className="empty-subtext">
                New deliveries will appear here when assigned to you.
              </p>
            </div>
          ) : (
            orders.map(order => (
              <div key={order.id} className="delivery-card delivery-item">
              <div className="delivery-header">
                <div>
                  <h3>Delivery #{order.delivery_number}</h3>
                  <p className="delivery-date">
                    Assigned: {new Date(order.assigned_at).toLocaleDateString()}
                  </p>
                </div>
                <span className={getStatusBadge(order.delivery_status)}>
                  {order.delivery_status.replace(/_/g, ' ').toUpperCase()}
                </span>
              </div>

              <div className="delivery-info">
                <div className="info-section">
                  <h4>📍 Pickup Details</h4>
                  <div className="info-item">
                    <strong>Farm:</strong>
                    <span>{order.farmer_cooperative_name}</span>
                  </div>
                  <div className="info-item">
                    <strong>Address:</strong>
                    <span>{order.pickup_address}</span>
                  </div>
                  <div className="info-item">
                    <strong>Contact:</strong>
                    <span>{order.farmer_contact}</span>
                  </div>
                  <div className="info-item">
                    <strong>Ready by:</strong>
                    <span>{new Date(order.ready_time).toLocaleString()}</span>
                  </div>
                </div>

                <div className="info-section">
                  <h4>🎯 Delivery Details</h4>
                  <div className="info-item">
                    <strong>Vendor:</strong>
                    <span>{order.vendor_cooperative_name}</span>
                  </div>
                  <div className="info-item">
                    <strong>Address:</strong>
                    <span>{order.delivery_address}</span>
                  </div>
                  <div className="info-item">
                    <strong>Contact:</strong>
                    <span>{order.vendor_contact}</span>
                  </div>
                </div>

                <div className="info-section">
                  <h4>📦 Order Details</h4>
                  <div className="info-item">
                    <strong>Items:</strong>
                    <span>{order.items_count} items</span>
                  </div>
                  <div className="info-item">
                    <strong>Total Weight:</strong>
                    <span>{order.total_weight} kg</span>
                  </div>
                  <div className="info-item">
                    <strong>Delivery Fee:</strong>
                    <span>ETB {order.delivery_fee}</span>
                  </div>
                </div>
              </div>

              <div className="delivery-actions">
                {order.delivery_status !== 'delivered' && (
                  <>
                    <button
                      className="btn-primary"
                      onClick={() => handleStatusUpdate(order.id, getNextStatus(order.delivery_status))}
                    >
                      {getNextAction(order.delivery_status)}
                    </button>
                    
                    <button
                      className="btn-secondary"
                      onClick={() => setSelectedOrder(order)}
                    >
                      Update Status
                    </button>
                  </>
                )}

                {order.delivery_status === 'delivered' && (
                  <span className="completed-text">
                    ✅ Delivery Completed - ETB {order.delivery_fee} earned
                  </span>
                )}

                <button 
                  className="btn-outline"
                  onClick={() => window.location.href = `/driver/deliveries/${order.id}`}
                >
                  View Details
                </button>
              </div>
              </div>
            ))
          )}
        </div>
      </div>

      {selectedOrder && (
        <StatusUpdater
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onStatusUpdate={handleStatusUpdate}
        />
      )}
    </div>
  );
};

export default AssignedOrders;