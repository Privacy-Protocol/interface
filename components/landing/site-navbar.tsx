"use client"

import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { ListIcon, XIcon } from "@phosphor-icons/react"
import { useEffect, useState } from "react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"

const groups = [
  {
    label: "Solutions",
    items: [
      { title: "Cipher", description: "Private Data", href: "/cipher" },
      { title: "Cloak", description: "Hidden Actors", href: "/cloak" },
    ],
  },
  {
    label: "Developer",
    items: [
      { title: "Docs", description: "Guides and references", href: "/docs" },
      {
        title: "GitHub",
        description: "Code and examples",
        href: "https://github.com",
        external: true,
      },
    ],
  },
  {
    label: "Resources",
    items: [
      { title: "Blog", description: "Updates and releases", href: "/blog" },
      { title: "Research", description: "Protocol research", href: "/research" },
    ],
  },
]

export function SiteNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8)
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 border-b border-border/60 bg-background/86 backdrop-blur-md" />
      <motion.div
        animate={{
          backgroundColor: scrolled ? "rgba(8,11,18,0.9)" : "rgba(8,11,18,0.82)",
          borderColor: scrolled ? "rgba(34,197,94,0.35)" : "rgba(255,255,255,0.14)",
          boxShadow: scrolled
            ? "0 14px 34px -26px rgba(0,0,0,0.85)"
            : "0 10px 28px -24px rgba(0,0,0,0.8)",
        }}
        transition={{ duration: 0.25 }}
        className="relative mx-auto mt-3 max-w-7xl border backdrop-blur-md"
      >
        <div className="flex h-16 items-center justify-between px-4 sm:px-5">
          <Link
            href="/"
            className="group flex items-center gap-3 text-[0.66rem] uppercase tracking-[0.2em] text-zinc-100"
          >
            <span className="relative inline-flex size-6 items-center justify-center border border-primary/60 bg-primary/10">
              <span className="size-2.5 bg-primary shadow-[0_0_14px_0_rgba(34,197,94,0.85)]" />
            </span>
            <span className="font-semibold tracking-[0.16em]">Privacy Protocol</span>
          </Link>

          <NavigationMenu viewport={false} className="hidden md:flex">
            <NavigationMenuList className="gap-1">
              {groups.map((group) => (
                <NavigationMenuItem key={group.label}>
                  <NavigationMenuTrigger className="border border-transparent bg-transparent px-2.5 text-xs uppercase tracking-[0.15em] text-zinc-300 hover:border-primary/40 hover:bg-primary/10 hover:text-zinc-100">
                    {group.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="w-[320px] border border-primary/35 bg-card/95 p-1.5">
                    <ul className="grid gap-1">
                      {group.items.map((item) => (
                        <li key={item.title}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={item.href}
                              target={item.external ? "_blank" : undefined}
                              rel={item.external ? "noreferrer" : undefined}
                              className="flex flex-col items-start border border-transparent p-2.5 hover:border-primary/35 hover:bg-primary/10"
                            >
                              <span className="text-xs uppercase tracking-[0.14em] text-zinc-100">
                                {item.title}
                              </span>
                              <span className="text-[0.7rem] text-muted-foreground">
                                {item.description}
                              </span>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="hidden md:block">
            <Button
              asChild
              className="h-9 border border-primary/60 bg-primary/14 px-4 text-[0.65rem] uppercase tracking-[0.2em] text-primary hover:bg-primary/22"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((value) => !value)}
            className="h-9 w-9 border border-border/80 bg-card/70 text-zinc-100 hover:border-primary/60 hover:bg-primary/10 md:hidden"
          >
            {mobileOpen ? <XIcon className="size-4" /> : <ListIcon className="size-4" />}
          </Button>
        </div>

        <AnimatePresence>
          {mobileOpen ? (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22 }}
              className="overflow-hidden border-t border-border/80 md:hidden"
            >
              <div className="space-y-3 p-4">
                {groups.map((group) => (
                  <div key={group.label} className="border border-border/70 bg-card/60 p-3">
                    <p className="text-[0.62rem] uppercase tracking-[0.18em] text-primary">{group.label}</p>
                    <div className="mt-2 space-y-1.5">
                      {group.items.map((item) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          target={item.external ? "_blank" : undefined}
                          rel={item.external ? "noreferrer" : undefined}
                          className="block border border-transparent px-2 py-1.5 text-sm text-zinc-200 hover:border-primary/40 hover:bg-primary/10"
                          onClick={() => setMobileOpen(false)}
                        >
                          <p className="text-xs uppercase tracking-[0.14em]">{item.title}</p>
                          <p className="text-[0.7rem] text-muted-foreground">{item.description}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
                <Button
                  asChild
                  className="h-9 w-full border border-primary/60 bg-primary/14 text-[0.65rem] uppercase tracking-[0.2em] text-primary hover:bg-primary/22"
                >
                  <Link href="/contact" onClick={() => setMobileOpen(false)}>
                    Contact Us
                  </Link>
                </Button>
              </div>
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </header>
  )
}
