import { HeroSection } from "@/components/hero-section"
import { Header } from "@/components/header"
import { ParticleBackground } from "@/components/particle-background"
import { DeltaBotSection } from "@/components/delta-bot-section"
import { DeltaBotWidget } from "@/components/delta-bot-widget"
import { ServicesSection } from "@/components/services-section"
import { ProcessSection } from "@/components/process-section"
import { WhyUsSection } from "@/components/why-us-section"
import { CaseStudiesSection } from "@/components/case-studies-section"
import { FounderSection } from "@/components/founder-section"
import { PricingSection } from "@/components/pricing-section"
import { FAQSection } from "@/components/faq-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main id="home" className="min-h-screen bg-[#0a0a0f] overflow-hidden relative">
      <ParticleBackground />
      <Header />
      <HeroSection />
      <DeltaBotSection />
      <ServicesSection />
      <ProcessSection />
      <WhyUsSection />
      <CaseStudiesSection />
      <FounderSection />
      <PricingSection />
      <FAQSection />
      <ContactSection />
      <Footer />
      <DeltaBotWidget />
    </main>
  )
}
