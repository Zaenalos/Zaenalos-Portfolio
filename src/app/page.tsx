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
      <main>
        <section id="home" className="relative">
          <div
            id="home-hero"
            className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-8 text-center"
          >
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,255,255,0.12),transparent_60%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(0,140,255,0.15),transparent_65%)]" />
            </div>

            <h1
              className="mb-6 bg-linear-to-r from-cyan-300 to-blue-600 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent md:text-6xl"
              data-aos="zoom-in"
            >
              Zaenalos
            </h1>
            <p
              className="max-w-2xl text-lg leading-relaxed text-gray-300 md:text-xl"
              data-aos="fade-up"
              data-aos-delay="120"
            >
              Aspiring software engineer &amp; security enthusiast.
            </p>

            <a
              href="#about"
              className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-xs tracking-wider text-cyan-400 hover:text-cyan-200"
              data-aos="fade-up"
              data-aos-delay="260"
            >
              <span className="animate-pulse">SCROLL</span>
              <span className="block h-10 w-px bg-linear-to-b from-cyan-500 to-transparent" />
            </a>
          </div>

          <nav
            id="mainNav"
            className="pointer-events-none fixed top-0 right-0 left-0 z-50 hidden -translate-y-4 items-center justify-between bg-transparent px-8 py-4 opacity-0 transition-all duration-500 md:flex"
            aria-label="Main navigation"
            style={{ display: "none" }}
          >
            <a
              href="#home"
              className="transition-color text-2xl font-extrabold tracking-wide text-white"
            >
              Zaenalos
            </a>

            <div className="ml-auto flex items-center gap-8">
              <ul className="flex items-center gap-6 text-sm font-medium">
                <li>
                  <a
                    href="#about"
                    className="group relative inline-block h-5 overflow-hidden text-gray-300 transition-colors hover:text-white"
                  >
                    <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">
                      About
                    </span>
                    <span className="absolute top-0 left-0 block translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0">
                      About
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="#experiences"
                    className="group relative inline-block h-5 overflow-hidden text-gray-300 transition-colors hover:text-white"
                  >
                    <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">
                      Experiences
                    </span>
                    <span className="absolute top-0 left-0 block translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0">
                      Experiences
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="#projects"
                    className="group relative inline-block h-5 overflow-hidden text-gray-300 transition-colors hover:text-white"
                  >
                    <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">
                      Projects
                    </span>
                    <span className="absolute top-0 left-0 block translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0">
                      Projects
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </section>

        <section id="about" data-aos="fade-in" data-aos-duration="200">
          <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
            <h1
              className="mb-4 text-2xl font-bold md:text-4xl"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              About Me
            </h1>
            <p
              className="max-w-xs px-4 text-base leading-relaxed sm:max-w-md sm:text-lg sm:leading-relaxed md:max-w-2xl md:text-xl md:leading-loose lg:max-w-4xl"
              data-aos="zoom-in"
              data-aos-delay="400"
            >
              Hello! I am Rameses Chamian, a 4th-year Information Technology
              student at{" "}
              <a
                href="https://sjc.phinma.edu.ph/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-cyan-400 active:text-cyan-400"
              >
                PHINMA Saint Jude College
              </a>
              . I am an emerging IT professional with interests in software
              development, backend systems, and cybersecurity. My current focus
              includes low-level programming, reverse engineering, and code
              obfuscation, while I also pursue web development, Linux, and
              open-source projects as part of my continuous learning journey.
            </p>

            <div
              id="connections"
              className="mt-6 flex justify-center"
              data-aos="zoom-in"
              data-aos-delay="500"
            >
              <a
                href="https://www.linkedin.com/in/rameses-chamian/"
                target="_blank"
                rel="noopener noreferrer"
                className="mx-3 rounded-full bg-gray-800 p-2 transition-transform duration-300 hover:scale-110"
              >
                {
                  // biome-ignore lint/performance/noImgElement: Using img for SVG icons.
                  <img
                    src="/svgs/linkedin.svg"
                    alt="LinkedIn"
                    width={24}
                    height={24}
                  />
                }
              </a>
              <a
                href="https://github.com/Zaenalos"
                target="_blank"
                rel="noopener noreferrer"
                className="mx-3 rounded-full bg-gray-800 p-2 transition-transform duration-300 hover:scale-110"
              >
                {
                  // biome-ignore lint/performance/noImgElement: Using img for SVG icons.
                  <img
                    src="/svgs/github.svg"
                    alt="GitHub"
                    width={24}
                    height={24}
                  />
                }
              </a>
              <a
                href="https://www.facebook.com/Zaenalos"
                target="_blank"
                rel="noopener noreferrer"
                className="mx-3 rounded-full bg-gray-800 p-2 transition-transform duration-300 hover:scale-110"
              >
                {
                  // biome-ignore lint/performance/noImgElement: Using img for SVG icons.
                  <img
                    src="/svgs/facebook.svg"
                    alt="Facebook"
                    width={24}
                    height={24}
                  />
                }
              </a>
            </div>
          </div>
        </section>

        <section id="experiences" data-aos="fade-in" data-aos-duration="200">
          <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
            <h1
              className="mb-6 text-2xl font-bold md:text-4xl"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              Experiences
            </h1>

            <div
              className="mx-auto w-full max-w-6xl"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="grid grid-cols-1 items-stretch gap-8">
                <div className="px-4 py-3 md:px-6 md:py-4">
                  <h3 className="mb-4 text-xl font-bold">Competitions</h3>
                  <p className="mb-4 text-sm text-gray-400">
                    Selected events and competitions.
                  </p>
                  <ul
                    id="competitions-list"
                    className="exp-list space-y-3 text-left"
                  />
                  <div id="competitions-controls" className="mt-3" />
                </div>

                <div className="px-4 py-3 md:px-6 md:py-4">
                  <h3 className="mb-4 text-xl font-bold">Timeline</h3>
                  <p className="mb-4 text-sm text-gray-400">
                    Professional roles, internships, and notable contributions.
                  </p>
                  <div id="timeline-list" className="text-left" />
                  <div id="timeline-controls" className="mt-3" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" data-aos="fade-in" data-aos-duration="200">
          <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
            <h1
              className="mb-4 text-2xl font-bold md:text-4xl"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              Projects
            </h1>
            <div
              id="project-list"
              className="mx-auto max-w-3xl"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <ul className="space-y-4 text-left">
                <li className="rounded-lg border border-gray-600/20 bg-gray-800/10 p-4 backdrop-blur-sm transition-colors hover:border-gray-500/40 hover:bg-gray-700/20">
                  <a
                    href="#projects"
                    id="zaenalos-vm"
                    className="block cursor-pointer"
                  >
                    <span className="text-lg font-semibold text-purple-400 sm:text-xl md:text-xl">
                      Zaenalos VM
                    </span>
                    <span className="text-sm text-gray-300 sm:text-base md:text-base">
                      - A Lua obfuscation tool that protects code by
                      implementing virtualization.
                    </span>
                  </a>
                </li>
                <li className="rounded-lg border border-gray-600/20 bg-gray-800/10 p-4 backdrop-blur-sm transition-colors hover:border-gray-500/40 hover:bg-gray-700/20">
                  <a
                    href="https://github.com/Zaenalos/Lua-Lexer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <span className="text-lg font-semibold text-blue-400 sm:text-xl md:text-xl">
                      Lua Lexer
                    </span>
                    <span className="text-sm text-gray-300 sm:text-base md:text-base">
                      - A custom-built lexical analyzer for Lua written in
                      native Lua, designed for parsing and tokenizing Lua source
                      code.
                    </span>
                  </a>
                </li>
                <li className="rounded-lg border border-gray-600/20 bg-gray-800/10 p-4 backdrop-blur-sm transition-colors hover:border-gray-500/40 hover:bg-gray-700/20">
                  <a
                    href="https://github.com/Zaenalos/Zen"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <span className="text-lg font-semibold text-green-400 sm:text-xl md:text-xl">
                      Zen
                    </span>
                    <span className="text-sm text-gray-300 sm:text-base md:text-base">
                      - A reverse engineering project that analyzes and modifies
                      the popular 2D sandbox game, demonstrating practical
                      application of binary analysis skills.
                    </span>
                  </a>
                </li>
                <li className="rounded-lg border border-gray-600/20 bg-gray-800/10 p-4 backdrop-blur-sm transition-colors hover:border-gray-500/40 hover:bg-gray-700/20">
                  <a
                    href="https://github.com/Zaenalos/PH-Geolocation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <span className="text-lg font-semibold text-yellow-400 sm:text-xl md:text-xl">
                      PH-Geolocation
                    </span>
                    <span className="text-sm text-gray-300 sm:text-base md:text-base">
                      - A simple JavaScript library with an API interface
                      providing detailed geolocation data for the Philippines,
                      including regions, provinces, cities, municipalities, and
                      barangays. Structured with clean JSON formatting for
                      seamless integration.
                    </span>
                  </a>
                </li>
              </ul>
              <div className="mt-6 text-center">
                <a
                  href="https://github.com/Zaenalos?tab=repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm font-medium text-gray-400 underline underline-offset-4 transition-colors hover:text-white"
                >
                  View more on GitHub &rarr;
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="px-4 py-8">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="mb-4 md:mb-0">
              <p className="text-lg font-semibold">Zaenalos</p>
              <p className="text-sm text-gray-400">
                Aspiring software engineer &amp; security enthusiast.
              </p>
            </div>
            <div className="flex space-x-4">
              <a
                href="https://github.com/Zaenalos"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors hover:text-white"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/rameses-chamian/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors hover:text-white"
              >
                LinkedIn
              </a>
              <a
                href="https://www.facebook.com/Zaenalos"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors hover:text-white"
              >
                Facebook
              </a>
            </div>
          </div>
          <div className="mt-6 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
            <p>&copy; 2025 Zaenalos. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <script type="application/ld+json">{schemaJson}</script>
      <PortfolioClient />
    </>
  );
}
