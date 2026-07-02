# Portfolio Rewrite - Implementation Plan

## Overview

Phased build in `/home/kingjames/vandykeportfolio/portfolio`. Verification is live: `npm run dev`/`npm run build` probes, curl checks, and Playwright screenshots (both themes) — run by the orchestrator after each phase. Node project: lint = `npm run lint`, test/build gate = `npm run build` (static export success + typecheck).

## Prerequisites

- [ ] Node ≥20 available; `npx create-next-app@latest` reachable
- [ ] OPENROUTER_API_KEY (in `~/ascolais/.env` and shell env) for kling video generation
- [ ] Vercel CLI authenticated (org matches sibling demos); `gh` authed as vandyand
- [ ] ffmpeg installed (webm transcode + posters)

## Phase 0: Spike — prove the two risky seams

No production styling. Goal: a running scaffold + proof that (a) the agent-world embed works with good LCP behavior and (b) the kling video pipeline produces one usable hero loop this week.

- [ ] `npx create-next-app@latest . --ts --tailwind --app --no-src-dir --import-alias "@/*"` (accept Tailwind 4 / Next 16 defaults); verify `npm run build` green; record exact versions
- [ ] Embed spike: page with `<iframe src="https://agent-world-three.vercel.app" loading="lazy">` behind a static poster + play overlay (click-to-load pattern); verify with Playwright that (1) initial HTML paints the poster instantly, (2) clicking loads the live town, (3) `prefers-reduced-motion` never auto-loads
- [ ] Kling spike (~$0.65): generate ONE 5s seamless hero loop for agent-world — still: screenshot `agent-world/docs/screenshots/hero.png` (already exists) hosted publicly (it IS already public at https://agent-world-three.vercel.app — but that deploy doesn't include docs/; simplest: `vercel deploy` this repo's `public/` early or use any public host; decide and record); submit via `~/ascolais` REPL harness `dev/kling.clj` (same first/last frame URL, duration 5, std tier); poll; download mp4; `ffmpeg -an -c:v libvpx-vp9 -crf 34` → webm + poster jpg; put artifacts in `public/heroes/agent-world/{cover.mp4,cover.webm,poster.jpg}`
- [ ] Record Phase 0 Findings in this file: versions, embed LCP notes, kling verdict + actual cost + wall time, chosen still-hosting path. If kling FAILS after 2 attempts: record error, switch Phase 3 video tasks to the documented fallback (animated CSS gradient heroes + posters) and demote videos to post-v1

### Verification (Phase 0)
- Shell: `npm run build` exit 0
- Playwright: poster-first render confirmed; embed loads on click; `public/heroes/agent-world/cover.webm` exists and plays (load in a bare `<video>` test page), file < 3 MB

## Phase 1: Foundation — tokens, themes, fonts, content layer, shell

- [ ] Design tokens in `app/globals.css` (Tailwind 4 `@theme`): dark-leaning palette (near-black bg not #000, one saturated accent, careful neutrals) + full light equivalents under `[data-theme=light]` / media query; spacing/radii/shadow scale
- [ ] Fonts via `next/font/local` or google: ONE display face + ONE mono (pick against mockups: display candidates Newsreader/Instrument Serif; mono Geist Mono/JetBrains Mono); body = system-ish sans or the display's text cut
- [ ] Theme system: inline no-flash script in `app/layout.tsx` head (reads localStorage → data-theme, else system), `ThemeToggle` client component (sun/moon, persists, syncs with system changes), respects `prefers-color-scheme` by default
- [ ] Content layer `lib/content.ts`: glob `content/projects/*.mdx`, gray-matter + zod schema {slug, title, tagline, year, role, stack[], links{live,repo}, hero{type: 'video'|'poster'|'embed', ...}, featured: bool, order, outcome, keywords[]}; build-time only; `lib/site.ts` for global data (nav, socials, services, proof stats, testimonials[] — empty)
- [ ] Layout shell: header (name, nav: Work/About/Contact, theme toggle), footer (socials: GitHub vandyand, Upwork profile, email venturevd@gmail.com; colophon), `app/(site)` route group, 404 page
- [ ] Seed 2 minimal project MDX files to prove the loader (agent-world + trading dashboard, content migrated from devfolio gatsby-config)

### Verification (Phase 1)
- Shell: `npm run build` + `npm run lint` exit 0
- Playwright: home renders shell in dark AND light (screenshots both; toggle click flips theme and persists across reload); no flash-of-wrong-theme on reload (check with CDP or visual)

## Phase 2: Home page

- [ ] Hero: display-type headline (positioning: senior full-stack + AI/ML engineer building agentic systems and trading infrastructure), sub-line, primary CTA (mailto + Upwork link), availability badge; the Emberwick embed (Phase 0 pattern: poster → click/in-view load; muted; reduced-motion → poster) with caption linking to the case study
- [ ] Proof bar: 3–4 real stats from `lib/site.ts` (years shipping, live demos count, domains: trading/LLM agents/full-stack) — no invented numbers
- [ ] Selected work: featured projects (order from frontmatter) as large alternating rows (not uniform cards): poster/still, title, one-line outcome, stack chips, → case study
- [ ] Services / How I work: 3 engagement shapes (build sprint / ongoing / audit+rescue) with short copy
- [ ] Testimonials: render from site data ONLY if non-empty (it starts empty — verify section absent)
- [ ] Contact section + footer CTA; skip-to-content link; keyboard/a11y pass on interactive elements

### Verification (Phase 2)
- Shell: build + lint green
- Playwright both themes: full-page screenshots desktop (1440) + mobile (390); hero poster paints; embed click-loads; all internal links resolve 200 in `npm run start`

## Phase 3: Case studies — template, content, archive, video heroes

- [ ] Case-study template `app/projects/[slug]/page.tsx` + MDX components: hero block (video loop if `hero.type==='video'` — poster+webm+mp4, `muted loop playsinline preload="none"`, lazy, reduced-motion→poster; else poster/embed), outcome line, Problem / What I built (architecture) / Outcome sections from MDX body, stack chips, live+repo links, next/prev nav, per-page metadata from frontmatter keywords
- [ ] Write all project MDX: agent-world (flagship, richest — architecture diagram image from its README story), avd-trading-dashboard, agentic-workflow-engine, multi-agent-research-pipeline, wellness-crew-chat, algo-trading-wfo-dashboard + shorter entries for marble-world, iwishtherewas, fintecfun, weather-map-explorer, travel-blog, dumb-meme (accurate content migrated from devfolio config + each -next repo's reality; NO invented outcomes — where no numbers exist, describe what it does)
- [ ] `/projects` archive: full table (year, title, stack, links) — every keyword crawlable; featured grid on top
- [ ] Generate remaining 3 video heroes via the Phase 0 kling recipe (trading dashboard, workflow engine, research pipeline): still source = Playwright screenshot of each live demo → public host → kling loop → ffmpeg → `public/heroes/<slug>/`; budget ≤ $5 total, stop at cap; any failure → poster-only hero for that project (template handles both)
- [ ] OG images: `next/og` dynamic per project (title + stack on brand background)

### Verification (Phase 3)
- Shell: build green (all MDX compiles), lint green
- Playwright: agent-world case study both themes; video hero plays (or poster fallback verified); archive table renders all projects; next/prev nav cycles; OG image endpoint returns image/png for 2 slugs
- Video artifacts: each `public/heroes/*/cover.webm` < 3 MB, poster < 200 KB

## Phase 4: Polish — motion, SEO, performance

- [ ] Motion pass (restrained): scroll-driven reveals on section entry (CSS scroll-driven where possible, motion/react for the rest, all gated on prefers-reduced-motion), View Transitions between pages, hover micro-interactions on work rows/chips
- [ ] SEO: JSON-LD Person + per-page metadata, sitemap.ts, robots.ts, canonical URLs (https://www.vandykeportfolio.com), descriptive alt text everywhere
- [ ] Performance: `next/image` for all rasters, font subsetting, verify no layout shift from theme script, bundle check (no accidental client components), Lighthouse via Playwright/PageSpeed on production preview: ≥95 Perf/A11y/BP/SEO on home + agent-world case study (record numbers)
- [ ] Optional if time (cut first): cmd-K palette (navigate projects, toggle theme, copy email)
- [ ] Cross-check: every requirement in research.md "Functional" list has shipped or has a recorded deferral

### Verification (Phase 4)
- Lighthouse scores recorded ≥95×4 on the two pages (production preview deploy)
- Playwright: reduced-motion emulation shows no autoplaying video/embed; keyboard-only nav reaches all links/toggle; both-theme screenshot suite archived to docs/screenshots/

## Phase 5: Deploy, domain cutover, docs

- [ ] Vercel: create project `vandyke-portfolio` (same org as siblings), production deploy, verify on the vercel.app URL with Playwright (both themes, mobile+desktop)
- [ ] GitHub: create repo vandyand/vandyke-portfolio, push, open draft PR from feature branch (spec workflow), merge after verification
- [ ] Domain cutover: add vandykeportfolio.com + www to the new project (Vercel moves domains atomically between projects in the same org); verify https://www.vandykeportfolio.com serves the new site (curl + Playwright); document instant rollback (re-add domain to devfolio project) in README
- [ ] README.md: stack, content-editing guide (how to add a project MDX, how to regen a video hero), theme system notes, deploy/rollback runbook
- [ ] Update memory: portfolio_infrastructure.md (new project↔dir↔Vercel↔domain map)

### Verification (Phase 5)
- `curl -sI https://www.vandykeportfolio.com` → 200 from the NEW deployment (check a marker header/string)
- Playwright on the live domain: home + agent-world case study render both themes; embed loads; video hero plays
- Old devfolio Vercel project still exists (rollback intact)

## Rollout Plan

1. Production on vercel.app URL → verify → 2. domain cutover → verify → 3. announce/iterate.

## Rollback Plan

Re-attach vandykeportfolio.com to the devfolio Vercel project (dashboard/CLI, ~1 min). New site remains on its vercel.app URL for fixing.
