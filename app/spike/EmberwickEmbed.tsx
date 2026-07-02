"use client";

import Image from "next/image";
import { useState } from "react";
import poster from "@/public/heroes/agent-world/poster-embed.png";

/**
 * Phase 0 embed spike — poster-first, click-to-load iframe.
 *
 * Strategy (a): the Emberwick replay viewer is vendored into
 * /public/emberwick (same-origin static copy), so the iframe never
 * depends on the agent-world Vercel deployment. Nothing loads until the
 * visitor clicks, so prefers-reduced-motion users are never surprised by
 * an auto-animating canvas.
 */
export default function EmberwickEmbed() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        aspectRatio: "16 / 10",
        width: "100%",
        overflow: "hidden",
        borderRadius: 8,
        background: "#14181c",
      }}
      data-testid="emberwick-embed"
    >
      {loaded ? (
        <iframe
          src="/emberwick/index.html"
          title="Emberwick — Agent World live town replay"
          sandbox="allow-scripts allow-same-origin"
          referrerPolicy="no-referrer"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            border: 0,
          }}
          data-testid="emberwick-iframe"
        />
      ) : (
        <button
          type="button"
          onClick={() => setLoaded(true)}
          aria-label="Load the interactive Emberwick town replay"
          data-testid="emberwick-play"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            padding: 0,
            border: 0,
            cursor: "pointer",
            background: "transparent",
          }}
        >
          <Image
            src={poster}
            alt="Pixel-art overview of the Emberwick town — poster frame"
            fill
            priority
            sizes="(max-width: 960px) 100vw, 960px"
            style={{ objectFit: "cover" }}
          />
          <span
            style={{
              position: "absolute",
              inset: 0,
              display: "grid",
              placeItems: "center",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.25rem",
                borderRadius: 999,
                background: "rgba(0,0,0,0.65)",
                color: "#fff",
                fontSize: "1rem",
              }}
            >
              <svg
                width="16"
                height="16"
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
