import { Layout } from "nextra-theme-docs"
import { getPageMap } from "nextra/page-map"
import type { ReactNode } from "react"

import "nextra-theme-docs/style.css"

export default async function DocsLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <Layout
      pageMap={await getPageMap("/docs")}
      docsRepositoryBase="https://github.com/privacy-protocol/cipher"
      sidebar={{ defaultOpen: true }}
    >
      {children}
    </Layout>
  )
}
