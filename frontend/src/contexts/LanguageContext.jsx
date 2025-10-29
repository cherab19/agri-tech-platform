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

  const languages = {
    en: { code: 'en', name: 'English', nativeName: 'English' },
    am: { code: 'am', name: 'Amharic', nativeName: 'አማርኛ' },
    om: { code: 'om', name: 'Afaan Oromo', nativeName: 'Afaan Oromoo' },
    so: { code: 'so', name: 'Somali', nativeName: 'Soomaali' }
  }

  useEffect(() => {
    // Load language preference from localStorage
    const savedLanguage = localStorage.getItem('agar_language') || 'am'
    setCurrentLanguage(savedLanguage)
    loadTranslations(savedLanguage)
  }, [])

  const loadTranslations = async (languageCode) => {
    try {
      // In a real app, this would fetch from an API or load from JSON files
      const mockTranslations = {
        en: {
          'app.name': 'Agar Agritech',
          'nav.home': 'Home',
          'nav.about': 'About Us',
          'nav.how_it_works': 'How It Works',
          'nav.services': 'Services',
          'nav.contact': 'Contact',
          'nav.login': 'Login',
          'welcome.title': 'Connecting Farmers and Vendors Directly',
          'welcome.subtitle': 'Fresh produce, direct delivery, fair prices',
          // ... more translations
        },
        am: {
          'app.name': 'አጋር አግሪቴክ',
          'nav.home': 'መግቢያ',
          'nav.about': 'ስለ እኛ',
          'nav.how_it_works': 'እንዴት እንደሚሰራ',
          'nav.services': 'አገልግሎቶች',
          'nav.contact': 'አግኙን',
          'nav.login': 'ግባ',
          'welcome.title': 'ገበሬዎችን እና ሻጮችን በቀጥታ በማገናኘት ላይ',
          'welcome.subtitle': 'ትኩስ ምርት, ቀጥታ አቅርቦት, ፍትሃዊ ዋጋ',
          // ... more translations
        },
        om: {
          'app.name': 'Agar Agritech',
          'nav.home': 'Mana',
          'nav.about': 'Waa\'ee Keenya',
          'nav.how_it_works': 'Akkaataa Hojii',
          'nav.services': 'Tajaajila',
          'nav.contact': 'Nu Qunnamuu',
          'nav.login': 'Seeni',
          // ... more translations
        },
        so: {
          'app.name': 'Agar Agritech',
          'nav.home': 'Bogga',
          'nav.about': 'Ku Saabsan',
          'nav.how_it_works': 'Sida ay U Shaqeyso',
          'nav.services': 'Adeegyada',
          'nav.contact': 'Nala Soo Xiriir',
          'nav.login': 'Gali',
          // ... more translations
        }
      }

      setTranslations(mockTranslations[languageCode] || mockTranslations.en)
    } catch (error) {
      console.error('Error loading translations:', error)
    }
  }

  const changeLanguage = (languageCode) => {
    if (languages[languageCode]) {
      setCurrentLanguage(languageCode)
      localStorage.setItem('agar_language', languageCode)
      loadTranslations(languageCode)
    }
  }

  const t = (key, params = {}) => {
    let translation = translations[key] || key
    
    // Replace parameters in translation string
    Object.keys(params).forEach(param => {
      translation = translation.replace(`{{${param}}}`, params[param])
    })
    
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