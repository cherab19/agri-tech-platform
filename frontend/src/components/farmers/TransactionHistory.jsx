import React, { useState, useEffect } from 'react';
import { useApi } from '../../../hooks/useApi';
import { useAuth } from '../../../contexts/AuthContext';
import LoadingSpinner from '../../common/LoadingSpinner';
import { formatCurrency, formatDate } from '../../../utils/formatters';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    type: ''
  });
  
  const { user } = useAuth();
  const api = useApi();

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await api.get(`/farmers/${user.cooperativeId}/transactions`);
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    let matches = true;
    
    if (filters.startDate) {
      matches = matches && new Date(transaction.created_at) >= new Date(filters.startDate);
    }
    
    if (filters.endDate) {
      const endDate = new Date(filters.endDate);
      endDate.setHours(23, 59, 59);
      matches = matches && new Date(transaction.created_at) <= endDate;
    }
    
    if (filters.type) {
      matches = matches && transaction.type === filters.type;
    }
    
    return matches;
  });

  const getStatusBadge = (status) => {
    const statusClasses = {
      completed: 'status-completed',
      pending: 'status-pending',
      failed: 'status-failed',
      processing: 'status-processing'
    };
    return `status-badge ${statusClasses[status] || 'status-pending'}`;
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'sale':
        return '💰';
      case 'payout':
        return '💳';
      case 'commission':
        return '📊';
      default:
        return '🔔';
    }
  };

  const calculateTotal = () => {
    return filteredTransactions.reduce((total, transaction) => {
      if (transaction.type === 'sale') {
        return total + transaction.amount;
      } else if (transaction.type === 'payout') {
        return total - transaction.amount;
      }
      return total;
    }, 0);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="transaction-history">
      <div className="page-header">
        <h2>Transaction History</h2>
        <div className="total-balance">
          <span>Net Balance: </span>
          <strong>{formatCurrency(calculateTotal())}</strong>
        </div>
      </div>

      <div className="filters-section">
        <div className="filter-group">
          <label htmlFor="startDate">From:</label>
          <input
            type="date"
            id="startDate"
            value={filters.startDate}
            onChange={(e) => setFilters(prev => ({ ...prev, startDate: e.target.value }))}
          />
        </div>
        
        <div className="filter-group">
          <label htmlFor="endDate">To:</label>
          <input
            type="date"
            id="endDate"
            value={filters.endDate}
            onChange={(e) => setFilters(prev => ({ ...prev, endDate: e.target.value }))}
          />
        </div>
        
        <div className="filter-group">
          <label htmlFor="type">Type:</label>
          <select
            id="type"
            value={filters.type}
            onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
          >
            <option value="">All Types</option>
            <option value="sale">Sales</option>
            <option value="payout">Payouts</option>
            <option value="commission">Commissions</option>
          </select>
        </div>
        
        <button 
          className="btn-secondary"
          onClick={() => setFilters({ startDate: '', endDate: '', type: '' })}
        >
          Clear Filters
        </button>
      </div>

      <div className="transactions-list">
        {filteredTransactions.length === 0 ? (
          <div className="empty-state">
            <p>No transactions found for the selected period.</p>
          </div>
        ) : (
          <div className="transactions-table">
            <div className="table-header">
              <div>Type</div>
              <div>Description</div>
              <div>Date</div>
              <div>Amount</div>
              <div>Status</div>
            </div>
            
            {filteredTransactions.map(transaction => (
              <div key={transaction.id} className="table-row">
                <div className="transaction-type">
                  <span className="type-icon">{getTypeIcon(transaction.type)}</span>
                  <span className="type-text">{transaction.type}</span>
                </div>
                
                <div className="transaction-description">
                  {transaction.description}
                  {transaction.order_number && (
                    <small>Order #{transaction.order_number}</small>
                  )}
                </div>
                
                <div className="transaction-date">
                  {formatDate(transaction.created_at)}
                </div>
                
                <div className={`transaction-amount ${transaction.type}`}>
                  {transaction.type === 'sale' ? '+' : '-'}
                  {formatCurrency(transaction.amount)}
                </div>
                
                <div className="transaction-status">
                  <span className={getStatusBadge(transaction.status)}>
                    {transaction.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="transactions-summary">
        <div className="summary-item">
          <span>Total Sales:</span>
          <strong>
            {formatCurrency(
              filteredTransactions
                .filter(t => t.type === 'sale')
                .reduce((sum, t) => sum + t.amount, 0)
            )}
          </strong>
        </div>
        <div className="summary-item">
          <span>Total Payouts:</span>
          <strong>
            {formatCurrency(
              filteredTransactions
                .filter(t => t.type === 'payout')
                .reduce((sum, t) => sum + t.amount, 0)
            )}
          </strong>
        </div>
        <div className="summary-item">
          <span>Transaction Count:</span>
          <strong>{filteredTransactions.length}</strong>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;