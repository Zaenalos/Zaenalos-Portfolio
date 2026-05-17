"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Certificate = {
  /** Short slug used as filename label, e.g. "uctf-2024" */
  id: string;
  title: string;
  issuer: string;
  date: string;
  /**
   * - "image" → <img> viewer
   * - "pdf"   → <iframe> pointed at src
   * - "link" → optional embed (issuer) or image fallback
   */
  type: "image" | "pdf" | "link";
  /**
   * image/pdf: path under /public
   * link: badge image URL (used as fallback if embedUrl is not provided)
   */
  src: string;
  /**
   * pdf: optional PNG thumbnail for the card preview
   * link: optional image override for the card preview
   */
  thumbnail?: string;
  /**
   * Optional issuer page (Credly, Microsoft, Oracle, etc.).
   * Used for "View credential" action in the lightbox.
   */
  link?: string;
  /**
   * Optional embeddable issuer URL. When set, the lightbox uses an iframe.
   */
  embedUrl?: string;
  /**
   * Raw HTML embed code from the issuer (e.g. Credly's <div> + <script> snippet,
   * or any other platform that provides an embed snippet rather than a clean URL).
   * Takes priority over embedUrl. Executed safely inside a sandboxed srcdoc iframe
   * so third-party scripts run without polluting the parent page.
   *
   * Example — Credly embed code:
   *   '<div data-iframe-width="150" data-share-badge-id="..." ...></div>
   *    <script async src="//cdn.credly.com/assets/utilities/embed.js"></script>'
   */
  embedCode?: string;
  tags?: string[];
};

const fetchJSON = async <T,>(resourcePath: string): Promise<T> => {
  const response = await fetch(resourcePath);
  if (!response.ok) throw new Error(`Failed to fetch ${resourcePath}`);
  return (await response.json()) as T;
};

// ─── Scroll helpers ───────────────────────────────────────────────────────────
const CARD_WIDTH = 272; // w-64 (256px) + gap-4 (16px)

export function CertificationsClient() {
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // createPortal requires document — guard against SSR
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let isActive = true;

    const loadCerts = async () => {
      try {
        const data = await fetchJSON<Certificate[]>(
          "/data/certifications.json",
        );
        if (isActive) setCerts(data);
      } catch (err) {
        console.error("Failed to load certifications data", err);
      } finally {
        if (isActive) setIsLoading(false);
      }
    };

    void loadCerts();

    return () => {
      isActive = false;
    };
  }, []);

  const openModal = (i: number) => setActiveIndex(i);
  const closeModal = () => setActiveIndex(null);

  const prev = useCallback(
    () =>
      setActiveIndex((i) =>
        i === null ? null : (i - 1 + certs.length) % certs.length,
      ),
    [certs.length],
  );
  const next = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i + 1) % certs.length)),
    [certs.length],
  );

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = activeIndex !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeIndex]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (activeIndex === null) return;
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, prev, next]);

  const scrollTrack = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -CARD_WIDTH : CARD_WIDTH,
      behavior: "smooth",
    });
  };

  const activeCert = activeIndex !== null ? certs[activeIndex] : null;

  if (isLoading) {
    return (
      <div className="flex items-center gap-3 rounded-lg border border-border/30 bg-black/40 px-5 py-4 font-mono text-xs text-muted-foreground/45">
        <span className="text-amber-500/50">$</span>
        <span>
          ls ~/certs/ <span className="text-muted-foreground/25">→</span>{" "}
          loading…
        </span>
      </div>
    );
  }

  if (certs.length === 0) {
    return (
      <div className="flex items-center gap-3 rounded-lg border border-border/30 bg-black/40 px-5 py-4 font-mono text-xs text-muted-foreground/45">
        <span className="text-amber-500/50">$</span>
        <span>
          ls ~/certs/ <span className="text-muted-foreground/25">→</span> no
          files found
        </span>
      </div>
    );
  }

  return (
    <>
      {/* ── Strip controls row ── */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground/40">
          <span className="text-amber-500/60">$</span>
          <span>
            ls -la ~/certs/{" "}
            <span className="text-muted-foreground/25">
              — {certs.length} file{certs.length !== 1 ? "s" : ""}
            </span>
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => scrollTrack("left")}
            aria-label="Scroll left"
            className="rounded border border-border/30 bg-background/40 px-2.5 py-1 font-mono text-xs text-muted-foreground/50 transition-colors hover:border-amber-500/30 hover:text-amber-300"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scrollTrack("right")}
            aria-label="Scroll right"
            className="rounded border border-border/30 bg-background/40 px-2.5 py-1 font-mono text-xs text-muted-foreground/50 transition-colors hover:border-amber-500/30 hover:text-amber-300"
          >
            →
          </button>
        </div>
      </div>

      {/* ── Film-strip scroller ── */}
      <div className="relative">
        {/* Edge fades to hint scrollability */}
        <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-10 bg-linear-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-10 bg-linear-to-l from-background to-transparent" />

        <div
          ref={scrollRef}
          className="flex snap-x snap-mandatory scrollbar-none gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {certs.map((cert, i) => (
            <CertCard
              key={cert.id}
              cert={cert}
              index={i}
              onClick={() => openModal(i)}
            />
          ))}
        </div>
      </div>

      {/* ── Keyboard hint ── */}
      <p className="mt-2 font-mono text-[10px] text-muted-foreground/30">
        click any card to open · use ← → and esc to navigate
      </p>

      {/*
       * Portal into document.body so the modal is completely outside the
       * AOS-animated section tree. AOS sets transform: translateY(...) on
       * sections as its initial animation state — any ancestor with a non-none
       * transform becomes the fixed-position containing block, which causes the
       * modal to drift with scroll. Portalling past all ancestors fixes this.
       */}
      {mounted &&
        activeCert !== null &&
        activeIndex !== null &&
        createPortal(
          <LightboxModal
            cert={activeCert}
            currentIndex={activeIndex}
            total={certs.length}
            onClose={closeModal}
            onPrev={prev}
            onNext={next}
          />,
          document.body,
        )}
    </>
  );
}

// ─── Certificate card ─────────────────────────────────────────────────────────

function CertCard({
  cert,
  index,
  onClick,
}: {
  cert: Certificate;
  index: number;
  onClick: () => void;
}) {
  const previewSrc =
    cert.thumbnail ??
    (cert.type === "image" || cert.type === "link" ? cert.src : null);
  const isLink = cert.type === "link";

  // Chrome bar label: "link" for linked issuers, extension for others
  const fileLabel =
    cert.type === "link"
      ? cert.id
      : `${cert.id}.${cert.type === "pdf" ? "pdf" : "png"}`;
  const typeLabel = isLink ? "LINK" : cert.type.toUpperCase();

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group flex w-64 shrink-0 snap-start flex-col rounded-lg border border-amber-500/18 bg-black/55",
        "text-left backdrop-blur transition-all duration-300",
        "hover:border-amber-500/40 hover:shadow-[0_0_24px_rgba(245,158,11,0.08),0_12px_28px_rgba(0,0,0,0.5)]",
        "focus-visible:ring-1 focus-visible:ring-amber-500/40 focus-visible:outline-none",
      )}
    >
      {/* Chrome bar */}
      <div className="flex items-center justify-between rounded-t-lg border-b border-amber-500/15 bg-amber-500/4 px-3 py-2">
        <span className="truncate font-mono text-[10px] text-muted-foreground/40">
          {fileLabel}
        </span>
        <span
          className={cn(
            "ml-2 shrink-0 rounded border px-1.5 py-0.5 font-mono text-[10px]",
            isLink
              ? "border-cyan-500/25 bg-cyan-500/5 text-cyan-400/60"
              : "border-amber-500/20 bg-amber-500/5 text-amber-400/55",
          )}
        >
          {typeLabel}
        </span>
      </div>

      {/* Preview */}
      <div
        className={cn(
          "relative aspect-4/3 w-full overflow-hidden",
          isLink ? "bg-zinc-800/50" : "bg-zinc-900/60",
        )}
      >
        {isLink && previewSrc ? (
          /* Link badge — centered, square image with padding */
          <div className="flex size-full items-center justify-center p-5">
            {/* biome-ignore lint/performance/noImgElement: link badge image */}
            <img
              src={previewSrc}
              alt={cert.title}
              className="h-full w-auto object-contain drop-shadow-lg transition-transform duration-500 group-hover:scale-[1.06]"
            />
          </div>
        ) : isLink ? (
          /* Link placeholder — shield/badge icon */
          <div className="flex size-full flex-col items-center justify-center gap-2.5 bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.01)_0px,rgba(255,255,255,0.01)_1px,transparent_1px,transparent_9px)]">
            <svg
              className="size-10 text-cyan-500/25"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
              />
            </svg>
            <span className="font-mono text-[10px] text-muted-foreground/25">
              link
            </span>
          </div>
        ) : previewSrc ? (
          // biome-ignore lint/performance/noImgElement: cert thumbnail
          <img
            src={previewSrc}
            alt={cert.title}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          /* Placeholder for PDFs without a thumbnail */
          <div className="flex size-full flex-col items-center justify-center gap-3 bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.012)_0px,rgba(255,255,255,0.012)_1px,transparent_1px,transparent_9px)]">
            <svg
              className="size-9 text-amber-500/25"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span className="font-mono text-[10px] text-muted-foreground/25">
              {cert.id}.pdf
            </span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/55 opacity-0 transition-opacity duration-250 group-hover:opacity-100">
          <span className="rounded border border-amber-500/45 bg-amber-500/10 px-3 py-1.5 font-mono text-xs text-amber-300">
            [ open ]
          </span>
        </div>

        {/* Index badge */}
        <span className="absolute top-2 left-2 rounded border border-amber-500/25 bg-black/60 px-1.5 py-0.5 font-mono text-[10px] text-amber-400/50 backdrop-blur">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Metadata */}
      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <p className="line-clamp-2 font-mono text-xs leading-snug font-semibold text-foreground/80">
          {cert.title}
        </p>
        <p className="font-mono text-[11px] text-muted-foreground/45">
          {cert.issuer} <span className="text-muted-foreground/25">·</span>{" "}
          {cert.date}
        </p>
        {cert.tags && cert.tags.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-1">
            {cert.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded border border-amber-500/15 bg-amber-500/5 px-1.5 py-0.5 font-mono text-[10px] text-amber-400/50"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </button>
  );
}

// ─── Lightbox modal ───────────────────────────────────────────────────────────

/**
 * Wraps a raw embed snippet in a minimal HTML document suitable for srcdoc.
 * The iframe sandbox allows scripts to run while keeping them isolated from
 * the parent page. Background is transparent so the dark modal bg shows through.
 */
function buildSrcdoc(embedCode: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  html,body{
    width:100%;height:100%;
    display:flex;align-items:center;justify-content:center;
    background:transparent;overflow:hidden;
  }
</style>
</head>
<body>${embedCode}</body>
</html>`;
}

function LightboxModal({
  cert,
  currentIndex,
  total,
  onClose,
  onPrev,
  onNext,
}: {
  cert: Certificate;
  currentIndex: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const previewSrc = cert.thumbnail ?? (cert.type === "link" ? cert.src : null);
  // Priority: embedCode (srcdoc) > embedUrl (src iframe) > image > placeholder
  const hasEmbedCode = cert.type === "link" && Boolean(cert.embedCode);
  const embedUrl =
    cert.type === "link" && !hasEmbedCode ? (cert.embedUrl ?? null) : null;
  const isBlockedEmbed = Boolean(embedUrl && /credly\.com/i.test(embedUrl));

  return (
    <>
      {/* Backdrop — separate from the panel so no flex centering quirks */}
      <div
        className="fixed inset-0 z-100 bg-black/88 backdrop-blur-md"
        onClick={onClose}
        aria-hidden
      />

      {/*
       * Panel — centered via top/left 50% + -translate-x/y-1/2.
       * This anchors directly to the viewport and is unaffected by any
       * ancestor CSS transforms (AOS, hover -translate-y, etc.).
       */}
      <div className="fixed top-1/2 left-1/2 z-101 flex h-[90vh] w-[94vw] max-w-5xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-lg border border-amber-500/22 bg-zinc-950 shadow-[0_0_60px_rgba(245,158,11,0.08),0_40px_80px_rgba(0,0,0,0.85)]">
        {/* ── Modal chrome bar ── */}
        <div className="flex shrink-0 items-center gap-3 border-b border-amber-500/15 bg-amber-500/4 px-4 py-3">
          <div className="flex gap-1.5">
            {/* Red close button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="size-3 rounded-full bg-red-500/70 transition-colors hover:bg-red-400"
            />
            <span className="size-3 rounded-full bg-amber-400/30" />
            <span className="size-3 rounded-full bg-green-500/30" />
          </div>

          <span className="ml-1 font-mono text-xs text-amber-500/50">
            ~/certs/{cert.id}
            {cert.type === "link"
              ? ".link"
              : `.${cert.type === "pdf" ? "pdf" : "png"}`}
          </span>

          {/* Nav controls */}
          <div className="ml-auto flex items-center gap-2 font-mono text-xs text-muted-foreground/40">
            <span className="tabular-nums">
              {String(currentIndex + 1).padStart(2, "0")} /{" "}
              {String(total).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={onPrev}
              aria-label="Previous certificate"
              className="rounded border border-border/30 bg-background/40 px-2 py-1 transition-colors hover:border-amber-500/30 hover:text-amber-300"
            >
              ←
            </button>
            <button
              type="button"
              onClick={onNext}
              aria-label="Next certificate"
              className="rounded border border-border/30 bg-background/40 px-2 py-1 transition-colors hover:border-amber-500/30 hover:text-amber-300"
            >
              →
            </button>
          </div>
        </div>

        {/* ── Body: viewer + sidebar ── */}
        <div className="flex flex-1 overflow-hidden">
          {/* Certificate viewer */}
          <div className="flex flex-1 items-center justify-center overflow-hidden bg-zinc-900/70 p-4">
            {cert.type === "link" ? (
              hasEmbedCode ? (
                /*
                 * Raw embed code path — srcdoc iframe.
                 * Scripts inside srcdoc execute within the iframe's own browsing
                 * context. sandbox="allow-scripts allow-same-origin" lets third-party
                 * badge scripts (Credly, Acclaim, etc.) run safely without touching
                 * the parent page's DOM or globals.
                 */
                <iframe
                  // biome-ignore lint/style/noNonNullAssertion: The embedCode is guaranteed by the hasEmbedCode condition
                  srcDoc={buildSrcdoc(cert.embedCode!)}
                  title={cert.title}
                  className="size-full rounded border-0"
                  sandbox="allow-scripts allow-same-origin allow-popups"
                />
              ) : embedUrl && !isBlockedEmbed ? (
                /* Clean embed URL path */
                <iframe
                  src={embedUrl}
                  title={cert.title}
                  className="size-full rounded border-0"
                  allow="fullscreen"
                />
              ) : previewSrc ? (
                // biome-ignore lint/performance/noImgElement: link badge display
                <img
                  src={previewSrc}
                  alt={cert.title}
                  className="max-h-[70%] max-w-[60%] object-contain drop-shadow-[0_8px_32px_rgba(0,0,0,0.7)]"
                />
              ) : (
                <div className="flex flex-col items-center gap-3 text-center">
                  <svg
                    className="size-14 text-cyan-500/30"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                    />
                  </svg>
                  <p className="font-mono text-xs text-muted-foreground/40">
                    badge preview unavailable
                  </p>
                </div>
              )
            ) : cert.type === "image" ? (
              // biome-ignore lint/performance/noImgElement: certificate display
              <img
                src={cert.src}
                alt={cert.title}
                className="max-h-full max-w-full rounded object-contain shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
              />
            ) : (
              <iframe
                src={cert.src}
                title={cert.title}
                className="size-full rounded border-0"
              />
            )}
          </div>

          {/* Sidebar — hidden on mobile */}
          <aside className="hidden w-56 shrink-0 flex-col justify-between border-l border-border/25 bg-black/70 p-4 md:flex">
            <div className="space-y-5">
              <div>
                <p className="font-mono text-[10px] text-muted-foreground/30">
                  {"// certificate"}
                </p>
                <p className="mt-1 font-mono text-sm leading-snug font-semibold text-foreground">
                  {cert.title}
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] text-muted-foreground/30">
                  {"// issued by"}
                </p>
                <p className="mt-1 font-mono text-xs text-muted-foreground/65">
                  {cert.issuer}
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] text-muted-foreground/30">
                  {"// date"}
                </p>
                <p className="mt-1 font-mono text-xs text-muted-foreground/65">
                  {cert.date}
                </p>
              </div>
              {cert.tags && cert.tags.length > 0 && (
                <div>
                  <p className="mb-2 font-mono text-[10px] text-muted-foreground/30">
                    {"// tags"}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {cert.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded border border-amber-500/18 bg-amber-500/5 px-1.5 py-0.5 font-mono text-[10px] text-amber-400/55"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <p className="font-mono text-[10px] text-muted-foreground/25">
                {"// keyboard: ← → esc"}
              </p>
              <a
                href={cert.link ?? cert.src}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "w-full font-mono text-xs",
                )}
              >
                {cert.type === "link" ? "view credential →" : "download →"}
              </a>
            </div>
          </aside>
        </div>

        {/* Mobile prev/next arrows */}
        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous"
          className="absolute top-1/2 left-3 -translate-y-1/2 rounded border border-border/30 bg-black/70 px-3 py-2 font-mono text-sm text-muted-foreground/55 backdrop-blur transition-colors hover:border-amber-500/35 hover:text-amber-300 md:hidden"
        >
          ←
        </button>
        <button
          type="button"
          onClick={onNext}
          aria-label="Next"
          className="absolute top-1/2 right-3 -translate-y-1/2 rounded border border-border/30 bg-black/70 px-3 py-2 font-mono text-sm text-muted-foreground/55 backdrop-blur transition-colors hover:border-amber-500/35 hover:text-amber-300 md:hidden"
        >
          →
        </button>
      </div>
    </>
  );
}
