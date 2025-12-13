"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Linkedin, Twitter, Mail } from "lucide-react"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

export function FounderSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        x: -100,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 30%",
          scrub: 1,
        },
      })

      gsap.from(contentRef.current, {
        x: 100,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 30%",
          scrub: 1,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="relative py-32 px-4 md:px-6 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-[#ea0d7c]/5 rounded-full blur-[150px] -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#ea0d7c]/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-[#ea0d7c] text-sm font-semibold uppercase tracking-widest mb-4">
            Meet The Founder
          </p>
          <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-6">
            The Mind Behind{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#ea0d7c] to-[#ff6b6b]">
              Ctrl.Alt.Delta
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Image */}
          <div ref={imageRef} className="relative">
            <div className="relative aspect-4/5 rounded-3xl overflow-hidden bg-linear-to-br from-[#ea0d7c]/20 via-[#0a0a0f] to-[#0a0a0f] border border-white/6">
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

              {/* Decorative gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0f]/80 via-transparent to-transparent" />

              {/* Grid pattern overlay */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `linear-gradient(rgba(234, 13, 124, 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(234, 13, 124, 0.1) 1px, transparent 1px)`,
                  backgroundSize: "40px 40px",
                }}
              />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 md:bottom-8 md:-right-8 px-6 py-4 bg-[#0a0a0f] border border-[#ea0d7c]/30 rounded-2xl shadow-[0_0_30px_rgba(234,13,124,0.2)]">
              <p className="text-3xl md:text-4xl font-black text-[#ea0d7c]">5+</p>
              <p className="text-sm text-gray-400">Years in AI</p>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef}>
            <h3 className="text-3xl md:text-4xl font-black text-white mb-2">
              Zainab Hamid
            </h3>
            <p className="text-[#ea0d7c] font-semibold mb-6">Founder & Lead AI Engineer</p>

            <div className="space-y-4 text-gray-400 text-lg leading-relaxed mb-8">
              <p>
                "I started Ctrl.Alt.Delta because I saw too many brilliant business ideas{" "}
                <span className="text-white font-medium">fail due to poor technical execution</span>. 
                Traditional agencies are too slow; freelancers are unreliable."
              </p>
              <p>
                "My background in{" "}
                <span className="text-[#ea0d7c] font-medium">Deep Learning and Full-Stack Development</span>{" "}
                allows me to bridge the gap between academic-grade AI and real-world business ROI."
              </p>
              <p>
                "We don't just write code;{" "}
                <span className="text-white font-medium">we build assets</span>."
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="#"
                className="w-12 h-12 rounded-xl bg-[#0a0a0f]/60 border border-white/6 flex items-center justify-center text-gray-400 hover:text-[#ea0d7c] hover:border-[#ea0d7c]/30 transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-xl bg-[#0a0a0f]/60 border border-white/6 flex items-center justify-center text-gray-400 hover:text-[#ea0d7c] hover:border-[#ea0d7c]/30 transition-all duration-300"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-xl bg-[#0a0a0f]/60 border border-white/6 flex items-center justify-center text-gray-400 hover:text-[#ea0d7c] hover:border-[#ea0d7c]/30 transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
