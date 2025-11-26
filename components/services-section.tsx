"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Bot, Workflow, Rocket, MessageSquare } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    icon: Rocket,
    title: "MVP Development",
    description: "Turn your idea into a working product in weeks, not months. We build fast, scalable solutions that validate your concept and attract investors.",
    highlight: "Launch in 4-8 weeks",
  },
  {
    icon: Bot,
    title: "Custom AI Solutions",
    description: "Tailored AI systems that solve your specific business challenges. From intelligent automation to predictive analytics—built for your unique needs.",
    highlight: "100% customized",
  },
  {
    icon: MessageSquare,
    title: "AI Chatbots & Assistants",
    description: "24/7 customer support that never sleeps. Our AI assistants handle inquiries, bookings, and support—freeing your team for high-value work.",
    highlight: "90% query resolution",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description: "Eliminate repetitive tasks that drain your team's time. We automate your operations so you can focus on growth, not paperwork.",
    highlight: "Save 20+ hrs/week",
  },
]

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section title
      gsap.from(".services-title", {
        y: 60,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      })

      // Animate cards with stagger - instant trigger, no scrub
      gsap.from(cardsRef.current, {
        y: 60,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".services-grid",
          start: "top 85%",
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-32 px-4 md:px-6 overflow-hidden"
    >
      {/* Background gradient mesh */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#ea0d7c]/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#ea0d7c]/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 services-title">
          <p className="text-[#ea0d7c] text-sm font-semibold uppercase tracking-widest mb-4">
            What We Do
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
            AI Solutions That{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#ea0d7c] to-[#ff6b6b]">
              Drive Results
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We handle the tech complexity so you can focus on what matters—growing your business.
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid grid md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              ref={(el) => {
                if (el) cardsRef.current[index] = el
              }}
              className="group relative p-8 rounded-3xl bg-[#0a0a0f]/80 border border-white/6 hover:border-[#ea0d7c]/30 transition-all duration-500"
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-[#ea0d7c]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-[#ea0d7c]/10 border border-[#ea0d7c]/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#ea0d7c]/20 transition-all duration-300">
                  <service.icon className="w-7 h-7 text-[#ea0d7c]" strokeWidth={1.5} />
                </div>

                {/* Highlight badge */}
                <span className="inline-block px-3 py-1 text-xs font-semibold text-[#ea0d7c] bg-[#ea0d7c]/10 rounded-full mb-4 border border-[#ea0d7c]/20">
                  {service.highlight}
                </span>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#ea0d7c] transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed">
                  {service.description}
                </p>

                {/* Arrow indicator */}
                <div className="mt-6 flex items-center gap-2 text-gray-500 group-hover:text-[#ea0d7c] transition-colors duration-300">
                  <span className="text-sm font-medium">Learn more</span>
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
