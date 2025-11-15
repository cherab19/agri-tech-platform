import React from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import DeliveryHistory from '../../components/drivers/DeliveryHistory'

const HistoryPage = () => {
  const { t } = useLanguage()

  // Render the styled DeliveryHistory component so the cards, filters and lists use the dashboard styles
  return (
    <div className="history-page">
      <div className="container py-4">
        <h2 className="mb-3">{t('driver.delivery_history', 'Delivery History')}</h2>
        <p className="text-muted mb-4">{t('driver.delivery_history_description', 'Track your completed deliveries and earnings')}</p>
        <DeliveryHistory />
      </div>
    </div>
  )
}

export default HistoryPage