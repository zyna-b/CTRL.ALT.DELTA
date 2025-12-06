"use client"

import { useEffect, useRef } from "react"

interface InteractiveHeroBackgroundProps {
  className?: string
}

export function InteractiveHeroBackground({ className = "" }: InteractiveHeroBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })
  const autoAnimRef = useRef({ x: 0, y: 0, time: 0 })
  const lastMouseMoveRef = useRef(Date.now())

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Grid settings
    const gridSize = 40
    const dotRadius = 1.5
    const spotlightRadius = 300

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX
      mouseRef.current.targetY = e.clientY
      lastMouseMoveRef.current = Date.now()
    }
    window.addEventListener("mousemove", handleMouseMove)

    // Auto-animation function (breathing/drifting effect)
    const getAutoPosition = (width: number, height: number) => {
      const time = autoAnimRef.current.time
      const centerX = width / 2
      const centerY = height / 2
      const driftRadius = 150

      return {
        x: centerX + Math.sin(time * 0.3) * driftRadius,
        y: centerY + Math.cos(time * 0.5) * driftRadius,
      }
    }

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Check if mouse has been idle for 2 seconds
      const isMouseIdle = Date.now() - lastMouseMoveRef.current > 2000

      if (isMouseIdle) {
        // Use auto-animation
        autoAnimRef.current.time += 0.01
        const autoPos = getAutoPosition(canvas.width, canvas.height)
        mouseRef.current.x += (autoPos.x - mouseRef.current.x) * 0.05
        mouseRef.current.y += (autoPos.y - mouseRef.current.y) * 0.05
      } else {
        // Smooth follow mouse
        mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.15
        mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.15
      }

      const mouseX = mouseRef.current.x
      const mouseY = mouseRef.current.y

      // Draw grid dots
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          // Calculate distance from mouse/spotlight
          const dx = x - mouseX
          const dy = y - mouseY
          const distance = Math.sqrt(dx * dx + dy * dy)

          // Calculate intensity based on distance
          let intensity = 0
          let color = "rgba(100, 100, 100, 0.15)" // Default dark grey

          if (distance < spotlightRadius) {
            // Inside spotlight - bright pink
            intensity = 1 - distance / spotlightRadius
            const alpha = intensity * 0.8
            color = `rgba(255, 0, 128, ${alpha})` // #FF0080 with varying alpha
          }

          // Draw dot
          ctx.beginPath()
          ctx.arc(x, y, dotRadius, 0, Math.PI * 2)
          ctx.fillStyle = color
          ctx.fill()

          // Add extra glow for dots very close to spotlight center
          if (distance < spotlightRadius * 0.4) {
            ctx.shadowBlur = 10
            ctx.shadowColor = "#FF0080"
            ctx.fill()
            ctx.shadowBlur = 0
          }
        }
      }

      // Draw spotlight glow overlay
      const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, spotlightRadius)
      gradient.addColorStop(0, "rgba(255, 0, 128, 0.15)") // #FF0080 center
      gradient.addColorStop(0.5, "rgba(255, 0, 128, 0.05)")
      gradient.addColorStop(1, "rgba(255, 0, 128, 0)")

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${className}`}
      style={{ display: "block" }}
    />
  )
}
