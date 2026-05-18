"use client";

import { useEffect } from "react";
import AOS from "aos";
import * as THREE from "three";

type CompetitionItem = {
  name: string;
  year: string;
};

type TimelineItem = {
  title: string;
  date: string;
  description: string;
};

type StarLayer = {
  stars: THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial>;
  rotationSpeed: { x: number; y: number };
};

const COMPETITIONS_LIMIT = 3;

const fetchJSON = async <T,>(resourcePath: string): Promise<T> => {
  const response = await fetch(resourcePath);
  if (!response.ok) throw new Error(`Failed to fetch ${resourcePath}`);
  return (await response.json()) as T;
};

export function PortfolioClient() {
  useEffect(() => {
    AOS.init({ once: false, mirror: true, offset: 120, easing: "ease-in-out" });

    const hero = document.getElementById("home-hero");
    const nav = document.getElementById("mainNav");
    const competitionsListEl = document.getElementById("competitions-list");
    const competitionsCtrlEl = document.getElementById("competitions-controls");
    const timelineListEl = document.getElementById("timeline-list");
    const timelineCtrlEl = document.getElementById("timeline-controls");

    if (
      !hero ||
      !nav ||
      !competitionsListEl ||
      !competitionsCtrlEl ||
      !timelineListEl ||
      !timelineCtrlEl
    ) {
      return;
    }

    const cleanups: Array<() => void> = [];
    const checkIsMobile = () => window.innerWidth < 768;

    // ── Navigation visibility ──────────────────────────────────────────────────
    nav.style.display = "none";
    nav.classList.add("opacity-0", "-translate-y-4", "pointer-events-none");
    nav.classList.remove("opacity-100", "translate-y-0", "pointer-events-auto");

    let observer: IntersectionObserver | null = null;

    const setupNavigation = () => {
      if (checkIsMobile()) {
        nav.style.display = "none";
        observer?.disconnect();
        observer = null;
        return;
      }

      if (!observer) {
        observer = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (checkIsMobile()) {
                nav.style.display = "none";
                return;
              }

              if (entry.intersectionRatio > 0.1) {
                nav.style.display = "none";
                nav.classList.add(
                  "opacity-0",
                  "-translate-y-4",
                  "pointer-events-none",
                );
                nav.classList.remove(
                  "opacity-100",
                  "translate-y-0",
                  "pointer-events-auto",
                );
              } else {
                nav.style.display = "flex";
                window.setTimeout(() => {
                  nav.classList.remove(
                    "opacity-0",
                    "-translate-y-4",
                    "pointer-events-none",
                  );
                  nav.classList.add(
                    "opacity-100",
                    "translate-y-0",
                    "pointer-events-auto",
                  );
                }, 10);
              }
            }
          },
          { threshold: [0, 0.1, 0.5, 1] },
        );
        observer.observe(hero);
      }
    };

    setupNavigation();
    window.addEventListener("resize", setupNavigation);
    cleanups.push(() => window.removeEventListener("resize", setupNavigation));

    // ── Smooth scroll for anchor links ─────────────────────────────────────────
    const allNavLinks =
      document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
    for (const link of allNavLinks) {
      const handleClick = (event: MouseEvent) => {
        event.preventDefault();
        const targetId = link.getAttribute("href");
        if (!targetId) return;
        document
          .querySelector(targetId)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      };
      link.addEventListener("click", handleClick);
      cleanups.push(() => link.removeEventListener("click", handleClick));
    }

    // ── Private project alert ──────────────────────────────────────────────────
    const xynthex =
      document.querySelector<HTMLAnchorElement>("#xynthex");
    if (xynthex) {
      const handleClick = (event: MouseEvent) => {
        event.preventDefault();
        window.alert("Sorry, but this is a private project.");
      };
      xynthex.addEventListener("click", handleClick);
      cleanups.push(() => xynthex.removeEventListener("click", handleClick));
    }

    // ── Three.js starfield ─────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0f);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      5000,
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    Object.assign(renderer.domElement.style, {
      position: "fixed",
      top: "0",
      left: "0",
      zIndex: "-1",
    });
    document.body.appendChild(renderer.domElement);

    const originalSizesByGeometry = new WeakMap<
      THREE.BufferGeometry,
      Float32Array
    >();

    const makeStarLayer = (
      count: number,
      minRadius: number,
      maxRadius: number,
      baseSize: number,
      opacity: number,
      rotSpeed: { x: number; y: number },
    ): StarLayer => {
      const geo = new THREE.BufferGeometry();
      const vertices: number[] = [];
      const colors: number[] = [];
      const sizes: number[] = [];

      for (let i = 0; i < count; i++) {
        const r = minRadius + Math.random() * maxRadius;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        vertices.push(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi),
        );
        const v = Math.random();
        colors.push(0.7 + v * 0.3, 0.9 + v * 0.1, 1.0);
        sizes.push(baseSize * (0.5 + Math.random()));
      }

      geo.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(vertices, 3),
      );
      geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
      geo.setAttribute("size", new THREE.Float32BufferAttribute(sizes, 1));

      const mat = new THREE.PointsMaterial({
        size: baseSize,
        sizeAttenuation: true,
        vertexColors: true,
        transparent: true,
        opacity,
      });
      const stars = new THREE.Points(geo, mat);
      scene.add(stars);
      return { stars, rotationSpeed: rotSpeed };
    };

    const starLayers: StarLayer[] = [
      makeStarLayer(800, 2000, 2000, 1, 0.6, { x: 0.0001, y: 0.0003 }),
      makeStarLayer(400, 1200, 1500, 2, 0.8, { x: 0.0003, y: 0.0007 }),
      makeStarLayer(150, 800, 1000, 3, 1.0, { x: 0.0005, y: 0.001 }),
    ];

    camera.position.set(0, 0, 1000);

    let mouseX = 0,
      mouseY = 0,
      targetX = 0,
      targetY = 0,
      time = 0,
      rafId = 0;

    const onMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 20;
      targetY = (e.clientY / window.innerHeight - 0.5) * 20;
    };
    document.addEventListener("mousemove", onMouseMove);
    cleanups.push(() => document.removeEventListener("mousemove", onMouseMove));

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      time += 0.01;
      mouseX += (targetX - mouseX) * 0.02;
      mouseY += (targetY - mouseY) * 0.02;

      starLayers.forEach((layer, i) => {
        layer.stars.rotation.x += layer.rotationSpeed.x;
        layer.stars.rotation.y += layer.rotationSpeed.y;
        layer.stars.rotation.z += layer.rotationSpeed.x * 0.5;

        if (i > 0) {
          const attr = layer.stars.geometry.getAttribute("size");
          if (attr instanceof THREE.BufferAttribute) {
            const sizes = attr.array as Float32Array;
            if (!originalSizesByGeometry.has(layer.stars.geometry)) {
              originalSizesByGeometry.set(
                layer.stars.geometry,
                Float32Array.from(sizes),
              );
            }
            // biome-ignore lint/style/noNonNullAssertion: value is guaranteed set on the line above
            const orig = originalSizesByGeometry.get(layer.stars.geometry)!;
            for (let j = 0; j < sizes.length; j++) {
              sizes[j] =
                orig[j] * (Math.sin(time * (2 + i) + j * 0.1) * 0.3 + 0.7);
            }
            attr.needsUpdate = true;
          }
        }

        layer.stars.position.x = mouseX * (10 + i * 5);
        layer.stars.position.y = -mouseY * (10 + i * 5);
      });

      camera.position.x += (mouseX * 150 - camera.position.x) * 0.05;
      camera.position.y += (-mouseY * 150 - camera.position.y) * 0.05;
      camera.position.z = 1000 + Math.sin(time * 0.1) * 50;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);
    cleanups.push(() => window.removeEventListener("resize", onResize));

    // ── Experience panels — simple render, no scroll-swap ─────────────────────
    //
    // Both panels (#experience-competitions and #experience-timeline) are always
    // visible. The old scroll-progress swap has been removed. We just populate
    // both lists immediately after the JSON loads.

    const toggleFooter = (ctrlEl: HTMLElement) => {
      ctrlEl.parentElement?.classList.toggle(
        "hidden",
        ctrlEl.childElementCount === 0,
      );
    };

    // ── Competition items ──────────────────────────────────────────────────────
    //
    // Emerald color theme to match the competitions panel border/header.
    // Classes use Tailwind utilities so JIT can scan them as static strings.
    const renderCompetitions = (items: CompetitionItem[]) => {
      competitionsListEl.innerHTML = "";

      const makeItem = ({ name, year }: CompetitionItem) => {
        const li = document.createElement("li");
        li.className =
          "group flex items-center justify-between rounded border border-emerald-500/10 bg-emerald-500/[0.03] px-3 py-2.5 font-mono text-xs transition-all hover:border-emerald-500/28 hover:bg-emerald-500/[0.07]";
        li.innerHTML = `
          <div class="flex min-w-0 items-center gap-2.5">
            <span class="shrink-0 text-emerald-500/45 transition-colors group-hover:text-emerald-400">›</span>
            <span class="text-foreground/65 transition-colors group-hover:text-foreground">${name}</span>
          </div>
          <span class="ml-4 shrink-0 text-muted-foreground/40">${year}</span>
        `;
        return li;
      };

      for (const item of items.slice(0, COMPETITIONS_LIMIT)) {
        competitionsListEl.appendChild(makeItem(item));
      }

      competitionsCtrlEl.innerHTML = "";

      if (items.length > COMPETITIONS_LIMIT) {
        const btn = document.createElement("button");
        btn.className =
          "font-mono text-xs text-muted-foreground/45 transition-colors hover:text-emerald-400";
        btn.textContent = "[ see more ]";

        btn.addEventListener("click", () => {
          const expanded = btn.dataset.expanded === "true";
          if (!expanded) {
            competitionsListEl.innerHTML = "";
            for (const item of items)
              competitionsListEl.appendChild(makeItem(item));
            btn.textContent = "[ see less ]";
            btn.dataset.expanded = "true";
          } else {
            renderCompetitions(items);
          }
        });

        competitionsCtrlEl.appendChild(btn);
      }

      toggleFooter(competitionsCtrlEl);
    };

    // ── Timeline items ─────────────────────────────────────────────────────────
    //
    // Purple color theme to match the timeline panel border/header.
    //
    // Bullet dot positioning:
    //   #timeline-list has pl-8 (32px) + before:left-4 (16px) vertical line.
    //   Each item is `relative` and uses before:-left-4 (-16px from item edge).
    //   Net position = 32 - 16 = 16px from list left = exactly on the line. ✓
    const renderTimeline = (items: TimelineItem[]) => {
      timelineListEl.innerHTML = "";

      const makeItem = ({ title, date, description }: TimelineItem) => {
        const div = document.createElement("div");
        div.className =
          "relative rounded border border-purple-500/10 bg-purple-500/[0.03] p-4 pl-4 text-xs " +
          "transition-all hover:border-purple-500/28 hover:bg-purple-500/[0.07] " +
          "before:absolute before:-left-4 before:top-[18px] before:h-2 before:w-2 " +
          "before:rounded-full before:bg-purple-400/65 before:ring-2 before:ring-purple-500/20";
        div.innerHTML = `
          <div class="flex flex-col gap-2.5">
            <div class="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
              <h4 class="font-mono font-semibold leading-snug text-foreground">${title}</h4>
              <span class="shrink-0 font-mono text-muted-foreground/40 sm:ml-4">${date}</span>
            </div>
            <p class="leading-relaxed text-muted-foreground/65">${description}</p>
          </div>
        `;
        return div;
      };

      for (const item of items.slice(0, COMPETITIONS_LIMIT)) {
        timelineListEl.appendChild(makeItem(item));
      }

      timelineCtrlEl.innerHTML = "";

      if (items.length > COMPETITIONS_LIMIT) {
        const btn = document.createElement("button");
        btn.className =
          "font-mono text-xs text-muted-foreground/45 transition-colors hover:text-purple-400";
        btn.textContent = "[ see more ]";

        btn.addEventListener("click", () => {
          const expanded = btn.dataset.expanded === "true";
          if (!expanded) {
            timelineListEl.innerHTML = "";
            for (const item of items)
              timelineListEl.appendChild(makeItem(item));
            btn.textContent = "[ see less ]";
            btn.dataset.expanded = "true";
          } else {
            renderTimeline(items);
          }
        });

        timelineCtrlEl.appendChild(btn);
      }

      toggleFooter(timelineCtrlEl);
    };

    void Promise.all([
      fetchJSON<CompetitionItem[]>("/data/competitions.json"),
      fetchJSON<TimelineItem[]>("/data/timeline.json"),
    ])
      .then(([competitions, timeline]) => {
        renderCompetitions(competitions);
        renderTimeline(timeline);
      })
      .catch((err: unknown) => {
        console.error("Failed to load experience data", err);
      });

    // ── Cleanup ────────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId);
      observer?.disconnect();

      scene.traverse((obj) => {
        if (obj instanceof THREE.Points) {
          obj.geometry.dispose();
          const { material } = obj;
          if (Array.isArray(material))
            material.forEach((m) => {
              m.dispose();
            });
          else material.dispose();
        }
      });

      renderer.dispose();
      renderer.domElement.remove();
      for (const cleanup of cleanups) cleanup();
    };
  }, []);

  return null;
}
