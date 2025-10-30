import React from 'react'
import { useLanguage } from '../../../contexts/LanguageContext'

const SettingsPage = () => {
  const { t } = useLanguage()

  return (
    <div className="settings-page">
      <div className="container text-center py-5">
        <div className="empty-state">
          <i className="fas fa-cog text-muted mb-3" style={{ fontSize: '3rem' }}></i>
          <h3>{t('settings.coming_soon', 'System Settings Coming Soon')}</h3>
          <p className="text-muted">
            {t('settings.feature_description', 'We\'re developing system configuration tools for administrators. You\'ll be able to manage platform settings, commission rates, SMS templates, and regional configurations.')}
          </p>
          <a href="/admin/dashboard" className="btn btn-primary">
            {t('settings.back_to_dashboard', 'Back to Dashboard')}
          </a>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage