"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Rocket, Bot, MessageSquare, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    icon: Rocket,
    title: "The Startup Launchpad",
    description: "From Idea to Live App in 4 Weeks. Fixed Price. You own the code.",
    features: ["Custom Development", "Full Ownership", "4-Week Delivery"],
    gradient: "from-blue-500/20 to-purple-500/20",
  },
  {
    icon: Bot,
    title: "AI Workforce",
    description: "Replace manual data entry with AI Agents. Cut operational costs by 40%.",
    features: ["Process Automation", "Smart Analytics", "Cost Reduction"],
    gradient: "from-[#c026d3]/20 to-pink-500/20",
  },
  {
    icon: MessageSquare,
    title: "The 24/7 Sales Officer",
    description: "Our Delta Bot engages every visitor instantly. Never miss a lead again.",
    features: ["Instant Response", "Lead Qualification", "24/7 Availability"],
    gradient: "from-emerald-500/20 to-cyan-500/20",
  },
]

export function GrowthEngine() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headlineRef.current, {
        opacity: 0,
        y: 60,
        scrollTrigger: {
          trigger: headlineRef.current,
          start: "top 85%",
          end: "top 55%",
          scrub: 1,
        },
      })

      const cards = cardsRef.current?.children
      if (cards) {
        gsap.from(cards, {
          opacity: 0,
          y: 100,
          stagger: 0.15,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            end: "top 40%",
            scrub: 1,
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32 px-4 md:px-8 overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at center, rgba(192, 38, 211, 0.15) 0%, transparent 70%)`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(192, 38, 211, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(192, 38, 211, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div ref={headlineRef} className="text-center mb-16 md:mb-20">
          <span className="inline-block px-4 py-1 bg-[#c026d3]/10 border border-[#c026d3]/20 rounded-full text-[#c026d3] text-sm mb-6">
            GROWTH ENGINE
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            Three Ways to <span className="text-[#c026d3]">Scale</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Choose your path to automation and watch your business transform.
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, i) => (
            <div
              key={i}
              className="group relative p-6 md:p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-[#c026d3]/30 transition-all duration-500 backdrop-blur-sm overflow-hidden"
            >
              {/* Glow effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              {/* Shadow behind card */}
              <div className="absolute -inset-px bg-gradient-to-br from-[#c026d3]/20 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity -z-10" />

              <div className="relative z-10">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-[#c026d3]/20 to-[#c026d3]/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <service.icon className="w-7 h-7 md:w-8 md:h-8 text-[#c026d3]" />
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-gray-400 mb-6 text-sm md:text-base">{service.description}</p>

                <div className="space-y-2 mb-8">
                  {service.features.map((feature, j) => (
                    <div key={j} className="flex items-center gap-2 text-sm text-gray-500">
                      <div className="w-1.5 h-1.5 bg-[#c026d3] rounded-full" />
                      {feature}
                    </div>
                  ))}
                </div>

                <Button
                  variant="ghost"
                  className="text-[#c026d3] hover:text-white hover:bg-[#c026d3]/20 p-0 h-auto font-medium"
                >
                  Learn More <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
