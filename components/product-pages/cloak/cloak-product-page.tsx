"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ProductDemoPanel } from "../product-demo-panel"
import { PAGE_LINKS } from "@/lib/constants"
import {
  ProductCard,
  ProductCardTitle,
  ProductFlowRail,
  ProductHero,
  ProductSection,
  ProductSectionHeading,
} from "../product-page-ui"

type ArchitectureStep = {
  title: string
  detail: string
}

const architectureFlow: ArchitectureStep[] = [
  { title: "User Wallet", detail: "Origin signs protected intent" },
  { title: "Shielded Prep", detail: "Action context is cloaked" },
  { title: "Route Binding", detail: "Constrained route hash computed" },
  { title: "Relayed Submission", detail: "Relayer forwards bound action" },
  { title: "Router Verify", detail: "Route and policy checks pass" },
  { title: "Adapter Execute", detail: "Bound adapter performs action" },
  {
    title: "Final Action",
    detail: "Onchain result without direct origin link",
  },
]

const whatCloakDoes = [
  "Reduces wallet-to-action linkage",
  "Enables shielded action execution",
  "Routes through constrained pathways",
  "Uses relayer execution patterns",
  "Protects who acted, not all action data",
]

const coreConcepts = [
  {
    title: "Shielded Actions",
    text: "Prepare and submit actions through cloaked execution context.",
  },
  {
    title: "Route Binding",
    text: "Bind action hash to approved route constraints.",
  },
  {
    title: "Action Router",
    text: "Verify route policy and execution scope before forwarding.",
  },
  {
    title: "Constrained Adapters",
    text: "Execute through adapter allowlists, not arbitrary targets.",
  },
  {
    title: "Relayed Execution",
    text: "Use relay hops to reduce direct origin observability.",
  },
  {
    title: "Wallet-to-Action Separation",
    text: "Preserve action utility while reducing actor traceability.",
  },
]

const boundedRoutes = [
  {
    title: "Protected Swap Route",
    text: "Bound route for policy-approved swap execution.",
  },
  {
    title: "Private Transfer Route",
    text: "Constrained transfer path with relay mediation.",
  },
  {
    title: "Prediction Market Action",
    text: "Policy-gated market action through verified adapters.",
  },
  {
    title: "Future Execution Adapters",
    text: "Extend route-bound adapters under strict policy controls.",
  },
]

const developerExperience = [
  "Pool + router + adapter architecture",
  "Smart contracts",
  "Proof generation",
  "Relayer integration",
  "SDK integration path",
  "Frontend + backend orchestration",
]

