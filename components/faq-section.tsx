"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "I am a non-technical founder. How will we collaborate?",
    answer: "We specialize in working with non-technical founders. We act as your fractional CTO, translating your business vision into technical reality. You won't get lost in jargon; instead, you get clear weekly updates, visual demos, and a partner who speaks the language of business ROI.",
  },
  {
    question: "How long does it take to launch a custom AI MVP?",
    answer: "We focus on speed to market. Most AI MVPs are designed, built, and launched in 4-8 weeks. Our agile sprint process ensures you see working features within the first 14 days, allowing you to validate your idea with real users faster.",
  },
  {
    question: "Do I retain 100% Intellectual Property (IP) and Source Code ownership?",
    answer: "Yes. Unlike agencies that 'lease' you software, we build assets. Once the project is paid for, you own 100% of the source code, IP, and documentation. You are building proprietary value for your company's valuation, not ours.",
  },
  {
    question: "How much does custom AI software development cost?",
    answer: "We provide transparent, fixed-scope pricing after our initial discovery call. We don't believe in hidden hourly billing. We define the deliverables and the cost upfront, so you can plan your runway with absolute certainty.",
  },
  {
    question: "Can you scale this AI solution to thousands of users?",
    answer: "Absolutely. We build on enterprise-grade cloud architecture (AWS/Vercel) from Day 1. While we start with an MVP, the foundation is engineered to handle massive scale, ensuring you don't have to rebuild your tech stack when you grow.",
  },
  {
    question: "What tech stack do you use for AI development?",
    answer: "We use industry-standard, future-proof technologies: Next.js and React for high-performance web interfaces, Python for advanced AI/ML logic, and vector databases for long-term memory. We choose tools that are powerful yet easy for other developers to maintain.",
  },
  {
    question: "Do you offer post-launch maintenance and support?",
    answer: "Yes. Software requires care. We offer flexible monthly retainer packages to handle updates, security patches, and feature additions. Alternatively, if you hire an in-house team later, we provide full handover training to ensure a smooth transition.",
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="relative py-20 md:py-32 px-4 md:px-6 overflow-hidden bg-black">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(209, 0, 107, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(209, 0, 107, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter leading-[0.9]">
            Questions.
            <br />
            {/* UPDATED: Consistent accent color with theme */}
            <span className="text-[#D1006B]">Answered.</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl">
            Everything you need to know about our process, IP ownership, and technical approach.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full text-left"
              >
                <motion.div
                  animate={{
                    boxShadow:
                      openIndex === index
                        ? "0 0 30px rgba(209, 0, 107, 0.2)"
                        : "0 0 10px rgba(209, 0, 107, 0.05)",
                  }}
                  transition={{ duration: 0.3 }}
                  className={`
                    px-6 py-6 rounded-xl border transition-all duration-300
                    ${
                      openIndex === index
                        ? "border-[#D1006B] bg-[#D1006B]/5"
                        : "border-[#D1006B]/30 bg-[#D1006B]/2 hover:border-[#D1006B]/50"
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-semibold text-lg tracking-tight pr-4">
                      {faq.question}
                    </h3>
                    <motion.div
                      animate={{
                        rotate: openIndex === index ? 180 : 0,
                      }}
                      transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                      className="shrink-0 ml-4"
                    >
                      <ChevronDown 
                        className={`w-6 h-6 transition-colors duration-300 ${openIndex === index ? 'text-[#D1006B]' : 'text-[#D1006B]'}`} 
                      />
                    </motion.div>
                  </div>
                </motion.div>
              </button>

              {/* Answer */}
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: openIndex === index ? 1 : 0,
                  height: openIndex === index ? "auto" : 0,
                }}
                transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
                className="overflow-hidden"
              >
                {/* UPDATED: Text color reverted to readable Gray */}
                <div className="px-6 py-5 text-gray-300 text-base leading-relaxed">
                  {faq.answer}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA Footer */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 pt-8 border-t border-[#D1006B]/20 text-center"
        >
          <p className="text-gray-400 mb-4">Still have questions?</p>
          <a
            href="mailto:hello@ctrl-alt-delta.ai"
            className="text-[#D1006B] hover:text-white transition-colors font-semibold uppercase tracking-wider"
          >
            hello@ctrl-alt-delta.ai
          </a>
        </motion.div>
      </div>
    </section>
  )
}