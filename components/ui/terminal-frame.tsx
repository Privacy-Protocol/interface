"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

const TERMINAL_FRAME_VARIANTS = {
  accent: {
    text: "text-accent",
    line: "bg-accent",
    lineMuted: "bg-accent/50",
  },
  "muted-accent": {
    text: "text-muted-accent",
    line: "bg-muted-accent",
    lineMuted: "bg-muted-accent/50",
  },
  secondary: {
    text: "text-secondary",
    line: "bg-secondary",
    lineMuted: "bg-secondary/50",
  },
  "muted-secondary": {
    text: "text-muted-secondary",
    line: "bg-muted-secondary",
    lineMuted: "bg-muted-secondary/50",
  },
  primary: {
    text: "text-primary",
    line: "bg-primary",
    lineMuted: "bg-primary/50",
  },
  "muted-primary": {
    text: "text-muted-primary",
    line: "bg-muted-primary",
    lineMuted: "bg-muted-primary/50",
  },
  muted: {
    text: "text-muted",
    line: "bg-muted",
    lineMuted: "bg-muted/50",
  },
  foreground: {
    text: "text-foreground",
    line: "bg-foreground",
    lineMuted: "bg-foreground/50",
  },
  background: {
    text: "text-background",
    line: "bg-background",
    lineMuted: "bg-background/50",
  },
} as const

type TerminalFrameProps = {
  children: ReactNode
  variant?: keyof typeof TERMINAL_FRAME_VARIANTS
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
  const frameStyles = TERMINAL_FRAME_VARIANTS[variant]

  return (
    <div className={cn("relative", className)}>
      <div
        aria-hidden
        className={cn("pointer-events-none absolute inset-0", frameClassName)}
      >
        <span
          className={cn("absolute -top-2 left-5 text-lg", frameStyles.text)}
        >
          ___
        </span>
        <span
          className={cn("absolute inset-x-0 top-0 h-px", frameStyles.lineMuted)}
        />
        <span
          className={cn(
            "absolute inset-x-0 bottom-0 h-px",
            frameStyles.lineMuted,
          )}
        />
        <span
          className={cn("absolute inset-y-0 left-0 w-px", frameStyles.lineMuted)}
        />
        <span
          className={cn(
            "absolute inset-y-0 right-0 w-px",
            frameStyles.lineMuted,
          )}
        />

        <span className={cn("absolute top-0 -left-1 h-px w-2", frameStyles.line)} />
        <span
          className={cn("absolute top-0 -right-1 h-px w-2", frameStyles.line)}
        />
        <span
          className={cn("absolute bottom-0 -left-1 h-px w-2", frameStyles.line)}
        />
        <span
          className={cn("absolute -right-1 bottom-0 h-px w-2", frameStyles.line)}
        />

        <span className={cn("absolute -top-1 left-0 h-2 w-px", frameStyles.line)} />
        <span
          className={cn("absolute -top-1 right-0 h-2 w-px", frameStyles.line)}
        />
        <span
          className={cn("absolute -bottom-1 left-0 h-2 w-px", frameStyles.line)}
        />
        <span
          className={cn("absolute right-0 -bottom-1 h-2 w-px", frameStyles.line)}
        />
      </div>

      <div className={cn("relative", contentClassName)}>{children}</div>
    </div>
  )
}
