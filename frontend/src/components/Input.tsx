import type { InputHTMLAttributes, ReactNode, Ref } from 'react'
import { forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  leftIcon?: ReactNode
}

const Input = forwardRef(
  (
    { label, error, leftIcon, className = '', ...props }: InputProps,
    ref: Ref<HTMLInputElement>,
  ) => (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label
          htmlFor={props.id}
          className="text-sm font-medium text-gray-700 mb-1 select-none"
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {leftIcon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            {leftIcon}
          </span>
        )}
        <input
          ref={ref}
          className={`
    w-full h-12 px-4 py-2 pr-3 rounded-lg border
    outline-none transition-colors
    text-lg
    ${leftIcon ? 'pl-10' : ''}
    ${
      error
        ? 'border-red-500 focus:border-red-500'
        : 'border-gray-300 focus:border-blue-600'
    }
    bg-white
    ${className}
  `}
          {...props}
        />
      </div>
      {error && (
        <span className="text-xs text-red-500 mt-1 font-medium">{error}</span>
      )}
    </div>
  ),
)

Input.displayName = 'Input'
export default Input
