"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check, Zap, Rocket, Users } from "lucide-react"

const pricingTiers = [
  {
    id: "workflows",
    name: "AI WORKFLOWS",
    price: "$499",
    subtitle: "Per Workflow / Fixed Scope",
    hook: "Stop paying humans to do robot work. Eliminate manual bottlenecks in days.",
    icon: Zap,
    features: [
      "1 Complex Automation (n8n/Zapier)",
      "AI Agent Integration",
      "3-Day Turnaround",
      "Video Training Handoff",
      "30-Day Broken Link Warranty",
    ],
    cta: "Automate Now",
  },
  {
    id: "mvp",
    name: "MVP SPRINT",
    price: "Starts at $1,499",
    subtitle: "4-Week Rapid Launch",
    hook: "Your idea is worthless until it ships. We build market-ready products, not prototypes.",
    icon: Rocket,
    features: [
      "Full-Stack App (Next.js/React)",
      "Database & Auth Setup",
      "Stripe Payments Integration",
      "Basic Admin Dashboard",
      "Deployment to Vercel/AWS",
      "Source Code Ownership",
    ],
    cta: "Start Your Build",
  },
  {
    id: "partner",
    name: "FRACTIONAL PARTNER",
    price: "$1,999",
    subtitle: "/ mo · Pause or Cancel Anytime",
    hook: "Stop looking for a CTO. Hire a senior engineering partner for less than a junior dev's salary.",
    icon: Users,
    features: [
      "~20 Hours Dedicated Dev Time",
      "Priority Weekend Support",
      "Strategic AI Consulting",
      "Direct Slack Access",
      "Regular Code Audits",
      "Roadmap Planning",
    ],
    cta: "Hire Monthly",
  },
]

export function PricingSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 })
  const [selectedTierId, setSelectedTierId] = useState("mvp") // Default to MVP card

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setSpotlightPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative py-32 px-4 md:px-6 overflow-hidden bg-black">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-150 h-150 bg-[#D1006B]/10 rounded-full blur-[200px]" />
        <div className="absolute bottom-1/4 right-1/4 w-100 h-100 bg-[#D1006B]/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-[#D1006B] text-sm font-semibold uppercase tracking-widest mb-4">
            Pricing
          </p>
          <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-6">
            Invest in{" "}
            <span className="text-gradient bg-clip-text text-transparent bg-linear-to-r from-[#D1006B] to-[#ff6b6b]">
              Assets,
            </span>
            <br />
            Not Expenses.
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Transparent pricing designed for speed and ROI. No bloated contracts.
          </p>
        </motion.div>

        {/* Pricing Cards Grid with Spotlight */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="relative grid md:grid-cols-3 gap-6 lg:gap-8"
          style={{
            "--spotlight-x": `${spotlightPos.x}px`,
            "--spotlight-y": `${spotlightPos.y}px`,
          } as React.CSSProperties & { "--spotlight-x": string; "--spotlight-y": string }}
        >
          {/* Spotlight Effect */}
          <div
            className="absolute inset-0 pointer-events-none rounded-3xl opacity-0 transition-opacity duration-200"
            style={{
              background: `radial-gradient(circle 400px at var(--spotlight-x) var(--spotlight-y), rgba(209, 0, 107, 0.15), transparent 80%)`,
            }}
          />

          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{
                rotateX: -3,
                rotateY: 3,
              }}
              style={{
                transformStyle: "preserve-3d",
                perspective: 1000,
              }}
              onClick={() => setSelectedTierId(tier.id)}
              className={`relative p-8 rounded-3xl transition-all duration-500 group
                bg-white/5 backdrop-blur-xl border cursor-pointer flex flex-col h-full
                ${
                  selectedTierId === tier.id
                    ? "border-[#D1006B] shadow-[0_0_40px_rgba(209,0,107,0.3)]"
                    : "border-gray-600 hover:border-[#D1006B]/50"
                }
                hover:bg-white/8
              `}
            >
              {/* Gradient border for selected card */}
              {selectedTierId === tier.id && (
                <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-[#D1006B]/20 via-transparent to-transparent pointer-events-none" />
              )}



              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-[#D1006B]/10 border border-[#D1006B]/30 flex items-center justify-center mb-6 group-hover:bg-[#D1006B]/20 transition-colors duration-300 relative z-10">
                <tier.icon className="w-7 h-7 text-[#D1006B]" />
              </div>

              {/* Tier Info */}
              <div className="mb-6 relative z-10">
                <h3 className="text-lg font-bold text-[#D1006B] uppercase tracking-wider mb-2">
                  {tier.name}
                </h3>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-black text-white">{tier.price}</span>
                </div>
                <p className="text-gray-500 text-sm mb-4">{tier.subtitle}</p>
              </div>

              {/* Hook */}
              <p className="text-gray-300 leading-relaxed mb-6 text-sm relative z-10 min-h-20">
                {tier.hook}
              </p>

              {/* Features - All Visible */}
              <ul className="space-y-3 mb-8 relative z-10 grow">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#D1006B]/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-[#D1006B]" />
                    </div>
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                onClick={scrollToContact}
                className={`w-full mt-auto rounded-full py-6 text-sm font-semibold transition-all duration-300 relative z-10 ${
                  selectedTierId === tier.id
                    ? "bg-[#D1006B] hover:bg-[#D1006B]/90 text-white shadow-[0_0_30px_rgba(209,0,107,0.4)]"
                    : "bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-[#D1006B]/30"
                }`}
              >
                {tier.cta}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Enterprise Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 pt-12 border-t border-white/10"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-8 py-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
            <div>
              <h4 className="text-white font-bold text-lg mb-2">
                Need a complex Enterprise Solution or Existing Platform Overhaul?
              </h4>
              <p className="text-gray-400 text-sm">
                Custom architecture, team augmentation, and long-term partnerships.
              </p>
            </div>
            <button
              onClick={scrollToContact}
              className="group flex items-center gap-2 text-[#D1006B] font-semibold hover:text-[#ff6b6b] transition-colors whitespace-nowrap"
            >
              Let's discuss custom scope & pricing
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
