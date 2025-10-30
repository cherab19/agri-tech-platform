import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import ContactSection from '../components/landing/ContactSection'
import './contact-page.scss'

const ContactPage = () => {
  const { t } = useLanguage()

  const regionalOffices = [
    {
      region: t('contact.addis_ababa', 'Addis Ababa'),
      address: t('contact.addis_address', 'Bole Road, Next to Friendship City Center'),
      phone: '+251 911 234 567',
      email: 'addis@agaragritech.com',
      hours: t('contact.standard_hours', 'Mon - Fri: 8:00 AM - 6:00 PM')
    },
    {
      region: t('contact.oromia', 'Oromia Region'),
      address: t('contact.oromia_address', 'Adama, Main Street, Near Commercial Bank'),
      phone: '+251 922 345 678',
      email: 'oromia@agaragritech.com',
      hours: t('contact.standard_hours', 'Mon - Fri: 8:00 AM - 6:00 PM')
    },
    {
      region: t('contact.amhara', 'Amhara Region'),
      address: t('contact.amhara_address', 'Bahir Dar, Lake Tana Road'),
      phone: '+251 933 456 789',
      email: 'amhara@agaragritech.com',
      hours: t('contact.standard_hours', 'Mon - Fri: 8:00 AM - 6:00 PM')
    },
    {
      region: t('contact.snnpr', 'SNNPR Region'),
      address: t('contact.snnpr_address', 'Hawassa, Main Highway'),
      phone: '+251 944 567 890',
      email: 'snnpr@agaragritech.com',
      hours: t('contact.standard_hours', 'Mon - Fri: 8:00 AM - 6:00 PM')
    }
  ]

  const supportCategories = [
    {
      category: t('contact.farmer_support', 'Farmer Support'),
      description: t('contact.farmer_support_desc', 'Help with product listing, payments, and delivery coordination'),
      email: 'farmers@agaragritech.com',
      phone: '+251 911 234 568'
    },
    {
      category: t('contact.vendor_support', 'Vendor Support'),
      description: t('contact.vendor_support_desc', 'Assistance with ordering, payments, and account management'),
      email: 'vendors@agaragritech.com',
      phone: '+251 911 234 569'
    },
    {
      category: t('contact.driver_support', 'Driver Support'),
      description: t('contact.driver_support_desc', 'Help with delivery assignments, payments, and app usage'),
      email: 'drivers@agaragritech.com',
      phone: '+251 911 234 570'
    },
    {
      category: t('contact.technical_support', 'Technical Support'),
      description: t('contact.technical_support_desc', 'Technical issues, bug reports, and feature requests'),
      email: 'tech@agaragritech.com',
      phone: '+251 911 234 571'
    }
  ]

  return (
    <div className="contact-page">
      {/* Page Header */}
      <section className="page-header bg-primary text-white py-5">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <h1 className="display-4 fw-bold mb-3">
                {t('contact.contact_us', 'Contact Us')}
              </h1>
              <p className="lead mb-0 opacity-75">
                {t('contact.page_subtitle', 'Get in touch with our team. We\'re here to help farmers, vendors, and drivers succeed.')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Contact Content */}
      <ContactSection />

      {/* Regional Offices */}
      <section className="regional-offices py-5 bg-light">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 text-center">
              <h2 className="fw-bold mb-3">
                {t('contact.regional_offices', 'Regional Offices')}
              </h2>
              <p className="lead text-muted">
                {t('contact.regional_description', 'We have offices across Ethiopia to serve you better')}
              </p>
            </div>
          </div>

          <div className="row g-4">
            {regionalOffices.map((office, index) => (
              <div key={index} className="col-lg-3 col-md-6">
                <div className="office-card h-100">
                  <div className="card-body text-center p-4">
                    <div className="office-icon mb-3">
                      <i className="fas fa-map-marker-alt text-primary"></i>
                    </div>
                    <h5 className="office-region fw-bold mb-3">
                      {office.region}
                    </h5>
                    <div className="office-details">
                      <p className="office-address text-muted mb-2">
                        <i className="fas fa-location-dot me-2"></i>
                        {office.address}
                      </p>
                      <p className="office-phone mb-2">
                        <a href={`tel:${office.phone}`} className="text-decoration-none">
                          <i className="fas fa-phone me-2"></i>
                          {office.phone}
                        </a>
                      </p>
                      <p className="office-email mb-2">
                        <a href={`mailto:${office.email}`} className="text-decoration-none">
                          <i className="fas fa-envelope me-2"></i>
                          {office.email}
                        </a>
                      </p>
                      <p className="office-hours text-muted mb-0">
                        <i className="fas fa-clock me-2"></i>
                        {office.hours}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Categories */}
      <section className="support-categories py-5">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 text-center">
              <h2 className="fw-bold mb-3">
                {t('contact.support_categories', 'Support Categories')}
              </h2>
              <p className="lead text-muted">
                {t('contact.support_description', 'Get specialized help based on your needs')}
              </p>
            </div>
          </div>

          <div className="row g-4">
            {supportCategories.map((category, index) => (
              <div key={index} className="col-lg-3 col-md-6">
                <div className="support-card h-100">
                  <div className="card-body p-4">
                    <h5 className="support-category fw-bold mb-3">
                      {category.category}
                    </h5>
                    <p className="support-desc text-muted mb-4">
                      {category.description}
                    </p>
                    <div className="support-contact">
                      <p className="support-email mb-2">
                        <a href={`mailto:${category.email}`} className="text-decoration-none d-flex align-items-center">
                          <i className="fas fa-envelope me-2 text-primary"></i>
                          {category.email}
                        </a>
                      </p>
                      <p className="support-phone mb-0">
                        <a href={`tel:${category.phone}`} className="text-decoration-none d-flex align-items-center">
                          <i className="fas fa-phone me-2 text-primary"></i>
                          {category.phone}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="faq-quicklinks py-5 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h3 className="fw-bold mb-4">
                {t('contact.quick_help', 'Quick Help')}
              </h3>
              <p className="text-muted mb-4">
                {t('contact.faq_description', 'Check our frequently asked questions for quick answers to common questions')}
              </p>
              <a href="/faq" className="btn btn-primary btn-lg px-4">
                <i className="fas fa-question-circle me-2"></i>
                {t('contact.view_faq', 'View FAQ')}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage