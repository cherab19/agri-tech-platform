import React from 'react'
import { useLanguage } from '../../../contexts/LanguageContext'

const OrdersPage = () => {
  const { t } = useLanguage()

  return (
    <div className="orders-page">
      <div className="container text-center py-5">
        <div className="empty-state">
          <i className="fas fa-shopping-cart text-muted mb-3" style={{ fontSize: '3rem' }}></i>
          <h3>{t('admin_orders.coming_soon', 'Orders Management Coming Soon')}</h3>
          <p className="text-muted">
            {t('admin_orders.feature_description', 'We\'re building a comprehensive order management system for administrators. You\'ll be able to monitor all platform orders, resolve issues, and ensure smooth operations.')}
          </p>
          <a href="/admin/dashboard" className="btn btn-primary">
            {t('admin_orders.back_to_dashboard', 'Back to Dashboard')}
          </a>
        </div>
      </div>
    </div>
  )
}

export default OrdersPage