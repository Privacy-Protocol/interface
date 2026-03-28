"use client"

import { motion } from "framer-motion"
import { reveal } from "./landing-page"
import { TerminalFrame } from "./terminal-frame"

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
      "Many privacy solutions force applications onto new chains or execution environments.",
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
      "Components and contracts teams can integrate instead of rebuilding from scratch.",
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
      className="relative bg-secondary bg-[url('/PP-Star-E.png')] bg-contain bg-right bg-no-repeat px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center gap-3">
          <span className="font-code text-xs tracking-[0.25em] text-primary uppercase">
            {">_ The problem"}
          </span>
        </div>

        <h2 className="mt-4 font-heading text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
          Privacy in web3 is important.
          <br />
          <span className="text-accent">
            Building it shouldn&apos;t come with any hassles.
          </span>
        </h2>

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <div className="space-y-6">
            <p className="font-code text-xs tracking-[0.2em] text-foreground uppercase">
              Without Privacy Protocol
            </p>
            <div className="space-y-8">
              {problems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i, duration: 0.4 }}
                >
                  <TerminalFrame
                    className="bg-card/40 px-6 py-5 transition-colors hover:bg-card/20"
                    variant="foreground"
                  >
                    <div className="flex items-start gap-3">
                      {/* <span className="mt-0.5 font-code text-[0.55rem] text-muted-foreground/50">
                        {String(i + 1).padStart(2, "0")}
                      </span> */}
                      <div>
                        <p className="text-base font-medium text-foreground">
                          {item.label}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-foreground">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  </TerminalFrame>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <p className="font-code text-xs tracking-[0.2em] text-primary/70 uppercase">
              With Privacy Protocol
            </p>
            <div className="space-y-8">
              {solutions.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i + 0.15, duration: 0.4 }}
                >
                  <TerminalFrame
                    className="bg-card/40 px-6 py-5 transition-colors hover:bg-card/20"
                    variant="muted-primary"
                  >
                    <div className="flex items-start gap-3">
                      {/* <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary/60" /> */}
                      <div>
                        <p className="text-base font-medium text-muted-primary">
                          {item.label}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-foreground">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  </TerminalFrame>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
