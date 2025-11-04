import { useState, useEffect, createContext, useContext } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { authService } from '../services/api/auth';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useLocalStorage('auth_token', null);
  const [userData, setUserData] = useLocalStorage('user_data', null);

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    if (token && userData) {
      try {
        // Verify token validity with backend
        const response = await authService.verifyToken(token);
        if (response.valid) {
          setUser(userData);
        } else {
          // Token is invalid, clear storage
          logout();
        }
      } catch (error) {
        console.error('Token verification failed:', error);
        logout();
      }
    }
    setLoading(false);
  };

  const login = async (email, password, role) => {
    try {
      setLoading(true);
      const response = await authService.login({ email, password, role });
      
      if (response.success) {
        const { token: newToken, user: userInfo } = response.data;
        
        setToken(newToken);
        setUserData(userInfo);
        setUser(userInfo);
        
        return { success: true, user: userInfo };
      } else {
        return { success: false, error: response.error };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await authService.register(userData);
      
      if (response.success) {
        return { success: true, message: response.message };
      } else {
        return { success: false, error: response.error };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Registration failed. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUserData(null);
    setUser(null);
    // Clear any other auth-related storage
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    localStorage.removeItem('cart_items');
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await authService.updateProfile(profileData, token);
      if (response.success) {
        setUser(response.data.user);
        setUserData(response.data.user);
        return { success: true, user: response.data.user };
      }
      return { success: false, error: response.error };
    } catch (error) {
      console.error('Profile update error:', error);
      return { success: false, error: 'Profile update failed' };
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      const response = await authService.changePassword(
        { currentPassword, newPassword },
        token
      );
      return response;
    } catch (error) {
      console.error('Password change error:', error);
      return { success: false, error: 'Password change failed' };
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    isAuthenticated: !!user && !!token,
    token
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};