function HeroVisual() {
  const nodes = [
    { id: "wallet", label: "wallet", x: "10%", y: "42%" },
    { id: "shield", label: "shield", x: "32%", y: "24%" },
    { id: "relay1", label: "relay", x: "52%", y: "56%" },
    { id: "router", label: "router", x: "70%", y: "30%" },
    { id: "adapter", label: "adapter", x: "86%", y: "62%" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.12 }}
      className="relative h-full min-h-[22rem] overflow-hidden rounded-md bg-card/10"
    >
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(110,213,249,0.12),transparent_48%)]" />

      <div className="absolute inset-0">
        {[
          "M 48 140 C 140 80, 190 210, 282 118",
          "M 120 78 C 220 40, 250 180, 330 120",
          "M 205 190 C 265 170, 300 225, 365 208",
        ].map((path, index) => (
          <svg
            key={path}
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 420 280"
            fill="none"
          >
            <motion.path
              d={path}
              stroke={
                index === 1 ? "rgba(110,213,249,0.56)" : "rgba(111,255,89,0.5)"
              }
              strokeWidth="1.4"
              strokeDasharray="6 8"
              initial={{ pathLength: 0.08, opacity: 0.28 }}
              animate={{ pathLength: [0.1, 1], opacity: [0.2, 0.75, 0.3] }}
              transition={{
                duration: 4.8 + index * 0.7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </svg>
        ))}
      </div>

      {nodes.map((node, index) => (
        <motion.div
          key={node.id}
          className="absolute"
          style={{ left: node.x, top: node.y }}
          animate={{ y: [0, -4, 0], opacity: [0.65, 1, 0.7] }}
          transition={{
            duration: 2.7,
            delay: index * 0.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="rounded-md border border-accent/35 bg-card/45 px-2 py-1">
            <p className="font-code text-[0.6rem] tracking-[0.14em] text-accent uppercase">
              {node.label}
            </p>
          </div>
        </motion.div>
      ))}

      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-linear-to-b from-accent/15 to-transparent"
        animate={{ y: [0, 285, 0] }}
        transition={{ duration: 7.2, ease: "easeInOut", repeat: Infinity }}
      />
    </motion.div>
  )
}

export function CloakProductPage() {
  return (
    <main className="bg-background text-foreground">
      <ProductHero
        eyebrow="Privacy Protocol / Shielded Execution"
        title="Cloak SDK"
        subtitle="Protected execution paths for actor privacy."
        description="Cloak reduces direct wallet-to-action visibility by routing policy-bound actions through shielded execution pathways and relayer-assisted submission."
        visual={<HeroVisual />}
        frameVariant="accent"
        actions={[
          { href: PAGE_LINKS.CLOAK_DOCS, label: "View Docs" },
          { href: "#demo", label: "See Demo", variant: "outline", icon: true },
        ]}
      />

      <ProductSection className="bg-secondary/35">
        <div className="mx-auto max-w-6xl">
          <ProductSectionHeading
            eyebrow="What Cloak Does"
            title="Separate wallet origin from resulting action visibility"
            description="Cloak is for actor privacy and linkability reduction. It is not a confidential payload SDK."
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {whatCloakDoes.map((text) => (
              <ProductCard key={text} variant="primary" className="p-4">
                <p className="text-sm leading-relaxed text-foreground/85">
                  {text}
                </p>
              </ProductCard>
            ))}
          </div>
        </div>
      </ProductSection>

      <ProductSection>
        <div className="mx-auto max-w-6xl">
          <ProductSectionHeading
            eyebrow="Core Concepts"
            title="Policy-bound execution modules"
            description="Technical primitives that keep execution constrained and observable under defined rules."
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {coreConcepts.map((item) => (
              <ProductCard key={item.title} variant="accent">
                <ProductCardTitle title={item.title} description={item.text} />
              </ProductCard>
            ))}
          </div>
        </div>
      </ProductSection>

      <ProductSection className="bg-secondary/35">
        <div className="mx-auto max-w-6xl">
          <ProductSectionHeading
            eyebrow="Architecture"
            title="Shielded execution lifecycle"
            description="From user wallet intent to constrained adapter execution through protected routing."
          />
          <ProductFlowRail steps={architectureFlow} />
        </div>
      </ProductSection>

      <ProductSection>
        <div className="mx-auto max-w-6xl">
          <ProductSectionHeading
            eyebrow="Bounded Routes"
            title="Example policy-constrained execution paths"
            description="Designed for constrained privacy flows, not arbitrary private execution."
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {boundedRoutes.map((item) => (
              <ProductCard key={item.title} variant="primary">
                <ProductCardTitle title={item.title} description={item.text} />
              </ProductCard>
            ))}
          </div>
        </div>
      </ProductSection>

      <ProductSection id="demo" className="bg-secondary/35">
        <div className="mx-auto max-w-6xl" id="demo">
          <ProductSectionHeading
            eyebrow="Visual Demo"
            title="Protected execution dashboard"
            description="Interactive Cloak swap demo with wallet connect and live-style transaction logs."
          />
          <ProductDemoPanel mode="cloak" />
        </div>
      </ProductSection>

      <ProductSection>
        <div className="mx-auto max-w-6xl">
          <ProductSectionHeading
            eyebrow="Developer Experience"
            title="Composable pool / router / adapter integration"
            description="Build with constrained execution architecture and predictable SDK surfaces."
          />
          <div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {developerExperience.map((item) => (
              <ProductCard key={item} variant="accent" className="px-4 py-4">
                <p className="text-sm text-foreground/85">{item}</p>
              </ProductCard>
            ))}
          </div>
        </div>
      </ProductSection>

      <ProductSection className="pb-24 bg-secondary/35">
        <div className="mx-auto max-w-6xl">
          <ProductCard variant="primary" className="p-5 sm:p-6">
            <ProductSectionHeading
              eyebrow="Related Products"
              title="Explore the Privacy Protocol product stack"
              description="Cloak handles shielded execution and route privacy; Cipher handles confidential payload data."
            />
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <Link href={PAGE_LINKS.HOME}>Privacy Protocol</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href={PAGE_LINKS.CIPHER}>Cipher SDK</Link>
              </Button>
            </div>
          </ProductCard>
        </div>
      </ProductSection>
    </main>
  )
}
