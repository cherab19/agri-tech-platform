import React from 'react'
import { useAuth } from '../../../contexts/AuthContext'

const RoleBasedAccess = ({ children, allowedRoles = [], fallback = null }) => {
  const { hasRole } = useAuth()

  if (!hasRole(allowedRoles)) {
    return fallback
  }

  return children
}

export default RoleBasedAccess