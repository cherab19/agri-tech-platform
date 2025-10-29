import React, { createContext, useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // Check for stored user session on app load
    const storedUser = localStorage.getItem('agar_user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Error parsing stored user:', error)
        localStorage.removeItem('agar_user')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password, userType) => {
    try {
      setLoading(true)
      
      // Simulate API call - replace with actual authentication
      const mockUsers = {
        farmer: {
          id: 1,
          name: 'Farmers Cooperative Rep',
          email: email,
          role: 'farmer',
          cooperative: 'Green Valley Farmers',
          region: 'Oromia'
        },
        vendor: {
          id: 2,
          name: 'Vendors Cooperative Rep',
          email: email,
          role: 'vendor',
          cooperative: 'City Market Vendors',
          region: 'Addis Ababa'
        },
        driver: {
          id: 3,
          name: 'Truck Driver',
          email: email,
          role: 'driver',
          vehicle: 'Toyota Truck - A1234',
          region: 'Multiple Regions'
        },
        admin: {
          id: 4,
          name: 'System Administrator',
          email: email,
          role: 'admin',
          permissions: ['all']
        }
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      const userData = mockUsers[userType]
      if (!userData) {
        throw new Error('Invalid user type')
      }

      setUser(userData)
      localStorage.setItem('agar_user', JSON.stringify(userData))

      // Redirect based on user role
      switch (userType) {
        case 'farmer':
          navigate('/farmer/dashboard')
          break
        case 'vendor':
          navigate('/vendor/dashboard')
          break
        case 'driver':
          navigate('/driver/dashboard')
          break
        case 'admin':
          navigate('/admin/dashboard')
          break
        default:
          navigate('/')
      }

      return { success: true }
    } catch (error) {
      console.error('Login error:', error)
      return { 
        success: false, 
        error: error.message || 'Login failed. Please try again.' 
      }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('agar_user')
    localStorage.removeItem('agar_cart')
    navigate('/')
  }

  const updateUser = (updatedUserData) => {
    setUser(prevUser => {
      const newUser = { ...prevUser, ...updatedUserData }
      localStorage.setItem('agar_user', JSON.stringify(newUser))
      return newUser
    })
  }

  const hasRole = (allowedRoles) => {
    if (!user) return false
    return allowedRoles.includes(user.role)
  }

  const value = {
    user,
    loading,
    login,
    logout,
    updateUser,
    hasRole,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext