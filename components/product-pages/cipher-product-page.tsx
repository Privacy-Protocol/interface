"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { SectionTitle } from "../ui/section-title"
import { StepsGrid } from "../ui/steps-grid"
import { GridCard } from "../ui/grid-card"
import { PAGE_LINKS } from "@/lib/constants"

const benefits: TBenefit[] = [
  {
    title: "Ship in Minutes, Not Months",
    description:
      "Skip the steep ZK learning curve. Add production-ready privacy with a small integration surface.",
  },
  {
    title: "Tap Into Deep Liquidity",
    description:
      "Wrap your existing dapp flow without forcing asset migration or chain fragmentation.",
  },
  {
    title: "Audit-Ready Compliance",
    description:
      "Built-in hooks for compliance workflows like view keys and proof-based screening.",
  },
  {
    title: "Retain User Sovereignty",
    description:
      "No centralized proving trust assumptions in the core user interaction lifecycle.",
  },
  {
    title: "Unbroken Composability",
    description:
      "Existing onchain interactions continue to work inside the privacy execution layer.",
  },
  {
    title: "Zero User Friction",
    description:
      "Users keep familiar UX patterns while privacy runs in the background.",
  },
]

const features: TFeature[] = [
  {
    title: "Universal SDK",
    description:
      "Integrate from frontend with minimal setup and no forced contract migration.",
  },
  {
    title: "Browser-Native Proving",
    description:
      "Generate proofs client-side to avoid trusted server-side proving infrastructure.",
  },
  {
    title: "Ephemeral Relayer Network",
    description:
      "Use fresh execution paths for each interaction to improve unlinkability.",
  },
  {
    title: "Encrypted UTXO State",
    description:
      "Maintain encrypted notes for private balances and controlled partial spending.",
  },
  {
    title: "Nullifier Registry",
    description:
      "Prevent double-spending with onchain nullifier checks and private ownership proofs.",
  },
  {
    title: "Yield-Aware Vaults",
    description:
      "Extend privacy vaults to productive asset strategies while preserving confidentiality.",
  },
]

const devSteps: TStep[] = [
  {
    number: "01",
    title: "Install and Enable",
    description:
      "Install the SDK and enable shielded transaction flow with minimal app changes.",
  },
  {
    number: "02",
    title: "Client-Side Proving",
    description:
      "Generate local proofs to authorize intents without exposing signer identity.",
  },
  {
    number: "03",
    title: "Relayed Execution",
    description:
      "Verify proofs and execute interactions through fresh proxy/relay routes.",
  },
  {
    number: "04",
    title: "Composable Settlement",
    description:
      "Route execution outputs back into private balances while preserving app logic.",
  },
]

const userSteps: TStep[] = [
  {
    number: "01",
    title: "Shield Assets",
    description:
      "Deposit funds and receive private ownership notes tied to encrypted state.",
  },
  {
    number: "02",
    title: "Masked Interaction",
    description:
      "Authorize actions with proof-backed intents and temporary execution routing.",
  },
  {
    number: "03",
    title: "Private Settlement",
    description:
      "Outputs are routed back into private balances without public identity linkage.",
  },
  {
    number: "04",
    title: "Anonymous Withdrawal",
    description:
      "Exit to any wallet while breaking direct deposit-to-withdrawal linkability.",
  },
]

const quickSteps: TQuickStep[] = [
  {
    title: "Install the SDK",
    code: `npm i privacy-protocol ethers`,
    description: "Install the package and core dependencies.",
  },
  {
    title: "Set Up",
    code: `import { useDeposit, useExecuteAction } from "privacy-protocol/hooks"

const config = {
  poolAddress,
  provider,
  signer,
}`,
    description:
      "Initialize config with provider, signer, and protocol addresses.",
  },
  {
    title: "Use Hooks",
    code: `const { deposit } = useDeposit(config)
const { executeAction } = useExecuteAction(config)

const depositResult = await deposit({ token, amount })
const result = await executeAction({
  token,
  amount,
  target,
  data,
  secret: depositResult.secret,
  nullifier: depositResult.nullifier,
})`,
    description:
      "Deposit and execute private actions with the SDK lifecycle hooks.",
  },
]

export function CipherProductPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden px-6 pt-36 pb-20 sm:pt-40">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(34,197,94,0.22),transparent_50%)]" />
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <p className="text-xs tracking-[0.24em] text-primary uppercase">
            Web3 Privacy Infrastructure
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance text-zinc-50 sm:text-5xl md:text-6xl">
            Privacy Protocol Cipher
          </h1>
          <p className="mx-auto mt-5 max-w-3xl font-mono text-sm leading-relaxed text-primary/75 sm:text-base">
            The modular privacy layer for EVM applications, designed for
            composability, developer velocity, and real-world production use.
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
            {benefits.map((benefit) => (
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
        steps={devSteps}
        numberTone="green"
      />

      <StepsGrid
        title="How It Works (For Users)"
        description="Keep UX familiar while identity and action trails stay private."
        steps={userSteps}
        numberTone="cyan"
      />

      <section className="relative px-6 py-20">
        <div className="relative z-10 mx-auto max-w-7xl">
          <SectionTitle
            title="Features"
            description="Core primitives that make privacy integration practical at scale."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
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
            {quickSteps.map((step, index) => (
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
        </div>
      </section>
    </main>
  )
}
