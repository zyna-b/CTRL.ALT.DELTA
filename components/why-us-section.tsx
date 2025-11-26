"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Shield, TrendingUp, Users } from "lucide-react"

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
  { value: "100%", label: "IP Ownership" },
  { value: "4-8 Weeks", label: "Average MVP Launch" },
  { value: "0%", label: "Equity Taken" },
  { value: "24/7", label: "Agent Support" },
]

export function WhyUsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate stats counter
      gsap.from(".stat-item", {
        y: 40,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
        },
      })

      // Animate benefit cards
      gsap.from(".benefit-card", {
        y: 60,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".benefits-grid",
          start: "top 80%",
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-4 md:px-6 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-linear-to-b from-[#0a0a0f] via-[#0f0a12] to-[#0a0a0f]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#ea0d7c]/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Stats Bar */}
        <div
          ref={statsRef}
          className="mb-24 p-8 rounded-3xl bg-[#0a0a0f]/80 border border-white/6"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="stat-item text-center">
                <div className="text-4xl md:text-5xl font-black text-[#ea0d7c] mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-[#ea0d7c] text-sm font-semibold uppercase tracking-widest mb-4">
            Our Promise
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
            The{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#ea0d7c] to-[#ff6b6b]">
              "No-Black-Box" Guarantee
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Complete transparency. Full ownership. No surprises.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="benefits-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="benefit-card group p-6 rounded-2xl bg-[#0a0a0f]/60 border border-white/4 hover:border-[#ea0d7c]/20 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-xl bg-[#ea0d7c]/10 border border-[#ea0d7c]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <benefit.icon className="w-6 h-6 text-[#ea0d7c]" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#ea0d7c] transition-colors duration-300">
                {benefit.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
