import type { ReactNode } from "react"
import { TerminalFrame } from "@/components/ui/terminal-frame"
import { cn } from "@/lib/utils"

type ProductCardProps = {
  children: ReactNode
  className?: string
  variant?: React.ComponentProps<typeof TerminalFrame>["variant"]
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
        "group h-full rounded-lg bg-card/30 p-5 transition-all duration-300 hover:bg-card/45",
        className
      )}
    >
      <div className="relative h-full">{children}</div>
    </TerminalFrame>
  )
}
