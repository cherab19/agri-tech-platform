import React from 'react'
import { useLanguage } from '../../../contexts/LanguageContext'

const HistoryPage = () => {
  const { t } = useLanguage()

  return (
    <div className="history-page">
      <div className="container text-center py-5">
        <div className="empty-state">
          <i className="fas fa-clipboard-list text-muted mb-3" style={{ fontSize: '3rem' }}></i>
          <h3>{t('history.coming_soon', 'Delivery History Coming Soon')}</h3>
          <p className="text-muted">
            {t('history.feature_description', 'Soon you\'ll be able to view your complete delivery history, track your performance, and analyze your earnings over time.')}
          </p>
          <a href="/driver/dashboard" className="btn btn-primary">
            {t('history.back_to_dashboard', 'Back to Dashboard')}
          </a>
        </div>
      </div>
    </div>
  )
}

export default HistoryPage