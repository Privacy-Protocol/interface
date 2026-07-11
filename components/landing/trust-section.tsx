import { motion } from "motion/react"
import { ProductCard } from "../product-pages/product-card"
import { ProductCardTitle } from "../product-pages/product-card-title"
import { reveal } from "./landing-page"
import { SectionTitle } from "./section-title"

const trustItems = [
  {
    title: "Trusted Foundations",
    text: "Built on proven tools such as Noir for zero-knowledge proofs and Zama for encrypted computation.",
  },
  {
    title: "Developer-First Design",
    text: "Packaged as reusable tooling so teams can move faster without a deep cryptography learning curve.",
  },
  {
    title: "Designed for EVM Apps",
    text: "Bring privacy into existing applications without forcing a new chain, asset migration, or architectural reset.",
  },
]

export function TrustSection() {
  return (
    <motion.section
      {...reveal}
      className="relative bg-secondary px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Built on Proven Tools"
          title="Trusted cryptography, designed for seamless adoption"
          subtitle="Secure, Simple and Seamless"
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {trustItems.map((item) => (
            <ProductCard key={item.title} variant="accent">
              <ProductCardTitle title={item.title} description={item.text} />
            </ProductCard>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
