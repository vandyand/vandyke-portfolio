# Portfolio Rewrite - Implementation Plan

## Overview

Phased build in `/home/kingjames/vandykeportfolio/portfolio`. Verification is live: `npm run dev`/`npm run build` probes, curl checks, and Playwright screenshots (both themes) — run by the orchestrator after each phase. Node project: lint = `npm run lint`, test/build gate = `npm run build` (static export success + typecheck).

## Prerequisites

- [ ] Node ≥20 available; `npx create-next-app@latest` reachable
- [ ] OPENROUTER_API_KEY (in `~/ascolais/.env` and shell env) for kling video generation
- [ ] Vercel CLI authenticated (org matches sibling demos); `gh` authed as vandyand
- [ ] ffmpeg installed (webm transcode + posters)
- [ ] Video-gen budget discipline: $8 all-in hard cap; record model, job ids, actual cost, wall time per video; max 2 paid attempts per video; generation commands must never echo OPENROUTER_API_KEY; `.env` is never copied into this repo or its Vercel env (the static site needs no secrets)

## Phase 0A: Source + preview deploy (unblocks the spikes)

- [x] Create GitHub repo `vandyand/vandyke-portfolio` (public), add origin, push branch after the scaffold lands
- [x] Create Vercel project `vandyke-portfolio` in the sibling-demos org, NO production domain attached
- [x] First preview deploy — its URL is the public HTTPS host for kling still images (Phase 0) and the Lighthouse target (Phase 4)

## Phase 0: Spike — prove the two risky seams

No production styling. Goal: a running scaffold + proof that (a) the agent-world embed works with good LCP behavior and (b) the kling video pipeline produces one usable hero loop this week.

