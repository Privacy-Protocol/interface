"use client"

import { PAGE_LINKS } from "@/lib/constants"
import { ProductHero } from "../product-hero"
import { ProductSection } from "../product-section"
import { ProductSectionHeading } from "../product-section-heading"
import { ProductCardTitle } from "../product-card-title"
import { ProductFlowRail } from "../product-flow-rail"
import { ProductCard } from "../product-card"

const architectureFlow: FlowStep[] = [
  {
    title: "Choose a Toolkit",
    detail: "Start with a privacy flow built for your use case.",
  },
  {
    title: "Protect the Data",
    detail: "Cipher applies proofs and encryption before execution.",
  },
  {
    title: "Verify Onchain",
    detail: "Contracts validate the action without exposing sensitive data.",
  },
  {
    title: "Run Securely",
    detail: "Your app executes with privacy and verification built in.",
  },
]

const whatCipherDoes = [
  {
    title: "Keep Data Private",
    text: "Protect sensitive inputs, transaction details, and app data onchain.",
  },
  {
    title: "Verify Without Revealing",
    text: "Prove eligibility, validity, and rules without exposing the underlying data.",
  },
  {
    title: "Built for Real Use Cases",
    text: "Apply the right privacy model to governance, payments, auctions, RWAs, and more.",
  },
  {
    title: "Contracts First",
    text: "Integrate through reusable contracts today, with SDK support as the product expands.",
  },
]

const useCases = [
  {
    title: "Confidential Governance",
    text: "Private voting and encrypted tallying with onchain rule enforcement.",
  },
  {
    title: "Private Payroll",
    text: "Protect salary, bonus, and payout data from public exposure.",
  },
  {
    title: "Confidential Markets",
    text: "Support sealed bids, private offers, and protected price discovery.",
  },
  {
    title: "Private RWA Flows",
    text: "Verify access and compliance without exposing identity or financial data.",
  },
]

const adoptionBenefits = [
  {
    title: "No Chain Migration",
    text: "Bring confidentiality to existing EVM apps without moving contracts or assets.",
  },
  {
    title: "Less Crypto Complexity",
    text: "Avoid building circuits, encrypted flows, and privacy logic from scratch.",
  },
  {
    title: "Flexible by Domain",
    text: "Use toolkits designed for real app categories, not one generic privacy layer.",
  },
  {
    title: "Easy to Integrate",
    text: "Adopt through reusable contracts with a simple developer workflow.",
  },
]

const cipherFoundations = [
  {
    title: "Noir-Powered Proofs",
    text: "Trusted ZK circuits for validation, eligibility, and rule enforcement.",
  },
  {
    title: "Zama-Backed Encryption",
    text: "Encrypted computation powered by proven FHE infrastructure.",
  },
  {
    title: "Ready to Integrate",
    text: "Delivered through reusable contracts built for existing EVM workflows.",
  },
]

const npm = "npm i @privacy-protocol/cipher-contracts"

export function CipherProductPage() {
  return (
    <main>
      <ProductHero
        title="Cipher"
        subtitle="Add confidential workflows to your app with reusable contracts for private data, proof-based validation, and encrypted computation."
        npm={npm}
        actions={[{ href: PAGE_LINKS.DOCS, label: "View Docs" }]}
      />

      <ProductSection className="bg-secondary bg-[url('/PP-Star-MV.png')] bg-contain bg-bottom-left bg-no-repeat">
        <div className="mx-auto max-w-6xl">
          <ProductSectionHeading
            eyebrow="Why Cipher"
            title="Flexible privacy tooling for EVM apps"
            description="Cipher gives teams reusable contracts for building confidential workflows without designing privacy infrastructure from scratch."
          />
          <div className="mt-8 grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
            {whatCipherDoes.map((card) => (
              <ProductCard key={card.title} variant="primary">
                <ProductCardTitle title={card.title} description={card.text} />
              </ProductCard>
            ))}
          </div>
        </div>
      </ProductSection>

      <ProductSection className="bg-secondary">
        <div className="mx-auto max-w-6xl">
          <ProductSectionHeading
            eyebrow="How Cipher Works"
            title="Confidential execution, made practical"
            description="Cipher combines privacy, verification, and execution into flows developers can actually use."
          />
          <ProductFlowRail steps={architectureFlow} />
        </div>
      </ProductSection>

      <ProductSection className="bg-[url('/PP-ephemeral-MV.png')] bg-contain bg-right bg-no-repeat">
        <div className="mx-auto max-w-6xl">
          <ProductSectionHeading
            eyebrow="Use Cases"
            title="Built for high-value confidential workflows"
            description="Cipher is designed for application areas where privacy and verification matter most."
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {useCases.map((item) => (
              <ProductCard variant="primary" key={item.title}>
                <ProductCardTitle
                  title={item.title}
                  description={item.text}
                  className="h-[84px]"
                />
              </ProductCard>
            ))}
          </div>
        </div>
      </ProductSection>

      <ProductSection className="bg-[url('/PP-ephemeral-MV.png')] bg-contain bg-right bg-no-repeat">
        <div className="mx-auto max-w-6xl">
          <ProductSectionHeading
            eyebrow="Trusted Foundations"
            title="Built on proven cryptography infrastructure"
            description="Cipher combines well-tested tools for zero-knowledge proofs and homomorphic encryption, giving developers strong privacy and verification without building cryptographic systems from scratch."
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {cipherFoundations.map((item) => (
              <ProductCard variant="primary" key={item.title}>
                <ProductCardTitle
                  title={item.title}
                  description={item.text}
                  className="h-[84px]"
                />
              </ProductCard>
            ))}
          </div>
        </div>
      </ProductSection>

      <ProductSection>
        <div className="mx-auto max-w-6xl">
          <ProductSectionHeading
            eyebrow="Why Teams Choose Cipher"
            title="A simpler way to add privacy"
            description="Cipher packages the right privacy architecture into reusable contracts so teams can move faster."
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {adoptionBenefits.map((item) => (
              <ProductCard variant="primary" key={item.title}>
                <ProductCardTitle
                  title={item.title}
                  description={item.text}
                  className="h-[84px]"
                />
              </ProductCard>
            ))}
          </div>
        </div>
      </ProductSection>
    </main>
  )
}
