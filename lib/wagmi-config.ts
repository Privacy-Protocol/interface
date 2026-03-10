import "@rainbow-me/rainbowkit/styles.css"
import { getDefaultConfig } from "@rainbow-me/rainbowkit"
import { sepolia } from "wagmi/chains"

const WALLET_ID = process.env.NEXT_PUBLIC_WALLET_ID
const ALCHEMY_ID = process.env.NEXT_PUBLIC_ALCHEMY_ID

export const wagmi_config = getDefaultConfig({
  appName: "Privacy Protocol",
  projectId: WALLET_ID ?? "",
  chains: [sepolia],
  ssr: true,
})
