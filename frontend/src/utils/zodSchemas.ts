import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
})

export const registerSchema = z
  .object({
    name: z.string().min(3, 'Nome obrigatório'),
    email: z.string().email('E-mail inválido'),
    password: z.string().min(6, 'Mínimo 6 caracteres'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

export const forgotSchema = z.object({
  email: z.string().email('E-mail inválido'),
})
