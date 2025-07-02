import type { ReactNode, FormEventHandler } from 'react'

interface AuthFormProps {
  title?: string
  subtitle?: string
  children: ReactNode
  onSubmit: FormEventHandler<HTMLFormElement>
  footer?: ReactNode
  loading?: boolean
}

export default function AuthForm({
  title,
  subtitle,
  children,
  onSubmit,
  footer,
  loading = false,
}: AuthFormProps) {
  return (
    <form
      className="flex flex-col gap-5 w-full"
      onSubmit={onSubmit}
      noValidate
      autoComplete="off"
    >
      {(title || subtitle) && (
        <div className="mb-2">
          {title && (
            <h2 className="text-2xl font-bold text-center text-blue-700">
              {title}
            </h2>
          )}
          {subtitle && (
            <div className="text-gray-400 text-center text-base mt-1">
              {subtitle}
            </div>
          )}
        </div>
      )}
      {children}
      {footer && <div className="mt-6">{footer}</div>}
    </form>
  )
}
