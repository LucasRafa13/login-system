import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`
        bg-white rounded-3xl shadow-2xl border border-gray-100
        w-full
        px-6 py-8 sm:px-10 sm:py-12
        transition-all
        ${className}
      `}
      style={{
        boxShadow:
          '0 6px 36px 0 rgb(0 0 0 / 0.06), 0 2px 12px 0 rgb(36 99 235 / 0.09)',
      }}
    >
      {children}
    </div>
  )
}
