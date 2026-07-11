import { cn } from "@/lib/utils"

export function ProductCardTitle({
  title,
  description,
  className,
}: {
  title: string
  description: string
  className?: string
}) {
  return (
    <>
      <h3
        className={cn(
          "h-14 font-heading text-lg font-semibold text-accent sm:text-xl",
          className
        )}
      >
        {title}
      </h3>
      <p className="mt-2 text-base leading-relaxed text-foreground">
        {description}
      </p>
    </>
  )
}
