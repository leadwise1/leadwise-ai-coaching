import * as React from "react"
import { cn } from "@/lib/utils"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: "sm" | "md" | "lg"
  variant?: "default" | "outline" | "ghost"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, size = "md", variant = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
          size === "sm" && "px-2 py-1 text-sm",
          size === "md" && "px-4 py-2 text-md",
          size === "lg" && "px-6 py-3 text-lg",
          variant === "outline" && "border border-gray-300",
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }