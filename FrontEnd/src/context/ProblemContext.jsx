import React, { createContext, useState, useEffect, useCallback } from 'react'
import { getAllProblems } from '../services/problemApi'

export const ProblemContext = createContext()

export function ProblemProvider({ children }) {
  const [problems, setProblems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Fetch all problems from backend
  const fetchProblems = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getAllProblems()
      setProblems(data || [])
      console.log('Problems fetched:', data)
    } catch (err) {
      console.error('Error fetching problems:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  // Add new problem to list (called after creation)
  const addProblem = useCallback((newProblem) => {
    setProblems(prev => [newProblem, ...prev])
  }, [])

  // Refresh problems list
  const refreshProblems = useCallback(() => {
    fetchProblems()
  }, [fetchProblems])

  // Initial fetch on mount
  useEffect(() => {
    fetchProblems()
  }, [fetchProblems])

  return (
    <ProblemContext.Provider value={{
      problems,
      loading,
      error,
      fetchProblems,
      addProblem,
      refreshProblems
    }}>
      {children}
    </ProblemContext.Provider>
  )
}

// Custom hook to use Problem context
export function useProblems() {
  const context = React.useContext(ProblemContext)
  if (!context) {
    throw new Error('useProblems must be used within ProblemProvider')
  }
  return context
}
