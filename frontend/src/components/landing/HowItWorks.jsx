import React from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import './how-it-works.scss'

const HowItWorks = () => {
  const { t } = useLanguage()

  const steps = [
    {
      number: 1,
      icon: 'fas fa-seedling',
      title: t('how_it_works.farmers_list', 'Farmers List Produce'),
      description: t('how_it_works.farmers_list_desc', 'Farmers cooperatives list their fresh produce with prices and quantities on the platform.'),
      role: 'farmer',
      color: 'success'
    },
    {
      number: 2,
      icon: 'fas fa-shopping-cart',
      title: t('how_it_works.vendors_browse', 'Vendors Browse & Order'),
      description: t('how_it_works.vendors_browse_desc', 'Vendors browse available products, add to cart, and place orders with instant TeleBirr payment.'),
      role: 'vendor',
      color: 'primary'
    },
    {
      number: 3,
      icon: 'fas fa-truck',
      title: t('how_it_works.driver_assignment', 'Driver Assignment & Pickup'),
      description: t('how_it_works.driver_assignment_desc', 'System assigns available truck drivers who pick up goods directly from farmers.'),
      role: 'driver',
      color: 'warning'
    },
    {
      number: 4,
      icon: 'fas fa-map-marker-alt',
      title: t('how_it_works.direct_delivery', 'Direct Delivery'),
      description: t('how_it_works.direct_delivery_desc', 'Drivers deliver goods directly to vendors with real-time tracking and status updates.'),
      role: 'driver',
      color: 'info'
    },
    {
      number: 5,
      icon: 'fas fa-hand-holding-usd',
      title: t('how_it_works.automatic_settlement', 'Automatic Settlement'),
      description: t('how_it_works.automatic_settlement_desc', 'Platform automatically calculates commissions and disburses payments to farmers and drivers.'),
      role: 'admin',
      color: 'dark'
    }
  ]

  const userTypes = [
    {
      role: 'farmer',
      icon: 'fas fa-tractor',
      title: t('how_it_works.for_farmers', 'For Farmers'),
      benefits: [
        t('how_it_works.farmer_benefit1', 'Direct market access'),
        t('how_it_works.farmer_benefit2', 'Fair prices for produce'),
        t('how_it_works.farmer_benefit3', 'Regular payment settlements'),
        t('how_it_works.farmer_benefit4', 'Reduced post-harvest losses')
      ]
    },
    {
      role: 'vendor',
      icon: 'fas fa-store',
      title: t('how_it_works.for_vendors', 'For Vendors'),
      benefits: [
        t('how_it_works.vendor_benefit1', 'Fresh produce direct from farms'),
        t('how_it_works.vendor_benefit2', 'Competitive prices'),
        t('how_it_works.vendor_benefit3', 'Reliable delivery service'),
        t('how_it_works.vendor_benefit4', 'Quality assurance')
      ]
    },
    {
      role: 'driver',
      icon: 'fas fa-truck',
      title: t('how_it_works.for_drivers', 'For Drivers'),
      benefits: [
        t('how_it_works.driver_benefit1', 'Regular delivery assignments'),
        t('how_it_works.driver_benefit2', 'Fair compensation'),
        t('how_it_works.driver_benefit3', 'Flexible scheduling'),
        t('how_it_works.driver_benefit4', 'Payment protection')
      ]
    }
  ]

  return (
    <section className="how-it-works-section py-5 bg-light">
      <div className="container">
        {/* Section Header */}
        <div className="row justify-content-center text-center mb-5">
          <div className="col-lg-8">
            <p className="section-subtitle lead text-muted">
              {t('how_it_works.process_description', 'A simple, efficient process that connects farmers directly with vendors through our digital platform.')}
            </p>
          </div>
        </div>

        {/* Process Steps */}
        <div className="row mb-5">
          <div className="col-12">
            <div className="process-steps">
              {steps.map((step, index) => (
                <div key={index} className="process-step position-relative">
                  {/* Connecting Line */}
                  {index < steps.length - 1 && (
                    <div className="step-connector"></div>
                  )}
                  
                  <div className="step-content text-center">
                    {/* Step Number */}
                    <div className={`step-number bg-${step.color} text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3`}>
                      {step.number}
                    </div>
                    
                    {/* Step Icon */}
                    <div className="step-icon mb-3">
                      <i className={`${step.icon} text-${step.color}`}></i>
                    </div>
                    
                    {/* Step Content */}
                    <h5 className="step-title fw-semibold mb-2">
                      {step.title}
                    </h5>
                    <p className="step-desc text-muted small mb-0">
                      {step.description}
                    </p>
                    
                    {/* Role Badge */}
                    <div className="step-role mt-2">
                      <span className={`badge bg-${step.color}-subtle text-${step.color} small`}>
                        {step.role.charAt(0).toUpperCase() + step.role.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* User Type Benefits */}
        <div className="row">
          <div className="col-12">
            <h3 className="text-center fw-bold mb-5">
              {t('how_it_works.benefits_by_role', 'Benefits for Each Role')}
            </h3>
            <div className="row g-4">
              {userTypes.map((userType, index) => (
                <div key={index} className="col-lg-4 col-md-6">
                  <div className="user-type-card text-center p-4 h-100">
                    <div className="user-type-icon mb-3">
                      <i className={`${userType.icon} text-primary`}></i>
                    </div>
                    <h4 className="user-type-title fw-semibold mb-4">
                      {userType.title}
                    </h4>
                    <ul className="benefits-list list-unstyled">
                      {userType.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="benefit-item mb-2">
                          <i className="fas fa-check text-success me-2"></i>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                    <a 
                      href={`/login?role=${userType.role}`}
                      className="btn btn-outline-primary mt-3"
                    >
                      {t('how_it_works.get_started', 'Get Started')}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks