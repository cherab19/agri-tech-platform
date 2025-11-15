import React, { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useLanguage } from '../../contexts/LanguageContext'
import { VendorLoading } from '../../components/common/LoadingSpinner'
import { vendorsService } from '../../services/api/vendors'
import { notify } from '../../components/common/Notification'
import './vendor-dashboard.scss'

const VendorSettings = () => {
  const { user, token } = useAuth()
  const { t } = useLanguage()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [profile, setProfile] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    bank_account: '',
    contact_person: ''
  })

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true)
      try {
        const coopId = user?.cooperative_id || user?.cooperativeId || user?.cooperative?.id || user?.id
        if (!coopId) {
          setProfile({})
          return
        }

        const res = await vendorsService.getVendorProfile(coopId, token)
        const data = res && res.data ? res.data : res
        setProfile({
          name: data.name || data.cooperative_name || '',
          phone: data.phone || data.contact_phone || '',
          email: data.email || '',
          address: data.address || '',
          bank_account: data.bank_account || data.payment_details || '',
          contact_person: data.contact_person || data.representative || ''
        })
      } catch (err) {
        console.warn('Failed to load vendor profile', err)
        setProfile({})
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [user, token])

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfile(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = async (e) => {
    e.preventDefault()
    const coopId = user?.cooperative_id || user?.cooperativeId || user?.cooperative?.id || user?.id
    if (!coopId) return notify.error(t('settings.no_coop', 'No cooperative associated with your account'))

    setSaving(true)
    try {
      const payload = {
        cooperative_name: profile.name,
        phone: profile.phone,
        email: profile.email,
        address: profile.address,
        bank_account: profile.bank_account,
        contact_person: profile.contact_person
      }
      await vendorsService.updateVendorProfile(coopId, payload, token)
      notify.success(t('settings.saved', 'Settings saved successfully'))
    } catch (err) {
      console.error('Failed to save vendor profile', err)
      notify.error(t('settings.save_failed', 'Failed to save settings'))
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="vendor-settings-loading"><VendorLoading /></div>

  return (
    <div className="vendor-settings p-4">
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white border-0 py-3">
          <h5 className="fw-bold mb-0">{t('settings.vendor_profile', 'Vendor Profile')}</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSave}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">{t('settings.cooperative_name', 'Cooperative Name')}</label>
                <input name="name" value={profile.name} onChange={handleChange} className="form-control" />
              </div>
              <div className="col-md-6">
                <label className="form-label">{t('settings.contact_person', 'Contact Person')}</label>
                <input name="contact_person" value={profile.contact_person} onChange={handleChange} className="form-control" />
              </div>
              <div className="col-md-4">
                <label className="form-label">{t('settings.phone', 'Phone')}</label>
                <input name="phone" value={profile.phone} onChange={handleChange} className="form-control" />
              </div>
              <div className="col-md-4">
                <label className="form-label">{t('settings.email', 'Email')}</label>
                <input name="email" value={profile.email} onChange={handleChange} className="form-control" />
              </div>
              <div className="col-md-4">
                <label className="form-label">{t('settings.bank_account', 'Bank Account')}</label>
                <input name="bank_account" value={profile.bank_account} onChange={handleChange} className="form-control" />
              </div>
              <div className="col-12">
                <label className="form-label">{t('settings.address', 'Address')}</label>
                <input name="address" value={profile.address} onChange={handleChange} className="form-control" />
              </div>

              <div className="col-12 text-end">
                <button className="btn btn-secondary me-2" type="button" onClick={() => window.location.href = '/vendor/dashboard'}>{t('common.cancel', 'Cancel')}</button>
                <button className="btn btn-primary" type="submit" disabled={saving}>{saving ? t('common.saving', 'Saving...') : t('settings.save', 'Save Changes')}</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default VendorSettings
