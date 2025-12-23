"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export function CTASection() {
  const [isHovered, setIsHovered] = useState(false)

  const handleBookCall = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  const terminalLines = [
    "$ ./schedule_feasibility_check.sh",
    "> CONNECTING TO CALENDAR API...",
    "> IDENTIFYING OPEN SLOTS...",
    "> ALLOCATING SENIOR ENGINEER TIME...",
    "> STATUS: WAITING FOR USER INPUT",
  ]

  return (
    <section className="relative py-20 px-4 md:px-6 overflow-hidden bg-black flex justify-center items-center">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
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

      <div className="max-w-6xl w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`
            relative grid md:grid-cols-2 gap-0 rounded-3xl border transition-all duration-300 overflow-hidden
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
          {/* FIX: Reduced padding from p-16 to p-8/p-10 to give text more width */}
          <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center border-b md:border-b-0 md:border-r border-[#D1006B]/20">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {/* FIX: Precise font scaling. 
                    - base: text-4xl (Mobile)
                    - md: text-4xl (Tablet) 
                    - lg: text-5xl (Desktop)
                    - xl: text-6xl (Large Screens)
                    This prevents the word from becoming larger than its container.
                */}
                <h2 className="font-black text-white uppercase tracking-tighter leading-[0.95] mb-6">
                  <span className="block text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-1">
                    Ready to Own Your
                  </span>
                  <span className="block text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-[#D1006B]">
                    Intelligence?
                  </span>
                </h2>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-gray-300 text-sm md:text-base lg:text-lg leading-relaxed mb-8 max-w-md"
              >
                Stop renting generic tools. Book a direct strategy session to map out your proprietary AI infrastructure.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex gap-3 items-center mb-8"
              >
                <div className="w-2 h-2 md:w-3 md:h-3 bg-[#D1006B] shrink-0" />
                <span className="text-[10px] md:text-xs text-gray-400 font-mono uppercase tracking-wider">
                  Direct access to builder (No Sales Reps)
                </span>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Button
                onClick={handleBookCall}
                className="w-full sm:w-auto rounded-lg py-5 px-6 md:px-8 text-base md:text-lg font-bold uppercase tracking-wider bg-[#D1006B] text-white shadow-[0_0_40px_rgba(209,0,107,0.5)] hover:bg-[#D1006B]/90 transition-all"
              >
                BOOK STRATEGY CALL
              </Button>
            </motion.div>
          </div>

          {/* Right Terminal Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="p-8 md:p-10 lg:p-12 flex flex-col justify-center bg-[#050508]/50 min-h-75 md:min-h-100"
          >
            <div className="space-y-0 font-mono text-xs md:text-sm">
              <div className="flex items-center gap-2 pb-4 border-b border-[#D1006B]/20 mb-4">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-[#D1006B]/40" />
                  <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-[#D1006B]/40" />
                  <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-[#D1006B]/40" />
                </div>
                <span className="text-[#D1006B]/60 text-[10px] uppercase tracking-wider ml-2">
                  ctrl.alt.delta.sh
                </span>
              </div>

              {terminalLines.map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="text-[#D1006B]/80 leading-loose break-all"
                >
                  {line}
                </motion.div>
              ))}

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

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-8 text-gray-500 font-mono text-xs md:text-sm"
        >
          // Free 30-min technical feasibility audit. No sales fluff.
        </motion.div>
      </div>
    </section>
  )
}