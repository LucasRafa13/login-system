import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from '@/features/auth/pages/LoginPage'
import RegisterPage from '@/features/auth/pages/RegisterPage'
import ForgotPasswordPage from '@/features/auth/pages/ForgotPasswordPage'
import HomePage from '@/features/home/HomePage'
import AuthGuard from './AuthGuard.tsx'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route
        path="/home"
        element={
          <AuthGuard>
            <HomePage />
          </AuthGuard>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
