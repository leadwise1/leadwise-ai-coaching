"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export function Button({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}