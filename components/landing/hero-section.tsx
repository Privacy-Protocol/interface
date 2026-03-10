import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRightIcon } from "../ui/icons"

function HeroVisual({ reducedMotion }: { reducedMotion: boolean }) {
  const { scrollY } = useScroll()
  const parallaxY = useTransform(scrollY, [0, 700], [0, 110])
  const layers = Array.from({ length: 9 }).map((_, i) => i)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      style={{ y: reducedMotion ? 0 : parallaxY }}
      className="pointer-events-none absolute inset-0 z-0 mx-auto max-w-4xl"
      aria-hidden
    >
      <div className="relative h-full w-full">
        <motion.div
          className="absolute top-1/2 left-1/2 h-[340px] w-[92%] -translate-x-1/2 -translate-y-1/2 border border-primary/40 bg-card/25 backdrop-blur-sm sm:h-[390px]"
          animate={reducedMotion ? undefined : { rotate: [0, 0.8, -0.6, 0] }}
          transition={{ duration: 18, ease: "easeInOut", repeat: Infinity }}
        />

        {layers.map((layer) => (
          <motion.div
            key={layer}
            className="absolute top-1/2 left-1/2 h-[300px] -translate-x-1/2 -translate-y-1/2 border border-primary/20 bg-transparent"
            style={{ width: `${84 - layer * 5}%` }}
            animate={
              reducedMotion
                ? undefined
                : {
                    opacity: [0.2, 0.55, 0.22],
                    y: [0, layer % 2 === 0 ? -6 : 6, 0],
                  }
            }
            transition={{
              duration: 4 + layer * 0.35,
              repeat: Infinity,
              ease: "easeInOut",
              delay: layer * 0.08,
            }}
          />
        ))}

        <motion.div
          className="absolute top-1/2 left-1/2 h-[320px] w-[88%] -translate-x-1/2 -translate-y-1/2 bg-linear-to-r from-transparent via-primary/18 to-transparent"
          animate={reducedMotion ? undefined : { x: ["-12%", "12%", "-12%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="absolute top-1/2 left-1/2 h-[360px] w-[94%] -translate-x-1/2 -translate-y-1/2 bg-linear-to-b from-background/30 via-transparent to-background/45" />
      </div>
    </motion.div>
  )
}

export function HeroSection({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <section className="relative px-4 pt-34 pb-20 sm:px-6 sm:pt-40">
      <HeroVisual reducedMotion={Boolean(reducedMotion)} />
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.36 }}
          className="text-[0.64rem] tracking-[0.2em] text-primary uppercase"
        >
          Privacy Protocol // Confidential app infrastructure
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42, delay: 0.05 }}
          className="mx-auto mt-4 max-w-3xl text-4xl leading-tight font-semibold tracking-tight text-balance text-zinc-50 sm:text-5xl md:text-6xl"
        >
          Build confidential web3 applications
          <span className="block bg-linear-to-r from-primary via-accent to-cyan-300 bg-clip-text text-transparent">
            without cryptography complexity
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42, delay: 0.1 }}
          className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-balance text-zinc-300 sm:text-base"
        >
          Developer-first privacy middleware for teams shipping secure dapps.
          <span className="block">
            Fast integration, strong guarantees, production-ready tooling.
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.15 }}
          className="mt-7 flex flex-wrap items-center justify-center gap-3"
        >
          <Button
            asChild
            className="h-10 border border-primary/60 bg-primary/14 px-5 text-[0.64rem] tracking-[0.2em] text-primary uppercase hover:bg-primary/22"
          >
            <Link href="#products" className="inline-flex items-center gap-1.5">
              Explore Tools
              <ArrowRightIcon />
            </Link>
          </Button>
          <Button
            asChild
            className="h-10 border border-accent/50 bg-accent/12 px-5 text-[0.64rem] tracking-[0.2em] text-accent uppercase hover:bg-accent/20"
          >
            <Link href="/contact" className="inline-flex items-center gap-1.5">
              Contact Us
              <ArrowRightIcon />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
