"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    quote: "Ctrl.Alt.Delta turned our napkin sketch into a fully funded startup. They understood our vision immediately and delivered a product that exceeded investor expectations.",
    author: "Sarah Mitchell",
    role: "CEO & Co-founder",
    company: "TechFlow",
    avatar: "SM",
    rating: 5,
  },
  {
    quote: "We were drowning in customer queries. Their AI chatbot now handles 90% automatically—our support team can finally focus on complex issues that matter.",
    author: "James Rodriguez",
    role: "Head of Operations",
    company: "RetailPro",
    avatar: "JR",
    rating: 5,
  },
  {
    quote: "What used to take our team 40 hours weekly now takes 5. The automation they built didn't just save time—it eliminated human errors completely.",
    author: "Emily Chen",
    role: "CFO",
    company: "FinanceHub",
    avatar: "EC",
    rating: 5,
  },
  {
    quote: "As a non-technical founder, I was worried about being lost in jargon. They explained everything in plain English and kept us in the loop every step of the way.",
    author: "Michael Turner",
    role: "Founder",
    company: "GrowthScale",
    avatar: "MT",
    rating: 5,
  },
  {
    quote: "From concept to launch in 5 weeks. Their team worked like they were part of our company. Best decision we made this year.",
    author: "Amanda Foster",
    role: "CTO",
    company: "DataSync",
    avatar: "AF",
    rating: 5,
  },
]

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".testimonial-header", {
        y: 60,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Auto-advance
  useEffect(() => {
    const interval = setInterval(nextTestimonial, 6000)
    return () => clearInterval(interval)
  }, [])

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section ref={sectionRef} className="relative py-32 px-4 md:px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ea0d7c]/10 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="testimonial-header text-center mb-16">
          <p className="text-[#ea0d7c] text-sm font-semibold uppercase tracking-widest mb-4">
            Testimonials
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
            Trusted by{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#ea0d7c] to-[#ff6b6b]">
              300+ Founders
            </span>
          </h2>
        </div>

        {/* Main Testimonial Card */}
        <div className="relative">
          <div className="p-8 md:p-12 rounded-3xl bg-[#0a0a0f]/80 border border-white/6">
            {/* Quote Icon */}
            <Quote className="w-12 h-12 text-[#ea0d7c]/30 mb-8" />

            {/* Quote Text */}
            <blockquote className="text-xl md:text-2xl lg:text-3xl text-white font-medium leading-relaxed mb-10">
              "{currentTestimonial.quote}"
            </blockquote>

            {/* Rating */}
            <div className="flex gap-1 mb-6">
              {[...Array(currentTestimonial.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#ea0d7c] text-[#ea0d7c]" />
              ))}
            </div>

            {/* Author */}
            <div className="flex items-center justify-between flex-wrap gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-linear-to-br from-[#ea0d7c] to-[#ea0d7c]/60 flex items-center justify-center text-white font-bold text-lg">
                  {currentTestimonial.avatar}
                </div>
                <div>
                  <div className="text-white font-semibold text-lg">{currentTestimonial.author}</div>
                  <div className="text-gray-400 text-sm">
                    {currentTestimonial.role} at {currentTestimonial.company}
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center gap-3">
                <button
                  onClick={prevTestimonial}
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#ea0d7c]/50 transition-all duration-300"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#ea0d7c]/50 transition-all duration-300"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 bg-[#ea0d7c]"
                    : "bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
