"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const robotRef = useRef<HTMLDivElement>(null)
  const leftContentRef = useRef<HTMLDivElement>(null)
  const rightStatsRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const moonRef = useRef<HTMLDivElement>(null)

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

      gsap.from(leftContentRef.current, {
        x: -100,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
      })

      gsap.from(rightStatsRef.current, {
        x: 100,
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
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center pt-16 sm:pt-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-[#0a0a0f] via-[#0f0a15] to-[#0a0a0f]" />

      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(192, 38, 211, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(192, 38, 211, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Background text */}
      <h1
        ref={titleRef}
        className="absolute top-[15%] sm:top-1/4 left-0 right-0 flex justify-center pointer-events-none select-none px-4"
      >
        <span className="text-[10vw] sm:text-[8vw] md:text-[6vw] font-black text-transparent bg-clip-text bg-linear-to-b from-white/[0.07] to-transparent tracking-tight whitespace-nowrap">
          CTRL.ALT.DELTA.
        </span>
      </h1>

      {/* Spotlight effects - hidden on mobile for performance */}
      <div className="hidden sm:block absolute bottom-[15%] left-[55%] w-[400px] h-[500px] bg-linear-to-bl from-white/8 via-white/2 to-transparent blur-3xl pointer-events-none z-9" />
      <div className="hidden sm:block absolute bottom-[25%] left-[52%] w-[200px] h-[350px] bg-white/4 blur-2xl pointer-events-none z-9" />

      {/* Moon + Robot Container */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none" style={{ width: "100vw", height: "100vw", maxWidth: "1200px", maxHeight: "1200px" }}>
        {/* Moon */}
        <div
          ref={moonRef}
          className="absolute left-1/2 -translate-x-1/2 w-full h-full"
          style={{ bottom: "-85%" }}
        >
          <div className="absolute inset-0 rounded-full bg-linear-to-t from-transparent via-[#9d174d]/20 to-[#db2777]/30 blur-[60px] scale-110" />
          <div className="absolute -inset-1 rounded-full bg-linear-to-t from-transparent via-[#be185d]/40 to-[#db2777]/60 blur-md" />
          <div className="absolute inset-0 rounded-full bg-[#050507]" />
          <div className="absolute inset-0.5 rounded-full bg-linear-to-t from-[#0a0a0f] via-[#070709] to-[#0a0a10]" />
          <div className="absolute inset-x-0 bottom-0 h-[60%] bg-linear-to-t from-[#0a0a0f] via-[#0a0a0f]/90 to-transparent" />
        </div>

        {/* Robot Image */}
        <div
          ref={robotRef}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10"
          style={{ width: "min(45vw, 600px)" }}
        >
          <img
            src="/images/robot.png"
            alt="AI Robot"
            className="w-full h-auto object-contain block"
            style={{
              filter: "drop-shadow(0 0 60px rgba(219, 39, 119, 0.3))",
              marginBottom: "-4px",
            }}
          />
        </div>
      </div>

      {/* Left Content */}
      <div
        ref={leftContentRef}
        className="absolute left-3 sm:left-4 md:left-8 lg:left-16 top-[20%] sm:top-[30%] md:top-1/2 md:-translate-y-1/2 z-20 max-w-[280px] sm:max-w-md md:max-w-lg lg:max-w-xl"
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white leading-tight mb-3 sm:mb-4">
          Stop Renting Software.
          <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-[#ea0d7c] to-[#ff6b6b]">Start Owning AI Assets.</span>
        </h2>
        <p className="text-gray-400 text-xs sm:text-sm md:text-base lg:text-lg mb-4 sm:mb-6 leading-relaxed hidden sm:block">
          Your startup's valuation depends on the IP you own, not the SaaS you rent. We build proprietary AI infrastructure that belongs to you—automating your operations and increasing your company's asset value.
        </p>
        <p className="text-gray-400 text-xs sm:hidden mb-4 leading-relaxed">
          We build proprietary AI infrastructure that belongs to you. No monthly fees. 100% Code Ownership.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            className="bg-[#ea0d7c] hover:bg-[#ea0d7c]/90 text-white rounded-full px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 text-xs sm:text-sm md:text-base font-semibold"
          >
            Audit My Workflow <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 rounded-full px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 bg-transparent text-xs sm:text-sm md:text-base font-semibold hidden sm:flex"
          >
            Chat with Delta-1
          </Button>
        </div>
      </div>

      {/* Right Stats */}
      <div
        ref={rightStatsRef}
        className="absolute right-3 sm:right-4 md:right-8 lg:right-16 top-[25%] sm:top-1/2 sm:-translate-y-1/2 z-20 space-y-2 sm:space-y-4 md:space-y-6 hidden xs:block"
      >
        <div className="text-right p-2 sm:p-3 rounded-lg sm:rounded-xl bg-[#0a0a0f]/60 border border-white/6">
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-[#ea0d7c]">100%</p>
          <p className="text-gray-400 text-[9px] sm:text-[10px] md:text-xs">IP Ownership</p>
        </div>

        <div className="text-right p-2 sm:p-3 rounded-lg sm:rounded-xl bg-[#0a0a0f]/60 border border-white/6">
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-[#ea0d7c]">4-8 Wks</p>
          <p className="text-gray-400 text-[9px] sm:text-[10px] md:text-xs">MVP Launch</p>
        </div>

        <div className="text-right p-2 sm:p-3 rounded-lg sm:rounded-xl bg-[#0a0a0f]/60 border border-white/6">
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-[#ea0d7c]">0%</p>
          <p className="text-gray-400 text-[9px] sm:text-[10px] md:text-xs">Equity Taken</p>
        </div>

        <div className="text-right p-2 sm:p-3 rounded-lg sm:rounded-xl bg-[#0a0a0f]/60 border border-white/6 hidden sm:block">
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-[#ea0d7c]">24/7</p>
          <p className="text-gray-400 text-[9px] sm:text-[10px] md:text-xs">Agent Support</p>
        </div>
      </div>
    </section>
  )
}
