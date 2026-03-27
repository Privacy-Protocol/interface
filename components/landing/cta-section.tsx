"use client"

import { motion } from "framer-motion"
import { reveal } from "./landing-page"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, BookOpen, GithubLogo } from "@phosphor-icons/react"
import { PAGE_LINKS } from "@/lib/constants"

export function CtaSection() {
  return (
    <motion.section
      {...reveal}
      className="relative px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <div className="glow-border relative overflow-hidden rounded-lg border border-primary/15 bg-card/25 p-8 sm:p-12">
          {/* Plum depth background */}
          <div className="plum-depth absolute inset-0 rounded-lg" />

          {/* Grid pattern overlay */}
          <div className="bg-grid-dense absolute inset-0 rounded-lg opacity-30" />

          <div className="relative text-center">
            <span className="font-code text-[0.55rem] tracking-[0.25em] text-primary/60 uppercase">
              Start building
            </span>

            <h2 className="font-heading mt-3 text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
              Ready to ship confidential features?
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
              Get started with the docs, explore the source, or dive into
              a toolkit. Privacy shouldn&apos;t slow you down.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button
                asChild
                className="glow-border h-11 rounded-md border-primary/30 bg-primary/12 px-6 font-code text-xs tracking-wider text-primary uppercase transition-all hover:bg-primary/20 hover:shadow-[0_0_32px_-4px_oklch(0.82_0.28_142/0.25)]"
              >
                <Link
                  href={PAGE_LINKS.DOCS}
                  className="inline-flex items-center gap-2"
                >
                  <BookOpen weight="bold" className="size-4" />
                  Read the docs
                  <ArrowRight weight="bold" className="size-3" />
                </Link>
              </Button>

              <Button
                asChild
                className="h-11 rounded-md border border-border/50 bg-card/40 px-6 font-code text-xs tracking-wider text-foreground/70 uppercase transition-all hover:border-border hover:text-foreground/90"
              >
                <Link
                  href={PAGE_LINKS.GITHUB}
                  className="inline-flex items-center gap-2"
                >
                  <GithubLogo weight="bold" className="size-4" />
                  View on GitHub
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
