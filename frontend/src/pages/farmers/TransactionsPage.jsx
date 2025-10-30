import React, { useState } from 'react'
import { useLanguage } from '../../../contexts/LanguageContext'
import { FarmerLoading } from '../../components/common/LoadingSpinner'
import './transactions-page.scss'

const TransactionsPage = () => {
  const { t } = useLanguage()
  const [loading, setLoading] = useState(false)
  const [dateRange, setDateRange] = useState('30days')

  const transactions = [
    {
      id: 'TXN-001',
      orderId: 'ORD-004',
      date: '2024-01-12',
      type: 'sale',
      product: 'Onions',
      quantity: 75,
      amount: 5625,
      status: 'completed',
      paymentMethod: 'TeleBirr'
    },
    {
      id: 'TXN-002',
      orderId: 'ORD-003',
      date: '2024-01-15',
      type: 'sale',
      product: 'Carrots',
      quantity: 100,
      amount: 9000,
      status: 'completed',
      paymentMethod: 'TeleBirr'
    },
    {
      id: 'TXN-003',
      orderId: 'ORD-002',
      date: '2024-01-16',
      type: 'sale',
      product: 'Green Peppers',
      quantity: 25,
      amount: 4500,
      status: 'pending',
      paymentMethod: 'TeleBirr'
    },
    {
      id: 'TXN-004',
      orderId: 'ORD-001',
      date: '2024-01-17',
      type: 'sale',
      product: 'Fresh Tomatoes',
      quantity: 50,
      amount: 6000,
      status: 'pending',
      paymentMethod: 'TeleBirr'
    },
    {
      id: 'TXN-005',
      date: '2024-01-05',
      type: 'commission',
      description: 'Platform service fee',
      amount: -300,
      status: 'completed',
      paymentMethod: 'Auto-deduct'
    }
  ]

  const summaryStats = {
    totalRevenue: transactions.filter(t => t.type === 'sale').reduce((sum, t) => sum + t.amount, 0),
    pendingAmount: transactions.filter(t => t.status === 'pending').reduce((sum, t) => sum + t.amount, 0),
    totalCommission: Math.abs(transactions.filter(t => t.type === 'commission').reduce((sum, t) => sum + t.amount, 0)),
    netEarnings: transactions.reduce((sum, t) => sum + t.amount, 0)
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      'completed': { class: 'success', text: t('transactions.completed', 'Completed') },
      'pending': { class: 'warning', text: t('transactions.pending', 'Pending') },
      'failed': { class: 'danger', text: t('transactions.failed', 'Failed') }
    }
    
    const config = statusConfig[status] || statusConfig.pending
    return `badge bg-${config.class} bg-opacity-25 text-${config.class}`
  }

  const getTypeIcon = (type) => {
    const icons = {
      'sale': 'fas fa-arrow-down text-success',
      'commission': 'fas fa-percentage text-danger',
      'refund': 'fas fa-arrow-up text-info'
    }
    return icons[type] || 'fas fa-exchange-alt text-muted'
  }

  const getTypeLabel = (type) => {
    const labels = {
      'sale': t('transactions.sale', 'Sale'),
      'commission': t('transactions.commission', 'Commission'),
      'refund': t('transactions.refund', 'Refund')
    }
    return labels[type] || type
  }

  const handleDateRangeChange = (range) => {
    setLoading(true)
    setDateRange(range)
    // Simulate API call
    setTimeout(() => setLoading(false), 1000)
  }

  if (loading) {
    return (
      <div className="transactions-page-loading">
        <FarmerLoading />
      </div>
    )
  }

  return (
    <div className="transactions-page">
      {/* Page Header */}
      <div className="page-header py-4 bg-white border-bottom">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col">
              <h1 className="h2 fw-bold mb-1">
                {t('transactions.transaction_history', 'Transaction History')}
              </h1>
              <p className="text-muted mb-0">
                {t('transactions.view_payments', 'View your sales, payments, and commissions')}
              </p>
            </div>
            <div className="col-auto">
              <div className="dropdown">
                <button
                  className="btn btn-outline-primary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                >
                  {dateRange === '7days' ? t('transactions.last_7_days', 'Last 7 Days') :
                   dateRange === '30days' ? t('transactions.last_30_days', 'Last 30 Days') :
                   dateRange === '90days' ? t('transactions.last_90_days', 'Last 90 Days') :
                   t('transactions.all_time', 'All Time')}
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleDateRangeChange('7days')}
                    >
                      {t('transactions.last_7_days', 'Last 7 Days')}
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleDateRangeChange('30days')}
                    >
                      {t('transactions.last_30_days', 'Last 30 Days')}
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleDateRangeChange('90days')}
                    >
                      {t('transactions.last_90_days', 'Last 90 Days')}
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleDateRangeChange('all')}
                    >
                      {t('transactions.all_time', 'All Time')}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="summary-stats py-4 bg-light">
        <div className="container-fluid">
          <div className="row g-3">
            <div className="col-xl-3 col-lg-6 col-md-6">
              <div className="stat-card">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body text-center">
                    <div className="stat-icon bg-success bg-opacity-10 text-success rounded-circle p-3 mb-3 mx-auto">
                      <i className="fas fa-money-bill-wave"></i>
                    </div>
                    <h3 className="stat-value fw-bold text-success mb-1">
                      ₦{summaryStats.totalRevenue.toLocaleString()}
                    </h3>
                    <p className="stat-label text-muted mb-0">
                      {t('transactions.total_revenue', 'Total Revenue')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6">
              <div className="stat-card">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body text-center">
                    <div className="stat-icon bg-warning bg-opacity-10 text-warning rounded-circle p-3 mb-3 mx-auto">
                      <i className="fas fa-clock"></i>
                    </div>
                    <h3 className="stat-value fw-bold text-warning mb-1">
                      ₦{summaryStats.pendingAmount.toLocaleString()}
                    </h3>
                    <p className="stat-label text-muted mb-0">
                      {t('transactions.pending_payments', 'Pending Payments')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6">
              <div className="stat-card">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body text-center">
                    <div className="stat-icon bg-danger bg-opacity-10 text-danger rounded-circle p-3 mb-3 mx-auto">
                      <i className="fas fa-percentage"></i>
                    </div>
                    <h3 className="stat-value fw-bold text-danger mb-1">
                      ₦{summaryStats.totalCommission.toLocaleString()}
                    </h3>
                    <p className="stat-label text-muted mb-0">
                      {t('transactions.total_commission', 'Total Commission')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6">
              <div className="stat-card">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body text-center">
                    <div className="stat-icon bg-primary bg-opacity-10 text-primary rounded-circle p-3 mb-3 mx-auto">
                      <i className="fas fa-wallet"></i>
                    </div>
                    <h3 className="stat-value fw-bold text-primary mb-1">
                      ₦{summaryStats.netEarnings.toLocaleString()}
                    </h3>
                    <p className="stat-label text-muted mb-0">
                      {t('transactions.net_earnings', 'Net Earnings')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="transactions-list py-4">
        <div className="container-fluid">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0 py-3">
              <div className="row align-items-center">
                <div className="col">
                  <h5 className="fw-bold mb-0">
                    {t('transactions.recent_transactions', 'Recent Transactions')}
                  </h5>
                </div>
                <div className="col-auto">
                  <button className="btn btn-outline-primary btn-sm">
                    <i className="fas fa-download me-1"></i>
                    {t('transactions.export', 'Export')}
                  </button>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead>
                    <tr>
                      <th>{t('transactions.transaction_id', 'Transaction ID')}</th>
                      <th>{t('transactions.date', 'Date')}</th>
                      <th>{t('transactions.type', 'Type')}</th>
                      <th>{t('transactions.description', 'Description')}</th>
                      <th>{t('transactions.amount', 'Amount')}</th>
                      <th>{t('transactions.status', 'Status')}</th>
                      <th>{t('transactions.payment_method', 'Payment Method')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (
                      <tr key={transaction.id}>
                        <td>
                          <span className="fw-semibold text-primary">{transaction.id}</span>
                          {transaction.orderId && (
                            <div className="small text-muted">
                              Order: {transaction.orderId}
                            </div>
                          )}
                        </td>
                        <td>
                          {new Date(transaction.date).toLocaleDateString()}
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <i className={`${getTypeIcon(transaction.type)} me-2`}></i>
                            <span>{getTypeLabel(transaction.type)}</span>
                          </div>
                        </td>
                        <td>
                          {transaction.product || transaction.description}
                          {transaction.quantity && (
                            <div className="small text-muted">
                              {transaction.quantity} kg
                            </div>
                          )}
                        </td>
                        <td>
                          <span className={`fw-bold ${
                            transaction.amount >= 0 ? 'text-success' : 'text-danger'
                          }`}>
                            {transaction.amount >= 0 ? '+' : ''}₦{Math.abs(transaction.amount).toLocaleString()}
                          </span>
                        </td>
                        <td>
                          <span className={getStatusBadge(transaction.status)}>
                            {getStatusBadge(transaction.status).includes('success') ? t('transactions.completed', 'Completed') :
                             getStatusBadge(transaction.status).includes('warning') ? t('transactions.pending', 'Pending') :
                             t('transactions.failed', 'Failed')}
                          </span>
                        </td>
                        <td>
                          <span className="badge bg-light text-dark">
                            {transaction.paymentMethod}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Empty State */}
              {transactions.length === 0 && (
                <div className="text-center py-5">
                  <div className="empty-state-icon mb-3">
                    <i className="fas fa-receipt text-muted" style={{ fontSize: '3rem' }}></i>
                  </div>
                  <h5 className="text-muted mb-2">
                    {t('transactions.no_transactions', 'No Transactions Found')}
                  </h5>
                  <p className="text-muted mb-3">
                    {t('transactions.no_transactions_description', 'Your transaction history will appear here once you start making sales.')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionsPage