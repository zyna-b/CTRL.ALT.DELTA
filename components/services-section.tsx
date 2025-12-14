"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Rocket, Cpu, Server, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

const services = [
  {
    icon: Rocket,
    watermark: Rocket,
    title: "RAPID DEPLOYMENT",
    description: "Validation happens in the market. We engineer high-performance MVPs designed to acquire your first customers immediately.",
    tags: ["Next.js Architecture", "Market-Ready Code"],
  },
  {
    icon: Cpu,
    watermark: Cpu,
    title: "OPERATIONAL AI",
    description: "Revenue shouldn't require headcount. We deploy autonomous agents to handle your operations, allowing you to scale profitably.",
    tags: ["24/7 Agents", "Workflow Automation"],
  },
  {
    icon: Server,
    watermark: Server,
    title: "SCALABLE FOUNDATIONS",
    description: "Growth breaks weak systems. We build robust, secure architecture that sustains your business as you scale from 10 to 10k users.",
    tags: ["Cloud-Native", "Vector Databases"],
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
            <span className="text-[#D1006B] font-bold tracking-wider text-sm uppercase">What We Offer</span>
            <div className="h-px w-12 bg-[#D1006B]/50" />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9]"
          >
            High-Impact <br />
            <span className="text-[#D1006B]">Solutions.</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-8 text-gray-400 max-w-2xl text-lg leading-relaxed"
          >
            We work with founders and businesses that are serious about growth. No volume, just quality partnerships.
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
    <Link href="/capabilities">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ scale: 1.05 }}
        className="group relative h-full bg-[#050505] border border-white/10 hover:border-[#D1006B] transition-all duration-300 p-8 md:p-10 flex flex-col overflow-hidden cursor-pointer"
      >
        {/* Watermark Icon
        <service.watermark 
          className="absolute top-4 right-2 w-25 h-25 text-white/8 -rotate-11 transition-colors duration-500 fill-current" 
        /> */}

        {/* Top Icon Box */}
        <div className="w-12 h-12 rounded-lg border border-[#D1006B]/20 bg-[#D1006B]/5 flex items-center justify-center mb-8 group-hover:border-[#D1006B] group-hover:bg-[#D1006B] transition-all duration-300">
          <service.icon className="w-6 h-6 text-[#D1006B] group-hover:text-white transition-colors duration-300" />
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-white uppercase tracking-wide mb-4 relative z-10">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed mb-8 relative z-10 grow">
          {service.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8 relative z-10">
          {service.tags.map((tag: string, i: number) => (
            <span key={i} className="text-xs px-3 py-1 rounded-full bg-[#D1006B]/10 text-[#D1006B] font-medium border border-[#D1006B]/30">
              {tag}
            </span>
          ))}
        </div>

        {/* Explore Link */}
        <div className="flex items-center gap-2 text-sm font-semibold text-[#D1006B] group-hover:text-[#D1006B] relative z-10 mt-auto">
          <span>Explore Service</span>
          <motion.div
            className="inline-block"
            animate={{ x: 0 }}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </div>
      </motion.div>
    </Link>
  )
}
