"use client"

import Link from "next/link"
import { ArrowRight } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { MatrixHeroBackground } from "../landing/matrix-hero-background"
import { ProductNpm } from "./product-npm"

type Action = {
  href: string
  label: string
  variant?: "default" | "outline"
  icon?: boolean
}

type ProductHeroProps = {
  title: string
  subtitle: string
  actions: Action[]
  npm: string
  classname?: string
}

export function ProductHero({
  title,
  subtitle,
  actions,
  npm,
  classname,
}: ProductHeroProps) {
  const handleAnchorClick = (e: React.MouseEvent, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault()
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      className={cn(
        "flex min-h-screen items-center justify-center overflow-hidden px-4 py-16 sm:px-6 sm:py-20",
        classname
      )}
    >
      <MatrixHeroBackground />
      <div className="z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
        <h1 className="mt-6 font-heading text-4xl leading-[1.02] font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          {title}
        </h1>

        <p className="mx-auto mt-4 max-w-4xl font-body text-xl font-semibold text-accent sm:text-4xl">
          {subtitle}
        </p>

        {/* <p className="mt-5 mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {description}
          </p> */}
        <ProductNpm npm={npm} className="mt-8" />

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {actions.map((action) => (
            <Button
              key={action.label}
              asChild
              variant={action.variant ?? "default"}
            >
              <Link
                href={action.href}
                onClick={(e) => handleAnchorClick(e, action.href)}
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
    </section>
  )
}
