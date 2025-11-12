import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import HowItWorks from '../components/landing/HowItWorks'
import './how-it-works-page.scss'

const HowItWorksPage = () => {
  const { t } = useLanguage()

  const faqs = [
    {
      question: t('how_it_works.faq1_question', 'How do farmers list their products?'),
      answer: t('how_it_works.faq1_answer', 'Farmers can easily create an account, verify their cooperative, and start listing products with photos, descriptions, prices, and available quantities through our user-friendly dashboard.')
    },
    {
      question: t('how_it_works.faq2_question', 'What payment methods are supported?'),
      answer: t('how_it_works.faq2_answer', 'We currently support TeleBirr for all payments. Vendors pay instantly through TeleBirr, and farmers receive their payments through automated settlements after successful delivery.')
    },
    {
      question: t('how_it_works.faq3_question', 'How are delivery drivers assigned?'),
      answer: t('how_it_works.faq3_answer', 'Our system automatically assigns the nearest available driver based on location, capacity, and current workload. Both farmers and vendors can track the delivery in real-time.')
    },
    {
      question: t('how_it_works.faq4_question', 'What commissions does AgriMart charge?'),
      answer: t('how_it_works.faq4_answer', 'We charge a small service commission only on successful transactions. The exact percentage varies based on the product type and is transparently displayed before order confirmation.')
    },
    {
      question: t('how_it_works.faq5_question', 'How do I get started as a vendor?'),
      answer: t('how_it_works.faq5_answer', 'Simply create a vendor account, verify your business, and you can immediately start browsing products, placing orders, and making payments through our secure platform.')
    }
  ]

  return (
    <div className="how-it-works-page">
      {/* Page Header */}
      <section className="page-header bg-primary text-white py-5">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <h1 className="display-4 fw-bold mb-3">
                {t('how_it_works.how_it_works', 'How AgriMart Works')}
              </h1>
              <p className="lead mb-0 opacity-75">
                {t('how_it_works.page_subtitle', 'Learn how our platform connects farmers, vendors, and drivers for efficient agricultural trade')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main How It Works Content */}
      <HowItWorks />

      {/* FAQ Section */}
      <section className="faq-section py-5 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h2 className="text-center fw-bold mb-5">
                {t('how_it_works.frequently_asked_questions', 'Frequently Asked Questions')}
              </h2>
              
              <div className="accordion" id="faqAccordion">
                {faqs.map((faq, index) => (
                  <div key={index} className="accordion-item border-0 mb-3">
                    <h3 className="accordion-header">
                      <button
                        className="accordion-button collapsed fw-semibold"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#faq${index}`}
                        aria-expanded="false"
                        aria-controls={`faq${index}`}
                      >
                        {faq.question}
                      </button>
                    </h3>
                    <div
                      id={`faq${index}`}
                      className="accordion-collapse collapse"
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body text-muted">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HowItWorksPage