"use client"

import { ConnectButton } from "@rainbow-me/rainbowkit"
import { motion } from "framer-motion"
import { useMemo, useState } from "react"
import { cn } from "@/lib/utils"
import { CipherDemo } from "./cipher/cipher-demo"
import { CloakDemo } from "./cloak/cloak-demo"
import { WalletProvider } from "../providers/WalletProvider"

function DemoPanelHeader({ mode }: { mode: DemoMode }) {
  return (
    <div className="mb-4 flex items-center justify-between border-b border-primary/20 pb-3">
      <div>
        <p className="text-xs tracking-[0.2em] text-primary uppercase">
          Interactive Demo
        </p>
        <h3 className="mt-2 text-lg font-semibold text-zinc-50">
          {mode === "cipher" ? "Cipher Voting Demo" : "Cloak Swap Demo"}
        </h3>
      </div>

      <ConnectButton accountStatus="address" showBalance={false} />
    </div>
  )
}

function TransactionLogs({ logs }: { logs: TTransactionLog[] }) {
  return (
    <div className="border border-cyan-500/25 bg-black/45 p-4">
      <div className="mb-3 flex items-center justify-between border-b border-cyan-500/20 pb-2">
        <div>
          <p className="text-xs tracking-[0.2em] text-cyan-300 uppercase">
            Transaction Logs
          </p>
          <p className="mt-1 font-mono text-[11px] text-cyan-200/60">
            Router and adapter events reveal only hidden bindings and aggregate tallies.
          </p>
        </div>
      </div>

      {logs.length === 0 ? (
        <div className="flex min-h-56 items-center justify-center border border-cyan-500/20 bg-black/40 p-6 text-center">
          <p className="max-w-xs font-mono text-sm text-cyan-200/70">
            Submit a Cipher vote to inspect the real receipt logs here.
          </p>
        </div>
      ) : (
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
              <div className="mb-2 flex items-center justify-between gap-3">
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
                <span className="font-mono text-[11px] text-cyan-200/70">
                  {log.hash}
                </span>
              </div>
              <p className="text-[11px] tracking-[0.14em] text-cyan-200/60 uppercase">
                {log.method}
              </p>
              <p className="mt-2 whitespace-pre-wrap font-mono text-xs leading-relaxed text-zinc-300">
                {log.params}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export function ProductDemoPanel({ mode }: ProductDemoPanelProps) {
  const [cipherLogs, setCipherLogs] = useState<TTransactionLog[]>([])
  const cloakLogs: TTransactionLog[] = []
  const logs = useMemo(
    () => (mode === "cipher" ? cipherLogs : cloakLogs),
    [cipherLogs, mode]
  )

  return (
    <WalletProvider>
      <section className="mt-8 border border-primary/20 bg-card/70 p-5 sm:p-6">
        <DemoPanelHeader mode={mode} />
        <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="border border-primary/20 bg-card/60 p-4">
            {mode === "cipher" ? (
              <CipherDemo onLogsChange={setCipherLogs} />
            ) : (
              <CloakDemo />
            )}
          </div>
          <TransactionLogs logs={logs} />
        </div>
      </section>
    </WalletProvider>
  )
}
