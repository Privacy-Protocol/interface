export function SectionTitle({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string
  title: string
  subtitle: string
}) {
  return (
    <>
      <div className="flex items-center gap-3">
        <span className="font-code text-xs tracking-[0.25em] text-primary uppercase">
          {`>_ ${eyebrow}`}
        </span>
        <span className="h-px flex-1 bg-border/60" />
      </div>

      <h2 className="mt-4 font-heading text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
        {title}
        <br />
        <span className="text-accent">{subtitle}</span>
      </h2>
    </>
  )
}
