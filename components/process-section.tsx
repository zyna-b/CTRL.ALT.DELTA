"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { MessageCircle, Search, Cpu, Rocket } from "lucide-react"

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
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <section
      id="process"
      className="relative py-32 px-4 md:px-6 overflow-hidden bg-black"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full border-x border-white/5" />
        <div className="absolute top-1/4 left-0 w-full h-px bg-linear-to-r from-transparent via-[#ea0d7c]/10 to-transparent" />
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-linear-to-r from-transparent via-[#ea0d7c]/10 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-24">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#ea0d7c] text-sm font-semibold uppercase tracking-widest mb-4"
          >
            Our Process
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-6"
          >
            From Idea to{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#ea0d7c] to-[#ff6b6b]">
              Impact
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            A simple, transparent process designed for busy founders. No surprises, no tech overwhelm.
          </motion.p>
        </div>

        {/* Steps Timeline */}
        <div ref={containerRef} className="relative">
          {/* Vertical Line Container */}
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-0.5 bg-zinc-800 md:-translate-x-1/2">
            {/* Animated Line */}
            <motion.div 
              style={{ height: lineHeight }}
              className="w-full bg-[#ea0d7c] origin-top shadow-[0_0_10px_#ea0d7c]"
            />
          </div>

          <div className="space-y-16 md:space-y-24">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16 ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Content Card */}
                <div className={`flex-1 w-full pl-16 md:pl-0 ${index % 2 === 1 ? "md:text-right" : ""}`}>
                  <div className={`relative p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-2xl transition-all duration-500 group hover:border-[#ea0d7c]/50 hover:shadow-[0_0_30px_rgba(234,13,124,0.15)] max-w-xl w-full ${
                    index % 2 === 1 ? "md:ml-auto" : ""
                  }`}>
                    {/* Step number */}
                    <span className={`text-6xl font-black text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.1)] absolute top-4 select-none group-hover:[-webkit-text-stroke:1px_rgba(234,13,124,0.2)] transition-colors right-8 ${
                      index % 2 === 1 ? "md:left-8 md:right-auto" : ""
                    }`}>
                      {step.number}
                    </span>
                    
                    {/* Duration badge */}
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-[#ea0d7c] bg-[#ea0d7c]/10 rounded-full mb-4 border border-[#ea0d7c]/20">
                      {step.duration}
                    </span>

                    <h3 className="text-2xl font-bold text-white mb-3 relative z-10">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed relative z-10 group-hover:text-gray-300 transition-colors">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Center Icon */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center">
                  <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-[#111111] border-2 border-[#ea0d7c] flex items-center justify-center shadow-[0_0_20px_rgba(234,13,124,0.4)] z-10">
                    <step.icon className="w-5 h-5 md:w-7 md:h-7 text-[#ea0d7c]" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
