import React, { useState } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { notify } from '../common/Notification'
import './contact-section.scss'

const ContactSection = () => {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    userType: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const userTypes = [
    { value: 'farmer', label: t('contact.farmer', 'Farmer Cooperative') },
    { value: 'vendor', label: t('contact.vendor', 'Vendor Cooperative') },
    { value: 'driver', label: t('contact.driver', 'Truck Driver') },
    { value: 'partner', label: t('contact.partner', 'Business Partner') },
    { value: 'other', label: t('contact.other', 'Other') }
  ]

// Create icon components first
const LocationIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="#E74C3C">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
  </svg>
);

const PhoneIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="#27AE60">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
  </svg>
);

const EmailIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="#2980B9">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="#8E44AD">
    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
  </svg>
);

// Then use them in your array
const contactMethods = [
  {
    icon: LocationIcon,
    title: t('contact.visit_us', 'Visit Us'),
    details: t('contact.visit_address', 'Dire Dawa, Ethiopia'),
    link: '#',
    color: '#E74C3C'
  },
  {
    icon: PhoneIcon,
    title: t('contact.call_us', 'Call Us'),
    details: '+251 911 234 567',
    link: 'tel:+251911234567',
    color: '#27AE60'
  },
  {
    icon: EmailIcon,
    title: t('contact.email_us', 'Email Us'),
    details: 'info@agaragritech.com',
    link: 'mailto:info@agaragritech.com',
    color: '#2980B9'
  },
  {
    icon: ClockIcon,
    title: t('contact.working_hours', 'Working Hours'),
    details: t('contact.hours_details', 'Mon - Fri: 8:00 AM - 6:00 PM'),
    link: '#',
    color: '#8E44AD'
  }
];

const handleChange = (e) => {
  const { name, value } = e.target
  setFormData(prev => ({
    ...prev,
    [name]: value
  }))
}

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      notify.success(t('contact.success_message', 'Thank you for your message! We will get back to you soon.'))
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        userType: ''
      })
    } catch (error) {
      notify.error(t('contact.error_message', 'Sorry, there was an error sending your message. Please try again.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="contact-section py-5 bg-dark text-light">
      <div className="container">
        {/* Section Header */}
        <div className="row justify-content-center text-center mb-5">
          <div className="col-lg-8">
            <h2 className="section-title fw-bold mb-3 text-white">
              {t('contact.get_in_touch', 'Get In Touch')}
            </h2>
            <p className="section-subtitle lead opacity-75">
              {t('contact.contact_description', 'Have questions about our platform? We\'re here to help farmers, vendors, and drivers succeed.')}
            </p>
          </div>
        </div>

        <div className="row">
          {/* Contact Information */}
          <div className="col-lg-4 mb-4 mb-lg-0">
            <div className="contact-info">
              <h4 className="fw-bold mb-4 text-white">
                {t('contact.contact_info', 'Contact Information')}
              </h4>
              
              {contactMethods.map((method, index) => (
                <div key={index} className="contact-method mb-4">
                      <div className="method-icon d-inline-flex align-items-center justify-content-center bg-primary rounded-circle me-3">
                        {(() => {
                          const Icon = method.icon
                          // If icon is a React component (function), render it. Otherwise render as class name (font icon)
                          return typeof Icon === 'function' ? <Icon /> : <i className={Icon}></i>
                        })()}
                      </div>
                  <div className="method-content">
                    <h6 className="method-title fw-semibold mb-1 text-white">
                      {method.title}
                    </h6>
                    <a 
                      href={method.link} 
                      className="method-details text-light opacity-75 text-decoration-none"
                    >
                      {method.details}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-8">
            <div className="contact-form-card bg-light text-dark rounded-3 p-4">
              <h4 className="fw-bold mb-4">
                {t('contact.send_message', 'Send Us a Message')}
              </h4>
              
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  {/* Name */}
                  <div className="col-md-6">
                    <label htmlFor="name" className="form-label fw-medium">
                      {t('contact.full_name', 'Full Name')} *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Email */}
                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label fw-medium">
                      {t('contact.email', 'Email Address')} *
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Phone */}
                  <div className="col-md-6">
                    <label htmlFor="phone" className="form-label fw-medium">
                      {t('contact.phone', 'Phone Number')}
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* User Type */}
                  <div className="col-md-6">
                    <label htmlFor="userType" className="form-label fw-medium">
                      {t('contact.i_am_a', 'I am a')}
                    </label>
                    <select
                      className="form-select"
                      id="userType"
                      name="userType"
                      value={formData.userType}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    >
                      <option value="">{t('contact.select_type', 'Select type')}</option>
                      {userTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Subject */}
                  <div className="col-12">
                    <label htmlFor="subject" className="form-label fw-medium">
                      {t('contact.subject', 'Subject')} *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Message */}
                  <div className="col-12">
                    <label htmlFor="message" className="form-label fw-medium">
                      {t('contact.message', 'Message')} *
                    </label>
                    <textarea
                      className="form-control"
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      placeholder={t('contact.message_placeholder', 'Tell us how we can help you...')}
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <div className="col-12">
                    <button
                      type="submit"
                      className="btn btn-primary px-4 py-2 fw-semibold"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          {t('contact.sending', 'Sending...')}
                        </>
                      ) : (
                        <>
                          <i className="fas fa-paper-plane me-2"></i>
                          {t('contact.send_message', 'Send Message')}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection