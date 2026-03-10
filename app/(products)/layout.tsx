import { Footer } from "@/components/navigation/footer"
import { Navbar } from "@/components/navigation/navbar"

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
