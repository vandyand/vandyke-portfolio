import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    /* React <ViewTransition> — cross-fade between routes (wired in
       app/layout.tsx; duration + reduced-motion off-switch live in
       app/globals.css). */
    viewTransition: true,
  },
};

export default nextConfig;
