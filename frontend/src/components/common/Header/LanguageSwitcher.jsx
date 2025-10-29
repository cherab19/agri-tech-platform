import React from 'react'
import { useLanguage } from '../../../../contexts/LanguageContext'

const LanguageSwitcher = () => {
  const { currentLanguage, languages, changeLanguage, t } = useLanguage()

  return (
    <div className="dropdown">
      <button
        className="btn btn-outline-secondary dropdown-toggle d-flex align-items-center"
        type="button"
        id="languageDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i className="fas fa-globe me-2"></i>
        <span className="d-none d-md-inline">
          {languages[currentLanguage]?.nativeName || currentLanguage}
        </span>
      </button>
      <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="languageDropdown">
        {Object.values(languages).map((lang) => (
          <li key={lang.code}>
            <button
              className={`dropdown-item d-flex align-items-center ${
                currentLanguage === lang.code ? 'active' : ''
              }`}
              onClick={() => changeLanguage(lang.code)}
            >
              <span className="me-2">{getLanguageFlag(lang.code)}</span>
              <div className="d-flex flex-column">
                <span>{lang.nativeName}</span>
                <small className="text-muted">{lang.name}</small>
              </div>
              {currentLanguage === lang.code && (
                <i className="fas fa-check ms-auto text-success"></i>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Helper function to get flag emoji for each language
const getLanguageFlag = (languageCode) => {
  const flags = {
    en: '🇺🇸', // English - US flag
    am: '🇪🇹', // Amharic - Ethiopia flag
    om: '🇪🇹', // Afaan Oromo - Ethiopia flag
    so: '🇸🇴', // Somali - Somalia flag
  }
  return flags[languageCode] || '🌐'
}

export default LanguageSwitcher