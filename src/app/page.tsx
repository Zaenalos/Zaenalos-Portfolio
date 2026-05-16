import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PortfolioClient } from "./portfolio-client";

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
        <section id="home" className="relative overflow-hidden">
          <div
            id="home-hero"
            className="relative flex min-h-screen items-center"
          >
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.12),transparent_60%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.16),transparent_65%)]" />
            </div>

            <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-6 pb-20 pt-28 md:grid-cols-[1.15fr_0.85fr] md:items-center">
              <div className="space-y-6">
                <Badge
                  variant="secondary"
                  className="bg-muted/60 text-muted-foreground"
                >
                  Software Developer &amp; IT Student
                </Badge>
                <h1
                  className="text-4xl font-semibold tracking-tight text-foreground md:text-6xl"
                  data-aos="zoom-in"
                >
                  Zaenalos
                </h1>
                <p
                  className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
                  data-aos="fade-up"
                  data-aos-delay="120"
                >
                  Aspiring software engineer and security enthusiast focused on
                  backend systems, cybersecurity, and reverse engineering.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Backend Systems</Badge>
                  <Badge variant="outline">Cybersecurity</Badge>
                  <Badge variant="outline">Reverse Engineering</Badge>
                  <Badge variant="outline">Open Source</Badge>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="#projects"
                    className={buttonVariants({ size: "lg" })}
                  >
                    View Projects
                  </a>
                  <a
                    href="#about"
                    className={buttonVariants({
                      size: "lg",
                      variant: "outline",
                    })}
                  >
                    About Me
                  </a>
                </div>
              </div>

              <div className="space-y-6">
                <Card className="bg-card/80 shadow-[var(--shadow-soft)] backdrop-blur transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_var(--border-strong),0_24px_50px_rgba(2,8,23,0.55)]">
                  <CardHeader>
                    <CardTitle className="text-base text-foreground">
                      Focus Areas
                    </CardTitle>
                    <CardDescription>
                      Specialized in system-focused engineering disciplines.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center justify-between">
                      <span>Backend Systems</span>
                      <Badge variant="secondary">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Cybersecurity</span>
                      <Badge variant="secondary">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Reverse Engineering</span>
                      <Badge variant="secondary">Active</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/70 shadow-[var(--shadow-soft)] backdrop-blur transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_var(--border-strong),0_24px_50px_rgba(2,8,23,0.55)]">
                  <CardHeader>
                    <CardTitle className="text-base text-foreground">
                      Currently
                    </CardTitle>
                    <CardDescription>
                      4th-year Information Technology student at PHINMA Saint
                      Jude College.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>

            <a
              href="#about"
              className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-xs tracking-[0.3em] text-muted-foreground/80"
              data-aos="fade-up"
              data-aos-delay="260"
            >
              <span className="uppercase">Scroll</span>
              <span className="block h-12 w-px bg-linear-to-b from-cyan-400 to-transparent" />
            </a>
          </div>

          <nav
            id="mainNav"
            className="pointer-events-none fixed top-0 right-0 left-0 z-50 hidden -translate-y-4 items-center justify-between border-b border-border/60 bg-background/80 px-6 py-4 opacity-0 backdrop-blur transition-all duration-500 md:flex"
            aria-label="Main navigation"
            style={{ display: "none" }}
          >
            <a
              href="#home"
              className="text-lg font-semibold tracking-wide text-foreground"
            >
              Zaenalos
            </a>

            <div className="ml-auto flex items-center gap-8">
              <ul className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
                <li>
                  <a
                    href="#about"
                    className="transition-colors hover:text-foreground"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#experiences"
                    className="transition-colors hover:text-foreground"
                  >
                    Experiences
                  </a>
                </li>
                <li>
                  <a
                    href="#projects"
                    className="transition-colors hover:text-foreground"
                  >
                    Projects
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </section>

        <section
          id="about"
          className="py-[var(--section-gap)]"
          data-aos="fade-in"
          data-aos-duration="200"
        >
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  About
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-foreground">
                  Building secure, reliable systems
                </h2>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <Card className="bg-card/80 shadow-[var(--shadow-soft)] backdrop-blur transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_var(--border-strong),0_24px_50px_rgba(2,8,23,0.55)]">
                <CardHeader>
                  <CardTitle className="text-base text-foreground">
                    About Me
                  </CardTitle>
                  <CardDescription>
                    A focused builder with a systems-first mindset.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-sm leading-relaxed text-muted-foreground">
                  Hello! I am Rameses Chamian, a 4th-year Information Technology
                  student at{" "}
                  <a
                    href="https://sjc.phinma.edu.ph/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-muted-foreground/40 underline-offset-4 hover:text-foreground"
                  >
                    PHINMA Saint Jude College
                  </a>
                  . I am an emerging IT professional with interests in software
                  development, backend systems, and cybersecurity. My current
                  focus includes low-level programming, reverse engineering, and
                  code obfuscation, while I also pursue web development, Linux,
                  and open-source projects as part of my continuous learning
                  journey.
                </CardContent>
              </Card>

              <Card
                id="connections"
                className="bg-card/70 shadow-[var(--shadow-soft)] backdrop-blur transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_var(--border-strong),0_24px_50px_rgba(2,8,23,0.55)]"
              >
                <CardHeader>
                  <CardTitle className="text-base text-foreground">
                    Connect
                  </CardTitle>
                  <CardDescription>
                    Find me on professional and developer platforms.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-3">
                  <a
                    href="https://www.linkedin.com/in/rameses-chamian/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-border/70 bg-background/60 px-3 py-2 text-sm text-muted-foreground transition hover:text-foreground"
                  >
                    {
                      // biome-ignore lint/performance/noImgElement: Using img for SVG icons.
                      <img
                        src="/svgs/linkedin.svg"
                        alt="LinkedIn"
                        width={18}
                        height={18}
                      />
                    }
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com/Zaenalos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-border/70 bg-background/60 px-3 py-2 text-sm text-muted-foreground transition hover:text-foreground"
                  >
                    {
                      // biome-ignore lint/performance/noImgElement: Using img for SVG icons.
                      <img
                        src="/svgs/github.svg"
                        alt="GitHub"
                        width={18}
                        height={18}
                      />
                    }
                    GitHub
                  </a>
                  <a
                    href="https://www.facebook.com/Zaenalos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-border/70 bg-background/60 px-3 py-2 text-sm text-muted-foreground transition hover:text-foreground"
                  >
                    {
                      // biome-ignore lint/performance/noImgElement: Using img for SVG icons.
                      <img
                        src="/svgs/facebook.svg"
                        alt="Facebook"
                        width={18}
                        height={18}
                      />
                    }
                    Facebook
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section
          id="experiences"
          className="py-[var(--section-gap)]"
          data-aos="fade-in"
          data-aos-duration="200"
        >
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Experience
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-foreground">
                Real-world exposure and competition work
              </h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="bg-card/80 shadow-[var(--shadow-soft)] backdrop-blur transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_var(--border-strong),0_24px_50px_rgba(2,8,23,0.55)]">
                <CardHeader>
                  <CardTitle>Competitions</CardTitle>
                  <CardDescription>
                    Selected events and competitions.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul
                    id="competitions-list"
                    className="exp-list space-y-3 text-left"
                  />
                </CardContent>
                <CardFooter className="border-border/60 bg-background/50">
                  <div id="competitions-controls" className="w-full" />
                </CardFooter>
              </Card>

              <Card className="bg-card/80 shadow-[var(--shadow-soft)] backdrop-blur transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_var(--border-strong),0_24px_50px_rgba(2,8,23,0.55)]">
                <CardHeader>
                  <CardTitle>Timeline</CardTitle>
                  <CardDescription>
                    Professional roles, internships, and notable contributions.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div id="timeline-list" className="text-left" />
                </CardContent>
                <CardFooter className="border-border/60 bg-background/50">
                  <div id="timeline-controls" className="w-full" />
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <section
          id="projects"
          className="py-[var(--section-gap)]"
          data-aos="fade-in"
          data-aos-duration="200"
        >
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  Projects
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-foreground">
                  Selected work and experiments
                </h2>
              </div>
              <a
                href="https://github.com/Zaenalos?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                View all on GitHub
              </a>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Card className="bg-card/70 shadow-[var(--shadow-soft)] backdrop-blur transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_var(--border-strong),0_24px_50px_rgba(2,8,23,0.55)]">
                <CardHeader>
                  <CardTitle className="text-purple-300">Zaenalos VM</CardTitle>
                  <CardDescription>
                    A Lua obfuscation tool that protects code by implementing
                    virtualization.
                  </CardDescription>
                </CardHeader>
                <CardFooter className="justify-between border-border/60 bg-background/50">
                  <Badge variant="outline">Private</Badge>
                  <a
                    href="#projects"
                    id="zaenalos-vm"
                    className={buttonVariants({ variant: "ghost", size: "sm" })}
                  >
                    Learn more
                  </a>
                </CardFooter>
              </Card>

              <Card className="bg-card/70 shadow-[var(--shadow-soft)] backdrop-blur transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_var(--border-strong),0_24px_50px_rgba(2,8,23,0.55)]">
                <CardHeader>
                  <CardTitle className="text-blue-300">Lua Lexer</CardTitle>
                  <CardDescription>
                    A custom-built lexical analyzer for Lua written in native
                    Lua, designed for parsing and tokenizing Lua source code.
                  </CardDescription>
                </CardHeader>
                <CardFooter className="justify-between border-border/60 bg-background/50">
                  <Badge variant="outline">Open Source</Badge>
                  <a
                    href="https://github.com/Zaenalos/Lua-Lexer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonVariants({ variant: "ghost", size: "sm" })}
                  >
                    View repo
                  </a>
                </CardFooter>
              </Card>

              <Card className="bg-card/70 shadow-[var(--shadow-soft)] backdrop-blur transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_var(--border-strong),0_24px_50px_rgba(2,8,23,0.55)]">
                <CardHeader>
                  <CardTitle className="text-emerald-300">Zen</CardTitle>
                  <CardDescription>
                    A reverse engineering project that analyzes and modifies the
                    popular 2D sandbox game, demonstrating practical application
                    of binary analysis skills.
                  </CardDescription>
                </CardHeader>
                <CardFooter className="justify-between border-border/60 bg-background/50">
                  <Badge variant="outline">Reverse Engineering</Badge>
                  <a
                    href="https://github.com/Zaenalos/Zen"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonVariants({ variant: "ghost", size: "sm" })}
                  >
                    View repo
                  </a>
                </CardFooter>
              </Card>

              <Card className="bg-card/70 shadow-[var(--shadow-soft)] backdrop-blur transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_var(--border-strong),0_24px_50px_rgba(2,8,23,0.55)]">
                <CardHeader>
                  <CardTitle className="text-yellow-300">
                    PH-Geolocation
                  </CardTitle>
                  <CardDescription>
                    A JavaScript library with an API interface providing
                    detailed geolocation data for the Philippines, including
                    regions, provinces, cities, municipalities, and barangays.
                  </CardDescription>
                </CardHeader>
                <CardFooter className="justify-between border-border/60 bg-background/50">
                  <Badge variant="outline">JavaScript</Badge>
                  <a
                    href="https://github.com/Zaenalos/PH-Geolocation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonVariants({ variant: "ghost", size: "sm" })}
                  >
                    View repo
                  </a>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-10">
        <div className="mx-auto max-w-6xl px-6">
          <Separator className="mb-6" />
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <p className="text-lg font-semibold text-foreground">Zaenalos</p>
              <p className="text-sm text-muted-foreground">
                Aspiring software engineer &amp; security enthusiast.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <a
                href="https://github.com/Zaenalos"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-foreground"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/rameses-chamian/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-foreground"
              >
                LinkedIn
              </a>
              <a
                href="https://www.facebook.com/Zaenalos"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-foreground"
              >
                Facebook
              </a>
            </div>
          </div>
          <p className="mt-6 text-center text-xs text-muted-foreground">
            &copy; 2025 Zaenalos. All rights reserved.
          </p>
        </div>
      </footer>

      <script type="application/ld+json">{schemaJson}</script>
      <PortfolioClient />
    </>
  );
}
