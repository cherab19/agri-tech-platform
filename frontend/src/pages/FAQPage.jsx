import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import './faq-page.scss'

const FAQPage = () => {
  const { t } = useLanguage()

  const faqCategories = [
    {
      category: t('faq.general', 'General Questions'),
      icon: 'fas fa-info-circle',
      questions: [
        {
          question: t('faq.general_q1', 'What is Agar Agritech?'),
          answer: t('faq.general_a1', 'Agar Agritech is a digital marketplace platform that connects farmers cooperatives directly with vendors cooperatives in Ethiopia. We facilitate the entire supply chain from product listing to delivery and payment processing.')
        },
        {
          question: t('faq.general_q2', 'How does Agar Agritech work?'),
          answer: t('faq.general_a2', 'Farmers list their produce on our platform, vendors browse and order products, make payments through TeleBirr, and our system coordinates delivery through assigned truck drivers. The platform handles everything from order management to payment settlements.')
        },
        {
          question: t('faq.general_q3', 'Is Agar Agritech free to use?'),
          answer: t('faq.general_a3', 'We offer a free basic plan for individual farmers and small vendors. For cooperatives and larger businesses, we have premium plans with advanced features. We charge a small service commission only on successful transactions.')
        },
        {
          question: t('faq.general_q4', 'Which regions do you serve?'),
          answer: t('faq.general_a4', 'We currently serve major regions in Ethiopia including Addis Ababa, Oromia, Amhara, SNNPR, and more. We are continuously expanding to cover all agricultural regions in the country.')
        }
      ]
    },
    {
      category: t('faq.farmers', 'For Farmers'),
      icon: 'fas fa-tractor',
      questions: [
        {
          question: t('faq.farmer_q1', 'How do I list my products?'),
          answer: t('faq.farmer_a1', 'After creating a farmer account and verifying your cooperative, you can easily list products through your dashboard. Add product photos, descriptions, prices, and available quantities. Our system guides you through the entire process.')
        },
        {
          question: t('faq.farmer_q2', 'How are prices determined?'),
          answer: t('faq.farmer_a2', 'Farmers set their own prices based on market rates and production costs. Our platform provides market insights and suggested pricing, but ultimately you control your pricing strategy.')
        },
        {
          question: t('faq.farmer_q3', 'When do I get paid?'),
          answer: t('faq.farmer_a3', 'Payments are automatically processed after successful delivery and vendor confirmation. Funds are transferred to your registered TeleBirr account, typically within 24-48 hours after delivery completion.')
        },
        {
          question: t('faq.farmer_q4', 'What if a vendor rejects my products?'),
          answer: t('faq.farmer_a4', 'Vendors have 2 hours after delivery to inspect products and report any quality issues. If there\'s a legitimate concern, our support team mediates the situation according to our quality guidelines.')
        }
      ]
    },
    {
      category: t('faq.vendors', 'For Vendors'),
      icon: 'fas fa-store',
      questions: [
        {
          question: t('faq.vendor_q1', 'How do I place an order?'),
          answer: t('faq.vendor_a1', 'Browse available products, add items to your cart, and proceed to checkout. You\'ll need to make payment through TeleBirr to confirm your order. The system then automatically coordinates delivery.')
        },
        {
          question: t('faq.vendor_q2', 'What payment methods are accepted?'),
          answer: t('faq.vendor_a2', 'We currently accept payments through TeleBirr. This ensures secure and instant payment processing. We are working on integrating additional payment methods in the future.')
        },
        {
          question: t('faq.vendor_q3', 'How is delivery handled?'),
          answer: t('faq.vendor_a3', 'Our system automatically assigns the nearest available driver based on your location. You can track the delivery in real-time through your dashboard and receive SMS notifications at key milestones.')
        },
        {
          question: t('faq.vendor_q4', 'What if I receive damaged goods?'),
          answer: t('faq.vendor_a4', 'Inspect goods immediately upon delivery. If there are issues, report them through the platform within 2 hours. Our support team will investigate and facilitate resolution according to our quality guarantee policy.')
        }
      ]
    },
    {
      category: t('faq.drivers', 'For Drivers'),
      icon: 'fas fa-truck',
      questions: [
        {
          question: t('faq.driver_q1', 'How do I become a driver partner?'),
          answer: t('faq.driver_a1', 'Register as a driver on our platform, complete the verification process including valid driving license and vehicle documentation. Once approved, you can start receiving delivery assignments.')
        },
        {
          question: t('faq.driver_q2', 'How are deliveries assigned?'),
          answer: t('faq.driver_a2', 'Our system automatically assigns deliveries based on your location, vehicle capacity, and current availability. You can accept or decline assignments based on your schedule.')
        },
        {
          question: t('faq.driver_q3', 'How and when do I get paid?'),
          answer: t('faq.driver_a3', 'You receive payment for each successful delivery. Payments are processed weekly through TeleBirr. The amount includes base delivery fee plus any additional charges for distance or special handling.')
        },
        {
          question: t('faq.driver_q4', 'What support is available for drivers?'),
          answer: t('faq.driver_a4', 'We provide 24/7 support for delivery-related issues, route optimization assistance, and customer service backup. Our driver app includes navigation support and real-time order management features.')
        }
      ]
    },
    {
      category: t('faq.technical', 'Technical Support'),
      icon: 'fas fa-laptop-code',
      questions: [
        {
          question: t('faq.tech_q1', 'What are the system requirements?'),
          answer: t('faq.tech_a1', 'Our platform works on all modern web browsers and mobile devices. For best experience, use Chrome, Firefox, or Safari on devices with internet connection. Our mobile app is available for Android and iOS.')
        },
        {
          question: t('faq.tech_q2', 'How do I reset my password?'),
          answer: t('faq.tech_a2', 'Click "Forgot Password" on the login page. Enter your registered email address, and we\'ll send you a password reset link. Follow the instructions in the email to create a new password.')
        },
        {
          question: t('faq.tech_q3', 'Is my data secure?'),
          answer: t('faq.tech_a3', 'Yes, we use industry-standard encryption and security measures to protect your data. All payments are processed through secure TeleBirr integration, and we never store your full payment details.')
        },
        {
          question: t('faq.tech_q4', 'What if I encounter technical issues?'),
          answer: t('faq.tech_a4', 'Contact our technical support team at tech@agaragritech.com or call +251 911 234 571. Include details about the issue, your device type, and browser information for faster resolution.')
        }
      ]
    }
  ]

  return (
    <div className="faq-page">
      {/* Page Header */}
      <section className="page-header bg-primary text-white py-5">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <h1 className="display-4 fw-bold mb-3">
                {t('faq.frequently_asked_questions', 'Frequently Asked Questions')}
              </h1>
              <p className="lead mb-0 opacity-75">
                {t('faq.page_subtitle', 'Find answers to common questions about using Agar Agritech')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="search-section py-4 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="search-box">
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0">
                    <i className="fas fa-search text-muted"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control border-start-0"
                    placeholder={t('faq.search_placeholder', 'Search for questions...')}
                    id="faqSearch"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="faq-categories py-5">
        <div className="container">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="faq-category mb-5">
              {/* Category Header */}
              <div className="category-header mb-4">
                <div className="d-flex align-items-center">
                  <div className="category-icon me-3">
                    <i className={`${category.icon} text-primary`}></i>
                  </div>
                  <h2 className="category-title fw-bold mb-0">
                    {category.category}
                  </h2>
                </div>
              </div>

              {/* Questions Accordion */}
              <div className="accordion" id={`accordion${categoryIndex}`}>
                {category.questions.map((faq, faqIndex) => (
                  <div key={faqIndex} className="accordion-item border-0 mb-3">
                    <h3 className="accordion-header">
                      <button
                        className="accordion-button collapsed fw-semibold"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#faq${categoryIndex}${faqIndex}`}
                        aria-expanded="false"
                        aria-controls={`faq${categoryIndex}${faqIndex}`}
                      >
                        {faq.question}
                      </button>
                    </h3>
                    <div
                      id={`faq${categoryIndex}${faqIndex}`}
                      className="accordion-collapse collapse"
                      data-bs-parent={`#accordion${categoryIndex}`}
                    >
                      <div className="accordion-body text-muted">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="contact-cta py-5 bg-light text-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h2 className="fw-bold mb-3">
                {t('faq.still_have_questions', 'Still have questions?')}
              </h2>
              <p className="lead text-muted mb-4">
                {t('faq.contact_description', "Can't find the answer you're looking for? Please contact our support team.")}
              </p>
              <div className="d-flex gap-3 justify-content-center flex-wrap">
                <a href="/contact" className="btn btn-primary btn-lg px-4">
                  <i className="fas fa-envelope me-2"></i>
                  {t('faq.contact_support', 'Contact Support')}
                </a>
                <a href="tel:+251911234567" className="btn btn-outline-primary btn-lg px-4">
                  <i className="fas fa-phone me-2"></i>
                  {t('faq.call_us', 'Call Us')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default FAQPage