"use client"

import {
  useRef,
  useEffect,
  useCallback,
  useState,
  type RefObject,
  type CSSProperties,
} from "react"

export type InteractionMode = "repel" | "scramble" | "rearrange"

export interface MatrixHeroBackgroundProps {
  mode?: InteractionMode
  charColor?: string
  fontSize?: number
  interactionRadius?: number
  interactionScopeRef?: RefObject<HTMLElement | null>
  className?: string
  style?: CSSProperties
}

const GRID: string[] = [
  "                                                                LLLLLLCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCTT",
  "                                                                LLLLLLCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCTT",
  "                                                  LLCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC",
  "                                                  LLCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC",
  "                                        LLCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCLL",
  "                                        LLCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCLL",
  "                      CCCCCCCCLLLLCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC",
  "                      CCCCCCCCLLLLCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC",
  "                  TTTTCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC",
  "                  TTTTCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC",
  "                      CCCCCCCCCCCCCCPPPPPP                                                    PPPPCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCPP",
  "                      CCCCCCCCCCCCCCPPPPPP                                                    PPPPCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCPP",
  "                  TT",
  "                  TT",
  "                  LLCCPPCCCCCCCCPP",
  "                  LLCCPPCCCCCCCCPP",
  "              LLCCOO    CCCC",
  "              LLCCOO    CCCC",
  "CCCCCCCCCCCCCCPP      CCCCPP",
  "CCCCCCCCCCCCCCPP      CCCCPP",
  "  CCCCCCPPPP        CCCCCC",
  "  CCCCCCPPPP        CCCCCC",
  "                TT",
  "                TT",
  "                  CCCCCCPP",
  "                  CCCCCCPP",
  "                  CCCCCCPP",
  "                  CCCCCCPP",
  "                CCCCCCCCPP",
  "                CCCCCCCCPP",
  "                CCCCCCCCPP",
  "                CCCCCCCCPP",
  "              CCCCCCCCCCLL",
  "              CCCCCCCCCCLL",
  "                      PPCC",
  "                      PPCC",
]
const SCRAMBLE_CHARS = "CLPTO01"
const REARRANGE_WORDS = [
  "PRIVACY",
  "ZERO-KNOWLEDGE",
  "HOMOMORPHISM",
  "FHE",
  "MPC",
  "ENCRYPTION",
  "PROOFS",
  "SHIELDED ASSETS",
  "ETHEREUM",
] as const

interface GridChar {
  char: string
  col: number
  row: number
}

const PARSED_CHARS: GridChar[] = []
const GRID_ROWS = GRID.length

let maxCol = 0
let minCol = Infinity

for (let r = 0; r < GRID_ROWS; r++) {
  const row = GRID[r]
  for (let c = 0; c < row.length; c++) {
    const ch = row[c]
    if (ch !== " ") {
      PARSED_CHARS.push({ char: ch, col: c, row: r })
      if (c > maxCol) maxCol = c
      if (c < minCol) minCol = c
    }
  }
}

const CONTENT_COLS = maxCol - minCol + 1

function getContiguousSpans(cols: number[]) {
  if (cols.length === 0) return [] as Array<{ start: number; end: number }>

  const spans: Array<{ start: number; end: number }> = []
  let start = cols[0]
  let previous = cols[0]

  for (let i = 1; i < cols.length; i++) {
    const col = cols[i]
    if (col === previous + 1) {
      previous = col
      continue
    }

    spans.push({ start, end: previous })
    start = col
    previous = col
  }

  spans.push({ start, end: previous })
  return spans
}

function buildRepeatedPhrase(word: string, maxLength: number) {
  let phrase = word
  while (`${phrase}   ${word}`.length <= maxLength) {
    phrase = `${phrase}   ${word}`
  }
  return phrase
}

function pickWordForSpan(preferredWord: string, spanLength: number) {
  const preferredCandidates = [
    preferredWord,
    ...REARRANGE_WORDS.filter((word) => word !== preferredWord),
  ]
  return preferredCandidates.find((word) => word.length <= spanLength) ?? "FHE"
}

