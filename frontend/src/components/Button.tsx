import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

type Variant = 'primary' | 'secondary' | 'outline'

interface ButtonProps extends MotionProps {
  children: ReactNode
  variant?: Variant
  loading?: boolean
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type']
  disabled?: boolean
  className?: string
}

const baseStyles =
  'inline-flex items-center justify-center gap-2 px-6 py-2 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 disabled:opacity-60 disabled:pointer-events-none'

const variants: Record<Variant, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-gray-100 text-blue-600 hover:bg-gray-200',
  outline: 'border border-blue-600 text-blue-600 bg-white hover:bg-blue-50',
}

import type { MotionProps } from 'framer-motion'
export default function Button({
  children,
  variant = 'primary',
  loading = false,
  type = 'button',
  disabled = false,
  className,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      type={type}
      whileTap={{ scale: 0.97 }}
      className={`${baseStyles} ${variants[variant]} ${className ?? ''}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="animate-spin w-4 h-4" />}
      {children}
    </motion.button>
  )
}
