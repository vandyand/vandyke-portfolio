import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    /* React <ViewTransition> — cross-fade between routes (wired in
       app/layout.tsx; duration + reduced-motion off-switch live in
       app/globals.css). */
    viewTransition: true,
  },
  // The three standalone agentic demos were merged into one tabbed showcase.
  async redirects() {
    return ["agentic-workflow-engine", "multi-agent-research-pipeline", "wellness-crew-chat"].map(
      (slug) => ({ source: `/projects/${slug}`, destination: "/projects/agentic-ai", permanent: true }),
    );
  },
};

export default nextConfig;
