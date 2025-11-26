"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MessageCircle, Search, Cpu, Rocket } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    number: "01",
    icon: MessageCircle,
    title: "Discovery Call",
    description: "We start with a conversation. Tell us your challenges, goals, and vision. No tech jargon—just a clear discussion about what success looks like for you.",
    duration: "30 min call",
  },
  {
    number: "02",
    icon: Search,
    title: "Strategy & Blueprint",
    description: "Our team analyzes your needs and creates a clear roadmap. You'll know exactly what we'll build, the timeline, and the expected ROI—before we write a single line of code.",
    duration: "3-5 days",
  },
  {
    number: "03",
    icon: Cpu,
    title: "Build & Iterate",
    description: "We build your solution in sprints, showing you progress every week. You stay in control with regular demos and the flexibility to refine as we go.",
    duration: "4-8 weeks",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Launch & Scale",
    description: "Your solution goes live with our full support. We handle the technical maintenance while you enjoy the results. Scale up anytime—we grow with you.",
    duration: "Ongoing support",
  },
]

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const stepsRef = useRef<HTMLDivElement[]>([])
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the connecting line
      gsap.from(lineRef.current, {
        scaleY: 0,
        transformOrigin: "top",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "bottom 80%",
          scrub: 1,
        },
      })

      // Animate each step
      stepsRef.current.forEach((step, index) => {
        gsap.from(step, {
          x: index % 2 === 0 ? -50 : 50,
          opacity: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: step,
            start: "top 80%",
            end: "top 60%",
            scrub: 1,
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative py-32 px-4 md:px-6 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-full h-px bg-linear-to-r from-transparent via-[#ea0d7c]/20 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <p className="text-[#ea0d7c] text-sm font-semibold uppercase tracking-widest mb-4">
            Our Process
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
            From Idea to{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#ea0d7c] to-[#ff6b6b]">
              Impact
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A simple, transparent process designed for busy founders. No surprises, no tech overwhelm.
          </p>
        </div>

        {/* Steps Timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div
            ref={lineRef}
            className="absolute left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-[#ea0d7c] via-[#ea0d7c]/50 to-transparent hidden lg:block"
          />

          <div className="space-y-12 lg:space-y-24">
            {steps.map((step, index) => (
              <div
                key={step.number}
                ref={(el) => {
                  if (el) stepsRef.current[index] = el
                }}
                className={`relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Content Card */}
                <div className={`flex-1 ${index % 2 === 1 ? "lg:text-right" : ""}`}>
                  <div className={`inline-block p-8 rounded-3xl bg-[#0a0a0f]/80 border border-white/6 hover:border-[#ea0d7c]/20 transition-all duration-500 max-w-xl ${
                    index % 2 === 1 ? "lg:ml-auto" : ""
                  }`}>
                    {/* Step number */}
                    <span className="text-6xl font-black text-[#ea0d7c]/20 mb-2 block">
                      {step.number}
                    </span>
                    
                    {/* Duration badge */}
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-[#ea0d7c] bg-[#ea0d7c]/10 rounded-full mb-4 border border-[#ea0d7c]/20">
                      {step.duration}
                    </span>

                    <h3 className="text-2xl font-bold text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Center Icon */}
                <div className="relative z-10 shrink-0 order-first lg:order-0">
                  <div className="w-16 h-16 rounded-2xl bg-[#0a0a0f] border-2 border-[#ea0d7c] flex items-center justify-center shadow-[0_0_30px_rgba(234,13,124,0.3)]">
                    <step.icon className="w-7 h-7 text-[#ea0d7c]" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="flex-1 hidden lg:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
