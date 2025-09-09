'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<'input'>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn('w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-primary', className)}
    {...props}
  />
))
Input.displayName = 'Input'