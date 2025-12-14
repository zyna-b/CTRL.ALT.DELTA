"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Clock, CheckCircle2 } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const benefits = [
  "Free 30-minute strategy call",
  "Custom solution roadmap",
  "Transparent pricing breakdown",
  "No obligation to proceed",
]

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        opacity: 0,
        y: 80,
        scale: 0.98,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="contact" className="relative py-32 px-4 md:px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-250000px] bg-[#ea0d7c]/10 rounded-full blur-[200px]" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(234, 13, 124, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(234, 13, 124, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div ref={contentRef} className="max-w-5xl mx-auto relative z-10">
        <div className="text-center p-8 md:p-16 rounded-[40px] bg-[#0a0a0f]/80 border border-white/6 relative overflow-hidden">
          {/* Inner glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-125 h-75 bg-[#ea0d7c]/20 rounded-full blur-[120px]" />

          <div className="relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#ea0d7c]/10 border border-[#ea0d7c]/20 rounded-full text-[#ea0d7c] text-sm font-medium mb-8">
              <Clock className="w-4 h-4" />
              <span>Limited spots available this month</span>
            </div>

            <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-6">
              Let's Build Something{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#ea0d7c] to-[#ff6b6b]">
                Amazing
              </span>
            </h2>

            <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              Book a free strategy call. We'll discuss your challenges, explore solutions, and create a custom roadmap for your success.
            </p>

            {/* Benefits */}
            <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto mb-10">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-2 text-left">
                  <CheckCircle2 className="w-5 h-5 text-[#ea0d7c] shrink-0" />
                  <span className="text-gray-300 text-sm">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-[#ea0d7c] hover:bg-[#ea0d7c]/90 text-white rounded-full px-10 py-7 text-lg font-semibold shadow-[0_0_40px_rgba(234,13,124,0.4)] hover:shadow-[0_0_60px_rgba(234,13,124,0.5)] transition-all duration-300"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Your Free Call
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            <p className="text-gray-500 text-sm mt-6">
              No credit card required • Response within 24 hours
            </p>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm mb-4">Trusted by founders at</p>
          <div className="flex flex-wrap justify-center gap-8 opacity-40">
            {["TechFlow", "RetailPro", "FinanceHub", "GrowthScale", "DataSync"].map((company) => (
              <span key={company} className="text-white font-semibold">{company}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
