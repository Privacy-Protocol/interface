"use client"

import { motion } from "framer-motion"
import { reveal } from "./landing-page"

// const capabilities = [
//   {
//     title: "Tailored Privacy for Real Applications",
//     tag: "toolkits",
//     description:
//       "Privacy Protocol builds toolkits that combine the right cryptographic primitives for each use case, giving applications the exact privacy model they need.",
//     span: "lg:col-span-7",
//     visual: "modules",
//     modules: [
//       { name: "Governance", status: "live" },
//       { name: "Credentials", status: "research" },
//       { name: "Transfers", status: "soon" },
//       { name: "Auctions", status: "soon" },
//     ],
//   },
//   {
//     title: "More Than ZK or FHE Alone",
//     tag: "stack",
//     description:
//       "We do not treat privacy as a one-size-fits-all primitive. Our toolkits can combine zero-knowledge, homomorphic encryption, and other cryptographic approaches as needed.",
//     span: "lg:col-span-5",
//     visual: "layers",
//     layers: ["ZK", "FHE", "Custom Primitives", "App-Specific Design"],
//   },
//   {
//     title: "Grounded in Proven Cryptography",
//     tag: "trust",
//     description:
//       "Security starts with mathematically sound foundations and tested systems such as Noir for ZK and Zama for FHE, shaped into practical integrations developers can actually use.",
//     span: "lg:col-span-5",
//     visual: "badge",
//     badges: ["Noir", "Zama", "Math-Based Security", "Protocol-Driven"],
//   },
//   {
//     title: "Integrates Without Chain Migration",
//     tag: "integration",
//     description:
//       "Bring privacy into existing applications without rebuilding everything around a dedicated privacy chain, new trust assumptions, or disruptive migrations.",
//     span: "lg:col-span-7",
//     visual: "diagram",
//     layers: [
//       "existing app",
//       "privacy toolkit",
//       "secure execution",
//       "confidential outcomes",
//     ],
//   },
//   {
//     title: "Research, Tooling, and Protocol Design",
//     tag: "research",
//     description:
//       "Alongside shipping developer tools, we research improvements to current cryptographic systems and design new ways to make confidential applications more practical to build.",
//     span: "lg:col-span-12",
//     visual: "code",
//     code: `Privacy Protocol = research + protocol design + developer tooling + application-specific privacy integrations`,
//   },
// ]

const capabilities = [
  {
    title: "Privacy Toolkits, Not One-Off Features",
    tag: "toolkits",
    description:
      "Privacy Protocol is organized as modular toolkits for specific application categories, so teams can integrate the privacy model they need instead of stitching primitives together themselves.",
    span: "lg:col-span-7",
    visual: "modules",
    modules: [
      { name: "Governance", status: "live" },
      { name: "Credentials", status: "research" },
      { name: "Transfers", status: "soon" },
      { name: "Auctions", status: "soon" },
    ],
  },
  {
    title: "Multiple Privacy Models",
    tag: "stack",
    description:
      "Different applications require different privacy guarantees. Our architecture supports combining proof systems, encrypted computation, and other cryptographic approaches as needed.",
    span: "lg:col-span-5",
    visual: "layers",
    layers: ["ZK", "FHE", "Custom Primitives", "Application Logic"],
  },
  {
    title: "Built on Proven Foundations",
    tag: "trust",
    description:
      "Toolkits are grounded in mathematically sound cryptography and established systems such as Noir and Zama, with security shaped into practical developer-facing integrations.",
    span: "lg:col-span-5",
    visual: "badge",
    badges: ["Noir", "Zama", "Sound Cryptography", "Protocol-Driven"],
  },
  {
    title: "Composable With Existing Systems",
    tag: "integration",
    description:
      "Privacy layers are designed to integrate beside existing applications and contract systems, without requiring a separate privacy chain or a full architectural reset.",
    span: "lg:col-span-7",
    visual: "diagram",
    layers: [
      "existing contracts",
      "privacy toolkit",
      "secure execution",
      "confidential outputs",
    ],
  },
  {
    title: "Research Feeds the Product",
    tag: "research",
    description:
      "Alongside shipping tools, we research protocol design and improvements to current cryptographic systems to make confidential applications more practical to build and deploy.",
    span: "lg:col-span-12",
    visual: "code",
    code: `research -> protocol design -> toolkit architecture -> developer integration`,
  },
]

