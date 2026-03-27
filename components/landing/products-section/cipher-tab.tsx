"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight } from "@phosphor-icons/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CIPHER_TOOLKITS } from "./data"

function ToolkitCard({
  toolkit,
  isActive,
  onSelect,
  index,
}: {
  toolkit: CipherToolkit
  isActive: boolean
  onSelect: () => void
  index: number
}) {
  const Icon = toolkit.icon
  return (
    <motion.button
      onClick={onSelect}
      className={`group relative w-full rounded-lg border p-4 text-left transition-colors duration-200 ${
        isActive
          ? "border-primary/25 bg-primary/6"
          : "border-border/30 bg-card/20 hover:border-border/50 hover:bg-card/30"
      }`}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: 0.06 * index,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.995 }}
    >
      <motion.div
        className="absolute top-3 bottom-3 left-0 w-[2px] rounded-full bg-primary"
        initial={false}
        animate={{ opacity: isActive ? 1 : 0, scaleY: isActive ? 1 : 0.3 }}
        transition={{ duration: 0.25 }}
      />

      <div className="flex items-start gap-3">
        <div
          className={`flex size-8 shrink-0 items-center justify-center rounded-md border transition-colors duration-200 ${
            isActive
              ? "border-primary/20 bg-primary/10 text-primary"
              : "border-border/30 bg-card/40 text-muted-foreground/60"
          }`}
        >
          <Icon weight="duotone" className="size-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h4
              className={`font-heading text-sm font-bold tracking-tight transition-colors duration-200 ${
                isActive ? "text-foreground" : "text-foreground/70"
              }`}
            >
              {toolkit.name}
            </h4>
          </div>
          <p className="mt-1 text-[0.7rem] leading-relaxed text-muted-foreground/70">
            {toolkit.summary}
          </p>
        </div>
      </div>
    </motion.button>
  )
}

function DetailPanel({ toolkit }: { toolkit: CipherToolkit }) {
  const Icon = toolkit.icon
  return (
    <motion.div
      key={toolkit.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="relative h-full overflow-hidden rounded-lg border border-border/25 bg-card/25"
    >
      <div className="plum-depth absolute inset-0 rounded-lg" />

      <div className="relative p-6 sm:p-7">
        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-primary/15 bg-primary/8 text-primary">
            <Icon weight="duotone" className="size-5" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h3 className="font-heading text-lg font-bold tracking-tight text-foreground sm:text-xl">
                {toolkit.name}
              </h3>
            </div>
            <p className="mt-1 text-[0.8rem] leading-relaxed text-muted-foreground">
              {toolkit.summary}
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {toolkit.primitives.map((tag) => (
            <span
              key={tag}
              className="rounded border border-primary/12 bg-primary/4 px-2 py-0.5 font-code text-[0.55rem] tracking-wider text-primary/60 uppercase"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="mt-5 text-[0.8rem] leading-relaxed text-muted-foreground/80">
          {toolkit.description}
        </p>

        <div className="mt-6">
          <span className="font-code text-[0.55rem] tracking-[0.2em] text-foreground/40 uppercase">
            Key capabilities
          </span>
          <ul className="mt-2.5 space-y-2">
            {toolkit.features.map((feat, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-[0.75rem] leading-relaxed text-muted-foreground/70"
              >
                <span className="mt-1.5 inline-flex size-1 shrink-0 rounded-full bg-primary/40" />
                {feat}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <span className="font-code text-[0.55rem] tracking-[0.2em] text-foreground/40 uppercase">
            Use cases
          </span>
          <ul className="mt-2.5 space-y-2">
            {toolkit.useCases.map((uc, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-[0.75rem] leading-relaxed text-muted-foreground/70"
              >
                <span className="mt-1.5 inline-flex size-1 shrink-0 rounded-full bg-accent/40" />
                {uc}
              </li>
            ))}
          </ul>
        </div>

        {toolkit.href && (
          <div className="mt-7">
            <Button asChild size="sm" className="h-8 gap-1.5 px-4">
              <Link href={toolkit.href}>
                View Docs
                <ArrowRight weight="bold" className="size-3" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export function CipherTab({
  activeToolkit,
  onSelectToolkit,
}: {
  activeToolkit: string
  onSelectToolkit: (id: string) => void
}) {
  const selected =
    CIPHER_TOOLKITS.find((toolkit) => toolkit.id === activeToolkit) ??
    CIPHER_TOOLKITS[0]

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="cipher-tab"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="mt-2 mb-4 text-[0.8rem] leading-relaxed text-foreground/70">
          Tools to enable{" "}
          <span className="text-accent/70">
            private and secure data computation
          </span>{" "}
          in your app.
        </p>
        <div className="grid gap-4 lg:grid-cols-12">
          <div className="flex gap-2 overflow-x-auto pb-2 lg:col-span-4 lg:flex-col lg:gap-2.5 lg:overflow-x-visible lg:pb-0">
            {CIPHER_TOOLKITS.map((toolkit, i) => (
              <div
                key={toolkit.id}
                className="min-w-[260px] shrink-0 lg:min-w-0 lg:shrink"
              >
                <ToolkitCard
                  toolkit={toolkit}
                  isActive={activeToolkit === toolkit.id}
                  onSelect={() => onSelectToolkit(toolkit.id)}
                  index={i}
                />
              </div>
            ))}
          </div>

          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <DetailPanel toolkit={selected} />
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
