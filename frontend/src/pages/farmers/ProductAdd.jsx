import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useLanguage } from '../../contexts/LanguageContext'
import { productsService } from '../../services/api/products'
import { notify } from '../../components/common/Notification'
import './products-page.scss'

const ProductAdd = () => {
  const { t } = useLanguage()
  const { token } = useAuth()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [form, setForm] = useState({
    category: '',
    name: '',
    description: '',
    price: '',
    unit: 'KG',
    min_order_quantity: 1,
    available_quantity: 0,
    is_organic: false,
    tags: ''
  })

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await productsService.getCategories()
        const data = res && res.data ? res.data : res
        const list = Array.isArray(data) ? data : (data.results || [])
        setCategories(list)
      } catch (err) {
        console.warn('Failed to load categories', err)
        setCategories([])
      }
    }

    fetchCategories()
  }, [])

  const units = [
    { value: 'KG', label: 'Kilogram' },
    { value: 'G', label: 'Gram' },
    { value: 'L', label: 'Liter' },
    { value: 'ML', label: 'Milliliter' },
    { value: 'PIECE', label: 'Piece' },
    { value: 'BUNCH', label: 'Bunch' },
    { value: 'BAG', label: 'Bag' },
    { value: 'CRATE', label: 'Crate' }
  ]

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!token) {
      notify.error(t('auth.login_required', 'You must be logged in to add products'))
      return
    }

    // Basic validation
    if (!form.name || !form.category || !form.price) {
      notify.error(t('products.fill_required', 'Please fill required fields'))
      return
    }

    setLoading(true)
    try {
      const payload = {
        category: form.category,
        name: form.name,
        description: form.description,
        price: parseFloat(form.price),
        unit: form.unit,
        min_order_quantity: parseFloat(form.min_order_quantity),
        available_quantity: parseFloat(form.available_quantity),
        is_organic: !!form.is_organic,
        tags: form.tags ? form.tags.split(',').map(t => t.trim()) : []
      }

      await productsService.createProduct(payload, token)

      // Let marketplace and product lists refresh
      window.dispatchEvent(new CustomEvent('product:added'))

      notify.success(t('products.created', 'Product created successfully'))
      navigate('/farmer/products')
    } catch (err) {
      console.error('Create product failed', err)
      notify.error(t('products.create_failed', 'Failed to create product'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="products-page py-4">
      <div className="container-fluid">
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white border-0 py-3">
            <h5 className="fw-bold mb-0">{t('products.add_product', 'Add New Product')}</h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">{t('products.name', 'Product Name')}</label>
                  <input name="name" value={form.name} onChange={handleChange} className="form-control" />
                </div>

                <div className="col-md-6">
                  <label className="form-label">{t('products.category', 'Category')}</label>
                  <select name="category" value={form.category} onChange={handleChange} className="form-select">
                    <option value="">{t('products.select_category', 'Select category')}</option>
                    {categories.map(cat => (
                      <option key={cat.id || cat} value={cat.id || cat}>{cat.name || cat}</option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label">{t('products.price', 'Price (per unit)')}</label>
                  <input name="price" type="number" step="0.01" value={form.price} onChange={handleChange} className="form-control" />
                </div>

                <div className="col-md-3">
                  <label className="form-label">{t('products.unit', 'Unit')}</label>
                  <select name="unit" value={form.unit} onChange={handleChange} className="form-select">
                    {units.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
                  </select>
                </div>

                <div className="col-md-3">
                  <label className="form-label">{t('products.available', 'Available Quantity')}</label>
                  <input name="available_quantity" type="number" step="0.01" value={form.available_quantity} onChange={handleChange} className="form-control" />
                </div>

                <div className="col-12">
                  <label className="form-label">{t('products.description', 'Description')}</label>
                  <textarea name="description" value={form.description} onChange={handleChange} className="form-control" rows="4" />
                </div>

                <div className="col-md-4">
                  <label className="form-label">{t('products.min_order_quantity', 'Min Order Qty')}</label>
                  <input name="min_order_quantity" type="number" step="0.01" value={form.min_order_quantity} onChange={handleChange} className="form-control" />
                </div>

                <div className="col-md-4 d-flex align-items-center">
                  <div className="form-check mt-3">
                    <input className="form-check-input" type="checkbox" name="is_organic" checked={form.is_organic} onChange={handleChange} id="isOrganic" />
                    <label className="form-check-label" htmlFor="isOrganic">{t('products.is_organic', 'Is Organic')}</label>
                  </div>
                </div>

                <div className="col-md-4">
                  <label className="form-label">{t('products.tags', 'Tags (comma separated)')}</label>
                  <input name="tags" value={form.tags} onChange={handleChange} className="form-control" />
                </div>

                <div className="col-12 text-end">
                  <button className="btn btn-secondary me-2" type="button" onClick={() => navigate('/farmer/products')}>{t('common.cancel', 'Cancel')}</button>
                  <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? t('common.saving', 'Saving...') : t('products.save', 'Save Product')}</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductAdd
