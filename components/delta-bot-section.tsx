"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Bot, MessageSquare, Zap, Shield } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export function DeltaBotSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        opacity: 0,
        x: -80,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      })

      gsap.from(visualRef.current, {
        opacity: 0,
        x: 80,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      })

      // Pulse animation for the bot icon
      gsap.to(".bot-pulse", {
        scale: 1.2,
        opacity: 0,
        duration: 2,
        repeat: -1,
        ease: "power2.out",
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="delta-bot"
      className="relative py-32 px-4 md:px-6 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-linear-to-b from-[#0a0a0f] via-[#0f0a12] to-[#0a0a0f]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ea0d7c]/8 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div ref={contentRef}>
            <p className="text-[#ea0d7c] text-sm font-semibold uppercase tracking-widest mb-4">
              Live Demo
            </p>
            <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-6">
              We Don't Just Sell AI.{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#ea0d7c] to-[#ff6b6b]">
                We Run On It.
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Meet Delta-1, the autonomous agent that manages this agency.{" "}
              <span className="text-white font-semibold">It is live right now.</span>
            </p>

            <div className="space-y-6 text-gray-400 text-lg leading-relaxed mb-10">
              <p>
                Most agencies promise automation but run on manual labor.{" "}
                <span className="text-white font-medium">We are different.</span> Delta-1 
                handles our lead qualification, client onboarding, and FAQ support instantly.
              </p>
              <p className="p-4 rounded-xl bg-[#ea0d7c]/10 border border-[#ea0d7c]/20 text-white">
                <span className="text-[#ea0d7c] font-bold">Don't believe us?</span> Click the 
                chat bubble in the corner. You aren't talking to a human; you are talking to 
                our architecture.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: MessageSquare, label: "Lead Qualification" },
                { icon: Zap, label: "Instant Onboarding" },
                { icon: Shield, label: "FAQ Support" },
                { icon: Bot, label: "24/7 Active" },
              ].map((feature) => {
                const IconComponent = feature.icon
                return (
                  <div
                    key={feature.label}
                    className="flex items-center gap-3 p-3 rounded-xl bg-[#0a0a0f]/60 border border-white/4"
                  >
                    <IconComponent className="w-5 h-5 text-[#ea0d7c]" />
                    <span className="text-white text-sm font-medium">{feature.label}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Visual */}
          <div ref={visualRef} className="relative">
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#ea0d7c]/20 animate-spin" style={{ animationDuration: "30s" }} />
              
              {/* Middle ring */}
              <div className="absolute inset-8 rounded-full border border-[#ea0d7c]/30" />
              
              {/* Inner glow */}
              <div className="absolute inset-16 rounded-full bg-[#ea0d7c]/20 blur-3xl" />
              
              {/* Bot container */}
              <div className="absolute inset-16 rounded-full bg-[#0a0a0f] border border-[#ea0d7c]/40 flex items-center justify-center">
                {/* Pulse effect */}
                <div className="bot-pulse absolute inset-0 rounded-full bg-[#ea0d7c]/20" />
                
                {/* Bot icon */}
                <div className="relative">
                  <Bot className="w-24 h-24 text-[#ea0d7c]" strokeWidth={1} />
                  
                  {/* Status indicator */}
                  <div className="absolute -top-2 -right-2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0a0a0f] border border-green-500/50">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs text-green-500 font-medium">LIVE</span>
                  </div>
                </div>
              </div>

              {/* Floating particles */}
              <div className="absolute top-1/4 left-0 w-3 h-3 rounded-full bg-[#ea0d7c]/60 animate-pulse" />
              <div className="absolute top-1/2 right-0 w-2 h-2 rounded-full bg-[#ea0d7c]/40 animate-pulse" style={{ animationDelay: "0.5s" }} />
              <div className="absolute bottom-1/4 left-1/4 w-2 h-2 rounded-full bg-[#ea0d7c]/50 animate-pulse" style={{ animationDelay: "1s" }} />
              <div className="absolute bottom-1/3 right-1/4 w-3 h-3 rounded-full bg-[#ea0d7c]/30 animate-pulse" style={{ animationDelay: "1.5s" }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
