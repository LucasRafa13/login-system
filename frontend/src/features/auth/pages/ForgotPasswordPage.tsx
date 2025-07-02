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

const forgotSchema = z.object({
  email: z.string().email('E-mail inválido'),
})

type ForgotFormValues = z.infer<typeof forgotSchema>

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotFormValues>({
    resolver: zodResolver(forgotSchema),
    mode: 'onTouched',
  })

  const onSubmit = async (data: ForgotFormValues) => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setLoading(false)
    setSent(true)
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
              Recuperar senha
            </span>
          </div>

          {!sent ? (
            <form
              className="flex flex-col gap-5 w-full"
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

              <Button
                type="submit"
                variant="primary"
                loading={loading}
                className="mt-3 w-full h-12 text-lg"
                disabled={loading}
              >
                Enviar link de recuperação
              </Button>
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="text-green-600 font-bold mb-2">
                Verifique seu e-mail!
              </div>
              <div className="text-gray-500 text-sm">
                Se existir uma conta com este e-mail, você receberá as
                instruções para redefinir sua senha.
              </div>
            </div>
          )}

          <div className="flex justify-center items-center mt-6">
            <Link to="/" className="text-blue-600 hover:underline text-sm">
              Voltar para o login
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
