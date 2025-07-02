import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'

import Logo from '@/components/Logo'
import Card from '@/components/Card'
import Input from '@/components/Input'
import Button from '@/components/Button'
import PasswordInput from '@/features/components/PasswordInput'
import { useAuth } from '@/hooks/useAuth'

const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
  })

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:5000/api/Auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error('Erro ao fazer login.')

      const { token } = await response.json()
      login(token)
    } catch (err) {
      alert('Credenciais inválidas.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-2">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full flex justify-center"
      >
        <Card className="w-full max-w-xl md:max-w-2xl lg:max-w-3xl">
          <div className="flex flex-col items-center gap-2 mb-8">
            <Logo width={200} height={54} />
            <span className="text-base text-gray-400 mt-1">
              Portal Paradigma
            </span>
          </div>
          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <Input
              label="E-mail"
              type="email"
              autoComplete="email"
              {...register('email')}
              error={errors.email?.message}
              placeholder="seuemail@dominio.com"
              required
            />
            <PasswordInput
              label="Senha"
              autoComplete="current-password"
              {...register('password')}
              error={errors.password?.message}
              placeholder="Sua senha"
              required
            />

            <Button
              type="submit"
              variant="primary"
              loading={loading}
              className="mt-3 w-full"
              disabled={loading}
            >
              Entrar
            </Button>
          </form>

          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-2">
            <Link
              to="/forgot-password"
              className="text-blue-600 hover:underline text-sm"
            >
              Esqueci minha senha
            </Link>
            <Link
              to="/register"
              className="text-blue-600 hover:underline text-sm"
            >
              Criar conta
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
