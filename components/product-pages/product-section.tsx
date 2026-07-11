"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { reveal } from "@/components/landing/landing-page"
import { cn } from "@/lib/utils"

export function ProductSection({
  children,
  className,
  ...props
}: {
  children: ReactNode
  className?: string
  id?: string
}) {
  return (
    <motion.section
      {...reveal}
      {...props}
      className={cn("relative px-4 py-20 sm:px-6 sm:py-28", className)}
    >
      {children}
    </motion.section>
  )
}
