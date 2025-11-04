import React, { useState, useEffect } from 'react';
import { useApi } from '../../../hooks/useApi';

const DeliveryMap = ({ orderId, driverLocation, pickupLocation, deliveryLocation }) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [deliveryProgress, setDeliveryProgress] = useState(0);
  const api = useApi();

  // This is a simplified map component
  // In a real application, you would integrate with Google Maps or similar service

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Simulate delivery progress updates
    const progressInterval = setInterval(() => {
      setDeliveryProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 3000);

    return () => clearInterval(progressInterval);
  }, []);

  return (
    <div className="delivery-map">
      <div className="map-header">
        <h3>Delivery Tracking</h3>
        <div className="progress-indicator">
          <span>Delivery Progress: {Math.min(100, Math.round(deliveryProgress))}%</span>
        </div>
      </div>

      <div className="map-container">
        {!mapLoaded ? (
          <div className="map-loading">
            <div className="loading-spinner"></div>
            <p>Loading delivery map...</p>
          </div>
        ) : (
          <div className="simulated-map">
            {/* Simplified map visualization */}
            <div className="map-route">
              <div className="route-line">
                <div 
                  className="route-progress" 
                  style={{ width: `${deliveryProgress}%` }}
                ></div>
              </div>
              
              <div className="location-point pickup">
                <div className="point-marker"></div>
                <div className="point-label">
                  <strong>Pickup</strong>
                  <span>{pickupLocation}</span>
                </div>
              </div>
              
              <div className="location-point delivery">
                <div className="point-marker"></div>
                <div className="point-label">
                  <strong>Delivery</strong>
                  <span>{deliveryLocation}</span>
                </div>
              </div>
              
              {driverLocation && (
                <div 
                  className="driver-position" 
                  style={{ left: `${deliveryProgress}%` }}
                >
                  <div className="driver-marker">
                    <span className="driver-icon">🚚</span>
                  </div>
                  <div className="driver-label">
                    <strong>Driver</strong>
                    <span>En route</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="delivery-info">
        <div className="info-card">
          <h4>Delivery Details</h4>
          <div className="info-grid">
            <div className="info-item">
              <span className="label">Estimated Arrival:</span>
              <span className="value">45-60 minutes</span>
            </div>
            <div className="info-item">
              <span className="label">Driver:</span>
              <span className="value">Abebe B. (4.8⭐)</span>
            </div>
            <div className="info-item">
              <span className="label">Vehicle:</span>
              <span className="value">Toyota Hilux (3A-4567)</span>
            </div>
            <div className="info-item">
              <span className="label">Contact:</span>
              <span className="value">+251 91 234 5678</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryMap;