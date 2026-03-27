"use client"

import { motion } from "framer-motion"
import { Eye } from "@phosphor-icons/react"
import Link from "next/link"
import { PAGE_LINKS } from "@/lib/constants"
import { CLOAK_PILLARS } from "./data"

export function CloakTab() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative rounded-lg border border-accent/10 bg-card/15 p-6 sm:p-8">
        <div className="plum-depth pointer-events-none absolute inset-0 rounded-lg" />

        <div className="relative">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex size-2 rounded-full bg-accent/30" />
            <span className="font-code text-[0.55rem] tracking-[0.2em] text-accent/50 uppercase">
              In development
            </span>
          </div>

          <h3 className="mt-3 font-heading text-xl font-bold tracking-tight text-foreground/80 sm:text-2xl">
            Cloak
          </h3>
          <p className="mt-2 max-w-xl text-[0.8rem] leading-relaxed text-muted-foreground/70">
            Tools to protect{" "}
            <span className="text-accent/70">actors and interactions</span> -
            making it harder to link on-chain activity to real-world identity.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {CLOAK_PILLARS.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                className="rounded-lg border border-accent/8 bg-accent/2 p-4"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.08 * i,
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <h4 className="font-heading text-sm font-bold tracking-tight text-foreground/60">
                  {pillar.title}
                </h4>
                <p className="mt-1.5 text-[0.7rem] leading-relaxed text-muted-foreground/50">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-3 rounded-md border border-border/20 bg-card/20 px-4 py-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-md border border-accent/15 bg-accent/6 text-accent/50">
              <Eye weight="duotone" className="size-4" />
            </div>
            <div>
              <p className="text-[0.75rem] leading-relaxed text-muted-foreground/60">
                Cloak is under active research and development. Follow our{" "}
                <Link
                  href={PAGE_LINKS.RESEARCH}
                  className="text-accent/60 underline underline-offset-2 transition-colors hover:text-accent/80"
                >
                  research updates
                </Link>{" "}
                for early designs and architecture decisions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
