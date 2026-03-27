import type { Metadata } from "next"
import { IBM_Plex_Mono } from "next/font/google"
import localFont from "next/font/local"

import "./globals.css"
import { cn } from "@/lib/utils"

const fontHeading = localFont({
  src: "../public/fonts/Tutankhamono-Bold.ttf",
  variable: "--font-heading",
})

const fontBody = localFont({
  src: [
    {
      path: "../public/fonts/OverusedGrotesk-Black.ttf",
      weight: "900",
      style: "black",
    },
    {
      path: "../public/fonts/OverusedGrotesk-ExtraBold.ttf",
      weight: "800",
      style: "extrabold",
    },
    {
      path: "../public/fonts/OverusedGrotesk-Bold.ttf",
      weight: "700",
      style: "bold",
    },
    {
      path: "../public/fonts/OverusedGrotesk-SemiBold.ttf",
      weight: "600",
      style: "semibold",
    },
    {
      path: "../public/fonts/OverusedGrotesk-Medium.ttf",
      weight: "500",
      style: "medium",
    },
    {
      path: "../public/fonts/OverusedGrotesk-Roman.ttf",
      weight: "400",
      style: "regular",
    },
    {
      path: "../public/fonts/OverusedGrotesk-Light.ttf",
      weight: "300",
      style: "light",
    },
  ],
  variable: "--font-body",
})

const fontCode = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-code",
})

export const metadata: Metadata = {
  title: "Privacy Protocol",
  description:
    "Developer tools for building confidential web3 applications. Zero-knowledge proofs and fully homomorphic encryption, abstracted.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontHeading.variable,
        fontCode.variable,
        fontBody.variable
      )}
    >
      <body className="bg-background">{children}</body>
    </html>
  )
}
