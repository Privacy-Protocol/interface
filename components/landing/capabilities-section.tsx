"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PAGE_LINKS } from "@/lib/constants"
import { reveal } from "./landing-page"
import { TerminalFrame } from "./terminal-frame"

const capabilities = [
  {
    title: "Privacy Toolkits, Not One-Off Features",
    tag: "toolkits",
    description:
      "Privacy Protocol is organized as modular toolkits for specific application categories, so teams can integrate the privacy model they need instead of stitching primitives together themselves.",
    span: "lg:col-span-7",
    image: "/PP-Star-WS.png",
    imagePosition: "left",
    buttonLabel: "View Tools",
    href: "#products",
    scrollTarget: "products",
  },
  {
    title: "Multiple Privacy Models",
    tag: "stack",
    description:
      "Different applications require different privacy guarantees. Our architecture supports combining proof systems, encrypted computation, and other cryptographic approaches as needed.",
    span: "lg:col-span-5",
    image: "/PP-zkp-WS.png",
    imagePosition: "right",
    buttonLabel: "View Docs",
    href: PAGE_LINKS.DOCS,
  },
  {
    title: "Built on Proven Foundations",
    tag: "trust",
    description:
      "Toolkits are grounded in mathematically sound cryptography and established systems such as Noir and Zama, with security shaped into practical developer-facing integrations.",
    span: "lg:col-span-5",
    image: "/PP-nullifiers-WS.png",
    imagePosition: "right",
    buttonLabel: "View Docs",
    href: PAGE_LINKS.DOCS,
  },
  {
    title: "Composable With Existing Systems",
    tag: "integration",
    description:
      "Privacy layers are designed to integrate beside existing applications and contract systems, without requiring a separate privacy chain or a full architectural reset.",
    span: "lg:col-span-7",
    image: "/PP-ephemeral-WS.png",
    imagePosition: "left",
    buttonLabel: "View Docs",
    href: PAGE_LINKS.DOCS,
  },
  {
    title: "Research Feeds the Product",
    tag: "research",
    description:
      "Alongside shipping tools, we research protocol design and improvements to current cryptographic systems to make confidential applications more practical to build and deploy.",
    span: "lg:col-span-12",
    image: "/PP-eUTXO-WS.png",
    imagePosition: "right",
    fullWidthText: true,
    buttonLabel: "View Research",
    href: "#research",
    scrollTarget: "research",
  },
]

export function CapabilitiesSection() {
  return (
    <motion.section
      {...reveal}
      id="capabilities"
      className="relative bg-secondary px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center gap-3">
          <span className="font-code text-xs tracking-[0.25em] text-primary uppercase">
            {">_ Capabilities"}
          </span>
          <span className="h-px flex-1 bg-border/60" />
        </div>

        <h2 className="mt-4 font-heading text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
          Advanced cryptography.
          <br />
          <span className="text-accent">Simple developer surface.</span>
        </h2>

        <div className="mt-10 grid gap-3 lg:grid-cols-12">
          {capabilities.map((cap, i) => (
            <motion.article
              key={cap.title}
              className={`${cap.span} h-full`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 * i, duration: 0.45 }}
            >
              <TerminalFrame
                className="group h-full rounded-lg border border-border/40 bg-card/30 transition-all duration-300 hover:border-border/70 hover:bg-card/50"
                contentClassName="h-full"
                variant="accent"
              >
                <div className="relative h-full min-h-80 overflow-hidden p-6 sm:min-h-96 sm:p-7">
                  <div className="pointer-events-none absolute inset-6 sm:inset-8">
                    <Image
                      src={cap.image}
                      alt=""
                      fill
                      className={`object-contain opacity-25 transition-transform duration-500 ease-out group-hover:scale-110 ${
                        cap.imagePosition === "left"
                          ? "object-left"
                          : "object-right"
                      }`}
                      sizes="(min-width: 1024px) 50vw, 100vw"
                    />
                  </div>

                  <div className="relative z-10 flex h-full flex-col justify-between pt-14 sm:pt-16">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-code text-[11px] tracking-[0.3em] text-muted-primary uppercase">
                          {cap.tag}
                        </span>
                      </div>

                      <h3
                        className={`mt-3 font-heading text-lg font-semibold text-accent sm:text-xl ${
                          cap.fullWidthText ? "" : "max-w-xl"
                        }`}
                      >
                        {cap.title}
                      </h3>

                      <p
                        className={`mt-2 text-[0.95rem] leading-relaxed text-foreground sm:text-base ${
                          cap.fullWidthText ? "" : "max-w-xl"
                        }`}
                      >
                        {cap.description}
                      </p>
                    </div>

                    <Button
                      variant="link"
                      asChild
                      className="h-auto w-fit px-0 py-0 text-[0.72rem] text-primary"
                    >
                      <Link
                        href={cap.href}
                        onClick={(e) => {
                          if (!cap.scrollTarget) return
                          e.preventDefault()
                          document
                            .getElementById(cap.scrollTarget)
                            ?.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                            })
                        }}
                      >
                        {cap.buttonLabel}
                      </Link>
                    </Button>
                  </div>
                </div>
              </TerminalFrame>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
