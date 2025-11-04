import React, { createContext, useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/api/auth'
import { storageService } from '../services/storage/localStorage'

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
  const [token, setToken] = useState(storageService.getAuthToken() || null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // Helper to map backend user_type/user.role values to client-side role string
  const mapServerTypeToRole = (userOrType) => {
    const ROLE_MAP = {
      FARMER: 'farmer',
      VENDOR: 'vendor',
      DRIVER: 'driver',
      ADMIN: 'admin',
      STAFF: 'admin'
    }

    const serverType = userOrType && typeof userOrType === 'object'
      ? (userOrType.user_type || userOrType.userType || userOrType.role)
      : userOrType

    return ROLE_MAP[serverType] || (typeof serverType === 'string' ? serverType.toLowerCase() : null)
  }

  useEffect(() => {
    const initializeAuth = async () => {
      // Try to restore token and verify with backend
      const savedToken = storageService.getAuthToken()
      const savedUser = storageService.getUserData()

      if (savedToken) {
        try {
          const res = await authService.verifyToken(savedToken)
          // If backend returns user info, use it; otherwise fall back to savedUser
          const serverUser = res?.user || savedUser

          // Normalize user object: ensure `role` (lowercase) exists for client-side checks
          const mappedRole = mapServerTypeToRole(serverUser)
          const normalizedUser = serverUser ? { ...serverUser, role: mappedRole } : null

          setUser(normalizedUser)
          setToken(savedToken)
          storageService.setUserData(normalizedUser)
        } catch (err) {
          console.warn('Token verify failed, clearing saved auth:', err)
          storageService.removeAuthToken()
          storageService.removeUserData()
          setUser(null)
          setToken(null)
        }
      } else if (savedUser) {
        // If there's a saved user but no token, restore user (session may be client-side only)
        setUser(savedUser)
      }

      setLoading(false)
    }

    initializeAuth()
  }, [])

  const login = async (email, password, userType) => {
    try {
      setLoading(true)

      // Call backend login endpoint
      // Backend expects 'username' and optional 'user_type' in specific enum values.
      const payload = {
        username: email,
        password,
      }
      const res = await authService.login(payload)

      // Expecting res to include token(s) and user object
  const accessToken = res?.access_token || res?.token || res?.accessToken || res?.tokens?.access || res?.data?.access_token || res?.data?.token || res?.data?.tokens?.access
      const userData = res?.user || res?.data?.user || res?.data || res

      if (!accessToken || !userData) {
        throw new Error('Invalid login response from server')
      }

      // Normalize user object: ensure `role` (lowercase) exists for client-side checks
      const mappedRole = mapServerTypeToRole(userData)
      const normalizedUser = { ...userData, role: mappedRole }

      // Persist token and normalized user
      storageService.setAuthToken(accessToken)
      storageService.setUserData(normalizedUser)
      setToken(accessToken)
      setUser(normalizedUser)

      // Determine role from normalized user and route accordingly
      switch (normalizedUser.role) {
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

      // Try to extract a friendly message from structured backend errors.
      // apiClient attaches `body` to thrown errors when the server returned JSON.
      let friendly = 'Login failed. Please try again.'
      const body = error && error.body

      if (body) {
        // DRF / our backend returns { code: '...', message: '...' } or
        // { code: 'validation_error', errors: { field: ['msg'] } }
        if (typeof body === 'string') {
          friendly = body
        } else if (body.message) {
          friendly = body.message
        } else if (body.detail) {
          friendly = body.detail
        } else if (body.code === 'validation_error' && body.errors) {
          // Join all validation messages into a single string for display
          try {
            const msgs = Object.values(body.errors).flat().map(v => Array.isArray(v) ? v.join(' ') : String(v))
            friendly = msgs.join(' ')
          } catch (e) {
            friendly = JSON.stringify(body.errors)
          }
        } else {
          // Fallback to stringifying body
          friendly = JSON.stringify(body)
        }
      } else if (error && error.message) {
        friendly = error.message
      }

      return { success: false, error: friendly }
    } finally {
      setLoading(false)
    }
  }

  const logout = (options = { redirect: true }) => {
    setUser(null)
    localStorage.removeItem('agar_user')
    localStorage.removeItem('agar_cart')
    if (options && options.redirect !== false) {
      navigate('/')
    }
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
    const roleValue = user.role || (user.user_type ? user.user_type.toLowerCase() : null)
    return allowedRoles.includes(roleValue)
  }

  const value = {
    user,
    token,
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