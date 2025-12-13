"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { Bot, Workflow, Rocket, MessageSquare, Brain, Globe, Server } from "lucide-react"
import { cn } from "@/lib/utils"

const services = [
  {
    icon: Brain,
    watermark: Brain,
    title: "Automate Operations",
    description: "Stop wasting time on manual tasks. We build custom AI agents and Computer Vision models that handle repetitive work so you can focus on strategy.",
    features: ["Autonomous Agents", "Computer Vision QA", "Predictive Analytics"],
  },
  {
    icon: Globe,
    watermark: Globe,
    title: "Customer Acquisition",
    description: "Speed converts. We deploy high-performance web and mobile apps that load instantly, boosting your SEO rankings and turning more visitors into customers.",
    features: ["Next.js Edge SSR", "React Native Mobile", "High-Freq Dashboards"],
  },
  {
    icon: Server,
    watermark: Server,
    title: "Scalable Foundations",
    description: "Grow without the growing pains. We provide the technical foundation and strategic guidance you need to scale your business securely and reliably.",
    features: ["Docker/K8s DevOps", "Legacy Migration", "CTO-as-a-Service"],
  }
]

export function ServicesSection() {
  return (
    <section id="services" className="relative py-32 px-4 md:px-6 bg-black overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-4"
          >
            <span className="text-[#ff007f] font-bold tracking-wider text-sm uppercase">Core Modules</span>
            <div className="h-px w-12 bg-[#ff007f]/50" />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9]"
          >
            Solutions That <br />
            <span className="text-[#ff007f]">Drive Growth.</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-8 text-gray-400 max-w-2xl text-lg leading-relaxed"
          >
            We don't just write code. We build intelligent systems that solve real business problems. 
            Our expertise is divided into core pillars designed to accelerate your success.
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ service, index }: { service: any, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative h-full bg-[#050505] border border-white/10 hover:border-[#ff007f] transition-colors duration-300 p-8 md:p-10 flex flex-col overflow-hidden"
    >
      {/* Watermark Icon */}
      <service.watermark 
        className="absolute top-8 right-8 w-24 h-24 text-white/2 -rotate-12 group-hover:text-[#ff007f]/10 transition-colors duration-500 stroke-1" 
      />

      {/* Top Icon Box */}
      <div className="w-12 h-12 rounded-lg border border-[#ff007f]/20 bg-[#ff007f]/5 flex items-center justify-center mb-8 group-hover:border-[#ff007f] group-hover:bg-[#ff007f] transition-all duration-300">
        <service.icon className="w-6 h-6 text-[#ff007f] group-hover:text-white transition-colors duration-300" />
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-white uppercase tracking-wide mb-4 relative z-10">
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-gray-400 text-sm leading-relaxed mb-8 relative z-10 grow">
        {service.description}
      </p>

      {/* Feature List */}
      <ul className="space-y-3 relative z-10 mt-auto">
        {service.features.map((feature: string, i: number) => (
          <li key={i} className="flex items-center gap-3 text-xs font-medium text-gray-500 group-hover:text-gray-300 transition-colors duration-300">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff007f]" />
            {feature}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}
