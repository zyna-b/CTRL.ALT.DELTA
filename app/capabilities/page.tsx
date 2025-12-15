"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CapabilitiesPage() {
  const handleContactClick = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-4 md:px-6 overflow-hidden bg-black">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-150 h-150 bg-[#ff007f]/10 rounded-full blur-[200px]" />
        <div className="absolute bottom-1/4 right-1/4 w-100 h-100 bg-[#ff007f]/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <div className="mb-6 inline-block">
            <span className="px-4 py-2 rounded-full border border-[#ff007f]/30 bg-[#ff007f]/5 text-[#ff007f] text-xs font-semibold uppercase tracking-widest">
              COMING SOON
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-6xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-6">
            Our Full{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#ff007f] to-[#ff6b6b]">
              Capabilities
            </span>
          </h1>

          {/* Description */}
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
            We're building a comprehensive showcase of our AI, automation, and software engineering expertise. 
            This page will detail our technical capabilities, case studies, and service offerings.
          </p>

          {/* Content Coming Soon */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 mb-12">
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 justify-center">
                <div className="w-2 h-2 rounded-full bg-[#ff007f] animate-pulse" />
                <p className="text-gray-400">Full service breakdown</p>
              </div>
              <div className="flex items-center gap-3 justify-center">
                <div className="w-2 h-2 rounded-full bg-[#ff007f] animate-pulse" />
                <p className="text-gray-400">Technical architecture details</p>
              </div>
              <div className="flex items-center gap-3 justify-center">
                <div className="w-2 h-2 rounded-full bg-[#ff007f] animate-pulse" />
                <p className="text-gray-400">Industry expertise & case studies</p>
              </div>
            </div>

            <p className="text-gray-500 text-sm">
              In the meantime, let's discuss your specific needs.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleContactClick}
              className="bg-[#ff007f] hover:bg-[#ff007f]/90 text-white rounded-full px-8 py-6 text-base font-bold shadow-[0_0_40px_rgba(255,0,127,0.4)] hover:shadow-[0_0_60px_rgba(255,0,127,0.6)] transition-all duration-300 hover:scale-[1.02]"
            >
              BOOK STRATEGY CALL <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <a
              href="/"
              className="inline-flex items-center justify-center px-8 py-6 rounded-full border border-white/10 hover:border-[#ff007f]/30 bg-white/5 hover:bg-white/10 text-white font-bold transition-all duration-300"
            >
              BACK TO HOME <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-black to-transparent pointer-events-none z-10" />
    </section>
  )
}
