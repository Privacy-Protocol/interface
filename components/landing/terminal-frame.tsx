"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type TerminalFrameProps = {
  children: ReactNode
  variant?:
    | "accent"
    | "muted-accent"
    | "secondary"
    | "muted-secondary"
    | "primary"
    | "muted-primary"
    | "muted"
    | "foreground"
    | "background"
  className?: string
  contentClassName?: string
  frameClassName?: string
}

export function TerminalFrame({
  children,
  variant = "accent",
  className,
  contentClassName,
  frameClassName,
}: TerminalFrameProps) {
  return (
    <div className={cn("relative", className)}>
      <div
        aria-hidden
        className={cn("pointer-events-none absolute inset-0", frameClassName)}
      >
        <span className={`absolute -top-2 left-5 text-lg text-${variant}`}>
          ___
        </span>
        <span className={`absolute inset-x-0 top-0 h-px bg-${variant}/50`} />
        <span className={`absolute inset-x-0 bottom-0 h-px bg-${variant}/50`} />
        <span className={`absolute inset-y-0 left-0 w-px bg-${variant}/50`} />
        <span className={`absolute inset-y-0 right-0 w-px bg-${variant}/50`} />

        <span className={`absolute top-0 -left-1 h-px w-2 bg-${variant}`} />
        <span className={`absolute top-0 -right-1 h-px w-2 bg-${variant}`} />
        <span className={`absolute bottom-0 -left-1 h-px w-2 bg-${variant}`} />
        <span className={`absolute -right-1 bottom-0 h-px w-2 bg-${variant}`} />

        <span className={`absolute -top-1 left-0 h-2 w-px bg-${variant}`} />
        <span className={`absolute -top-1 right-0 h-2 w-px bg-${variant}`} />
        <span className={`absolute -bottom-1 left-0 h-2 w-px bg-${variant}`} />
        <span className={`absolute right-0 -bottom-1 h-2 w-px bg-${variant}`} />
      </div>

      <div className={cn("relative", contentClassName)}>{children}</div>
    </div>
  )
}
