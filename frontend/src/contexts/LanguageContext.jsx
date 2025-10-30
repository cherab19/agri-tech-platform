import React, { createContext, useState, useContext, useEffect } from 'react'

const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('am') // Amharic as default
  const [translations, setTranslations] = useState({})

  // Simple in-memory cache to avoid refetching locale files repeatedly
  // Keys: language code -> parsed JSON object
  const translationsCache = React.useRef({})

  const languages = {
    en: { code: 'en', name: 'English', nativeName: 'English' },
    am: { code: 'am', name: 'Amharic', nativeName: 'አማርኛ' },
    om: { code: 'om', name: 'Afaan Oromo', nativeName: 'Afaan Oromoo' },
    
  }

  useEffect(() => {
    // Load language preference from localStorage
    const savedLanguage = localStorage.getItem('agar_language') || 'am'
    setCurrentLanguage(savedLanguage)
    loadTranslations(savedLanguage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadTranslations = async (languageCode) => {
    if (!languageCode) return

    // Return cached copy if available
    if (translationsCache.current[languageCode]) {
      setTranslations(translationsCache.current[languageCode])
      return
    }

    const localePath = `/locales/${languageCode}/common.json`
    try {
      const res = await fetch(localePath)
      if (!res.ok) {
        // fallback to English if requested locale not found
        if (languageCode !== 'en') {
          console.warn(`${localePath} not found, falling back to /locales/en/common.json`)
          return loadTranslations('en')
        }
        throw new Error(`Failed to load translations: ${res.status}`)
      }

      const data = await res.json()
      translationsCache.current[languageCode] = data
      setTranslations(data)
    } catch (error) {
      console.error('Error loading translations:', error)
      // if all else fails, ensure translations is an empty object to avoid crashes
      setTranslations({})
    }
  }

  const changeLanguage = (languageCode) => {
    if (languages[languageCode]) {
      setCurrentLanguage(languageCode)
      localStorage.setItem('agar_language', languageCode)
      loadTranslations(languageCode)
    }
  }

  // Resolve dotted keys from nested JSON, e.g. 'app.name' -> translations.app.name
  const resolveKey = (obj, dottedKey) => {
    if (!obj || !dottedKey) return undefined
    return dottedKey.split('.').reduce((acc, part) => (acc && acc[part] !== undefined) ? acc[part] : undefined, obj)
  }

  const t = (key, params = {}) => {
    // Try to resolve nested key first (object-based locale files)
    let translation = resolveKey(translations, key)

    // If not found, fallback to raw key (avoid returning undefined)
    if (translation === undefined) translation = key

    // Replace parameters in translation string if it's a string
    if (typeof translation === 'string') {
      Object.keys(params).forEach(param => {
        translation = translation.replace(new RegExp(`{{\\s*${param}\\s*}}`, 'g'), params[param])
      })
    }

    return translation
  }

  const value = {
    currentLanguage,
    languages,
    changeLanguage,
    t,
    isRTL: false // Add RTL support if needed for certain languages
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export default LanguageContext