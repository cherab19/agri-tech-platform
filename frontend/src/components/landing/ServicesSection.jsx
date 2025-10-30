import React from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import './services-section.scss'

const ServicesSection = () => {
  const { t } = useLanguage()

  const services = [
    {
      icon: 'fas fa-list-alt',
      title: t('services.product_listing', 'Product Listing'),
      description: t('services.product_listing_desc', 'Farmers can easily list their produce with detailed information, prices, and availability.'),
      features: [
        t('services.listing_feature1', 'Easy product upload'),
        t('services.listing_feature2', 'Inventory management'),
        t('services.listing_feature3', 'Price setting tools'),
        t('services.listing_feature4', 'Availability tracking')
      ],
      color: 'success'
    },
    {
      icon: 'fas fa-shopping-cart',
      title: t('services.marketplace', 'Digital Marketplace'),
      description: t('services.marketplace_desc', 'Vendors can browse, search, and order fresh produce directly from farmers.'),
      features: [
        t('services.marketplace_feature1', 'Product search & filters'),
        t('services.marketplace_feature2', 'Real-time availability'),
        t('services.marketplace_feature3', 'Shopping cart'),
        t('services.marketplace_feature4', 'Order history')
      ],
      color: 'primary'
    },
    {
      icon: 'fas fa-mobile-alt',
      title: t('services.digital_payments', 'Digital Payments'),
      description: t('services.digital_payments_desc', 'Secure TeleBirr integration for instant payments and automated settlements.'),
      features: [
        t('services.payment_feature1', 'TeleBirr integration'),
        t('services.payment_feature2', 'Instant payment processing'),
        t('services.payment_feature3', 'Automated settlements'),
        t('services.payment_feature4', 'Transaction history')
      ],
      color: 'info'
    },
    {
      icon: 'fas fa-truck',
      title: t('services.logistics', 'Smart Logistics'),
      description: t('services.logistics_desc', 'Efficient delivery system connecting farmers directly to vendors with real-time tracking.'),
      features: [
        t('services.logistics_feature1', 'Driver assignment'),
        t('services.logistics_feature2', 'Route optimization'),
        t('services.logistics_feature3', 'Real-time tracking'),
        t('services.logistics_feature4', 'Delivery status updates')
      ],
      color: 'warning'
    },
    {
      icon: 'fas fa-chart-line',
      title: t('services.analytics', 'Analytics & Reports'),
      description: t('services.analytics_desc', 'Comprehensive analytics and reporting tools for farmers, vendors, and administrators.'),
      features: [
        t('services.analytics_feature1', 'Sales analytics'),
        t('services.analytics_feature2', 'Performance metrics'),
        t('services.analytics_feature3', 'Financial reports'),
        t('services.analytics_feature4', 'Market insights')
      ],
      color: 'dark'
    },
    {
      icon: 'fas fa-comments',
      title: t('services.communication', 'Communication Tools'),
      description: t('services.communication_desc', 'Built-in messaging and notification system with SMS integration for updates.'),
      features: [
        t('services.communication_feature1', 'In-app messaging'),
        t('services.communication_feature2', 'SMS notifications'),
        t('services.communication_feature3', 'Order updates'),
        t('services.communication_feature4', 'Support system')
      ],
      color: 'secondary'
    }
  ]

  const pricingPlans = [
    {
      name: t('services.free_plan', 'Free'),
      price: '0',
      period: t('services.forever', 'forever'),
      description: t('services.free_plan_desc', 'Basic features for individual farmers and small vendors'),
      features: [
        t('services.free_feature1', 'Up to 10 product listings'),
        t('services.free_feature2', 'Basic order management'),
        t('services.free_feature3', 'Standard support'),
        t('services.free_feature4', 'Community access')
      ],
      buttonText: t('services.get_started', 'Get Started'),
      popular: false
    },
    {
      name: t('services.pro_plan', 'Pro'),
      price: '299',
      period: t('services.per_month', '/month'),
      description: t('services.pro_plan_desc', 'Advanced features for cooperatives and growing businesses'),
      features: [
        t('services.pro_feature1', 'Unlimited product listings'),
        t('services.pro_feature2', 'Advanced analytics'),
        t('services.pro_feature3', 'Priority support'),
        t('services.pro_feature4', 'Custom reporting'),
        t('services.pro_feature5', 'API access')
      ],
      buttonText: t('services.go_pro', 'Go Pro'),
      popular: true
    },
    {
      name: t('services.enterprise_plan', 'Enterprise'),
      price: 'Custom',
      period: '',
      description: t('services.enterprise_plan_desc', 'Custom solutions for large cooperatives and organizations'),
      features: [
        t('services.enterprise_feature1', 'Custom integrations'),
        t('services.enterprise_feature2', 'Dedicated account manager'),
        t('services.enterprise_feature3', 'White-label solutions'),
        t('services.enterprise_feature4', 'Advanced security'),
        t('services.enterprise_feature5', 'SLA guarantee')
      ],
      buttonText: t('services.contact_sales', 'Contact Sales'),
      popular: false
    }
  ]

  return (
    <section className="services-section py-5">
      <div className="container">
        {/* Section Header */}
        <div className="row justify-content-center text-center mb-5">
          <div className="col-lg-8">
            <h2 className="section-title fw-bold mb-3">
              {t('services.our_services', 'Our Services')}
            </h2>
            <p className="section-subtitle lead text-muted">
              {t('services.services_description', 'Comprehensive agri-tech solutions designed to streamline the entire agricultural supply chain in Ethiopia.')}
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="row mb-5">
          <div className="col-12">
            <div className="row g-4">
              {services.map((service, index) => (
                <div key={index} className="col-lg-4 col-md-6">
                  <div className="service-card h-100">
                    <div className="service-header mb-3">
                      <div className={`service-icon bg-${service.color}-subtle text-${service.color} rounded-circle d-inline-flex align-items-center justify-content-center`}>
                        <i className={service.icon}></i>
                      </div>
                      <h4 className="service-title fw-semibold mt-3">
                        {service.title}
                      </h4>
                    </div>
                    <p className="service-desc text-muted mb-4">
                      {service.description}
                    </p>
                    <ul className="service-features list-unstyled">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="feature-item mb-2">
                          <i className="fas fa-check text-success me-2"></i>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="row">
          <div className="col-12">
            <div className="text-center mb-5">
              <h3 className="fw-bold mb-3">
                {t('services.simple_pricing', 'Simple, Transparent Pricing')}
              </h3>
              <p className="text-muted">
                {t('services.pricing_description', 'Choose the plan that works best for your agricultural business')}
              </p>
            </div>

            <div className="row justify-content-center">
              {pricingPlans.map((plan, index) => (
                <div key={index} className="col-lg-4 col-md-6 mb-4">
                  <div className={`pricing-card card h-100 border-0 ${plan.popular ? 'popular' : ''}`}>
                    {plan.popular && (
                      <div className="popular-badge bg-primary text-white text-center py-1">
                        {t('services.most_popular', 'Most Popular')}
                      </div>
                    )}
                    <div className="card-body p-4">
                      <div className="text-center mb-4">
                        <h4 className="plan-name fw-bold mb-2">
                          {plan.name}
                        </h4>
                        <div className="plan-price mb-2">
                          <span className="h1 fw-bold text-dark">
                            {plan.price}
                          </span>
                          {plan.period && (
                            <span className="text-muted">/{plan.period}</span>
                          )}
                        </div>
                        <p className="plan-desc text-muted small">
                          {plan.description}
                        </p>
                      </div>
                      <ul className="plan-features list-unstyled mb-4">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="feature-item mb-2">
                            <i className="fas fa-check text-success me-2"></i>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <button className={`btn w-100 py-2 fw-semibold ${plan.popular ? 'btn-primary' : 'btn-outline-primary'}`}>
                        {plan.buttonText}
                      </button>
                    </div>
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

export default ServicesSection