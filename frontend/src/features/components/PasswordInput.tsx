import { useState, forwardRef } from 'react'
import type { InputHTMLAttributes, Ref } from 'react'
import { Eye, EyeOff } from 'lucide-react'

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const PasswordInput = forwardRef(
  (
    { label, error, className = '', ...props }: PasswordInputProps,
    ref: Ref<HTMLInputElement>,
  ) => {
    const [visible, setVisible] = useState(false)
    return (
      <div className="flex flex-col gap-1 w-full">
        {label && (
          <label className="text-sm font-medium text-gray-700 mb-1 select-none">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          <input
            ref={ref}
            className={`
              w-full h-12 px-4 pr-10 rounded-lg border
              outline-none transition-colors
              text-lg
              ${
                error
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:border-blue-600'
              }
              bg-white
              ${className}
            `}
            type={visible ? 'text' : 'password'}
            {...props}
          />
          <button
            type="button"
            tabIndex={-1}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? 'Ocultar senha' : 'Mostrar senha'}
          >
            {visible ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {error && (
          <span className="text-xs text-red-500 mt-1 font-medium">{error}</span>
        )}
      </div>
    )
  },
)
PasswordInput.displayName = 'PasswordInput'
export default PasswordInput
