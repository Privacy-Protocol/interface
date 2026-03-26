import { execFile } from "node:child_process"
import path from "node:path"
import { promisify } from "node:util"
import { NextResponse } from "next/server"
import { decodeAbiParameters } from "viem"

const execFileAsync = promisify(execFile)
const CIPHER_ROOT = path.resolve(process.cwd(), "../cipher-sdk")

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    if (body?.workflow !== "voting") {
      return NextResponse.json(
        { error: "Only voting proofs are enabled for this local demo route" },
        { status: 400 }
      )
    }

    const encoded = Buffer.from(
      JSON.stringify({
        appId: body.input.appId,
        actionType: body.input.actionType,
        contextId: body.input.contextId,
        optionCount: body.input.optionCount,
        voteOption: body.input.voteOption,
        payload: body.input.payload,
        witness: body.input.witness,
      })
    ).toString("base64")

    const { stdout, stderr } = await execFileAsync(
      "npx",
      ["tsx", "contracts/js-scripts/generateVotingProofJson.ts", encoded],
      {
        cwd: CIPHER_ROOT,
        maxBuffer: 10 * 1024 * 1024,
      }
    )

    if (stderr?.trim()) {
      console.warn("cipher proof stderr", stderr)
    }

    const [proof, publicInputs] = decodeAbiParameters(
      [{ type: "bytes" }, { type: "bytes32[]" }],
      stdout.trim() as `0x${string}`
    )

    return NextResponse.json({ proof, publicInputs })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to generate voting proof"
    const details =
      error && typeof error === "object" && "stderr" in error
        ? String((error as { stderr?: string }).stderr ?? "").trim()
        : ""
    return NextResponse.json(
      { error: details ? `${message}
${details}` : message },
      { status: 500 }
    )
  }
}
