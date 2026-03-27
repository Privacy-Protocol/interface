"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { reveal } from "./landing-page"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { CIPHER_TOOLKITS } from "./products-section/data"
import { CipherTab } from "./products-section/cipher-tab"
import { CloakTab } from "./products-section/cloak-tab"

export function ProductsSection() {
  const [activeToolkit, setActiveToolkit] = useState<string>(
    CIPHER_TOOLKITS[0].id
  )

  return (
    <motion.section
      {...reveal}
      id="products"
      className="relative px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center gap-3">
          <span className="font-code text-[0.6rem] tracking-[0.25em] text-primary uppercase">
            {">_ Products"}
          </span>
          <span className="h-px flex-1 bg-border/60" />
        </div>

        <h2 className="mt-4 max-w-5xl font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Privacy for every app
          <br />
          <span className="text-accent">
            toolkits tailored for your specific app needs
          </span>
        </h2>

        <Tabs defaultValue="cipher" className="mt-10">
          <TabsList
            variant="line"
            className="mb-6 w-full justify-start gap-0 border-b border-border/20 p-0 sm:w-auto"
          >
            <TabsTrigger
              value="cipher"
              className="relative rounded-none border-none bg-transparent px-4 py-2.5 font-code text-[0.65rem] tracking-[0.15em] uppercase transition-colors data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:after:bg-primary"
            >
              <span className="mr-1.5 inline-flex size-1.5 rounded-full bg-primary/60" />
              Cipher
            </TabsTrigger>
            <TabsTrigger
              value="cloak"
              className="relative rounded-none border-none bg-transparent px-4 py-2.5 font-code text-[0.65rem] tracking-[0.15em] uppercase transition-colors data-[state=active]:bg-transparent data-[state=active]:text-accent data-[state=active]:after:bg-accent"
            >
              <span className="mr-1.5 inline-flex size-1.5 rounded-full bg-accent/40" />
              Cloak
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cipher" className="mt-0 outline-none">
            <CipherTab
              activeToolkit={activeToolkit}
              onSelectToolkit={setActiveToolkit}
            />
          </TabsContent>

          <TabsContent value="cloak" className="mt-0 outline-none">
            <AnimatePresence mode="wait">
              <CloakTab />
            </AnimatePresence>
          </TabsContent>
        </Tabs>
      </div>
    </motion.section>
  )
}
