import React from 'react'
import { useLanguage } from '../../../contexts/LanguageContext'
import SocialLinks from './SocialLinks'
import './footer.scss'

const Footer = () => {
  const { t } = useLanguage()

  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: t('footer.quick_links', 'Quick Links'),
      links: [
        { path: '/', label: t('nav.home') },
        { path: '/about', label: t('nav.about') },
        { path: '/how-it-works', label: t('nav.how_it_works') },
        { path: '/services', label: t('nav.services') },
        { path: '/contact', label: t('nav.contact') },
      ]
    },
    {
      title: t('footer.legal', 'Legal'),
      links: [
        { path: '/privacy-policy', label: t('footer.privacy_policy', 'Privacy Policy') },
        { path: '/terms-of-service', label: t('footer.terms_of_service', 'Terms of Service') },
        { path: '/faq', label: t('footer.faq', 'FAQ') },
      ]
    },
    {
      title: t('footer.contact_info', 'Contact Info'),
      content: `
        <p><i class="fas fa-map-marker-alt me-2"></i>Addis Ababa, Ethiopia</p>
        <p><i class="fas fa-phone me-2"></i>+251 911 234 567</p>
        <p><i class="fas fa-envelope me-2"></i>info@agaragritech.com</p>
      `
    }
  ]

  return (
    <footer className="agri-footer bg-dark text-light">
      {/* Main Footer Content */}
      <div className="container py-5">
        <div className="row">
          {/* Brand Section */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="footer-brand">
              <img 
                src="/icons/farmer-icon.svg" 
                alt={t('app.name')}
                width="50"
                height="50"
                className="mb-3"
              />
              <h5 className="fw-bold text-white mb-3">{t('app.name')}</h5>
              <p className="text-light mb-4">
                {t('footer.tagline', 'Connecting farmers and vendors directly for fresh produce delivery with fair prices and efficient logistics.')}
              </p>
              <SocialLinks />
            </div>
          </div>

          {/* Dynamic Footer Sections */}
          {footerSections.map((section, index) => (
            <div key={index} className="col-lg-2 col-md-6 mb-4">
              <h6 className="text-white fw-semibold mb-3">{section.title}</h6>
              {section.links ? (
                <ul className="list-unstyled">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex} className="mb-2">
                      <a 
                        href={link.path} 
                        className="footer-link text-light text-decoration-none"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <div 
                  className="footer-content text-light"
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom border-top border-secondary">
        <div className="container py-3">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start">
              <p className="mb-0 text-light">
                &copy; {currentYear} {t('app.name')}. {t('footer.all_rights_reserved', 'All rights reserved.')}
              </p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <p className="mb-0 text-light">
                {t('footer.built_with_love', 'Built with ❤️ for Ethiopian agriculture')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer