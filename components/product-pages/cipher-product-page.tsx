"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { SectionTitle } from "../ui/section-title"
import { StepsGrid } from "../ui/steps-grid"
import { GridCard } from "../ui/grid-card"
import { ProductDemoPanel } from "./product-demo-panel"
import { PAGE_LINKS } from "@/lib/constants"

const cipherBenefits: TBenefit[] = [
  {
    title: "Shield the 'What', Not the 'Who'",
    description:
      "Keep transaction data secret while using your primary on-chain reputation.",
  },
  {
    title: "Zero Metadata Leaks",
    description:
      "Sensitive inputs never touch the mempool; only ZK-proofs are visible.",
  },
  {
    title: "Verify Without Revealing",
    description:
      "Prove values are within range (e.g. Bid > 1 ETH) without exposing the exact number.",
  },
  {
    title: "Secure State Recovery",
    description:
      "In-browser encryption ensures data is recoverable by authorized parties.",
  },
  {
    title: "Low Friction Gas",
    description:
      "No relayers or AA needed. Users pay gas from their own wallets as usual.",
  },
  {
    title: "Audit-Ready View Keys",
    description:
      "Grant temporary access to private data for compliance or dispute resolution.",
  },
]

const cipherFeatures: TFeature[] = [
  {
    title: "ZK-Commitment Engine",
    description:
      "Standardized Poseidon hashing for locking private data to public proofs.",
  },
  {
    title: "Client-Side Encryption (ECIES)",
    description:
      "Asymmetric encryption for secure off-chain data persistence on-chain.",
  },
  {
    title: "Noir Private Inputs",
    description:
      "Native support for complex data-logic proofs generated in the browser.",
  },
  {
    title: "Sealed State Storage",
    description:
      "On-chain storage for encrypted blobs linked to verified ZK-nullifiers.",
  },
  {
    title: "Selective Disclosure",
    description:
      "Logic for revealing specific fields of a transaction without doxxing the rest.",
  },
  {
    title: "Nullifier Enforcement",
    description:
      "Prevents data re-use or 'double-reveal' attacks in auctions and voting.",
  },
]

const cipherDevSteps: TStep[] = [
  {
    number: "01",
    title: "Commit and Encrypt",
    description:
      "User inputs data; SDK generates a Poseidon hash and encrypts the payload.",
  },
  {
    number: "02",
    title: "Noir Verification",
    description:
      "Browser-native ZK-proof is generated to validate inputs against dApp rules.",
  },
  {
    number: "03",
    title: "Public Submission",
    description:
      "Submit [Proof, Commitment, Ciphertext] from the user's standard wallet.",
  },
  {
    number: "04",
    title: "Secure Settlement",
    description:
      "Contract verifies proof and stores the secret state for later authorized reveal.",
  },
]

const cipherQuickSteps: TQuickStep[] = [
  {
    title: "Install Cipher",
    code: `npm i @privacy-protocol/cipher`,
    description: "Install the data confidentiality toolkit.",
  },
  {
    title: "Initialize Cipher",
    code: `import { useCipher } from "@privacy-protocol/cipher/hooks"

const cipher = useCipher({
  verifierAddress: VERIFIER_CONTRACT_ADDR,
  managerPubKey: MANAGER_ENCRYPTION_KEY,
})`,
    description: "Configure the ZK-verifier and encryption recipient keys.",
  },
  {
    title: "Submit Secret Data",
    code: `const { submitConfidential } = cipher;

await submitConfidential({
  data: { bidAmount: 50000, secretNote: "Hidden Bid" },
  constraints: { min: 1000, max: 100000 },
  target: "AUCTION_CONTRACT_ADDR"
});`,
    description:
      "Generate ZK-proof, encrypt data, and submit to the blockchain.",
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
            Shield sensitive transaction data with ZK-commitments and in-browser
            encryption while maintaining your on-chain identity.
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
            description="Everything needed to integrate privacy into your application stack."
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
        description="Integrate privacy with predictable SDK workflows and modular execution."
        steps={cipherDevSteps}
        numberTone="green"
      />

      <section className="relative px-6 py-20">
        <div className="relative z-10 mx-auto max-w-7xl">
          <SectionTitle
            title="Features"
            description="Core primitives that make privacy integration practical at scale."
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
            description="Get privacy-enabled in minutes with a compact integration flow."
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
