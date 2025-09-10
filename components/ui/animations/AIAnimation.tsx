'use client'

import { useEffect, useRef, useState } from 'react'
import { Sparkles, Zap, Brain, Cpu } from 'lucide-react'

interface AIAnimationProps {
  interactive?: boolean
  width?: string | number
  height?: string | number
}

export default function AIAnimation({ 
  interactive = true, 
  width = '100%', 
  height = '400px' 
}: AIAnimationProps) {
  const container = useRef<HTMLDivElement>(null)
  const [animationLoaded, setAnimationLoaded] = useState(false)
  const [showFallback, setShowFallback] = useState(false)

  useEffect(() => {
    let lottie: any
    let anim: any

    const loadAnimation = async () => {
      try {
        // Dynamically import lottie to avoid SSR issues
        lottie = await import('lottie-web')
        
        if (!container.current) return

        anim = lottie.default.loadAnimation({
          container: container.current,
          renderer: 'svg',
          loop: !interactive,
          autoplay: !interactive,
          path: '/ai-animation.json',
        })

        anim.addEventListener('DOMLoaded', () => {
          setAnimationLoaded(true)
        })

        anim.addEventListener('data_failed', () => {
          console.warn('Lottie animation failed to load, showing fallback')
          setShowFallback(true)
        })

        // Add interactivity if needed
        if (interactive && animationLoaded) {
          try {
            const { create } = await import('@lottiefiles/lottie-interactivity')
            create({
              player: anim,
              mode: 'cursor',
              actions: [
                {
                  type: 'seek',
                  frames: [0, 60],
                },
              ],
            })
          } catch (error) {
            console.warn('Lottie interactivity failed to load:', error)
          }
        }

      } catch (error) {
        console.warn('Failed to load Lottie animation:', error)
        setShowFallback(true)
      }
    }

    // Add a small delay to ensure DOM is ready
    const timer = setTimeout(loadAnimation, 100)

    return () => {
      clearTimeout(timer)
      if (anim) {
        anim.destroy()
      }
    }
  }, [interactive, animationLoaded])

  // Fallback CSS Animation Component
  const FallbackAnimation = () => (
    <div 
      className="flex items-center justify-center relative overflow-hidden"
      style={{ width, height }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20" />
      
      {/* Floating Icons */}
      <div className="relative z-10 flex items-center justify-center space-x-8">
        <div className="animate-bounce" style={{ animationDelay: '0s' }}>
          <Brain className="w-12 h-12 text-blue-500" />
        </div>
        <div className="animate-bounce" style={{ animationDelay: '0.2s' }}>
          <Sparkles className="w-16 h-16 text-purple-500" />
        </div>
        <div className="animate-bounce" style={{ animationDelay: '0.4s' }}>
          <Cpu className="w-12 h-12 text-blue-500" />
        </div>
      </div>

      {/* Pulsing Circles */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-32 h-32 border-4 border-blue-200 rounded-full animate-ping" />
        <div className="absolute top-4 left-4 w-24 h-24 border-4 border-purple-200 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
      </div>

      {/* Floating Particles */}
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

      {/* Central Text */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-sm font-medium text-muted-foreground">
          AI-Powered Resume Builder
        </p>
      </div>
    </div>
  )

  // Show fallback if animation failed to load or if the JSON is empty
  if (showFallback) {
    return <FallbackAnimation />
  }

  return (
    <div style={{ width, height, margin: '0 auto' }}>
      <div ref={container} style={{ width: '100%', height: '100%' }} />
      {/* Show fallback if animation container is empty after a delay */}
      {!animationLoaded && (
        <div className="absolute inset-0">
          <FallbackAnimation />
        </div>
      )}
    </div>
  )
}