"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { TerminalFrame } from "@/components/landing/terminal-frame"
import { reveal } from "@/components/landing/landing-page"
import { cn } from "@/lib/utils"

type Action = {
  href: string
  label: string
  variant?: "default" | "outline"
  icon?: boolean
}

type ProductHeroProps = {
  eyebrow: string
  title: string
  subtitle: string
  description: string
  visual: ReactNode
  actions: Action[]
  frameVariant?: React.ComponentProps<typeof TerminalFrame>["variant"]
}

type ProductSectionHeadingProps = {
  eyebrow: string
  title: string
  description: string
}

type ProductCardProps = {
  children: ReactNode
  className?: string
  variant?: React.ComponentProps<typeof TerminalFrame>["variant"]
}

type ProductFlowRailProps = {
  steps: { title: string; detail: string }[]
}

export function ProductHero({
  eyebrow,
  title,
  subtitle,
  description,
  visual,
  actions,
  frameVariant = "muted-primary",
}: ProductHeroProps) {
  return (
    <section className="relative overflow-hidden px-4 pt-32 pb-16 sm:px-6 sm:pt-40 sm:pb-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(110,213,249,0.1),transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0 plum-depth opacity-60" />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[1.02fr_0.98fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="font-code text-xs tracking-[0.25em] text-primary uppercase">
              {eyebrow}
            </span>
            <span className="h-px flex-1 bg-border/60" />
          </div>

          <h1 className="mt-6 font-heading text-4xl leading-[1.02] font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            {title}
          </h1>

          <p className="mt-4 max-w-2xl font-heading text-xl text-accent sm:text-2xl">
            {subtitle}
          </p>

          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {actions.map((action) => (
              <Button
                key={action.label}
                asChild
                variant={action.variant ?? "default"}
              >
                <Link
                  href={action.href}
                  className={cn(action.icon && "inline-flex items-center gap-2")}
                >
                  {action.label}
                  {action.icon ? (
                    <ArrowRight weight="bold" className="size-3" />
                  ) : null}
                </Link>
              </Button>
            ))}
          </div>
        </div>

        <TerminalFrame
          variant={frameVariant}
          className="overflow-hidden rounded-lg bg-card/25 p-5 sm:p-6"
        >
          <div className="relative min-h-[22rem]">{visual}</div>
        </TerminalFrame>
      </div>
    </section>
  )
}

export function ProductSection({
  children,
  className,
  ...props
}: {
  children: ReactNode
  className?: string
  id?: string
}) {
  return (
    <motion.section
      {...reveal}
      {...props}
      className={cn("relative px-4 py-20 sm:px-6 sm:py-28", className)}
    >
      {children}
    </motion.section>
  )
}

export function ProductSectionHeading({
  eyebrow,
  title,
  description,
}: ProductSectionHeadingProps) {
  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-3">
        <span className="font-code text-xs tracking-[0.25em] text-primary uppercase">
          {eyebrow}
        </span>
        <span className="h-px flex-1 bg-border/60" />
      </div>

      <h2 className="mt-4 font-heading text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>

      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
        {description}
      </p>
    </div>
  )
}

export function ProductCard({
  children,
  className,
  variant = "muted-primary",
}: ProductCardProps) {
  return (
    <TerminalFrame
      variant={variant}
      className={cn(
        "group h-full overflow-hidden rounded-lg bg-card/30 p-5 transition-all duration-300 hover:bg-card/45",
        className
      )}
    >
      <div className="relative h-full">{children}</div>
    </TerminalFrame>
  )
}

export function ProductCardTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string
  title: string
  description: string
}) {
  return (
    <>
      {eyebrow ? (
        <p className="font-code text-[0.6rem] tracking-[0.25em] text-primary/65 uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h3 className="mt-2 font-heading text-lg font-semibold text-foreground sm:text-xl">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </>
  )
}

export function ProductChip({
  children,
  variant = "primary",
}: {
  children: ReactNode
  variant?: "primary" | "accent"
}) {
  return (
    <span
      className={cn(
        "rounded-full border bg-card/40 px-3 py-1 font-code text-[0.62rem] tracking-[0.18em] uppercase",
        variant === "accent"
          ? "border-accent/40 text-accent/80"
          : "border-primary/40 text-primary/80"
      )}
    >
      {children}
    </span>
  )
}

export function ProductFlowRail({ steps }: ProductFlowRailProps) {
  return (
    <div className="mt-10 overflow-x-auto pb-2">
      <div className="flex min-w-max items-stretch gap-3">
        {steps.map((step, index) => (
          <div key={step.title} className="flex items-center gap-3">
            <ProductCard className="w-52 shrink-0 p-4" variant="primary">
              <p className="font-code text-[0.6rem] tracking-[0.22em] text-primary uppercase">
                {step.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.detail}
              </p>
            </ProductCard>
            {index < steps.length - 1 ? (
              <span className="font-code text-xs text-primary/70">→</span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}
