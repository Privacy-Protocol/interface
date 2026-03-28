import { Layout } from "nextra-theme-docs"
import { getPageMap } from "nextra/page-map"
import type { ReactNode } from "react"
import { Navbar } from "@/components/navigation/navbar"
import { Footer } from "@/components/navigation/footer"

import "nextra-theme-docs/style.css"

export default async function DocsLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <Navbar />

      <main className="relative z-10 pt-14 [--nextra-navbar-height:3.5rem] sm:pt-20 sm:[--nextra-navbar-height:5rem]">
        <Layout
          pageMap={await getPageMap("/docs")}
          docsRepositoryBase="https://github.com/privacy-protocol/cipher"
          sidebar={{ defaultOpen: true }}
          navbar={null}
          footer={null}
        >
          {children}
        </Layout>
      </main>

      <Footer />
    </div>
  )
}
