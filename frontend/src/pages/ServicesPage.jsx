import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import ServicesSection from '../components/landing/ServicesSection'
import './services-page.scss'

const ServicesPage = () => {
  const { t } = useLanguage()

  const serviceDetails = {
    farmers: {
      title: t('services.for_farmers', 'Services for Farmers'),
      icon: 'fas fa-tractor',
      features: [
        t('services.farmer_feature1', 'Easy product listing and management'),
        t('services.farmer_feature2', 'Direct access to vendor network'),
        t('services.farmer_feature3', 'Fair pricing and instant payments'),
        t('services.farmer_feature4', 'Inventory tracking and analytics'),
        t('services.farmer_feature5', 'Delivery coordination'),
        t('services.farmer_feature6', 'Market insights and trends')
      ],
      benefits: [
        t('services.farmer_benefit1', 'Increase income by 30% on average'),
        t('services.farmer_benefit2', 'Reduce post-harvest losses'),
        t('services.farmer_benefit3', 'Access to larger markets'),
        t('services.farmer_benefit4', 'Stable and predictable income')
      ]
    },
    vendors: {
      title: t('services.for_vendors', 'Services for Vendors'),
      icon: 'fas fa-store',
      features: [
        t('services.vendor_feature1', 'Wide selection of fresh produce'),
        t('services.vendor_feature2', 'Direct sourcing from farmers'),
        t('services.vendor_feature3', 'Competitive wholesale prices'),
        t('services.vendor_feature4', 'Reliable delivery service'),
        t('services.vendor_feature5', 'Quality assurance'),
        t('services.vendor_feature6', 'Order tracking and management')
      ],
      benefits: [
        t('services.vendor_benefit1', 'Save 20-30% on procurement costs'),
        t('services.vendor_benefit2', 'Fresher products for customers'),
        t('services.vendor_benefit3', 'Reduced inventory risks'),
        t('services.vendor_benefit4', 'Streamlined supply chain')
      ]
    },
    drivers: {
      title: t('services.for_drivers', 'Services for Drivers'),
      icon: 'fas fa-truck',
      features: [
        t('services.driver_feature1', 'Regular delivery assignments'),
        t('services.driver_feature2', 'Route optimization'),
        t('services.driver_feature3', 'Real-time navigation'),
        t('services.driver_feature4', 'Secure payment processing'),
        t('services.driver_feature5', 'Customer rating system'),
        t('services.driver_feature6', 'Support and assistance')
      ],
      benefits: [
        t('services.driver_benefit1', 'Steady income opportunities'),
        t('services.driver_benefit2', 'Flexible working hours'),
        t('services.driver_benefit3', 'Reduced empty return trips'),
        t('services.driver_benefit4', 'Professional growth')
      ]
    }
  }

  return (
    <div className="services-page">
      {/* Page Header */}
      <section className="page-header bg-primary text-white py-5">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <h1 className="display-4 fw-bold mb-3">
                {t('services.our_services', 'Our Services')}
              </h1>
              <p className="lead mb-0 opacity-75">
                {t('services.page_subtitle', 'Comprehensive solutions designed for farmers, vendors, and drivers in the agricultural supply chain')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Services Content */}
      <ServicesSection />

      {/* Detailed Services by Role */}
      <section className="detailed-services py-5 bg-light">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-10 text-center">
              <h2 className="fw-bold mb-3">
                {t('services.detailed_services', 'Detailed Services by Role')}
              </h2>
              <p className="lead text-muted">
                {t('services.detailed_description', 'Tailored solutions to meet the unique needs of each stakeholder in the agricultural ecosystem')}
              </p>
            </div>
          </div>

          <div className="row g-4">
            {Object.entries(serviceDetails).map(([role, details]) => (
              <div key={role} className="col-lg-4 col-md-6">
                <div className="role-service-card h-100">
                  <div className="card-header text-center py-4">
                    <div className="role-icon mb-3">
                      <i className={`${details.icon} text-primary`}></i>
                    </div>
                    <h3 className="role-title fw-bold h4">
                      {details.title}
                    </h3>
                  </div>
                  <div className="card-body">
                    {/* Features */}
                    <div className="features-section mb-4">
                      <h5 className="section-title fw-semibold mb-3">
                        {t('services.features', 'Features')}
                      </h5>
                      <ul className="features-list list-unstyled">
                        {details.features.map((feature, index) => (
                          <li key={index} className="feature-item mb-2">
                            <i className="fas fa-check-circle text-success me-2"></i>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Benefits */}
                    <div className="benefits-section">
                      <h5 className="section-title fw-semibold mb-3">
                        {t('services.benefits', 'Benefits')}
                      </h5>
                      <ul className="benefits-list list-unstyled">
                        {details.benefits.map((benefit, index) => (
                          <li key={index} className="benefit-item mb-2">
                            <i className="fas fa-chart-line text-primary me-2"></i>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="card-footer text-center border-0 bg-transparent">
                    <a 
                      href={`/login?role=${role}`}
                      className="btn btn-primary px-4"
                    >
                      <i className="fas fa-rocket me-2"></i>
                      {t('services.get_started', 'Get Started')}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="integration-section py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h2 className="fw-bold mb-4">
                {t('services.seamless_integration', 'Seamless Integration')}
              </h2>
              <p className="lead text-muted mb-4">
                {t('services.integration_description', 'Our platform integrates with popular tools and services to provide a complete agricultural solution:')}
              </p>
              <ul className="integration-list list-unstyled">
                <li className="integration-item mb-3">
                  <i className="fas fa-mobile-alt text-primary me-3"></i>
                  <strong>TeleBirr Payments</strong> - Secure digital payments
                </li>
                <li className="integration-item mb-3">
                  <i className="fas fa-sms text-primary me-3"></i>
                  <strong>SMS Notifications</strong> - Real-time order updates
                </li>
                <li className="integration-item mb-3">
                  <i className="fas fa-map-marked-alt text-primary me-3"></i>
                  <strong>GPS Tracking</strong> - Live delivery tracking
                </li>
                <li className="integration-item">
                  <i className="fas fa-chart-bar text-primary me-3"></i>
                  <strong>Analytics Dashboard</strong> - Business insights
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ServicesPage