import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { LanguageProvider } from './contexts/LanguageContext'
import { CartProvider } from './contexts/CartContext'
import Header from './components/common/Header/Header'
import Footer from './components/common/Footer/Footer'
import routes from './routes'

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <CartProvider>
          <div className="app-container d-flex flex-column min-vh-100">
            <Header />
            <main className="flex-grow-1">
              <Routes>
                {routes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    element={route.element}
                  />
                ))}
              </Routes>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </LanguageProvider>
  )
}

export default App