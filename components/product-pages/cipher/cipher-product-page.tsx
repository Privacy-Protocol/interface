"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ProductDemoPanel } from "../product-demo-panel"
import { PAGE_LINKS } from "@/lib/constants"
import {
  ProductCard,
  ProductCardTitle,
  ProductChip,
  ProductFlowRail,
  ProductHero,
  ProductSection,
  ProductSectionHeading,
} from "../product-page-ui"

type FlowStep = {
  title: string
  detail: string
}

const architectureFlow: FlowStep[] = [
  { title: "User Input", detail: "Action payload enters the SDK" },
  { title: "Commitment", detail: "Payload fields are commitment-bound" },
  { title: "Encryption", detail: "Optional ciphertext packaging" },
  { title: "Proof", detail: "Membership/policy proof generated" },
  { title: "Router Verify", detail: "Cipher Router validates proof" },
  { title: "Adapter Execute", detail: "Approved adapter runs action" },
  { title: "Encrypted Store", detail: "Payload stored for authorized reveal" },
]

const whatCipherDoes = [
  {
    title: "Confidential Action Data",
    text: "Hide transaction details and sensitive application fields.",
  },
  {
    title: "Commitment + Proof Validation",
    text: "Validate rules through commitments and proofs without plaintext exposure.",
  },
  {
    title: "Encrypted Payload Storage",
    text: "Persist ciphertext for later access by authorized parties.",
  },
  {
    title: "Adapter-Routed Execution",
    text: "Run actions through vetted adapters instead of arbitrary calls.",
  },
]

const corePrimitives = [
  {
    title: "Membership Proof",
    text: "Prove eligibility against a set without exposing identity details.",
    tag: "set validity",
  },
  {
    title: "Nullifier Proof",
    text: "Prevent replay or double-action with one-time proof semantics.",
    tag: "one-time use",
  },
  {
    title: "Range / Policy Proof",
    text: "Enforce value and logic constraints privately.",
    tag: "constraint checks",
  },
  {
    title: "Payload Binding",
    text: "Bind ciphertext and proof to the intended action path.",
    tag: "integrity",
  },
]

const useCases = [
  {
    title: "Confidential Gate / Access Control",
    text: "Prove credential membership without revealing raw credential data.",
  },
  {
    title: "Private Voting",
    text: "Hide vote payloads while preserving verifiable tally constraints.",
  },
  {
    title: "Confidential Claims (Future)",
    text: "Submit private eligibility claims with proof-backed policy checks.",
  },
  {
    title: "Private Eligibility Workflows (Future)",
    text: "Gate actions by policy proofs without exposing user details.",
  },
]

const developerExperience = [
  "Smart contracts",
  "Noir circuits",
  "SDK integration",
  "Adapter registry",
  "Frontend + backend support",
  "Composable verification flows",
]

function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="relative h-full min-h-[22rem] overflow-hidden rounded-md bg-card/10 p-4"
    >
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(111,255,89,0.12),transparent_46%)]" />

      <div className="relative grid h-full grid-cols-2 gap-3">
        <div className="space-y-3">
          {["0x95A1...7C11", "0x31F0...A44E", "0xCB29...1130"].map((hash) => (
            <div
              key={hash}
              className="rounded-md border border-primary/25 bg-card/35 p-3"
            >
              <p className="font-code text-[0.6rem] tracking-[0.14em] text-primary/70 uppercase">
                ciphertext
              </p>
              <p className="mt-1 font-code text-xs text-foreground/85">{hash}</p>
            </div>
          ))}
        </div>
        <div className="space-y-3">
          {[
            { label: "proof", value: "valid" },
            { label: "router", value: "verified" },
            { label: "adapter", value: "executed" },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              animate={{ opacity: [0.45, 1, 0.55] }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                delay: index * 0.3,
              }}
              className="rounded-md border border-accent/25 bg-card/35 p-3"
            >
              <p className="font-code text-[0.6rem] tracking-[0.14em] text-accent/75 uppercase">
                {item.label}
              </p>
              <p className="mt-1 font-code text-xs text-accent">{item.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-linear-to-b from-primary/15 to-transparent"
        animate={{ y: [0, 290, 0] }}
        transition={{ duration: 6.8, ease: "easeInOut", repeat: Infinity }}
      />
    </motion.div>
  )
}

