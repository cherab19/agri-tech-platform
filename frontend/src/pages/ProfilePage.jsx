import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { authService } from '../services/api/auth'
import { useLanguage } from '../contexts/LanguageContext'
import { FarmerLoading } from '../components/common/LoadingSpinner'
import { notify } from '../components/common/Notification'
import './profile-page.scss'

const ProfilePage = () => {
  const { user, token, updateUser, loading: authLoading } = useAuth()
  const { t } = useLanguage()

  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || user.full_name || '',
        email: user.email || '',
        phone: user.phone || user.phone_number || '',
        address: user.address || ''
      })
    }
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = {
        name: form.name,
        phone: form.phone,
        address: form.address
      }
      const res = await authService.updateProfile(payload, token)
      const data = res && res.data ? res.data : res
      // If backend returns updated user object, merge into context
      const updatedUser = data?.user || data || null
      if (updatedUser) {
        updateUser(updatedUser)
        notify.success(t('message.profile_updated', 'Profile updated successfully!'))
      } else {
        notify.error(t('common.save_failed', 'Failed to save profile'))
      }
    } catch (err) {
      console.error('Profile save failed', err)
      notify.error(t('common.save_failed', 'Failed to save profile'))
    } finally {
      setSaving(false)
    }
  }

  if (authLoading || !user) return <div className="profile-loading"><FarmerLoading /></div>

  return (
    <div className="profile-page container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-header bg-white py-3">
              <h5 className="mb-0">{t('nav.profile', 'Profile')}</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSave}>
                <div className="mb-3">
                  <label className="form-label">{t('profile.name', 'Name')}</label>
                  <input name="name" value={form.name} onChange={handleChange} className="form-control" />
                </div>

                <div className="mb-3">
                  <label className="form-label">{t('profile.email', 'Email')}</label>
                  <input name="email" value={form.email} readOnly className="form-control-plaintext" />
                </div>

                <div className="mb-3">
                  <label className="form-label">{t('profile.phone', 'Phone')}</label>
                  <input name="phone" value={form.phone} onChange={handleChange} className="form-control" />
                </div>

                <div className="mb-3">
                  <label className="form-label">{t('profile.address', 'Address')}</label>
                  <textarea name="address" value={form.address} onChange={handleChange} className="form-control" rows={3} />
                </div>

                <div className="d-flex gap-2">
                  <button className="btn btn-primary" type="submit" disabled={saving}>{saving ? t('common.saving', 'Saving...') : t('common.save', 'Save')}</button>
                  <a className="btn btn-outline-secondary" href={`/${user.role}/dashboard`}>{t('common.back', 'Back')}</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
