import React, { useState } from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import { useLanguage } from '../../../contexts/LanguageContext'

const LoginForm = () => {
  const { login, loading } = useAuth()
  const { t } = useLanguage()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'farmer'
  })
  const [error, setError] = useState('')

  const userTypes = [
    { value: 'farmer', label: t('auth.farmer', 'Farmer Cooperative'), icon: 'fas fa-tractor' },
    { value: 'vendor', label: t('auth.vendor', 'Vendor Cooperative'), icon: 'fas fa-store' },
    { value: 'driver', label: t('auth.driver', 'Truck Driver'), icon: 'fas fa-truck' },
    { value: 'admin', label: t('auth.admin', 'System Admin'), icon: 'fas fa-cogs' }
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Basic validation
    if (!formData.email || !formData.password) {
      setError(t('auth.fill_all_fields', 'Please fill in all fields'))
      return
    }

    const result = await login(formData.email, formData.password, formData.userType)
    
    if (!result.success) {
      setError(result.error)
    }
  }

  return (
    <div className="login-form-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="text-center mb-4">
          <h3 className="fw-bold agri-text-primary">
            {t('auth.welcome_back', 'Welcome Back')}
          </h3>
          <p className="text-muted">
            {t('auth.sign_in_to_continue', 'Sign in to your account to continue')}
          </p>
        </div>

        {error && (
          <div className="alert alert-danger d-flex align-items-center" role="alert">
            <i className="fas fa-exclamation-triangle me-2"></i>
            {error}
          </div>
        )}

        {/* User Type Selection */}
        <div className="mb-4">
          <label className="form-label fw-semibold">
            {t('auth.i_am_a', 'I am a')}
          </label>
          <div className="row g-2">
            {userTypes.map((type) => (
              <div key={type.value} className="col-6">
                <input
                  type="radio"
                  className="btn-check"
                  name="userType"
                  id={`userType-${type.value}`}
                  value={type.value}
                  checked={formData.userType === type.value}
                  onChange={handleChange}
                />
                <label 
                  className="btn btn-outline-primary w-100 d-flex flex-column align-items-center py-3"
                  htmlFor={`userType-${type.value}`}
                >
                  <i className={`${type.icon} mb-2 fs-5`}></i>
                  <span className="small">{type.label}</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Email Field */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            {t('auth.email', 'Email Address')}
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="fas fa-envelope"></i>
            </span>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t('auth.enter_email', 'Enter your email')}
              disabled={loading}
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label htmlFor="password" className="form-label">
            {t('auth.password', 'Password')}
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="fas fa-lock"></i>
            </span>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={t('auth.enter_password', 'Enter your password')}
              disabled={loading}
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary w-100 py-2 fw-semibold"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status"></span>
              {t('auth.signing_in', 'Signing in...')}
            </>
          ) : (
            <>
              <i className="fas fa-sign-in-alt me-2"></i>
              {t('auth.sign_in', 'Sign In')}
            </>
          )}
        </button>

        {/* Help Links */}
        <div className="text-center mt-3">
          <a href="/forgot-password" className="text-decoration-none small">
            {t('auth.forgot_password', 'Forgot your password?')}
          </a>
        </div>
      </form>
    </div>
  )
}

export default LoginForm