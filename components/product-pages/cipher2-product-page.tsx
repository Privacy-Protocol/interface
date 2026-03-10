"use client"

import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import { PAGE_LINKS } from "@/lib/constants"
import { cn } from "@/lib/utils"

type DemoTab = "gate" | "voting"

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

const gateLogSeed = [
  "[router] credential commitment received",
  "[proof] membership proof generated",
  "[router] policy check: ALLOW",
  "[adapter] access action executed",
  "[store] encrypted payload persisted",
]

const votingLogSeed = [
  "[cipher] vote payload encrypted",
  "[proof] nullifier proof valid",
  "[router] commitment binding check passed",
  "[adapter] ballot recorded without plaintext",
  "[store] ciphertext + commitment archived",
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
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
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
      <p className="text-xs tracking-[0.2em] text-primary uppercase">{eyebrow}</p>
      <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-sm leading-relaxed text-zinc-300 sm:text-base">{description}</p>
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
            <div key={hash} className="border border-primary/25 bg-black/35 p-3">
              <p className="text-[10px] tracking-[0.14em] text-primary/70 uppercase">ciphertext</p>
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
              transition={{ duration: 2.8, repeat: Infinity, delay: index * 0.3 }}
              className="border border-cyan-400/25 bg-black/35 p-3"
            >
              <p className="text-[10px] tracking-[0.14em] text-cyan-300/75 uppercase">{item.label}</p>
              <p className="mt-1 font-mono text-xs text-cyan-200">{item.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-cyan-300/18 to-transparent"
        animate={{ y: [0, 290, 0] }}
        transition={{ duration: 6.8, ease: "easeInOut", repeat: Infinity }}
      />
    </motion.div>
  )
}

