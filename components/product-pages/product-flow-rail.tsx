import { CaretRightIcon } from "@phosphor-icons/react"
import { TerminalFrame } from "../ui/terminal-frame"

type ProductFlowRailProps = {
  steps: { title: string; detail: string }[]
}

export function ProductFlowRail({ steps }: ProductFlowRailProps) {
  return (
    <>
      <div
        className="product-flow-rail-scrollbar mt-10 overflow-x-auto pb-2"
        style={
          {
            "--rail-scrollbar-thumb": "var(--color-accent)",
          } as React.CSSProperties
        }
      >
        <div className="flex min-w-max items-stretch gap-3">
          {steps.map((step, index) => (
            <div key={step.title} className="flex items-center gap-3">
              <TerminalFrame
                key={step.title}
                variant={"primary"}
                className={
                  "group h-full w-56 rounded-lg bg-card/30 p-4 transition-all duration-300 hover:bg-card/45"
                }
              >
                <p className="font-code text-xs tracking-[0.22em] text-primary uppercase">
                  {step.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground">
                  {step.detail}
                </p>
              </TerminalFrame>
              {index < steps.length - 1 ? (
                <span className="font-code text-xs text-primary/70">
                  <CaretRightIcon />
                </span>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .product-flow-rail-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: var(--rail-scrollbar-thumb) transparent;
        }

        .product-flow-rail-scrollbar::-webkit-scrollbar {
          height: 6px;
        }

        .product-flow-rail-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .product-flow-rail-scrollbar::-webkit-scrollbar-thumb {
          background: var(--rail-scrollbar-thumb);
          border-radius: 9999px;
        }

        .product-flow-rail-scrollbar::-webkit-scrollbar-corner {
          background: transparent;
        }
      `}</style>
    </>
  )
}
