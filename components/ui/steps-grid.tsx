import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { SectionTitle } from "./section-title"

export function StepsGrid({
  title,
  description,
  steps,
  numberTone,
}: {
  title: string
  description: string
  steps: TStep[]
  numberTone?: "green" | "cyan"
}) {
  return (
    <section className="relative px-6 py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.11),transparent_60%)]" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionTitle title={title} description={description} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="border border-primary/20 bg-card/75 p-5"
            >
              <p
                className={cn(
                  "mb-4 font-mono text-4xl font-bold",
                  numberTone === "cyan" ? "text-cyan-400" : "text-primary"
                )}
              >
                {step.number}
              </p>
              <h3 className="text-sm font-bold tracking-[0.16em] text-primary/90 uppercase sm:text-base">
                {step.title}
              </h3>
              <p className="mt-3 font-mono text-sm leading-relaxed text-primary/65">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
