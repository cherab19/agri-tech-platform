import React from 'react'
import './loading-spinner.scss'

const LoadingSpinner = ({ 
  size = 'md', 
  color = 'primary', 
  text = '',
  overlay = false 
}) => {
  const getSpinnerSize = () => {
    const sizes = {
      sm: '1rem',
      md: '2rem',
      lg: '3rem',
      xl: '4rem'
    }
    return sizes[size] || sizes.md
  }

  const getSpinnerClass = () => {
    const colorClass = color === 'primary' ? 'text-primary' : `text-${color}`
    return `spinner-border ${colorClass}`
  }

  if (overlay) {
    return (
      <div className="loading-overlay">
        <div className="loading-content text-center">
          <div 
            className={getSpinnerClass()}
            style={{ width: getSpinnerSize(), height: getSpinnerSize() }}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
          {text && <p className="mt-2 mb-0 text-muted">{text}</p>}
        </div>
      </div>
    )
  }

  return (
    <div className="loading-spinner d-flex align-items-center justify-content-center">
      <div 
        className={getSpinnerClass()}
        style={{ width: getSpinnerSize(), height: getSpinnerSize() }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      {text && <span className="ms-2 text-muted">{text}</span>}
    </div>
  )
}

// Agri-tech specific loading components
export const FarmerLoading = () => (
  <LoadingSpinner 
    size="lg" 
    color="success" 
    text="Loading farm data..." 
  />
)

export const VendorLoading = () => (
  <LoadingSpinner 
    size="lg" 
    color="primary" 
    text="Loading marketplace..." 
  />
)

export const DriverLoading = () => (
  <LoadingSpinner 
    size="lg" 
    color="warning" 
    text="Loading deliveries..." 
  />
)

export const AdminLoading = () => (
  <LoadingSpinner 
    size="lg" 
    color="dark" 
    text="Loading dashboard..." 
  />
)

export default LoadingSpinner