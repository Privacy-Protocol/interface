import { SectionHeading } from "../ui/section-heading"
import { motion } from "framer-motion"

export function MotivationSection({ reveal }: { reveal: TReveal }) {
  return (
    <motion.section {...reveal} id="motivation" className="px-4 py-14 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Motivation"
          title="Privacy demand is rising. Integration is still painful."
          description="Teams need better defaults than hand-rolled cryptography and long research cycles."
        />

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <article className="border border-border/80 bg-card/70 p-5">
            <p className="text-[0.63rem] tracking-[0.18em] text-accent uppercase">
              Problem
            </p>
            <p className="mt-3 text-sm text-zinc-300">
              Too much time is spent learning zk/FHE and building fragile custom
              privacy logic.
            </p>
          </article>

          <article className="border border-primary/35 bg-primary/8 p-5">
            <p className="text-[0.63rem] tracking-[0.18em] text-primary uppercase">
              Solution
            </p>
            <p className="mt-3 text-sm text-zinc-300">
              Privacy Protocol packages advanced research into simple, secure
              developer tooling.
            </p>
          </article>
        </div>

        <div className="mt-4 overflow-x-auto border border-border/80 bg-card/60">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-border/70 bg-muted/45">
              <tr>
                <th className="px-4 py-2.5 text-[0.6rem] tracking-[0.16em] text-muted-foreground uppercase">
                  Approach
                </th>
                <th className="px-4 py-2.5 text-[0.6rem] tracking-[0.16em] text-muted-foreground uppercase">
                  Time
                </th>
                <th className="px-4 py-2.5 text-[0.6rem] tracking-[0.16em] text-muted-foreground uppercase">
                  Risk
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/60">
                <td className="px-4 py-2.5 text-zinc-200">Hand-rolled stack</td>
                <td className="px-4 py-2.5 text-zinc-300">Long</td>
                <td className="px-4 py-2.5 text-zinc-300">High</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-primary">
                  Privacy Protocol tooling
                </td>
                <td className="px-4 py-2.5 text-zinc-200">Faster</td>
                <td className="px-4 py-2.5 text-zinc-200">Lower</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </motion.section>
  )
}
