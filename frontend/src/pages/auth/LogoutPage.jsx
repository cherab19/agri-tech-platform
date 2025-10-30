import React, { useEffect } from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import { useLanguage } from '../../../contexts/LanguageContext'
import { useNavigate } from 'react-router-dom'
import { FarmerLoading } from '../../components/common/LoadingSpinner'
import './auth-pages.scss'

const LogoutPage = () => {
  const { logout } = useAuth()
  const { t } = useLanguage()
  const navigate = useNavigate()

  useEffect(() => {
    const performLogout = async () => {
      // Add a small delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Perform logout
      logout()
      
      // Redirect to home after logout
      setTimeout(() => {
        navigate('/')
      }, 500)
    }

    performLogout()
  }, [logout, navigate])

  return (
    <div className="logout-page">
      <div className="container">
        <div className="row justify-content-center align-items-center min-vh-100">
          <div className="col-lg-6 col-md-8 col-sm-10">
            <div className="logout-card text-center">
              <div className="logout-icon mb-4">
                <i className="fas fa-sign-out-alt text-primary"></i>
              </div>
              
              <h2 className="fw-bold mb-3">
                {t('logout.logging_out', 'Logging Out')}
              </h2>
              
              <p className="text-muted mb-4">
                {t('logout.please_wait', 'Please wait while we securely log you out...')}
              </p>

              <div className="loading-spinner mb-4">
                <FarmerLoading />
              </div>

              <div className="logout-progress">
                <div className="progress" style={{ height: '4px' }}>
                  <div 
                    className="progress-bar progress-bar-striped progress-bar-animated" 
                    style={{ width: '100%' }}
                  ></div>
                </div>
              </div>

              <div className="logout-message mt-4">
                <p className="small text-muted">
                  {t('logout.redirect_message', 'You will be redirected to the home page shortly.')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogoutPage