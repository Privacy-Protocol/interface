"use client"

import { motion } from "framer-motion"
import { reveal } from "./landing-page"
import Link from "next/link"
import { ArrowRight } from "@phosphor-icons/react"

interface Props {
  researchData: TResearchPost[]
}

export function ResearchSection({ researchData }: Props) {
  return (
    <motion.section
      {...reveal}
      id="research"
      className="relative px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto max-w-5xl">
        {/* Section label */}
        <div className="flex items-center gap-3">
          <span className="font-code text-[0.6rem] tracking-[0.25em] text-primary uppercase">
            Research & Writing
          </span>
          <span className="h-px flex-1 bg-border/60" />
        </div>

        <h2 className="font-heading mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Grounded in research
        </h2>
        <p className="mt-2 max-w-lg text-sm text-muted-foreground">
          Privacy Protocol is backed by applied cryptography research, protocol
          design, and engineering-led infrastructure decisions.
        </p>

        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {researchData.map((post, i) => (
            <motion.article
              key={post.title}
              className="group rounded-lg border border-border/30 bg-card/20 p-5 transition-all duration-300 hover:border-border/60 hover:bg-card/40"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 * i, duration: 0.4 }}
            >
              {/* Meta row */}
              <div className="flex items-center gap-2">
                <span
                  className={`font-code rounded border px-1.5 py-0.5 text-[0.5rem] tracking-wider uppercase ${
                    post.type === "Research"
                      ? "border-accent/20 text-accent/60"
                      : "border-primary/20 text-primary/60"
                  }`}
                >
                  {post.type}
                </span>
                <span className="font-code text-[0.5rem] text-muted-foreground/40">
                  {post.date}
                </span>
              </div>

              <h3 className="font-heading mt-3 text-sm font-semibold text-foreground/85 sm:text-base">
                {post.title}
              </h3>

              <p className="mt-1.5 text-[0.78rem] leading-relaxed text-muted-foreground/70">
                {post.summary}
              </p>

              <Link
                href={post.href}
                className="mt-3 inline-flex items-center gap-1 font-code text-[0.55rem] tracking-wider text-primary/60 uppercase transition-colors hover:text-primary"
              >
                Read more
                <ArrowRight
                  weight="bold"
                  className="size-2.5 transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
