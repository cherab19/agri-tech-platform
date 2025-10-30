import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import AboutSection from '../components/landing/AboutSection'
import './about-page.scss'

const AboutPage = () => {
  const { t } = useLanguage()

  const additionalContent = {
    story: {
      title: t('about.our_story', 'Our Story'),
      content: t('about.story_content', 'Agar Agritech was founded in 2023 by a team of Ethiopian entrepreneurs and technologists who recognized the challenges facing the agricultural supply chain. We saw farmers struggling to get fair prices for their produce while vendors paid high prices for goods that passed through multiple middlemen. Our mission is to use technology to create a more efficient, transparent, and fair agricultural marketplace.')
    },
    impact: {
      title: t('about.our_impact', 'Our Impact'),
      content: t('about.impact_content', 'Since our launch, we have facilitated over 50,000 transactions, connected 500+ farmers with 1,200+ vendors, and created economic opportunities across 10+ regions in Ethiopia. Our platform has helped farmers increase their income by an average of 30% while providing vendors with fresher produce at better prices.')
    },
    future: {
      title: t('about.future_plans', 'Future Plans'),
      content: t('about.future_content', 'We are expanding to cover all regions of Ethiopia, introducing new features like weather-based pricing, crop insurance, and financial services. Our goal is to become the leading agri-tech platform in East Africa, transforming how agricultural business is conducted.')
    }
  }

  return (
    <div className="about-page">
      {/* Page Header */}
      <section className="page-header bg-primary text-white py-5">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <h1 className="display-4 fw-bold mb-3">
                {t('about.about_us', 'About Agar Agritech')}
              </h1>
              <p className="lead mb-0 opacity-75">
                {t('about.page_subtitle', 'Transforming Ethiopian agriculture through technology and innovation')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main About Content */}
      <AboutSection />

      {/* Additional Content Sections */}
      <section className="additional-content py-5 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              {/* Story Section */}
              <div className="content-section mb-5">
                <h2 className="fw-bold mb-4 text-center">
                  {additionalContent.story.title}
                </h2>
                <p className="lead text-muted text-center">
                  {additionalContent.story.content}
                </p>
              </div>

              {/* Impact Section */}
              <div className="content-section mb-5">
                <h2 className="fw-bold mb-4 text-center">
                  {additionalContent.impact.title}
                </h2>
                <p className="lead text-muted text-center">
                  {additionalContent.impact.content}
                </p>
              </div>

              {/* Future Plans Section */}
              <div className="content-section">
                <h2 className="fw-bold mb-4 text-center">
                  {additionalContent.future.title}
                </h2>
                <p className="lead text-muted text-center">
                  {additionalContent.future.content}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section py-5 text-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h2 className="fw-bold mb-3">
                {t('about.join_us', 'Join the Agricultural Revolution')}
              </h2>
              <p className="lead text-muted mb-4">
                {t('about.cta_description', 'Be part of the movement transforming Ethiopian agriculture. Whether you\'re a farmer, vendor, or driver, we have a place for you.')}
              </p>
              <div className="d-flex gap-3 justify-content-center flex-wrap">
                <a href="/contact" className="btn btn-outline-primary btn-lg px-4">
                  <i className="fas fa-envelope me-2"></i>
                  {t('about.contact_us', 'Contact Us')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage