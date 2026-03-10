"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useMemo, useState } from "react"

type DemoMode = "cipher" | "cloak"

type ProductDemoPanelProps = {
  mode: DemoMode
}

const cipherLogs = [
  {
    status: "QUEUED",
    method: "submitVoteProof",
    params: "proposalId=14, choice=YES, amount=2500",
    hash: "0x9f3b...b42a",
    tone: "emerald",
  },
  {
    status: "PROVED",
    method: "verifyCommitment",
    params: "commitment=0x8a1e...19f0",
    hash: "0x2ad0...77ce",
    tone: "sky",
  },
  {
    status: "CONFIRMED",
    method: "storeEncryptedVote",
    params: "ciphertext=0x49fa...cd11",
    hash: "0xd4c2...0f91",
    tone: "emerald",
  },
]

const cloakLogs = [
  {
    status: "QUEUED",
    method: "shieldAndSwap",
    params: "tokenIn=ETH, tokenOut=USDC, amount=1.2",
    hash: "0x77be...901a",
    tone: "sky",
  },
  {
    status: "RELAYED",
    method: "spawnShadowAccount",
    params: "shadow=0x0aa7...31fd",
    hash: "0x194e...af38",
    tone: "emerald",
  },
  {
    status: "CONFIRMED",
    method: "settlePrivateSwap",
    params: "output=2391.42 USDC",
    hash: "0xf3c8...6d24",
    tone: "sky",
  },
]

function DemoPanelHeader({ mode }: { mode: DemoMode }) {
  return (
    <div className="mb-4 border-b border-primary/20 pb-3">
      <p className="text-xs tracking-[0.2em] text-primary uppercase">Interactive Demo</p>
      <h3 className="mt-2 text-lg font-semibold text-zinc-50">
        {mode === "cipher" ? "Cipher Voting Demo" : "Cloak Swap Demo"}
      </h3>
    </div>
  )
}

function CipherVotingUi() {
  const [choice, setChoice] = useState<"yes" | "no" | "abstain">("yes")

  return (
    <div className="space-y-4">
      <div className="border border-primary/20 bg-black/40 p-4">
        <p className="text-xs tracking-[0.16em] text-primary/80 uppercase">Proposal #14</p>
        <p className="mt-2 text-sm text-zinc-200">
          Should treasury allocate 5% to ecosystem developer grants?
        </p>
      </div>

      <div className="space-y-2">
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
              "flex w-full items-center justify-between border px-3 py-2 text-sm transition-colors",
              choice === option.value
                ? "border-primary/60 bg-primary/12 text-zinc-100"
                : "border-primary/20 bg-card/70 text-zinc-300 hover:border-primary/40"
            )}
          >
            <span>{option.label}</span>
            <span className="font-mono text-xs uppercase">Private</span>
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="space-y-1">
          <span className="text-xs tracking-[0.14em] text-primary/70 uppercase">Voting Power</span>
          <input
            type="text"
            defaultValue="2500"
            className="w-full border border-primary/20 bg-black/40 px-3 py-2 font-mono text-sm text-zinc-100 outline-none focus:border-primary/50"
          />
        </label>
        <label className="space-y-1">
          <span className="text-xs tracking-[0.14em] text-primary/70 uppercase">Commitment Salt</span>
          <input
            type="text"
            defaultValue="0x93f1..."
            className="w-full border border-primary/20 bg-black/40 px-3 py-2 font-mono text-sm text-zinc-100 outline-none focus:border-primary/50"
          />
        </label>
      </div>

      <Button className="h-9 border border-primary/60 bg-primary/12 text-[0.64rem] tracking-[0.18em] text-primary uppercase hover:bg-primary/20">
        Submit Private Vote
      </Button>
    </div>
  )
}

