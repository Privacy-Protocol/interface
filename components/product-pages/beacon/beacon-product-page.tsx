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
    title: "Pick a Circuit",
    detail: "Choose a curated predicate from the catalog and pin its circuit id.",
  },
  {
    title: "Prove Locally",
    detail: "Generate the proof client-side; the user's secret never leaves their device.",
  },
  {
    title: "Verify Onchain",
    detail: "Your contract calls one shared VerifierHub to check the proof.",
  },
  {
    title: "Track Your State",
    detail: "Gate on the result and record nullifiers in your own contract.",
  },
]

const whatBeaconDoes = [
  {
    title: "Verify Proofs Onchain",
    text: "Call one shared hub instead of embedding a multi-million-gas verifier in every app.",
  },
  {
    title: "Privacy by Default",
    text: "Proving runs client-side, so only the proof and public inputs ever touch the chain.",
  },
  {
    title: "Curated Circuit Catalog",
    text: "Pick a ready-made predicate by id; Beacon supplies the circuit, verifier, and SDK.",
  },
  {
    title: "Trustless by Design",
    text: "A true result is a cryptographic fact — no off-chain service sits in the proving path.",
  },
]

const useCases = [
  {
    title: "Anonymous Membership",
    text: "Prove you belong to a set without revealing which member you are.",
  },
  {
    title: "Private Eligibility",
    text: "Gate actions on a proof of qualification without exposing the underlying data.",
  },
  {
    title: "Confidential Governance",
    text: "Power anonymous, replay-protected voting for confidential DAOs.",
  },
  {
    title: "Composable Gating",
    text: "Any contract becomes a consumer by pinning a circuit id and calling the hub.",
  },
]

const beaconFoundations = [
  {
    title: "UltraHonk Proofs",
    text: "Noir circuits compiled to efficient, audited UltraHonk verifiers.",
  },
  {
    title: "Client-Side Proving",
    text: "Secrets stay on the device; the network only ever sees the proof.",
  },
  {
    title: "Shared Verifier Infra",
    text: "One on-chain verifier serves every consumer — deployment cost paid once.",
  },
]

const adoptionBenefits = [
  {
    title: "No Circuit Engineering",
    text: "Skip Noir, trusted setups, and verifier generation entirely.",
  },
  {
    title: "Shared Infrastructure",
    text: "Reuse one deployed verifier across every consumer contract.",
  },
  {
    title: "Composable",
    text: "Pin a circuit id, call the hub, and you're a Beacon consumer.",
  },
  {
    title: "Privacy First",
    text: "Client-side proving makes confidentiality the default, not an add-on.",
  },
]

const npm = "npm i @privacy-protocol/beacon"

export function BeaconProductPage() {
  return (
    <main>
      <ProductHero
        title="Beacon"
        subtitle="Verify zero-knowledge proofs straight from your contract — no circuits, no verifier generation, no trusted off-chain service. Prove locally, verify onchain."
        npm={npm}
        actions={[{ href: PAGE_LINKS.BEACON_DOCS, label: "View Docs" }]}
      />

      <ProductSection className="bg-secondary bg-[url('/PP-Star-MV.png')] bg-contain bg-bottom-left bg-no-repeat">
        <div className="mx-auto max-w-6xl">
          <ProductSectionHeading
            eyebrow="Why Beacon"
            title="A modular ZK proof oracle for EVM apps"
            description="Beacon turns proof verification into shared infrastructure: install an SDK, generate a proof locally, and hand it to one on-chain entrypoint."
          />
          <div className="mt-8 grid gap-6 sm:grid-cols-1 lg:grid-cols-4">
            {whatBeaconDoes.map((card) => (
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
            eyebrow="How Beacon Works"
            title="Prove locally, verify onchain"
            description="Beacon keeps the secret on the client and the trust anchor onchain — a four-step flow any contract can adopt."
          />
          <ProductFlowRail steps={architectureFlow} />
        </div>
      </ProductSection>

      <ProductSection className="bg-[url('/PP-ephemeral-MV.png')] bg-contain bg-right bg-no-repeat">
        <div className="mx-auto max-w-6xl">
          <ProductSectionHeading
            eyebrow="Use Cases"
            title="Proofs for high-value, private workflows"
            description="Beacon's catalog model fits any app that needs to verify a statement without revealing the data behind it."
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {useCases.map((item) => (
              <ProductCard variant="primary" key={item.title}>
                <ProductCardTitle title={item.title} description={item.text} className="h-[84px]" />
              </ProductCard>
            ))}
          </div>
        </div>
      </ProductSection>

      <ProductSection className="bg-[url('/PP-ephemeral-MV.png')] bg-contain bg-right bg-no-repeat">
        <div className="mx-auto max-w-6xl">
          <ProductSectionHeading
            eyebrow="Trusted Foundations"
            title="Built on proven proving infrastructure"
            description="Beacon packages Noir and UltraHonk into shared, audited verifiers so developers get strong guarantees without building cryptographic systems from scratch."
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-1 lg:grid-cols-3">
            {beaconFoundations.map((item) => (
              <ProductCard variant="primary" key={item.title}>
                <ProductCardTitle title={item.title} description={item.text} className="h-[84px]" />
              </ProductCard>
            ))}
          </div>
        </div>
      </ProductSection>

      <ProductSection>
        <div className="mx-auto max-w-6xl">
          <ProductSectionHeading
            eyebrow="Why Teams Choose Beacon"
            title="A simpler way to ship ZK"
            description="Beacon makes proof verification reusable infrastructure so teams can add zero-knowledge guarantees without owning a proving stack."
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {adoptionBenefits.map((item) => (
              <ProductCard variant="primary" key={item.title}>
                <ProductCardTitle title={item.title} description={item.text} className="h-[84px]" />
              </ProductCard>
            ))}
          </div>
        </div>
      </ProductSection>
    </main>
  )
}
