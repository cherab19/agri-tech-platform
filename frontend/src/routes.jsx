import React from 'react'
import LandingPage from './pages/LandingPage'
import AboutPage from './pages/AboutPage'
import HowItWorksPage from './pages/HowItWorksPage'
import ServicesPage from './pages/ServicesPage'
import ContactPage from './pages/ContactPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import TermsOfServicePage from './pages/TermsOfServicePage'
import FAQPage from './pages/FAQPage'
import LoginPage from './pages/auth/LoginPage'
import LogoutPage from './pages/auth/LogoutPage'
import FarmerDashboard from './pages/farmers/FarmerDashboard'
import VendorDashboard from './pages/vendors/VendorDashboard'
import DriverDashboard from './pages/drivers/DriverDashboard'
import AdminDashboard from './pages/admin/AdminDashboard'
import ProtectedRoute from './components/common/Auth/ProtectedRoute'

const routes = [
  // Public routes
  { path: '/', element: <LandingPage /> },
  { path: '/about', element: <AboutPage /> },
  { path: '/how-it-works', element: <HowItWorksPage /> },
  { path: '/services', element: <ServicesPage /> },
  { path: '/contact', element: <ContactPage /> },
  { path: '/privacy-policy', element: <PrivacyPolicyPage /> },
  { path: '/terms-of-service', element: <TermsOfServicePage /> },
  { path: '/faq', element: <FAQPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/logout', element: <LogoutPage /> },
  
  // Protected routes - Farmers
  { 
    path: '/farmer/dashboard', 
    element: <ProtectedRoute allowedRoles={['farmer']}><FarmerDashboard /></ProtectedRoute> 
  },
  
  // Protected routes - Vendors
  { 
    path: '/vendor/dashboard', 
    element: <ProtectedRoute allowedRoles={['vendor']}><VendorDashboard /></ProtectedRoute> 
  },
  
  // Protected routes - Drivers
  { 
    path: '/driver/dashboard', 
    element: <ProtectedRoute allowedRoles={['driver']}><DriverDashboard /></ProtectedRoute> 
  },
  
  // Protected routes - Admin
  { 
    path: '/admin/dashboard', 
    element: <ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute> 
  },
]

export default routes