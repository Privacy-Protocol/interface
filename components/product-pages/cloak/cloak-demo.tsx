import { Button } from "@/components/ui/button"
import { useState } from "react"

export function CloakDemo() {
  const [tokenIn, setTokenIn] = useState("ETH")
  const [tokenOut, setTokenOut] = useState("USDC")

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="space-y-1">
          <span className="font-code text-[0.6rem] tracking-[0.18em] text-primary/75 uppercase">
            From
          </span>
          <div className="flex rounded-md border border-border/30 bg-card/30">
            <input
              type="text"
              defaultValue="1.20"
              className="w-full bg-transparent px-3 py-2 font-code text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
            <select
              value={tokenIn}
              onChange={(e) => setTokenIn(e.target.value)}
              className="border-l border-border/30 bg-card/40 px-2 py-2 font-code text-xs text-foreground outline-none"
            >
              <option>ETH</option>
              <option>DAI</option>
              <option>USDC</option>
            </select>
          </div>
        </label>

        <label className="space-y-1">
          <span className="font-code text-[0.6rem] tracking-[0.18em] text-primary/75 uppercase">
            To
          </span>
          <div className="flex rounded-md border border-border/30 bg-card/30">
            <input
              type="text"
              defaultValue="2391.42"
              className="w-full bg-transparent px-3 py-2 font-code text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
            <select
              value={tokenOut}
              onChange={(e) => setTokenOut(e.target.value)}
              className="border-l border-border/30 bg-card/40 px-2 py-2 font-code text-xs text-foreground outline-none"
            >
              <option>USDC</option>
              <option>DAI</option>
              <option>ETH</option>
            </select>
          </div>
        </label>
      </div>

      <div className="rounded-lg border border-border/30 bg-card/25 p-4 text-sm text-muted-foreground">
        <div className="flex items-center justify-between">
          <span>Execution Path</span>
          <span className="font-code text-xs text-primary">Shadow Account</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span>Estimated Slippage</span>
          <span className="font-code text-xs text-foreground">0.37%</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span>Gas Source</span>
          <span className="font-code text-xs text-foreground">Paymaster</span>
        </div>
      </div>

      <Button>
        Execute Private Swap
      </Button>
    </div>
  )
}
