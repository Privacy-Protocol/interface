"use client"

import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import {
  DiscordLogoIcon,
  GithubLogoIcon,
  List,
  TelegramLogoIcon,
  X,
  XLogoIcon,
} from "@phosphor-icons/react"
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
import { cn } from "@/lib/utils"
import Image from "next/image"

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
        title: "Relayer",
        description: "Privacy Protocol Relayer",
        href: PAGE_LINKS.RELAYER,
      },
      {
        title: "GitHub",
        description: "Source code, examples and contribute",
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

const socials = [
  {
    href: PAGE_LINKS.TWITTER,
    icon: <XLogoIcon className="size-5 text-primary group-hover:text-accent" />,
    label: "X",
  },
  {
    href: PAGE_LINKS.TELEGRAM,
    icon: (
      <TelegramLogoIcon className="size-5 text-primary group-hover:text-accent" />
    ),
    label: "Telegram",
  },
  {
    href: PAGE_LINKS.DISCORD,
    icon: (
      <DiscordLogoIcon className="size-5 text-primary group-hover:text-accent" />
    ),
    label: "Discord",
  },
  {
    href: PAGE_LINKS.GITHUB,
    icon: (
      <GithubLogoIcon className="size-5 text-primary group-hover:text-accent" />
    ),
    label: "GitHub",
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
    <header className="fixed inset-x-0 top-0 z-50 w-full border-b border-foreground/10 bg-transparent">
      <motion.div
        animate={{
          borderColor: scrolled
            ? "oklch(0.82 0.28 142 / 0.15)"
            : "oklch(0.2 0.018 145 / 0.35)",
        }}
        transition={{ duration: 0.3 }}
        className="w-full border-b border-border/40 backdrop-blur-xl"
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-5">
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

          <NavigationMenu viewport={false} className="hidden md:flex">
            <NavigationMenuList>
              {groups.map((group) => (
                <NavigationMenuItem key={group.label}>
                  <NavigationMenuTrigger>{group.label}</NavigationMenuTrigger>
                  <NavigationMenuContent
                    className={cn(
                      group.label === "Developer" &&
                        "md:right-auto md:left-1/2 md:-translate-x-1/2",
                      group.label === "Resources" &&
                        "md:right-0 md:left-auto md:translate-x-0"
                    )}
                  >
                    <ul className="grid gap-0.5">
                      {group.items.map((item) => (
                        <li key={item.title}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={item.href}
                              target={item.external ? "_blank" : undefined}
                              rel={item.external ? "noreferrer" : undefined}
                            >
                              <span className="text-sm font-medium text-foreground">
                                {item.title}
                              </span>
                              <span className="font-code text-xs text-muted-foreground">
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

          <div className="hidden items-center gap-1 md:flex">
            {socials.map((social) => (
              <Button
                key={social.label}
                size="icon-lg"
                variant={"ghost"}
                className="group hover:bg-muted-secondary"
                asChild
              >
                <Link
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                >
                  {social.icon}
                </Link>
              </Button>
            ))}
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
                    <p className="font-code text-xs tracking-[0.2em] text-muted-primary uppercase">
                      {group.label}
                    </p>
                    <div className="mt-2 space-y-2">
                      {group.items.map((item) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          target={item.external ? "_blank" : undefined}
                          rel={item.external ? "noreferrer" : undefined}
                          className="block rounded-md rounded-b-none px-2.5 py-2 transition-colors first:border-b first:border-muted-secondary hover:bg-card/60"
                          onClick={() => setMobileOpen(false)}
                        >
                          <p className="text-sm font-medium text-foreground">
                            {item.title}
                          </p>
                          <p className="font-code text-xs text-muted-foreground">
                            {item.description}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="mt-6 mb-4 flex items-center justify-center gap-4">
                  {socials.map((social) => (
                    <Button
                      key={social.label}
                      size="icon-lg"
                      variant={"ghost"}
                      className="group hover:bg-muted-secondary"
                      asChild
                    >
                      <Link
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={social.label}
                      >
                        {social.icon}
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  )
}
