import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { CertificationsClient } from "./certifications-client";
import { PortfolioClient } from "./portfolio-client";

// ─── Certificate data ─────────────────────────────────────────────────────────
// Drop your files into /public/certs/ and update the `src` (and optional
// `thumbnail`) paths below. Both images and PDFs are supported. For issuer
// badges, use type "link" and add a `link` (and optional `embedUrl`).

const schema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Rameses Chamian",
  alternateName: "Zaenalos",
  description:
    "4th-year Information Technology student and aspiring software engineer",
  jobTitle: "IT Student & Software Developer",
  url: "https://zaenalos-portfolio.vercel.app/",
  image: "https://avatars.githubusercontent.com/u/77824453?v=4",
  sameAs: [
    "https://github.com/Zaenalos",
    "https://www.linkedin.com/in/rameses-chamian-7b8478357/",
    "https://www.facebook.com/Zaenalos",
  ],
  alumniOf: "PHINMA Saint Jude College",
  knowsAbout: [
    "Software Development",
    "Backend Systems",
    "Cybersecurity",
    "Reverse Engineering",
    "Web Development",
    "Linux",
    "Open Source",
  ],
};
const schemaJson = JSON.stringify(schema);

export default function Home() {
  return (
    <>
      <main className="relative">
        {/* ════════════════════════════ HERO ════════════════════════════ */}
        <section id="home" className="relative overflow-hidden">
          <div
            id="home-hero"
            className="relative flex min-h-screen items-center"
          >
            {/* Atmospheric backdrop gradients */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_25%,rgba(34,211,238,0.10),transparent_55%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_75%,rgba(139,92,246,0.12),transparent_55%)]" />
            </div>

            <div className="relative mx-auto grid w-full max-w-6xl gap-14 px-6 pt-28 pb-20 md:grid-cols-[1.25fr_0.75fr] md:items-center">
              {/* ── Left: identity block ── */}
              <div className="space-y-7">
                <p className="font-mono text-xs text-cyan-500/70">
                  <span className="text-cyan-400">›</span>{" "}
                  <span className="text-green-400/80">./init.sh</span>{" "}
                  <span className="text-muted-foreground/45">
                    --mode=portfolio --env=production
                  </span>
                </p>

                <div>
                  <h1
                    className="glitch-wrap text-6xl font-bold tracking-tight text-foreground md:text-8xl"
                    data-text="Zaenalos"
                    data-aos="zoom-in"
                  >
                    Zaenalos
                  </h1>
                  <p className="mt-2.5 font-mono text-sm text-muted-foreground/45">
                    <span className="text-purple-400">const</span>{" "}
                    <span className="text-cyan-300/70">alias</span>{" "}
                    <span className="text-muted-foreground/35">=</span>{" "}
                    <span className="text-green-400/65">"Rameses Chamian"</span>
                    <span className="text-muted-foreground/35">;</span>
                  </p>
                </div>

                <p
                  className="max-w-lg text-base leading-relaxed text-muted-foreground"
                  data-aos="fade-up"
                  data-aos-delay="120"
                >
                  Aspiring software engineer and security enthusiast. Building
                  at the intersection of backend systems, cybersecurity, and
                  compiler internals.
                </p>

                <div
                  className="flex flex-wrap gap-2"
                  data-aos="fade-up"
                  data-aos-delay="160"
                >
                  {[
                    {
                      label: "Backend Systems",
                      cls: "border-cyan-500/25    bg-cyan-500/5    text-cyan-400/80",
                    },
                    {
                      label: "Cybersecurity",
                      cls: "border-blue-500/25    bg-blue-500/5    text-blue-400/80",
                    },
                    {
                      label: "Reverse Engineering",
                      cls: "border-purple-500/25  bg-purple-500/5  text-purple-400/80",
                    },
                    {
                      label: "Open Source",
                      cls: "border-emerald-500/25 bg-emerald-500/5 text-emerald-400/80",
                    },
                  ].map(({ label, cls }) => (
                    <span
                      key={label}
                      className={cn(
                        "rounded border px-2.5 py-1 font-mono text-xs",
                        cls,
                      )}
                    >
                      {label}
                    </span>
                  ))}
                </div>

                <div
                  className="flex flex-wrap gap-3"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <a
                    href="#projects"
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "cta-glow font-mono text-sm",
                    )}
                  >
                    ./view-projects
                  </a>
                  <a
                    href="#about"
                    className={cn(
                      buttonVariants({ size: "lg", variant: "outline" }),
                      "font-mono text-sm",
                    )}
                  >
                    ./about-me
                  </a>
                </div>
              </div>

              {/* ── Right: terminal system.profile card ── */}
              <div data-aos="fade-left" data-aos-delay="80">
                <div className="rounded-lg border border-cyan-500/20 bg-black/60 backdrop-blur transition-all duration-300 hover:border-cyan-500/38 hover:shadow-[0_0_28px_rgba(34,211,238,0.07),0_20px_40px_rgba(0,0,0,0.55)]">
                  {/* Window chrome */}
                  <div className="flex items-center gap-2 rounded-t-lg border-b border-cyan-500/15 bg-cyan-500/5 px-4 py-2.5">
                    <div className="flex gap-1.5">
                      <span className="size-3 rounded-full bg-red-500/60" />
                      <span className="size-3 rounded-full bg-yellow-400/60" />
                      <span className="size-3 rounded-full bg-green-500/60" />
                    </div>
                    <span className="ml-2 font-mono text-xs text-cyan-500/45">
                      zaenalos@dev ~ system.profile
                    </span>
                  </div>

                  {/* Output */}
                  <div className="space-y-4 p-5 font-mono text-xs leading-6">
                    <div>
                      <p>
                        <span className="text-cyan-400">$</span>{" "}
                        <span className="text-green-400">whoami</span>
                      </p>
                      <p className="mt-1 pl-3 text-muted-foreground">
                        rameses chamian{" "}
                        <span className="text-cyan-500/45">(zaenalos)</span>
                      </p>
                    </div>

                    <div>
                      <p>
                        <span className="text-cyan-400">$</span>{" "}
                        <span className="text-green-400">cat</span>{" "}
                        <span className="text-muted-foreground/55">
                          status.txt
                        </span>
                      </p>
                      <div className="mt-1 space-y-0.5 pl-3 text-muted-foreground">
                        <p>4th-year Information Technology</p>
                        <p>PHINMA Saint Jude College</p>
                      </div>
                    </div>

                    <div>
                      <p>
                        <span className="text-cyan-400">$</span>{" "}
                        <span className="text-green-400">grep</span>{" "}
                        <span className="text-yellow-400/70">-r</span>{" "}
                        <span className="text-muted-foreground/55">
                          focus ./skills/
                        </span>
                      </p>
                      <div className="mt-1 space-y-1.5 pl-3">
                        {[
                          { key: "backend_systems", cls: "text-cyan-400" },
                          { key: "cybersecurity", cls: "text-blue-400" },
                          { key: "reverse_eng", cls: "text-purple-400" },
                          { key: "compiler_ir", cls: "text-orange-400" },
                        ].map(({ key, cls }) => (
                          <p
                            key={key}
                            className="flex items-center justify-between"
                          >
                            <span className={cls}>{key}</span>
                            <span className="ml-4 text-green-500/60">
                              ● active
                            </span>
                          </p>
                        ))}
                      </div>
                    </div>

                    <p className="flex items-center gap-1.5">
                      <span className="text-cyan-400">$</span>
                      <span className="cursor-blink inline-block h-3.5 w-1.75 bg-cyan-400/70" />
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Scroll indicator */}
            <a
              href="#about"
              className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-xs tracking-[0.25em] text-muted-foreground/45 transition-colors hover:text-muted-foreground"
              data-aos="fade-up"
              data-aos-delay="260"
            >
              <span>scroll</span>
              <span className="block h-12 w-px bg-linear-to-b from-cyan-400 to-transparent" />
            </a>
          </div>

          {/* Fixed nav — appears once hero scrolls out of view */}
          <nav
            id="mainNav"
            className="pointer-events-none fixed top-0 right-0 left-0 z-50 hidden -translate-y-4 items-center justify-between border-b border-cyan-500/10 bg-background/90 px-6 py-3.5 opacity-0 backdrop-blur-md transition-all duration-500 md:flex"
            aria-label="Main navigation"
            style={{ display: "none" }}
          >
            <a
              href="#home"
              className="font-mono text-sm font-semibold text-foreground"
            >
              <span className="text-cyan-500">›</span> zaenalos
            </a>
            <ul className="flex items-center gap-7 font-mono text-xs text-muted-foreground/65">
              {[
                { href: "#about", label: "about" },
                { href: "#experiences", label: "experience" },
                { href: "#projects", label: "projects" },
                { href: "#certifications", label: "certs" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="transition-colors hover:text-cyan-400"
                  >
                    ./{label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </section>

        {/* ════════════════════════════ ABOUT ════════════════════════════ */}
        <section
          id="about"
          className="py-(--section-gap)"
          data-aos="fade-in"
          data-aos-duration="200"
        >
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="mb-10">
              <p className="font-mono text-xs text-cyan-500">{"// 01.about"}</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
                Building secure, reliable systems
              </h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
              {/* About card — terminal style */}
              <div className="rounded-lg border border-cyan-500/18 bg-black/60 backdrop-blur transition-all duration-300 hover:border-cyan-500/35 hover:shadow-[0_0_28px_rgba(34,211,238,0.07),0_20px_40px_rgba(0,0,0,0.55)]">
                <div className="flex items-center gap-2 rounded-t-lg border-b border-cyan-500/15 bg-cyan-500/5 px-4 py-2.5">
                  <div className="flex gap-1.5">
                    <span className="size-3 rounded-full bg-red-500/55" />
                    <span className="size-3 rounded-full bg-yellow-400/55" />
                    <span className="size-3 rounded-full bg-green-500/55" />
                  </div>
                  <span className="ml-2 font-mono text-xs text-cyan-500/45">
                    about.md
                  </span>
                </div>
                <div className="space-y-5 p-5">
                  <p className="font-mono text-xs text-cyan-500/50">
                    # About Me
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Hello! I am Rameses Chamian, a 4th-year Information
                    Technology student at{" "}
                    <a
                      href="https://sjc.phinma.edu.ph/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400/80 underline decoration-cyan-500/25 underline-offset-4 transition-colors hover:text-cyan-300"
                    >
                      PHINMA Saint Jude College
                    </a>
                    . I am an emerging IT professional with interests in
                    software development, backend systems, and cybersecurity. My
                    current focus includes low-level programming, reverse
                    engineering, and code obfuscation — while also pursuing web
                    development, Linux, and open-source projects.
                  </p>
                  <div className="border-t border-border/30 pt-4">
                    <p className="mb-2.5 font-mono text-xs text-muted-foreground/40">
                      {"// active stacks"}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        {
                          label: "Rust",
                          cls: "border-orange-500/20 bg-orange-500/5 text-orange-300/65",
                        },
                        {
                          label: "Lua",
                          cls: "border-blue-500/20   bg-blue-500/5   text-blue-300/65",
                        },
                        {
                          label: "C",
                          cls: "border-slate-500/20  bg-slate-500/5  text-slate-300/65",
                        },
                        {
                          label: "TypeScript",
                          cls: "border-cyan-500/20   bg-cyan-500/5   text-cyan-300/65",
                        },
                        {
                          label: "Linux",
                          cls: "border-yellow-500/20 bg-yellow-500/5 text-yellow-300/65",
                        },
                        {
                          label: "x86 ASM",
                          cls: "border-red-500/20    bg-red-500/5    text-red-300/65",
                        },
                        {
                          label: "Next.js",
                          cls: "border-purple-500/20 bg-purple-500/5 text-purple-300/65",
                        },
                      ].map(({ label, cls }) => (
                        <span
                          key={label}
                          className={cn(
                            "rounded border px-2 py-0.5 font-mono text-xs",
                            cls,
                          )}
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Connect card */}
              <Card
                id="connections"
                className="bg-card/70 shadow-(--shadow-soft) backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_var(--border-strong),0_24px_50px_rgba(2,8,23,0.55)]"
              >
                <CardHeader>
                  <p className="font-mono text-xs text-purple-400/55">
                    {"// reach out"}
                  </p>
                  <CardTitle className="text-base text-foreground">
                    Connect
                  </CardTitle>
                  <CardDescription>
                    Find me on professional and developer platforms.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-2">
                  {[
                    {
                      href: "https://www.linkedin.com/in/rameses-chamian/",
                      icon: "/svgs/linkedin.svg",
                      label: "LinkedIn",
                      tag: "Professional",
                    },
                    {
                      href: "https://github.com/Zaenalos",
                      icon: "/svgs/github.svg",
                      label: "GitHub",
                      tag: "Code",
                    },
                    {
                      href: "https://www.facebook.com/Zaenalos",
                      icon: "/svgs/facebook.svg",
                      label: "Facebook",
                      tag: "Social",
                    },
                  ].map(({ href, icon, label, tag }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex w-full items-center justify-between rounded-lg border border-border/40 bg-background/40 px-3 py-2.5 font-mono text-xs text-muted-foreground transition-all hover:border-cyan-500/30 hover:bg-cyan-500/5 hover:text-foreground"
                    >
                      <span className="flex items-center gap-2.5">
                        {/* biome-ignore lint/performance/noImgElement: icon */}
                        <img src={icon} alt={label} width={15} height={15} />
                        {label}
                      </span>
                      <span className="text-muted-foreground/38 transition-colors group-hover:text-cyan-500/60">
                        {tag} →
                      </span>
                    </a>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* ════════════════════════════ EXPERIENCE ════════════════════════════
         *
         * Layout: two panels always visible side-by-side on lg+, stacked on mobile.
         * No scroll-based panel swap — both competitions and timeline are always
         * rendered. portfolio-client.tsx populates the list/controls divs via JS.
         *
         * Timeline vertical guide line math:
         *   #timeline-list  → pl-8 (32px padding) + before:left-4 (16px line)
         *   .timeline-item  → before:-left-4 (-16px from item edge = 32-16 = 16px from list) ✓
         ═══════════════════════════════════════════════════════════════════════ */}
        <section
          id="experiences"
          className="py-(--section-gap)"
          data-aos="fade-in"
          data-aos-duration="200"
        >
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="mb-10">
              <p className="font-mono text-xs text-cyan-500">
                {"// 02.experience"}
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
                Real-world exposure and competition work
              </h2>
            </div>

            <div className="grid gap-5 lg:grid-cols-2 lg:items-start">
              {/* ── Competitions panel ── */}
              <div className="flex flex-col rounded-lg border border-emerald-500/20 bg-black/55 backdrop-blur transition-all duration-300 hover:border-emerald-500/32 hover:shadow-[0_0_24px_rgba(52,211,153,0.06),0_16px_32px_rgba(0,0,0,0.50)]">
                {/* Header */}
                <div className="flex items-center gap-3 rounded-t-lg border-b border-emerald-500/15 bg-emerald-500/4 px-4 py-3">
                  {/* Pulsing live dot */}
                  <span className="relative flex size-2.5 shrink-0">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-35" />
                    <span className="relative inline-flex size-2.5 rounded-full bg-emerald-400/75" />
                  </span>
                  <span className="font-mono text-xs text-emerald-500/70">
                    competitions
                  </span>
                  <span className="ml-auto font-mono text-xs text-muted-foreground/35">
                    competitions &amp; events
                  </span>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-semibold text-foreground">
                    Competitions
                  </h3>
                  <p className="mt-0.5 mb-5 text-xs text-muted-foreground">
                    Selected events and competitions.
                  </p>
                  {/* Populated by portfolio-client.tsx → renderCompetitions() */}
                  <ul id="competitions-list" className="flex-1 space-y-2" />
                </div>

                {/* Footer — hidden by JS when empty (no "see more" needed) */}
                <div className="rounded-b-lg border-t border-border/25 bg-background/25 px-5 py-3">
                  <div id="competitions-controls" />
                </div>
              </div>

              {/* ── Timeline panel ── */}
              <div className="flex flex-col rounded-lg border border-purple-500/20 bg-black/55 backdrop-blur transition-all duration-300 hover:border-purple-500/32 hover:shadow-[0_0_24px_rgba(139,92,246,0.06),0_16px_32px_rgba(0,0,0,0.50)]">
                {/* Header */}
                <div className="flex items-center gap-3 rounded-t-lg border-b border-purple-500/15 bg-purple-500/4 px-4 py-3">
                  <span className="relative flex size-2.5 shrink-0">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-purple-400 opacity-35" />
                    <span className="relative inline-flex size-2.5 rounded-full bg-purple-400/75" />
                  </span>
                  <span className="font-mono text-xs text-purple-400/70">
                    timeline
                  </span>
                  <span className="ml-auto font-mono text-xs text-muted-foreground/35">
                    work history
                  </span>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-semibold text-foreground">Timeline</h3>
                  <p className="mt-0.5 mb-5 text-xs text-muted-foreground">
                    Professional roles, internships, and notable contributions.
                  </p>
                  {/*
                   * Vertical purple guide line: before:left-4 (16px).
                   * Each rendered item places its bullet at before:-left-4 relative
                   * to its own left edge, which sits at pl-8 (32px) inside this
                   * container — so bullet lands at 32-16 = 16px = exactly on the line.
                   *
                   * Populated by portfolio-client.tsx → renderTimeline()
                   */}
                  <div
                    id="timeline-list"
                    className="relative flex-1 space-y-3 pl-8 before:absolute before:top-0 before:bottom-0 before:left-4 before:w-px before:bg-purple-500/25"
                  />
                </div>

                {/* Footer */}
                <div className="rounded-b-lg border-t border-border/25 bg-background/25 px-5 py-3">
                  <div id="timeline-controls" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════ PROJECTS ════════════════════════════ */}
        <section
          id="projects"
          className="py-(--section-gap)"
          data-aos="fade-in"
          data-aos-duration="200"
        >
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-mono text-xs text-cyan-500">
                  {"// 03.projects"}
                </p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
                  Selected work and experiments
                </h2>
              </div>
              <a
                href="https://github.com/Zaenalos?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "font-mono text-xs",
                )}
              >
                ls -la ~/github →
              </a>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {/* Zaenalos VM */}
              <div className="flex flex-col rounded-lg border border-cyan-500/18 bg-black/60 backdrop-blur transition-all duration-300 hover:border-purple-500/35 hover:shadow-[0_0_24px_rgba(139,92,246,0.07),0_16px_32px_rgba(0,0,0,0.5)]">
                <div className="flex items-center justify-between rounded-t-lg border-b border-cyan-500/15 bg-cyan-500/5 px-4 py-2.5">
                  <span className="font-mono text-xs">
                    <span className="text-muted-foreground/35">
                      ~/projects/
                    </span>
                    <span className="font-semibold text-purple-300">
                      zaenalos-vm
                    </span>
                  </span>
                  <Badge
                    variant="outline"
                    className="border-purple-500/30 font-mono text-xs text-purple-400/65"
                  >
                    private
                  </Badge>
                </div>
                <div className="flex flex-1 flex-col gap-4 p-5">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    A Lua obfuscation tool that protects code by implementing
                    virtualization — translating bytecode into a custom ISA
                    executed by an embedded VM with an SSA-style IR lowering
                    pipeline.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "Lua",
                      "VM Design",
                      "Bytecode",
                      "Obfuscation",
                      "SSA IR",
                      "Rust",
                    ].map((t) => (
                      <span
                        key={t}
                        className="rounded border border-purple-500/18 bg-purple-500/5 px-2 py-0.5 font-mono text-xs text-purple-300/60"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end rounded-b-lg border-t border-border/30 bg-background/30 px-5 py-3">
                  <a
                    href="#projects"
                    id="zaenalos-vm"
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "sm" }),
                      "font-mono text-xs text-muted-foreground hover:text-purple-300",
                    )}
                  >
                    learn more →
                  </a>
                </div>
              </div>

              {/* Lua Lexer */}
              <div className="flex flex-col rounded-lg border border-cyan-500/18 bg-black/60 backdrop-blur transition-all duration-300 hover:border-blue-500/35 hover:shadow-[0_0_24px_rgba(59,130,246,0.07),0_16px_32px_rgba(0,0,0,0.5)]">
                <div className="flex items-center justify-between rounded-t-lg border-b border-cyan-500/15 bg-cyan-500/5 px-4 py-2.5">
                  <span className="font-mono text-xs">
                    <span className="text-muted-foreground/35">
                      ~/projects/
                    </span>
                    <span className="font-semibold text-blue-300">
                      lua-lexer
                    </span>
                  </span>
                  <Badge
                    variant="outline"
                    className="border-emerald-500/30 font-mono text-xs text-emerald-400/65"
                  >
                    open source
                  </Badge>
                </div>
                <div className="flex flex-1 flex-col gap-4 p-5">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    A custom-built lexical analyzer for Lua written in native
                    Lua — full token classification and source-position tracking
                    designed for compiler front-end use.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {["Lua", "Lexer", "Tokenizer", "Compiler Front-end"].map(
                      (t) => (
                        <span
                          key={t}
                          className="rounded border border-blue-500/18 bg-blue-500/5 px-2 py-0.5 font-mono text-xs text-blue-300/60"
                        >
                          {t}
                        </span>
                      ),
                    )}
                  </div>
                </div>
                <div className="flex justify-end rounded-b-lg border-t border-border/30 bg-background/30 px-5 py-3">
                  <a
                    href="https://github.com/Zaenalos/Lua-Lexer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "sm" }),
                      "font-mono text-xs text-muted-foreground hover:text-blue-300",
                    )}
                  >
                    view repo →
                  </a>
                </div>
              </div>

              {/* Zen */}
              <div className="flex flex-col rounded-lg border border-cyan-500/18 bg-black/60 backdrop-blur transition-all duration-300 hover:border-emerald-500/35 hover:shadow-[0_0_24px_rgba(52,211,153,0.07),0_16px_32px_rgba(0,0,0,0.5)]">
                <div className="flex items-center justify-between rounded-t-lg border-b border-cyan-500/15 bg-cyan-500/5 px-4 py-2.5">
                  <span className="font-mono text-xs">
                    <span className="text-muted-foreground/35">
                      ~/projects/
                    </span>
                    <span className="font-semibold text-emerald-300">zen</span>
                  </span>
                  <Badge
                    variant="outline"
                    className="border-orange-500/30 font-mono text-xs text-orange-400/65"
                  >
                    reverse engineering
                  </Badge>
                </div>
                <div className="flex flex-1 flex-col gap-4 p-5">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    A reverse engineering project that analyzes and modifies a
                    popular 2D sandbox game — demonstrating binary analysis,
                    memory manipulation, and runtime patching.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {["RE", "Binary Analysis", "Memory Patching", "x86"].map(
                      (t) => (
                        <span
                          key={t}
                          className="rounded border border-emerald-500/18 bg-emerald-500/5 px-2 py-0.5 font-mono text-xs text-emerald-300/60"
                        >
                          {t}
                        </span>
                      ),
                    )}
                  </div>
                </div>
                <div className="flex justify-end rounded-b-lg border-t border-border/30 bg-background/30 px-5 py-3">
                  <a
                    href="https://github.com/Zaenalos/Zen"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "sm" }),
                      "font-mono text-xs text-muted-foreground hover:text-emerald-300",
                    )}
                  >
                    view repo →
                  </a>
                </div>
              </div>

              {/* PH-Geolocation */}
              <div className="flex flex-col rounded-lg border border-cyan-500/18 bg-black/60 backdrop-blur transition-all duration-300 hover:border-yellow-500/35 hover:shadow-[0_0_24px_rgba(234,179,8,0.07),0_16px_32px_rgba(0,0,0,0.5)]">
                <div className="flex items-center justify-between rounded-t-lg border-b border-cyan-500/15 bg-cyan-500/5 px-4 py-2.5">
                  <span className="font-mono text-xs">
                    <span className="text-muted-foreground/35">
                      ~/projects/
                    </span>
                    <span className="font-semibold text-yellow-300">
                      ph-geolocation
                    </span>
                  </span>
                  <Badge
                    variant="outline"
                    className="border-yellow-500/30 font-mono text-xs text-yellow-400/65"
                  >
                    javascript
                  </Badge>
                </div>
                <div className="flex flex-1 flex-col gap-4 p-5">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    A JavaScript library with an API interface providing
                    detailed geolocation data for the Philippines — regions,
                    provinces, cities, municipalities, and barangays.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {["JavaScript", "REST API", "GeoData", "PH"].map((t) => (
                      <span
                        key={t}
                        className="rounded border border-yellow-500/18 bg-yellow-500/5 px-2 py-0.5 font-mono text-xs text-yellow-300/60"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end rounded-b-lg border-t border-border/30 bg-background/30 px-5 py-3">
                  <a
                    href="https://github.com/Zaenalos/PH-Geolocation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "sm" }),
                      "font-mono text-xs text-muted-foreground hover:text-yellow-300",
                    )}
                  >
                    view repo →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════ CERTIFICATIONS ═══════════════════════
         *
         * Horizontal film-strip gallery. Each card opens a fullscreen
         * lightbox with keyboard navigation (← → Esc).
         *
         * To add certificates:
         *   1. Drop image/PDF files into /public/certs/
         *   2. Optionally add PNG thumbnails to /public/certs/thumbnails/
         *   3. Update the CERTIFICATES array near the top of this file.
         ═══════════════════════════════════════════════════════════════ */}
        <section
          id="certifications"
          className="py-(--section-gap)"
          data-aos="fade-in"
          data-aos-duration="200"
        >
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="mb-8">
              <p className="font-mono text-xs text-cyan-500">
                {"// 04.certifications"}
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
                Credentials and achievements
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Competition participations, internship completions, and course
                certificates.
              </p>
            </div>
            <CertificationsClient />
          </div>
        </section>
      </main>

      {/* ════════════════════════════ FOOTER ════════════════════════════ */}
      <footer className="py-10">
        <div className="mx-auto max-w-6xl px-6">
          <Separator className="mb-6 bg-border/30" />
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <p className="font-mono text-sm font-semibold text-foreground">
                <span className="text-cyan-500">›</span> zaenalos
              </p>
              <p className="mt-1 font-mono text-xs text-muted-foreground/40">
                {"// aspiring software engineer & security enthusiast"}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-6 font-mono text-xs text-muted-foreground/50">
              {[
                { href: "https://github.com/Zaenalos", label: "github" },
                {
                  href: "https://www.linkedin.com/in/rameses-chamian/",
                  label: "linkedin",
                },
                {
                  href: "https://www.facebook.com/Zaenalos",
                  label: "facebook",
                },
              ].map(({ href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-cyan-400"
                >
                  ./{label}
                </a>
              ))}
            </div>
          </div>
          <p className="mt-6 text-center font-mono text-xs text-muted-foreground/35">
            &copy; {new Date().getFullYear()} zaenalos. all rights reserved.
          </p>
        </div>
      </footer>

      <script type="application/ld+json">{schemaJson}</script>
      <PortfolioClient />
    </>
  );
}
