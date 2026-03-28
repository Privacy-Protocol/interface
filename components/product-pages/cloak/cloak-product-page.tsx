"use client"

import Link from "next/link"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { ProductDemoPanel } from "../product-demo-panel"
import { PAGE_LINKS } from "@/lib/constants"

type ArchitectureStep = {
  title: string
  detail: string
}

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-90px" },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
}

const architectureFlow: ArchitectureStep[] = [
  { title: "User Wallet", detail: "Origin signs protected intent" },
  { title: "Shielded Prep", detail: "Action context is cloaked" },
  { title: "Route Binding", detail: "Constrained route hash computed" },
  { title: "Relayed Submission", detail: "Relayer forwards bound action" },
  { title: "Router Verify", detail: "Route and policy checks pass" },
  { title: "Adapter Execute", detail: "Bound adapter performs action" },
  {
    title: "Final Action",
    detail: "Onchain result without direct origin link",
  },
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
  const nodes = [
    { id: "wallet", label: "wallet", x: "10%", y: "40%" },
    { id: "shield", label: "shield", x: "32%", y: "22%" },
    { id: "relay1", label: "relay", x: "52%", y: "54%" },
    { id: "router", label: "router", x: "70%", y: "30%" },
    { id: "adapter", label: "adapter", x: "86%", y: "62%" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.12 }}
      className="relative mx-auto h-[360px] w-full max-w-xl border border-primary/25 bg-card/45 p-4 backdrop-blur-md"
    >
      <div className="absolute inset-0">
        {[
          "M 48 140 C 140 80, 190 210, 282 118",
          "M 120 78 C 220 40, 250 180, 330 120",
          "M 205 190 C 265 170, 300 225, 365 208",
        ].map((path, index) => (
          <svg
            key={path}
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 420 280"
            fill="none"
          >
            <motion.path
              d={path}
              stroke={
                index === 1 ? "rgba(56,189,248,0.56)" : "rgba(34,197,94,0.5)"
              }
              strokeWidth="1.4"
              strokeDasharray="6 8"
              initial={{ pathLength: 0.08, opacity: 0.28 }}
              animate={{ pathLength: [0.1, 1], opacity: [0.2, 0.75, 0.3] }}
              transition={{
                duration: 4.8 + index * 0.7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </svg>
        ))}
      </div>

      {nodes.map((node, index) => (
        <motion.div
          key={node.id}
          className="absolute"
          style={{ left: node.x, top: node.y }}
          animate={{ y: [0, -4, 0], opacity: [0.65, 1, 0.7] }}
          transition={{
            duration: 2.7,
            delay: index * 0.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="border border-cyan-400/35 bg-black/45 px-2 py-1">
            <p className="text-[10px] tracking-[0.14em] text-cyan-200 uppercase">
              {node.label}
            </p>
          </div>
        </motion.div>
      ))}

      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-linear-to-b from-cyan-300/16 to-transparent"
        animate={{ y: [0, 285, 0] }}
        transition={{ duration: 7.2, ease: "easeInOut", repeat: Infinity }}
      />
    </motion.div>
  )
}

export function CloakProductPage() {
  return (
    <main className="bg-background text-foreground">
      <section className="relative overflow-hidden px-6 pt-36 pb-24 sm:pt-40">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(34,197,94,0.17),transparent_56%)]" />
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-xs tracking-[0.22em] text-primary uppercase">
              Privacy Protocol / Shielded Execution
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance text-zinc-50 sm:text-5xl md:text-6xl">
              Cloak SDK
            </h1>
            <p className="mt-3 text-lg text-cyan-200/90">
              Protected execution paths for actor privacy.
            </p>
            <p className="mt-5 max-w-2xl font-mono text-sm leading-relaxed text-zinc-300 sm:text-base">
              Cloak reduces direct wallet-to-action visibility by routing
              policy-bound actions through shielded execution pathways and
              relayer-assisted submission.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button
                asChild
                className="h-10 border border-primary/60 bg-primary/14 px-5 text-[0.64rem] tracking-[0.2em] text-primary uppercase hover:bg-primary/22"
              >
                <Link href={PAGE_LINKS.CLOAK_DOCS}>View Docs</Link>
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
            eyebrow="What Cloak Does"
            title="Separate wallet origin from resulting action visibility"
            description="Cloak is for actor privacy and linkability reduction. It is not a confidential payload SDK."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              "Reduces wallet-to-action linkage",
              "Enables shielded action execution",
              "Routes through constrained pathways",
              "Uses relayer execution patterns",
              "Protects who acted, not all action data",
            ].map((text) => (
              <motion.article
                key={text}
                whileHover={{ y: -4, borderRadius: 16 }}
                transition={{ duration: 0.22 }}
                className="border border-primary/25 bg-card/70 p-4"
              >
                <p className="text-sm text-zinc-200">{text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section {...reveal} className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Core Concepts"
            title="Policy-bound execution modules"
            description="Technical primitives that keep execution constrained and observable under defined rules."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Shielded Actions",
                text: "Prepare and submit actions through cloaked execution context.",
              },
              {
                title: "Route Binding",
                text: "Bind action hash to approved route constraints.",
              },
              {
                title: "Action Router",
                text: "Verify route policy and execution scope before forwarding.",
              },
              {
                title: "Constrained Adapters",
                text: "Execute through adapter allowlists, not arbitrary targets.",
              },
              {
                title: "Relayed Execution",
                text: "Use relay hops to reduce direct origin observability.",
              },
              {
                title: "Wallet-to-Action Separation",
                text: "Preserve action utility while reducing actor traceability.",
              },
            ].map((item) => (
              <motion.article
                key={item.title}
                whileHover={{ y: -3, borderRadius: 16 }}
                transition={{ duration: 0.22 }}
                className="border border-cyan-400/25 bg-black/40 p-5"
              >
                <h3 className="text-sm font-semibold tracking-[0.13em] text-cyan-100 uppercase">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-300">{item.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section {...reveal} className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Architecture"
            title="Shielded execution lifecycle"
            description="From user wallet intent to constrained adapter execution through protected routing."
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
            eyebrow="Bounded Routes"
            title="Example policy-constrained execution paths"
            description="Designed for constrained privacy flows, not arbitrary private execution."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Protected Swap Route",
                text: "Bound route for policy-approved swap execution.",
              },
              {
                title: "Private Transfer Route",
                text: "Constrained transfer path with relay mediation.",
              },
              {
                title: "Prediction Market Action",
                text: "Policy-gated market action through verified adapters.",
              },
              {
                title: "Future Execution Adapters",
                text: "Extend route-bound adapters under strict policy controls.",
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
            title="Protected execution dashboard"
            description="Interactive Cloak swap demo with wallet connect and live-style transaction logs."
          />
          <ProductDemoPanel mode="cloak" />
        </div>
      </motion.section>

      <motion.section {...reveal} className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Developer Experience"
            title="Composable pool / router / adapter integration"
            description="Build with constrained execution architecture and predictable SDK surfaces."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              "Pool + router + adapter architecture",
              "Smart contracts",
              "Proof generation",
              "Relayer integration",
              "SDK integration path",
              "Frontend + backend orchestration",
            ].map((item) => (
              <motion.div
                key={item}
                whileHover={{ y: -3, borderRadius: 15 }}
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
            title="Explore the Privacy Protocol product stack"
            description="Cloak handles shielded execution and route privacy; Cipher handles confidential payload data."
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
              <Link href={PAGE_LINKS.CIPHER}>Cipher SDK</Link>
            </Button>
          </div>
        </div>
      </motion.section>
    </main>
  )
}
