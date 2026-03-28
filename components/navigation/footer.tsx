"use client"

import { PAGE_LINKS } from "@/lib/constants"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import {
  DiscordLogoIcon,
  GithubLogoIcon,
  TelegramLogoIcon,
  XLogoIcon,
} from "@phosphor-icons/react"

const groups = [
  {
    heading: "Solutions",
    links: [
      {
        label: "Cipher",
        description: "Confidential data & actions",
        href: PAGE_LINKS.CIPHER,
      },
      {
        label: "Cloak",
        description: "Actor privacy & shielding",
        href: PAGE_LINKS.CLOAK,
      },
    ],
  },
  {
    heading: "Developer",
    links: [
      {
        label: "Docs",
        description: "Guides & API reference",
        href: PAGE_LINKS.DOCS,
      },
      {
        label: "Relayer",
        description: "Privacy Protocol Relayer",
        href: PAGE_LINKS.RELAYER,
      },
      {
        label: "GitHub",
        description: "Source code and contribute",
        href: PAGE_LINKS.GITHUB,
        external: true,
      },
    ],
  },
  {
    heading: "Resources",
    links: [
      {
        label: "Blog",
        description: "Updates & releases",
        href: PAGE_LINKS.BLOG,
      },
      {
        label: "Research",
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

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border/30 bg-card/20 px-4 py-12 backdrop-blur-sm sm:px-6 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="group inline-flex items-center">
              <Image
                src={"/PP-Logo-MG+WS.png"}
                alt="privacy protocol logo"
                width={124}
                height={62}
                className="block group-hover:hidden"
              />
              <Image
                src={"/PP-Logo-FL+WS.png"}
                alt="privacy protocol logo"
                width={124}
                height={62}
                className="hidden group-hover:block"
              />
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground/70">
              Secure, Simple, Seamless Privacy
            </p>

            <div className="mt-6 flex items-center gap-1">
              {socials.map((social) => (
                <Button
                  key={social.label}
                  size="icon-lg"
                  variant="ghost"
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

          {groups.map((group) => (
            <div
              key={group.heading}
              className="rounded-lg border border-border/30 bg-card/25 px-2 py-5"
            >
              <p className="font-code text-xs tracking-[0.2em] text-accent uppercase">
                {group.heading}
              </p>
              <div className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noreferrer" : undefined}
                    className="block rounded-md px-2 py-2 transition-colors hover:bg-card/50"
                  >
                    <p className="text-xs font-medium text-primary">
                      {link.label}
                    </p>
                    <p className="font-code text-xs text-foreground">
                      {link.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-border/20 pt-5 sm:flex-row">
          <p className="font-code text-[0.5rem] tracking-wider text-muted-foreground/30 uppercase">
            &copy; {new Date().getFullYear()} Privacy Protocol. All rights
            reserved.
          </p>
          <p className="font-code text-[0.5rem] tracking-wider text-muted-foreground/20 uppercase">
            Confidential infrastructure for modern apps
          </p>
        </div>
      </div>
    </footer>
  )
}
