import React from 'react'
import { useLanguage } from '../../../contexts/LanguageContext'

const Navigation = () => {
  const { t } = useLanguage()

  return (
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <a className="nav-link" href="/">{t('nav.home', 'Home')}</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/about">{t('nav.about', 'About')}</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/how-it-works">{t('nav.how_it_works', 'How It Works')}</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/services">{t('nav.services', 'Services')}</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/contact">{t('nav.contact', 'Contact')}</a>
      </li>
    </ul>
  )
}

export default Navigation
