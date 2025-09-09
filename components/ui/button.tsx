// components/ui/button.tsx
import * as React from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost'
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg'
  variant?: ButtonVariant
}

const variantClassMap: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
  secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
  outline: 'border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-300',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-300',
}

const sizeClassMap: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ size = 'md', variant = 'primary', className = '', ...props }, ref) => {
    const variantClass = variantClassMap[variant] || variantClassMap.primary
    const sizeClass = sizeClassMap[size] || sizeClassMap.md
    return (
      <button
        ref={ref}
        className={`rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${sizeClass} ${variantClass} ${className}`.trim()}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'