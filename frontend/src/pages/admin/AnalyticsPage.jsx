import React from 'react'
import { useLanguage } from '../../contexts/LanguageContext'

const AnalyticsPage = () => {
  const { t } = useLanguage()

  return (
    <div className="analytics-page">
      <div className="container text-center py-5">
        <div className="empty-state">
          <i className="fas fa-chart-bar text-muted mb-3" style={{ fontSize: '3rem' }}></i>
          <h3>{t('analytics.coming_soon', 'Analytics Dashboard Coming Soon')}</h3>
          <p className="text-muted">
            {t('analytics.feature_description', 'We\'re building a comprehensive analytics dashboard for administrators. You\'ll get insights into platform performance, user behavior, and business metrics.')}
          </p>
          <a href="/admin/dashboard" className="btn btn-primary">
            {t('analytics.back_to_dashboard', 'Back to Dashboard')}
          </a>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsPage