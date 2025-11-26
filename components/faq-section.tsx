"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ChevronDown } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const faqs = [
  {
    question: "I'm not technical. Will I understand what you're building?",
    answer: "Absolutely. We pride ourselves on speaking your language, not tech jargon. You'll receive weekly updates in plain English, visual demos of progress, and we're always available to explain anything. Our goal is to make you feel confident and in control throughout the entire process.",
  },
  {
    question: "How long does it take to build an MVP?",
    answer: "Most MVPs are delivered in 4-8 weeks, depending on complexity. We'll give you a clear timeline during our discovery call. Our agile approach means you'll see working features within the first 2 weeks, not just at the end.",
  },
  {
    question: "What if I need changes after the project is done?",
    answer: "We build for flexibility. All our solutions come with a support period (1-3 months depending on the package). Beyond that, we offer ongoing maintenance retainers or can train your team to manage things independently. You own the code—you're never locked in.",
  },
  {
    question: "How much does it cost to build a custom AI solution?",
    answer: "Every project is unique, so we provide custom quotes after understanding your needs. During our free discovery call, we'll scope your project and give you a transparent breakdown of costs. No surprises, no hidden fees.",
  },
  {
    question: "Do I own the code and intellectual property?",
    answer: "Yes, 100%. Once the project is complete and paid for, all source code, documentation, and intellectual property belong to you. We build assets you own, not subscriptions you rent.",
  },
  {
    question: "What technologies do you use?",
    answer: "We use modern, proven technologies that balance performance, scalability, and maintainability. This includes React/Next.js for web apps, Python for AI/ML, and cloud platforms like AWS and Vercel. We choose the best tool for your specific needs, not just what's trendy.",
  },
  {
    question: "Can you integrate with our existing tools?",
    answer: "Yes! We specialize in integrations. Whether it's your CRM, accounting software, communication tools, or custom databases—we can connect your new AI solution to your existing tech stack seamlessly.",
  },
  {
    question: "What happens if we need to scale later?",
    answer: "We build with scale in mind from day one. Our architectures are designed to handle growth—from 100 users to 100,000. When you're ready to scale, we can help optimize and expand your solution.",
  },
]

export function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".faq-item", {
        y: 30,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".faq-container",
          start: "top 80%",
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-4 md:px-6 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#ea0d7c]/10 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-[#ea0d7c] text-sm font-semibold uppercase tracking-widest mb-4">
            FAQ
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
            Questions?{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#ea0d7c] to-[#ff6b6b]">
              Answered.
            </span>
          </h2>
          <p className="text-gray-400 text-lg">
            Everything you need to know before we start building together.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="faq-container space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="faq-item rounded-2xl bg-[#0a0a0f]/80 border border-white/6 overflow-hidden transition-all duration-300 hover:border-[#ea0d7c]/20"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left"
              >
                <span className="text-white font-semibold pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#ea0d7c] shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-6 pb-5 text-gray-400 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="text-center mt-12">
          <p className="text-gray-400">
            Still have questions?{" "}
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="text-[#ea0d7c] font-semibold hover:underline"
            >
              Get in touch
            </button>
          </p>
        </div>
      </div>
    </section>
  )
}
