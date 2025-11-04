import React from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import './about-section.scss'

const AboutSection = () => {
  const { t } = useLanguage()

  const missionValues = [
    {
      icon: 'fas fa-hands-helping',
      title: t('about.fair_trade', 'Fair Trade'),
      description: t('about.fair_trade_desc', 'Ensuring fair prices for farmers and affordable prices for vendors')
    },
    {
      icon: 'fas fa-bolt',
      title: t('about.efficiency', 'Efficiency'),
      description: t('about.efficiency_desc', 'Direct delivery model eliminates middlemen and reduces waste')
    },
    {
      icon: 'fas fa-shield-alt',
      title: t('about.transparency', 'Transparency'),
      description: t('about.transparency_desc', 'Complete visibility from farm to market with real-time tracking')
    },
    {
      icon: 'fas fa-users',
      title: t('about.community', 'Community'),
      description: t('about.community_desc', 'Building strong agricultural communities across Ethiopia')
    }
  ]

  const teamMembers = [
    {
      name: 'Chernet Degefe',
      role: t('about.founder', 'member of a team from software engineering'),
      image: '/images/team/',
      description: t('about.founder_desc', 'Software engineering student passionate about agri-tech solutions')
    },
    {
      name: 'Abdi Dereje ',
      role: t('about.cto', 'member of a team from software engineering'),
      image: '/images/team/',
      description: t('about.cto_desc', 'Software engineer curious about tech solutions')
    },
    {
      name: 'Muaz Amin ',
      role: t('about.operations', 'member of a team from software engineering'),
      image: '/images/team/',
      description: t('about.operations_desc', 'software engineering student with deep passion in tech ecosystem ')
    }
  ]

  return (
    <section className="about-section py-5">
      <div className="container">
        {/* Section Header */}
        <div className="row justify-content-center text-center mb-5">
          <div className="col-lg-8">
            <p className="section-subtitle lead text-muted">
              {t('about.about_description', 'We are revolutionizing Ethiopian agriculture through technology, connecting farmers directly with vendors for a more efficient and fair supply chain.')}
            </p>
          </div>
        </div>

        {/* Mission and Vision */}
        <div className="row align-items-center mb-5">
          <div className="col-lg-6 mb-4 mb-lg-0">
            {/* Decorative illustration to avoid empty left column */}
            <div className="about-image mb-3 mb-lg-0 d-flex align-items-center justify-content-center">
              <div className="illustration">
                {/* Replace with a real brand/photo image placed at public/images/about/your-image.png */}
                <img
                  src="/images/about-us.jpg"
                  alt="About Agar Agritech"
                  className="img-fluid"
                  loading="lazy"
                  width={520}
                  height={320}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="about-content">
              <h3 className="fw-bold mb-4">
                {t('about.our_mission', 'Our Mission')}
              </h3>
              <p className="mb-4">
                {t('about.mission_text', 'To empower Ethiopian farmers and vendors by creating a direct, transparent, and efficient agricultural marketplace that eliminates middlemen and ensures fair prices for all stakeholders.')}
              </p>
              
              <h3 className="fw-bold mb-4">
                {t('about.our_vision', 'Our Vision')}
              </h3>
              <p className="mb-4">
                {t('about.vision_text', 'To become Ethiopia\'s leading agri-tech platform, transforming the agricultural supply chain and contributing to food security and economic growth.')}
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="row mb-5">
          <div className="col-12">
            <h3 className="text-center fw-bold mb-5">
              {t('about.our_values', 'Our Values')}
            </h3>
            <div className="row g-4">
              {missionValues.map((value, index) => (
                <div key={index} className="col-lg-3 col-md-6">
                  <div className="value-card text-center p-4 h-100">
                    <div className="value-icon mb-3">
                      <i className={`${value.icon} text-primary`}></i>
                    </div>
                    <h5 className="value-title fw-semibold mb-3">
                      {value.title}
                    </h5>
                    <p className="value-desc text-muted mb-0">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="row">
          <div className="col-12">
            <h3 className="text-center fw-bold mb-5">
              {t('about.our_team', 'Our Team')}
            </h3>
            <div className="row justify-content-center g-4">
              {teamMembers.map((member, index) => (
                <div key={index} className="col-lg-4 col-md-6">
                  <div className="team-card text-center p-4">
                    <div className="team-image mb-3">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="rounded-circle img-fluid"
                        width="120"
                        height="120"
                      />
                    </div>
                    <h5 className="team-name fw-semibold mb-2">
                      {member.name}
                    </h5>
                    <p className="team-role text-primary fw-medium mb-2">
                      {member.role}
                    </p>
                    <p className="team-desc small text-muted mb-0">
                      {member.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection