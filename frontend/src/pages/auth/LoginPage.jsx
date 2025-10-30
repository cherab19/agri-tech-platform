import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import { useLanguage } from '../../../contexts/LanguageContext'
import LoginForm from '../../components/common/Auth/LoginForm'
import './auth-pages.scss'

const LoginPage = () => {
  const { user, isAuthenticated } = useAuth()
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [selectedRole, setSelectedRole] = useState('farmer')

  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated && user) {
      switch (user.role) {
        case 'farmer':
          navigate('/farmer/dashboard')
          break
        case 'vendor':
          navigate('/vendor/dashboard')
          break
        case 'driver':
          navigate('/driver/dashboard')
          break
        case 'admin':
          navigate('/admin/dashboard')
          break
        default:
          navigate('/')
      }
    }

    // Check for role parameter in URL
    const roleParam = searchParams.get('role')
    if (roleParam && ['farmer', 'vendor', 'driver', 'admin'].includes(roleParam)) {
      setSelectedRole(roleParam)
    }
  }, [isAuthenticated, user, navigate, searchParams])

  const roleBenefits = {
    farmer: [
      t('login.farmer_benefit1', 'Sell your produce directly to vendors'),
      t('login.farmer_benefit2', 'Get fair prices for your crops'),
      t('login.farmer_benefit3', 'Reduce post-harvest losses'),
      t('login.farmer_benefit4', 'Access market insights and analytics')
    ],
    vendor: [
      t('login.vendor_benefit1', 'Source fresh produce directly from farmers'),
      t('login.vendor_benefit2', 'Get competitive wholesale prices'),
      t('login.vendor_benefit3', 'Reliable and timely deliveries'),
      t('login.vendor_benefit4', 'Quality assurance and support')
    ],
    driver: [
      t('login.driver_benefit1', 'Regular delivery assignments'),
      t('login.driver_benefit2', 'Fair compensation and timely payments'),
      t('login.driver_benefit3', 'Flexible working schedule'),
      t('login.driver_benefit4', 'Route optimization and support')
    ],
    admin: [
      t('login.admin_benefit1', 'Manage platform operations'),
      t('login.admin_benefit2', 'Monitor transactions and analytics'),
      t('login.admin_benefit3', 'User management and support'),
      t('login.admin_benefit4', 'System configuration and reporting')
    ]
  }

  const roleDescriptions = {
    farmer: t('login.farmer_desc', 'Farmers and agricultural cooperatives who want to sell their produce directly to vendors.'),
    vendor: t('login.vendor_desc', 'Vendors, retailers, and businesses who want to source fresh agricultural products.'),
    driver: t('login.driver_desc', 'Truck drivers and logistics providers who want to participate in our delivery network.'),
    admin: t('login.admin_desc', 'Platform administrators and system staff who manage operations.')
  }

  return (
    <div className="login-page">
      <div className="container-fluid">
        <div className="row min-vh-100">
          {/* Left Side - Benefits Section */}
          <div className="col-lg-6 d-none d-lg-block benefits-side">
            <div className="benefits-container">
              <div className="benefits-content">
                {/* Logo and Title */}
                <div className="text-center mb-5">
                  <img 
                    src="/icons/farmer-icon.svg" 
                    alt="Agar Agritech"
                    width="80"
                    height="80"
                    className="mb-3"
                  />
                  <h2 className="text-white fw-bold">
                    {t('login.welcome_back', 'Welcome Back')}
                  </h2>
                  <p className="text-white opacity-75">
                    {t('login.join_agricultural_revolution', 'Join the agricultural revolution in Ethiopia')}
                  </p>
                </div>

                {/* Role Selection */}
                <div className="role-selection mb-4">
                  <label className="form-label text-white fw-semibold mb-3">
                    {t('login.i_am_a', 'I am a:')}
                  </label>
                  <div className="row g-2">
                    {['farmer', 'vendor', 'driver', 'admin'].map((role) => (
                      <div key={role} className="col-6">
                        <button
                          className={`role-btn w-100 text-start p-3 rounded ${
                            selectedRole === role ? 'active' : ''
                          }`}
                          onClick={() => setSelectedRole(role)}
                        >
                          <div className="d-flex align-items-center">
                            <div className="role-icon me-2">
                              <i className={`fas fa-${
                                role === 'farmer' ? 'tractor' :
                                role === 'vendor' ? 'store' :
                                role === 'driver' ? 'truck' : 'cogs'
                              }`}></i>
                            </div>
                            <div>
                              <div className="fw-semibold">
                                {t(`login.${role}`, role.charAt(0).toUpperCase() + role.slice(1))}
                              </div>
                              <small className="opacity-75">
                                {t(`login.${role}_short`, role)}
                              </small>
                            </div>
                          </div>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Role Description */}
                <div className="role-description mb-4">
                  <p className="text-white opacity-85">
                    {roleDescriptions[selectedRole]}
                  </p>
                </div>

                {/* Benefits List */}
                <div className="benefits-list">
                  <h6 className="text-white fw-semibold mb-3">
                    {t('login.benefits', 'Benefits:')}
                  </h6>
                  <ul className="list-unstyled">
                    {roleBenefits[selectedRole].map((benefit, index) => (
                      <li key={index} className="benefit-item text-white opacity-85 mb-2">
                        <i className="fas fa-check-circle text-success me-2"></i>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stats */}
                <div className="stats mt-5 pt-4 border-top border-white border-opacity-25">
                  <div className="row text-center">
                    <div className="col-4">
                      <div className="stat-number text-white fw-bold h5">500+</div>
                      <div className="stat-label text-white opacity-75 small">
                        {t('login.farmers', 'Farmers')}
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="stat-number text-white fw-bold h5">1.2K+</div>
                      <div className="stat-label text-white opacity-75 small">
                        {t('login.vendors', 'Vendors')}
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="stat-number text-white fw-bold h5">15K+</div>
                      <div className="stat-label text-white opacity-75 small">
                        {t('login.deliveries', 'Deliveries')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="col-lg-6 form-side">
            <div className="form-container">
              <div className="form-content">
                {/* Mobile Logo */}
                <div className="d-lg-none text-center mb-4">
                  <img 
                    src="/icons/farmer-icon.svg" 
                    alt="Agar Agritech"
                    width="60"
                    height="60"
                    className="mb-2"
                  />
                  <h4 className="fw-bold text-dark">
                    {t('app.name', 'Agar Agritech')}
                  </h4>
                </div>

                {/* Login Form */}
                <div className="login-form-wrapper">
                  <LoginForm />
                </div>

                {/* Additional Links */}
                <div className="additional-links text-center mt-4">
                  <p className="text-muted mb-2">
                    {t('login.no_account', "Don't have an account?")}{' '}
                    <a href="/register" className="text-primary text-decoration-none fw-semibold">
                      {t('login.sign_up', 'Sign up')}
                    </a>
                  </p>
                  <p className="small text-muted">
                    {t('login.need_help', 'Need help?')}{' '}
                    <a href="/contact" className="text-muted text-decoration-none">
                      {t('login.contact_support', 'Contact support')}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage