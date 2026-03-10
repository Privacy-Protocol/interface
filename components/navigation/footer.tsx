import { PAGE_LINKS } from "@/lib/constants"
import Link from "next/link"

export function Footer() {
  const socials = [
    { label: "X", href: PAGE_LINKS.TWITTER },
    { label: "GH", href: PAGE_LINKS.GITHUB },
    { label: "IN", href: PAGE_LINKS.TELEGRAM },
  ]

  return (
    <footer className="relative z-10 border-t border-border/80 bg-card/70 px-4 py-10 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
        <div>
          <p className="text-[0.64rem] tracking-[0.18em] text-primary uppercase">
            Privacy Protocol
          </p>
          <p className="mt-3 max-w-sm text-sm text-zinc-300">
            Developer tools for confidential web3 applications.
          </p>
          <div className="mt-4 flex items-center gap-2">
            {socials.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                className="inline-flex h-8 w-8 items-center justify-center border border-border/80 bg-muted/45 text-[0.6rem] tracking-widest text-zinc-300 uppercase transition-colors hover:border-primary/45 hover:text-primary"
              >
                {social.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[0.62rem] tracking-[0.16em] text-zinc-300 uppercase">
            Tools
          </p>
          <div className="mt-3 space-y-1.5">
            <Link
              href={PAGE_LINKS.CIPHER}
              className="block text-sm text-zinc-300 hover:text-primary"
            >
              Cipher
            </Link>
            <Link
              href={PAGE_LINKS.CLOAK}
              className="block text-sm text-zinc-300 hover:text-primary"
            >
              Cloak
            </Link>
          </div>
        </div>

        <div>
          <p className="text-[0.62rem] tracking-[0.16em] text-zinc-300 uppercase">
            Developers
          </p>
          <div className="mt-3 space-y-1.5">
            <Link
              href={PAGE_LINKS.DOCS}
              className="block text-sm text-zinc-300 hover:text-primary"
            >
              Docs
            </Link>
            <Link
              href={PAGE_LINKS.GITHUB}
              className="block text-sm text-zinc-300 hover:text-primary"
            >
              Github
            </Link>
          </div>
        </div>

        <div>
          <p className="text-[0.62rem] tracking-[0.16em] text-zinc-300 uppercase">
            Resources
          </p>
          <div className="mt-3 space-y-1.5">
            <Link
              href={PAGE_LINKS.BLOG}
              className="block text-sm text-zinc-300 hover:text-primary"
            >
              Blog
            </Link>
            <Link
              href={PAGE_LINKS.RESEARCH}
              className="block text-sm text-zinc-300 hover:text-primary"
            >
              Research
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-card/60 py-2 text-center text-muted-foreground">
        <p>
          &copy; {new Date().getFullYear()} Privacy Protocol. All rights
          reserved.
        </p>
      </div>
    </footer>
  )
}
