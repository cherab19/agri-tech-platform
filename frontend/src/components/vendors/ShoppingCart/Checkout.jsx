import React, { useState } from 'react';
import { useApi } from '../../../hooks/useApi';
import { useAuth } from '../../../contexts/AuthContext';
import TelebirrPayment from '../Payment/TelebirrPayment';
import LoadingSpinner from '../../common/LoadingSpinner';
import Notification from '../../common/Notification';
import { formatCurrency } from '../../../utils/formatters';

const Checkout = ({ cartItems, onOrderComplete }) => {
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [selectedDriver, setSelectedDriver] = useState('');
  const [availableDrivers, setAvailableDrivers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [calculating, setCalculating] = useState(true);
  const [orderSummary, setOrderSummary] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  
  const { user } = useAuth();
  const api = useApi();

  React.useEffect(() => {
    calculateOrderSummary();
    fetchAvailableDrivers();
  }, [cartItems]);

  const calculateOrderSummary = async () => {
    setCalculating(true);
    try {
      // In a real app, this would call an API to calculate totals with commission and delivery
      const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const commission = subtotal * 0.05; // 5% platform commission
      const deliveryFee = 150; // Fixed delivery fee for demo
      const total = subtotal + commission + deliveryFee;

      setOrderSummary({
        subtotal,
        commission,
        deliveryFee,
        total,
        itemsCount: cartItems.reduce((count, item) => count + item.quantity, 0)
      });
    } catch (error) {
      showNotification('Error calculating order summary', 'error');
    } finally {
      setCalculating(false);
    }
  };

  const fetchAvailableDrivers = async () => {
    try {
      // This would call an API to get available drivers based on farmer locations
      const response = await api.get('/drivers/available');
      setAvailableDrivers(response.data);
      if (response.data.length > 0) {
        setSelectedDriver(response.data[0].id);
      }
    } catch (error) {
      console.error('Error fetching drivers:', error);
    }
  };

  const validateCheckout = () => {
    if (!deliveryAddress.trim()) {
      showNotification('Please enter a delivery address', 'error');
      return false;
    }
    if (!selectedDriver) {
      showNotification('Please select a delivery driver', 'error');
      return false;
    }
    if (cartItems.length === 0) {
      showNotification('Your cart is empty', 'error');
      return false;
    }
    return true;
  };

  const handlePaymentSuccess = async (paymentData) => {
    setLoading(true);
    try {
      const orderData = {
        vendor_cooperative_id: user.cooperativeId,
        items: cartItems.map(item => ({
          product_id: item.productId,
          quantity: item.quantity,
          price: item.price
        })),
        delivery_address: deliveryAddress,
        delivery_notes: deliveryNotes,
        driver_id: selectedDriver,
        payment_method: 'telebirr',
        payment_reference: paymentData.reference,
        total_amount: orderSummary.total,
        subtotal: orderSummary.subtotal,
        commission: orderSummary.commission,
        delivery_fee: orderSummary.deliveryFee
      };

      const response = await api.post('/orders', orderData);
      
      showNotification('Order placed successfully!', 'success');
      
      if (onOrderComplete) {
        onOrderComplete(response.data.order);
      }
    } catch (error) {
      showNotification('Error placing order', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 5000);
  };

  if (calculating) return <LoadingSpinner />;

  return (
    <div className="checkout">
      <div className="checkout-header">
        <h2>Checkout</h2>
        <p>Complete your order with secure payment</p>
      </div>

      {notification.show && (
        <Notification message={notification.message} type={notification.type} />
      )}

      <div className="checkout-content">
        <div className="checkout-form">
          {/* Delivery Information */}
          <div className="form-section">
            <h3>Delivery Information</h3>
            <div className="form-group">
              <label htmlFor="deliveryAddress">Delivery Address *</label>
              <textarea
                id="deliveryAddress"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="Enter complete delivery address..."
                rows="3"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="deliveryNotes">Delivery Notes (Optional)</label>
              <textarea
                id="deliveryNotes"
                value={deliveryNotes}
                onChange={(e) => setDeliveryNotes(e.target.value)}
                placeholder="Any special delivery instructions..."
                rows="2"
              />
            </div>
          </div>

          {/* Driver Selection */}
          <div className="form-section">
            <h3>Select Delivery Driver</h3>
            <div className="form-group">
              <label htmlFor="driver">Available Drivers *</label>
              <select
                id="driver"
                value={selectedDriver}
                onChange={(e) => setSelectedDriver(e.target.value)}
                required
              >
                <option value="">Choose a driver</option>
                {availableDrivers.map(driver => (
                  <option key={driver.id} value={driver.id}>
                    {driver.name} - {driver.vehicle_type} ({driver.vehicle_number}) - Rating: {driver.rating}/5
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Order Items Summary */}
          <div className="form-section">
            <h3>Order Items</h3>
            <div className="order-items-summary">
              {cartItems.map(item => (
                <div key={`${item.productId}-${item.farmerCooperativeId}`} className="order-item">
                  <span className="item-name">{item.productName}</span>
                  <span className="item-quantity">{item.quantity} {item.unit}</span>
                  <span className="item-price">{formatCurrency(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary & Payment */}
        <div className="checkout-summary">
          <div className="summary-card">
            <h3>Order Summary</h3>
            
            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal ({orderSummary.itemsCount} items):</span>
                <span>{formatCurrency(orderSummary.subtotal)}</span>
              </div>
              <div className="summary-row">
                <span>Delivery Fee:</span>
                <span>{formatCurrency(orderSummary.deliveryFee)}</span>
              </div>
              <div className="summary-row">
                <span>Platform Commission (5%):</span>
                <span>{formatCurrency(orderSummary.commission)}</span>
              </div>
              <div className="summary-row total">
                <span>Total Amount:</span>
                <span>{formatCurrency(orderSummary.total)}</span>
              </div>
            </div>

            <div className="payment-section">
              <TelebirrPayment
                amount={orderSummary.total}
                onSuccess={handlePaymentSuccess}
                onError={(error) => showNotification(`Payment error: ${error}`, 'error')}
                disabled={!validateCheckout() || loading}
              />
              
              <div className="payment-security">
                <span className="security-badge">🔒 Secure Payment</span>
                <small>Powered by TeleBirr</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;