import React, { useState } from 'react';

const StatusUpdater = ({ order, onClose, onStatusUpdate }) => {
  const [selectedStatus, setSelectedStatus] = useState(order.delivery_status);
  const [notes, setNotes] = useState('');
  const [updating, setUpdating] = useState(false);

  const statusOptions = [
    { value: 'going_for_pickup', label: 'Going for Pickup', description: 'Heading to the farm to collect items' },
    { value: 'picked_up', label: 'Picked Up', description: 'Successfully collected all items from the farm' },
    { value: 'in_transit', label: 'In Transit', description: 'On the way to delivery location' },
    { value: 'delivered', label: 'Delivered', description: 'Items delivered to vendor' }
  ];

  const currentStatusIndex = statusOptions.findIndex(option => option.value === order.delivery_status);
  const availableStatuses = statusOptions.slice(currentStatusIndex + 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedStatus) return;

    setUpdating(true);
    try {
      await onStatusUpdate(order.id, selectedStatus, notes);
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setUpdating(false);
    }
  };

  const getCurrentLocation = () => {
    // In a real app, this would get the current GPS location
    return "Fetching current location...";
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content status-updater">
        <div className="modal-header">
          <h3>Update Delivery Status</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="order-info">
          <p><strong>Delivery #:</strong> {order.delivery_number}</p>
          <p><strong>Current Status:</strong> 
            <span className={`status-badge status-${order.delivery_status}`}>
              {order.delivery_status.replace(/_/g, ' ').toUpperCase()}
            </span>
          </p>
          <p><strong>Current Location:</strong> {getCurrentLocation()}</p>
        </div>

        <form onSubmit={handleSubmit} className="status-form">
          <div className="form-group">
            <label htmlFor="status">Update Status To:</label>
            <select
              id="status"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              required
            >
              <option value="">Select New Status</option>
              {availableStatuses.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {selectedStatus && (
              <small className="status-description">
                {statusOptions.find(opt => opt.value === selectedStatus)?.description}
              </small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="notes">
              {selectedStatus === 'delivered' ? 'Delivery Confirmation Notes:' : 'Status Update Notes:'}
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows="4"
              placeholder={
                selectedStatus === 'delivered' 
                  ? "Enter delivery confirmation details, recipient name, and any relevant information..."
                  : "Add any notes about the current status..."
              }
              required={selectedStatus === 'delivered'}
            />
          </div>

          {selectedStatus === 'picked_up' && (
            <div className="form-group">
              <label>
                <input type="checkbox" required />
                I confirm that I have collected all items in good condition
              </label>
            </div>
          )}

          {selectedStatus === 'delivered' && (
            <div className="delivery-warning">
              <div className="warning-icon">⚠️</div>
              <div className="warning-content">
                <strong>Important:</strong>
                <ul>
                  <li>Confirm delivery with the recipient</li>
                  <li>Get signature or confirmation from vendor</li>
                  <li>Ensure all items are delivered in good condition</li>
                  <li>This action will complete the delivery and trigger payment</li>
                </ul>
              </div>
            </div>
          )}

          <div className="form-actions">
            <button 
              type="button" 
              className="btn-secondary" 
              onClick={onClose}
              disabled={updating}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-primary"
              disabled={updating || !selectedStatus}
            >
              {updating ? 'Updating Status...' : 'Update Delivery Status'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StatusUpdater;