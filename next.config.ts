import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets CI or a local verification run use an isolated cache when a stale
  // Windows file handle prevents Next from replacing the default `.next` dir.
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
  experimental: {
    /* React <ViewTransition> — cross-fade between routes (wired in
       app/layout.tsx; duration + reduced-motion off-switch live in
       app/globals.css). */
    viewTransition: true,
  },
  // Standalone demos that were merged into tabbed showcases.
  async redirects() {
    const merged: Record<string, string[]> = {
      "agentic-ai": ["agentic-workflow-engine", "multi-agent-research-pipeline", "wellness-crew-chat"],
      "algo-trading": ["algo-trading-wfo-dashboard", "avd-trading-dashboard"],
    };
    return Object.entries(merged).flatMap(([dest, slugs]) =>
      slugs.map((slug) => ({ source: `/projects/${slug}`, destination: `/projects/${dest}`, permanent: true })),
    );
  },
};

export default nextConfig;
