import { motion } from "framer-motion"
import { SectionHeading } from "../ui/section-heading"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import Link from "next/link"
import { ArrowRightIcon } from "../ui/icons"

interface Props {
  reveal: TReveal
  productsData: TProductCard[]
}

export function ProductsSection({ reveal, productsData }: Props) {
  return (
    <motion.section {...reveal} id="products" className="px-4 py-14 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Products"
          title="Two privacy tool lines"
          description="Different layers, one composable developer experience."
        />

        <div className="mt-8 grid gap-4 lg:grid-cols-12">
          {productsData.map((product) => (
            <motion.article
              key={product.name}
              className={cn(
                "group relative flex min-h-[320px] flex-col overflow-hidden border bg-card/70 p-5 backdrop-blur-sm lg:col-span-12",
                product.span,
                product.tone === "primary"
                  ? "border-primary/40"
                  : "border-accent/40"
              )}
              style={{ borderRadius: 12 }}
              whileHover={{ y: -4, scale: 1.01, borderRadius: 22 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="text-2xl font-semibold text-zinc-50">
                {product.name}
              </h3>
              <p className="mt-2 text-sm text-zinc-300">
                {product.description}
              </p>

              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {product.useCases.map((useCase) => (
                  <p
                    key={useCase}
                    className="border border-border/70 bg-muted/45 px-2.5 py-2 text-xs tracking-[0.12em] text-zinc-200 uppercase"
                  >
                    {useCase}
                  </p>
                ))}
              </div>

              <Button
                asChild
                className={cn(
                  "mt-auto h-9 border bg-transparent px-4 text-[0.62rem] tracking-[0.2em] uppercase",
                  product.tone === "primary"
                    ? "border-primary/55 text-primary hover:bg-primary/15"
                    : "border-accent/55 text-accent hover:bg-accent/15"
                )}
              >
                <Link
                  href={product.href}
                  className="inline-flex items-center gap-1.5"
                >
                  Visit {product.name}
                  <ArrowRightIcon />
                </Link>
              </Button>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
