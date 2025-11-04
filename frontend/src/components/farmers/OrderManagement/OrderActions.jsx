import React, { useState } from 'react';

const OrderActions = ({ order, onClose, onAction }) => {
  const [notes, setNotes] = useState('');
  const [processing, setProcessing] = useState(false);

  const getActionText = () => {
    switch (order.action) {
      case 'declined':
        return 'Decline Order';
      case 'ready':
        return 'Mark as Ready for Pickup';
      default:
        return 'Confirm Action';
    }
  };

  const getActionMessage = () => {
    switch (order.action) {
      case 'declined':
        return 'Please provide a reason for declining this order:';
      case 'ready':
        return 'Confirm that this order is ready for driver pickup:';
      default:
        return 'Are you sure?';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
      await onAction(order.id, order.action, notes);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>{getActionText()}</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <div className="order-summary">
            <p><strong>Order #:</strong> {order.order_number}</p>
            <p><strong>Vendor:</strong> {order.vendor_cooperative_name}</p>
            <p><strong>Total:</strong> ETB {order.total_amount}</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="notes">{getActionMessage()}</label>
              {order.action === 'declined' || order.action === 'ready' ? (
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows="4"
                  placeholder={order.action === 'declined' 
                    ? "Enter reason for declining this order..." 
                    : "Add any notes for the driver..."}
                  required={order.action === 'declined'}
                />
              ) : null}
            </div>

            <div className="form-actions">
              <button 
                type="button" 
                className="btn-secondary" 
                onClick={onClose}
                disabled={processing}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className={order.action === 'declined' ? 'btn-danger' : 'btn-primary'}
                disabled={processing}
              >
                {processing ? 'Processing...' : getActionText()}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderActions;