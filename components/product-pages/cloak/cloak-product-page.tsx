"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PAGE_LINKS } from "@/lib/constants"
import { ProductHero } from "../product-hero"
import { ProductSection } from "../product-section"
import { ProductSectionHeading } from "../product-section-heading"
import { ProductCardTitle } from "../product-card-title"
import { ProductFlowRail } from "../product-flow-rail"
import { ProductCard } from "../product-card"
import { ProductNpm } from "../product-npm"

const architectureFlow: FlowStep[] = [
  {
    title: "User Starts",
    detail: "The user acts as they normally would.",
  },
  {
    title: "Cloak Routes",
    detail: "The SDK sends the action through a protected path.",
  },
  {
    title: "Relayer Submits",
    detail: "A relayer helps break direct wallet-to-action visibility.",
  },
  {
    title: "Action Completes",
    detail: "The action executes with stronger privacy and no major UX change.",
  },
]

const cloakBenefits = [
  {
    title: "Simple Integration",
    text: "Add Cloak with a TypeScript SDK, not a contract rewrite.",
  },
  {
    title: "No Migration",
    text: "No new chain, asset movement, or contract migration required.",
  },
  {
    title: "Familiar UX",
    text: "Users keep the same flows they already know.",
  },
  {
    title: "Compliant by Design",
    text: "Built on a Privacy Pool model with trusted addresses and bounded execution paths.",
  },
]

const useCases = [
  {
    title: "Swaps",
    text: "Add privacy to swap flows without changing the trading experience.",
  },
  {
    title: "Transfers",
    text: "Reduce wallet visibility in transfer flows.",
  },
  {
    title: "Trading & Markets",
    text: "Support private actions like betting, bidding, and settlement.",
  },
  {
    title: "Custom App Flows",
    text: "Extend Cloak to app-specific actions through controlled routes.",
  },
]

const cloakFoundations = [
  {
    title: "Noir-Powered Proofs",
    text: "Zero-knowledge flows built on trusted Noir circuits.",
  },
  {
    title: "Proven Privacy Model",
    text: "Designed around bounded, policy-aware privacy patterns.",
  },
  {
    title: "Simple Adoption",
    text: "Integrated through a TypeScript SDK, not a full protocol rewrite.",
  },
]

export function CloakProductPage() {
  const npm = "npm i @privacy-protocol/cloak"

  return (
    <main>
      <ProductHero
        title="Cloak"
        subtitle="Add user privacy with a TypeScript SDK — no contract changes, migrations, or UX redesign."
        actions={[{ href: PAGE_LINKS.CLOAK_DOCS, label: "View Docs" }]}
        npm={npm}
        classname="bg-secondary"
      />

      <ProductSection className="bg-[url('/PP-nullifiers-WS.png')] bg-contain bg-right bg-no-repeat">
        <div className="mx-auto max-w-6xl">
          <ProductSectionHeading
            eyebrow="Why Cloak"
            title="Privacy without changing your app"
            description="Cloak adds wallet privacy through a simple SDK integration, without rewrites, migrations, or UX changes."
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {cloakBenefits.map((item) => (
              <ProductCard key={item.title} variant="primary">
                <ProductCardTitle title={item.title} description={item.text} />
              </ProductCard>
            ))}
          </div>
        </div>
      </ProductSection>

      <ProductSection>
        <div className="mx-auto max-w-6xl">
          <ProductSectionHeading
            eyebrow="How It Works"
            title="Private execution, made simple"
            description="Cloak fits into the normal app flow while reducing wallet-to-action visibility."
          />
          <ProductFlowRail steps={architectureFlow} />
        </div>
      </ProductSection>

      <ProductSection className="bg-secondary bg-[url('/PP-Star-E.png')] bg-contain bg-left bg-no-repeat">
        <div className="mx-auto max-w-6xl">
          <ProductSectionHeading
            eyebrow="Use Cases"
            title="Built for real app flows"
            description="Cloak brings stronger user privacy to common onchain actions without adding complexity."
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {useCases.map((item) => (
              <ProductCard key={item.title} variant="primary">
                <ProductCardTitle title={item.title} description={item.text} />
              </ProductCard>
            ))}
          </div>
        </div>
      </ProductSection>

      <ProductSection className="bg-secondary">
        <div className="mx-auto max-w-6xl">
          <ProductSectionHeading
            eyebrow="Trusted Foundations"
            title="Built on proven privacy infrastructure"
            description="Cloak uses well-tested tools for zero-knowledge verification, giving teams stronger privacy without relying on custom cryptography."
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {cloakFoundations.map((item) => (
              <ProductCard key={item.title} variant="primary">
                <ProductCardTitle title={item.title} description={item.text} />
              </ProductCard>
            ))}
          </div>
        </div>
      </ProductSection>

      <ProductSection className="bg-secondary pb-24">
        <div className="mx-auto max-w-6xl">
          <ProductCard variant="primary" className="p-5 sm:p-6">
            <ProductSectionHeading
              eyebrow="Get Started"
              title="Add privacy without rebuilding"
              description="Integrate Cloak through the TypeScript SDK to add stronger onchain privacy without migrations or UX changes."
            />
            <div className="mt-6 flex items-center justify-center gap-10">
              <ProductNpm npm={npm} />
              <Button asChild>
                <Link href={PAGE_LINKS.CLOAK_DOCS}>View Docs</Link>
              </Button>
            </div>
          </ProductCard>
        </div>
      </ProductSection>
    </main>
  )
}
