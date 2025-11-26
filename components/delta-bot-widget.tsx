"use client"

import { useState, useEffect, useRef } from "react"
import { Bot, X, Sparkles, MessageCircle } from "lucide-react"

const greetings = [
  { message: "Hey there! 👋 I'm Delta-1, the AI that actually runs this agency.", color: "#ea0d7c" },
  { message: "Unlike other chatbots, I'm not just support—I'm the architecture.", color: "#8b5cf6" },
  { message: "Got 2 minutes? Let me show you what AI ownership looks like.", color: "#06b6d4" },
  { message: "Still scrolling? That means you're curious. Let's chat! 💬", color: "#f59e0b" },
  { message: "Fun fact: I qualified 47 leads while you were reading this page.", color: "#10b981" },
]

export function DeltaBotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentToast, setCurrentToast] = useState<{ message: string; color: string } | null>(null)
  const [toastVisible, setToastVisible] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [pulseActive, setPulseActive] = useState(true)
  const toastIndexRef = useRef(0)
  const isRunningRef = useRef(false)

  useEffect(() => {
    if (hasInteracted || isOpen) {
      isRunningRef.current = false
      return
    }

    isRunningRef.current = true
    let hideTimeout: NodeJS.Timeout
    let showTimeout: NodeJS.Timeout

    const runToastCycle = () => {
      if (!isRunningRef.current) return

      // Show current toast
      const currentIndex = toastIndexRef.current % greetings.length
      setCurrentToast(greetings[currentIndex])
      setToastVisible(true)
      toastIndexRef.current = currentIndex + 1

      // Hide after 4 seconds
      hideTimeout = setTimeout(() => {
        if (!isRunningRef.current) return
        setToastVisible(false)

        // Show next toast after 3 seconds
        showTimeout = setTimeout(() => {
          if (!isRunningRef.current) return
          runToastCycle()
        }, 3000)
      }, 4000)
    }

    // Start first toast after 2.5 seconds
    const initialTimeout = setTimeout(() => {
      if (isRunningRef.current) {
        runToastCycle()
      }
    }, 2500)

    return () => {
      isRunningRef.current = false
      clearTimeout(initialTimeout)
      clearTimeout(hideTimeout)
      clearTimeout(showTimeout)
    }
  }, [hasInteracted, isOpen])

  const handleClick = () => {
    setIsOpen(!isOpen)
    setHasInteracted(true)
    setToastVisible(false)
    setPulseActive(false)
  }

  const dismissToast = () => {
    setToastVisible(false)
    setHasInteracted(true)
  }

  return (
    <>
      {/* Toast Notification */}
      <div 
        className={`fixed bottom-28 sm:bottom-28 right-4 sm:right-6 z-50 max-w-[280px] sm:max-w-sm transition-all duration-500 ${
          toastVisible 
            ? "opacity-100 translate-y-0 translate-x-0" 
            : "opacity-0 translate-y-4 translate-x-4 pointer-events-none"
        }`}
      >
        <div 
          className="relative bg-[#0a0a0f]/95 backdrop-blur-xl rounded-2xl p-4 shadow-[0_0_40px_rgba(0,0,0,0.5)]"
          style={{ 
            borderWidth: '2px',
            borderStyle: 'solid',
            borderColor: currentToast?.color || '#ea0d7c',
            boxShadow: `0 0 30px ${currentToast?.color}40, 0 0 60px ${currentToast?.color}20`
          }}
        >
          {/* Glow effect */}
          <div 
            className="absolute -inset-px rounded-2xl blur-sm opacity-50"
            style={{ background: `linear-gradient(to right, ${currentToast?.color}40, transparent)` }}
          />
          
          <div className="relative">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${currentToast?.color}, ${currentToast?.color}80)` }}
                >
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">Delta-1</p>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-green-500 text-[10px]">Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={dismissToast}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            {/* Message */}
            <p className="text-gray-300 text-sm leading-relaxed">
              {currentToast?.message}
            </p>
            
            {/* Quick action */}
            <button 
              onClick={handleClick}
              className="mt-3 w-full py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2"
              style={{ 
                backgroundColor: `${currentToast?.color}20`,
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: `${currentToast?.color}50`,
                color: currentToast?.color
              }}
            >
              <MessageCircle className="w-4 h-4" />
              Talk to me
            </button>
          </div>
        </div>
      </div>

      {/* Chat Window (when opened) */}
      <div 
        className={`fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 transition-all duration-500 ${
          isOpen 
            ? "opacity-100 translate-y-0 scale-100" 
            : "opacity-0 translate-y-8 scale-95 pointer-events-none"
        }`}
      >
        <div className="bg-[#0a0a0f]/95 backdrop-blur-xl border border-[#ea0d7c]/30 rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(234,13,124,0.3)]">
          {/* Header */}
          <div className="relative px-5 py-4 bg-linear-to-r from-[#ea0d7c]/20 to-transparent border-b border-white/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-[#ea0d7c] to-[#ea0d7c]/60 flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[#0a0a0f]" />
                </div>
                <div>
                  <h3 className="text-white font-bold">Delta-1</h3>
                  <p className="text-gray-400 text-xs flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#ea0d7c]" />
                    Autonomous AI Agent
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Chat Body */}
          <div className="p-5 h-80 overflow-y-auto">
            {/* Bot message */}
            <div className="flex gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#ea0d7c]/20 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-[#ea0d7c]" />
              </div>
              <div className="bg-white/5 rounded-2xl rounded-tl-sm p-4 max-w-[85%]">
                <p className="text-gray-300 text-sm leading-relaxed">
                  Welcome! I'm Delta-1, the AI that manages Ctrl.Alt.Delta. 
                  I handle lead qualification, answer questions, and can tell you everything about our services.
                </p>
                <p className="text-gray-500 text-xs mt-2">Just now</p>
              </div>
            </div>

            {/* Quick responses */}
            <div className="space-y-2">
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-3">Quick questions</p>
              {[
                "What services do you offer?",
                "How long does an MVP take?",
                "What's your pricing like?",
                "Book a discovery call",
              ].map((question) => (
                <button
                  key={question}
                  className="block w-full text-left px-4 py-3 bg-white/5 hover:bg-[#ea0d7c]/10 border border-white/5 hover:border-[#ea0d7c]/30 rounded-xl text-gray-300 text-sm transition-all duration-300"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
          
          {/* Input */}
          <div className="p-4 border-t border-white/5">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ask me anything..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-[#ea0d7c]/50 transition-colors"
              />
              <button className="px-4 py-3 bg-[#ea0d7c] hover:bg-[#ea0d7c]/90 rounded-xl text-white transition-colors">
                <MessageCircle className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Button */}
      <button
        onClick={handleClick}
        className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 group animate-bounce-slow"
        style={{
          animation: isOpen ? 'none' : 'float 3s ease-in-out infinite'
        }}
      >
        {/* Pulse rings */}
        {pulseActive && (
          <>
            <span className="absolute inset-0 rounded-full bg-[#ea0d7c] animate-ping opacity-20" />
            <span className="absolute -inset-2 rounded-full bg-[#ea0d7c]/20 animate-pulse" />
          </>
        )}
        
        {/* Button */}
        <div className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-linear-to-br from-[#ea0d7c] to-[#c4096a] flex items-center justify-center shadow-[0_0_40px_rgba(234,13,124,0.5)] transition-all duration-300 ${
          isOpen ? "rotate-0 scale-90" : "group-hover:scale-110"
        }`}>
          {isOpen ? (
            <X className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          ) : (
            <Bot className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          )}
        </div>
        
        {/* Status indicator */}
        <span className="absolute top-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-[#0a0a0f] flex items-center justify-center">
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
        </span>
      </button>

      {/* Floating animation keyframes */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </>
  )
}
