import { motion } from "framer-motion"
import { SectionHeading } from "../ui/section-heading"
import { cn } from "@/lib/utils"

interface Props {
  reveal: TReveal
  whyData: TBentoItem[]
}

export function WhyUsSection({ reveal, whyData }: Props) {
  return (
    <motion.section {...reveal} id="why" className="px-4 py-14 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Why Privacy Protocol"
          title="A practical privacy philosophy"
          description="Built for adoption, not complexity theater."
        />

        <div className="mt-8 grid gap-4 lg:grid-cols-12">
          {whyData.map((item) => (
            <motion.article
              key={item.title}
              className={cn(
                "border border-border/80 bg-card/70 p-5 lg:col-span-12",
                item.span
              )}
              whileHover={{ y: -3, scale: 1.005, borderRadius: 20 }}
              transition={{ duration: 0.23 }}
            >
              <p className="text-[0.62rem] tracking-[0.16em] text-primary uppercase">
                {item.title}
              </p>
              <p className="mt-2 text-sm text-zinc-300">{item.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
