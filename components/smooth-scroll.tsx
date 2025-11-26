'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

interface SmoothScrollProps {
  children: React.ReactNode
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Initialize Lenis with premium settings
    lenisRef.current = new Lenis({
      lerp: 0.08, // Very smooth, luxury feel (0.05-0.1 range)
      duration: 1.5, // Duration of the scroll animation
      smoothWheel: true, // Enable smooth scrolling for mouse wheel
      wheelMultiplier: 1, // Scroll speed multiplier
      touchMultiplier: 2, // Touch scroll multiplier for mobile
      infinite: false, // Disable infinite scrolling
    })

    // RAF loop for Lenis
    function raf(time: number) {
      lenisRef.current?.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Cleanup on unmount
    return () => {
      lenisRef.current?.destroy()
    }
  }, [])

  return <>{children}</>
}
