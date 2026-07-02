"use client";

import Image from "next/image";
import { useState } from "react";
import poster from "@/public/heroes/agent-world/poster-embed.png";

/**
 * Emberwick hero embed — poster-first, click-to-load iframe.
 *
 * The Emberwick replay viewer is vendored into /public/emberwick
 * (same-origin static copy), so the iframe never depends on the
 * agent-world Vercel deployment. Nothing loads until the visitor
 * clicks — LCP stays a static image, and prefers-reduced-motion
 * users are never surprised by an auto-animating canvas.
 */
export default function EmberwickEmbed() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className="relative aspect-[16/10] w-full overflow-hidden rounded-card border border-line bg-[#14181c] shadow-card"
      data-testid="emberwick-embed"
    >
      {loaded ? (
        <iframe
          /* ?replay= forces replay mode deterministically — without it the
             viewer first tries a WebSocket and only falls back when the host
             rejects the upgrade (Vercel does, `next start` never does). */
          src="/emberwick/index.html?replay=replays/demo.jsonl"
          title="Emberwick — Agent World live town replay"
          sandbox="allow-scripts allow-same-origin"
          referrerPolicy="no-referrer"
          className="absolute inset-0 h-full w-full border-0"
          data-testid="emberwick-iframe"
        />
      ) : (
        <button
          type="button"
          onClick={() => setLoaded(true)}
          aria-label="Load the interactive Emberwick town replay"
          data-testid="emberwick-play"
          className="group absolute inset-0 h-full w-full cursor-pointer border-0 bg-transparent p-0"
        >
          <Image
            src={poster}
            alt="Pixel-art overview of the Emberwick town — poster frame"
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1104px"
            className="object-cover"
          />
          <span className="absolute inset-0 grid place-items-center bg-black/10 transition-colors group-hover:bg-black/25">
            <span className="inline-flex items-center gap-2.5 rounded-full bg-black/70 px-5 py-3 text-sm font-medium text-white ring-1 ring-white/25 backdrop-blur-sm transition-transform duration-200 group-hover:scale-[1.04]">
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M4 2l10 6-10 6V2z" />
              </svg>
              Load the town
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
