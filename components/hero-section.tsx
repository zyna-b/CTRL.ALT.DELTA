"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Clock, Gem, Headphones } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const robotRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const moonRef = useRef<HTMLDivElement>(null)
  const hudRef = useRef<HTMLDivElement>(null)
  const trustBarRef = useRef<HTMLDivElement>(null)

  const [hudMetrics, setHudMetrics] = useState({
    systemStatus: "ONLINE",
    ipProtocol: "SECURE",
    assetValuation: "TRACKING",
    uptime: "99.97%",
  })

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animations
      gsap.from(titleRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 1.5,
        ease: "power4.out",
      })

      gsap.from(robotRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        delay: 0.3,
        ease: "power3.out",
      })

      gsap.from(contentRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
      })

      gsap.from(moonRef.current, {
        scale: 0.5,
        opacity: 0,
        duration: 1.5,
        delay: 0.2,
        ease: "power4.out",
      })

      gsap.from(hudRef.current, {
        x: 50,
        opacity: 0,
        duration: 1,
        delay: 0.8,
        ease: "power3.out",
      })

      gsap.from(trustBarRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 1,
        ease: "power3.out",
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Simulated HUD flicker effect
  useEffect(() => {
    const interval = setInterval(() => {
      setHudMetrics(prev => ({
        ...prev,
        uptime: `${(99.9 + Math.random() * 0.09).toFixed(2)}%`,
      }))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center pt-16 sm:pt-20 overflow-hidden">
      {/* Deep dark background with subtle gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-[#050508] via-[#0a0a10] to-[#050508]" />

      {/* Animated cyber grid background */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 0, 127, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 0, 127, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Scan lines overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(255, 255, 255, 0.1) 2px,
            rgba(255, 255, 255, 0.1) 4px
          )`,
        }}
      />

      {/* Background text - watermark style */}
      {/* <h1
        ref={titleRef}
        className="absolute top-[12%] sm:top-[18%] left-0 right-0 flex justify-center pointer-events-none select-none px-4"
      >
        <span className="text-[12vw] sm:text-[10vw] md:text-[8vw] font-black text-transparent bg-clip-text bg-gradient-to-b from-white/[0.04] to-transparent tracking-tight whitespace-nowrap">
          CTRL.ALT.DELTA.
        </span>
      </h1> */}

      {/* Ambient glow effects */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#ff007f]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#ff007f]/3 rounded-full blur-[120px] pointer-events-none" />

      {/* Moon + Robot Container */}
      <div className="absolute bottom-0 right-[-25%] sm:right-[-15%] md:right-[-5%] lg:right-0 pointer-events-none" style={{ width: "100vw", height: "100vw", maxWidth: "1200px", maxHeight: "1200px" }}>
        {/* Moon with enhanced glow */}
        <div
          ref={moonRef}
          className="absolute left-1/2 -translate-x-1/2 w-full h-full"
          style={{ bottom: "-85%" }}
        >
          <div className="absolute inset-0 rounded-full bg-linear-to-t from-transparent via-[#ff007f]/15 to-[#ff007f]/25 blur-[80px] scale-110" />
          <div className="absolute -inset-1 rounded-full bg-linear-to-t from-transparent via-[#ff007f]/30 to-[#ff007f]/50 blur-md" />
          <div className="absolute inset-0 rounded-full bg-[#030305]" />
          <div className="absolute inset-0.5 rounded-full bg-linear-to-t from-[#050508] via-[#040406] to-[#060608]" />
          <div className="absolute inset-x-0 bottom-0 h-[60%] bg-linear-to-t from-[#050508] via-[#050508]/90 to-transparent" />
        </div>

        {/* Robot Image */}
        <div
          ref={robotRef}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10"
          style={{ width: "min(55vw, 750px)" }}
        >
          <img
            src="/images/robot.png"
            alt="AI Robot"
            className="w-full h-auto object-contain block"
            style={{
              filter: "drop-shadow(0 0 80px rgba(255, 0, 127, 0.4))",
              marginBottom: "-4px",
            }}
          />
        </div>
      </div>

      {/* HUD Interface - Removed as per request */}

      {/* Main Content - Left side */}
      <div
        ref={contentRef}
        className="absolute left-6 sm:left-12 md:left-24 lg:left-40 top-[55%] -translate-y-1/2 z-30 max-w-[300px] sm:max-w-md md:max-w-lg lg:max-w-xl"
      >
        {/* Main Headline */}
        <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-6">
          STOP RENTING SOFTWARE.
          <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-[#ff007f] to-[#ff6b6b]">
            START OWNING AI ASSETS.
          </span>
        </h2>

        {/* Subheadline */}
        <p className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 leading-relaxed max-w-lg">
          We build proprietary AI infrastructure that belongs to <span className="text-white font-medium">you</span>. 
          Stop leasing your company's intelligence to big tech and secure your long-term valuation.
        </p>

        {/* Single Primary CTA */}
        <Button
          className="bg-[#ff007f] hover:bg-[#ff007f]/90 text-white rounded-full px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 text-sm sm:text-base md:text-lg font-bold shadow-[0_0_40px_rgba(255,0,127,0.4)] hover:shadow-[0_0_60px_rgba(255,0,127,0.6)] transition-all duration-300 hover:scale-[1.02]"
        >
          BOOK STRATEGY CALL <ArrowRight className="w-5 h-5 ml-2" />
        </Button>

        {/* Trust Bar - Horizontal layout beneath CTA */}
        <div
          ref={trustBarRef}
          className="mt-8 sm:mt-10 md:mt-12"
        >
          <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-8">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#ff007f]/10 border border-[#ff007f]/20 flex items-center justify-center">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-[#ff007f]" />
              </div>
              <div>
                <p className="text-white font-bold text-sm sm:text-base">100%</p>
                <p className="text-gray-500 text-[10px] sm:text-xs">IP Ownership</p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#ff007f]/10 border border-[#ff007f]/20 flex items-center justify-center">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#ff007f]" />
              </div>
              <div>
                <p className="text-white font-bold text-sm sm:text-base">4-8 Wks</p>
                <p className="text-gray-500 text-[10px] sm:text-xs">Launch Time</p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#ff007f]/10 border border-[#ff007f]/20 flex items-center justify-center">
                <Gem className="w-4 h-4 sm:w-5 sm:h-5 text-[#ff007f]" />
              </div>
              <div>
                <p className="text-white font-bold text-sm sm:text-base">0%</p>
                <p className="text-gray-500 text-[10px] sm:text-xs">Equity Taken</p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#ff007f]/10 border border-[#ff007f]/20 flex items-center justify-center">
                <Headphones className="w-4 h-4 sm:w-5 sm:h-5 text-[#ff007f]" />
              </div>
              <div>
                <p className="text-white font-bold text-sm sm:text-base">24/7</p>
                <p className="text-gray-500 text-[10px] sm:text-xs">Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-[#050508] to-transparent pointer-events-none z-10" />
    </section>
  )
}
