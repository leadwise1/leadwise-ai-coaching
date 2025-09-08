"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md bg-primary px-2 py-1 text-xs font-medium text-primary-foreground",
        className
      )}
    >
      {children}
    </span>
  )
}