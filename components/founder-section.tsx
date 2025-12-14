"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Linkedin, Twitter, Mail, Sparkles } from "lucide-react"
import Image from "next/image"

export function FounderSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Motion values for smooth tilt
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spring physics for buttery smooth animation
  const springConfig = { damping: 25, stiffness: 150 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig)

  // Parallax for floating elements
  const textX = useSpring(useTransform(mouseX, [-0.5, 0.5], [20, -20]), springConfig)
  const textY = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig)

  // Glow position
  const glowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [30, 70]), springConfig)
  const glowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [30, 70]), springConfig)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen py-20 md:py-32 px-4 md:px-6 bg-black overflow-hidden"
    >
      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(209, 0, 107, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(209, 0, 107, 0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Ambient Glow */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#D1006B]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-[#D1006B]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <p className="text-[#D1006B] text-sm font-semibold uppercase tracking-widest mb-4">
            Meet The Founder
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9]">
            The Mind Behind{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#D1006B] to-[#ff6b6b]">
              Ctrl.Alt.Delta
            </span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* 3D Tilt Card - Left Side */}
          <motion.div
            className="relative flex justify-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            style={{ perspective: 1000 }}
          >
            <motion.div
              ref={cardRef}
              className="relative w-full max-w-[400px] aspect-3/4 cursor-pointer"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX: isMobile ? 0 : rotateX,
                rotateY: isMobile ? 0 : rotateY,
                transformStyle: "preserve-3d",
              }}
            >
              {/* Card Base with Glassmorphic Effect */}
              <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-white/10 via-white/5 to-transparent backdrop-blur-sm border border-white/10 overflow-hidden shadow-2xl">
                
                {/* Dynamic Glow that follows cursor */}
                <motion.div
                  className="absolute w-[200px] h-[200px] bg-[#D1006B]/30 rounded-full blur-[80px] pointer-events-none"
                  style={{
                    left: glowX,
                    top: glowY,
                    x: "-50%",
                    y: "-50%",
                  }}
                />

                {/* Profile Image */}
                <div className="absolute inset-0">
                  <Image
                    src="/images/profile_image.png"
                    alt="Zainab Hamid - Founder"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Bottom Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />

                {/* Neon Border Glow */}
                <div className="absolute inset-0 rounded-3xl border-2 border-[#D1006B]/50 shadow-[inset_0_0_30px_rgba(209,0,107,0.2),0_0_40px_rgba(209,0,107,0.3)]" />

                {/* Scan Line Effect */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-30"
                  style={{
                    backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(209,0,107,0.03) 2px, rgba(209,0,107,0.03) 4px)",
                  }}
                />
              </div>

              {/* Floating Name Card - Parallax Effect */}
              <motion.div
                className="absolute bottom-8 left-4 right-4 p-4 rounded-2xl bg-black/80 backdrop-blur-xl border border-[#D1006B]/30"
                style={{
                  x: isMobile ? 0 : textX,
                  y: isMobile ? 0 : textY,
                  transformStyle: "preserve-3d",
                  translateZ: 50,
                }}
              >
                <h3 className="text-2xl font-bold text-white mb-1">Zainab Hamid</h3>
                <p className="text-[#D1006B] text-sm font-medium">Founder & Lead AI Engineer</p>
              </motion.div>

              {/* Floating Badge - Top Right with Parallax */}
              <motion.div
                className="absolute top-6 right-6 px-4 py-2 rounded-full bg-black/80 backdrop-blur-xl border border-[#D1006B]/50 flex items-center gap-2 shadow-[0_0_20px_rgba(209,0,107,0.4)]"
                style={{
                  x: isMobile ? 0 : useTransform(textX, (v) => -v * 0.5),
                  y: isMobile ? 0 : useTransform(textY, (v) => -v * 0.5),
                  transformStyle: "preserve-3d",
                  translateZ: 60,
                }}
              >
                <Sparkles className="w-4 h-4 text-[#D1006B]" />
                <span className="text-white text-sm font-bold">5+ Years in AI</span>
              </motion.div>

              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#D1006B] rounded-tl-3xl" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#D1006B] rounded-tr-3xl" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#D1006B] rounded-bl-3xl" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#D1006B] rounded-br-3xl" />
            </motion.div>
          </motion.div>

          {/* Content - Right Side */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {/* Headline Quote */}
            <div className="relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-linear-to-b from-[#D1006B] to-transparent rounded-full" />
              <blockquote className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight pl-6">
                "Traditional agencies deliver code.{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#D1006B] to-[#ff6b6b]">
                  We deliver ROI.
                </span>
                "
              </blockquote>
            </div>

            {/* Bio */}
            <p className="text-gray-400 text-lg leading-relaxed">
              Non-technical founders don't need just 'coders'—they need architects. I partner with you to translate undefined business requirements into scalable, production-ready AI infrastructure. No translation layers, no agency bloat. Just pure engineering velocity.
            </p>

            {/* Pillars Section - Typography Led */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/10">
              {/* Pillar 1 */}
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-sm md:text-base font-black uppercase tracking-wider text-[#D1006B]">
                  Technical Partnership
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Direct collaboration with the Lead Engineer.
                </p>
              </motion.div>

              {/* Pillar 2 */}
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-sm md:text-base font-black uppercase tracking-wider text-[#D1006B]">
                  Scalable Architecture
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Built for growth, not just for demo.
                </p>
              </motion.div>

              {/* Pillar 3 */}
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h3 className="text-sm md:text-base font-black uppercase tracking-wider text-[#D1006B]">
                  Intellectual Property
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  100% Client ownership of all assets.
                </p>
              </motion.div>
            </div>

            {/* CTA + Social */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-12">
              <motion.button
                className="px-8 py-4 bg-[#D1006B] hover:bg-[#D1006B]/90 text-white font-bold rounded-full shadow-[0_0_30px_rgba(209,0,107,0.4)] hover:shadow-[0_0_50px_rgba(209,0,107,0.6)] transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Book a Strategy Call
              </motion.button>

              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#D1006B] hover:border-[#D1006B]/50 hover:bg-[#D1006B]/10 transition-all duration-300"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#D1006B] hover:border-[#D1006B]/50 hover:bg-[#D1006B]/10 transition-all duration-300"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#D1006B] hover:border-[#D1006B]/50 hover:bg-[#D1006B]/10 transition-all duration-300"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
