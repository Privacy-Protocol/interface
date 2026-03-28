"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { createCipherClient } from "@privacy-protocol/cipher"
import { useAccount, usePublicClient, useWalletClient } from "wagmi"
import { sepolia } from "wagmi/chains"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  buildInterimTallyCommitment,
  DEMO_APP_ID,
  DEMO_DAO2,
  DEMO_DAO2_ABI,
  DEMO_WITNESS,
  ensureCipherDemoProviders,
  mapCipherLogs,
} from "@/lib/cipher-demo"

const choiceMap: Record<DemoChoice, "for" | "against" | "abstain"> = {
  yes: "for",
  no: "against",
  abstain: "abstain",
}

function addChoiceToTally(
  choice: DemoChoice,
  tally: { forVotes: bigint; againstVotes: bigint; abstainVotes: bigint }
) {
  return {
    forVotes: tally.forVotes + (choice === "yes" ? BigInt(1) : BigInt(0)),
    againstVotes:
      tally.againstVotes + (choice === "no" ? BigInt(1) : BigInt(0)),
    abstainVotes:
      tally.abstainVotes + (choice === "abstain" ? BigInt(1) : BigInt(0)),
  }
}

function proposalLabel(proposal: ActiveProposal) {
  if (proposal.descriptor.metadataURI.trim().length > 0) {
    return proposal.descriptor.metadataURI
  }
  return `Proposal #${proposal.proposalId.toString()}`
}

