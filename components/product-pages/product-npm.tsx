"use client"

import { CheckIcon, CopyIcon } from "@phosphor-icons/react"
import { TerminalFrame } from "../ui/terminal-frame"
import { Button } from "../ui/button"
import { useState } from "react"
import { cn } from "@/lib/utils"

export function ProductNpm({
  npm,
  className,
}: {
  npm: string
  className?: string
}) {
  const [isCopied, setIsCopied] = useState<boolean>(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(npm)
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 2000)
  }
  return (
    <TerminalFrame
      variant="muted-secondary"
      className={cn(
        "bg-card/40 px-6 py-5 transition-colors hover:bg-card/20",
        className
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <p className="font-code">{npm}</p>
        <Button onClick={handleCopy} variant={"ghost"} size={"icon"}>
          {isCopied ? (
            <CheckIcon className="text-primary" />
          ) : (
            <CopyIcon className="" />
          )}
        </Button>
      </div>
    </TerminalFrame>
  )
}
