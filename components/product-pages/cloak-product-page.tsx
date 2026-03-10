"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { SectionTitle } from "../ui/section-title"
import { GridCard } from "../ui/grid-card"
import { StepsGrid } from "../ui/steps-grid"
import { ProductDemoPanel } from "./product-demo-panel"
import { PAGE_LINKS } from "@/lib/constants"

const cloakBenefits: TBenefit[] = [
  {
    title: "Break On-chain Linkage",
    description:
      "Decouple user identity from actions using high-anonymity privacy pools.",
  },
  {
    title: "Gas-Abstracted Execution",
    description:
      "Relayers handle gas via Paymasters, removing the 'ETH link' between wallets.",
  },
  {
    title: "Compliant Anonymity",
    description:
      "Built-in Association Sets (Privacy Pools) ensure only 'clean' funds are shielded.",
  },
  {
    title: "Ephemeral Identity",
    description:
      "Spin up one-time-use Shadow Accounts that self-destruct after execution.",
  },
  {
    title: "Ecosystem Neutrality",
    description: "Works with any EVM dApp via modular, audited App Adapters.",
  },
  {
    title: "Sybil-Resistant Privacy",
    description:
      "Integrate ZK-attestations to ensure private users are unique human actors.",
  },
]

const cloakFeatures: TFeature[] = [
  {
    title: "Ephemeral Account Abstraction",
    description:
      "Just-in-time smart accounts for single-session private interactions.",
  },
  {
    title: "Association Set Proving",
    description:
      "Noir circuits that prove membership in 'clean' sets without doxxing the depositor.",
  },
  {
    title: "Paymaster-Enabled Relayers",
    description:
      "Rust-based relayers that sponsor gas to maintain metadata-resistant privacy.",
  },
  {
    title: "Adapter Registry",
    description:
      "Secure routing through pre-vetted dApp adapters to prevent arbitrary execution risks.",
  },
  {
    title: "Recursive ZK-Proofs",
    description:
      "Verify complex identity statements efficiently on-chain with Noir.",
  },
  {
    title: "Shielded Vaults",
    description:
      "Secure holding layer for capital intended for private execution.",
  },
]

const cloakDevSteps: TStep[] = [
  {
    number: "01",
    title: "Shield and Set",
    description:
      "User deposits into the Cloak Vault and selects a compliant Association Set.",
  },
  {
    number: "02",
    title: "Spawn Shadow Account",
    description:
      "Generate a one-time-use Ephemeral Account tied to a ZK-nullifier.",
  },
  {
    number: "03",
    title: "Relayed Intent",
    description:
      "Submit a proof-backed intent to the Relayer for gas-abstracted submission.",
  },
  {
    number: "04",
    title: "Adapter Execution",
    description:
      "The Vault verifies the proof and routes the action through a certified App Adapter.",
  },
]

const cloakQuickSteps: TQuickStep[] = [
  {
    title: "Install Cloak",
    code: `npm i @privacy-protocol/cloak ethers`,
    description: "Install the identity anonymity toolkit.",
  },
  {
    title: "Initialize Cloak",
    code: `import { useCloak } from "@privacy-protocol/cloak/hooks"

const cloak = useCloak({
  vaultAddress: CLOAK_VAULT_ADDR,
  registryAddress: ADAPTER_REGISTRY_ADDR,
})`,
    description: "Set up the vault and adapter registry configuration.",
  },
  {
    title: "Execute Privately",
    code: `const { shieldAndExecute } = cloak;

await shieldAndExecute({
  adapterId: "UNISWAP_V3_ADAPTER",
  action: "swap",
  params: { path: [ETH, DAI], amount: 1.0 },
  associationSet: "COMMUNITY_SAFE_SET"
});`,
    description:
      "Shield funds and execute an action via a shadow account in one flow.",
  },
]

export function CloakProductPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden px-6 pt-36 pb-20 sm:pt-40">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(34,197,94,0.22),transparent_50%)]" />
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance text-zinc-50 sm:text-5xl md:text-6xl">
            Privacy Protocol Cloak
          </h1>
          <p className="mx-auto mt-5 max-w-3xl font-mono text-sm leading-relaxed text-primary/75 sm:text-base">
            Anonymize the actor, not just the asset, using ZK-powered Ephemeral
            Accounts and compliant Privacy Pools
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
              <Link href={PAGE_LINKS.CLOAK_DOCS}>View Docs</Link>
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
            {cloakBenefits.map((benefit) => (
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
        steps={cloakDevSteps}
        numberTone="green"
      />

      <section className="relative px-6 py-20">
        <div className="relative z-10 mx-auto max-w-7xl">
          <SectionTitle
            title="Features"
            description="Core primitives that make privacy integration practical at scale."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cloakFeatures.map((feature) => (
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
            {cloakQuickSteps.map((step, index) => (
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

          <ProductDemoPanel mode="cloak" />
        </div>
      </section>
    </main>
  )
}
