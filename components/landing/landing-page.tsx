"use client"

import { Navbar } from "@/components/navigation/navbar"
import { Footer } from "../navigation/footer"
import { HeroSection } from "./hero-section"
import { WhySection } from "./why-section"
import { CapabilitiesSection } from "./capabilities-section"
import { ProductsSection } from "./products-section"
import { ResearchSection } from "./research-section"
import { CtaSection } from "./cta-section"

const posts: TResearchPost[] = [
  {
    title: "Composable privacy middleware for web3",
    type: "Research",
    date: "Q2 2026",
    summary:
      "A practical architecture for layered privacy primitives that compose with existing EVM application models.",
    href: "/research/composable-privacy-middleware",
  },
  {
    title: "Cipher beta: integration improvements",
    type: "Blog",
    date: "Q2 2026",
    summary:
      "Faster setup, cleaner SDK flows, and improved proof generation performance.",
    href: "/blog/cipher-beta-update",
  },
  {
    title: "Reducing action linkability in dapps",
    type: "Research",
    date: "Q1 2026",
    summary:
      "Patterns for actor privacy in production decentralized applications.",
    href: "/research/reducing-linkability",
  },
  {
    title: "From crypto complexity to developer APIs",
    type: "Blog",
    date: "Q1 2026",
    summary:
      "Why abstraction accelerates privacy adoption across the web3 ecosystem.",
    href: "/blog/developer-abstractions",
  },
]

export const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
}

export function LandingPage() {
  return (
    <div
      id="home"
      className="relative min-h-screen overflow-x-clip bg-background text-foreground"
    >
      <Navbar />

      <main className="relative z-10">
        <HeroSection />
        <WhySection />
        <CapabilitiesSection />
        <ProductsSection />
        <ResearchSection researchData={posts} />
        <CtaSection />
      </main>

      <Footer />
    </div>
  )
}