const REARRANGE_TARGETS: Array<string | null> = []
for (let row = 0; row < GRID_ROWS; row++) {
  const rowChars = PARSED_CHARS.filter((char) => char.row === row)
  const occupiedCols = rowChars.map((char) => char.col)
  const spans = getContiguousSpans(occupiedCols)
  const rowTemplate = Array.from({ length: GRID[row]?.length ?? 0 }, () => " ")
  const preferredWord =
    REARRANGE_WORDS[Math.floor(row / 2) % REARRANGE_WORDS.length]

  for (const span of spans) {
    const spanLength = span.end - span.start + 1
    const word = pickWordForSpan(preferredWord, spanLength)
    const phrase = buildRepeatedPhrase(word, spanLength)
    const offset = Math.floor((spanLength - phrase.length) / 2)

    for (let i = 0; i < phrase.length; i++) {
      rowTemplate[span.start + offset + i] = phrase[i]
    }
  }

  for (const char of rowChars) {
    REARRANGE_TARGETS.push(
      rowTemplate[char.col] === " " ? null : rowTemplate[char.col]
    )
  }
}

function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  )

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const handler = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches)
    }
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  return reducedMotion
}

function scrambleChar(index: number, tick: number): string {
  const i = ((index * 7 + tick * 13) >>> 0) % SCRAMBLE_CHARS.length
  return SCRAMBLE_CHARS[i]
}

function getGridLayout(width: number, height: number, baseFontSize: number) {
  const maxGridH = height * 0.65
  const idealCellH = baseFontSize * 1.55
  const idealGridH = GRID_ROWS * idealCellH
  const scale = idealGridH > maxGridH ? maxGridH / idealGridH : 1
  const fontSize = baseFontSize * scale
  const cellW = fontSize * 0.85
  const cellH = fontSize * 1.55
  const gridWidth = CONTENT_COLS * cellW
  const gridHeight = GRID_ROWS * cellH
  const originX = (width - gridWidth) / 2 - minCol * cellW
  const originY = (height - gridHeight) / 2

  return {
    fontSize,
    cellW,
    cellH,
    gridWidth,
    gridHeight,
    originX,
    originY,
  }
}

function useMatrixCanvas(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  opts: Required<
    Pick<
      MatrixHeroBackgroundProps,
      "mode" | "charColor" | "fontSize" | "interactionRadius"
    >
  >,
  reducedMotion: boolean,
  interactionScopeRef?: RefObject<HTMLElement | null>
) {
  const mouse = useRef({ x: -9999, y: -9999 })
  const lastMouse = useRef({ x: -9999, y: -9999 })
  const raf = useRef(0)
  const tick = useRef(0)
  const isHovering = useRef(false)
  const hoverMix = useRef(0)
  const drawRef = useRef<() => void>(() => {})

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const w = canvas.clientWidth
    const h = canvas.clientHeight

    const bw = Math.round(w * dpr)
    const bh = Math.round(h * dpr)
    if (canvas.width !== bw || canvas.height !== bh) {
      canvas.width = bw
      canvas.height = bh
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, w, h)

    const { fontSize: baseFontSize, charColor, interactionRadius, mode } = opts

    const { fontSize, cellW, cellH, originX, originY } = getGridLayout(
      w,
      h,
      baseFontSize
    )

    ctx.font = `500 ${fontSize}px "IBM Plex Mono", "Geist Mono", monospace`
    ctx.textBaseline = "top"

    const r2 = interactionRadius * interactionRadius

    tick.current += 1
    hoverMix.current += ((isHovering.current ? 1 : 0) - hoverMix.current) * 0.12

    const focalMouse =
      isHovering.current || hoverMix.current > 0.01
        ? lastMouse.current
        : mouse.current

    for (let i = 0; i < PARSED_CHARS.length; i++) {
      const gc = PARSED_CHARS[i]
      const baseX = originX + gc.col * cellW
      const baseY = originY + gc.row * cellH

      let drawX = baseX
      let drawY = baseY
      let drawChar = gc.char
      let alpha = 1

      if (!reducedMotion) {
        const dx = baseX - focalMouse.x
        const dy = baseY - focalMouse.y
        const dist2 = dx * dx + dy * dy
        const dist = Math.sqrt(dist2)
        const proximity = dist2 < r2 ? 1 - dist / interactionRadius : 0

        if (mode === "rearrange") {
          const targetChar = REARRANGE_TARGETS[i]
          const localMix = Math.min(
            1,
            hoverMix.current * (0.3 + proximity * 0.7)
          )
          const revealThreshold = ((i * 37) % 100) / 100

          if (isHovering.current) {
            if (targetChar) {
              drawChar =
                localMix > revealThreshold
                  ? targetChar
                  : scrambleChar(i, tick.current)
              alpha = 0.35 + localMix * 0.65
            } else {
              drawChar = scrambleChar(i, tick.current)
              alpha = 0.08 + (1 - localMix) * 0.28
            }
          } else if (localMix > 0.01) {
            if (targetChar) {
              drawChar =
                localMix > revealThreshold
                  ? scrambleChar(i, tick.current)
                  : gc.char
              alpha = 0.45 + (1 - localMix) * 0.55
            } else {
              drawChar = scrambleChar(i, tick.current)
              alpha = 0.08 + (1 - localMix) * 0.4
            }
          }
        } else if (dist2 < r2) {
          const t = proximity

          if (mode === "repel") {
            const strength = t * t * 28
            if (dist > 0.1) {
              drawX += (dx / dist) * strength
              drawY += (dy / dist) * strength
            }
            alpha = 0.35 + 0.65 * (1 - t)
          } else {
            drawChar = scrambleChar(i, tick.current)
            drawX += (Math.random() - 0.5) * t * 3
            drawY += (Math.random() - 0.5) * t * 3
            alpha = 0.5 + 0.5 * (1 - t)
          }
        }
      }

      ctx.globalAlpha = alpha
      ctx.fillStyle = charColor
      ctx.fillText(drawChar, drawX, drawY)
    }

    ctx.globalAlpha = 1
    raf.current = requestAnimationFrame(() => drawRef.current())
  }, [canvasRef, opts, reducedMotion])

  useEffect(() => {
    drawRef.current = draw
  }, [draw])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Mouse tracking
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const nextX = e.clientX - rect.left
      const nextY = e.clientY - rect.top
      const layout = getGridLayout(
        canvas.clientWidth,
        canvas.clientHeight,
        opts.fontSize
      )
      const isInsideGrid =
        nextX >= layout.originX &&
        nextX <= layout.originX + layout.gridWidth &&
        nextY >= layout.originY &&
        nextY <= layout.originY + layout.gridHeight
      const scopeRect = interactionScopeRef?.current?.getBoundingClientRect()
      const isInsideScope = scopeRect
        ? e.clientX >= scopeRect.left &&
          e.clientX <= scopeRect.right &&
          e.clientY >= scopeRect.top &&
          e.clientY <= scopeRect.bottom
        : false

      if (!isInsideGrid && !isInsideScope) {
        isHovering.current = false
        mouse.current.x = -9999
        mouse.current.y = -9999
        return
      }

      mouse.current.x = nextX
      mouse.current.y = nextY
      lastMouse.current = { ...mouse.current }
      isHovering.current = true
    }
    const onLeave = () => {
      isHovering.current = false
      mouse.current.x = -9999
      mouse.current.y = -9999
    }

    canvas.addEventListener("mousemove", onMove)
    canvas.addEventListener("mouseleave", onLeave)

    drawRef.current = draw
    raf.current = requestAnimationFrame(() => drawRef.current())

    return () => {
      canvas.removeEventListener("mousemove", onMove)
      canvas.removeEventListener("mouseleave", onLeave)
      cancelAnimationFrame(raf.current)
    }
  }, [canvasRef, draw, interactionScopeRef, opts.fontSize])
}

export function MatrixHeroBackground({
  mode = "rearrange",
  charColor = "rgba(111, 255, 89, 0.22)",
  fontSize = 28,
  interactionRadius = 120,
  interactionScopeRef,
  className = "",
  style,
}: MatrixHeroBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reducedMotion = useReducedMotion()

  useMatrixCanvas(
    canvasRef,
    { mode, charColor, fontSize, interactionRadius },
    reducedMotion,
    interactionScopeRef
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ro = new ResizeObserver(() => {})
    ro.observe(canvas)
    return () => ro.disconnect()
  }, [])

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={style}
      aria-hidden
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-auto size-full"
        style={{ display: "block" }}
      />
    </div>
  )
}
