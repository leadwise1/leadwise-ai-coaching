"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SplineSceneBasic } from "@/components/ui/SplineSceneBasic"

export default function PlaygroundPage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative h-[600px] w-full flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <SplineSceneBasic /> {/* 3D scene in hero */}
        <div className="absolute z-10 text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4">LeadWise AI Playground</h1>
          <p className="text-xl mb-6 max-w-xl mx-auto">
            Experience AI-powered career guidance like never before.
          </p>
          <Button size="lg">Get Started</Button>
        </div>
      </section>

      {/* Example UI Components */}
      <section className="px-8 space-y-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">Badge</h2>
          <Badge>New</Badge>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-2">Button</h2>
          <Button size="lg">Click me</Button>
        </div>
      </section>
    </div>
  )
}