function CodeVisual({ code }: { code: string }) {
  return (
    <div className="mt-3 overflow-hidden rounded border border-border/30 bg-background/60">
      <div className="flex items-center gap-1.5 border-b border-border/20 px-3 py-1.5">
        <span className="size-1.5 rounded-full bg-primary/40" />
        <span className="size-1.5 rounded-full bg-accent/30" />
        <span className="size-1.5 rounded-full bg-muted-foreground/20" />
        <span className="ml-2 font-code text-[0.5rem] text-muted-foreground/50">
          generate-proof.ts
        </span>
      </div>
      <pre className="overflow-x-auto p-3 font-code text-[0.6rem] leading-relaxed text-foreground/70 sm:text-[0.65rem]">
        <code>{code}</code>
      </pre>
    </div>
  )
}

function DiagramVisual({ layers }: { layers: string[] }) {
  return (
    <div className="mt-3 space-y-1.5">
      {layers.map((layer, i) => (
        <div key={layer} className="flex items-center gap-2">
          <span className="w-4 text-right font-code text-[0.5rem] text-muted-foreground/40">
            {i + 1}
          </span>
          <div className="flex-1 rounded border border-border/20 bg-background/40 px-2.5 py-1">
            <span className="font-code text-[0.55rem] text-foreground/60">
              {layer}
            </span>
          </div>
          {i < layers.length - 1 && (
            <span className="font-code text-[0.5rem] text-primary/30">|</span>
          )}
        </div>
      ))}
    </div>
  )
}

function BadgeVisual({ badges }: { badges: string[] }) {
  return (
    <div className="mt-3 flex flex-wrap gap-1.5">
      {badges.map((badge) => (
        <span
          key={badge}
          className="rounded border border-border/30 bg-background/40 px-2 py-0.5 font-code text-[0.55rem] tracking-wider text-muted-foreground uppercase"
        >
          {badge}
        </span>
      ))}
    </div>
  )
}

function ModulesVisual({
  modules,
}: {
  modules: { name: string; status: string }[]
}) {
  return (
    <div className="mt-3 space-y-1">
      {modules.map((mod) => (
        <div
          key={mod.name}
          className="flex items-center justify-between rounded border border-border/20 bg-background/40 px-2.5 py-1.5"
        >
          <span className="font-code text-[0.6rem] text-foreground/70">
            {mod.name}
          </span>
          <span
            className={`font-code text-[0.5rem] tracking-wider uppercase ${
              mod.status === "live"
                ? "text-primary/70"
                : "text-muted-foreground/50"
            }`}
          >
            {mod.status}
          </span>
        </div>
      ))}
    </div>
  )
}

export function CapabilitiesSection() {
  return (
    <motion.section
      {...reveal}
      id="capabilities"
      className="relative bg-secondary px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center gap-3">
          <span className="font-code text-[0.6rem] tracking-[0.25em] text-primary uppercase">
            {">_ Capabilities"}
          </span>
          <span className="h-px flex-1 bg-border/60" />
        </div>

        <h2 className="mt-4 max-w-xl font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Advanced cryptography.
          <br />
          <span className="text-accent">Simple developer surface.</span>
        </h2>

        <div className="mt-10 grid gap-3 lg:grid-cols-12">
          {capabilities.map((cap, i) => (
            <motion.article
              key={cap.title}
              className={`group rounded-lg border border-border/40 bg-card/30 p-5 transition-all duration-300 hover:border-border/70 hover:bg-card/50 ${cap.span}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 * i, duration: 0.45 }}
            >
              <div className="flex items-center gap-2">
                <span className="font-code text-[0.5rem] tracking-[0.3em] text-primary/50 uppercase">
                  {cap.tag}
                </span>
              </div>

              <h3 className="mt-2 font-heading text-base font-semibold text-foreground/90 sm:text-lg">
                {cap.title}
              </h3>

              <p className="mt-1.5 text-[0.8rem] leading-relaxed text-muted-foreground">
                {cap.description}
              </p>

              {cap.visual === "code" && cap.code && (
                <CodeVisual code={cap.code} />
              )}
              {cap.visual === "diagram" && cap.layers && (
                <DiagramVisual layers={cap.layers} />
              )}
              {cap.visual === "badge" && cap.badges && (
                <BadgeVisual badges={cap.badges} />
              )}
              {cap.visual === "modules" && cap.modules && (
                <ModulesVisual modules={cap.modules} />
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
