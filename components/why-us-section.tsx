"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Shield, TrendingUp, Users, Lock, Zap, Percent, Headset } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const benefits = [
  {
    icon: Shield,
    title: "You Own The Asset",
    description: "You don't pay rent. You pay for construction. Once deployed, the code, the models, and the data are assets on your balance sheet, not ours.",
  },
  {
    icon: TrendingUp,
    title: "Modular Architecture",
    description: "We build with Scalability in mind using Next.js and Python. Our systems are designed to handle 10 users or 100,000 users without needing a total rebuild.",
  },
  {
    icon: Users,
    title: "Zero Tech Jargon",
    description: "We don't confuse you with complexity. We explain every step in plain English so you always feel in control of your product.",
  },
]

const stats = [
  { value: "100", suffix: "%", label: "IP Ownership", icon: Lock },
  { value: "4-8", suffix: " Weeks", label: "Average MVP Launch", icon: Zap },
  { value: "0", suffix: "%", label: "Equity Taken", icon: Percent },
  { value: "24/7", suffix: "", label: "Agent Support", icon: Headset },
]

export function WhyUsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Stats Animation (Counter effect)
      const statItems = gsap.utils.toArray(".stat-item")
      statItems.forEach((item: any) => {
        const valueEl = item.querySelector(".stat-value")
        const originalText = valueEl.innerText
        const isRange = originalText.includes("-")
        const endValue = parseInt(originalText.replace(/\D/g, "")) // Simple parse for single numbers

        if (!isRange && !isNaN(endValue)) {
            gsap.from(valueEl, {
                textContent: 0,
                duration: 2,
                ease: "power1.out",
                snap: { textContent: 1 },
                stagger: 1,
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%",
                },
            })
        } else {
             gsap.from(item, {
                opacity: 0,
                y: 20,
                duration: 1,
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%",
                }
             })
        }
      })

      // 2. Header Animation (Playful Reveal)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 75%",
        }
      })

      tl.from(".header-label", { y: 20, opacity: 0, duration: 0.5 })
        .from(".header-title-1", { x: -50, opacity: 0, duration: 0.6, ease: "back.out(1.7)" }, "-=0.3")
        .from(".header-title-highlight", { scale: 0, opacity: 0, rotation: -10, duration: 0.6, ease: "elastic.out(1, 0.5)" }, "-=0.4")
        .from(".header-title-2", { x: 50, opacity: 0, duration: 0.6, ease: "back.out(1.7)" }, "-=0.5")
        .from(".header-desc", { y: 20, opacity: 0, duration: 0.5 }, "-=0.3")

      // 3. Cards Animation (3D Flip Entrance)
      const cards = gsap.utils.toArray(".benefit-card")
      gsap.set(cards, { perspective: 1000 })
      
      cards.forEach((card: any, i) => {
        gsap.from(card, {
          y: 100,
          rotationX: 45,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          delay: i * 0.2,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 70%",
          }
        })
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-32 overflow-hidden bg-[#0a0a0f]"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0f0a12] to-[#0a0a0f]" />
        {/* Animated blobs */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#ea0d7c]/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] animate-pulse delay-1000" />
      </div>

      {/* Stats Band */}
      <div className="relative z-10 w-full border-y border-white/10 bg-white/5 backdrop-blur-sm mb-32">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="stat-item flex flex-col items-center text-center group"
              >
                <div className="mb-4 p-3 rounded-full bg-white/5 border border-white/10 text-[#ea0d7c] group-hover:scale-110 group-hover:border-[#ea0d7c]/30 transition-all duration-300">
                  <stat.icon className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight flex items-center justify-center">
                  <span className="stat-value">{stat.value}</span>
                  <span>{stat.suffix}</span>
                </div>
                <div className="text-gray-300 text-sm font-medium uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-20 perspective-1000">
          <p className="header-label text-[#ea0d7c] text-sm font-semibold uppercase tracking-widest mb-4 inline-block">
            Our Promise
          </p>
          <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-6">
            <span className="header-title-1 inline-block">The</span>{" "}
            <span className="header-title-highlight inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#ea0d7c] to-[#ff6b6b]">
              "No-Black-Box"
            </span>{" "}
            <span className="header-title-2 inline-block">
              Guarantee
            </span>
          </h2>
          <p className="header-desc text-gray-400 text-lg max-w-2xl mx-auto">
            Complete transparency. Full ownership. No surprises. We build it, you own it.
          </p>
        </div>

        {/* Benefits Grid */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className="benefit-card group relative h-full"
            >
              {/* The Obsidian Card */}
              <div className="relative h-full p-8 rounded-[2rem] bg-[#050505] border border-white/10 overflow-hidden transition-all duration-500 group-hover:border-[#ea0d7c]/50 group-hover:shadow-[0_0_50px_rgba(234,13,124,0.15)] group-hover:-translate-y-2">
                
                {/* Internal Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#ea0d7c]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Animated Grid Background (Subtle) */}
                <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-500 pointer-events-none" 
                     style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
                />

                {/* Top Light Bar */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#ea0d7c] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon Container */}
                  <div className="mb-8 relative">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#ea0d7c] group-hover:border-[#ea0d7c] transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 shadow-lg">
                      <benefit.icon className="w-8 h-8 text-white transition-colors duration-500" strokeWidth={1.5} />
                    </div>
                    {/* Connecting Line */}
                    <div className="absolute top-16 left-8 w-[1px] h-full bg-gradient-to-b from-white/10 to-transparent -z-10 group-hover:from-[#ea0d7c]/50 transition-colors duration-500" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#ea0d7c] transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                    {benefit.description}
                  </p>

                  {/* Bottom "Tech" details */}
                  <div className="mt-auto pt-8 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <span className="text-[10px] font-mono text-[#ea0d7c] uppercase tracking-widest">Sys.Active</span>
                    <div className="flex gap-1">
                      <span className="w-1 h-1 rounded-full bg-[#ea0d7c] animate-pulse" />
                      <span className="w-1 h-1 rounded-full bg-[#ea0d7c] animate-pulse delay-75" />
                      <span className="w-1 h-1 rounded-full bg-[#ea0d7c] animate-pulse delay-150" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
