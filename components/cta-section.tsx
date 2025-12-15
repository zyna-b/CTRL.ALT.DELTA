"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Zap } from "lucide-react"

export function CTASection() {
  const [isHovered, setIsHovered] = useState(false)

  const handleBookCall = () => {
    // Assuming you have a section with id="contact" or a booking link
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
    // OR: window.open('YOUR_CALENDLY_LINK', '_blank')
  }

  const terminalLines = [
    "$ ./schedule_feasibility_check.sh",
    "> CONNECTING TO CALENDAR API...",
    "> IDENTIFYING OPEN SLOTS...",
    "> ALLOCATING SENIOR ENGINEER TIME...",
    "> STATUS: WAITING FOR USER INPUT",
  ]

  return (
    <section className="relative py-32 px-4 md:px-6 overflow-hidden bg-black">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(209, 0, 107, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(209, 0, 107, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          // UPDATED: Changed rounded-none to rounded-xl here
          className={`
            relative grid md:grid-cols-2 gap-0 rounded-xl border transition-all duration-300 overflow-hidden
            ${
              isHovered
                ? "border-[#D1006B] shadow-[0_0_60px_rgba(209,0,107,0.3)]"
                : "border-[#D1006B]/50 shadow-[0_0_20px_rgba(209,0,107,0.15)]"
            }
          `}
          style={{
            backgroundColor: "rgba(10, 10, 15, 0.8)",
            backdropFilter: "blur(12px)",
          }}
        >
          {/* Left Content Section */}
          <div className="p-12 md:p-16 flex flex-col justify-between border-r border-[#D1006B]/20">
            {/* Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-6">
                  Ready to Own Your{" "}
                  <span className="text-[#D1006B]">Intelligence?</span>
                </h2>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-gray-300 text-lg leading-relaxed mb-8 max-w-md"
              >
                Stop renting generic tools. Book a direct strategy session to map out your proprietary AI infrastructure.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex gap-3 items-center"
              >
                <div className="w-3 h-3 bg-[#D1006B] rounded-none" />
                <span className="text-sm text-gray-400 font-mono uppercase tracking-wider">
                  Direct access to builder (No Sales Reps)
                </span>
              </motion.div>
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-8"
            >
              <Button
                onClick={handleBookCall}
                className="w-full rounded-lg py-6 px-8 text-lg font-bold uppercase tracking-wider bg-[#D1006B] text-white shadow-[0_0_40px_rgba(209,0,107,0.5)]"
              >
                BOOK STRATEGY CALL
              </Button>
            </motion.div>
          </div>

          {/* Right Terminal Section */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="p-12 md:p-16 flex flex-col justify-center bg-[#050508]/50 border-l border-[#D1006B]/10"
          >
            <div className="space-y-0 font-mono text-sm">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 pb-4 border-b border-[#D1006B]/20 mb-4">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 bg-[#D1006B]/40 rounded-none" />
                  <div className="w-2.5 h-2.5 bg-[#D1006B]/40 rounded-none" />
                  <div className="w-2.5 h-2.5 bg-[#D1006B]/40 rounded-none" />
                </div>
                <span className="text-[#D1006B]/60 text-xs uppercase tracking-wider ml-2">
                  ctrl.alt.delta.sh
                </span>
              </div>

              {/* Terminal Lines */}
              {terminalLines.map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="text-[#D1006B]/80 leading-relaxed"
                >
                  {line}
                </motion.div>
              ))}

              {/* Blinking Input */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="mt-4 pt-2 border-t border-[#D1006B]/20"
              >
                <span className="text-white/50 text-xs block mb-1">
                  AWAITING_CONFIRMATION...
                </span>
                <div className="flex items-center text-[#D1006B]">
                  <span className="mr-2">&gt;</span>
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  >
                    ▮
                  </motion.span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Trust Line (Risk Reversal) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-8 text-gray-500 font-mono text-sm"
        >
          // Free 30-min technical feasibility audit. No sales fluff.
        </motion.div>
      </div>
    </section>
  )
}