function CloakSwapUi() {
  const [tokenIn, setTokenIn] = useState("ETH")
  const [tokenOut, setTokenOut] = useState("USDC")

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="space-y-1">
          <span className="text-xs tracking-[0.14em] text-primary/70 uppercase">From</span>
          <div className="flex border border-primary/20 bg-black/40">
            <input
              type="text"
              defaultValue="1.20"
              className="w-full bg-transparent px-3 py-2 font-mono text-sm text-zinc-100 outline-none"
            />
            <select
              value={tokenIn}
              onChange={(e) => setTokenIn(e.target.value)}
              className="border-l border-primary/20 bg-black/30 px-2 py-2 text-xs text-zinc-200 outline-none"
            >
              <option>ETH</option>
              <option>DAI</option>
              <option>USDC</option>
            </select>
          </div>
        </label>

        <label className="space-y-1">
          <span className="text-xs tracking-[0.14em] text-primary/70 uppercase">To</span>
          <div className="flex border border-primary/20 bg-black/40">
            <input
              type="text"
              defaultValue="2391.42"
              className="w-full bg-transparent px-3 py-2 font-mono text-sm text-zinc-100 outline-none"
            />
            <select
              value={tokenOut}
              onChange={(e) => setTokenOut(e.target.value)}
              className="border-l border-primary/20 bg-black/30 px-2 py-2 text-xs text-zinc-200 outline-none"
            >
              <option>USDC</option>
              <option>DAI</option>
              <option>ETH</option>
            </select>
          </div>
        </label>
      </div>

      <div className="border border-primary/20 bg-black/40 p-4 text-sm text-zinc-300">
        <div className="flex items-center justify-between">
          <span>Execution Path</span>
          <span className="font-mono text-xs text-primary">Shadow Account</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span>Estimated Slippage</span>
          <span className="font-mono text-xs">0.37%</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span>Gas Source</span>
          <span className="font-mono text-xs">Paymaster</span>
        </div>
      </div>

      <Button className="h-9 border border-primary/60 bg-primary/12 text-[0.64rem] tracking-[0.18em] text-primary uppercase hover:bg-primary/20">
        Execute Private Swap
      </Button>
    </div>
  )
}

function TransactionLogs({ mode }: { mode: DemoMode }) {
  const logs = useMemo(() => (mode === "cipher" ? cipherLogs : cloakLogs), [mode])

  return (
    <div className="border border-cyan-500/25 bg-black/45 p-4">
      <div className="mb-3 flex items-center justify-between border-b border-cyan-500/20 pb-2">
        <p className="text-xs tracking-[0.2em] text-cyan-300 uppercase">Transaction Logs</p>
      </div>

      <div className="space-y-2">
        {logs.map((log, index) => (
          <motion.div
            key={`${log.method}-${index}`}
            initial={{ opacity: 0, x: 8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="border border-cyan-500/20 bg-black/40 p-3"
          >
            <div className="mb-2 flex items-center justify-between">
              <span
                className={cn(
                  "border px-2 py-0.5 text-[10px] font-bold tracking-[0.14em] uppercase",
                  log.tone === "emerald"
                    ? "border-emerald-400/35 bg-emerald-400/10 text-emerald-300"
                    : "border-cyan-400/35 bg-cyan-400/10 text-cyan-300"
                )}
              >
                {log.status}
              </span>
              <span className="font-mono text-[11px] text-cyan-200/70">{log.hash}</span>
            </div>
            <p className="text-[11px] tracking-[0.14em] text-cyan-200/60 uppercase">{log.method}</p>
            <p className="mt-1 font-mono text-xs text-zinc-300">{log.params}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export function ProductDemoPanel({ mode }: ProductDemoPanelProps) {
  return (
    <section className="mt-8 border border-primary/20 bg-card/70 p-5 sm:p-6">
      <DemoPanelHeader mode={mode} />
      <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="border border-primary/20 bg-card/60 p-4">
          {mode === "cipher" ? <CipherVotingUi /> : <CloakSwapUi />}
        </div>
        <TransactionLogs mode={mode} />
      </div>
    </section>
  )
}
