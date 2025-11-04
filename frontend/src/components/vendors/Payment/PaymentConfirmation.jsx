import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApi } from '../../../hooks/useApi';
import LoadingSpinner from '../../common/LoadingSpinner';

const PaymentConfirmation = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [polling, setPolling] = useState(false);
  
  const api = useApi();

  useEffect(() => {
    fetchOrderStatus();
  }, [orderId]);

  useEffect(() => {
    let interval;
    if (polling && order?.payment_status === 'pending') {
      interval = setInterval(fetchOrderStatus, 5000); // Poll every 5 seconds
    }
    return () => clearInterval(interval);
  }, [polling, order?.payment_status]);

  const fetchOrderStatus = async () => {
    try {
      const response = await api.get(`/orders/${orderId}`);
      setOrder(response.data);
      
      if (response.data.payment_status === 'completed') {
        setPolling(false);
      } else if (response.data.payment_status === 'pending') {
        setPolling(true);
      }
    } catch (error) {
      console.error('Error fetching order status:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusConfig = (status) => {
    const configs = {
      pending: {
        icon: '⏳',
        title: 'Payment Processing',
        message: 'Your payment is being processed. This may take a few moments.',
        color: 'warning'
      },
      completed: {
        icon: '✅',
        title: 'Payment Successful!',
        message: 'Your payment has been confirmed. Your order is being processed.',
        color: 'success'
      },
      failed: {
        icon: '❌',
        title: 'Payment Failed',
        message: 'There was an issue with your payment. Please try again.',
        color: 'error'
      },
      cancelled: {
        icon: '🚫',
        title: 'Payment Cancelled',
        message: 'Your payment was cancelled. You can try again when ready.',
        color: 'info'
      }
    };
    return configs[status] || configs.pending;
  };

  if (loading) return <LoadingSpinner />;

  const statusConfig = getStatusConfig(order.payment_status);

  return (
    <div className="payment-confirmation">
      <div className={`confirmation-card ${statusConfig.color}`}>
        <div className="status-icon">{statusConfig.icon}</div>
        <h2>{statusConfig.title}</h2>
        <p>{statusConfig.message}</p>
        
        {order && (
          <div className="order-details">
            <div className="detail-item">
              <strong>Order Number:</strong>
              <span>#{order.order_number}</span>
            </div>
            <div className="detail-item">
              <strong>Amount Paid:</strong>
              <span>ETB {order.total_amount}</span>
            </div>
            <div className="detail-item">
              <strong>Payment Method:</strong>
              <span>TeleBirr</span>
            </div>
            <div className="detail-item">
              <strong>Order Date:</strong>
              <span>{new Date(order.created_at).toLocaleString()}</span>
            </div>
            {order.payment_reference && (
              <div className="detail-item">
                <strong>Transaction Reference:</strong>
                <span>{order.payment_reference}</span>
              </div>
            )}
          </div>
        )}

        <div className="action-buttons">
          {order.payment_status === 'completed' && (
            <>
              <button 
                className="btn-primary"
                onClick={() => navigate('/vendor/orders')}
              >
                View My Orders
              </button>
              <button 
                className="btn-secondary"
                onClick={() => navigate('/vendor/marketplace')}
              >
                Continue Shopping
              </button>
            </>
          )}
          
          {order.payment_status === 'failed' && (
            <>
              <button 
                className="btn-primary"
                onClick={() => navigate('/vendor/checkout')}
              >
                Try Payment Again
              </button>
              <button 
                className="btn-secondary"
                onClick={() => navigate('/vendor/cart')}
              >
                Back to Cart
              </button>
            </>
          )}
          
          {order.payment_status === 'cancelled' && (
            <button 
              className="btn-primary"
              onClick={() => navigate('/vendor/marketplace')}
            >
              Back to Marketplace
            </button>
          )}
          
          {order.payment_status === 'pending' && (
            <div className="pending-actions">
              <button 
                className="btn-secondary"
                onClick={() => navigate('/vendor/orders')}
              >
                Check Orders Later
              </button>
              <p className="polling-notice">
                🔄 Automatically checking payment status...
              </p>
            </div>
          )}
        </div>

        {order.payment_status === 'completed' && (
          <div className="success-notice">
            <p>📧 A confirmation email has been sent to your registered email address.</p>
            <p>📱 You will receive SMS updates about your order status.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentConfirmation;