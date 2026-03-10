export function SectionTitle({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <h2 className="text-3xl font-bold tracking-widest text-primary uppercase sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 font-mono text-sm tracking-wide text-primary/70 sm:text-base">
        {description}
      </p>
    </div>
  )
}
