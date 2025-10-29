import React from 'react'
import { useLanguage } from '../../../../contexts/LanguageContext'

const SocialLinks = () => {
  const { t } = useLanguage()

  const socialPlatforms = [
    {
      name: 'Facebook',
      icon: 'fab fa-facebook-f',
      url: 'https://facebook.com/agaragritech',
      color: '#1877F2'
    },
    {
      name: 'Telegram',
      icon: 'fab fa-telegram',
      url: 'https://t.me/agaragritech',
      color: '#0088CC'
    },
    {
      name: 'Twitter',
      icon: 'fab fa-twitter',
      url: 'https://twitter.com/agaragritech',
      color: '#1DA1F2'
    },
    {
      name: 'Instagram',
      icon: 'fab fa-instagram',
      url: 'https://instagram.com/agaragritech',
      color: '#E4405F'
    }
  ]

  return (
    <div className="social-links">
      <p className="text-light mb-2 small">
        {t('footer.follow_us', 'Follow us on:')}
      </p>
      <div className="d-flex gap-2">
        {socialPlatforms.map((platform, index) => (
          <a
            key={index}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link d-flex align-items-center justify-content-center"
            style={{ 
              '--social-color': platform.color 
            }}
            aria-label={`Follow us on ${platform.name}`}
          >
            <i className={platform.icon}></i>
          </a>
        ))}
      </div>
    </div>
  )
}

export default SocialLinks