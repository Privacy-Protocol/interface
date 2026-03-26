"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { SectionTitle } from "../../ui/section-title"
import { StepsGrid } from "../../ui/steps-grid"
import { GridCard } from "../../ui/grid-card"
import { ProductDemoPanel } from "../product-demo-panel"
import { PAGE_LINKS } from "@/lib/constants"

const cipherBenefits: TBenefit[] = [
  {
    title: "Shield the What, Not the Who",
    description:
      "Keep transaction data secret while using your primary on-chain reputation.",
  },
  {
    title: "Proof-Backed DAO Actions",
    description:
      "DAO proposals can accept confidential votes without giving up deterministic on-chain settlement.",
  },
  {
    title: "Verify Without Revealing",
    description:
      "Prove values are within range or valid ballot domains without exposing the exact value.",
  },
  {
    title: "Secure State Recovery",
    description:
      "In-browser encryption keeps hidden payloads recoverable for authorized tally or audit flows.",
  },
  {
    title: "Low Friction Gas",
    description:
      "No relayers or AA required. Users vote from their own wallets as usual.",
  },
  {
    title: "Snapshot-Friendly Aggregation",
    description:
      "Projects can publish interim aggregate tallies without opening individual ballots.",
  },
]

const cipherFeatures: TFeature[] = [
  {
    title: "ZK Membership + Nullifiers",
    description:
      "Gate participation and prevent double-voting without revealing the voter’s private witness.",
  },
  {
    title: "Payload Commitments",
    description:
      "Bind the proof to hidden vote content while keeping the plaintext offchain.",
  },
  {
    title: "DAO Context Routing",
    description:
      "Votes route through the Cipher Router into proposal-specific adapter contexts.",
  },
  {
    title: "Encrypted Payload Storage",
    description:
      "Optional encrypted vote payloads can be stored for later authorized decryption and tally.",
  },
  {
    title: "Interim Tally Snapshots",
    description:
      "Authorized tally flows can publish aggregate progress without revealing individual ballots.",
  },
  {
    title: "Minimal Contract Changes",
    description:
      "Third-party DAOs only need lightweight context registration and tally settlement hooks.",
  },
]

const cipherDevSteps: TStep[] = [
  {
    number: "01",
    title: "Create Proposal Context",
    description:
      "The DAO registers a proposal-specific Cipher context and exposes the context metadata to the app.",
  },
  {
    number: "02",
    title: "Generate Proof in SDK",
    description:
      "The SDK builds the commitment, membership proof, and nullifier for the selected ballot choice.",
  },
  {
    number: "03",
    title: "Submit Hidden Vote",
    description:
      "Router and adapter events store only hidden bindings such as payload hash, root, and encrypted reference.",
  },
  {
    number: "04",
    title: "Publish Aggregate Snapshot",
    description:
      "An authorized tally path can update interim or final counts without opening the underlying ballots.",
  },
]

const cipherQuickSteps: TQuickStep[] = [
  {
    title: "Install Cipher Locally",
    code: `npm i @privacy-protocol/cipher`,
    description: "Add the SDK and point the app at your deployed Cipher contracts.",
  },
  {
    title: "Initialize the Client",
    code: `import { createCipherClient } from "@privacy-protocol/cipher"

const cipher = createCipherClient({
  chain: sepolia,
  walletClient,
  appId: "privacy-protocol-demo-dao2",
})`,
    description: "Client setup stays minimal: chain, wallet, and appId.",
  },
  {
    title: "Vote Through DAO Context",
    code: `const ballot = cipher.dao.ballots.abstainableYesNo().encode({
  choice: "for",
  voteBlinding: 4404n,
  payloadSalt: 4505n,
})

const proposal = selectedProposal

await cipher.dao.vote({
  daoAddress: DEMO_DAO2,
  proposalId: proposal.proposalId,
  ballot,
  witness,
})`,
    description:
      "The SDK derives contextId, generates the proof, and submits the hidden vote through the router.",
  },
]

export function CipherProductPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden px-6 pt-36 pb-20 sm:pt-40">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(34,197,94,0.22),transparent_50%)]" />
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance text-zinc-50 sm:text-5xl md:text-6xl">
            Privacy Protocol Cipher
          </h1>
          <p className="mx-auto mt-5 max-w-3xl font-mono text-sm leading-relaxed text-primary/75 sm:text-base">
            Confidential action middleware for DAO voting, gated access, and proof-backed workflows where hidden inputs stay offchain but validity still settles onchain.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Button
              asChild
              className="h-10 border border-primary/60 bg-primary/14 px-5 text-[0.64rem] tracking-[0.2em] text-primary uppercase hover:bg-primary/22"
            >
              <Link href="#quick-start">Get Started</Link>
            </Button>
            <Button
              asChild
              className="h-10 border border-accent/50 bg-accent/12 px-5 text-[0.64rem] tracking-[0.2em] text-accent uppercase hover:bg-accent/20"
            >
              <Link href={PAGE_LINKS.CIPHER_DOCS}>View Docs</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="relative px-6 py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.1),transparent_70%)]" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <SectionTitle
            title="Secure. Simple. Seamless."
            description="Everything needed to integrate confidential voting and hidden action data into existing apps."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cipherBenefits.map((benefit) => (
              <GridCard
                key={benefit.title}
                title={benefit.title}
                description={benefit.description}
              />
            ))}
          </div>
        </div>
      </section>

      <StepsGrid
        title="How It Works (For Developers)"
        description="Cipher keeps the router generic, the adapters specific, and the SDK responsible for the hard integration work."
        steps={cipherDevSteps}
        numberTone="green"
      />

      <section className="relative px-6 py-20">
        <div className="relative z-10 mx-auto max-w-7xl">
          <SectionTitle
            title="Features"
            description="Core primitives that make confidential voting and confidential action middleware practical."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cipherFeatures.map((feature) => (
              <GridCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="quick-start" className="relative px-6 py-20">
        <div className="relative z-10 mx-auto max-w-7xl">
          <SectionTitle
            title="Quick Start Guide"
            description="The same DAO-native SDK flow you will use in the live demo panel below."
          />
          <div className="space-y-4">
            {cipherQuickSteps.map((step, index) => (
              <motion.article
                key={step.title}
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="border border-primary/20 bg-card/75 p-5"
              >
                <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
                  <div>
                    <p className="text-xs tracking-[0.2em] text-primary uppercase">
                      Step {index + 1}
                    </p>
                    <h3 className="mt-2 text-sm font-bold tracking-[0.16em] text-primary/90 uppercase sm:text-base">
                      {step.title}
                    </h3>
                    <p className="mt-3 font-mono text-sm leading-relaxed text-primary/65">
                      {step.description}
                    </p>
                  </div>
                  <pre className="overflow-x-auto border border-primary/20 bg-black/50 p-4 font-mono text-xs leading-relaxed text-zinc-200 sm:text-sm">
                    <code>{step.code}</code>
                  </pre>
                </div>
              </motion.article>
            ))}
          </div>

          <ProductDemoPanel mode="cipher" />
        </div>
      </section>
    </main>
  )
}
