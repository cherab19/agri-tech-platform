import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useLanguage } from '../../contexts/LanguageContext'
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
        <div className="row min-vh-100 justify-content-center">
          {/* Centered Login Form */}
          <div className="col-lg-8 col-xl-6 form-side">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage