import { Gavel } from "@phosphor-icons/react"
import { PAGE_LINKS } from "@/lib/constants"

export const CIPHER_TOOLKITS: CipherToolkit[] = [
  {
    id: "governance",
    name: "DAO Toolkit",
    status: "available",
    icon: Gavel,
    summary: "Confidential voting and proposal execution for DAOs",
    description:
      "End-to-end confidential governance built on FHE-encrypted tallying and ZK membership proofs. Voters prove DAO membership without revealing identity, cast encrypted ballots that are tallied homomorphically, and enforce one-vote-per-member via nullifiers - all on-chain.",
    primitives: ["FHE", "ZK Proofs", "Nullifiers"],
    features: [
      "Encrypted ballot casting and homomorphic tallying",
      "ZK membership proofs with Noir circuits",
      "Nullifier-based double-vote prevention",
      "On-chain result decryption by threshold committee",
    ],
    useCases: [
      "DAO treasury votes with hidden preferences",
      "Board elections with verifiable yet private ballots",
      "Protocol parameter governance without voter coercion",
    ],
    href: PAGE_LINKS.DOCS,
  },
  // {
  //   id: "credentials",
  //   name: "Private Credentials",
  //   status: "preview",
  //   icon: ShieldCheck,
  //   summary: "Verifiable claims without exposing underlying data",
  //   description:
  //     "Issue and verify credentials on-chain while keeping the underlying data hidden. Holders prove properties about their credentials - age ranges, membership tiers, accreditation status - without revealing the credential itself. Built on commitment schemes and selective-disclosure ZK proofs.",
  //   primitives: ["ZK Proofs", "Commitments", "Selective Disclosure"],
  //   features: [
  //     "On-chain credential issuance with hidden payloads",
  //     "Selective attribute disclosure via ZK circuits",
  //     "Revocation checks without credential linkability",
  //     "Composable verifier contracts",
  //   ],
  //   useCases: [
  //     "KYC-gated DeFi without sharing personal data",
  //     "Reputation-based access without identity exposure",
  //     "Credential-gated airdrops preserving recipient privacy",
  //   ],
  //   href: PAGE_LINKS.CIPHER,
  // },
  // {
  //   id: "transfers",
  //   name: "Confidential Transfers",
  //   status: "coming-soon",
  //   icon: Lock,
  //   summary: "Hidden amounts and encrypted balances on-chain",
  //   description:
  //     "Transfer tokens with encrypted amounts using FHE. Balances remain confidential on-chain while smart contracts can still enforce spending rules, compliance checks, and allowance logic - all operating over ciphertext without decrypting.",
  //   primitives: ["FHE", "Encrypted Uint", "Range Proofs"],
  //   features: [
  //     "Encrypted ERC-20 balances and transfer amounts",
  //     "Homomorphic balance updates without decryption",
  //     "Range proofs for overdraft prevention",
  //     "Confidential allowance and approval flows",
  //   ],
  //   useCases: [
  //     "Payroll distribution with hidden salaries",
  //     "OTC settlement without public price exposure",
  //     "Treasury operations with confidential allocations",
  //   ],
  // },
  // {
  //   id: "auctions",
  //   name: "Private Auctions",
  //   status: "coming-soon",
  //   icon: Eye,
  //   summary: "Sealed-bid auctions with verifiable outcomes",
  //   description:
  //     "Run fully sealed-bid auctions on-chain where bids are encrypted, the winning bid is determined homomorphically, and only the outcome is revealed. No participant can see competing bids during or after the auction - only the winner and final price are disclosed.",
  //   primitives: ["FHE", "Commitments", "Threshold Decryption"],
  //   features: [
  //     "Encrypted bid submission and storage",
  //     "Homomorphic winner determination",
  //     "Threshold decryption for result revelation",
  //     "Configurable auction types (first-price, second-price)",
  //   ],
  //   useCases: [
  //     "NFT auctions without bid sniping or frontrunning",
  //     "Spectrum / resource allocation with fair bidding",
  //     "Private procurement and RFP processes",
  //   ],
  // },
]

export const STATUS_MAP: Record<
  ToolkitStatus,
  { label: string; dotClass: string; textClass: string }
> = {
  available: {
    label: "Available",
    dotClass: "bg-primary shadow-[0_0_6px_oklch(0.82_0.28_142/0.5)]",
    textClass: "text-primary/70",
  },
  preview: {
    label: "Preview",
    dotClass: "bg-accent shadow-[0_0_6px_oklch(0.82_0.12_215/0.4)]",
    textClass: "text-accent/70",
  },
  "coming-soon": {
    label: "Coming soon",
    dotClass: "bg-muted-foreground/40",
    textClass: "text-muted-foreground/50",
  },
}

export const CLOAK_PILLARS = [
  {
    title: "Actor Privacy",
    description:
      "Decouple on-chain actions from real-world identities. Relay-safe transaction submission and stealth addressing.",
  },
  {
    title: "Low Linkability",
    description:
      "Reduce the ability to correlate transactions across sessions. Timing decorrelation and address rotation patterns.",
  },
  {
    title: "Shielded Execution",
    description:
      "Execute contract logic without exposing the caller or the interaction graph. Private function dispatch and encrypted calldata.",
  },
]
