"use client"

import Link from "next/link"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"

import { SiteNavbar } from "@/components/landing/site-navbar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type ProductCard = {
  name: string
  href: string
  description: string
  useCases: string[]
  tone: "primary" | "accent"
  span: string
}

type BentoItem = {
  title: string
  text: string
  span: string
}

type ResearchPost = {
  title: string
  type: "Blog" | "Research"
  date: string
  summary: string
  href: string
}

const products: ProductCard[] = [
  {
    name: "Cipher",
    href: "/cipher",
    description: "Confidential actions and hidden data for dapps.",
    useCases: ["Private metadata", "Hidden state", "Confidential logic"],
    tone: "primary",
    span: "lg:col-span-6",
  },
  {
    name: "Cloak",
    href: "/cloak",
    description: "Shielded execution and reduced action linkability.",
    useCases: ["Actor privacy", "Relay-safe flows", "Low-linkability actions"],
    tone: "accent",
    span: "lg:col-span-6",
  },
]

const whyItems: BentoItem[] = [
  { title: "Privacy by default", text: "Private UX should be standard.", span: "lg:col-span-5" },
  {
    title: "Easy for teams",
    text: "Integrate quickly without deep cryptography expertise.",
    span: "lg:col-span-7",
  },
  { title: "Composable", text: "Mix modules with existing contracts.", span: "lg:col-span-4" },
  { title: "No chain migration", text: "Deploy beside current stack.", span: "lg:col-span-4" },
  {
    title: "Tools over custom crypto",
    text: "Use stable SDK workflows, not bespoke plumbing.",
    span: "lg:col-span-4",
  },
]

const useCases: BentoItem[] = [
  {
    title: "Private Governance",
    text: "Encrypted voting and confidential proposals.",
    span: "lg:col-span-4",
  },
  {
    title: "Confidential DeFi",
    text: "Protect strategy parameters and execution paths.",
    span: "lg:col-span-4",
  },
  {
    title: "Identity-safe Social",
    text: "Reduce user behavior correlation across actions.",
    span: "lg:col-span-4",
  },
  {
    title: "Enterprise Workflows",
    text: "Secure business logic for production dapps.",
    span: "lg:col-span-7",
  },
]

const posts: ResearchPost[] = [
  {
    title: "Composable privacy middleware for web3",
    type: "Research",
    date: "Q2 2026",
    summary: "A practical architecture for privacy layers.",
    href: "/research/composable-privacy-middleware",
  },
  {
    title: "Cipher beta integration improvements",
    type: "Blog",
    date: "Q2 2026",
    summary: "Faster setup and cleaner SDK flows.",
    href: "/blog/cipher-beta-update",
  },
  {
    title: "Reducing action linkability in dapps",
    type: "Research",
    date: "Q1 2026",
    summary: "Patterns for actor privacy in production.",
    href: "/research/reducing-linkability",
  },
  {
    title: "From crypto complexity to developer APIs",
    type: "Blog",
    date: "Q1 2026",
    summary: "Why abstraction accelerates privacy adoption.",
    href: "/blog/developer-abstractions",
  },
]

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] as const },
}

function ArrowRightIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="size-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-[0.65rem] uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
      <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
        {title}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-zinc-300 sm:text-base">{description}</p>
    </div>
  )
}

function BackgroundSystem({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(34,197,94,0.11) 1px, transparent 1px), linear-gradient(to bottom, rgba(34,197,94,0.09) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
        animate={reducedMotion ? undefined : { backgroundPosition: ["0px 0px", "64px 64px"] }}
        transition={{ duration: 26, ease: "linear", repeat: Infinity }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 22% 20%, rgba(34,197,94,0.16), transparent 35%), radial-gradient(circle at 78% 16%, rgba(56,189,248,0.12), transparent 30%), radial-gradient(circle at 50% 78%, rgba(99,102,241,0.12), transparent 42%)",
        }}
      />
    </div>
  )
}

function HeroVisual({ reducedMotion }: { reducedMotion: boolean }) {
  const { scrollY } = useScroll()
  const parallaxY = useTransform(scrollY, [0, 700], [0, 110])
  const layers = Array.from({ length: 9 }).map((_, i) => i)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      style={{ y: reducedMotion ? 0 : parallaxY }}
      className="pointer-events-none absolute inset-0 z-0 mx-auto max-w-4xl"
      aria-hidden
    >
      <div className="relative h-full w-full">
        <motion.div
          className="absolute left-1/2 top-1/2 h-[340px] w-[92%] -translate-x-1/2 -translate-y-1/2 border border-primary/40 bg-card/25 backdrop-blur-sm sm:h-[390px]"
          animate={reducedMotion ? undefined : { rotate: [0, 0.8, -0.6, 0] }}
          transition={{ duration: 18, ease: "easeInOut", repeat: Infinity }}
        />

        {layers.map((layer) => (
          <motion.div
            key={layer}
            className="absolute left-1/2 top-1/2 h-[300px] -translate-x-1/2 -translate-y-1/2 border border-primary/20 bg-transparent"
            style={{ width: `${84 - layer * 5}%` }}
            animate={
              reducedMotion
                ? undefined
                : {
                    opacity: [0.2, 0.55, 0.22],
                    y: [0, layer % 2 === 0 ? -6 : 6, 0],
                  }
            }
            transition={{
              duration: 4 + layer * 0.35,
              repeat: Infinity,
              ease: "easeInOut",
              delay: layer * 0.08,
            }}
          />
        ))}

        <motion.div
          className="absolute left-1/2 top-1/2 h-[320px] w-[88%] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-primary/18 to-transparent"
          animate={reducedMotion ? undefined : { x: ["-12%", "12%", "-12%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="absolute left-1/2 top-1/2 h-[360px] w-[94%] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-background/30 via-transparent to-background/45" />
      </div>
    </motion.div>
  )
}

export function LandingPage() {
  const reducedMotion = useReducedMotion()

  return (
    <div id="home" className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <BackgroundSystem reducedMotion={Boolean(reducedMotion)} />
      <SiteNavbar />

      <main className="relative z-10">
        <section className="relative px-4 pb-20 pt-34 sm:px-6 sm:pt-40">
          <HeroVisual reducedMotion={Boolean(reducedMotion)} />
          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.36 }}
              className="text-[0.64rem] uppercase tracking-[0.2em] text-primary"
            >
              Privacy Protocol // Confidential app infrastructure
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, delay: 0.05 }}
              className="mx-auto mt-4 max-w-3xl text-balance text-4xl leading-tight font-semibold tracking-tight text-zinc-50 sm:text-5xl md:text-6xl"
            >
              Build confidential web3 applications
              <span className="block bg-gradient-to-r from-primary via-accent to-cyan-300 bg-clip-text text-transparent">
                without cryptography complexity
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, delay: 0.1 }}
              className="mx-auto mt-4 max-w-2xl text-balance text-sm leading-relaxed text-zinc-300 sm:text-base"
            >
              Developer-first privacy middleware for teams shipping secure dapps.
              <span className="block">Fast integration, strong guarantees, production-ready tooling.</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.15 }}
              className="mt-7 flex flex-wrap items-center justify-center gap-3"
            >
              <Button
                asChild
                className="h-10 border border-primary/60 bg-primary/14 px-5 text-[0.64rem] uppercase tracking-[0.2em] text-primary hover:bg-primary/22"
              >
                <Link href="#products" className="inline-flex items-center gap-1.5">
                  Explore Tools
                  <ArrowRightIcon />
                </Link>
              </Button>
              <Button
                asChild
                className="h-10 border border-accent/50 bg-accent/12 px-5 text-[0.64rem] uppercase tracking-[0.2em] text-accent hover:bg-accent/20"
              >
                <Link href="/contact" className="inline-flex items-center gap-1.5">
                  Contact Us
                  <ArrowRightIcon />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        <motion.section {...reveal} id="motivation" className="px-4 py-14 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Motivation"
              title="Privacy demand is rising. Integration is still painful."
              description="Teams need better defaults than hand-rolled cryptography and long research cycles."
            />

            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              <article className="border border-border/80 bg-card/70 p-5">
                <p className="text-[0.63rem] uppercase tracking-[0.18em] text-accent">Problem</p>
                <p className="mt-3 text-sm text-zinc-300">
                  Too much time is spent learning zk/FHE and building fragile custom privacy logic.
                </p>
              </article>

              <article className="border border-primary/35 bg-primary/8 p-5">
                <p className="text-[0.63rem] uppercase tracking-[0.18em] text-primary">Solution</p>
                <p className="mt-3 text-sm text-zinc-300">
                  Privacy Protocol packages advanced research into simple, secure developer tooling.
                </p>
              </article>
            </div>

            <div className="mt-4 overflow-x-auto border border-border/80 bg-card/60">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-border/70 bg-muted/45">
                  <tr>
                    <th className="px-4 py-2.5 text-[0.6rem] uppercase tracking-[0.16em] text-muted-foreground">
                      Approach
                    </th>
                    <th className="px-4 py-2.5 text-[0.6rem] uppercase tracking-[0.16em] text-muted-foreground">
                      Time
                    </th>
                    <th className="px-4 py-2.5 text-[0.6rem] uppercase tracking-[0.16em] text-muted-foreground">
                      Risk
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/60">
                    <td className="px-4 py-2.5 text-zinc-200">Hand-rolled stack</td>
                    <td className="px-4 py-2.5 text-zinc-300">Long</td>
                    <td className="px-4 py-2.5 text-zinc-300">High</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 text-primary">Privacy Protocol tooling</td>
                    <td className="px-4 py-2.5 text-zinc-200">Faster</td>
                    <td className="px-4 py-2.5 text-zinc-200">Lower</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </motion.section>

        <motion.section {...reveal} id="products" className="px-4 py-14 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Products"
              title="Two privacy tool lines"
              description="Different layers, one composable developer experience."
            />

            <div className="mt-8 grid gap-4 lg:grid-cols-12">
              {products.map((product) => (
                <motion.article
                  key={product.name}
                  className={cn(
                    "group relative flex min-h-[320px] flex-col overflow-hidden border bg-card/70 p-5 backdrop-blur-sm lg:col-span-12",
                    product.span,
                    product.tone === "primary" ? "border-primary/40" : "border-accent/40"
                  )}
                  style={{ borderRadius: 12 }}
                  whileHover={{ y: -4, scale: 1.01, borderRadius: 22 }}
                  transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h3 className="text-2xl font-semibold text-zinc-50">{product.name}</h3>
                  <p className="mt-2 text-sm text-zinc-300">{product.description}</p>

                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    {product.useCases.map((useCase) => (
                      <p
                        key={useCase}
                        className="border border-border/70 bg-muted/45 px-2.5 py-2 text-xs uppercase tracking-[0.12em] text-zinc-200"
                      >
                        {useCase}
                      </p>
                    ))}
                  </div>

                  <Button
                    asChild
                    className={cn(
                      "mt-auto h-9 border bg-transparent px-4 text-[0.62rem] uppercase tracking-[0.2em]",
                      product.tone === "primary"
                        ? "border-primary/55 text-primary hover:bg-primary/15"
                        : "border-accent/55 text-accent hover:bg-accent/15"
                    )}
                  >
                    <Link href={product.href} className="inline-flex items-center gap-1.5">
                      Visit {product.name}
                      <ArrowRightIcon />
                    </Link>
                  </Button>
                </motion.article>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section {...reveal} id="why" className="px-4 py-14 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Why Privacy Protocol"
              title="A practical privacy philosophy"
              description="Built for adoption, not complexity theater."
            />

            <div className="mt-8 grid gap-4 lg:grid-cols-12">
              {whyItems.map((item) => (
                <motion.article
                  key={item.title}
                  className={cn("border border-border/80 bg-card/70 p-5 lg:col-span-12", item.span)}
                  whileHover={{ y: -3, scale: 1.005, borderRadius: 20 }}
                  transition={{ duration: 0.23 }}
                >
                  <p className="text-[0.62rem] uppercase tracking-[0.16em] text-primary">{item.title}</p>
                  <p className="mt-2 text-sm text-zinc-300">{item.text}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section {...reveal} id="use-cases" className="px-4 py-14 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Use Cases"
              title="What teams can enable"
              description="Production features unlocked by privacy middleware."
            />

            <div className="mt-8 grid gap-4 lg:grid-cols-12">
              {useCases.map((item) => (
                <motion.article
                  key={item.title}
                  className={cn("border border-border/80 bg-card/70 p-5 lg:col-span-12", item.span)}
                  whileHover={{ y: -3, borderRadius: 18 }}
                  transition={{ duration: 0.22 }}
                >
                  <h3 className="text-lg font-medium text-zinc-50">{item.title}</h3>
                  <p className="mt-2 text-sm text-zinc-300">{item.text}</p>
                </motion.article>
              ))}

              <motion.article
                className="border border-primary/45 bg-primary/10 p-5 lg:col-span-5"
                whileHover={{ y: -3, borderRadius: 20 }}
                transition={{ duration: 0.22 }}
              >
                <p className="text-sm text-zinc-200">Ready to integrate privacy into your product stack?</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button
                    asChild
                    className="h-9 border border-primary/60 bg-primary/18 text-[0.62rem] uppercase tracking-[0.18em] text-primary hover:bg-primary/25"
                  >
                    <Link href="/docs">View Docs</Link>
                  </Button>
                  <Button
                    asChild
                    className="h-9 border border-accent/55 bg-accent/12 text-[0.62rem] uppercase tracking-[0.18em] text-accent hover:bg-accent/20"
                  >
                    <Link href="/contact">Talk to Team</Link>
                  </Button>
                </div>
              </motion.article>
            </div>
          </div>
        </motion.section>

        <motion.section {...reveal} id="research" className="px-4 py-14 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Blog & Research"
              title="Latest writing"
              description="Scroll horizontally to explore updates and research."
            />

            <div className="mt-7 overflow-x-auto pb-3">
              <div className="flex min-w-max snap-x snap-mandatory gap-4">
                {posts.map((post) => (
                  <motion.article
                    key={post.title}
                    className="w-[320px] snap-start border border-border/80 bg-card/70 p-4 sm:w-[360px]"
                    whileHover={{ y: -3, borderRadius: 18, borderColor: "rgba(34,197,94,0.45)" }}
                    transition={{ duration: 0.22 }}
                  >
                    <div className="flex items-center justify-between gap-2 text-[0.56rem] uppercase tracking-[0.14em]">
                      <span className="border border-border/70 bg-muted/45 px-2 py-1 text-zinc-300">
                        {post.type}
                      </span>
                      <span className="text-muted-foreground">{post.date}</span>
                    </div>
                    <h3 className="mt-3 text-lg font-medium text-zinc-50">{post.title}</h3>
                    <p className="mt-2 text-sm text-zinc-300">{post.summary}</p>
                    <Link
                      href={post.href}
                      className="mt-4 inline-flex items-center gap-1.5 text-[0.63rem] uppercase tracking-[0.18em] text-primary"
                    >
                      Read More
                      <ArrowRightIcon />
                    </Link>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      <footer className="relative z-10 border-t border-border/80 bg-card/70 px-4 py-10 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <p className="text-[0.64rem] uppercase tracking-[0.18em] text-primary">Privacy Protocol</p>
            <p className="mt-3 max-w-sm text-sm text-zinc-300">
              Developer tools for confidential web3 applications.
            </p>
            <div className="mt-4 flex items-center gap-2">
              {[
                { label: "X", href: "#" },
                { label: "GH", href: "https://github.com" },
                { label: "IN", href: "#" },
              ].map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="inline-flex h-8 w-8 items-center justify-center border border-border/80 bg-muted/45 text-[0.6rem] uppercase tracking-[0.1em] text-zinc-300 transition-colors hover:border-primary/45 hover:text-primary"
                >
                  {social.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[0.62rem] uppercase tracking-[0.16em] text-zinc-300">Tools</p>
            <div className="mt-3 space-y-1.5">
              <Link href="/cipher" className="block text-sm text-zinc-300 hover:text-primary">
                Cipher
              </Link>
              <Link href="/cloak" className="block text-sm text-zinc-300 hover:text-primary">
                Cloak
              </Link>
            </div>
          </div>

          <div>
            <p className="text-[0.62rem] uppercase tracking-[0.16em] text-zinc-300">Developers</p>
            <div className="mt-3 space-y-1.5">
              <Link href="/docs" className="block text-sm text-zinc-300 hover:text-primary">
                Docs
              </Link>
              <Link href="https://github.com" className="block text-sm text-zinc-300 hover:text-primary">
                Github
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
