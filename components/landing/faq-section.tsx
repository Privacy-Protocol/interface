import { motion } from "motion/react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion"
import { ProductSectionHeading } from "../product-pages/product-section-heading"
import { reveal } from "./landing-page"

const faqs = [
  {
    question: "Who is Privacy Protocol for?",
    answer:
      "It is built for web3 developers - frontend, backend, smart contract, what have developer friendly tools for everyone.",
  },
  {
    question: "Do I need to learn zero-knowledge proofs or FHE to use it?",
    answer:
      "No. Privacy Protocol is designed to abstract most of that complexity behind reusable contracts, SDKs, and integration patterns.",
  },
  {
    question: "How does Privacy Protocol fit into an existing app?",
    answer:
      "Privacy Protocol is designed to plug into existing EVM applications through reusable contracts and SDKs, so teams can add privacy features without rebuilding the rest of their product.",
  },
  {
    question:
      "Will Privacy Protocol toolkits affect app speed or user experience?",
    answer:
      "Privacy workflows can introduce extra cryptographic steps, but Privacy Protocol is designed with your user experience in mind and the toolkits are also built with tools which are optimized for performance.",
  },
  {
    question:
      "Can Privacy Protocol support different privacy needs across different apps?",
    answer:
      "Yes. Different applications need different privacy guarantees, so Privacy Protocol is built as flexible tooling that can support workflows like confidential governance, private payments, protected marketplace actions, and compliance checks.",
  },
  {
    question: "Why not just build the privacy logic in-house?",
    answer:
      "Building privacy infrastructure from scratch is slow, hard to secure, and expensive to maintain. Privacy Protocol gives teams a faster path with reusable tooling built on proven cryptographic foundations.",
  },
  {
    question: "What makes Privacy Protocol different from a privacy chain?",
    answer:
      "Privacy Protocol is designed to bring privacy into existing EVM apps instead of forcing teams to move contracts, assets, and users into a separate execution environment.",
  },
]

export function FAQSection() {
  return (
    <motion.section
      {...reveal}
      id="faq"
      className="relative px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <ProductSectionHeading
          eyebrow="FAQ"
          title="Questions developers usually ask"
          description="A few quick answers on how Privacy Protocol fits into real app development."
        />

        <Accordion type="single" collapsible className="mt-10">
          {faqs.map((faq) => (
            <AccordionItem key={faq.question} value={faq.question}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </motion.section>
  )
}
