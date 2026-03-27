"use client"

import { PAGE_LINKS } from "@/lib/constants"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const columns = [
  {
    heading: "Products",
    links: [
      { label: "Cipher", href: PAGE_LINKS.CIPHER },
      { label: "Cloak", href: PAGE_LINKS.CLOAK, badge: "Soon" },
    ],
  },
  {
    heading: "Developers",
    links: [
      { label: "Documentation", href: PAGE_LINKS.DOCS },
      { label: "GitHub", href: PAGE_LINKS.GITHUB, external: true },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Blog", href: PAGE_LINKS.BLOG },
      { label: "Research", href: PAGE_LINKS.RESEARCH },
    ],
  },
]

const socials = [
  { label: "X", href: PAGE_LINKS.TWITTER },
  { label: "GH", href: PAGE_LINKS.GITHUB },
  { label: "TG", href: PAGE_LINKS.TELEGRAM },
]

export function Footer() {
  const [email, setEmail] = useState("")

  return (
    <footer className="relative z-10 border-t border-border/30 bg-card/20 px-4 pt-12 pb-6 backdrop-blur-sm sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-10 md:grid-cols-[1.4fr_0.7fr_0.7fr_0.7fr]">
          {/* Brand + newsletter column */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="relative inline-flex size-4 items-center justify-center rounded border border-primary/25 bg-primary/[0.05]">
                <span className="size-1 rounded-sm bg-primary shadow-[0_0_8px_oklch(0.82_0.28_142/0.5)]" />
              </span>
              <span className="font-heading text-[0.65rem] font-semibold tracking-wide text-foreground/80">
                Privacy Protocol
              </span>
            </div>

            <p className="mt-3 max-w-xs text-[0.78rem] leading-relaxed text-muted-foreground/60">
              Developer tools for building confidential web3 applications.
              Cryptography research and reusable infrastructure.
            </p>

            {/* Newsletter */}
            <div className="mt-5">
              <p className="font-code text-[0.5rem] tracking-[0.2em] text-muted-foreground/40 uppercase">
                Stay updated
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setEmail("")
                }}
                className="mt-2 flex gap-1.5"
              >
                <input
                  type="email"
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-8 flex-1 rounded-md border border-border/30 bg-background/40 px-2.5 font-code text-[0.6rem] text-foreground/70 placeholder:text-muted-foreground/30 focus:border-primary/30 focus:outline-none"
                />
                <Button
                  type="submit"
                  className="h-8 rounded-md border border-primary/20 bg-primary/8 px-3 font-code text-[0.55rem] tracking-wider text-primary/70 uppercase hover:bg-primary/14"
                >
                  Subscribe
                </Button>
              </form>
            </div>

            {/* Social links */}
            <div className="mt-4 flex items-center gap-1.5">
              {socials.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex size-7 items-center justify-center rounded-md border border-border/25 bg-card/30 font-code text-[0.5rem] tracking-wider text-muted-foreground/50 uppercase transition-colors hover:border-border/50 hover:text-foreground/70"
                >
                  {social.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.heading}>
              <p className="font-code text-[0.5rem] tracking-[0.2em] text-muted-foreground/40 uppercase">
                {col.heading}
              </p>
              <div className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    target={"external" in link ? "_blank" : undefined}
                    rel={"external" in link ? "noreferrer" : undefined}
                    className="flex items-center gap-2 text-[0.78rem] text-muted-foreground/60 transition-colors hover:text-foreground/80"
                  >
                    {link.label}
                    {"badge" in link && link.badge && (
                      <span className="font-code rounded border border-accent/15 px-1 py-px text-[0.45rem] tracking-wider text-accent/40 uppercase">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-border/20 pt-5 sm:flex-row">
          <p className="font-code text-[0.5rem] tracking-wider text-muted-foreground/30 uppercase">
            &copy; {new Date().getFullYear()} Privacy Protocol. All rights
            reserved.
          </p>
          <p className="font-code text-[0.5rem] tracking-wider text-muted-foreground/20 uppercase">
            Building in public
          </p>
        </div>
      </div>
    </footer>
  )
}
