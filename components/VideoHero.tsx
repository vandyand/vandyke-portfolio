"use client";

import { useEffect, useRef } from "react";

type VideoHeroProps = {
  /** Base dir under /public, e.g. "/heroes/agent-world" —
   *  expects cover.webm + cover.mp4 inside. */
  base: string;
  poster: string;
  alt: string;
};

/**
 * Case-study video hero — a 5s seamless loop delivered as
 * poster + webm + mp4.
 *
 * - `preload="none"` + poster attr: first paint is always the static
 *   poster, zero video bytes until needed.
 * - IntersectionObserver starts playback only when scrolled into view,
 *   and pauses again off-screen.
 * - `prefers-reduced-motion`: playback is never started — the element
 *   stays a static poster.
 */
export default function VideoHero({ base, poster, alt }: VideoHeroProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            video.play().catch(() => {
              /* autoplay rejection → poster stays; acceptable */
            });
          } else {
            video.pause();
          }
        }
      },
      { threshold: 0.2 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      aria-label={alt}
      data-testid="video-hero"
      className="absolute inset-0 h-full w-full object-cover"
    >
      <source src={`${base}/cover.webm`} type="video/webm" />
      <source src={`${base}/cover.mp4`} type="video/mp4" />
    </video>
  );
}
