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

type TTransactionLog = {
  status: string
  method: string
  params: string
  hash: string
  tone: string
}

type DemoMode = "cipher" | "cloak"

type ProductDemoPanelProps = {
  mode: DemoMode
}

type CipherDemoProps = {
  onLogsChange?: (logs: TTransactionLog[]) => void
}

type DemoChoice = "yes" | "no" | "abstain"

type ProposalDescriptor = {
  contextId: `0x${string}`
  optionCount: number
  ballotSpecHash: `0x${string}`
  allowInterimTallies: boolean
  startTime: bigint
  endTime: bigint
  metadataURI: string
}

type ProposalCoreView = {
  proposer: `0x${string}`
  target: `0x${string}`
  value: bigint
  startTime: bigint
  endTime: bigint
  optionCount: number
  status: bigint
  executed: boolean
}

type ProposalCoreTuple = readonly [
  proposer: `0x${string}`,
  target: `0x${string}`,
  value: bigint,
  startTime: bigint,
  endTime: bigint,
  optionCount: number,
  status: number,
  executed: boolean,
]

type ActiveProposal = {
  proposalId: bigint
  descriptor: ProposalDescriptor
  core: ProposalCoreView
}
