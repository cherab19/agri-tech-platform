import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useLanguage } from '../../contexts/LanguageContext'
import { vendorsService } from '../../services/api/vendors'
import { productsService } from '../../services/api/products'
import { notify } from '../../components/common/Notification'
import './vendor-dashboard.scss'

const QuickOrder = () => {
  const { t } = useLanguage()
  const { user, token } = useAuth()
  const navigate = useNavigate()

  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedItems, setSelectedItems] = useState({})

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true)
      try {
        // Try vendor profile or purchase history for frequent items
        const coopId = user?.cooperative_id || user?.cooperativeId || user?.cooperative?.id || user?.id
        let res
        if (coopId) {
          res = await vendorsService.getPurchaseHistory(coopId, token, { limit: 20 })
        } else {
          res = await productsService.getProducts({ available_only: true })
        }
        const data = res && res.data ? res.data : res
        const list = Array.isArray(data) ? data : (data.results || [])
        // If purchase history returns purchase records, map to product summaries
        const items = list.map(item => ({
          id: item.product_id || item.id || item.product?.id,
          name: item.product_name || item.name || item.product?.name,
          price: item.amount || item.price || item.product?.price,
          unit: item.unit || item.product?.unit || 'KG'
        })).filter(Boolean)
        setFavorites(items)
      } catch (err) {
        console.warn('Failed to load quick-order favorites', err)
        setFavorites([])
      } finally {
        setLoading(false)
      }
    }

    fetchFavorites()
  }, [user, token])

  const toggleItem = (id) => {
    setSelectedItems(prev => {
      const copy = { ...prev }
      if (copy[id]) delete copy[id]
      else copy[id] = 1
      return copy
    })
  }

  const handlePlaceOrder = async () => {
    if (!token) {
      notify.error(t('auth.login_required', 'You must be logged in to place orders'))
      return
    }

    const items = Object.keys(selectedItems).map(id => ({ product: id, quantity: selectedItems[id] }))
    if (items.length === 0) {
      notify.error(t('quickorder.no_items', 'No items selected'))
      return
    }

    setLoading(true)
    try {
      const orderPayload = {
        items,
        vendor_cooperative: user?.cooperative_id || user?.cooperative?.id || user?.id
      }
      await vendorsService.placeOrder(orderPayload, token)
      notify.success(t('quickorder.placed', 'Quick order placed successfully'))
      navigate('/vendor/orders')
    } catch (err) {
      console.error('Quick order failed', err)
      notify.error(t('quickorder.failed', 'Failed to place quick order'))
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="p-4">{t('common.loading', 'Loading...')}</div>

  return (
    <div className="quick-order-page p-4">
      <h3 className="mb-3">{t('vendor.quick_order', 'Quick Order')}</h3>
      {favorites.length === 0 ? (
        <div className="text-muted">{t('quickorder.no_favorites', 'No frequent items found')}</div>
      ) : (
        <div className="list-group mb-3">
          {favorites.map(item => (
            <label key={item.id} className={`list-group-item d-flex justify-content-between align-items-center ${selectedItems[item.id] ? 'active' : ''}`}>
              <div>
                <div className="fw-semibold">{item.name}</div>
                <small className="text-muted">ETB{item.price}/{item.unit}</small>
              </div>
              <div>
                <input type="number" min="0" value={selectedItems[item.id] || ''} onChange={(e) => setSelectedItems(prev => ({ ...prev, [item.id]: Number(e.target.value) }))} className="form-control form-control-sm me-2" style={{ width: '80px', display: 'inline-block' }} />
                <input type="checkbox" checked={!!selectedItems[item.id]} onChange={() => toggleItem(item.id)} />
              </div>
            </label>
          ))}
        </div>
      )}

      <div className="d-flex justify-content-end">
        <button className="btn btn-secondary me-2" onClick={() => navigate('/vendor/marketplace')}>{t('common.back', 'Back')}</button>
        <button className="btn btn-success" onClick={handlePlaceOrder} disabled={loading}>{t('quickorder.place_order', 'Place Order')}</button>
      </div>
    </div>
  )
}

export default QuickOrder
