import React from 'react';

const StatusTracker = ({ currentStatus, order }) => {
  const statusSteps = [
    { key: 'pending', label: 'Order Placed', description: 'Your order has been received' },
    { key: 'confirmed', label: 'Order Confirmed', description: 'Farmer has accepted your order' },
    { key: 'ready', label: 'Ready for Pickup', description: 'Items are ready for driver pickup' },
    { key: 'picked_up', label: 'Picked Up', description: 'Driver has collected the items' },
    { key: 'in_transit', label: 'In Transit', description: 'On the way to your location' },
    { key: 'delivered', label: 'Delivered', description: 'Order successfully delivered' }
  ];

  const getCurrentStepIndex = () => {
    return statusSteps.findIndex(step => step.key === currentStatus);
  };

  const currentStepIndex = getCurrentStepIndex();
  const isStepCompleted = (stepIndex) => stepIndex < currentStepIndex;
  const isCurrentStep = (stepIndex) => stepIndex === currentStepIndex;

  const getStatusTime = (status) => {
    const statusTimestamps = {
      pending: order?.created_at,
      confirmed: order?.confirmed_at,
      ready: order?.ready_at,
      picked_up: order?.picked_up_at,
      in_transit: order?.in_transit_at,
      delivered: order?.delivered_at
    };
    
    return statusTimestamps[status] ? 
      new Date(statusTimestamps[status]).toLocaleTimeString('en-ET', {
        hour: '2-digit',
        minute: '2-digit'
      }) : '';
  };

  return (
    <div className="status-tracker">
      <div className="tracker-header">
        <h3>Order Status</h3>
        <div className="current-status">
          <span className={`status-badge status-${currentStatus}`}>
            {currentStatus.replace('_', ' ').toUpperCase()}
          </span>
        </div>
      </div>

      <div className="tracker-steps">
        {statusSteps.map((step, index) => (
          <div 
            key={step.key}
            className={`tracker-step ${
              isStepCompleted(index) ? 'completed' : 
              isCurrentStep(index) ? 'current' : 'pending'
            }`}
          >
            <div className="step-indicator">
              <div className="step-number">
                {isStepCompleted(index) ? '✓' : index + 1}
              </div>
              {index < statusSteps.length - 1 && (
                <div className="step-connector"></div>
              )}
            </div>
            
            <div className="step-content">
              <div className="step-header">
                <h4 className="step-label">{step.label}</h4>
                {getStatusTime(step.key) && (
                  <span className="step-time">{getStatusTime(step.key)}</span>
                )}
              </div>
              <p className="step-description">{step.description}</p>
              
              {/* Additional info for current step */}
              {isCurrentStep(index) && (
                <div className="current-step-info">
                  {step.key === 'in_transit' && order?.driver && (
                    <div className="driver-info">
                      <strong>Driver:</strong> {order.driver.name} 
                      ({order.driver.vehicle_type})
                    </div>
                  )}
                  
                  {step.key === 'delivered' && order?.delivered_at && (
                    <div className="delivery-complete">
                      <span className="success-icon">✅</span>
                      Order delivered successfully
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Estimated Delivery Time */}
      {currentStatus !== 'delivered' && (
        <div className="delivery-estimate">
          <div className="estimate-card">
            <h4>Estimated Delivery</h4>
            <p className="estimate-time">45-60 minutes</p>
            <p className="estimate-note">
              Based on current traffic and distance
            </p>
          </div>
        </div>
      )}

      {/* Support Information */}
      <div className="support-info">
        <p>Need help with your order?</p>
        <div className="support-contacts">
          <button className="support-btn">
            📞 Call Support
          </button>
          <button className="support-btn">
            💬 Live Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatusTracker;