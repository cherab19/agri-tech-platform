import React, { useState, useEffect } from 'react';
import { useApi } from '../../../hooks/useApi';
import { useAuth } from '../../../contexts/AuthContext';
import LoadingSpinner from '../../common/LoadingSpinner';
import Notification from '../../common/Notification';
import OrderActions from './OrderActions';

const IncomingOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  
  const { user } = useAuth();
  const api = useApi();

  useEffect(() => {
    fetchIncomingOrders();
  }, []);

  const fetchIncomingOrders = async () => {
    try {
      const response = await api.get(`/farmers/${user.cooperativeId}/orders/incoming`);
      setOrders(response.data);
    } catch (error) {
      showNotification('Error fetching orders', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleOrderAction = async (orderId, action, notes = '') => {
    try {
      await api.patch(`/orders/${orderId}`, { 
        status: action,
        farmer_notes: notes
      });
      showNotification(`Order ${action} successfully`, 'success');
      fetchIncomingOrders();
      setSelectedOrder(null);
    } catch (error) {
      showNotification('Error updating order', 'error');
    }
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 5000);
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: 'status-pending',
      accepted: 'status-accepted',
      declined: 'status-declined',
      ready: 'status-ready',
      picked_up: 'status-picked-up',
      delivered: 'status-delivered'
    };
    return `status-badge ${statusClasses[status] || 'status-pending'}`;
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="incoming-orders">
      <div className="page-header">
        <h2>Incoming Orders</h2>
        <p>Manage orders from vendors</p>
      </div>

      {notification.show && (
        <Notification message={notification.message} type={notification.type} />
      )}

      <div className="orders-list">
        {orders.length === 0 ? (
          <div className="empty-state">
            <p>No incoming orders at the moment.</p>
          </div>
        ) : (
          orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div>
                  <h3>Order #{order.order_number}</h3>
                  <p className="order-date">
                    {new Date(order.created_at).toLocaleDateString('en-ET', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <span className={getStatusBadge(order.status)}>
                  {order.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>
              
              <div className="order-details">
                <div className="order-info">
                  <div className="info-item">
                    <strong>Vendor:</strong>
                    <span>{order.vendor_cooperative_name}</span>
                  </div>
                  <div className="info-item">
                    <strong>Contact:</strong>
                    <span>{order.vendor_contact}</span>
                  </div>
                  <div className="info-item">
                    <strong>Total Amount:</strong>
                    <span>ETB {order.total_amount}</span>
                  </div>
                </div>
                
                <div className="order-items">
                  <h4>Order Items:</h4>
                  {order.items.map(item => (
                    <div key={item.id} className="order-item">
                      <span className="item-name">{item.product_name}</span>
                      <span className="item-quantity">{item.quantity} {item.unit}</span>
                      <span className="item-price">ETB {item.price}</span>
                      <span className="item-total">ETB {(item.quantity * item.price).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {order.driver_assigned && (
                  <div className="driver-info">
                    <h4>Delivery Information:</h4>
                    <div className="info-item">
                      <strong>Driver:</strong>
                      <span>{order.driver_name}</span>
                    </div>
                    <div className="info-item">
                      <strong>Phone:</strong>
                      <span>{order.driver_phone}</span>
                    </div>
                    <div className="info-item">
                      <strong>Estimated Pickup:</strong>
                      <span>{new Date(order.estimated_pickup).toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="order-actions">
                {order.status === 'pending' && (
                  <>
                    <button 
                      className="btn-success"
                      onClick={() => handleOrderAction(order.id, 'accepted')}
                    >
                      Accept Order
                    </button>
                    <button 
                      className="btn-danger"
                      onClick={() => setSelectedOrder({...order, action: 'declined'})}
                    >
                      Decline Order
                    </button>
                  </>
                )}
                
                {order.status === 'accepted' && (
                  <button 
                    className="btn-primary"
                    onClick={() => setSelectedOrder({...order, action: 'ready'})}
                  >
                    Mark Ready for Pickup
                  </button>
                )}

                {order.status === 'ready' && (
                  <span className="ready-text">✅ Ready for driver pickup</span>
                )}

                {order.status === 'declined' && order.farmer_notes && (
                  <div className="decline-reason">
                    <strong>Reason for decline:</strong> {order.farmer_notes}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {selectedOrder && (
        <OrderActions
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onAction={handleOrderAction}
        />
      )}
    </div>
  );
};

export default IncomingOrders;