export function CipherProductPage() {
  return (
    <main className="bg-background text-foreground">
      <ProductHero
        eyebrow="Privacy Protocol / Data Confidentiality"
        title="Cipher SDK"
        subtitle="Confidential action data for web3 applications."
        description="Cipher helps teams hide sensitive transaction details, metadata, and payloads while preserving proof-backed validation and safe adapter-based execution."
        visual={<HeroVisual />}
        frameVariant="muted-primary"
        actions={[
          { href: PAGE_LINKS.CIPHER_DOCS, label: "View Docs" },
          { href: "#demo", label: "See Demo", variant: "outline", icon: true },
        ]}
      />

      <ProductSection className="bg-secondary/35">
        <div className="mx-auto max-w-6xl">
          <ProductSectionHeading
            eyebrow="What Cipher Does"
            title="Hide payload details, keep verification strong"
            description="Cipher is for confidential app workflows and data privacy. It is not a fund-movement anonymity system."
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {whatCipherDoes.map((card) => (
              <ProductCard key={card.title} variant="primary">
                <ProductCardTitle title={card.title} description={card.text} />
              </ProductCard>
            ))}
          </div>
        </div>
      </ProductSection>

      <ProductSection>
        <div className="mx-auto max-w-6xl">
          <ProductSectionHeading
            eyebrow="Core Primitives"
            title="Proof modules that enforce confidentiality guarantees"
            description="Compact building blocks for proof-backed confidential actions."
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {corePrimitives.map((primitive) => (
              <ProductCard key={primitive.title} variant="accent">
                <ProductChip variant="accent">{primitive.tag}</ProductChip>
                <ProductCardTitle title={primitive.title} description={primitive.text} />
              </ProductCard>
            ))}
          </div>
        </div>
      </ProductSection>

      <ProductSection className="bg-secondary/35">
        <div className="mx-auto max-w-6xl">
          <ProductSectionHeading
            eyebrow="Architecture"
            title="High-level confidential action flow"
            description="From user input to adapter execution with encrypted payload persistence."
          />
          <ProductFlowRail steps={architectureFlow} />
        </div>
      </ProductSection>

      <ProductSection>
        <div className="mx-auto max-w-6xl">
          <ProductSectionHeading
            eyebrow="Use Cases"
            title="Confidential workflows Cipher enables"
            description="Design private app logic without turning your product into a mixer model."
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {useCases.map((item) => (
              <ProductCard key={item.title} variant="primary">
                <ProductCardTitle title={item.title} description={item.text} />
              </ProductCard>
            ))}
          </div>
        </div>
      </ProductSection>

      <ProductSection id="demo" className="bg-secondary/35">
        <div className="mx-auto max-w-6xl">
          <ProductSectionHeading
            eyebrow="Visual Demo"
            title="Interactive mock dashboard"
            description="Interactive Cipher voting demo with wallet connect and transaction logs."
          />
          <ProductDemoPanel mode="cipher" />
        </div>
      </ProductSection>

      <ProductSection>
        <div className="mx-auto max-w-6xl">
          <ProductSectionHeading
            eyebrow="Developer Experience"
            title="Built for application teams"
            description="Integrate across contracts, circuits, SDK layers, adapters, and app runtimes."
          />
          <div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {developerExperience.map((item) => (
              <ProductCard key={item} variant="accent" className="px-4 py-4">
                <p className="text-sm text-foreground/85">{item}</p>
              </ProductCard>
            ))}
          </div>
        </div>
      </ProductSection>

      <ProductSection className="pb-24 bg-secondary/35">
        <div className="mx-auto max-w-6xl">
          <ProductCard variant="primary" className="p-5 sm:p-6">
            <ProductSectionHeading
              eyebrow="Related Products"
              title="Explore the wider Privacy Protocol stack"
              description="Cipher focuses on confidential action data. Cloak focuses on actor privacy and linkability reduction."
            />
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <Link href={PAGE_LINKS.HOME}>Privacy Protocol</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href={PAGE_LINKS.CLOAK}>Cloak SDK</Link>
              </Button>
            </div>
          </ProductCard>
        </div>
      </ProductSection>
    </main>
  )
}
