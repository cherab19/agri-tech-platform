import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { productsService } from '../../services/api/products'
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
            <h3 className="text-primary">₦{product.price} <small className="text-muted">/{product.unit}</small></h3>
            <small className="text-muted">{t('marketplace.min_order', 'Min. order')}: {product.minOrder} {product.unit}</small>
          </div>

          <p className="mb-3">{product.description || product.short_description || ''}</p>

          <div className="mb-3">
            <strong>{t('marketplace.availability', 'Availability')}:</strong> {product.available || 0} {product.unit}
          </div>

          <div className="d-flex gap-2">
            <button className="btn btn-outline-primary">{t('marketplace.add_to_cart', 'Add to Cart')}</button>
            <button className="btn btn-primary">{t('marketplace.order', 'Order')}</button>
            <button className="btn btn-link text-muted" onClick={() => navigate(-1)}>{t('product.go_back', 'Go back')}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
