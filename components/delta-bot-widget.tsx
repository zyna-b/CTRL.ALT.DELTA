"use client"

import { useState, useEffect, useRef } from "react"
import { Bot, X, Send, User, Terminal, Zap } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Types
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
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

const statusMessages = ["ONLINE", "READY", "LISTENING", "ACTIVE"]

export function DeltaBotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentToast, setCurrentToast] = useState<ToastMessage | null>(null)
  const [toastVisible, setToastVisible] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [pulseActive, setPulseActive] = useState(true)
  const [statusIndex, setStatusIndex] = useState(0)
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Welcome! I'm **Delta-1**, the AI that manages **Ctrl.Alt.Delta**. I handle lead qualification, answer questions, and can tell you everything about our services.\n\n- 🚀 Ask about our **services**\n- 💰 Learn about **pricing**\n- 📅 Book a **discovery call**",
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const toastIndexRef = useRef(0)
  const isRunningRef = useRef(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Status rotation
  useEffect(() => {
    if (!isLoading && isOpen) {
      const interval = setInterval(() => {
        setStatusIndex(prev => (prev + 1) % statusMessages.length)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [isLoading, isOpen])

  // Send message
  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return

    const userMsg: Message = { 
      id: Date.now().toString(), 
      role: 'user', 
      content, 
      timestamp: new Date() 
    }
    
    setMessages(prev => [...prev, userMsg])
    setInput("")
    setIsLoading(true)

    const botMsgId = (Date.now() + 1).toString()
    setMessages(prev => [...prev, { 
      id: botMsgId, 
      role: 'assistant', 
      content: "", 
      timestamp: new Date() 
    }])

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({ 
            role: m.role, 
            content: m.content 
          })),
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const fullText = await response.text()
      
      setMessages(prev => prev.map(msg =>
        msg.id === botMsgId 
          ? { ...msg, content: fullText || '⚠️ Empty response from server' } 
          : msg
      ))
    } catch (error: any) {
      console.error('Chat error:', error)
      setMessages(prev => prev.map(msg =>
        msg.id === botMsgId
          ? { ...msg, content: `⚠️ Connection failed: ${error.message}` }
          : msg
      ))
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  const handleQuickClick = (text: string) => {
    sendMessage(text)
  }

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100)
    }
  }, [messages, isOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Toast logic
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

  const formatTime = (date?: Date) => {
    if (!date) return ""
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }

  // Simple markdown renderer
  const renderMarkdown = (text: string) => {
    if (!text) return null
    
    return text.split('\n').map((line, i) => {
      if (line.trim().match(/^[-*•]\s+(.+)$/)) {
        const content = line.trim().substring(2)
        return (
          <div key={i} className="flex items-start gap-2 my-1">
            <span className="text-[#ea0d7c] mt-0.5">▸</span>
            <span dangerouslySetInnerHTML={{ __html: content.replace(/\*\*(.+?)\*\*/g, '<strong class="text-[#ea0d7c]">$1</strong>') }} />
          </div>
        )
      }
      
      if (line.trim() === '') {
        return <div key={i} className="h-2" />
      }
      
      const formatted = line
        .replace(/\*\*(.+?)\*\*/g, '<strong class="text-[#ea0d7c] font-semibold">$1</strong>')
        .replace(/`(.+?)`/g, '<code class="bg-white/10 px-1.5 py-0.5 rounded text-[#ea0d7c] font-mono text-xs">$1</code>')
      
      return <p key={i} className="mb-2 last:mb-0" dangerouslySetInnerHTML={{ __html: formatted }} />
    })
  }

  return (
    <>
      {/* Toast */}
      <AnimatePresence>
        {toastVisible && currentToast && (
          <motion.div 
            initial={{ opacity: 0, y: 20, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, x: 20, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-28 right-4 sm:right-6 z-50 max-w-sm"
          >
            <div 
              className="relative bg-[#0a0a0f]/95 backdrop-blur-2xl border rounded-xl p-4 shadow-[0_0_60px_rgba(0,0,0,0.8)]"
              style={{ borderColor: `${currentToast.color}30` }}
            >
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 rounded-tl-lg" style={{ borderColor: currentToast.color }} />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 rounded-tr-lg" style={{ borderColor: currentToast.color }} />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 rounded-bl-lg" style={{ borderColor: currentToast.color }} />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 rounded-br-lg" style={{ borderColor: currentToast.color }} />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="w-2 h-2 rounded-full" 
                      style={{ backgroundColor: currentToast.color, boxShadow: `0 0 10px ${currentToast.color}` }} 
                    />
                    <span className="text-[10px] font-mono tracking-[0.2em] uppercase" style={{ color: currentToast.color }}>
                      Delta-1 // Incoming
                    </span>
                  </div>
                  <button onClick={dismissToast} className="text-gray-500 hover:text-white transition-colors p-1 hover:bg-white/10 rounded">
                    <X className="w-3 h-3" />
                  </button>
                </div>
                
                <p className="text-gray-300 text-xs sm:text-sm font-mono leading-relaxed mb-4">
                  {currentToast.message}
                </p>
                
                <motion.button 
                  onClick={handleClick}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-2.5 bg-white/5 hover:bg-white/10 border rounded-lg text-[10px] sm:text-xs font-mono transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-[0.15em]"
                  style={{ borderColor: `${currentToast.color}40`, color: currentToast.color }}
                >
                  <Terminal className="w-3 h-3" />
                  Initialize Chat Protocol
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-60 bg-black/70 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="fixed inset-0 z-70 flex items-center justify-center p-4"
            >
              <div className="relative w-[95%] sm:w-[85%] lg:w-[70%] h-[90%] sm:h-[85%] lg:h-[80%] max-w-5xl" onClick={(e) => e.stopPropagation()}>
                
                <div className="absolute -inset-1 bg-linear-to-rrom-[#ea0d7c]/30 via-[#ea0d7c]/10 to-[#ea0d7c]/30 rounded-3xl blur-xl opacity-60" />
                
                <div className="relative h-full bg-[#050508]/95 backdrop-blur-2xl border border-[#ea0d7c]/30 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(234,13,124,0.2)] flex flex-col">
                  
                  {/* Header */}
                  <div className="relative px-6 sm:px-8 py-4 border-b border-[#ea0d7c]/20 bg-[#050508]/50 shrink-0 z-10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                        </div>
                        <div className="w-px h-8 bg-white/10" />
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#ea0d7c] to-[#ea0d7c]/70 flex items-center justify-center">
                              <Bot className="w-5 h-5 text-white" />
                            </div>
                            <motion.span 
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ repeat: Infinity, duration: 2 }}
                              className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-[#050508]"
                            />
                          </div>
                          <div>
                            <h3 className="text-white font-semibold text-base">Delta-1</h3>
                            <span className="text-xs text-emerald-400">
                              {isLoading ? 'Typing...' : 'Online'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <motion.button 
                        onClick={() => setIsOpen(false)} 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white"
                      >
                        <X className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                  
                  {/* Messages */}
                  <div 
                    ref={chatContainerRef}
                    className="flex-1 px-4 sm:px-8 lg:px-16 py-6 overflow-y-auto relative z-10"
                  >
                    <div className="max-w-3xl mx-auto">
                      <AnimatePresence>
                        {messages.map((m, index) => (
                          <motion.div 
                            key={m.id} 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex gap-4 mb-6 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            {m.role === 'assistant' && (
                              <div className="w-10 h-10 rounded-xl bg-[#ea0d7c]/10 border border-[#ea0d7c]/30 flex items-center justify-center shrink-0 mt-1">
                                <Bot className="w-5 h-5 text-[#ea0d7c]" />
                              </div>
                            )}
                            <div className={`flex flex-col gap-1.5 ${m.role === 'user' ? 'items-end' : 'items-start'} max-w-[85%]`}>
                              <div className={`px-5 py-4 text-sm sm:text-base leading-relaxed ${
                                m.role === 'user' 
                                  ? 'bg-linear-to-br from-[#ea0d7c] to-[#ff1493] text-white rounded-2xl rounded-br-md' 
                                  : 'bg-[#0a0a0f]/80 text-gray-200 rounded-2xl rounded-tl-md border border-white/10'
                              }`}>
                                {m.role === 'assistant' ? renderMarkdown(m.content) : m.content}
                              </div>
                              <span className="text-[10px] font-mono text-gray-600 px-1">
                                {formatTime(m.timestamp)}
                              </span>
                            </div>
                            {m.role === 'user' && (
                              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-1">
                                <User className="w-5 h-5 text-white" />
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </AnimatePresence>
                      
                      {isLoading && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex gap-4 mb-6"
                        >
                          <div className="w-10 h-10 rounded-xl bg-[#ea0d7c]/10 border border-[#ea0d7c]/30 flex items-center justify-center shrink-0">
                            <Bot className="w-5 h-5 text-[#ea0d7c]" />
                          </div>
                          <div className="bg-[#0a0a0f]/80 rounded-2xl rounded-tl-md px-5 py-4 border border-white/10">
                            <div className="flex gap-1">
                              {[0, 1, 2, 3, 4].map((i) => (
                                <motion.div
                                  key={i}
                                  animate={{ height: ["4px", "20px", "4px"], backgroundColor: ["#ea0d7c", "#ff1493", "#ea0d7c"] }}
                                  transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.1 }}
                                  className="w-1 rounded-full"
                                />
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {messages.length < 3 && !isLoading && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="mt-8"
                        >
                          <div className="flex items-center gap-2 mb-4">
                            <Zap className="w-4 h-4 text-[#ea0d7c]" />
                            <p className="text-gray-500 text-xs uppercase tracking-[0.2em] font-mono">Quick Commands</p>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {[
                              "What services do you offer?",
                              "How long does an MVP take?",
                              "What's your pricing like?",
                              "I want to book a discovery call",
                            ].map((q) => (
                              <motion.button
                                key={q}
                                onClick={() => handleQuickClick(q)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="text-left px-4 py-3 bg-white/2 hover:bg-[#ea0d7c]/10 border border-white/10 hover:border-[#ea0d7c]/40 rounded-xl text-gray-400 hover:text-white text-sm transition-all font-mono"
                              >
                                <span className="text-[#ea0d7c] mr-2">›</span>
                                {q}
                              </motion.button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  </div>
                  
                  {/* Input */}
                  <div className="px-4 sm:px-8 lg:px-16 py-5 border-t border-[#ea0d7c]/20 bg-[#050508]/80 shrink-0 relative z-10">
                    <div className="max-w-3xl mx-auto">
                      <form onSubmit={handleSubmit} className="flex gap-3">
                        <div className="flex-1 relative">
                          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#ea0d7c] font-mono text-base opacity-60">›</div>
                          <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            type="text"
                            placeholder="Type your message..."
                            className="w-full bg-white/3 border border-white/10 rounded-xl pl-10 pr-5 py-4 text-white text-sm sm:text-base placeholder:text-gray-600 focus:outline-none focus:border-[#ea0d7c]/50 focus:bg-white/5 transition-all font-mono"
                          />
                        </div>
                        <motion.button 
                          type="submit"
                          disabled={isLoading || !input.trim()}
                          whileHover={{ scale: input.trim() && !isLoading ? 1.05 : 1 }}
                          whileTap={{ scale: input.trim() && !isLoading ? 0.95 : 1 }}
                          className="shrink-0 w-14 h-14 bg-linear-to-r from-[#ea0d7c] to-[#ff1493] rounded-xl text-white transition-all disabled:opacity-30 flex items-center justify-center"
                        >
                          <Send className="w-5 h-5" />
                        </motion.button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-80 group"
      >
        {pulseActive && (
          <motion.span 
            animate={{ scale: [1, 2, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute inset-0 rounded-full bg-[#ea0d7c]" 
          />
        )}
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-linear-to-br from-[#ea0d7c] to-[#ff1493] flex items-center justify-center shadow-[0_0_50px_rgba(234,13,124,0.5)]">
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div key="close" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
                <X className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </motion.div>
            ) : (
              <motion.div key="bot" initial={{ rotate: 90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }}>
                <Bot className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <motion.span 
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute top-0 right-0 w-4 h-4 bg-emerald-400 rounded-full border-2 border-[#0a0a0f]"
        />
      </motion.button>
    </>
  )
}
