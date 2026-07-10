"use client";

import { useState } from "react";
import Image from "next/image";
import type { Demo } from "@/lib/content";

/**
 * Tabbed showcase for a combined multi-demo project. A master header of tabs
 * switches between sub-demos; each panel is a big clickable hero (→ live demo)
 * plus a tight write-up.
 */
export default function AgenticDemoTabs({ demos }: { demos: Demo[] }) {
  const [active, setActive] = useState(0);
  const demo = demos[active];

  return (
    <section aria-label="Live demos" className="mt-10">
      {/* master header — tabs */}
      <div role="tablist" aria-label="Choose a demo" className="flex flex-wrap gap-x-1 gap-y-2 border-b border-line">
        {demos.map((d, i) => (
          <button
            key={d.key}
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={`-mb-px border-b-2 px-4 py-3 text-left font-mono text-xs uppercase tracking-wide transition-colors ${
              i === active
                ? "border-accent text-accent"
                : "border-transparent text-ink-faint hover:text-ink-muted"
            }`}
          >
            <span className="mr-2 text-ink-faint">0{i + 1}</span>
            {d.title}
          </button>
        ))}
      </div>

      {/* active panel */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:items-start">
        <a
          href={demo.live}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open the live demo of ${demo.title} (opens in a new tab)`}
          className="group relative block aspect-video overflow-hidden rounded-card border border-line bg-surface shadow-card transition-colors hover:border-accent"
        >
          <Image
            key={demo.key}
            src={demo.poster}
            alt={demo.alt ?? demo.title}
            fill
            sizes="(max-width: 1024px) 100vw, 680px"
            className="object-cover object-top"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-200 group-hover:bg-black/15"
          />
          <span className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-2 rounded-chip border border-accent/70 bg-surface/85 px-3 py-1.5 font-mono text-xs uppercase tracking-wide text-accent shadow-card backdrop-blur transition-colors group-hover:border-accent group-hover:text-accent-strong">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
            Live demo <span aria-hidden="true">↗</span>
          </span>
        </a>

        <div>
          <h3 className="font-display text-2xl text-ink">{demo.title}</h3>
          <p className="mt-3 leading-relaxed text-ink-muted">{demo.tagline}</p>
          <ul className="mt-5 space-y-3">
            {demo.highlights.map((h, k) => (
              <li key={k} className="flex gap-3 leading-relaxed text-ink-muted">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-xs uppercase tracking-wide">
            <a
              href={demo.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-accent transition-colors hover:text-accent-strong"
            >
              Open live demo <span aria-hidden="true">↗</span>
            </a>
            {demo.repo && (
              <a
                href={demo.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-ink-muted transition-colors hover:text-accent"
              >
                Source <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
