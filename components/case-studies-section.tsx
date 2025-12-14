"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUpRight, Database, Mic, Eye, Server, Globe, Cpu, Layers, Zap } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export function CaseStudiesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.set(".section-header > *", { opacity: 0, y: 30 })
      gsap.to(".section-header > *", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".section-header",
          start: "top 80%",
        }
      })

      // Hero Card Animation
      gsap.set(heroRef.current, { opacity: 0, y: 50 })
      gsap.to(heroRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top 85%",
        }
      })

      // Grid Cards Animation
      gsap.set(".venture-card", { opacity: 0, y: 50 })
      
      ScrollTrigger.batch(".venture-card", {
        start: "top bottom-=100",
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            overwrite: true
          })
        },
        onLeaveBack: (batch) => {
          gsap.to(batch, {
            opacity: 0,
            y: 50,
            duration: 0.5,
            overwrite: true
          })
        }
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="results"
      className="relative py-32 px-4 md:px-6 bg-black overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.15]" 
           style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />
      
      {/* Ambient Glow */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-[#ea0d7c]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="section-header mb-20">
          <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-6">
            Labs & <span className="text-transparent bg-clip-text bg-linear-to-r from-[#ea0d7c] to-[#ff6b6b]">Ventures</span>
          </h2>
          <div className="h-1 w-24 bg-[#ea0d7c] mb-6" />
          <p className="text-gray-400 text-lg max-w-2xl font-light">
            We don't just write code. We engineer scalable systems. Explore our internal ventures and R&D protocols.
          </p>
        </div>

        <div className="space-y-6">
          {/* Row 1: Flagship Hero Card */}
          <div 
            ref={heroRef}
            className="group relative w-full rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden hover:border-[#ea0d7c]/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_50px_rgba(234,13,124,0.1)]"
          >
            <div className="grid lg:grid-cols-5 min-h-100">
              {/* Visual / Blueprint Area */}
              <div className="lg:col-span-2 bg-black/40 border-b lg:border-b-0 lg:border-r border-white/10 relative overflow-hidden p-8 flex items-center justify-center">
                {/* Blueprint Grid */}
                <div className="absolute inset-0 opacity-20" 
                     style={{ backgroundImage: 'radial-gradient(#ea0d7c 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
                />
                
                {/* Animated Wireframe Elements */}
                <div className="relative w-full max-w-60 aspect-square border border-[#ea0d7c]/30 rounded-lg p-4 flex flex-col gap-3">
                   <div className="w-full h-2 bg-[#ea0d7c]/20 rounded animate-pulse" />
                   <div className="flex gap-2">
                      <div className="w-1/3 h-20 bg-[#ea0d7c]/10 rounded border border-[#ea0d7c]/20" />
                      <div className="w-2/3 h-20 bg-[#ea0d7c]/10 rounded border border-[#ea0d7c]/20 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-px bg-[#ea0d7c]/50 animate-[scan_2s_linear_infinite]" />
                      </div>
                   </div>
                   <div className="w-full h-2 bg-[#ea0d7c]/20 rounded animate-pulse delay-75" />
                   <div className="w-2/3 h-2 bg-[#ea0d7c]/20 rounded animate-pulse delay-150" />
                   
                   {/* Floating Badge */}
                   <div className="absolute -top-3 -right-3 bg-[#ea0d7c] text-black text-[10px] font-bold px-2 py-0.5 rounded">
                     V2.0
                   </div>
                </div>
              </div>

              {/* Content Area */}
              <div className="lg:col-span-3 p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold tracking-widest uppercase">
                    Internal Venture
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-500 font-mono">
                    <Globe className="w-3 h-3" />
                    Public Beta
                  </span>
                </div>

                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  HirePrint AI
                </h3>
                <p className="text-xl text-gray-300 font-light mb-6">
                  The Self-Organizing Freelance Economy.
                </p>
                <p className="text-gray-400 leading-relaxed mb-8 max-w-xl">
                  A B2B marketplace architecture featuring Dual-Role context switching, Stripe Connect Escrow integration, and Gemini Agentic AI for automated scope generation.
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {["Laravel 12", "Stripe Connect", "Gemini 2.0", "Next.js 14"].map((tech) => (
                    <span key={tech} className="px-3 py-1.5 rounded bg-white/5 border border-white/10 text-gray-300 text-xs font-mono hover:bg-white/10 transition-colors cursor-default">
                      {tech}
                    </span>
                  ))}
                </div>

                <button className="flex items-center gap-2 text-[#ea0d7c] font-bold uppercase tracking-wider text-sm group-hover:gap-3 transition-all">
                  View Architecture <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Row 2: Capability Grid */}
          <div ref={gridRef} className="grid md:grid-cols-3 gap-6">
            
            {/* Card A: VisionSense */}
            <div className="venture-card group p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-[#ea0d7c]/50 transition-all duration-500 hover:-translate-y-1">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                  <Eye className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest border border-white/10 px-2 py-1 rounded">
                  R&D Protocol
                </span>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">VisionSense</h4>
              <p className="text-gray-400 text-sm mb-6">Edge-Based Sentiment Analysis.</p>
              <div className="pt-6 border-t border-white/5">
                <div className="text-3xl font-black text-white mb-1">92%</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">Model Accuracy</div>
              </div>
            </div>

            {/* Card B: Delta Scraper */}
            <div className="venture-card group p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-[#ea0d7c]/50 transition-all duration-500 hover:-translate-y-1">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400">
                  <Database className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest border border-white/10 px-2 py-1 rounded">
                  Internal Tool
                </span>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Delta Scraper</h4>
              <p className="text-gray-400 text-sm mb-6">High-Velocity Lead Engine.</p>
              <div className="pt-6 border-t border-white/5">
                <div className="text-3xl font-black text-white mb-1">10k</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">Leads / Hour</div>
              </div>
            </div>

            {/* Card C: Voice-01 */}
            <div className="venture-card group p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-[#ea0d7c]/50 transition-all duration-500 hover:-translate-y-1">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400">
                  <Mic className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest border border-white/10 px-2 py-1 rounded">
                  Prototype
                </span>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Voice-01</h4>
              <p className="text-gray-400 text-sm mb-6">Real-Time Voice Agent.</p>
              <div className="pt-6 border-t border-white/5">
                <div className="text-3xl font-black text-white mb-1">&lt;500ms</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">Latency</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
