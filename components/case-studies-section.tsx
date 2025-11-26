"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUpRight, TrendingUp, Clock, DollarSign } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const caseStudies = [
  {
    company: "VisionSense Analytics",
    industry: "Computer Vision / Retail Tech",
    image: "/images/case-1.jpg",
    challenge: "Traditional customer feedback surveys have a <2% response rate. A retail client needed a way to measure authentic customer satisfaction in real-time without interrupting the shopping experience.",
    solution: "We engineered a custom Convolutional Neural Network (CNN) optimized for edge deployment. The system analyzes micro-expressions via standard webcams to categorize customer sentiment instantly.",
    results: [
      { icon: TrendingUp, value: "92%", label: "Model Accuracy" },
      { icon: Clock, value: "<100ms", label: "Real-Time Latency" },
      { icon: DollarSign, value: "GDPR", label: "Compliant" },
    ],
    quote: "Validated on FER-2013. No video storage required.",
  },
]

export function CaseStudiesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        y: 60,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".case-studies-container",
          start: "top 85%",
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="results"
      className="relative py-32 px-4 md:px-6 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ea0d7c]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#ea0d7c]/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <p className="text-[#ea0d7c] text-sm font-semibold uppercase tracking-widest mb-4">
            Case Studies
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
            Real Results,{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#ea0d7c] to-[#ff6b6b]">
              Real Impact
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Don't take our word for it. See how we've helped founders like you achieve breakthrough results.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="case-studies-container space-y-8">
          {caseStudies.map((study, index) => (
            <div
              key={study.company}
              ref={(el) => {
                if (el) cardsRef.current[index] = el
              }}
              className="group relative rounded-3xl bg-[#0a0a0f]/80 border border-white/6 hover:border-[#ea0d7c]/20 transition-all duration-500 overflow-hidden"
            >
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Image/Visual Side */}
                <div className="relative h-64 lg:h-auto bg-linear-to-br from-[#ea0d7c]/20 to-[#0a0a0f] flex items-center justify-center p-8">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-[#ea0d7c]/20 border border-[#ea0d7c]/30 flex items-center justify-center">
                      <span className="text-3xl font-black text-[#ea0d7c]">
                        {study.company.charAt(0)}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">{study.company}</h3>
                    <span className="text-[#ea0d7c] text-sm font-medium">{study.industry}</span>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-32 h-32 border border-[#ea0d7c]/10 rounded-full" />
                  <div className="absolute bottom-4 left-4 w-24 h-24 border border-[#ea0d7c]/10 rounded-full" />
                </div>

                {/* Content Side */}
                <div className="p-8 lg:p-10">
                  {/* Challenge & Solution */}
                  <div className="space-y-4 mb-8">
                    <div>
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">The Challenge</span>
                      <p className="text-gray-300 mt-1">{study.challenge}</p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-[#ea0d7c] uppercase tracking-wider">Our Solution</span>
                      <p className="text-white font-medium mt-1">{study.solution}</p>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    {study.results.map((result) => (
                      <div key={result.label} className="text-center p-3 rounded-xl bg-white/2 border border-white/4">
                        <result.icon className="w-5 h-5 text-[#ea0d7c] mx-auto mb-2" />
                        <div className="text-xl font-bold text-white">{result.value}</div>
                        <div className="text-xs text-gray-500">{result.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="border-l-2 border-[#ea0d7c] pl-4 italic text-gray-400">
                    "{study.quote}"
                  </blockquote>

                  {/* CTA */}
                  <div className="mt-6 flex items-center gap-2 text-[#ea0d7c] group-hover:gap-3 transition-all duration-300 cursor-pointer">
                    <span className="text-sm font-semibold">Read Full Case Study</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
