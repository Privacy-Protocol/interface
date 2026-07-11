type ProductSectionHeadingProps = {
  eyebrow: string
  title: string
  description?: string
}

export function ProductSectionHeading({
  eyebrow,
  title,
  description,
}: ProductSectionHeadingProps) {
  return (
    <div className="max-w-6xl">
      <div className="flex items-center gap-3">
        <span className="font-code text-xs tracking-[0.25em] text-primary uppercase">
          {`>_ ${eyebrow}`}
        </span>
        <span className="h-px flex-1 bg-border/60" />
      </div>

      <h2 className="mt-4 font-heading text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>

      {description ? (
        <p className="mt-3 max-w-6xl text-sm leading-relaxed text-foreground sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  )
}
