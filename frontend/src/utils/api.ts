// src/utils/api.ts
const API_BASE_URL = 'http://localhost:5000/api'

export const login = async (email: string, password: string) => {
  const res = await fetch(`${API_BASE_URL}/Auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.message || 'Erro ao fazer login')
  }

  return res.json() // { token, user }
}

export const register = async (
  name: string,
  email: string,
  password: string,
) => {
  const res = await fetch(`${API_BASE_URL}/Auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  })

  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.message || 'Erro ao registrar usuário')
  }

  return res.json()
}

export const getMe = async (token: string) => {
  const res = await fetch(`${API_BASE_URL}/Auth/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    throw new Error('Não autorizado')
  }

  return res.json() // { id, name, email }
}
