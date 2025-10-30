import React from 'react'
import { useLanguage } from '../../../contexts/LanguageContext'

const UsersPage = () => {
  const { t } = useLanguage()

  return (
    <div className="users-page">
      <div className="container text-center py-5">
        <div className="empty-state">
          <i className="fas fa-users text-muted mb-3" style={{ fontSize: '3rem' }}></i>
          <h3>{t('users.coming_soon', 'User Management Coming Soon')}</h3>
          <p className="text-muted">
            {t('users.feature_description', 'We\'re developing a comprehensive user management system for administrators. You\'ll be able to manage farmers, vendors, drivers, and system staff.')}
          </p>
          <a href="/admin/dashboard" className="btn btn-primary">
            {t('users.back_to_dashboard', 'Back to Dashboard')}
          </a>
        </div>
      </div>
    </div>
  )
}

export default UsersPage