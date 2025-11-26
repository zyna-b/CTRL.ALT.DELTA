"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Menu, X } from "lucide-react"

const navItems = [
  { label: "Home", id: "home" },
  { label: "Services", id: "services" },
  { label: "Process", id: "process" },
  { label: "Results", id: "results" },
  { label: "About", id: "about" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

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
      scrolled ? "py-2" : "py-3 sm:py-4"
    }`}>
      <div className="px-3 sm:px-4 md:px-6">
        <nav className={`max-w-6xl mx-auto flex items-center justify-between transition-all duration-500 ${
          scrolled 
            ? "px-3 sm:px-5 py-2.5 sm:py-3 rounded-full bg-[#0a0a0f]/70 backdrop-blur-2xl border border-white/8 shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)]" 
            : "px-3 sm:px-5 py-2.5 sm:py-3 rounded-full bg-white/3 backdrop-blur-sm border border-white/5"
        }`}>
          {/* Logo */}
          <button 
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-2 sm:gap-2.5 group"
          >
            {/* Logo mark */}
            <div className="relative w-8 h-8 sm:w-9 sm:h-9">
              <div className="absolute inset-0 bg-[#ea0d7c] rounded-lg sm:rounded-xl rotate-45 group-hover:rotate-55 transition-transform duration-300" />
              <div className="absolute inset-[3px] bg-[#0a0a0f] rounded-md sm:rounded-lg rotate-45" />
              <span className="absolute inset-0 flex items-center justify-center text-[#ea0d7c] font-black text-sm sm:text-base">
                Δ
              </span>
            </div>
            {/* Logo text */}
            <div className="hidden xs:flex flex-col">
              <span className="text-white font-bold text-sm sm:text-base leading-none tracking-tight">
                Ctrl.Alt
              </span>
              <span className="text-[#ea0d7c] font-bold text-sm sm:text-base leading-none tracking-tight">
                .Delta
              </span>
            </div>
          </button>

          {/* Desktop Navigation - Center */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
                  activeSection === item.id 
                    ? "text-white" 
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {activeSection === item.id && (
                  <span className="absolute inset-0 bg-white/8 rounded-full" />
                )}
                <span className="relative">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Right side - CTA & Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* CTA Button */}
            <Button 
              onClick={() => scrollToSection("contact")}
              className="hidden sm:flex items-center gap-1.5 bg-[#ea0d7c] hover:bg-[#d10b6f] text-white rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold transition-all duration-300 shadow-[0_0_20px_rgba(234,13,124,0.3)] hover:shadow-[0_0_30px_rgba(234,13,124,0.5)]"
            >
              <span>Book a Call</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </Button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden relative w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/5 hover:bg-white/10 border border-white/8 flex items-center justify-center text-white transition-all duration-300"
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
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden transition-all duration-500 overflow-hidden ${
        mobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
      }`}>
        <div className="px-3 sm:px-4 md:px-6 pt-3">
          <div className="max-w-6xl mx-auto bg-[#0a0a0f]/95 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-white/8 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            <div className="flex flex-col gap-1 sm:gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl text-left text-sm sm:text-base font-medium transition-all duration-300 ${
                    activeSection === item.id 
                      ? "bg-[#ea0d7c]/20 text-white border border-[#ea0d7c]/30" 
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="h-px bg-white/6 my-2 sm:my-3" />
              <Button 
                onClick={() => scrollToSection("contact")}
                className="w-full bg-[#ea0d7c] hover:bg-[#d10b6f] text-white rounded-xl sm:rounded-2xl py-3 sm:py-4 text-sm sm:text-base font-semibold shadow-[0_0_30px_rgba(234,13,124,0.4)]"
              >
                Book a Call <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
