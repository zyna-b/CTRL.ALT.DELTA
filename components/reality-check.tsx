"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { FileSpreadsheet, Brain, Clock, Zap, Shield, TrendingUp } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export function RealityCheck() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const oldWayRef = useRef<HTMLDivElement>(null)
  const newWayRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headlineRef.current, {
        opacity: 0,
        y: 80,
        scrollTrigger: {
          trigger: headlineRef.current,
          start: "top 85%",
          end: "top 50%",
          scrub: 1,
        },
      })

      gsap.from(oldWayRef.current, {
        opacity: 0,
        x: -100,
        scrollTrigger: {
          trigger: oldWayRef.current,
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        },
      })

      gsap.from(newWayRef.current, {
        opacity: 0,
        x: 100,
        scrollTrigger: {
          trigger: newWayRef.current,
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        },
      })

      gsap.from(lineRef.current, {
        scaleY: 0,
        scrollTrigger: {
          trigger: lineRef.current,
          start: "top 80%",
          end: "top 40%",
          scrub: 1,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32 px-4 md:px-8 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#c026d3]/5 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 ref={headlineRef} className="text-4xl md:text-6xl lg:text-7xl font-black text-center mb-6">
          <span className="text-white">Your Business is </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c026d3] to-[#db2777]">
            Leaking Revenue.
          </span>
        </h2>
        <p className="text-center text-gray-400 text-lg mb-16 md:mb-24 max-w-2xl mx-auto">
          Stop paying for bloated software. Build a system that works while you sleep.
        </p>

        <div className="grid md:grid-cols-2 gap-8 md:gap-0 relative">
          {/* Divider line */}
          <div
            ref={lineRef}
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#c026d3]/50 to-transparent origin-top"
          />

          {/* Old Way */}
          <div ref={oldWayRef} className="relative p-6 md:p-12">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent rounded-3xl" />
            <div className="relative">
              <span className="inline-block px-4 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 text-sm mb-6">
                OLD WAY
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">Manual Chaos</h3>
              <div className="space-y-6">
                {[
                  { icon: FileSpreadsheet, text: "Endless Spreadsheets", sub: "Hours lost in data entry" },
                  { icon: Clock, text: "Constant Delays", sub: "Missed opportunities daily" },
                  { icon: Shield, text: "Human Errors", sub: "Costly mistakes pile up" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                    <div className="p-3 bg-red-500/10 rounded-xl">
                      <item.icon className="w-6 h-6 text-red-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{item.text}</p>
                      <p className="text-gray-500 text-sm">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Delta Way */}
          <div ref={newWayRef} className="relative p-6 md:p-12">
            <div className="absolute inset-0 bg-gradient-to-bl from-[#c026d3]/5 to-transparent rounded-3xl" />
            <div className="relative">
              <span className="inline-block px-4 py-1 bg-[#c026d3]/10 border border-[#c026d3]/20 rounded-full text-[#c026d3] text-sm mb-6">
                DELTA WAY
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">AI Autonomy</h3>
              <div className="space-y-6">
                {[
                  { icon: Brain, text: "Smart Dashboards", sub: "Real-time insights at a glance" },
                  { icon: Zap, text: "Lightning Speed", sub: "Decisions in milliseconds" },
                  { icon: TrendingUp, text: "24/7 Uptime", sub: "Never miss a beat" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-[#c026d3]/[0.02] border border-[#c026d3]/10 hover:border-[#c026d3]/30 transition-colors"
                  >
                    <div className="p-3 bg-[#c026d3]/10 rounded-xl">
                      <item.icon className="w-6 h-6 text-[#c026d3]" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{item.text}</p>
                      <p className="text-gray-500 text-sm">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
