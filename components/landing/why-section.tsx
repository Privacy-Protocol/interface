"use client"

import { motion } from "framer-motion"
import { reveal } from "./landing-page"

// const problems = [
//   {
//     label: "Complex cryptography",
//     detail:
//       "Proof systems, private computation schemes need deep specialized knowledge",
//   },
//   {
//     label: "Fragile custom code",
//     detail: "Hand-rolled privacy logic is error-prone and expensive to audit",
//   },
//   {
//     label: "Chain and asset migration",
//     detail: "Most privacy solutions force you onto dedicated app-chains",
//   },
// ]

// const solutions = [
//   {
//     label: "Abstracted primitives",
//     detail:
//       "SDKs and smart contracts using ZK, FHE, and other app-specific privacy primitives.",
//   },
//   {
//     label: "Audited toolkits",
//     detail: "Production-ready modules you integrate, not maintain",
//   },
//   {
//     label: "Existing chains",
//     detail:
//       "Deploy beside your current stack. No chain or asset migration required",
//   },
// ]

const problems = [
  {
    label: "Complex cryptography",
    detail:
      "Proof systems and private computation schemes usually require deep specialized knowledge.",
  },
  {
    label: "Fragile custom code",
    detail:
      "Hand-rolled privacy logic is difficult to secure, expensive to audit, and hard to maintain.",
  },
  {
    label: "Chain and asset migration",
    detail:
      "Many privacy solutions force applications onto new chains or incompatible execution environments.",
  },
]

const solutions = [
  {
    label: "Abstracted integrations",
    detail:
      "Privacy toolkits that package advanced cryptography into usable application-level integrations.",
  },
  {
    label: "Reusable modules",
    detail:
      "Well-structured components and contracts teams can integrate instead of rebuilding from scratch.",
  },
  {
    label: "Deploy where you are",
    detail:
      "Bring privacy to existing apps and contracts without forcing chain or asset migration.",
  },
]

export function WhySection() {
  return (
    <motion.section
      {...reveal}
      id="why"
      className="relative bg-secondary px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center gap-3">
          <span className="font-code text-[0.6rem] tracking-[0.25em] text-primary uppercase">
            {">_ The problem"}
          </span>
          <span className="h-px flex-1 bg-border/60" />
        </div>

        <h2 className="mt-4 font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Privacy in web3 is powerful.
          <br />
          <span className="text-accent">
            Building it shouldn&apos;t come with any hassles.
          </span>
        </h2>

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <div className="space-y-3">
            <p className="font-code text-[0.55rem] tracking-[0.2em] text-accent/70 uppercase">
              Without Privacy Protocol
            </p>
            {problems.map((item, i) => (
              <motion.div
                key={item.label}
                className="group rounded-md border border-border/50 bg-card/40 p-4 transition-colors hover:border-border/80"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, duration: 0.4 }}
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 font-code text-[0.55rem] text-muted-foreground/50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-foreground/90">
                      {item.label}
                    </p>
                    <p className="mt-1 text-[0.8rem] leading-relaxed text-muted-foreground">
                      {item.detail}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Solution column */}
          <div className="space-y-3">
            <p className="font-code text-[0.55rem] tracking-[0.2em] text-primary/70 uppercase">
              With Privacy Protocol
            </p>
            {solutions.map((item, i) => (
              <motion.div
                key={item.label}
                className="glow-border group rounded-md border border-primary/15 bg-primary/3 p-4 transition-colors hover:border-primary/25 hover:bg-primary/[0.05]"
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i + 0.15, duration: 0.4 }}
              >
                <div className="flex items-start gap-3">
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary/60" />
                  <div>
                    <p className="text-sm font-medium text-foreground/90">
                      {item.label}
                    </p>
                    <p className="mt-1 text-[0.8rem] leading-relaxed text-muted-foreground">
                      {item.detail}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}
