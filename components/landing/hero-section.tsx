"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, BookOpen } from "@phosphor-icons/react"
import { PAGE_LINKS } from "@/lib/constants"
import { MatrixHeroBackground } from "./matrix-hero-background"

export function HeroSection() {
  const heroTextRef = useRef<HTMLDivElement>(null)

  return (
    <section className="relative min-h-screen px-4 pt-32 pb-16 sm:px-6 sm:pt-40 sm:pb-20">
      <MatrixHeroBackground interactionScopeRef={heroTextRef} />
      <div className="pointer-events-none relative z-10 mx-auto max-w-5xl">
        <div ref={heroTextRef}>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="mx-auto mt-6 max-w-5xl text-center font-heading text-4xl leading-[1.1] font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
          >
            BUILDING CONFIDENTIAL APPS MADE
            <br />
            <span className="text-accent">SUPER EASY</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.14 }}
            className="mx-auto mt-5 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground sm:text-lg"
          >
            Privacy Protocol simplifies building confidential dapps, allowing
            developers to create privacy-preserving apps without needing deep
            cryptographic expertise or asset/chain-specific security concerns.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="pointer-events-auto mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Button asChild>
            <Link href={PAGE_LINKS.CIPHER}>Explore Tools</Link>
          </Button>
          <Button variant={"outline"} asChild>
            <Link href={PAGE_LINKS.DOCS}>
              <BookOpen weight="bold" className="size-3.5" />
              View Docs
              <ArrowRight weight="bold" className="size-3" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
