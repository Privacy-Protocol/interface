"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PAGE_LINKS } from "@/lib/constants"
import { reveal } from "./landing-page"
import { TerminalFrame } from "../ui/terminal-frame"

import { SectionTitle } from "./section-title"

const products = [
  {
    title: "Cloak",
    subtitle:
      "Actor privacy and unlinkable onchain interactions through SDK and hooks integration.",

    image: "/PP-zkp-FL.png",
    imagePosition: "right",
    frameVariant: "accent",
    tagClassName: "border-accent/60 text-accent/80",
    useCases: [
      "DeFi (Dark Pools)",
      "Prediction Markets (Anonymous Bets)",
      "Payments (Untraceable Transfers)",
      "SocialFi (Anonymous Identities & Tipping)",
      "Governance (Anonymous Proposals)",
    ],
    actions: [
      { label: "Learn more", href: PAGE_LINKS.CLOAK },
      // { label: "Privacy Protocol Relayer", href: PAGE_LINKS.RELAYER },
    ],
  },
  {
    title: "Cipher",
    subtitle: "Confidential data and encrypted application logic.",
    description:
      "Confidential workflows for private data, proof-based validation, and encrypted computation.",
    image: "/PP-Star-MV.png",
    imagePosition: "left",
    frameVariant: "muted-secondary",
    tagClassName: "border-primary/60 text-primary/80",
    useCases: [
      "DAOs (Confidential Voting)",
      "Auctions (Sealed Bids)",
      "DeFi (Encrypted Order Books)",
      "Identity (Private Credentials)",
      "Supply Chain (Hidden Workflows)",
      "Any app with sensitive data",
    ],
    actions: [{ label: "Learn more", href: PAGE_LINKS.CIPHER }],
  },
  {
    title: "Beacon",
    subtitle: "Verify zero-knowledge proofs straight from your contract.",
    description:
      "A modular ZK proof oracle: prove locally, verify onchain — no circuits or verifier generation.",
    image: "/PP-zkp-MV.png",
    imagePosition: "right",
    frameVariant: "primary",
    tagClassName: "border-primary/60 text-primary/80",
    useCases: [
      "DAOs (Anonymous Membership)",
      "Access Control (Private Eligibility)",
      "Identity (Selective Disclosure)",
      "Any app verifying ZK proofs",
    ],
    actions: [{ label: "Learn more", href: PAGE_LINKS.BEACON }],
  },
] as const

export function ProductsSection() {
  return (
    <motion.section
      {...reveal}
      id="products"
      className="relative px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Explore the Tools"
          title="Privacy for every app"
          subtitle="Choose the privacy model that best fits your application."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {products.map((product, i) => (
            <motion.article
              key={product.title}
              className="h-full"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 * i, duration: 0.45 }}
            >
              <TerminalFrame
                className="group h-full rounded-lg border border-border/40 bg-card/30 transition-all duration-300 hover:border-border/70 hover:bg-card/50"
                contentClassName="h-full"
                variant={product.frameVariant}
              >
                <div className="relative h-full min-h-[85vh] overflow-hidden p-6 sm:p-8">
                  <div className="pointer-events-none absolute inset-x-6 top-6 bottom-auto h-[45%] sm:inset-x-8 sm:top-8">
                    <Image
                      src={product.image}
                      alt=""
                      fill
                      className={`object-contain opacity-25 transition-transform duration-500 ease-out group-hover:scale-110 ${
                        product.imagePosition === "left"
                          ? "object-top-left"
                          : "object-top-right"
                      }`}
                      sizes="(min-width: 1024px) 50vw, 100vw"
                    />
                  </div>

                  <div className="relative z-10 h-full">
                    <div className="pt-[30%] pb-16 sm:pt-[40%] sm:pb-20">
                      <h3
                        className={`font-heading text-4xl tracking-[0.3em] ${product.frameVariant === "accent" ? "text-accent" : "text-muted-primary"} uppercase`}
                      >
                        {`>_${product.title}`}
                      </h3>

                      <p className="mt-8 max-w-xl text-xl font-semibold text-foreground sm:text-2xl">
                        {product.subtitle}
                      </p>

                      {/* <p className="mt-3 max-w-xl text-base leading-relaxed text-foreground">
                        {product.description}
                      </p> */}

                      <div className="mt-4 flex flex-wrap gap-2">
                        {product.useCases.map((useCase) => (
                          <span
                            key={useCase}
                            className={`rounded-full border bg-card/40 px-3 py-1 font-code text-[0.65rem] tracking-[0.18em] uppercase ${product.tagClassName}`}
                          >
                            {useCase}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="absolute right-6 bottom-6 left-6 flex flex-wrap gap-5 sm:right-8 sm:bottom-8 sm:left-8">
                      {product.actions.map((action) => (
                        <Button
                          key={action.label}
                          variant="link"
                          asChild
                          className={`text-xs text-muted-primary ${product.frameVariant === "accent" ? "text-accent" : "text-primary"}`}
                        >
                          <Link href={action.href}>{action.label}</Link>
                        </Button>
                      ))}
                    </div>
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
