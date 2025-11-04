import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useApi } from '../../../hooks/useApi';
import LoadingSpinner from '../../common/LoadingSpinner';
import { formatCurrency, formatDate } from '../../../utils/formatters';

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const api = useApi();

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      const response = await api.get(`/orders/${orderId}/driver-view`);
      setOrder(response.data);
    } catch (error) {
      console.error('Error fetching order details:', error);
    } finally {
      setLoading(false);
    }
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

  if (loading) return <LoadingSpinner />;
  if (!order) return <div>Order not found</div>;

  return (
    <div className="order-details">
      <div className="page-header">
        <h2>Delivery Details</h2>
        <span className={getStatusBadge(order.delivery_status)}>
          {order.delivery_status.replace(/_/g, ' ').toUpperCase()}
        </span>
      </div>

      <div className="details-grid">
        {/* Order Information */}
        <div className="detail-section">
          <h3>Delivery Information</h3>
          <div className="info-card">
            <div className="info-item">
              <strong>Delivery Number:</strong>
              <span>#{order.delivery_number}</span>
            </div>
            <div className="info-item">
              <strong>Assigned Date:</strong>
              <span>{formatDate(order.assigned_at)}</span>
            </div>
            <div className="info-item">
              <strong>Delivery Fee:</strong>
              <span>{formatCurrency(order.delivery_fee)}</span>
            </div>
            <div className="info-item">
              <strong>Estimated Distance:</strong>
              <span>{order.distance} km</span>
            </div>
          </div>
        </div>

        {/* Pickup Information */}
        <div className="detail-section">
          <h3>Pickup Location</h3>
          <div className="info-card">
            <div className="info-item">
              <strong>Farm Cooperative:</strong>
              <span>{order.farmer_cooperative_name}</span>
            </div>
            <div className="info-item">
              <strong>Address:</strong>
              <span>{order.pickup_address}</span>
            </div>
            <div className="info-item">
              <strong>Contact Person:</strong>
              <span>{order.farmer_contact_name}</span>
            </div>
            <div className="info-item">
              <strong>Phone:</strong>
              <span>{order.farmer_contact_phone}</span>
            </div>
            <div className="info-item">
              <strong>Ready Time:</strong>
              <span>{formatDate(order.ready_time)}</span>
            </div>
            {order.farmer_notes && (
              <div className="info-item">
                <strong>Notes:</strong>
                <span className="notes-text">{order.farmer_notes}</span>
              </div>
            )}
          </div>
        </div>

        {/* Delivery Information */}
        <div className="detail-section">
          <h3>Delivery Location</h3>
          <div className="info-card">
            <div className="info-item">
              <strong>Vendor Cooperative:</strong>
              <span>{order.vendor_cooperative_name}</span>
            </div>
            <div className="info-item">
              <strong>Address:</strong>
              <span>{order.delivery_address}</span>
            </div>
            <div className="info-item">
              <strong>Contact Person:</strong>
              <span>{order.vendor_contact_name}</span>
            </div>
            <div className="info-item">
              <strong>Phone:</strong>
              <span>{order.vendor_contact_phone}</span>
            </div>
            {order.delivery_notes && (
              <div className="info-item">
                <strong>Delivery Instructions:</strong>
                <span className="notes-text">{order.delivery_notes}</span>
              </div>
            )}
          </div>
        </div>

        {/* Order Items */}
        <div className="detail-section full-width">
          <h3>Order Items</h3>
          <div className="items-table">
            <div className="table-header">
              <div>Product</div>
              <div>Quantity</div>
              <div>Unit Price</div>
              <div>Total</div>
            </div>
            {order.items.map(item => (
              <div key={item.id} className="table-row">
                <div className="product-info">
                  <span className="product-name">{item.product_name}</span>
                  <span className="product-type">{item.product_type}</span>
                </div>
                <div className="quantity">{item.quantity} {item.unit}</div>
                <div className="unit-price">{formatCurrency(item.price)}</div>
                <div className="total-price">
                  {formatCurrency(item.quantity * item.price)}
                </div>
              </div>
            ))}
            <div className="table-footer">
              <div className="total-row">
                <strong>Total Order Value:</strong>
                <strong>{formatCurrency(order.total_amount)}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Timeline */}
        <div className="detail-section full-width">
          <h3>Delivery Timeline</h3>
          <div className="timeline">
            <div className={`timeline-item ${order.assigned_at ? 'completed' : ''}`}>
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <strong>Assigned to Driver</strong>
                <span>{order.assigned_at ? formatDate(order.assigned_at) : 'Pending'}</span>
              </div>
            </div>
            
            <div className={`timeline-item ${order.pickup_started_at ? 'completed' : ''}`}>
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <strong>Started Pickup</strong>
                <span>{order.pickup_started_at ? formatDate(order.pickup_started_at) : 'Pending'}</span>
              </div>
            </div>
            
            <div className={`timeline-item ${order.picked_up_at ? 'completed' : ''}`}>
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <strong>Items Picked Up</strong>
                <span>{order.picked_up_at ? formatDate(order.picked_up_at) : 'Pending'}</span>
              </div>
            </div>
            
            <div className={`timeline-item ${order.delivery_started_at ? 'completed' : ''}`}>
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <strong>Delivery Started</strong>
                <span>{order.delivery_started_at ? formatDate(order.delivery_started_at) : 'Pending'}</span>
              </div>
            </div>
            
            <div className={`timeline-item ${order.delivered_at ? 'completed' : ''}`}>
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <strong>Delivered</strong>
                <span>{order.delivered_at ? formatDate(order.delivered_at) : 'Pending'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button 
          className="btn-secondary"
          onClick={() => window.history.back()}
        >
          Back to Deliveries
        </button>
        
        {order.delivery_status !== 'delivered' && (
          <button 
            className="btn-primary"
            onClick={() => window.location.href = `/driver/deliveries/${order.id}/update`}
          >
            Update Delivery Status
          </button>
        )}
        
        <button className="btn-outline">
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;