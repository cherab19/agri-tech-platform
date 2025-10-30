import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useLanguage } from '../../contexts/LanguageContext'
import { DriverLoading } from '../../components/common/LoadingSpinner'

const DriverDashboard = () => {
  const { user } = useAuth()
  const { t } = useLanguage()

  if (!user) {
    return (
      <div className="driver-dashboard-loading">
        <DriverLoading />
      </div>
    )
  }

  return (
    <div className="driver-dashboard">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center py-5">
                <div className="driver-icon mb-4">
                  <i className="fas fa-truck text-primary" style={{ fontSize: '4rem' }}></i>
                </div>
                <h1 className="h2 fw-bold mb-3">
                  {t('driver.welcome', 'Welcome, Driver!')}
                </h1>
                <p className="text-muted mb-4">
                  {t('driver.dashboard_coming_soon', 'Your driver dashboard is under development. Soon you\'ll be able to manage deliveries, track earnings, and more.')}
                </p>
                <div className="driver-info mb-4">
                  <p className="mb-2">
                    <strong>{t('driver.name', 'Name')}:</strong> {user.name}
                  </p>
                  <p className="mb-2">
                    <strong>{t('driver.vehicle', 'Vehicle')}:</strong> {user.vehicle}
                  </p>
                  <p className="mb-0">
                    <strong>{t('driver.region', 'Region')}:</strong> {user.region}
                  </p>
                </div>
                <div className="action-buttons">
                  <button className="btn btn-primary me-3">
                    {t('driver.view_deliveries', 'View Deliveries')}
                  </button>
                  <button className="btn btn-outline-primary">
                    {t('driver.earnings', 'View Earnings')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DriverDashboard