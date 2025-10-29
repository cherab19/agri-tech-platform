import React from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import './legal-pages.scss'

const PrivacyPolicyPage = () => {
  const { t } = useLanguage()

  const policySections = [
    {
      title: t('privacy.introduction', 'Introduction'),
      content: t('privacy.introduction_content', 'Agar Agritech ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our agricultural platform and services.')
    },
    {
      title: t('privacy.information_collection', 'Information We Collect'),
      content: t('privacy.information_collection_content', 'We collect information that you provide directly to us, including:'),
      items: [
        t('privacy.collection_item1', 'Personal identification information (name, email, phone number)'),
        t('privacy.collection_item2', 'Business information (cooperative details, business registration)'),
        t('privacy.collection_item3', 'Financial information for payment processing (through TeleBirr)'),
        t('privacy.collection_item4', 'Product and transaction data'),
        t('privacy.collection_item5', 'Location data for delivery services'),
        t('privacy.collection_item6', 'Communication records and customer support interactions')
      ]
    },
    {
      title: t('privacy.how_we_use', 'How We Use Your Information'),
      content: t('privacy.how_we_use_content', 'We use the information we collect to:'),
      items: [
        t('privacy.use_item1', 'Provide, maintain, and improve our services'),
        t('privacy.use_item2', 'Process transactions and send related information'),
        t('privacy.use_item3', 'Send administrative messages and updates'),
        t('privacy.use_item4', 'Respond to your comments and questions'),
        t('privacy.use_item5', 'Monitor and analyze trends and usage'),
        t('privacy.use_item6', 'Personalize your experience on our platform'),
        t('privacy.use_item7', 'Ensure platform security and prevent fraud')
      ]
    },
    {
      title: t('privacy.information_sharing', 'Information Sharing and Disclosure'),
      content: t('privacy.information_sharing_content', 'We may share your information in the following circumstances:'),
      items: [
        t('privacy.sharing_item1', 'With other users as necessary to facilitate transactions (e.g., farmers and vendors see each other\'s contact information for delivery)'),
        t('privacy.sharing_item2', 'With service providers who assist in our operations'),
        t('privacy.sharing_item3', 'For legal compliance and protection of rights'),
        t('privacy.sharing_item4', 'In connection with business transfers or mergers'),
        t('privacy.sharing_item5', 'With your consent or at your direction')
      ]
    },
    {
      title: t('privacy.data_security', 'Data Security'),
      content: t('privacy.data_security_content', 'We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.')
    },
    {
      title: t('privacy.data_retention', 'Data Retention'),
      content: t('privacy.data_retention_content', 'We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.')
    },
    {
      title: t('privacy.your_rights', 'Your Rights'),
      content: t('privacy.your_rights_content', 'You have the right to:'),
      items: [
        t('privacy.rights_item1', 'Access and receive a copy of your personal data'),
        t('privacy.rights_item2', 'Rectify or update inaccurate personal data'),
        t('privacy.rights_item3', 'Request deletion of your personal data'),
        t('privacy.rights_item4', 'Restrict or object to processing of your data'),
        t('privacy.rights_item5', 'Data portability')
      ]
    },
    {
      title: t('privacy.telebirr_integration', 'TeleBirr Payment Integration'),
      content: t('privacy.telebirr_integration_content', 'When you make payments through TeleBirr, your payment information is processed directly by TeleBirr in accordance with their privacy policy. We do not store your full payment card details on our servers.')
    },
    {
      title: t('privacy.changes', 'Changes to This Policy'),
      content: t('privacy.changes_content', 'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.')
    },
    {
      title: t('privacy.contact', 'Contact Us'),
      content: t('privacy.contact_content', 'If you have any questions about this Privacy Policy, please contact us at: privacy@agaragritech.com')
    }
  ]

  const lastUpdated = 'January 15, 2024'

  return (
    <div className="legal-page privacy-policy">
      {/* Page Header */}
      <section className="page-header bg-light py-5">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <h1 className="display-4 fw-bold mb-3 text-dark">
                {t('privacy.privacy_policy', 'Privacy Policy')}
              </h1>
              <p className="lead text-muted mb-0">
                {t('privacy.last_updated', 'Last Updated')}: {lastUpdated}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Policy Content */}
      <section className="policy-content py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="policy-container">
                {/* Introduction */}
                <div className="policy-intro mb-5">
                  <p className="lead text-muted">
                    {t('privacy.intro_paragraph', 'Your privacy is important to us. This policy describes how Agar Agritech collects, uses, and protects your personal information in connection with our agricultural platform services in Ethiopia.')}
                  </p>
                </div>

                {/* Policy Sections */}
                {policySections.map((section, index) => (
                  <div key={index} className="policy-section mb-5">
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

                {/* Consent Section */}
                <div className="consent-section mt-5 p-4 bg-light rounded">
                  <h3 className="fw-bold mb-3">
                    {t('privacy.consent', 'Your Consent')}
                  </h3>
                  <p className="text-muted mb-0">
                    {t('privacy.consent_content', 'By using our platform, you consent to our Privacy Policy and agree to its terms.')}
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

export default PrivacyPolicyPage