"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Menu, X } from "lucide-react"
import Image from "next/image"

const navItems = [
  { label: "Home", id: "home" },
  { label: "Capabilities", id: "services" },
  { label: "Process", id: "process" },
  { label: "Results", id: "results" },
  { label: "Contact", id: "contact" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showCta, setShowCta] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      setShowCta(window.scrollY > window.innerHeight * 0.8)

      // Update active section based on scroll position
      const sections = navItems.map(item => document.getElementById(item.id))
      const scrollPosition = window.scrollY + 100

      sections.forEach((section, index) => {
        if (section) {
          const sectionTop = section.offsetTop
          const sectionHeight = section.offsetHeight
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(navItems[index].id)
          }
        }
      })
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setMobileMenuOpen(false)
      setActiveSection(id)
    }
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? "bg-[#050508]/80 backdrop-blur-xl border-b border-[#ff007f]/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]" 
        : "bg-[#050508]/40 backdrop-blur-md"
    }`}>
      <nav className={`max-w-[1400px] mx-auto px-6 lg:px-8 flex items-center justify-between transition-all duration-500 ${
      scrolled ? "py-3" : "py-5"
    }`}>
        {/* Logo */}
        <button 
          onClick={() => scrollToSection("home")}
          className="flex items-center group relative overflow-hidden"
        >
          <div className="relative w-16 h-16 shrink-0 z-10">
            <Image 
              src="/images/logo.png"
              alt="Ctrl.Alt.Delta Logo" 
              fill
              className="object-contain group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.6)] transition-all duration-500"
            />
          </div>
          <div className="overflow-hidden max-w-0 group-hover:max-w-[200px] transition-all duration-500 ease-in-out">
            <span className="text-white font-bold text-lg tracking-tight whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              Ctrl.Alt.Delta
            </span>
          </div>
        </button>

        {/* Desktop Navigation - Center */}
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`text-sm font-medium transition-all duration-300 ${
                activeSection === item.id 
                  ? "text-white" 
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right side - AI Status, CTA & Mobile Toggle */}
        <div className="flex items-center gap-4">
          {/* AI Status Indicator */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ff007f]/10 border border-[#ff007f]/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff007f] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff007f]"></span>
            </span>
            <span className="text-[#ff007f] text-xs font-semibold tracking-wide">Delta-1 Active</span>
          </div>

          <Button 
            onClick={() => scrollToSection("contact")}
            className={`hidden sm:flex items-center gap-2 bg-[#ff007f] hover:bg-[#ff007f]/90 text-white rounded-lg px-5 py-2 text-sm font-semibold transition-all duration-500 hover:scale-[1.02] shadow-[0_0_20px_rgba(255,0,127,0.3)] ${
              showCta ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
          >
            <span>Book Strategy Call</span>
            <ArrowRight className="w-4 h-4" />
          </Button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden relative w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white transition-all duration-300"
          >
            <div className="relative w-5 h-5">
              <span className={`absolute left-0 w-5 h-0.5 bg-current transition-all duration-300 ${
                mobileMenuOpen ? "top-[9px] rotate-45" : "top-1"
              }`} />
              <span className={`absolute left-0 top-[9px] w-5 h-0.5 bg-current transition-all duration-300 ${
                mobileMenuOpen ? "opacity-0 scale-0" : "opacity-100"
              }`} />
              <span className={`absolute left-0 w-5 h-0.5 bg-current transition-all duration-300 ${
                mobileMenuOpen ? "top-[9px] -rotate-45" : "top-[17px]"
              }`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`lg:hidden absolute top-full left-0 right-0 bg-[#050508]/95 backdrop-blur-2xl border-b border-[#ff007f]/10 shadow-lg transition-all duration-500 overflow-hidden ${
        mobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
      }`}>
        <div className="max-w-[1400px] mx-auto px-6 py-6">
          <div className="flex flex-col gap-1">
            {/* AI Status for Mobile */}
            <div className="flex items-center gap-2 px-4 py-3 mb-2 rounded-lg bg-[#ff007f]/10 border border-[#ff007f]/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff007f] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff007f]"></span>
              </span>
              <span className="text-[#ff007f] text-xs font-semibold tracking-wide">Delta-1 Active</span>
            </div>
            
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-4 py-3 rounded-lg text-left text-sm font-medium transition-all duration-300 ${
                  activeSection === item.id 
                    ? "bg-white/10 text-white" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="h-px bg-white/10 my-3" />
            <Button 
              onClick={() => scrollToSection("contact")}
              className="w-full bg-[#ff007f] hover:bg-[#ff007f]/90 text-white rounded-lg py-3 text-sm font-semibold shadow-[0_0_20px_rgba(255,0,127,0.3)]"
            >
              Book Strategy Call <ArrowRight className="w-4 h-4 ml-2 inline" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
