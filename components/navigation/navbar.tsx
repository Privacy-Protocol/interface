"use client"

import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { List, X } from "@phosphor-icons/react"
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
import { PAGE_LINKS } from "@/lib/constants"
import Image from "next/image"

type NavItem = {
  title: string
  description: string
  href: string
  external?: boolean
}

const groups: { label: string; items: NavItem[] }[] = [
  {
    label: "Solutions",
    items: [
      {
        title: "Cipher",
        description: "Confidential data & actions",
        href: PAGE_LINKS.CIPHER,
      },
      {
        title: "Cloak",
        description: "Actor privacy & shielding",
        href: PAGE_LINKS.CLOAK,
      },
    ],
  },
  {
    label: "Developer",
    items: [
      {
        title: "Docs",
        description: "Guides & API reference",
        href: PAGE_LINKS.DOCS,
      },
      {
        title: "GitHub",
        description: "Source code & examples",
        href: PAGE_LINKS.GITHUB,
        external: true,
      },
    ],
  },
  {
    label: "Resources",
    items: [
      {
        title: "Blog",
        description: "Updates & releases",
        href: PAGE_LINKS.BLOG,
      },
      {
        title: "Research",
        description: "Protocol research",
        href: PAGE_LINKS.RESEARCH,
      },
    ],
  },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        animate={{
          backgroundColor: scrolled
            ? "oklch(0.09 0.025 145 / 0.92)"
            : "oklch(0.09 0.025 145 / 0.6)",
          borderColor: scrolled
            ? "oklch(0.82 0.28 142 / 0.12)"
            : "oklch(0.2 0.018 145 / 0.4)",
        }}
        transition={{ duration: 0.3 }}
        className="mx-auto mt-3 max-w-5xl rounded-lg border backdrop-blur-xl sm:mt-4"
      >
        <div className="flex h-14 items-center justify-between px-4 sm:px-5">
          <Link href="/" className="group flex items-center gap-2.5">
            <Image
              src={"/PP-Logo-MG+WS.png"}
              alt="privacy protocol logo"
              width={100}
              height={50}
              className="block group-hover:hidden"
            />
            <Image
              src={"/PP-Logo-FL+WS.png"}
              alt="privacy protocol logo"
              width={100}
              height={50}
              className="hidden group-hover:block"
            />
          </Link>

          {/* Desktop navigation */}
          <NavigationMenu viewport={false} className="hidden md:flex">
            <NavigationMenuList className="gap-0.5">
              {groups.map((group) => (
                <NavigationMenuItem key={group.label}>
                  <NavigationMenuTrigger className="rounded-md border border-transparent bg-transparent px-2.5 py-1.5 font-code text-[0.6rem] tracking-[0.15em] text-muted-foreground uppercase transition-colors hover:border-border/40 hover:bg-card/40 hover:text-foreground/80 data-[state=open]:border-border/40 data-[state=open]:bg-card/40">
                    {group.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="w-[280px] rounded-lg border border-border/50 bg-card/95 p-1.5 shadow-xl backdrop-blur-xl">
                    <ul className="grid gap-0.5">
                      {group.items.map((item) => (
                        <li key={item.title}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={item.href}
                              target={item.external ? "_blank" : undefined}
                              rel={item.external ? "noreferrer" : undefined}
                              className="flex flex-col items-start rounded-md border border-transparent p-2.5 transition-colors hover:border-border/30 hover:bg-card/60"
                            >
                              <span className="text-xs font-medium text-foreground/85">
                                {item.title}
                              </span>
                              <span className="font-code text-[0.58rem] text-muted-foreground/60">
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

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button asChild>
              <Link href={PAGE_LINKS.DOCS}>Start Building</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="size-8 rounded-md border border-border/40 bg-card/40 text-foreground/70 hover:border-border/70 hover:text-foreground md:hidden"
          >
            {mobileOpen ? (
              <X className="size-4" weight="bold" />
            ) : (
              <List className="size-4" weight="bold" />
            )}
          </Button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-border/30 md:hidden"
            >
              <div className="space-y-2 p-4">
                {groups.map((group) => (
                  <div
                    key={group.label}
                    className="rounded-md border border-border/30 bg-card/30 p-3"
                  >
                    <p className="font-code text-[0.5rem] tracking-[0.2em] text-primary/60 uppercase">
                      {group.label}
                    </p>
                    <div className="mt-2 space-y-1">
                      {group.items.map((item) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          target={item.external ? "_blank" : undefined}
                          rel={item.external ? "noreferrer" : undefined}
                          className="block rounded-md px-2.5 py-2 transition-colors hover:bg-card/60"
                          onClick={() => setMobileOpen(false)}
                        >
                          <p className="text-xs font-medium text-foreground/85">
                            {item.title}
                          </p>
                          <p className="font-code text-[0.55rem] text-muted-foreground/50">
                            {item.description}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
                <Button
                  asChild
                  className="h-9 w-full rounded-md border border-primary/25 bg-primary/8 font-code text-[0.58rem] tracking-[0.18em] text-primary/80 uppercase hover:bg-primary/14"
                >
                  <Link
                    href={PAGE_LINKS.DOCS}
                    onClick={() => setMobileOpen(false)}
                  >
                    Start Building
                  </Link>
                </Button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  )
}
