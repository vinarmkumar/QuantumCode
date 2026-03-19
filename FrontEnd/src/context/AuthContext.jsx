import { createContext, useState, useEffect } from 'react'
import { getProfile, logoutUser } from '../services/authService'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        const profile = await getProfile()
        setUser(profile)
        setError(null)
      } catch (err) {
        setUser(null)
        setError(null) // Don't show error if not logged in
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const logout = async () => {
    try {
      await logoutUser()
      setUser(null)
      setError(null)
    } catch (err) {
      setError(err.message)
    }
  }

  const login = (userData) => {
    setUser(userData)
    setError(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, setUser, logout, login }}>
      {children}
    </AuthContext.Provider>
  )
}
