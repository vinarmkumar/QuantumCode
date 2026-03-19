const API_BASE_URL = import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'}`;

// Register a new user
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(userData)
    })

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.message || `Registration failed: ${response.status}`)
    }

    return data
  } catch (error) {
    console.error('Registration error:', error)
    throw error
  }
}

// Login user
export const loginUser = async (emailId, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ emailId, password })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || `Login failed: ${response.status}`)
    }

    return data
  } catch (error) {
    console.error('Login error:', error)
    throw error
  }
}

// Get user profile
export const getProfile = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/getProfile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch profile: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Get profile error:', error)
    throw error
  }
}

// Logout user
export const logoutUser = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || `Logout failed: ${response.status}`)
    }

    return data
  } catch (error) {
    console.error('Logout error:', error)
    throw error
  }
}

// Register as admin (first admin)
export const registerAdmin = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/admin/register/first`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ ...userData, role: 'admin' })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || `Admin registration failed: ${response.status}`)
    }

    return data
  } catch (error) {
    console.error('Admin registration error:', error)
    throw error
  }
}

// Login as admin
export const loginAdmin = async (emailId, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ emailId, password })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || `Admin login failed: ${response.status}`)
    }

    return data
  } catch (error) {
    console.error('Admin login error:', error)
    throw error
  }
}
