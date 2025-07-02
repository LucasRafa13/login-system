import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

export function useAuth() {
  const navigate = useNavigate()

  const login = useCallback(
    (token: string) => {
      localStorage.setItem('token', token)
      navigate('/home', { replace: true })
    },
    [navigate],
  )

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    navigate('/', { replace: true })
  }, [navigate])

  const isAuthenticated = !!localStorage.getItem('token')

  return { login, logout, isAuthenticated }
}
