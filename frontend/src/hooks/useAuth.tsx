import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type User = {
  id: number
  name: string
  email: string
}

export function useAuth() {
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const token = localStorage.getItem('token')

  const fetchUser = useCallback(async () => {
    if (!token) {
      setLoading(false)
      return
    }

    try {
      const res = await fetch('http://localhost:5000/api/Auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) throw new Error('Unauthorized')

      const data = await res.json()
      setUser(data)
    } catch (err) {
      console.error('Erro ao buscar usuário:', err)
      logout()
    } finally {
      setLoading(false)
    }
  }, [token])

  const login = useCallback(
    (token: string) => {
      localStorage.setItem('token', token)
      fetchUser().then(() => navigate('/home', { replace: true }))
    },
    [navigate, fetchUser],
  )

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    setUser(null)
    navigate('/', { replace: true })
  }, [navigate])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  return {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
  }
}
