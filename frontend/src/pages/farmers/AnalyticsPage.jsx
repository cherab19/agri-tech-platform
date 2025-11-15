import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useLanguage } from '../../contexts/LanguageContext'
import { FarmerLoading } from '../../components/common/LoadingSpinner'
import { farmersService } from '../../services/api/farmers'
import './farmer-dashboard.scss'

const AnalyticsPage = () => {
  const { user, token } = useAuth()
  const { t } = useLanguage()

  const [loading, setLoading] = useState(true)
  const [summary, setSummary] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true)
      setError(null)
      try {
        const coopId = user?.cooperative_id || user?.cooperativeId || user?.cooperative?.id || user?.id

        if (coopId) {
          const res = await farmersService.getEarningsSummary(coopId, token)
          const data = res && res.data ? res.data : res
          setSummary(data || null)

          const txRes = await farmersService.getTransactions(coopId, token, { limit: 20 })
          const txData = txRes && txRes.data ? txRes.data : txRes
          const txList = Array.isArray(txData) ? txData : (txData.results || [])
          setTransactions(txList)
        } else {
          // best-effort fallbacks when cooperative id isn't present
          const res = await farmersService.getEarningsSummary(null, token)
          const data = res && res.data ? res.data : res
          setSummary(data || null)

          const txRes = await farmersService.getTransactions(null, token, { limit: 20 })
          const txData = txRes && txRes.data ? txRes.data : txRes
          const txList = Array.isArray(txData) ? txData : (txData.results || [])
          setTransactions(txList)
        }
      } catch (e) {
        console.error('Failed to load analytics', e)
        setError(e)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [user, token])

  if (!user) {
    return (
      <div className="farmer-dashboard-loading">
        <FarmerLoading />
      </div>
    )
  }

  return (
    <div className="farmer-dashboard">
      <div className="dashboard-header py-4">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col">
              <h1 className="h2 fw-bold mb-1">{t('farmer.analytics', 'Analytics & Reports')}</h1>
              <p className="text-muted mb-0">{t('farmer.view_reports_desc', 'Sales analytics and performance metrics')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-stats py-4 bg-light">
        <div className="container-fluid">
          <div className="row g-3">
            {loading ? (
              <div className="col-12 text-center py-4"><FarmerLoading /></div>
            ) : (
              <>
                <div className="col-xl-3 col-lg-6 col-md-6">
                  <div className="stat-card">
                    <div className="card border-0 shadow-sm h-100">
                      <div className="card-body">
                        <h6 className="stat-title text-muted mb-1">{t('farmer.monthly_revenue', 'Monthly Revenue')}</h6>
                        <h4 className="stat-value fw-bold mb-0">{summary?.monthly_total != null ? `ETB ${summary.monthly_total}` : '—'}</h4>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-3 col-lg-6 col-md-6">
                  <div className="stat-card">
                    <div className="card border-0 shadow-sm h-100">
                      <div className="card-body">
                        <h6 className="stat-title text-muted mb-1">{t('farmer.total_transactions', 'Total Transactions')}</h6>
                        <h4 className="stat-value fw-bold mb-0">{summary?.total_transactions ?? transactions.length ?? 0}</h4>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-3 col-lg-6 col-md-6">
                  <div className="stat-card">
                    <div className="card border-0 shadow-sm h-100">
                      <div className="card-body">
                        <h6 className="stat-title text-muted mb-1">{t('farmer.avg_order_value', 'Avg Order Value')}</h6>
                        <h4 className="stat-value fw-bold mb-0">{summary?.avg_order_value != null ? `ETB ${summary.avg_order_value}` : '—'}</h4>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-3 col-lg-6 col-md-6">
                  <div className="stat-card">
                    <div className="card border-0 shadow-sm h-100">
                      <div className="card-body">
                        <h6 className="stat-title text-muted mb-1">{t('farmer.pending_payments', 'Pending Payments')}</h6>
                        <h4 className="stat-value fw-bold mb-0">{summary?.pending_payments != null ? `ETB ${summary.pending_payments}` : '—'}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="dashboard-content py-4">
        <div className="container-fluid">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0 py-3 d-flex justify-content-between align-items-center">
              <h5 className="fw-bold mb-0">{t('farmer.recent_transactions', 'Recent Transactions')}</h5>
            </div>
            <div className="card-body">
              {loading ? (
                <FarmerLoading />
              ) : error ? (
                <div className="text-danger">{t('common.error_loading', 'Failed to load analytics')}</div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead>
                      <tr>
                        <th>{t('transactions.id', 'ID')}</th>
                        <th>{t('transactions.date', 'Date')}</th>
                        <th>{t('transactions.amount', 'Amount')}</th>
                        <th>{t('transactions.status', 'Status')}</th>
                        <th>{t('transactions.note', 'Note')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.length > 0 ? (
                        transactions.map((tx) => (
                          <tr key={tx.id}>
                            <td className="fw-semibold">{tx.id || tx.transaction_id}</td>
                            <td>{new Date(tx.created_at || tx.date || tx.timestamp).toLocaleString()}</td>
                            <td>{typeof tx.amount === 'number' ? `ETB ${tx.amount}` : tx.amount}</td>
                            <td>{tx.status || tx.state || '—'}</td>
                            <td>{tx.note || tx.description || '—'}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center text-muted">{t('farmer.no_transactions', 'No transactions found')}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsPage
