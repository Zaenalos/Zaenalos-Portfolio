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
  rotationSpeed: {
    x: number;
    y: number;
  };
};

const COMPETITIONS_LIMIT = 3;

const fetchJSON = async <T,>(resourcePath: string): Promise<T> => {
  const response = await fetch(resourcePath);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${resourcePath}`);
  }
  return (await response.json()) as T;
};

export function PortfolioClient() {
  useEffect(() => {
    AOS.init({
      once: false,
      mirror: true,
      offset: 120,
      easing: "ease-in-out",
    });

    const hero = document.getElementById("home-hero");
    const nav = document.getElementById("mainNav");
    const competitionsListEl = document.getElementById("competitions-list");
    const competitionsControlsEl = document.getElementById(
      "competitions-controls",
    );
    const timelineListEl = document.getElementById("timeline-list");
    const timelineControlsEl = document.getElementById("timeline-controls");

    if (
      !hero ||
      !nav ||
      !competitionsListEl ||
      !competitionsControlsEl ||
      !timelineListEl ||
      !timelineControlsEl
    ) {
      return;
    }

    const cleanups: Array<() => void> = [];

    const checkIsMobile = () => window.innerWidth < 768;

    nav.style.display = "none";
    nav.classList.add("opacity-0", "-translate-y-4", "pointer-events-none");
    nav.classList.remove("opacity-100", "translate-y-0", "pointer-events-auto");

    let observer: IntersectionObserver | null = null;

    const setupNavigation = () => {
      if (checkIsMobile()) {
        nav.style.display = "none";
        if (observer) {
          observer.disconnect();
          observer = null;
        }
        return;
      }

      if (!observer) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
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
                return;
              }

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
            });
          },
          { threshold: [0, 0.1, 0.5, 1] },
        );

        observer.observe(hero);
      }
    };

    setupNavigation();

    const handleNavigationResize = () => {
      setupNavigation();
    };

    window.addEventListener("resize", handleNavigationResize);
    cleanups.push(() => {
      window.removeEventListener("resize", handleNavigationResize);
    });

    const allNavLinks =
      document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
    allNavLinks.forEach((link) => {
      const handleSmoothScroll = (event: MouseEvent) => {
        event.preventDefault();
        const targetId = link.getAttribute("href");
        if (!targetId) {
          return;
        }

        const targetSection = document.querySelector(targetId);
        targetSection?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      };

      link.addEventListener("click", handleSmoothScroll);
      cleanups.push(() => {
        link.removeEventListener("click", handleSmoothScroll);
      });
    });

    const zaenalosVM =
      document.querySelector<HTMLAnchorElement>("#zaenalos-vm");
    if (zaenalosVM) {
      const handleZaenalosVmClick = (event: MouseEvent) => {
        event.preventDefault();
        window.alert("Sorry, but this is a private project.");
      };

      zaenalosVM.addEventListener("click", handleZaenalosVmClick);
      cleanups.push(() => {
        zaenalosVM.removeEventListener("click", handleZaenalosVmClick);
      });
    }

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0f);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      5000,
    );
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.position = "fixed";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.zIndex = "-1";
    document.body.appendChild(renderer.domElement);

    const originalSizesByGeometry = new WeakMap<
      THREE.BufferGeometry,
      Float32Array
    >();

    const createStarField = (): StarLayer[] => {
      const starLayers: StarLayer[] = [];

      const distantGeometry = new THREE.BufferGeometry();
      const distantVertices: number[] = [];
      const distantColors: number[] = [];
      const distantSizes: number[] = [];
      const distantStarCount = 800;

      for (let i = 0; i < distantStarCount; i += 1) {
        const radius = 2000 + Math.random() * 2000;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);

        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);

        distantVertices.push(x, y, z);

        const colorVariation = Math.random();
        distantColors.push(
          0.8 + colorVariation * 0.2,
          0.9 + colorVariation * 0.1,
          1.0,
        );

        distantSizes.push(0.5 + Math.random() * 0.5);
      }

      distantGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(distantVertices, 3),
      );
      distantGeometry.setAttribute(
        "color",
        new THREE.Float32BufferAttribute(distantColors, 3),
      );
      distantGeometry.setAttribute(
        "size",
        new THREE.Float32BufferAttribute(distantSizes, 1),
      );

      const distantMaterial = new THREE.PointsMaterial({
        size: 1,
        sizeAttenuation: true,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
      });

      const distantStars = new THREE.Points(distantGeometry, distantMaterial);
      scene.add(distantStars);
      starLayers.push({
        stars: distantStars,
        rotationSpeed: { x: 0.0001, y: 0.0003 },
      });

      const mediumGeometry = new THREE.BufferGeometry();
      const mediumVertices: number[] = [];
      const mediumColors: number[] = [];
      const mediumSizes: number[] = [];
      const mediumStarCount = 400;

      for (let i = 0; i < mediumStarCount; i += 1) {
        const radius = 1200 + Math.random() * 1500;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);

        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);

        mediumVertices.push(x, y, z);

        const colorVariation = Math.random();
        mediumColors.push(0.7 + colorVariation * 0.3, 1.0, 1.0);

        mediumSizes.push(1 + Math.random() * 1.5);
      }

      mediumGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(mediumVertices, 3),
      );
      mediumGeometry.setAttribute(
        "color",
        new THREE.Float32BufferAttribute(mediumColors, 3),
      );
      mediumGeometry.setAttribute(
        "size",
        new THREE.Float32BufferAttribute(mediumSizes, 1),
      );

      const mediumMaterial = new THREE.PointsMaterial({
        size: 2,
        sizeAttenuation: true,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
      });

      const mediumStars = new THREE.Points(mediumGeometry, mediumMaterial);
      scene.add(mediumStars);
      starLayers.push({
        stars: mediumStars,
        rotationSpeed: { x: 0.0003, y: 0.0007 },
      });

      const closeGeometry = new THREE.BufferGeometry();
      const closeVertices: number[] = [];
      const closeColors: number[] = [];
      const closeSizes: number[] = [];
      const closeStarCount = 150;

      for (let i = 0; i < closeStarCount; i += 1) {
        const radius = 800 + Math.random() * 1000;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);

        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);

        closeVertices.push(x, y, z);

        const colorVariation = Math.random();
        closeColors.push(0.9 + colorVariation * 0.1, 1.0, 1.0);

        closeSizes.push(2 + Math.random() * 2);
      }

      closeGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(closeVertices, 3),
      );
      closeGeometry.setAttribute(
        "color",
        new THREE.Float32BufferAttribute(closeColors, 3),
      );
      closeGeometry.setAttribute(
        "size",
        new THREE.Float32BufferAttribute(closeSizes, 1),
      );

      const closeMaterial = new THREE.PointsMaterial({
        size: 3,
        sizeAttenuation: true,
        vertexColors: true,
        transparent: true,
        opacity: 1,
      });

      const closeStars = new THREE.Points(closeGeometry, closeMaterial);
      scene.add(closeStars);
      starLayers.push({
        stars: closeStars,
        rotationSpeed: { x: 0.0005, y: 0.001 },
      });

      return starLayers;
    };

    const starLayers = createStarField();

    camera.position.set(0, 0, 1000);

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      targetMouseX = (event.clientX / window.innerWidth - 0.5) * 20;
      targetMouseY = (event.clientY / window.innerHeight - 0.5) * 20;
    };

    document.addEventListener("mousemove", handleMouseMove);
    cleanups.push(() => {
      document.removeEventListener("mousemove", handleMouseMove);
    });

    let time = 0;
    let animationFrameId = 0;

    const animate = () => {
      animationFrameId = window.requestAnimationFrame(animate);
      time += 0.01;

      mouseX += (targetMouseX - mouseX) * 0.02;
      mouseY += (targetMouseY - mouseY) * 0.02;

      starLayers.forEach((layer, index) => {
        layer.stars.rotation.x += layer.rotationSpeed.x;
        layer.stars.rotation.y += layer.rotationSpeed.y;
        layer.stars.rotation.z += layer.rotationSpeed.x * 0.5;

        if (index > 0) {
          const sizeAttribute = layer.stars.geometry.getAttribute("size");
          if (sizeAttribute instanceof THREE.BufferAttribute) {
            const sizes = sizeAttribute.array as Float32Array;
            let originalSizes = originalSizesByGeometry.get(
              layer.stars.geometry,
            );
            if (!originalSizes) {
              originalSizes = Float32Array.from(sizes);
              originalSizesByGeometry.set(layer.stars.geometry, originalSizes);
            }

            for (let i = 0; i < sizes.length; i += 1) {
              const twinkle =
                Math.sin(time * (2 + index) + i * 0.1) * 0.3 + 0.7;
              sizes[i] = originalSizes[i] * twinkle;
            }

            sizeAttribute.needsUpdate = true;
          }
        }

        layer.stars.position.x = mouseX * (10 + index * 5);
        layer.stars.position.y = -mouseY * (10 + index * 5);
      });

      camera.position.x += (mouseX * 150 - camera.position.x) * 0.05;
      camera.position.y += (-mouseY * 150 - camera.position.y) * 0.05;
      camera.position.z = 1000 + Math.sin(time * 0.1) * 50;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    const handleSceneResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleSceneResize);
    cleanups.push(() => {
      window.removeEventListener("resize", handleSceneResize);
    });

    const renderCompetitions = (items: CompetitionItem[]) => {
      competitionsListEl.innerHTML = "";

      const createCompetitionItem = (competition: CompetitionItem) => {
        const item = document.createElement("li");
        item.className =
          "flex items-center justify-between rounded-lg border border-border/60 bg-background/40 px-3 py-2 text-sm text-muted-foreground transition hover:border-border hover:text-foreground";
        item.innerHTML = `
          <div class="flex items-center gap-3">
            <span class="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.6)]"></span>
            <span class="text-foreground">${competition.name}</span>
          </div>
          <span class="text-xs text-muted-foreground">${competition.year}</span>
        `;
        return item;
      };

      const toShow = items.slice(0, COMPETITIONS_LIMIT);
      for (const competition of toShow) {
        competitionsListEl.appendChild(createCompetitionItem(competition));
      }

      competitionsControlsEl.innerHTML = "";

      if (items.length > COMPETITIONS_LIMIT) {
        const button = document.createElement("button");
        button.className =
          "text-sm font-medium text-muted-foreground underline underline-offset-4 transition hover:text-foreground";
        button.textContent = "See more";

        button.addEventListener("click", () => {
          const expanded = button.dataset.expanded === "true";
          if (!expanded) {
            competitionsListEl.innerHTML = "";
            for (const competition of items) {
              competitionsListEl.appendChild(
                createCompetitionItem(competition),
              );
            }
            button.textContent = "See less";
            button.dataset.expanded = "true";
            return;
          }

          renderCompetitions(items);
        });

        competitionsControlsEl.appendChild(button);
      }
    };

    const renderTimeline = (items: TimelineItem[]) => {
      timelineListEl.innerHTML = "";

      const createTimelineItem = (timeline: TimelineItem) => {
        const item = document.createElement("div");
        item.className =
          "rounded-lg border border-border/60 bg-background/40 p-4 text-left text-sm text-muted-foreground transition hover:border-border";
        item.innerHTML = `
          <div class="flex flex-col gap-3">
            <div class="exp-head flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div class="flex items-center gap-3">
                <span class="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.6)]"></span>
                <h4 class="text-sm font-semibold text-foreground">${timeline.title}</h4>
              </div>
              <span class="text-xs text-muted-foreground">${timeline.date}</span>
            </div>
            <div class="exp-body hidden text-sm text-muted-foreground">${timeline.description}</div>
          </div>
        `;

        const head = item.querySelector<HTMLElement>(".exp-head");
        const body = item.querySelector<HTMLElement>(".exp-body");
        if (head && body) {
          const toggleBody = () => {
            const isHidden = body.classList.toggle("hidden");
            item.setAttribute("data-expanded", (!isHidden).toString());
          };
          head.style.cursor = "pointer";
          head.addEventListener("click", toggleBody);
        }

        return item;
      };

      const toShow = items.slice(0, COMPETITIONS_LIMIT);
      for (const timeline of toShow) {
        timelineListEl.appendChild(createTimelineItem(timeline));
      }

      timelineControlsEl.innerHTML = "";

      if (items.length > COMPETITIONS_LIMIT) {
        const button = document.createElement("button");
        button.className =
          "text-sm font-medium text-muted-foreground underline underline-offset-4 transition hover:text-foreground";
        button.textContent = "See more";

        button.addEventListener("click", () => {
          const expanded = button.dataset.expanded === "true";
          if (!expanded) {
            timelineListEl.innerHTML = "";
            for (const timeline of items) {
              timelineListEl.appendChild(createTimelineItem(timeline));
            }

            button.textContent = "See less";
            button.dataset.expanded = "true";
            return;
          }

          renderTimeline(items);
        });

        timelineControlsEl.appendChild(button);
      }
    };

    void Promise.all([
      fetchJSON<CompetitionItem[]>("/data/competitions.json"),
      fetchJSON<TimelineItem[]>("/data/timeline.json"),
    ])
      .then(([competitions, timeline]) => {
        renderCompetitions(competitions);
        renderTimeline(timeline);
      })
      .catch((error: unknown) => {
        console.error("Failed to load experience data", error);
      });

    return () => {
      window.cancelAnimationFrame(animationFrameId);

      if (observer) {
        observer.disconnect();
        observer = null;
      }

      scene.traverse((object) => {
        if (object instanceof THREE.Points) {
          object.geometry.dispose();
          const { material } = object;
          if (Array.isArray(material)) {
            material.forEach((entry) => {
              entry.dispose();
            });
            return;
          }

          material.dispose();
        }
      });

      renderer.dispose();
      renderer.domElement.remove();

      cleanups.forEach((cleanup) => {
        cleanup();
      });
    };
  }, []);

  return null;
}
