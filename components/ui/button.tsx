import React from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ai'
  icon?: React.ReactNode
  loading?: boolean
  color?: string
}

const sizeClassMap: Record<string, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-5 py-3 text-lg',
}

const spinnerSizeMap: Record<string, string> = {
  sm: 'w-4 h-4 border-2',
  md: 'w-5 h-5 border-2',
  lg: 'w-6 h-6 border-4',
}

const variantClassMap: Record<string, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
  secondary: 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-400',
  tertiary: 'bg-transparent text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
  ai: 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white hover:shadow-[0_0_8px_2px_rgba(255,105,180,0.7)] transition-shadow duration-300 ease-in-out',
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ size = 'md', variant = 'primary', icon, loading = false, className = '', color, children, ...props }, ref) => {
    const variantClass = color
      ? `bg-[${color}] text-white hover:brightness-90 transition duration-200 ease-in-out`
      : variant === 'ai'
        ? variantClassMap.ai
        : variantClassMap[variant]

    const sizeClass = sizeClassMap[size] || sizeClassMap.md
    const spinnerSizeClass = spinnerSizeMap[size] || spinnerSizeMap.md

    const isDisabled = loading || props.disabled
    const cursorClass = isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'

    const gapValue = loading && icon ? '1' : '2'

    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center gap-${gapValue} rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${sizeClass} ${variantClass} ${cursorClass} ${loading ? 'opacity-70' : ''} ${className}`.trim()}
        disabled={isDisabled}
        aria-busy={loading}
        {...props}
      >
        {/* Spinner */}
        {loading && (
          <span className={`animate-spin ${spinnerSizeClass} border-white border-t-transparent rounded-full`} />
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