'use client'

import Lottie from 'lottie-react'

export default function AIAnimation() {
  return (
    <Lottie
      animationData="/animation.json"
      loop={true}
      autoplay={true}
      style={{
        width: '100%',
        height: '56.25vw',
        maxHeight: '500px',
        borderRadius: '8px',
        display: 'block',
      }}
    />
  )
}