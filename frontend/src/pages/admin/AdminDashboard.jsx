import React from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import { useLanguage } from '../../../contexts/LanguageContext'
import { AdminLoading } from '../../components/common/LoadingSpinner'

const AdminDashboard = () => {
  const { user } = useAuth()
  const { t } = useLanguage()

  if (!user) {
    return (
      <div className="admin-dashboard-loading">
        <AdminLoading />
      </div>
    )
  }

  return (
    <div className="admin-dashboard">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center py-5">
                <div className="admin-icon mb-4">
                  <i className="fas fa-cogs text-primary" style={{ fontSize: '4rem' }}></i>
                </div>
                <h1 className="h2 fw-bold mb-3">
                  {t('admin.welcome', 'Welcome, Administrator!')}
                </h1>
                <p className="text-muted mb-4">
                  {t('admin.dashboard_coming_soon', 'The admin dashboard is currently under development. You\'ll soon have access to comprehensive platform management tools.')}
                </p>
                <div className="admin-info mb-4">
                  <p className="mb-2">
                    <strong>{t('admin.name', 'Name')}:</strong> {user.name}
                  </p>
                  <p className="mb-2">
                    <strong>{t('admin.role', 'Role')}:</strong> {user.role}
                  </p>
                  <p className="mb-0">
                    <strong>{t('admin.permissions', 'Permissions')}:</strong> {user.permissions?.join(', ')}
                  </p>
                </div>
                <div className="action-buttons">
                  <button className="btn btn-primary me-3">
                    {t('admin.manage_users', 'Manage Users')}
                  </button>
                  <button className="btn btn-outline-primary">
                    {t('admin.view_reports', 'View Reports')}
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

export default AdminDashboard