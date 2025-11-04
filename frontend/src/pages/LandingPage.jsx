import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import HeroSection from '../components/landing/HeroSection'
import AboutSection from '../components/landing/AboutSection'
import HowItWorks from '../components/landing/HowItWorks'
import ServicesSection from '../components/landing/ServicesSection'
import ContactSection from '../components/landing/ContactSection'
import MarketplacePage from '../components/landing/MarketplacePage'
import './landing-page.scss'

const LandingPage = () => {
  const { t } = useLanguage()

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section id="home">
        <HeroSection />
      </section>
      {/* market-place Section */}
      <section id="marketplace">
        <MarketplacePage />
      </section>
      {/* About Section */}
      <section id="about">
        <AboutSection />
      </section>

      {/* How It Works Section */}
      <section id="how-it-works">
        <HowItWorks />
      </section>

      {/* Services Section */}
      <section id="services">
        <ServicesSection />
      </section>

      {/* Contact Section */}
      <section id="contact">
        <ContactSection />
      </section>
    </div>
  )
}

export default LandingPage