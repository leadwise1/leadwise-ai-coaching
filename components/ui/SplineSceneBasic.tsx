'use client'

import { Card } from '@/components/ui/card'
import Lottie from 'react-lottie-player'
import { Sparkles } from 'lucide-react'
import { use } from 'react'

export function SplineSceneBasic() {
  return (
    <Card className="w-full h-[500px] relative overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
      {/* Optional subtle background overlay */}
      <div className="absolute inset-0 opacity-20 bg-gradient-to-tr from-primary to-primary/20"></div>

      {/* Lottie AI animation */}
      <Lottie
        loop
        play
        animationData={require('/ai-animation.json')} // pulls from /public/ai-animation.json
        className="w-full h-full object-contain relative z-10"
      />

      {/* Overlay headline */}
      <div className="absolute z-20 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
          Empowering Individuals
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Using AI to remove barriers and amplify impact for nonprofits and small businesses.
        </p>
        <div className="mt-6 flex justify-center">
          <button className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold hover:bg-primary/90 flex items-center gap-2">
            <Sparkles className="w-5 h-5" /> Get Started
          </button>
        </div>
      </div>
    </Card>
  )
}