function DemoPanel() {
  const [tab, setTab] = useState<DemoTab>("gate")
  const [progress, setProgress] = useState(18)
  const [logTick, setLogTick] = useState(0)

  useEffect(() => {
    const progressTimer = window.setInterval(() => {
      setProgress((value) => (value >= 100 ? 12 : value + 7))
    }, 900)

    const logTimer = window.setInterval(() => {
      setLogTick((value) => value + 1)
    }, 1100)

    return () => {
      window.clearInterval(progressTimer)
      window.clearInterval(logTimer)
    }
  }, [])

  const logs = useMemo(() => {
    const seed = tab === "gate" ? gateLogSeed : votingLogSeed
    return seed.map((entry, index) => ({
      entry,
      active: index === logTick % seed.length,
      hash: `0x${(index + 1).toString(16)}${(logTick + 91).toString(16)}c7...${(index + 7)
        .toString(16)
        .padStart(2, "0")}`,
    }))
  }, [tab, logTick])

  const gateStatus = [
    { label: "Credential Hash", state: "ready" },
    { label: "Membership Proof", state: progress > 35 ? "valid" : "pending" },
    { label: "Router Policy", state: progress > 70 ? "allow" : "pending" },
  ]

  const voteCommitment = `0x9a7c${(1000 + logTick).toString(16)}...b1${(12 + (logTick % 9)).toString(16)}`

  return (
    <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="border border-primary/25 bg-card/70 p-4 sm:p-5">
        <div className="mb-4 flex gap-2">
          {[
            { id: "gate" as const, label: "Confidential Gate" },
            { id: "voting" as const, label: "Private Voting" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={cn(
                "border px-3 py-2 text-xs tracking-[0.15em] uppercase transition-colors",
                tab === item.id
                  ? "border-primary/60 bg-primary/14 text-primary"
                  : "border-border/80 bg-black/30 text-zinc-300 hover:border-primary/40"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {tab === "gate" ? (
            <motion.div
              key="gate"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="space-y-1.5">
                  <span className="text-[11px] tracking-[0.14em] text-primary/70 uppercase">Credential Id</span>
                  <input
                    type="text"
                    defaultValue="GATE-ALPHA-77"
                    className="w-full border border-primary/20 bg-black/35 px-3 py-2 font-mono text-sm text-zinc-100 outline-none focus:border-primary/45"
                  />
                </label>
                <label className="space-y-1.5">
                  <span className="text-[11px] tracking-[0.14em] text-primary/70 uppercase">Policy Rule</span>
                  <select className="w-full border border-primary/20 bg-black/35 px-3 py-2 text-sm text-zinc-200 outline-none focus:border-primary/45">
                    <option>Role &gt;= Verified Builder</option>
                    <option>Credential Age &gt; 30d</option>
                    <option>DAO Membership Active</option>
                  </select>
                </label>
              </div>

              <div className="border border-primary/20 bg-black/35 p-3">
                <div className="mb-2 flex items-center justify-between text-[11px] text-primary/75 uppercase">
                  <span>Proof Generation</span>
                  <span className="font-mono">{progress}%</span>
                </div>
                <div className="h-2 border border-primary/20 bg-black/50">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary/70 via-cyan-300/80 to-primary/70"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                {gateStatus.map((item) => (
                  <div key={item.label} className="flex items-center justify-between border border-primary/20 bg-black/35 px-3 py-2">
                    <span className="text-xs text-zinc-300">{item.label}</span>
                    <span className="text-[11px] tracking-[0.12em] text-primary uppercase">{item.state}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="voting"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <div className="border border-cyan-400/25 bg-black/35 p-3">
                <p className="text-[11px] tracking-[0.14em] text-cyan-300/80 uppercase">Encrypted Ballot</p>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {[
                    "YES",
                    "NO",
                    "ABSTAIN",
                  ].map((choice) => (
                    <button
                      key={choice}
                      className="border border-cyan-400/25 bg-cyan-400/8 px-2 py-2 text-xs text-cyan-200 transition-colors hover:bg-cyan-400/15"
                      type="button"
                    >
                      {choice}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="border border-primary/20 bg-black/35 p-3">
                  <p className="text-[11px] tracking-[0.14em] text-primary/80 uppercase">Commitment Hash</p>
                  <p className="mt-1 font-mono text-xs text-zinc-200">{voteCommitment}</p>
                </div>
                <div className="border border-primary/20 bg-black/35 p-3">
                  <p className="text-[11px] tracking-[0.14em] text-primary/80 uppercase">Encrypted Payload Bytes</p>
                  <p className="mt-1 font-mono text-xs text-zinc-200 break-all">
                    0x8f21be91a0c4d7e9f10c38b2aa6b49ff4cc3d1f94402ea11...ad7
                  </p>
                </div>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                {[
                  "nullifier proof valid",
                  "payload binding valid",
                  "adapter routing ready",
                  "verification success",
                ].map((item, index) => (
                  <div key={item} className="border border-cyan-400/25 bg-cyan-400/8 px-3 py-2 text-[11px] tracking-[0.11em] text-cyan-200 uppercase">
                    {index < 3 ? "... " : "✓ "}
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="border border-cyan-400/25 bg-black/45 p-4 sm:p-5">
        <div className="mb-3 flex items-center justify-between border-b border-cyan-400/20 pb-2">
          <p className="text-xs tracking-[0.2em] text-cyan-300 uppercase">Protocol Logs</p>
          <p className="font-mono text-[11px] text-cyan-200/70">state stream</p>
        </div>
        <div className="space-y-2">
          {logs.map((log, index) => (
            <motion.div
              key={`${log.entry}-${index}`}
              animate={{ opacity: log.active ? 1 : 0.6, x: log.active ? 0 : 2 }}
              transition={{ duration: 0.22 }}
              className={cn(
                "border p-3",
                log.active
                  ? "border-cyan-300/45 bg-cyan-300/10"
                  : "border-cyan-500/20 bg-black/40"
              )}
            >
              <div className="mb-1 flex items-center justify-between gap-2">
                <span className="text-[10px] tracking-[0.14em] text-cyan-200/70 uppercase">
                  tx #{index + 1}
                </span>
                <span className="font-mono text-[11px] text-cyan-100/70">{log.hash}</span>
              </div>
              <p className="font-mono text-xs text-zinc-200">{log.entry}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function Cipher2ProductPage() {
  return (
    <main className="bg-background text-foreground">
      <section className="relative overflow-hidden px-6 pb-24 pt-36 sm:pt-40">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(34,197,94,0.17),transparent_56%)]" />
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-xs tracking-[0.22em] text-primary uppercase">Privacy Protocol / Data Confidentiality</p>
            <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl md:text-6xl">
              Cipher SDK
            </h1>
            <p className="mt-3 text-lg text-cyan-200/90">
              Confidential action data for web3 applications.
            </p>
            <p className="mt-5 max-w-2xl font-mono text-sm leading-relaxed text-zinc-300 sm:text-base">
              Cipher helps teams hide sensitive transaction details, metadata, and payloads while
              preserving proof-backed validation and safe adapter-based execution.
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
                <p className="text-[11px] tracking-[0.15em] text-primary uppercase">{card.title}</p>
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
                <h3 className="mt-3 text-base font-semibold text-zinc-50">{primitive.title}</h3>
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
                    <p className="text-[11px] tracking-[0.14em] text-primary uppercase">{step.title}</p>
                    <p className="mt-2 text-xs text-zinc-300">{step.detail}</p>
                  </motion.article>
                  {index < architectureFlow.length - 1 ? (
                    <span className="text-primary/70 font-mono text-xs">→</span>
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
                <h3 className="text-sm font-semibold text-zinc-50">{item.title}</h3>
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
            description="Visual-only demo with proof states, logs, and protocol activity transitions."
          />
          <div className="mt-8 border border-primary/25 bg-card/70 p-4 sm:p-6">
            <DemoPanel />
          </div>
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
