import { BrowserRouter } from 'react-router-dom'
import AppRoutes from '@/routes/AppRoutes'

export default function App() {
  return (
    <BrowserRouter>
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <AppRoutes />
      </main>
    </BrowserRouter>
  )
}
