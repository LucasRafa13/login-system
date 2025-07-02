import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'

import Logo from '@/components/Logo'
import Card from '@/components/Card'
import Input from '@/components/Input'
import Button from '@/components/Button'
import PasswordInput from '@/features/components/PasswordInput'

const registerSchema = z
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

type RegisterFormValues = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: 'onTouched',
  })

  const onSubmit = async (data: RegisterFormValues) => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:5000/api/Auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      })

      if (!response.ok) throw new Error('Erro ao registrar.')

      navigate('/')
    } catch (err) {
      alert('Erro ao criar conta.')
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
              Criar conta no Portal Paradigma
            </span>
          </div>
          <form
            className="flex flex-col gap-5 w-full"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <Input
              label="Nome"
              type="text"
              {...register('name')}
              error={errors.name?.message}
              placeholder="Seu nome completo"
              required
            />
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
              autoComplete="new-password"
              {...register('password')}
              error={errors.password?.message}
              placeholder="Crie uma senha"
              required
            />
            <PasswordInput
              label="Confirmar senha"
              autoComplete="new-password"
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
              placeholder="Repita sua senha"
              required
            />

            <Button
              type="submit"
              variant="primary"
              loading={loading}
              className="mt-3 w-full h-12 text-lg"
              disabled={loading}
            >
              Criar conta
            </Button>
          </form>

          <div className="flex justify-center items-center mt-6">
            <Link to="/" className="text-blue-600 hover:underline text-sm">
              Já tem conta? Entrar
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
