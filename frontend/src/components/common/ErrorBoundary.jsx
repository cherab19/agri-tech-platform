import React from 'react'
import { useLanguage } from '../../../contexts/LanguageContext'
import './error-boundary.scss'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null 
    }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    
    // Log error to monitoring service in production
    console.error('Error Boundary Caught:', error, errorInfo)
  }

  handleReload = () => {
    window.location.reload()
  }

  handleGoHome = () => {
    window.location.href = '/'
  }

  render() {
    const { t } = this.props
    const { hasError, error, errorInfo } = this.state

    if (hasError) {
      return (
        <div className="error-boundary">
          <div className="container py-5">
            <div className="row justify-content-center">
              <div className="col-md-8 col-lg-6">
                <div className="error-card card border-0 shadow-lg">
                  <div className="card-body text-center p-5">
                    {/* Error Icon */}
                    <div className="error-icon mb-4">
                      <i className="fas fa-exclamation-triangle text-warning"></i>
                    </div>

                    {/* Error Title */}
                    <h2 className="error-title fw-bold text-dark mb-3">
                      {t ? t('error.something_went_wrong', 'Something Went Wrong') : 'Something Went Wrong'}
                    </h2>

                    {/* Error Message */}
                    <p className="error-message text-muted mb-4">
                      {t ? t('error.please_try_again', 'We encountered an unexpected error. Please try refreshing the page or go back home.') : 'We encountered an unexpected error. Please try refreshing the page or go back home.'}
                    </p>

                    {/* Action Buttons */}
                    <div className="error-actions d-flex gap-3 justify-content-center flex-wrap">
                      <button 
                        onClick={this.handleReload}
                        className="btn btn-primary px-4"
                      >
                        <i className="fas fa-redo me-2"></i>
                        {t ? t('error.reload_page', 'Reload Page') : 'Reload Page'}
                      </button>
                      <button 
                        onClick={this.handleGoHome}
                        className="btn btn-outline-secondary px-4"
                      >
                        <i className="fas fa-home me-2"></i>
                        {t ? t('error.go_home', 'Go Home') : 'Go Home'}
                      </button>
                    </div>

                    {/* Development Error Details */}
                    {process.env.NODE_ENV === 'development' && error && (
                      <div className="error-details mt-4 text-start">
                        <details className="small">
                          <summary className="cursor-pointer mb-2">
                            {t ? t('error.error_details', 'Error Details (Development)') : 'Error Details (Development)'}
                          </summary>
                          <div className="alert alert-danger small">
                            <strong>{error.toString()}</strong>
                            <pre className="mt-2 mb-0 small">
                              {errorInfo.componentStack}
                            </pre>
                          </div>
                        </details>
                      </div>
                    )}

                    {/* Support Contact */}
                    <div className="error-support mt-4 pt-3 border-top">
                      <p className="small text-muted mb-2">
                        {t ? t('error.need_help', 'Need help? Contact our support team:') : 'Need help? Contact our support team:'}
                      </p>
                      <div className="d-flex justify-content-center gap-3 small">
                        <a href="tel:+251911234567" className="text-decoration-none">
                          <i className="fas fa-phone me-1"></i>
                          +251 911 234 567
                        </a>
                        <a href="mailto:support@agaragritech.com" className="text-decoration-none">
                          <i className="fas fa-envelope me-1"></i>
                          support@agaragritech.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// Higher-order component to provide translation context
const ErrorBoundaryWithTranslation = (props) => {
  const { t } = useLanguage()
  return <ErrorBoundary {...props} t={t} />
}

export default ErrorBoundaryWithTranslation