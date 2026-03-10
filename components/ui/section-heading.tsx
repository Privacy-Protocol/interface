export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-[0.65rem] tracking-[0.2em] text-primary uppercase">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance text-zinc-50 sm:text-4xl">
        {title}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-zinc-300 sm:text-base">
        {description}
      </p>
    </div>
  )
}