export function CipherDemo({ onLogsChange }: CipherDemoProps) {
  const [choice, setChoice] = useState<DemoChoice>("yes")
  const [statusMessage, setStatusMessage] = useState(
    "Connect your wallet on Sepolia to load active DAO proposals."
  )
  const [activeProposals, setActiveProposals] = useState<ActiveProposal[]>([])
  const [proposalDescriptor, setProposalDescriptor] =
    useState<ProposalDescriptor | null>(null)
  const [isBusy, setIsBusy] = useState(false)

  const { chainId, isConnected } = useAccount()
  const { data: walletClient } = useWalletClient()
  const publicClient = usePublicClient({ chainId: sepolia.id })

  useEffect(() => {
    ensureCipherDemoProviders()
  }, [])

  const cipher = useMemo(() => {
    if (!walletClient) return null
    return createCipherClient({
      chain: sepolia,
      walletClient,
      appId: DEMO_APP_ID,
    })
  }, [walletClient])

  const refreshDemoState = useCallback(async () => {
    if (!publicClient || !cipher) return

    try {
      const proposalCount = (await publicClient.readContract({
        address: DEMO_DAO2,
        abi: DEMO_DAO2_ABI,
        functionName: "s_proposalCount",
      })) as bigint

      if (proposalCount === BigInt(0)) {
        setActiveProposals([])
        setProposalDescriptor(null)
        setStatusMessage(
          "No active proposals found on DemoDao2 yet. Add one on Etherscan and refresh."
        )
        return
      }

      const now = BigInt(Math.floor(Date.now() / 1000))
      const proposalIds = Array.from(
        { length: Number(proposalCount) },
        (_, index) => BigInt(index + 1)
      )

      const proposals = (
        await Promise.all(
          proposalIds.map(async (proposalId) => {
            try {
              const [coreTuple, descriptor] = await Promise.all([
                publicClient.readContract({
                  address: DEMO_DAO2,
                  abi: DEMO_DAO2_ABI,
                  functionName: "s_proposals",
                  args: [proposalId],
                }) as Promise<ProposalCoreTuple>,
                publicClient.readContract({
                  address: DEMO_DAO2,
                  abi: DEMO_DAO2_ABI,
                  functionName: "getCipherProposalDescriptor",
                  args: [proposalId],
                }) as Promise<ProposalDescriptor>,
              ])

              const [
                proposer,
                target,
                value,
                startTime,
                endTime,
                optionCount,
                status,
                executed,
              ] = coreTuple

              return {
                proposalId,
                descriptor: {
                  ...descriptor,
                  optionCount: Number(descriptor.optionCount),
                },
                core: {
                  proposer,
                  target,
                  value,
                  startTime,
                  endTime,
                  optionCount: Number(optionCount),
                  status: BigInt(status),
                  executed,
                },
              } satisfies ActiveProposal
            } catch {
              return null
            }
          })
        )
      ).filter((proposal): proposal is ActiveProposal => {
        if (!proposal) return false
        return (
          proposal.core.status === BigInt(0) &&
          (proposal.core.startTime === BigInt(0) ||
            now >= proposal.core.startTime) &&
          (proposal.core.endTime === BigInt(0) || now <= proposal.core.endTime)
        )
      })

      setActiveProposals(proposals)

      if (proposals.length === 0) {
        setProposalDescriptor(null)
        setStatusMessage(
          "No active proposals found on DemoDao2 yet. Add one on Etherscan and refresh."
        )
        return
      }

      const firstProposal = proposals[0]
      setProposalDescriptor(firstProposal.descriptor)
      setStatusMessage(
        "Active proposal loaded. Submit a private vote through Cipher."
      )
    } catch (error) {
      console.error(error)
      setStatusMessage("Could not load active proposals from DemoDao2.")
    }
  }, [cipher, publicClient])

  useEffect(() => {
    if (!cipher || !publicClient || !isConnected || chainId !== sepolia.id)
      return
    void refreshDemoState()
  }, [chainId, cipher, isConnected, publicClient, refreshDemoState])

  const currentProposalId = activeProposals[0]?.proposalId ?? null

  const handleVote = useCallback(async () => {
    if (!cipher || !proposalDescriptor || currentProposalId === null) return

    setIsBusy(true)
    setStatusMessage(
      "Generating a real Noir proof and submitting the vote through Cipher Router…"
    )

    try {
      const ballot = cipher.dao.ballots.abstainableYesNo().encode({
        choice: choiceMap[choice],
        voteBlinding: BigInt(4404),
        payloadSalt: BigInt(4505),
      })

      const voteResult = await cipher.dao.vote({
        daoAddress: DEMO_DAO2,
        proposalId: currentProposalId,
        ballot,
        witness: DEMO_WITNESS,
        encryption: {
          payload: {
            proposalId: currentProposalId.toString(),
            choice,
            note: "Vote payload encrypted offchain; onchain stores only bindings.",
          },
          inline: true,
        },
      })

      const nextLogs = mapCipherLogs(voteResult.logs)
      onLogsChange?.(nextLogs)
      setStatusMessage(
        "Vote recorded. Publishing an interim aggregate snapshot so turnout updates without revealing the ballot."
      )

      try {
        const currentTally = await cipher.dao.getCurrentTally({
          daoAddress: DEMO_DAO2,
          proposalId: currentProposalId,
        })
        const updatedCounts = addChoiceToTally(choice, currentTally)
        const snapshotResult = await cipher.dao.publishInterimTally({
          daoAddress: DEMO_DAO2,
          proposalId: currentProposalId,
          tally: {
            ...updatedCounts,
            tallyCommitment: buildInterimTallyCommitment({
              contextId: proposalDescriptor.contextId,
              ...updatedCounts,
            }),
          },
        })
        onLogsChange?.([...nextLogs, ...mapCipherLogs(snapshotResult.logs)])
        setStatusMessage(
          "Vote stored privately. Snapshot refreshed from the tally authority path to show progress without opening the ballot."
        )
      } catch (snapshotError) {
        const snapshotMessage =
          snapshotError instanceof Error
            ? snapshotError.message
            : "Failed to publish interim tally"
        onLogsChange?.([
          ...nextLogs,
          {
            status: "Snapshot",
            method: "Interim snapshot unavailable",
            hash: "local",
            tone: "cyan",
            params: `${snapshotMessage}
This wallet likely is not the proposal tally authority.`,
          },
        ])
        setStatusMessage(
          "Vote succeeded, but the interim snapshot could not be updated from this wallet."
        )
      }

      await refreshDemoState()
    } catch (error) {
      const message = error instanceof Error ? error.message : "Vote failed"
      setStatusMessage(`Cipher vote failed before settlement. ${message}`)
    } finally {
      setIsBusy(false)
    }
  }, [
    choice,
    cipher,
    currentProposalId,
    onLogsChange,
    proposalDescriptor,
    refreshDemoState,
  ])

  const canVote = Boolean(
    cipher &&
    proposalDescriptor &&
    currentProposalId !== null &&
    isConnected &&
    chainId === sepolia.id
  )

  if (!isConnected || chainId !== sepolia.id) {
    return (
      <div className="space-y-4">
        <div className="rounded-lg border border-border/30 bg-card/25 p-4">
          <p className="text-sm text-foreground/85">{statusMessage}</p>
          {isConnected && chainId !== sepolia.id ? (
            <p className="mt-2 font-code text-xs text-accent">
              Switch to Ethereum Sepolia to use the DAO voting demo.
            </p>
          ) : null}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {activeProposals.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border/40 bg-card/20 p-6 text-center">
          <p className="font-code text-[0.6rem] tracking-[0.18em] text-primary/80 uppercase">
            No Active Proposals
          </p>
          <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
            There are currently no active proposals on DemoDao2. Add a proposal
            on Etherscan, then refresh this panel.
          </p>
          <Button
            onClick={() => void refreshDemoState()}
            disabled={isBusy}
            className="mt-4"
          >
            Refresh Proposals
          </Button>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between rounded-lg border border-border/30 bg-card/25 p-4">
            <p className="font-code text-[0.6rem] tracking-[0.18em] text-primary/80 uppercase">
              Active Proposal
            </p>
            <p className="mt-2 text-sm text-foreground/85">
              {activeProposals[0]
                ? proposalLabel(activeProposals[0])
                : "No proposal"}
            </p>
          </div>

          <div className="flex gap-3">
            {[
              { label: "Yes", value: "yes" as const },
              { label: "No", value: "no" as const },
              { label: "Abstain", value: "abstain" as const },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setChoice(option.value)}
                className={cn(
                  "flex w-full items-center justify-between rounded-md border px-3 py-2 text-sm transition-colors",
                  choice === option.value
                    ? "border-primary/60 bg-primary/12 text-foreground"
                    : "border-border/30 bg-card/25 text-muted-foreground hover:border-primary/40 hover:text-foreground/85"
                )}
              >
                <span>{option.label}</span>
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleVote}
              disabled={!canVote || isBusy}
              className="w-full"
            >
              {isBusy ? "Submitting..." : "Submit Vote"}
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