- [x] Scaffold via a temp directory (this repo already contains `specs/` + `.git/`, so `create-next-app .` would refuse): `tmp=$(mktemp -d) && npx create-next-app@latest "$tmp/app" --ts --tailwind --app --no-src-dir --import-alias "@/*"`; copy generated files into repo root WITHOUT touching `specs/`; commit the package-lock; verify `npm run build` green; record exact versions
- [x] Embed spike: page with the Emberwick replay behind a static poster + play overlay (click-to-load). Decide and RECORD one stable embed strategy: (a) vendor the static replay assets (viewer html/js/css + demo.jsonl) into this repo's `public/emberwick/` — immune to agent-world redeploys (preferred), or (b) iframe pinned to an immutable Vercel deployment URL. Either way: `title` attr, minimal `sandbox` permissions, `referrerPolicy="no-referrer"`, explicit fallback poster. Verify with Playwright: (1) initial HTML paints the poster instantly, (2) click loads the town, (3) `prefers-reduced-motion` never auto-loads
- [x] Kling spike (~$0.65): generate ONE 5s seamless hero loop for agent-world — still: screenshot `agent-world/docs/screenshots/hero.png` (already exists) hosted publicly (it IS already public at https://agent-world-three.vercel.app — but that deploy doesn't include docs/; simplest: `vercel deploy` this repo's `public/` early or use any public host; decide and record); submit via `~/ascolais` REPL harness `dev/kling.clj` (same first/last frame URL, duration 5, std tier); poll; download mp4; `ffmpeg -an -c:v libvpx-vp9 -crf 34` → webm + poster jpg; put artifacts in `public/heroes/agent-world/{cover.mp4,cover.webm,poster.jpg}`
- [x] Record Phase 0 Findings in this file: versions, embed LCP notes, kling verdict + actual cost + wall time, chosen still-hosting path. If kling FAILS after 2 attempts: record error, switch Phase 3 video tasks to the documented fallback (animated CSS gradient heroes + posters) and demote videos to post-v1

### Verification (Phase 0)
- Shell: `npm run build` exit 0
- Playwright: poster-first render confirmed; embed loads on click
- IF the kling spike passed: `public/heroes/agent-world/cover.webm` exists and plays (bare `<video>` test page), file < 3 MB. IF it failed after 2 paid attempts: findings record the exact error + cost, and the poster-only hero fallback renders — v1 is NOT blocked on the video

### Phase 0 Findings (recorded 2026-07-02)

**Versions (scaffold):** Next.js 16.2.10, React 19.2.4, Tailwind ^4 (@tailwindcss/postcss), TypeScript ^5, ESLint 9 flat config, Node v20.19.6, npm 10.8.2. Scaffolded via temp-dir `create-next-app@latest --ts --tailwind --app --no-src-dir --import-alias "@/*"` then copied over repo root (specs/ + .git preserved). `npm run build` green. Note: first `npm install` hit a transient `ERR_SSL_CIPHER_OPERATION_FAILED`; plain retry succeeded.

**Repo/deploy:** GitHub `vandyand/vandyke-portfolio` (public) created; `main` + `feature/portfolio-rewrite` pushed; Vercel project `vandyke-portfolio` in team `team_bEgGjpllFdVpv9auXPS7vFZZ` (andrew-van-dykes-projects), GitHub repo auto-connected by `vercel link`. **Gotcha:** preview deploy URLs are behind Vercel Authentication (Standard Protection) → 302; the production alias is public. Public host used everywhere (kling stills, Playwright, future Lighthouse): **https://vandyke-portfolio.vercel.app** (prod deploy, no custom domain attached — cutover still Phase 5). Branch-preview URLs stay protected unless we disable protection in project settings; for Phase 4 Lighthouse use the prod alias.

**Embed strategy: (a) vendored — CHOSEN.** `agent-world/dist/*` (index.html, viewer.js, style.css, assets/map.json, replays/demo.jsonl — 416 KB total) copied into `public/emberwick/`. **Required patch:** viewer.js uses root-absolute paths; changed `fetch("/assets/map.json")` → `"assets/map.json"` and `DEFAULT_REPLAY "/replays/demo.jsonl"` → `"replays/demo.jsonl"` (relative to document base, works at any mount). The viewer's static-hosting fallback works as designed under `/emberwick/`: `/api/map` 404 → bundled map; WebSocket 404 → auto-loads demo replay (expected console noise, not a bug). Spike page `app/spike/page.tsx` + `EmberwickEmbed.tsx`: poster (`next/image`, priority) + play-overlay button; iframe (`title`, `sandbox="allow-scripts allow-same-origin"`, `referrerPolicy="no-referrer"`) mounts only on click — never auto-loads, so reduced-motion is safe by construction. **LCP note:** initial HTML is a static prerender with a priority `next/image` poster; zero iframe/JS-viewer cost until click. Playwright-verified on the prod URL: poster paints (`/tmp/pf-phase0-poster.png`), click loads town and replay ticks advance (134→147 in 2 s, `__aw` hook; `/tmp/pf-phase0-embed-loaded.png`), reduced-motion emulation → 0 iframes, poster stays (`/tmp/pf-phase0-reduced-motion.png`).

**Kling verdict: PASS on attempt 1.** Still hosting path: cropped the 1440×900 `hero.png` to the bare map canvas 16:9 (`ffmpeg crop=1056:594:16:107` → `public/heroes/agent-world/kling-still.png`) — composition much cleaner than the full-chrome screenshot — served from the prod alias. Submit via `dev.kling` harness against nREPL :7899. **Gotcha:** `dev.kling/api-key` → `secrets/load-secrets` threw `Illegal base64 character` (vault layer); worked around with `alter-var-root` to read `OPENROUTER_API_KEY` from the JVM env — future sessions need the same rebind or a fixed secrets store. Job `UStEm2yyzHgHGu1d3AS3`, model `kwaivgi/kling-v3.0-std`, 5 s, same first/last frame. **Cost $0.42 (usage.cost), ~2 min submit→downloaded mp4.** Output 1280×720 h264, 5.04 s, 922 KB; pixel-art style and all text preserved (frames inspected), motion subtle/ambient as prompted. Artifacts: `public/heroes/agent-world/{cover.mp4 922 KB, cover.webm 67 KB (vp9 crf34, -an), poster.jpg 49 KB}` — webm far under the 3 MB gate. Video budget used: $0.42 of $8.

**Phase 3 implication:** video-hero pipeline is proven end-to-end (screenshot → crop → prod-alias URL → kling → ffmpeg); proceed with up to 3 more heroes as planned.

## Phase 1: Foundation — tokens, themes, fonts, content layer, shell

- [x] Design tokens in `app/globals.css` (Tailwind 4 `@theme`): dark-leaning palette (near-black bg not #000, one saturated accent, careful neutrals) + full light equivalents under `[data-theme=light]` / media query; spacing/radii/shadow scale
- [x] Fonts via `next/font/local` or google: ONE display face + ONE mono (pick against mockups: display candidates Newsreader/Instrument Serif; mono Geist Mono/JetBrains Mono); body = system-ish sans or the display's text cut
- [x] Theme system: inline no-flash script in `app/layout.tsx` head (reads localStorage → data-theme, else system), `ThemeToggle` client component (sun/moon, persists, syncs with system changes), respects `prefers-color-scheme` by default
- [x] Content layer `lib/content.ts`: glob `content/projects/*.mdx`, gray-matter + zod schema {slug, title, tagline, year, role, stack[], links{live,repo}, hero{type: 'video'|'poster'|'embed', ...}, featured: bool, order, outcome, keywords[]}; build-time only; `lib/site.ts` for global data (nav, socials, services, proof stats, testimonials[] — empty)
- [x] Layout shell: header (name, nav: Work/About/Contact, theme toggle), footer (socials: GitHub vandyand, Upwork profile, email venturevd@gmail.com; colophon), `app/(site)` route group, 404 page
- [x] Seed 2 minimal project MDX files to prove the loader (agent-world + trading dashboard, content migrated from devfolio gatsby-config)

### Verification (Phase 1)
- Shell: `npm run build` + `npm run lint` exit 0
- Playwright: home renders shell in dark AND light (screenshots both; toggle click flips theme and persists across reload); no flash-of-wrong-theme on reload (check with CDP or visual)

## Phase 2: Home page

- [x] Hero: display-type headline (positioning: senior full-stack + AI/ML engineer building agentic systems and trading infrastructure), sub-line, primary CTA (mailto + Upwork link), availability badge; the Emberwick embed (Phase 0 pattern: poster → click/in-view load; muted; reduced-motion → poster) with caption linking to the case study
- [x] Proof bar: 3–4 real stats from `lib/site.ts` (years shipping, live demos count, domains: trading/LLM agents/full-stack) — no invented numbers
- [x] Selected work: featured projects (order from frontmatter) as large alternating rows (not uniform cards): poster/still, title, one-line outcome, stack chips, → case study
- [x] Services / How I work: 3 engagement shapes (build sprint / ongoing / audit+rescue) with short copy
- [x] Testimonials: render from site data ONLY if non-empty (it starts empty — verify section absent)
- [x] Contact section + footer CTA; skip-to-content link; keyboard/a11y pass on interactive elements

### Verification (Phase 2)
- Shell: build + lint green
- Playwright both themes: full-page screenshots desktop (1440) + mobile (390); hero poster paints; embed click-loads; all internal links resolve 200 in `npm run start`

## Phase 3: Case studies — template, content, archive, video heroes

- [ ] Case-study template `app/projects/[slug]/page.tsx` + MDX components: hero block (video loop if `hero.type==='video'` — poster+webm+mp4, `muted loop playsinline preload="none"`, lazy, reduced-motion→poster; else poster/embed), outcome line, Problem / What I built (architecture) / Outcome sections from MDX body, stack chips, live+repo links, next/prev nav, per-page metadata from frontmatter keywords
- [ ] Write all project MDX: agent-world (flagship, richest — architecture diagram image from its README story), avd-trading-dashboard, agentic-workflow-engine, multi-agent-research-pipeline, wellness-crew-chat, algo-trading-wfo-dashboard + shorter entries for marble-world, iwishtherewas, fintecfun, weather-map-explorer, travel-blog, dumb-meme (accurate content migrated from devfolio config + each -next repo's reality; NO invented outcomes — where no numbers exist, describe what it does)
- [ ] `/projects` archive: full table (year, title, stack, links) — every keyword crawlable; featured grid on top
- [ ] ONLY if the Phase 0 kling spike passed: generate up to 3 remaining video heroes (trading dashboard, workflow engine, research pipeline): still source = Playwright screenshot of each live demo → preview-deploy public host → kling loop → ffmpeg → `public/heroes/<slug>/`; all-in video budget (incl. Phase 0) ≤ $8, max 2 paid attempts per video, stop at cap; any failure → poster-only hero for that project and record the deferral (template handles both). If Phase 0 kling failed: poster-only heroes across the board, videos deferred post-v1
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
- Lighthouse scores recorded ≥95×4 on the two pages (preview deploy)
- Playwright CRAWL: every generated route renders 200 in both themes with zero console errors; sitemap contains every project slug; robots resolves; OG endpoint resolves for EVERY slug
- Playwright: reduced-motion emulation shows no autoplaying video/embed; keyboard-only nav reaches all links/toggle; both-theme screenshot suite archived to docs/screenshots/

## Phase 5: Deploy, domain cutover, docs

- [ ] Confirm the Phase 0A GitHub repo + Vercel project are connected; create the production deployment from the verified commit; verify on the vercel.app URL with Playwright (both themes, mobile+desktop)
- [ ] Open draft PR from feature branch (spec workflow), merge after verification
- [ ] Domain preflight BEFORE any move: record old Vercel team/project IDs, apex + www ownership, DNS records/nameservers/TTL, active aliases, cert status, and a unique old-site marker response (e.g. a string only devfolio serves)
- [ ] Cutover gate: do NOT attach domains unless the new vercel.app production URL passed curl, Playwright desktop/mobile both themes, Lighthouse gates, and sitemap/robots checks
- [ ] Cutover: attach BOTH `vandykeportfolio.com` and `www.vandykeportfolio.com` to the new project; verify both hosts via `curl -sI`, new-site marker body text, canonical redirect behavior, cert issuance, and Playwright
- [ ] Redirect inventory: list old live URLs (the Gatsby site is single-page + /blog with zero posts — expect only `/`), add redirects or record intentional 404 decisions
- [ ] README.md: stack, content-editing guide (how to add a project MDX, how to regen a video hero), theme system notes, deploy/rollback runbook
- [ ] Update memory: portfolio_infrastructure.md (new project↔dir↔Vercel↔domain map)

### Verification (Phase 5)
- `curl -sI` on BOTH https://vandykeportfolio.com and https://www.vandykeportfolio.com → 200 from the NEW deployment (new-site marker string present, canonical redirect correct)
- Playwright on the live domain: home + agent-world case study render both themes; embed loads; video hero plays
- Old devfolio Vercel project still exists (rollback intact)

## Rollout Plan

1. Production on vercel.app URL → verify → 2. domain cutover → verify → 3. announce/iterate.

## Rollback Plan

Re-attach BOTH apex and www to the recorded devfolio project id; verify the old-site marker on both hosts. Keep devfolio deployed and unmodified for ≥48h after cutover. New site remains on its vercel.app URL for fixing.
