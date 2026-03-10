import { SectionHeading } from "../ui/section-heading"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRightIcon } from "../ui/icons"

interface Props {
  reveal: TReveal
  researchData: TResearchPost[]
}

export function ResearchSection({ reveal, researchData }: Props) {
  return (
    <motion.section {...reveal} id="research" className="px-4 py-14 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Blog & Research"
          title="Latest writing"
          description="Scroll horizontally to explore updates and research."
        />

        <div className="mt-7 overflow-x-auto pb-3">
          <div className="flex min-w-max snap-x snap-mandatory gap-4">
            {researchData.map((post) => (
              <motion.article
                key={post.title}
                className="w-[320px] snap-start border border-border/80 bg-card/70 p-4 sm:w-[360px]"
                whileHover={{
                  y: -3,
                  borderRadius: 18,
                  borderColor: "rgba(34,197,94,0.45)",
                }}
                transition={{ duration: 0.22 }}
              >
                <div className="flex items-center justify-between gap-2 text-[0.56rem] tracking-[0.14em] uppercase">
                  <span className="border border-border/70 bg-muted/45 px-2 py-1 text-zinc-300">
                    {post.type}
                  </span>
                  <span className="text-muted-foreground">{post.date}</span>
                </div>
                <h3 className="mt-3 text-lg font-medium text-zinc-50">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-300">{post.summary}</p>
                <Link
                  href={post.href}
                  className="mt-4 inline-flex items-center gap-1.5 text-[0.63rem] tracking-[0.18em] text-primary uppercase"
                >
                  Read More
                  <ArrowRightIcon />
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}
