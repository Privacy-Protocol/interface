import { Button } from "@/components/ui/button"
import { useState } from "react"

export function CloakDemo() {
  const [tokenIn, setTokenIn] = useState("ETH")
  const [tokenOut, setTokenOut] = useState("USDC")

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="space-y-1">
          <span className="text-xs tracking-[0.14em] text-primary/70 uppercase">
            From
          </span>
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
          <span className="text-xs tracking-[0.14em] text-primary/70 uppercase">
            To
          </span>
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
