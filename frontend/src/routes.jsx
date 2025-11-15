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
import ProductAdd from './pages/farmers/ProductAdd'
import OrdersPage from './pages/farmers/OrdersPage'
import AnalyticsPage from './pages/farmers/AnalyticsPage'
import ProductsPage from './pages/farmers/ProductsPage'
import VendorDashboard from './pages/vendors/VendorDashboard'
import VendorMarketplace from './pages/vendors/Marketplace'
import QuickOrder from './pages/vendors/QuickOrder'
import TrackingPage from './pages/vendors/TrackingPage'
import VendorSettings from './pages/vendors/Settings'
import ProductDetail from './pages/products/ProductDetail'
import DriverDashboard from './pages/drivers/DriverDashboard'
import AdminDashboard from './pages/admin/AdminDashboard'
import ProfilePage from './pages/ProfilePage'
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
  { path: '/product/:id', element: <ProductDetail /> },
  
  // Protected routes - Farmers
  { 
    path: '/farmer/dashboard', 
    element: <ProtectedRoute allowedRoles={['farmer']}><FarmerDashboard /></ProtectedRoute> 
  },
  { path: '/farmer/orders', element: <ProtectedRoute allowedRoles={['farmer']}><OrdersPage /></ProtectedRoute> },
  { path: '/farmer/products', element: <ProtectedRoute allowedRoles={['farmer']}><ProductsPage /></ProtectedRoute> },
  { path: '/farmer/products/add', element: <ProtectedRoute allowedRoles={['farmer']}><ProductAdd /></ProtectedRoute> },
  { path: '/farmer/analytics', element: <ProtectedRoute allowedRoles={['farmer']}><AnalyticsPage /></ProtectedRoute> },
  
  // Protected routes - Vendors
  { 
    path: '/vendor/dashboard', 
    element: <ProtectedRoute allowedRoles={['vendor']}><VendorDashboard /></ProtectedRoute> 
  },
  {
    path: '/vendor/quick-order',
    element: <ProtectedRoute allowedRoles={['vendor']}><QuickOrder /></ProtectedRoute>
  },
  {
    path: '/vendor/marketplace',
    element: <ProtectedRoute allowedRoles={['vendor']}><VendorMarketplace /></ProtectedRoute>
  },
  {
    path: '/vendor/settings',
    element: <ProtectedRoute allowedRoles={['vendor']}><VendorSettings /></ProtectedRoute>
  },
  {
    path: '/vendor/tracking',
    element: <ProtectedRoute allowedRoles={['vendor']}><TrackingPage /></ProtectedRoute>
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
  { path: '/profile', element: <ProtectedRoute><ProfilePage /></ProtectedRoute> },
]

export default routes