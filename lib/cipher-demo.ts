import {
  configureCipherGlobalProviders,
  type CipherProofBundle,
  type CipherProofProvider,
  type ParsedCipherLog,
} from "@privacy-protocol/cipher"
import {
  decodeAbiParameters,
  encodeAbiParameters,
  formatUnits,
  keccak256,
} from "viem"

export const MOCK_TOKEN = "0xB6468348B643F6C80cc49595aD557Fd24F42C5Fe" as const
export const DEMO_DAO2 = "0xC3862560f1a8694c330654A5465DFC42A7b52Ec4" as const
export const DEMO_APP_ID = "1001"

export const DEMO_WITNESS = {
  identitySecret: BigInt(4101),
  membershipSecret: BigInt(4202),
  nullifierSecret: BigInt(4303),
  pathElements: new Array(20).fill(BigInt(0)),
  pathIndices: new Array(20).fill(false),
} as const

export const DEMO_DAO2_ABI = [
  {
    type: "function",
    name: "s_proposalCount",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint256" }],
  },
  {
    type: "function",
    name: "s_proposals",
    stateMutability: "view",
    inputs: [{ name: "proposalId", type: "uint256" }],
    outputs: [
      { name: "proposer", type: "address" },
      { name: "target", type: "address" },
      { name: "value", type: "uint256" },
      { name: "startTime", type: "uint64" },
      { name: "endTime", type: "uint64" },
      { name: "optionCount", type: "uint8" },
      { name: "status", type: "uint8" },
      { name: "executed", type: "bool" },
    ],
  },
  {
    type: "function",
    name: "getCipherProposalDescriptor",
    stateMutability: "view",
    inputs: [{ name: "proposalId", type: "uint256" }],
    outputs: [
      {
        type: "tuple",
        components: [
          { name: "contextId", type: "bytes32" },
          { name: "optionCount", type: "uint8" },
          { name: "ballotSpecHash", type: "bytes32" },
          { name: "allowInterimTallies", type: "bool" },
          { name: "startTime", type: "uint64" },
          { name: "endTime", type: "uint64" },
          { name: "metadataURI", type: "string" },
        ],
      },
    ],
  },
  {
    type: "function",
    name: "getCipherContextId",
    stateMutability: "view",
    inputs: [{ name: "proposalId", type: "uint256" }],
    outputs: [{ type: "bytes32" }],
  },
] as const

export const ERC20_ABI = [
  {
    type: "function",
    name: "balanceOf",
    stateMutability: "view",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ type: "uint256" }],
  },
  {
    type: "function",
    name: "decimals",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint8" }],
  },
] as const

function stringifyBigInts(value: unknown): unknown {
  if (typeof value === "bigint") return value.toString()
  if (Array.isArray(value)) return value.map(stringifyBigInts)
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, nested]) => [
        key,
        stringifyBigInts(nested),
      ])
    )
  }
  return value
}

function shortenHex(value: string, keep = 6) {
  if (!value.startsWith("0x") || value.length <= keep * 2 + 2) return value
  return `${value.slice(0, keep + 2)}...${value.slice(-keep)}`
}

export function formatTokenBalance(balance: bigint, decimals = 18) {
  return Number(formatUnits(balance, decimals)).toLocaleString(undefined, {
    maximumFractionDigits: 2,
  })
}

export function createDemoProofProvider(): CipherProofProvider {
  return {
    async generateProof(
      params: Parameters<CipherProofProvider["generateProof"]>[0]
    ): Promise<CipherProofBundle> {
      const response = await fetch("/api/cipher/proof", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(stringifyBigInts(params)),
      })

      if (!response.ok) {
        const body = await response.text()
        throw new Error(body || "Failed to generate Cipher proof")
      }

      return response.json()
    },
  }
}

let providersConfigured = false

export function ensureCipherDemoProviders() {
  if (providersConfigured) return
  configureCipherGlobalProviders({ proofProvider: createDemoProofProvider() })
  providersConfigured = true
}

export function buildInterimTallyCommitment(values: {
  contextId: `0x${string}`
  forVotes: bigint
  againstVotes: bigint
  abstainVotes: bigint
}) {
  return keccak256(
    encodeAbiParameters(
      [
        { type: "bytes32" },
        { type: "uint256" },
        { type: "uint256" },
        { type: "uint256" },
      ],
      [
        values.contextId,
        values.forVotes,
        values.againstVotes,
        values.abstainVotes,
      ]
    )
  )
}

export function mapCipherLogs(logs: ParsedCipherLog[]): TTransactionLog[] {
  return logs.map((log) => {
    switch (log.type) {
      case "router.actionSubmitted":
        return {
          status: "Router",
          method: "ActionSubmitted",
          hash: shortenHex(log.txHash),
          tone: "cyan",
          params: [
            `contextId: ${shortenHex(log.contextId)}`,
            `nullifierKey: ${shortenHex(log.nullifierKey)}`,
            `payloadHash: ${shortenHex(log.payloadHash)}`,
            `encryptedRef: ${shortenHex(log.encryptedPayloadRef)}`,
            "plaintext vote is not present onchain",
          ].join("\n"),
        }
      case "voting.voteStored":
        return {
          status: "Adapter",
          method: "VoteStored",
          hash: shortenHex(log.txHash),
          tone: "emerald",
          params: [
            `actionId: ${shortenHex(log.actionId)}`,
            `root: ${shortenHex(log.root)}`,
            `nullifier: ${shortenHex(log.nullifier)}`,
            `payloadHash: ${shortenHex(log.payloadHash)}`,
            `encryptedRef: ${shortenHex(log.encryptedPayloadRef)}`,
            "only hidden bindings were stored",
          ].join("\n"),
        }
      case "voting.interimTallySubmitted":
        return {
          status: "Snapshot",
          method: "InterimTallySubmitted",
          hash: shortenHex(log.txHash),
          tone: "emerald",
          params: [
            `for: ${log.forVotes.toString()}`,
            `against: ${log.againstVotes.toString()}`,
            `abstain: ${log.abstainVotes.toString()}`,
            `tallyCommitment: ${shortenHex(log.tallyCommitment)}`,
            "aggregate counts updated without opening individual votes",
          ].join("\n"),
        }
      case "voting.tallySubmitted":
        return {
          status: "Final",
          method: "TallySubmitted",
          hash: shortenHex(log.txHash),
          tone: "emerald",
          params: [
            `for: ${log.forVotes.toString()}`,
            `against: ${log.againstVotes.toString()}`,
            `abstain: ${log.abstainVotes.toString()}`,
            `tallyCommitment: ${shortenHex(log.tallyCommitment)}`,
          ].join("\n"),
        }
      default:
        return {
          status: "Event",
          method: log.type,
          hash: shortenHex(log.txHash),
          tone: "cyan",
          params: JSON.stringify(log, null, 2),
        }
    }
  })
}

export function decodeProofPayload(encoded: `0x${string}`) {
  return decodeAbiParameters(
    [{ type: "bytes" }, { type: "bytes32[]" }],
    encoded
  )
}
