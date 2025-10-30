import React from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import './hero-section.scss'

const HeroSection = () => {
  const { t } = useLanguage()

  const features = [
    {
      icon: 'fas fa-seedling',
      title: t('hero.fresh_produce', 'Fresh Produce'),
      description: t('hero.fresh_produce_desc', 'Direct from farm to market')
    },
    {
      icon: 'fas fa-truck',
      title: t('hero.direct_delivery', 'Direct Delivery'),
      description: t('hero.direct_delivery_desc', 'No warehouses, faster delivery')
    },
    {
      icon: 'fas fa-hand-holding-usd',
      title: t('hero.fair_prices', 'Fair Prices'),
      description: t('hero.fair_prices_desc', 'Better prices for farmers and vendors')
    },
    {
      icon: 'fas fa-mobile-alt',
      title: t('hero.digital_payments', 'Digital Payments'),
      description: t('hero.digital_payments_desc', 'Secure TeleBirr payments')
    }
  ]

  return (
    <section className="hero-section position-relative overflow-hidden">
      {/* Background with gradient and pattern */}
      <div className="hero-background">
        <div className="hero-gradient"></div>
        <div className="hero-pattern"></div>
      </div>

      <div className="container">
        <div className="row align-items-center min-vh-100 py-5">
          {/* Left Column - Content */}
          <div className="col-lg-6 col-md-8">
            <div className="hero-content text-white">
              {/* Badge */}
              <div className="hero-badge mb-3">
                <span className="badge bg-light text-primary px-3 py-2 fw-medium">
                  <i className="fas fa-leaf me-2"></i>
                  {t('hero.ethiopian_agritech', 'Ethiopian Agritech Platform')}
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="hero-title display-4 fw-bold mb-4">
                {t('hero.title', 'Connecting Farmers and Vendors Directly')}
              </h1>

              {/* Subtitle */}
              <p className="hero-subtitle lead mb-5 opacity-75">
                {t('hero.subtitle', 'Fresh produce, direct delivery, fair prices. Join the digital agricultural revolution in Ethiopia.')}
              </p>

              {/* CTA Buttons */}
              <div className="hero-actions d-flex flex-wrap gap-3 mb-5">
                <a 
                  href="/login" 
                  className="btn btn-primary btn-lg px-4 py-3 fw-semibold"
                >
                  <i className="fas fa-rocket me-2"></i>
                  {t('hero.get_started', 'Get Started')}
                </a>
                <a 
                  href="/how-it-works" 
                  className="btn btn-outline-light btn-lg px-4 py-3 fw-semibold"
                >
                  <i className="fas fa-play-circle me-2"></i>
                  {t('hero.see_how_it_works', 'See How It Works')}
                </a>
              </div>

              {/* Stats */}
              <div className="hero-stats row text-center">
                <div className="col-4">
                  <div className="stat-number h4 fw-bold mb-1">500+</div>
                  <div className="stat-label small opacity-75">
                    {t('hero.farmers', 'Farmers')}
                  </div>
                </div>
                <div className="col-4">
                  <div className="stat-number h4 fw-bold mb-1">1,200+</div>
                  <div className="stat-label small opacity-75">
                    {t('hero.vendors', 'Vendors')}
                  </div>
                </div>
                <div className="col-4">
                  <div className="stat-number h4 fw-bold mb-1">15K+</div>
                  <div className="stat-label small opacity-75">
                    {t('hero.deliveries', 'Deliveries')}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Features Grid */}
          <div className="col-lg-6 col-md-4">
            <div className="hero-features">
              <div className="row g-4">
                {features.map((feature, index) => (
                  <div key={index} className="col-6">
                    <div className="feature-card text-center p-4 rounded-3">
                      <div className="feature-icon mb-3">
                        <i className={`${feature.icon} text-primary`}></i>
                      </div>
                      <h6 className="feature-title fw-semibold mb-2">
                        {feature.title}
                      </h6>
                      <p className="feature-desc small text-muted mb-0">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator position-absolute bottom-0 start-50 translate-middle-x mb-4">
        <div className="scroll-arrow"></div>
      </div>
    </section>
  )
}

export default HeroSection