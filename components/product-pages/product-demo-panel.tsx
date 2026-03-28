"use client"

import { ConnectButton } from "@rainbow-me/rainbowkit"
import { motion } from "framer-motion"
import { useMemo, useState } from "react"
import { cn } from "@/lib/utils"
import { CipherDemo } from "./cipher/cipher-demo"
import { CloakDemo } from "./cloak/cloak-demo"
import { WalletProvider } from "../providers/WalletProvider"
import { TerminalFrame } from "@/components/landing/terminal-frame"

function DemoPanelHeader({ mode }: { mode: DemoMode }) {
  return (
    <div className="mb-4 flex flex-col gap-3 border-b border-border/30 pb-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-code text-[0.6rem] tracking-[0.24em] text-primary uppercase">
          Interactive Demo
        </p>
        <h3 className="mt-2 font-heading text-xl font-semibold text-foreground">
          {mode === "cipher" ? "Cipher Voting Demo" : "Cloak Swap Demo"}
        </h3>
      </div>

      <div className="rounded-md border border-border/30 bg-card/35 px-2 py-1.5">
        <ConnectButton accountStatus="address" showBalance={false} />
      </div>
    </div>
  )
}

function TransactionLogs({ logs }: { logs: TTransactionLog[] }) {
  return (
    <TerminalFrame
      variant="accent"
      className="h-full rounded-lg bg-card/30 p-4 sm:p-5"
    >
      <div className="mb-3 flex items-center justify-between border-b border-border/30 pb-3">
        <div>
          <p className="font-code text-[0.6rem] tracking-[0.24em] text-accent uppercase">
            Transaction Logs
          </p>
          <p className="mt-1 font-code text-[0.7rem] leading-relaxed text-muted-foreground">
            Router and adapter events reveal only hidden bindings and aggregate
            tallies.
          </p>
        </div>
      </div>

      {logs.length === 0 ? (
        <div className="flex min-h-56 items-center justify-center rounded-lg border border-border/30 bg-card/25 p-6 text-center">
          <p className="max-w-xs text-sm text-muted-foreground">
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
              className="rounded-lg border border-border/30 bg-card/25 p-3"
            >
              <div className="mb-2 flex items-center justify-between gap-3">
                <span
                  className={cn(
                    "border px-2 py-0.5 font-code text-[0.6rem] tracking-[0.14em] uppercase",
                    log.tone === "emerald"
                      ? "border-primary/35 bg-primary/10 text-primary"
                      : "border-accent/35 bg-accent/10 text-accent"
                  )}
                >
                  {log.status}
                </span>
                <span className="font-code text-[0.68rem] text-muted-foreground">
                  {log.hash}
                </span>
              </div>
              <p className="font-code text-[0.6rem] tracking-[0.14em] text-muted-foreground uppercase">
                {log.method}
              </p>
              <p className="mt-2 font-code text-xs leading-relaxed whitespace-pre-wrap text-foreground/80">
                {log.params}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </TerminalFrame>
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
      <TerminalFrame
        variant={mode === "cipher" ? "muted-primary" : "accent"}
        className="mt-8 rounded-lg bg-card/30 p-5 sm:p-6"
      >
        <DemoPanelHeader mode={mode} />
        <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <TerminalFrame
            variant={mode === "cipher" ? "primary" : "accent"}
            className="rounded-lg bg-card/25 p-4"
          >
            {mode === "cipher" ? (
              <CipherDemo onLogsChange={setCipherLogs} />
            ) : (
              <CloakDemo />
            )}
          </TerminalFrame>
          <TransactionLogs logs={logs} />
        </div>
      </TerminalFrame>
    </WalletProvider>
  )
}
