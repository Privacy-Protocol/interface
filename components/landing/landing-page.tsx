"use client"

import { motion, useReducedMotion } from "framer-motion"
import { Navbar } from "@/components/navigation/navbar"
import { Footer } from "../navigation/footer"
import { HeroSection } from "./hero-section"
import { MotivationSection } from "./motivation-section"
import { ProductsSection } from "./products-section"
import { WhyUsSection } from "./why-us-section"
import { UseCasesSection } from "./use-cases-section"
import { ResearchSection } from "./research-section"

const products: TProductCard[] = [
  {
    name: "Cipher",
    href: "/cipher",
    description: "Confidential actions and hidden data for dapps.",
    useCases: ["Private metadata", "Hidden state", "Confidential logic"],
    tone: "primary",
    span: "lg:col-span-6",
  },
  {
    name: "Cloak",
    href: "/cloak",
    description: "Shielded execution and reduced action linkability.",
    useCases: ["Actor privacy", "Relay-safe flows", "Low-linkability actions"],
    tone: "accent",
    span: "lg:col-span-6",
  },
]

const whyItems: TBentoItem[] = [
  {
    title: "Privacy by default",
    text: "Private UX should be standard.",
    span: "lg:col-span-5",
  },
  {
    title: "Easy for teams",
    text: "Integrate quickly without deep cryptography expertise.",
    span: "lg:col-span-7",
  },
  {
    title: "Composable",
    text: "Mix modules with existing contracts.",
    span: "lg:col-span-4",
  },
  {
    title: "No chain migration",
    text: "Deploy beside current stack.",
    span: "lg:col-span-4",
  },
  {
    title: "Tools over custom crypto",
    text: "Use stable SDK workflows, not bespoke plumbing.",
    span: "lg:col-span-4",
  },
]

const useCases: TBentoItem[] = [
  {
    title: "Private Governance",
    text: "Encrypted voting and confidential proposals.",
    span: "lg:col-span-4",
  },
  {
    title: "Confidential DeFi",
    text: "Protect strategy parameters and execution paths.",
    span: "lg:col-span-4",
  },
  {
    title: "Identity-safe Social",
    text: "Reduce user behavior correlation across actions.",
    span: "lg:col-span-4",
  },
  {
    title: "Enterprise Workflows",
    text: "Secure business logic for production dapps.",
    span: "lg:col-span-7",
  },
]

const posts: TResearchPost[] = [
  {
    title: "Composable privacy middleware for web3",
    type: "Research",
    date: "Q2 2026",
    summary: "A practical architecture for privacy layers.",
    href: "/research/composable-privacy-middleware",
  },
  {
    title: "Cipher beta integration improvements",
    type: "Blog",
    date: "Q2 2026",
    summary: "Faster setup and cleaner SDK flows.",
    href: "/blog/cipher-beta-update",
  },
  {
    title: "Reducing action linkability in dapps",
    type: "Research",
    date: "Q1 2026",
    summary: "Patterns for actor privacy in production.",
    href: "/research/reducing-linkability",
  },
  {
    title: "From crypto complexity to developer APIs",
    type: "Blog",
    date: "Q1 2026",
    summary: "Why abstraction accelerates privacy adoption.",
    href: "/blog/developer-abstractions",
  },
]

const reveal: TReveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] as const },
}

function BackgroundSystem({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(34,197,94,0.11) 1px, transparent 1px), linear-gradient(to bottom, rgba(34,197,94,0.09) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
        animate={
          reducedMotion
            ? undefined
            : { backgroundPosition: ["0px 0px", "64px 64px"] }
        }
        transition={{ duration: 26, ease: "linear", repeat: Infinity }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 22% 20%, rgba(34,197,94,0.16), transparent 35%), radial-gradient(circle at 78% 16%, rgba(56,189,248,0.12), transparent 30%), radial-gradient(circle at 50% 78%, rgba(99,102,241,0.12), transparent 42%)",
        }}
      />
    </div>
  )
}

export function LandingPage() {
  const reducedMotion = useReducedMotion()

  return (
    <div
      id="home"
      className="relative min-h-screen overflow-x-clip bg-background text-foreground"
    >
      <BackgroundSystem reducedMotion={Boolean(reducedMotion)} />
      <Navbar />

      <main className="relative z-10">
        <HeroSection reducedMotion={Boolean(reducedMotion)} />

        <MotivationSection reveal={reveal} />

        <ProductsSection reveal={reveal} productsData={products} />

        <WhyUsSection reveal={reveal} whyData={whyItems} />

        <UseCasesSection reveal={reveal} useCaseData={useCases} />

        <ResearchSection reveal={reveal} researchData={posts} />
      </main>

      <Footer />
    </div>
  )
}
