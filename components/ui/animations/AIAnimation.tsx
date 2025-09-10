'use client'

import { useEffect, useRef } from 'react'
import lottie from 'lottie-web'
import { create } from '@lottiefiles/lottie-interactivity'

interface AIAnimationProps {
  interactive?: boolean
  width?: string | number
  height?: string | number
}

export default function AIAnimation({ interactive = true, width = '100%', height = '400px' }: AIAnimationProps) {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!container.current) return

    const anim = lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: !interactive,
      autoplay: !interactive,
      path: '/ai-animation.json', // must exist in public folder
    })

    if (interactive) {
      create({
        player: anim,
        mode: 'cursor',
        actions: [
          {
            type: 'seek',
            frames: [0, 60], // adjust to match JSON
          },
        ],
      })
    }

    return () => anim.destroy()
  }, [interactive])

  return <div ref={container} style={{ width, height, margin: '0 auto' }} />
}