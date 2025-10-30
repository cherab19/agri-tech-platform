import React from 'react'
import { useLanguage } from '../../../contexts/LanguageContext'

const FinancialsPage = () => {
  const { t } = useLanguage()

  return (
    <div className="financials-page">
      <div className="container text-center py-5">
        <div className="empty-state">
          <i className="fas fa-chart-line text-muted mb-3" style={{ fontSize: '3rem' }}></i>
          <h3>{t('financials.coming_soon', 'Financial Management Coming Soon')}</h3>
          <p className="text-muted">
            {t('financials.feature_description', 'We\'re developing comprehensive financial management tools for administrators. You\'ll be able to track commissions, manage disbursements, and generate financial reports.')}
          </p>
          <a href="/admin/dashboard" className="btn btn-primary">
            {t('financials.back_to_dashboard', 'Back to Dashboard')}
          </a>
        </div>
      </div>
    </div>
  )
}

export default FinancialsPage