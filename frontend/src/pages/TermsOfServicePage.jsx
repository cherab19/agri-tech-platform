import React from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import './legal-pages.scss'

const TermsOfServicePage = () => {
  const { t } = useLanguage()

  const termsSections = [
    {
      title: t('terms.agreement', 'Agreement to Terms'),
      content: t('terms.agreement_content', 'By accessing or using Agar Agritech\'s platform, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access our services.')
    },
    {
      title: t('terms.eligibility', 'Eligibility'),
      content: t('terms.eligibility_content', 'To use our services, you must:'),
      items: [
        t('terms.eligibility_item1', 'Be at least 18 years of age'),
        t('terms.eligibility_item2', 'Have the legal capacity to enter into binding contracts'),
        t('terms.eligibility_item3', 'Be a legitimate farmer cooperative, vendor cooperative, or certified truck driver in Ethiopia'),
        t('terms.eligibility_item4', 'Provide accurate and complete registration information')
      ]
    },
    {
      title: t('terms.accounts', 'User Accounts'),
      content: t('terms.accounts_content', 'When you create an account with us, you must provide accurate information. You are responsible for:'),
      items: [
        t('terms.accounts_item1', 'Maintaining the confidentiality of your account credentials'),
        t('terms.accounts_item2', 'All activities that occur under your account'),
        t('terms.accounts_item3', 'Notifying us immediately of any unauthorized use'),
        t('terms.accounts_item4', 'Ensuring you log out at the end of each session')
      ]
    },
    {
      title: t('terms.farmer_responsibilities', 'Farmer Responsibilities'),
      content: t('terms.farmer_responsibilities_content', 'Farmers using our platform agree to:'),
      items: [
        t('terms.farmer_item1', 'Provide accurate product descriptions and prices'),
        t('terms.farmer_item2', 'Maintain product quality as described'),
        t('terms.farmer_item3', 'Update product availability regularly'),
        t('terms.farmer_item4', 'Cooperate with assigned drivers for pickup'),
        t('terms.farmer_item5', 'Honor accepted orders and delivery commitments')
      ]
    },
    {
      title: t('terms.vendor_responsibilities', 'Vendor Responsibilities'),
      content: t('terms.vendor_responsibilities_content', 'Vendors using our platform agree to:'),
      items: [
        t('terms.vendor_item1', 'Make timely payments through TeleBirr'),
        t('terms.vendor_item2', 'Provide accurate delivery information'),
        t('terms.vendor_item3', 'Inspect goods upon delivery'),
        t('terms.vendor_item4', 'Report any issues within 24 hours of delivery'),
        t('terms.vendor_item5', 'Maintain proper storage for perishable goods')
      ]
    },
    {
      title: t('terms.driver_responsibilities', 'Driver Responsibilities'),
      content: t('terms.driver_responsibilities_content', 'Drivers using our platform agree to:'),
      items: [
        t('terms.driver_item1', 'Maintain valid driving licenses and vehicle insurance'),
        t('terms.driver_item2', 'Handle goods with care and maintain proper conditions'),
        t('terms.driver_item3', 'Update delivery status in real-time'),
        t('terms.driver_item4', 'Follow assigned routes and delivery schedules'),
        t('terms.driver_item5', 'Maintain professional conduct with all users')
      ]
    },
    {
      title: t('terms.payments', 'Payments and Fees'),
      content: t('terms.payments_content', 'Our platform charges a service commission on successful transactions. Payment processing is handled through TeleBirr. All fees are displayed transparently before order confirmation.')
    },
    {
      title: t('terms.cancellations', 'Cancellations and Refunds'),
      content: t('terms.cancellations_content', 'Cancellation policies:'),
      items: [
        t('terms.cancellation_item1', 'Farmers may cancel orders before driver assignment without penalty'),
        t('terms.cancellation_item2', 'Vendors may cancel orders before payment confirmation'),
        t('terms.cancellation_item3', 'Refunds are processed according to TeleBirr policies'),
        t('terms.cancellation_item4', 'Platform commission may be non-refundable in certain cases')
      ]
    },
    {
      title: t('terms.prohibited', 'Prohibited Activities'),
      content: t('terms.prohibited_content', 'You may not:'),
      items: [
        t('terms.prohibited_item1', 'Use the platform for any illegal purpose'),
        t('terms.prohibited_item2', 'List counterfeit or prohibited goods'),
        t('terms.prohibited_item3', 'Misrepresent products or services'),
        t('terms.prohibited_item4', 'Interfere with platform security features'),
        t('terms.prohibited_item5', 'Harass or threaten other users'),
        t('terms.prohibited_item6', 'Circumvent our commission structure')
      ]
    },
    {
      title: t('terms.termination', 'Termination'),
      content: t('terms.termination_content', 'We may terminate or suspend your account immediately for violations of these Terms. You may also terminate your account at any time by contacting customer support.')
    },
    {
      title: t('terms.limitation', 'Limitation of Liability'),
      content: t('terms.limitation_content', 'Agar Agritech shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the platform.')
    },
    {
      title: t('terms.changes', 'Changes to Terms'),
      content: t('terms.changes_content', 'We reserve the right to modify these terms at any time. We will notify users of material changes through the platform or via email.')
    },
    {
      title: t('terms.contact', 'Contact Information'),
      content: t('terms.contact_content', 'For questions about these Terms of Service, please contact us at: legal@agaragritech.com')
    }
  ]

  const lastUpdated = 'January 15, 2024'

  return (
    <div className="legal-page terms-of-service">
      {/* Page Header */}
      <section className="page-header bg-light py-5">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <h1 className="display-4 fw-bold mb-3 text-dark">
                {t('terms.terms_of_service', 'Terms of Service')}
              </h1>
              <p className="lead text-muted mb-0">
                {t('terms.last_updated', 'Last Updated')}: {lastUpdated}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="terms-content py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="terms-container">
                {/* Introduction */}
                <div className="terms-intro mb-5">
                  <p className="lead text-muted">
                    {t('terms.intro_paragraph', 'These Terms of Service govern your use of Agar Agritech\'s platform and services. Please read them carefully before using our agricultural marketplace.')}
                  </p>
                </div>

                {/* Terms Sections */}
                {termsSections.map((section, index) => (
                  <div key={index} className="terms-section mb-5">
                    <h2 className="section-title fw-bold mb-3">
                      {section.title}
                    </h2>
                    <p className="section-content text-muted mb-3">
                      {section.content}
                    </p>
                    {section.items && (
                      <ul className="section-items list-unstyled">
                        {section.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="section-item mb-2">
                            <i className="fas fa-circle text-primary me-2 small"></i>
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}

                {/* Acceptance Section */}
                <div className="acceptance-section mt-5 p-4 bg-light rounded">
                  <h3 className="fw-bold mb-3">
                    {t('terms.acceptance', 'Acceptance of Terms')}
                  </h3>
                  <p className="text-muted mb-0">
                    {t('terms.acceptance_content', 'By creating an account or using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default TermsOfServicePage