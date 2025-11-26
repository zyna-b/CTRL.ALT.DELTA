"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Zap, Linkedin, Twitter, Mail, ArrowUpRight } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const footerLinks = {
  services: [
    { name: "MVP Development", href: "#services" },
    { name: "Custom AI Solutions", href: "#services" },
    { name: "AI Chatbots", href: "#services" },
    { name: "Workflow Automation", href: "#services" },
  ],
  company: [
    { name: "About Us", href: "#about" },
    { name: "Case Studies", href: "#results" },
    { name: "Process", href: "#process" },
    { name: "Pricing", href: "#pricing" },
  ],
  resources: [
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
  ],
}

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(footerRef.current, {
        opacity: 0,
        y: 30,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 95%",
        },
      })
    }, footerRef)

    return () => ctx.revert()
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer ref={footerRef} className="relative py-16 px-4 md:px-6 border-t border-white/6 bg-[#050508]">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#0a0a0f] border border-[#ea0d7c]/30 flex items-center justify-center">
                <Zap className="w-5 h-5 text-[#ea0d7c]" strokeWidth={2.5} />
              </div>
              <span className="text-white font-bold text-lg">Ctrl.Alt.Delta</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
              Helping non-technical founders build MVPs and AI-powered automation that drives real business results.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-white/3 border border-white/6 flex items-center justify-center text-gray-400 hover:text-[#ea0d7c] hover:border-[#ea0d7c]/30 transition-all duration-300"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-white/3 border border-white/6 flex items-center justify-center text-gray-400 hover:text-[#ea0d7c] hover:border-[#ea0d7c]/30 transition-all duration-300"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-white/3 border border-white/6 flex items-center justify-center text-gray-400 hover:text-[#ea0d7c] hover:border-[#ea0d7c]/30 transition-all duration-300"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 text-sm hover:text-[#ea0d7c] transition-colors flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 text-sm hover:text-[#ea0d7c] transition-colors flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 text-sm hover:text-[#ea0d7c] transition-colors flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © 2025 Ctrl.Alt.Delta. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-500 text-sm hover:text-gray-300 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 text-sm hover:text-gray-300 transition-colors">
              Terms of Service
            </a>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-gray-500 text-sm">All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
