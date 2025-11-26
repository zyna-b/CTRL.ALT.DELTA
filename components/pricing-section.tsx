"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check, Sparkles } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const pricingTiers = [
  {
    name: "MVP Sprint",
    description: "Perfect for validating your idea fast",
    price: "Custom",
    period: "one-time",
    popular: false,
    features: [
      "Full MVP development",
      "4-6 week delivery",
      "Core features prioritized",
      "Responsive design",
      "1 month post-launch support",
      "Source code ownership",
    ],
    cta: "Book Discovery Call",
  },
  {
    name: "AI Integration",
    description: "Add AI superpowers to your business",
    price: "Custom",
    period: "project-based",
    popular: true,
    features: [
      "Custom AI solution design",
      "Chatbot / Assistant development",
      "Workflow automation",
      "Integration with existing tools",
      "Training & documentation",
      "3 months support included",
    ],
    cta: "Book Discovery Call",
  },
  {
    name: "Growth Partner",
    description: "Ongoing AI & tech partnership",
    price: "Custom",
    period: "monthly retainer",
    popular: false,
    features: [
      "Dedicated development team",
      "Priority support 24/7",
      "Continuous improvements",
      "New feature development",
      "Performance optimization",
      "Strategic AI consulting",
    ],
    cta: "Book Discovery Call",
  },
]

export function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.15,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-4 md:px-6 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#ea0d7c]/5 rounded-full blur-[200px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-[#ea0d7c] text-sm font-semibold uppercase tracking-widest mb-4">
            Pricing
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
            Investment in{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#ea0d7c] to-[#ff6b6b]">
              Your Growth
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Every project is unique. We'll create a custom proposal based on your specific needs and goals.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {pricingTiers.map((tier, index) => (
            <div
              key={tier.name}
              ref={(el) => {
                if (el) cardsRef.current[index] = el
              }}
              className={`relative p-8 rounded-3xl transition-all duration-500 ${
                tier.popular
                  ? "bg-linear-to-b from-[#ea0d7c]/20 to-[#0a0a0f] border-2 border-[#ea0d7c]/50 scale-105 shadow-[0_0_60px_rgba(234,13,124,0.2)]"
                  : "bg-[#0a0a0f]/80 border border-white/6 hover:border-[#ea0d7c]/20"
              }`}
            >
              {/* Popular Badge */}
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#ea0d7c] text-white text-sm font-semibold rounded-full">
                    <Sparkles className="w-4 h-4" />
                    Most Popular
                  </span>
                </div>
              )}

              {/* Tier Info */}
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
                <p className="text-gray-400 text-sm mb-6">{tier.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-black text-[#ea0d7c]">{tier.price}</span>
                </div>
                <p className="text-gray-500 text-sm mt-1">{tier.period}</p>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#ea0d7c]/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-[#ea0d7c]" />
                    </div>
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                onClick={scrollToContact}
                className={`w-full rounded-full py-6 text-sm font-semibold transition-all duration-300 ${
                  tier.popular
                    ? "bg-[#ea0d7c] hover:bg-[#ea0d7c]/90 text-white shadow-[0_0_30px_rgba(234,13,124,0.4)]"
                    : "bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-[#ea0d7c]/30"
                }`}
              >
                {tier.cta}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-12">
          <p className="text-gray-400 text-sm">
            Not sure which plan is right for you?{" "}
            <button
              onClick={scrollToContact}
              className="text-[#ea0d7c] font-semibold hover:underline"
            >
              Let's talk
            </button>{" "}
            — we'll help you find the perfect fit.
          </p>
        </div>
      </div>
    </section>
  )
}
