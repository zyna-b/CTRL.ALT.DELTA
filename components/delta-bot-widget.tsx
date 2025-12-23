"use client"

import { useState, useEffect, useRef } from "react"
import { Bot, X, Sparkles, MessageCircle, Send, User } from "lucide-react"

// Types
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface ToastMessage {
  message: string;
  color: string;
}

const greetings: ToastMessage[] = [
  { message: "Hey there! 👋 I'm Delta-1, the AI that actually runs this agency.", color: "#ea0d7c" },
  { message: "Unlike other chatbots, I'm not just support—I'm the architecture.", color: "#8b5cf6" },
  { message: "Got 2 minutes? Let me show you what AI ownership looks like.", color: "#06b6d4" },
  { message: "Still scrolling? That means you're curious. Let's chat! 💬", color: "#f59e0b" },
  { message: "Fun fact: I qualified 47 leads while you were reading this page.", color: "#10b981" },
]

export function DeltaBotWidget() {
  // UI States
  const [isOpen, setIsOpen] = useState(false)
  const [currentToast, setCurrentToast] = useState<ToastMessage | null>(null)
  const [toastVisible, setToastVisible] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [pulseActive, setPulseActive] = useState(true)
  
  // --- MANUAL CHAT ENGINE (NO SDK DEPENDENCY) ---
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Welcome! I'm Delta-1, the AI that manages Ctrl.Alt.Delta. I handle lead qualification, answer questions, and can tell you everything about our services."
    }
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Refs
  const toastIndexRef = useRef(0)
  const isRunningRef = useRef(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // --- THE CORE LOGIC: SEND MESSAGE ---
  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return

    // 1. Add User Message
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content }
    setMessages(prev => [...prev, userMsg])
    setInput("")
    setIsLoading(true)

    try {
      // 2. Fetch from API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      })

      if (!response.ok) throw new Error('Network error')

      // 3. Create Placeholder for Bot Message
      const botMsgId = (Date.now() + 1).toString()
      setMessages(prev => [...prev, { id: botMsgId, role: 'assistant', content: "" }])

      // 4. Read the Stream
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      
      if (!reader) return

      let botResponse = ""

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        botResponse += chunk

        // Update the last message (Bot's message) with new chunk
        setMessages(prev => prev.map(msg => 
          msg.id === botMsgId ? { ...msg, content: botResponse } : msg
        ))
      }

    } catch (error) {
      console.error("Chat Error:", error)
      setMessages(prev => [...prev, { id: 'error', role: 'assistant', content: "System connection interrupted. Please try again." }])
    } finally {
      setIsLoading(false)
    }
  }

  // Handle Form Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  // Handle Quick Click
  const handleQuickClick = (text: string) => {
    sendMessage(text)
  }

  // Auto-scroll
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100)
    }
  }, [messages, isOpen])

  // --- TOAST LOGIC (Unchanged) ---
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
      const currentIndex = toastIndexRef.current % greetings.length
      setCurrentToast(greetings[currentIndex])
      setToastVisible(true)
      toastIndexRef.current = currentIndex + 1

      hideTimeout = setTimeout(() => {
        if (!isRunningRef.current) return
        setToastVisible(false)
        showTimeout = setTimeout(() => {
          if (!isRunningRef.current) return
          runToastCycle()
        }, 3000)
      }, 4000)
    }

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
          className="relative bg-black/90 backdrop-blur-xl border rounded-lg p-4 shadow-[0_0_40px_rgba(0,0,0,0.5)]"
          style={{ borderColor: `${currentToast?.color}40` }}
        >
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 rounded-tl" style={{ borderColor: currentToast?.color }} />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 rounded-tr" style={{ borderColor: currentToast?.color }} />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 rounded-bl" style={{ borderColor: currentToast?.color }} />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 rounded-br" style={{ borderColor: currentToast?.color }} />

            <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: currentToast?.color }} />
                <span className="text-[10px] font-mono tracking-wider" style={{ color: currentToast?.color }}>DELTA-1 NOTIFICATION</span>
              </div>
              <button onClick={dismissToast} className="text-gray-500 hover:text-white transition-colors">
                <X className="w-3 h-3" />
              </button>
            </div>
            
            <p className="text-gray-300 text-xs sm:text-sm font-mono leading-relaxed mb-3">
              {currentToast?.message}
            </p>
            
            <button 
              onClick={handleClick}
              className="w-full py-2 bg-white/5 hover:bg-white/10 border rounded text-[10px] sm:text-xs font-mono transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-wider"
              style={{ borderColor: `${currentToast?.color}40`, color: currentToast?.color }}
            >
              <MessageCircle className="w-3 h-3" />
              Initialize Chat Protocol
            </button>
        </div>
      </div>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 transition-all duration-500 ${
          isOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95 pointer-events-none"
        }`}
      >
        <div className="bg-[#0a0a0f]/95 backdrop-blur-xl border border-[#ea0d7c]/30 rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(234,13,124,0.3)] flex flex-col h-[500px]">
          
          {/* Header */}
          <div className="relative px-5 py-4 bg-linear-to-r from-[#ea0d7c]/20 to-transparent border-b border-white/5 shrink-0">
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
                    Autonomous Agent
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Chat Body (Scrollable) */}
          <div className="flex-1 p-5 overflow-y-auto scrollbar-thin scrollbar-thumb-[#ea0d7c]/20 scrollbar-track-transparent">
            {messages.map((m) => (
              <div key={m.id} className={`flex gap-3 mb-4 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {m.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-[#ea0d7c]/20 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-[#ea0d7c]" />
                  </div>
                )}
                <div className={`p-4 max-w-[85%] text-sm leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-[#ea0d7c] text-white rounded-2xl rounded-br-sm' 
                    : 'bg-white/5 text-gray-300 rounded-2xl rounded-tl-sm border border-white/5'
                }`}>
                  {m.content}
                </div>
                {m.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-1">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))}
            
            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-[#ea0d7c]/20 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-[#ea0d7c]" />
                </div>
                <div className="bg-white/5 rounded-2xl rounded-tl-sm p-4 border border-white/5">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-[#ea0d7c] rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-[#ea0d7c] rounded-full animate-bounce delay-100" />
                    <span className="w-1.5 h-1.5 bg-[#ea0d7c] rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}

            {/* Quick Questions (Only show if few messages) */}
            {messages.length < 3 && (
              <div className="space-y-2 mt-4">
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-3">Quick questions</p>
                {[
                  "What services do you offer?",
                  "How long does an MVP take?",
                  "What's your pricing like?",
                  "I want to book a discovery call",
                ].map((question) => (
                  <button
                    key={question}
                    onClick={() => handleQuickClick(question)}
                    className="block w-full text-left px-4 py-3 bg-white/5 hover:bg-[#ea0d7c]/10 border border-white/5 hover:border-[#ea0d7c]/30 rounded-xl text-gray-300 text-sm transition-all duration-300"
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input Area */}
          <div className="p-4 border-t border-white/5 bg-[#0a0a0f] shrink-0">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                placeholder="Ask me anything..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-[#ea0d7c]/50 transition-colors"
              />
              <button 
                type="submit"
                disabled={isLoading || !input.trim()}
                className="px-4 py-3 bg-[#ea0d7c] hover:bg-[#ea0d7c]/90 rounded-xl text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Floating Trigger Button */}
      <button
        onClick={handleClick}
        className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 group"
        style={{
          animation: isOpen ? 'none' : 'float 3s ease-in-out infinite'
        }}
      >
        {pulseActive && (
          <>
            <span className="absolute inset-0 rounded-full bg-[#ea0d7c] animate-ping opacity-20" />
            <span className="absolute -inset-2 rounded-full bg-[#ea0d7c]/20 animate-pulse" />
          </>
        )}
        <div className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-linear-to-br from-[#ea0d7c] to-[#c4096a] flex items-center justify-center shadow-[0_0_40px_rgba(234,13,124,0.5)] transition-all duration-300 ${
          isOpen ? "rotate-0 scale-90" : "group-hover:scale-110"
        }`}>
          {isOpen ? <X className="w-6 h-6 sm:w-7 sm:h-7 text-white" /> : <Bot className="w-6 h-6 sm:w-7 sm:h-7 text-white" />}
        </div>
        <span className="absolute top-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-[#0a0a0f] flex items-center justify-center">
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
        </span>
      </button>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </>
  )
}