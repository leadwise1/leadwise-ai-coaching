'use client'

import { Card } from '@/components/ui/card'
import { Sparkles } from 'lucide-react'

export function SplineSceneBasic() {
  return (
    <Card className="w-full min-h-[500px] md:h-[500px] lg:h-[600px] relative overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
      {/* Optional subtle background overlay */}
      <div className="absolute inset-0 opacity-20 bg-gradient-to-tr from-primary to-primary/20 backdrop-blur-sm"></div>

      {/* MP4 AI animation */}
      <video
        src="/image/ai.mp4"
        autoPlay
        loop
        muted
        className="w-full h-full object-contain relative z-10"
      />

      {/* Overlay headline */}
      <div className="absolute z-20 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
          Empowering Individuals
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Using AI to help individuals build resumes, explore career paths, and unlock their professional potential.
        </p>
        <div className="mt-6 flex justify-center">
          <button className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold hover:bg-primary/90 flex items-center gap-2 transition-colors duration-200">
            <Sparkles className="w-5 h-5" /> Get Started
          </button>
        </div>
      </div>
    </Card>
  )
}