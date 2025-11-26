"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Building2, ShoppingCart, Truck, Heart, Wallet } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const industries = [
  { name: "Real Estate", icon: Building2 },
  { name: "E-Commerce", icon: ShoppingCart },
  { name: "Logistics", icon: Truck },
  { name: "Healthcare", icon: Heart },
  { name: "Finance", icon: Wallet },
]

export function IndustryTicker() {
  const containerRef = useRef<HTMLDivElement>(null)
  const tickerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 50,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
          end: "top 60%",
          scrub: 1,
        },
      })

      // Infinite scroll animation
      gsap.to(tickerRef.current, {
        xPercent: -50,
        duration: 20,
        ease: "none",
        repeat: -1,
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative py-12 md:py-20 overflow-hidden border-y border-white/5">
      {/* Gradient overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0a0a0f] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0a0a0f] to-transparent z-10" />

      <div className="text-center mb-8">
        <p className="text-sm uppercase tracking-[0.3em] text-[#c026d3]">Industries We Upgrade</p>
      </div>

      <div ref={tickerRef} className="flex gap-12 md:gap-20 whitespace-nowrap">
        {[...industries, ...industries, ...industries, ...industries].map((industry, i) => (
          <div key={i} className="flex items-center gap-3 text-white/60 hover:text-white transition-colors">
            <industry.icon className="w-5 h-5 md:w-6 md:h-6 text-[#c026d3]" />
            <span className="text-lg md:text-xl font-light tracking-wide">{industry.name}</span>
            <span className="text-[#c026d3] mx-4 md:mx-8">+</span>
          </div>
        ))}
      </div>
    </div>
  )
}
