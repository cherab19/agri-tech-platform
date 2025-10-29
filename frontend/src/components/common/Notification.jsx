import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import './notification.scss'

const Notification = ({ 
  message, 
  type = 'info', 
  duration = 5000,
  onClose,
  position = 'top-right'
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)

  useEffect(() => {
    // Show notification with slight delay for animation
    const showTimer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    // Auto-hide after duration
    const hideTimer = setTimeout(() => {
      handleClose()
    }, duration)

    return () => {
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
    }
  }, [duration])

  const handleClose = () => {
    setIsLeaving(true)
    setTimeout(() => {
      setIsVisible(false)
      onClose?.()
    }, 300)
  }

  const getIcon = () => {
    const icons = {
      success: 'fas fa-check-circle',
      error: 'fas fa-exclamation-circle',
      warning: 'fas fa-exclamation-triangle',
      info: 'fas fa-info-circle'
    }
    return icons[type] || icons.info
  }

  const getBackgroundColor = () => {
    const colors = {
      success: 'var(--bs-success)',
      error: 'var(--bs-danger)',
      warning: 'var(--bs-warning)',
      info: 'var(--bs-info)'
    }
    return colors[type] || colors.info
  }

  if (!isVisible) return null

  return createPortal(
    <div 
      className={`notification ${isLeaving ? 'notification-leaving' : ''} notification-${position}`}
      style={{ '--notification-bg': getBackgroundColor() }}
    >
      <div className="notification-content">
        <div className="notification-icon">
          <i className={getIcon()}></i>
        </div>
        <div className="notification-message">
          {message}
        </div>
        <button 
          className="notification-close"
          onClick={handleClose}
          aria-label="Close notification"
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
      
      {/* Progress bar */}
      <div 
        className="notification-progress"
        style={{ 
          animationDuration: `${duration}ms`,
          backgroundColor: getBackgroundColor()
        }}
      />
    </div>,
    document.body
  )
}

// Notification Hook
export const useNotification = () => {
  const [notifications, setNotifications] = useState([])

  const showNotification = (message, options = {}) => {
    const id = Date.now() + Math.random()
    const notification = {
      id,
      message,
      ...options
    }

    setNotifications(prev => [...prev, notification])

    // Auto remove after duration
    setTimeout(() => {
      removeNotification(id)
    }, options.duration || 5000)

    return id
  }

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  const NotificationContainer = () => (
    <>
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          message={notification.message}
          type={notification.type}
          duration={notification.duration}
          position={notification.position}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </>
  )

  return {
    showNotification,
    removeNotification,
    clearAll,
    NotificationContainer
  }
}

// Pre-configured notification types
export const notify = {
  success: (message, options = {}) => 
    useNotification().showNotification(message, { ...options, type: 'success' }),
  
  error: (message, options = {}) => 
    useNotification().showNotification(message, { ...options, type: 'error' }),
  
  warning: (message, options = {}) => 
    useNotification().showNotification(message, { ...options, type: 'warning' }),
  
  info: (message, options = {}) => 
    useNotification().showNotification(message, { ...options, type: 'info' })
}

export default Notification