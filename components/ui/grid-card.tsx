import { cn } from "@/lib/utils"

export function GridCard({
  title,
  description,
  className,
}: {
  title: string
  description: string
  className?: string
}) {
  return (
    <div className={cn("border border-primary/20 bg-card/75 p-5", className)}>
      <h3 className="text-sm font-bold tracking-[0.18em] text-primary/90 uppercase sm:text-base">
        {title}
      </h3>
      <p className="mt-3 font-mono text-sm leading-relaxed text-primary/65">
        {description}
      </p>
    </div>
  )
}
