import { motion } from 'framer-motion'
import { useAuth } from '@/hooks/useAuth'
import { useEffect, useState } from 'react'
import { LogOut } from 'lucide-react'
import Logo from '@/components/Logo'

type User = {
  id: number
  name: string
  email: string
}

export default function HomePage() {
  const { logout } = useAuth()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return logout()

    fetch('http://localhost:5000/api/Auth/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('Não autenticado')
        const data = await res.json()
        setUser(data)
      })
      .catch(() => {
        logout()
      })
  }, [logout])

  return (
    <div
      className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col"
      data-testid="homepage-root"
    >
      {/* Barra Superior */}
      <header
        className="w-full shadow bg-white h-16 flex items-center px-6 justify-between sticky top-0 z-20"
        data-testid="homepage-header"
      >
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6, type: 'spring' }}
          className="flex items-center gap-2"
        >
          <Logo width={130} height={40} />
        </motion.div>
        <button
          onClick={logout}
          className="flex items-center gap-2 text-blue-600 font-semibold px-4 py-2 rounded-lg hover:bg-blue-50 transition"
          data-testid="homepage-logout"
        >
          <LogOut size={20} />
          Sair
        </button>
      </header>

      {/* Conteúdo principal */}
      <main
        className="flex-1 flex flex-col w-full px-4 py-8"
        data-testid="homepage-main"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7, type: 'spring' }}
          className="flex flex-col items-center gap-2 mb-8"
          data-testid="homepage-logo-wrapper"
        >
          <Logo width={200} height={54} className="drop-shadow-xl" />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="text-xl font-bold text-blue-700 tracking-tight"
          >
            Seja bem-vindo{user ? `, ${user.name.split(' ')[0]}` : ''}!
          </motion.span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="max-w-xl w-full bg-white rounded-2xl shadow px-8 py-8 text-center mx-auto"
          data-testid="homepage-card"
        >
          <div className="mb-3 text-gray-700 text-lg font-semibold">
            Projeto simples que desenvolvi em 2 dias para mostrar minhas
            habilidades com frontend e backend em C#!
          </div>
          <div className="mb-5 text-gray-500">
            {user?.email
              ? `Logado como: ${user.email}`
              : 'Esperando autenticação...'}
          </div>
          <div className="mt-4">
            <span className="block font-semibold text-gray-700 mb-2">
              Tecnologias utilizadas:
            </span>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              <TechBadge>React.js</TechBadge>
              <TechBadge>Typescript</TechBadge>
              <TechBadge>Tailwindcss</TechBadge>
              <TechBadge>Vite</TechBadge>
              <TechBadge>C#</TechBadge>
              <TechBadge>Docker</TechBadge>
              <TechBadge>MS SQL Server</TechBadge>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

function TechBadge({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 font-semibold rounded-lg text-sm shadow-sm hover:bg-blue-200 transition">
      {children}
    </span>
  )
}
