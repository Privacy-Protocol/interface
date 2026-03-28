"use client"

import { motion } from "framer-motion"
import { reveal } from "./landing-page"
import { TerminalFrame } from "./terminal-frame"
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
      <div className="mx-auto max-w-6xl">
        <TerminalFrame contentClassName="p-8 sm:p-12" variant="accent">
          <div className="relative text-center">
            <span className="font-heading text-sm tracking-[0.25em] text-primary/60 uppercase">
              {">_ build with Privacy Protocol"}
            </span>

            <h2 className="mt-3 font-code text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
              Ready to ship confidential features Or Contribute?
            </h2>

            <p className="mx-auto mt-3 max-w-md text-base text-muted-foreground">
              Get started with the docs, explore the source, or dive into a
              toolkit. <br /> Privacy in web3 shouldn&apos;t slow you down.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild>
                <Link
                  href={PAGE_LINKS.DOCS}
                  className="inline-flex items-center gap-2"
                >
                  <BookOpen weight="bold" className="size-4" />
                  Read the docs
                  <ArrowRight weight="bold" className="size-3" />
                </Link>
              </Button>

              <Button asChild variant="outline">
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
        </TerminalFrame>
      </div>
    </motion.section>
  )
}
