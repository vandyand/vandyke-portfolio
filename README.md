# vandykeportfolio.com — portfolio site

Personal portfolio of Andrew Van Dyke. Next.js 16 (App Router, fully static) · Tailwind 4 · MDX · dual light/dark theming.

**Live:** https://vandyke-portfolio.vercel.app (pending domain cutover to vandykeportfolio.com)

## Stack

- **Next.js 16** App Router, all routes statically generated (30+ routes), View Transitions enabled
- **Tailwind 4** with a custom `@theme` token system — warm charcoal dark theme (default) + warm paper light theme, one ember accent
- **Fonts:** Newsreader (display) · Inter (body) · JetBrains Mono (labels/chips), self-hosted via next/font
- **Content as data:** `content/projects/*.mdx` with zod-validated frontmatter (`lib/content.ts`); rendering via next-mdx-remote/rsc
- **Video heroes:** kling-v3.0-std loops (5s, same first/last frame = seamless), delivered as poster + webm + mp4, reduced-motion safe
- **Emberwick embed:** the agent-world demo's static replay viewer vendored at `public/emberwick/` (click-to-load, sandboxed iframe)

## Editing content

Add a project: create `content/projects/<slug>.mdx` with frontmatter (see any existing file for the schema: title, tagline, year, role, stack, links, hero, featured, order, outcome, keywords) and a body with `## Problem`, `## What I built`, `## Outcome`. The archive, sitemap, OG image, and next/prev nav pick it up automatically.

Regenerate a video hero: screenshot the demo (16:9 crop) → host publicly (this project's prod deploy works: drop in `public/stills/`, `vercel deploy --prod`) → submit via `~/ascolais` `dev/kling.clj` (`submit-clip!` with the same URL as first+last frame, 5s, std tier ≈ $0.42) → `ffmpeg -i in.mp4 -an -c:v libvpx-vp9 -crf 34 cover.webm` + poster jpg → `public/heroes/<slug>/`.

## Theme system

System `prefers-color-scheme` by default; manual toggle persists to localStorage; no-flash inline script in `app/layout.tsx`. Tokens in `app/globals.css` (`[data-theme]` overrides).

## Deploy / rollback runbook

- Vercel project **vandyke-portfolio** (team andrew-van-dykes-projects). `vercel deploy --prod --yes` from repo root.
- **Domain cutover** (not yet executed): `vercel domains add vandykeportfolio.com --force` and same for `www.` from this linked repo — moves the domains from the old `devfolio` project (same team; Vercel nameservers, instant).
- **Rollback:** re-attach both domains to the `devfolio` project (dashboard or `vercel domains add` from a devfolio-linked dir). Old-site marker: response HTML contains `gatsby-global-css`. Keep devfolio deployed ≥48h post-cutover.

## Lighthouse (2026-07-02, production, mobile)

| Page | Perf | A11y | Best Practices | SEO |
|---|---|---|---|---|
| / | 98 | 100 | 100 | 100 |
| /projects/agent-world | 97 | 100 | 100 | 100 |
