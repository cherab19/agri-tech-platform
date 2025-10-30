import React from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { ListIcon, CartIcon, MobileIcon, TruckIcon, ChartIcon, CommentsIcon } from '../common/Icons'
import './services-section.scss'

const ServicesSection = () => {
  const { t } = useLanguage()

  const services = [
    {
      icon: ListIcon,
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
      icon: CartIcon,
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
      icon: MobileIcon,
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
      icon: TruckIcon,
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
      icon: ChartIcon,
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
      icon: CommentsIcon,
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
                        {(() => {
                          const Icon = service.icon
                          return typeof Icon === 'function' ? <Icon /> : <i className={Icon}></i>
                        })()}
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
      </div>
    </section>
  )
}

export default ServicesSection