'use client'

import { useEffect, useRef, useState } from 'react'
import { Sparkles, Brain, Cpu } from 'lucide-react'

interface AIAnimationProps {
  interactive?: boolean
  width?: string | number
  height?: string | number
}

export default function AIAnimation({ 
  interactive = true, 
  width = '100%', 
  height = '600px' 
}: AIAnimationProps) {
  const container = useRef<HTMLDivElement>(null)
  const [animationLoaded, setAnimationLoaded] = useState(false)
  const [showFallback, setShowFallback] = useState(false)

  useEffect(() => {
    let anim: any
    let lottie: any

    const loadAnimation = async () => {
      try {
        lottie = (await import('lottie-web')).default

        if (!container.current) return

        anim = lottie.loadAnimation({
          container: container.current,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: '/ai-animation.json',
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
          },
        })

        anim.addEventListener('DOMLoaded', () => setAnimationLoaded(true))
        anim.addEventListener('data_failed', () => setShowFallback(true))

        if (interactive) {
          const interactivity = await import('@lottiefiles/lottie-interactivity')
          interactivity.create({
            player: anim,
            mode: 'cursor',
            actions: [{ type: 'seek', frames: [0, anim.totalFrames || 60] }],
          })
        }
      } catch (error) {
        console.warn('Failed to load Lottie animation:', error)
        setShowFallback(true)
      }
    }

    loadAnimation()

    return () => {
      if (anim) anim.destroy()
    }
  }, [interactive])

  const FallbackAnimation = () => (
    <div 
      className="flex items-center justify-center relative overflow-hidden cursor-pointer"
      style={{ width, height }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20" />
      
      <div className="relative z-10 flex items-center justify-center space-x-8">
        <div className="animate-bounce"><Brain className="w-16 h-16 text-blue-500" /></div>
        <div className="animate-bounce"><Sparkles className="w-24 h-24 text-purple-500" /></div>
        <div className="animate-bounce"><Cpu className="w-16 h-16 text-blue-500" /></div>
      </div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-40 h-40 border-4 border-blue-200 rounded-full animate-ping" />
        <div className="absolute top-4 left-4 w-32 h-32 border-4 border-purple-200 rounded-full animate-ping" />
      </div>

      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        />
      ))}

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-sm font-medium text-muted-foreground">
          AI-Powered Resume Builder
        </p>
      </div>
    </div>
  )

  if (showFallback) return <FallbackAnimation />

  return (
    <div 
      style={{ width, height, margin: '0 auto', position: 'relative', cursor: interactive ? 'pointer' : 'default', pointerEvents: 'all' }}
    >
      <div ref={container} style={{ width: '100%', height: '100%' }} />
      {!animationLoaded && <FallbackAnimation />}
    </div>
  )
}