import React from 'react'
import { useLanguage } from '../../../contexts/LanguageContext'

const SocialLinks = () => {
  const { t } = useLanguage()

  const socialPlatforms = [
    {
      name: 'Facebook',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path d="M18.896 0H1.104C.494 0 0 .494 0 1.104v17.793C0 19.506.494 20 1.104 20h9.58v-7.745H8.076V9.237h2.608V7.01c0-2.584 1.578-3.99 3.883-3.99 1.104 0 2.052.082 2.329.119v2.7h-1.598c-1.254 0-1.496.597-1.496 1.47v1.928h2.989l-.39 3.018h-2.6V20h5.098c.608 0 1.102-.494 1.102-1.104V1.104C20 .494 19.506 0 18.896 0z"/>
        </svg>
      ),
      url: 'https://facebook.com/agaragritech',
      color: '#1877F2'
    },
    {
      name: 'Tiktok',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path d="M16.955 6.215a4.52 4.52 0 0 1-1.434-.385v5.99a6.28 6.28 0 1 1-5.28-6.195v2.83a3.45 3.45 0 1 0 2.22 3.285l.024-8.465h2.643a4.515 4.515 0 0 0 1.827 3.94z"/>
        </svg>
      ),
      url: 'https://tiktok.com/@agaragritech',
      color: '#000000'
    },
    {
      name: 'Telegram',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path d="M18.896 0H1.104C.494 0 0 .494 0 1.104v17.793C0 19.506.494 20 1.104 20h17.793c.608 0 1.104-.494 1.104-1.104V1.104C20 .494 19.506 0 18.896 0zM14.523 5.828l-1.455 6.826c-.107.5-.395.622-.9.387l-2.5-1.842-1.204 1.16c-.133.133-.245.245-.5.245l.177-2.527 4.63-4.18c.202-.18-.044-.28-.312-.1l-5.722 3.605-2.465-.77c-.536-.167-.547-.536.112-.795l9.57-3.685c.446-.18.836.112.683.795z"/>
        </svg>
      ),
      url: 'https://t.me/agaragritech',
      color: '#0088CC'
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
              backgroundColor: platform.color,
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              color: 'white',
              textDecoration: 'none',
              transition: 'transform 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
            }}
            aria-label={`Follow us on ${platform.name}`}
          >
            {platform.icon}
          </a>
        ))}
      </div>
    </div>
  )
}

export default SocialLinks