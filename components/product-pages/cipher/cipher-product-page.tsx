"use client"

import Link from "next/link"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { ProductDemoPanel } from "../product-demo-panel"
import { PAGE_LINKS } from "@/lib/constants"

type FlowStep = {
  title: string
  detail: string
}

const reveal = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
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

function ArrowRightIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="size-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        d="M5 12h14M13 6l6 6-6 6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs tracking-[0.2em] text-primary uppercase">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance text-zinc-50 sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-sm leading-relaxed text-zinc-300 sm:text-base">
        {description}
      </p>
    </div>
  )
}

function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="relative mx-auto h-[360px] w-full max-w-xl border border-cyan-400/35 bg-card/40 p-4 backdrop-blur-md"
    >
      <div className="grid h-full grid-cols-2 gap-3">
        <div className="space-y-3">
          {["0x95A1...7C11", "0x31F0...A44E", "0xCB29...1130"].map((hash) => (
            <div
              key={hash}
              className="border border-primary/25 bg-black/35 p-3"
            >
              <p className="text-[10px] tracking-[0.14em] text-primary/70 uppercase">
                ciphertext
              </p>
              <p className="mt-1 font-mono text-xs text-zinc-200">{hash}</p>
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
              className="border border-cyan-400/25 bg-black/35 p-3"
            >
              <p className="text-[10px] tracking-[0.14em] text-cyan-300/75 uppercase">
                {item.label}
              </p>
              <p className="mt-1 font-mono text-xs text-cyan-200">
                {item.value}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-linear-to-b from-cyan-300/18 to-transparent"
        animate={{ y: [0, 290, 0] }}
        transition={{ duration: 6.8, ease: "easeInOut", repeat: Infinity }}
      />
    </motion.div>
  )
}

export function CipherProductPage() {
  return (
    <main className="bg-background text-foreground">
      <section className="relative overflow-hidden px-6 pt-36 pb-24 sm:pt-40">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(34,197,94,0.17),transparent_56%)]" />
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-xs tracking-[0.22em] text-primary uppercase">
              Privacy Protocol / Data Confidentiality
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance text-zinc-50 sm:text-5xl md:text-6xl">
              Cipher SDK
            </h1>
            <p className="mt-3 text-lg text-cyan-200/90">
              Confidential action data for web3 applications.
            </p>
            <p className="mt-5 max-w-2xl font-mono text-sm leading-relaxed text-zinc-300 sm:text-base">
              Cipher helps teams hide sensitive transaction details, metadata,
              and payloads while preserving proof-backed validation and safe
              adapter-based execution.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button
                asChild
                className="h-10 border border-primary/60 bg-primary/14 px-5 text-[0.64rem] tracking-[0.2em] text-primary uppercase hover:bg-primary/22"
              >
                <Link href={PAGE_LINKS.CIPHER_DOCS}>View Docs</Link>
              </Button>
              <Button
                asChild
                className="h-10 border border-accent/50 bg-accent/12 px-5 text-[0.64rem] tracking-[0.2em] text-accent uppercase hover:bg-accent/20"
              >
                <Link href="#demo" className="inline-flex items-center gap-1.5">
                  See Demo
                  <ArrowRightIcon />
                </Link>
              </Button>
            </div>
          </div>
          <HeroVisual />
        </div>
      </section>

      <motion.section {...reveal} className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="What Cipher Does"
            title="Hide payload details, keep verification strong"
            description="Cipher is for confidential app workflows and data privacy. It is not a fund-movement anonymity system."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
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
            ].map((card) => (
              <motion.article
                key={card.title}
                whileHover={{ y: -4, borderRadius: 18 }}
                transition={{ duration: 0.22 }}
                className="border border-primary/25 bg-card/70 p-5"
              >
                <p className="text-[11px] tracking-[0.15em] text-primary uppercase">
                  {card.title}
                </p>
                <p className="mt-2 text-sm text-zinc-300">{card.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section {...reveal} className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Core Primitives"
            title="Proof modules that enforce confidentiality guarantees"
            description="Compact building blocks for proof-backed confidential actions."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
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
            ].map((primitive, index) => (
              <motion.article
                key={primitive.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="border border-cyan-400/25 bg-black/40 p-5"
              >
                <p className="inline-flex border border-cyan-300/35 bg-cyan-300/10 px-2 py-1 text-[10px] tracking-[0.14em] text-cyan-200 uppercase">
                  {primitive.tag}
                </p>
                <h3 className="mt-3 text-base font-semibold text-zinc-50">
                  {primitive.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-300">{primitive.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section {...reveal} className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Architecture"
            title="High-level confidential action flow"
            description="From user input to adapter execution with encrypted payload persistence."
          />

          <div className="mt-10 overflow-x-auto pb-2">
            <div className="flex min-w-max items-stretch gap-3">
              {architectureFlow.map((step, index) => (
                <div key={step.title} className="flex items-center gap-3">
                  <motion.article
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.2 }}
                    className="w-48 border border-primary/25 bg-card/70 p-4"
                  >
                    <p className="text-[11px] tracking-[0.14em] text-primary uppercase">
                      {step.title}
                    </p>
                    <p className="mt-2 text-xs text-zinc-300">{step.detail}</p>
                  </motion.article>
                  {index < architectureFlow.length - 1 ? (
                    <span className="font-mono text-xs text-primary/70">→</span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section {...reveal} className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Use Cases"
            title="Confidential workflows Cipher enables"
            description="Design private app logic without turning your product into a mixer model."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
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
            ].map((item) => (
              <motion.article
                key={item.title}
                whileHover={{ y: -3, borderRadius: 16 }}
                transition={{ duration: 0.22 }}
                className="border border-primary/25 bg-card/70 p-5"
              >
                <h3 className="text-sm font-semibold text-zinc-50">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-300">{item.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section {...reveal} id="demo" className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Visual Demo"
            title="Interactive mock dashboard"
            description="Interactive Cipher voting demo with wallet connect and transaction logs."
          />
          <ProductDemoPanel mode="cipher" />
        </div>
      </motion.section>

      <motion.section {...reveal} className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Developer Experience"
            title="Built for application teams"
            description="Integrate across contracts, circuits, SDK layers, adapters, and app runtimes."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              "Smart contracts",
              "Noir circuits",
              "SDK integration",
              "Adapter registry",
              "Frontend + backend support",
              "Composable verification flows",
            ].map((item) => (
              <motion.div
                key={item}
                whileHover={{ y: -3, borderRadius: 16 }}
                transition={{ duration: 0.2 }}
                className="border border-cyan-400/25 bg-black/35 px-4 py-3 text-sm text-cyan-100"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section {...reveal} className="px-6 pb-24">
        <div className="mx-auto max-w-7xl border border-primary/25 bg-card/70 p-5 sm:p-6">
          <SectionHeading
            eyebrow="Related Products"
            title="Explore the wider Privacy Protocol stack"
            description="Cipher focuses on confidential action data. Cloak focuses on actor privacy and linkability reduction."
          />
          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              asChild
              className="h-10 border border-primary/60 bg-primary/14 px-5 text-[0.64rem] tracking-[0.2em] text-primary uppercase hover:bg-primary/22"
            >
              <Link href={PAGE_LINKS.HOME}>Privacy Protocol</Link>
            </Button>
            <Button
              asChild
              className="h-10 border border-accent/50 bg-accent/12 px-5 text-[0.64rem] tracking-[0.2em] text-accent uppercase hover:bg-accent/20"
            >
              <Link href={PAGE_LINKS.CLOAK}>Cloak SDK</Link>
            </Button>
          </div>
        </div>
      </motion.section>
    </main>
  )
}
