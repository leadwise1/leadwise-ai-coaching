// components/ui/badge.tsx
import * as React from 'react'

export type BadgeVariant = 'default' | 'destructive' | 'success' | 'warning' | 'secondary'

export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg'

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant
  size?: BadgeSize
  className?: string
  icon?: React.ReactNode
}

const variantClassMap: Record<BadgeVariant, string> = {
  default: 'bg-gray-100 text-gray-800',
  destructive: 'bg-red-100 text-red-800',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  secondary: 'bg-blue-100 text-blue-800',
}

const sizeClassMap: Record<BadgeSize, string> = {
  xs: 'text-[10px] px-1 py-0.5',
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-2.5 py-0.5',
  lg: 'text-base px-3 py-1',
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ variant = 'default', size = 'md', icon, className = '', children, ...props }, ref) => {
    const variantClass = variantClassMap[variant] || variantClassMap.default
    const sizeClass = sizeClassMap[size] || sizeClassMap.md

    return (
      <div
        ref={ref}
        className={`inline-flex items-center gap-1 rounded-full font-medium ${variantClass} ${sizeClass} ${className}`.trim()}
        {...props}
      >
        {icon && <span className="flex items-center">{icon}</span>}
        <span>{children}</span>
      </div>
    )
  }
)

Badge.displayName = 'Badge'