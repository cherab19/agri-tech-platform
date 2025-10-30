import React from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import { useLanguage } from '../../../contexts/LanguageContext'
import Navigation from './Navigation'
import LanguageSwitcher from '../Header/LanguageSwitcher'
import './header.scss'

const Header = () => {
  const { user, isAuthenticated } = useAuth()
  const { t } = useLanguage()

  return (
    <header className="agri-header">
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          {/* Brand Logo */}
          <a className="navbar-brand d-flex align-items-center" href="/">
            <img 
              src="/icons/farmer-icon.jpg" 
              width="40"
              height="40"
              className="me-2"
            />
            <span className="fw-bold agri-text-primary fs-4">
              {t('app.name')}
            </span>
          </a>

          {/* Mobile Toggle Button */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navigation Menu */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <Navigation />
            
            <div className="d-flex align-items-center ms-lg-auto">
              {/* Language Switcher */}
              <LanguageSwitcher />
              
              {/* User Menu */}
              {isAuthenticated ? (
                <div className="dropdown ms-3">
                  <button
                    className="btn btn-outline-primary dropdown-toggle d-flex align-items-center"
                    type="button"
                    id="userDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <div className="user-avatar bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2" 
                         style={{ width: '32px', height: '32px', fontSize: '14px' }}>
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="d-none d-sm-inline">{user.name}</span>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                    <li>
                      <span className="dropdown-item-text small text-muted">
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <a className="dropdown-item" href={`/${user.role}/dashboard`}>
                        <i className="fas fa-tachometer-alt me-2"></i>
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/profile">
                        <i className="fas fa-user me-2"></i>
                        Profile
                      </a>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <a className="dropdown-item text-danger" href="/logout">
                        <i className="fas fa-sign-out-alt me-2"></i>
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              ) : (
                <a href="/login" className="btn btn-primary ms-3">
                  <i className="fas fa-sign-in-alt me-2"></i>
                  {t('nav.login')}
                </a>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header