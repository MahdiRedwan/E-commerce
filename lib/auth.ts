export interface User {
  id: string
  email: string
  name: string
  role: string
  createdAt: string
}

// Save token to localStorage
export function setToken(token: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', token)
  }
}

// Get token from localStorage
export function getToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token')
  }
  return null
}

// Remove token (logout)
export function removeToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token')
  }
}

// Get user from localStorage
export function getStoredUser(): User | null {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('auth_user')
    if (user) {
      try {
        return JSON.parse(user)
      } catch {
        return null
      }
    }
  }
  return null
}

// Save user to localStorage
export function setStoredUser(user: User) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_user', JSON.stringify(user))
  }
}

// Clear user from localStorage
export function clearStoredUser() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_user')
  }
}