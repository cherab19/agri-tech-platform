import React from 'react'
import { useAuth } from '../../../../contexts/AuthContext'
import { useLanguage } from '../../../../contexts/LanguageContext'
import LoadingSpinner from '../LoadingSpinner'

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, isAuthenticated, loading } = useAuth()
  const { t } = useLanguage()

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow">
              <div className="card-body text-center p-5">
                <i className="fas fa-exclamation-triangle text-warning mb-3" style={{ fontSize: '3rem' }}></i>
                <h4 className="card-title mb-3">
                  {t('auth.authentication_required', 'Authentication Required')}
                </h4>
                <p className="card-text text-muted mb-4">
                  {t('auth.please_sign_in', 'Please sign in to access this page.')}
                </p>
                <a href="/login" className="btn btn-primary">
                  <i className="fas fa-sign-in-alt me-2"></i>
                  {t('auth.sign_in', 'Sign In')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow border-danger">
              <div className="card-body text-center p-5">
                <i className="fas fa-ban text-danger mb-3" style={{ fontSize: '3rem' }}></i>
                <h4 className="card-title mb-3">
                  {t('auth.access_denied', 'Access Denied')}
                </h4>
                <p className="card-text text-muted mb-4">
                  {t('auth.insufficient_permissions', 'You do not have permission to access this page.')}
                </p>
                <div className="d-flex gap-2 justify-content-center">
                  <a href="/" className="btn btn-outline-secondary">
                    <i className="fas fa-home me-2"></i>
                    {t('auth.go_home', 'Go Home')}
                  </a>
                  <a href={`/${user.role}/dashboard`} className="btn btn-primary">
                    <i className="fas fa-tachometer-alt me-2"></i>
                    {t('auth.go_to_dashboard', 'Go to Dashboard')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return children
}

export default ProtectedRoute