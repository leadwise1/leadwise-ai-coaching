import * as React from "react"
import { cn } from "@/lib/utils"

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outline' | 'secondary' // add your variants here
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'defaupnpm lt', children, ...props }, ref) => {
    const base = "inline-flex items-center px-2 py-1 rounded text-sm font-medium"
    const variantClass = variant === 'outline' ? "border border-current" : ""
    return (
      <div ref={ref} className={cn(base, variantClass, className)} {...props}>
        {children}
      </div>
    )
  }
)
Badge.displayName = "Badge"
export { Badge }