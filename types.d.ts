type TStep = {
  number: string
  title: string
  description: string
}

type TFeature = {
  title: string
  description: string
}

type TBenefit = {
  title: string
  description: string
}

type TQuickStep = {
  title: string
  code: string
  description: string
}

type TProductCard = {
  name: string
  href: string
  description: string
  useCases: string[]
  tone: "primary" | "accent"
  span: string
}

type TBentoItem = {
  title: string
  text: string
  span: string
}

type TResearchPost = {
  title: string
  type: "Blog" | "Research"
  date: string
  summary: string
  href: string
}

type TReveal = {
  initial: {
    opacity: number
    y: number
  }
  whileInView: {
    opacity: number
    y: number
  }
  viewport: {
    once: boolean
    margin: string
  }
  transition: { duration: number; ease: readonly [0.22, 1, 0.36, 1] }
}
