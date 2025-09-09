"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface SpotlightProps extends React.HTMLAttributes<HTMLDivElement> {
  fill?: string
}

export const Spotlight = React.forwardRef<HTMLDivElement, SpotlightProps>(
  ({ className, fill = "white", ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute pointer-events-none select-none", className)}
      {...props}
    >
      <svg
        width="400"
        height="400"
        viewBox="0 0 400 400"
        className="opacity-30 blur-3xl"
      >
        <circle cx="200" cy="200" r="200" fill={fill} />
      </svg>
    </div>
  )
)
Spotlight.displayName = "Spotlight"