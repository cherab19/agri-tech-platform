import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { productsService } from '../../services/api/products'
import { vendorsService } from '../../services/api/vendors'
import { useCart } from '../../contexts/CartContext'
import { useAuth } from '../../contexts/AuthContext'
import { notify } from '../../components/common/Notification'
import { VendorLoading } from '../../components/common/LoadingSpinner'
import { useLanguage } from '../../contexts/LanguageContext'
import './product-detail.scss'

const ProductDetail = () => {
  const { t } = useLanguage()
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState(null)
  const [error, setError] = useState(null)
  const { addToCart } = useCart()
  const { user, token } = useAuth()

  useEffect(() => {
    let mounted = true
    const fetchProduct = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await productsService.getProduct(id)
        // productsService returns axios response
        const data = res && res.data ? res.data : res
        if (mounted) setProduct(data)
      } catch (err) {
        setError(err)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchProduct()

    return () => { mounted = false }
  }, [id])

  if (loading) return <div className="product-detail-loading"><VendorLoading /></div>

  if (error) return (
    <div className="container py-5">
      <div className="alert alert-danger">{t('product.error_loading', 'Failed to load product')}</div>
      <button className="btn btn-outline-primary" onClick={() => navigate(-1)}>{t('product.go_back', 'Go back')}</button>
    </div>
  )

  if (!product) return (
    <div className="container py-5">
      <div className="alert alert-warning">{t('product.not_found', 'Product not found')}</div>
      <button className="btn btn-outline-primary" onClick={() => navigate(-1)}>{t('product.go_back', 'Go back')}</button>
    </div>
  )

  return (
    <div className="product-detail container py-5">
      <div className="row g-4">
        <div className="col-md-6">
          <img src={product.image || '/images/products/placeholder.png'} alt={product.name} className="img-fluid rounded shadow-sm" />
        </div>
        <div className="col-md-6">
          <h2 className="fw-bold">{product.name}</h2>
          <p className="text-muted mb-1">{t('marketplace.by', 'By')} {product.farmer || product.vendor}</p>
          <div className="mb-3">
            <h3 className="text-primary">ETB{product.price} <small className="text-muted">/{product.unit}</small></h3>
            <small className="text-muted">{t('marketplace.min_order', 'Min. order')}: {product.minOrder} {product.unit}</small>
          </div>

          <p className="mb-3">{product.description || product.short_description || ''}</p>

          <div className="mb-3">
            <strong>{t('marketplace.availability', 'Availability')}:</strong> {product.available || 0} {product.unit}
          </div>

          <div className="d-flex gap-2">
            <button
              className="btn btn-outline-primary"
              onClick={() => {
                try {
                  const cartProduct = {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    unit: product.unit,
                    image: product.image,
                    availableQuantity: product.available ?? product.available_quantity
                  }
                  addToCart(cartProduct, 1)
                  notify.success(t('marketplace.added_to_cart', 'Product added to cart successfully'))
                } catch (e) {
                  console.error('Add to cart failed', e)
                  notify.error(t('marketplace.add_to_cart_failed', 'Failed to add product to cart'))
                }
              }}
            >
              {t('marketplace.add_to_cart', 'Add to Cart')}
            </button>

            <button
              className="btn btn-primary"
              onClick={async () => {
                // Order now flow: prompt for quantity and place a quick order using vendorsService
                if (!user) {
                  notify.error(t('auth.login_required', 'You must be logged in to place orders'))
                  navigate('/login')
                  return
                }

                const defaultQty = product.minOrder || 1
                const input = window.prompt(t('marketplace.enter_quantity', 'Enter quantity'), String(defaultQty))
                if (!input) return
                const qty = Number(input)
                if (!qty || qty <= 0) {
                  notify.error(t('marketplace.invalid_quantity', 'Invalid quantity'))
                  return
                }

                // basic availability check
                const available = Number(product.available ?? product.available_quantity ?? product.quantity ?? 0)
                if (available > 0 && qty > available) {
                  const proceed = window.confirm(t('marketplace.quantity_exceeds', 'Requested quantity exceeds available stock. Proceed?'))
                  if (!proceed) return
                }

                const coopId = user?.cooperative_id || user?.cooperativeId || user?.cooperative?.id || user?.id

                const orderPayload = {
                  buyer_cooperative_id: coopId,
                  items: [
                    { product_id: product.id, quantity: qty }
                  ],
                  // optional fields (address, notes) - backend may ignore if not present
                  delivery: { address: user?.address || '' }
                }

                try {
                  const res = await vendorsService.placeOrder(orderPayload, token)
                  const data = res && res.data ? res.data : res
                  notify.success(t('marketplace.quick_order_placed', 'Quick order placed successfully'))
                  // navigate to orders/tracking page if order id returned
                  const orderId = data?.id || data?.order_id || data?.order?.id
                  if (orderId) navigate(`/vendor/tracking?order=${orderId}`)
                } catch (e) {
                  console.error('Quick order failed', e)
                  notify.error(t('marketplace.quick_order_failed', 'Failed to place quick order'))
                }
              }}
            >
              {t('marketplace.order', 'Order')}
            </button>

            <button className="btn btn-link text-muted" onClick={() => navigate(-1)}>{t('product.go_back', 'Go back')}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
