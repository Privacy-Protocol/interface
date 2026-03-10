import { motion } from "framer-motion"
import { SectionHeading } from "../ui/section-heading"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import Link from "next/link"
import { PAGE_LINKS } from "@/lib/constants"

interface Props {
  reveal: TReveal
  useCaseData: TBentoItem[]
}

export function UseCasesSection({ reveal, useCaseData }: Props) {
  return (
    <motion.section {...reveal} id="use-cases" className="px-4 py-14 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Use Cases"
          title="What teams can enable"
          description="Production features unlocked by privacy middleware."
        />

        <div className="mt-8 grid gap-4 lg:grid-cols-12">
          {useCaseData.map((item) => (
            <motion.article
              key={item.title}
              className={cn(
                "border border-border/80 bg-card/70 p-5 lg:col-span-12",
                item.span
              )}
              whileHover={{ y: -3, borderRadius: 18 }}
              transition={{ duration: 0.22 }}
            >
              <h3 className="text-lg font-medium text-zinc-50">{item.title}</h3>
              <p className="mt-2 text-sm text-zinc-300">{item.text}</p>
            </motion.article>
          ))}

          <motion.article
            className="border border-primary/45 bg-primary/10 p-5 lg:col-span-5"
            whileHover={{ y: -3, borderRadius: 20 }}
            transition={{ duration: 0.22 }}
          >
            <p className="text-sm text-zinc-200">
              Ready to integrate privacy into your product stack?
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                asChild
                className="h-9 border border-primary/60 bg-primary/18 text-[0.62rem] tracking-[0.18em] text-primary uppercase hover:bg-primary/25"
              >
                <Link href={PAGE_LINKS.DOCS}>View Docs</Link>
              </Button>
              <Button
                asChild
                className="h-9 border border-accent/55 bg-accent/12 text-[0.62rem] tracking-[0.18em] text-accent uppercase hover:bg-accent/20"
              >
                <Link href={PAGE_LINKS.CONTACT}>Talk to Team</Link>
              </Button>
            </div>
          </motion.article>
        </div>
      </div>
    </motion.section>
  )
}
