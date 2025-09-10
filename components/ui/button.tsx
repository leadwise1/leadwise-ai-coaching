// components/ui/button.tsx
import * as React from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize
  variant?: ButtonVariant
  icon?: React.ReactNode
  loading?: boolean
  className?: string
  color?: string // optional custom background color
}

const variantClassMap: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
  secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
  outline: 'border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-300',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-300',
}

const sizeClassMap: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ size = 'md', variant = 'primary', icon, loading = false, className = '', color, children, ...props }, ref) => {
    const variantClass = color ? `bg-[${color}] text-white hover:brightness-90` : variantClassMap[variant]
    const sizeClass = sizeClassMap[size] || sizeClassMap.md

    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center gap-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${sizeClass} ${variantClass} ${className} ${loading ? 'opacity-70 cursor-not-allowed' : ''}`.trim()}
        disabled={loading || props.disabled}
        aria-busy={loading}
        {...props}
      >
        {/* Spinner */}
        {loading && (
          <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"/>
        )}
        {/* Icon + children */}
        {icon && (
          <span className={`flex items-center ${loading ? 'opacity-50' : ''}`}>
            {icon}
          </span>
        )}
        <span>{children}</span>
      </button>
    )
  }
)

Button.displayName = 'Button'