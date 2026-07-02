# Portfolio Rewrite - Research

## Problem Statement

vandykeportfolio.com is a 2020-era Gatsby 2 / React 16 / Tailwind 1 template (Ryan Fitzgerald "Devfolio") with projects hardcoded in `gatsby-config.js`, external-link-only project cards, a dead blog, placeholder GA/siteUrl metadata, and Node 16 + OpenSSL-legacy build hacks. Andrew has outgrown it. Goal: a **highly customized, high-quality** contractor portfolio that (a) converts Upwork clients doing due-diligence, (b) surfaces LangGraph/AutoGen/CrewAI/trading keywords, (c) showcases the new flagship agent-world demo, and (d) meets Andrew's explicit requirements: **video hero sections on several pages, a polished page per demo in a consistent style, and system light/dark theming with a manual toggle**.

## Codebase Context

- Current site: `/home/kingjames/vandykeportfolio/devfolio/` (repo github.com/vandyand/devfolio, Vercel auto-deploy, domain vandykeportfolio.com). Its `gatsby-config.js` `siteMetadata` holds the canonical content to migrate: 11 projects (name/subtitle/description/link), experience history, skills, about text.
- Sibling demos (each own repo + Vercel project, org `team_bEgGjpllFdVpv9auXPS7vFZZ`, GitHub `vandyand`): agentic-workflow-engine, algo-trading-wfo-dashboard, wellness-crew-chat (multi-agent chatbot), multi-agent-research-pipeline — all Next.js 16 + React 19 + Tailwind 4. Plus external: avd-trading-dashboard, marbleworld.studio, iwishtherewas.xyz, fintecfun, weather-map-explorer, vandyketravelblog, dumb-meme.
- **NEW flagship (built this session)**: `agent-world` — Emberwick, basilisp polylith LLM town (LangGraph/AutoGen/CrewAI/OpenRouter), live at https://agent-world-three.vercel.app, repo github.com/vandyand/agent-world. Replay is fully static and embeds cleanly (plain canvas viewer, no build).
- This repo: greenfield at `/home/kingjames/vandykeportfolio/portfolio`, branch `feature/portfolio-rewrite`.

## Web Research Findings (2026-07, full synthesis in session)

### Exemplars and the governing rule
- bruno-simon.com (playable hero), rauno.me (**90% familiar / 10% novel** rule; /craft lab grid), joshwcomeau.com (interactive explainers; "few projects, deeply documented"), leerob.com (minimal text-first Next.js reference, View Transitions on App Router), brittanychiang.com (most-cloned — resembling it now reads *template*), paco.me (one-time load animation restraint), tamalsen.dev (terminal aesthetic as garnish).
- 2026 quality signals: typography-led design (one display face + one mono), dark-first with `prefers-color-scheme` both-ways, CSS scroll-driven animations + View Transitions API (native, cross-browser since 2025), **one interactive "whoa" hero + calm everything else**, case-study pages over card grids, live/proof-of-liveness elements for AI-era credibility.
- Contractor conversion (Forbes/Twine/Bomberbot synthesis): testimonials above the fold lift conversion (+34% WikiJob case), 3–5 outcome-focused case studies, one obvious CTA per page, per-case-study exact-match keyword metadata + JSON-LD, archive table for keyword surface.

### Stack verdict: Next.js 16 App Router + Tailwind 4 + MDX + Motion (NOT Astro)
- The signature hero is React-heavy → Astro would ship the React island anyway; monoculture with the 4 sibling Next.js demos = one upgrade cadence; Vercel-first; 100 Lighthouse achievable with static rendering + `next/font` + lazy-loaded hero canvas behind a poster.
- Content layer: `content/projects/*.mdx` with zod-validated frontmatter — git is the CMS; add a project = add a file (kills the gatsby-config.js hardcoding problem).
- Motion: `motion` v12+ (renamed Framer Motion, React 19/RSC support, `LazyMotion`/`m` for bundle size); native CSS scroll-driven animations where possible.

### Video hero pipeline (Brian Scaturro's storyboard tech — verified in ~/ascolais)
- Brian's live artifact (brianscaturro.com/posts/cogs-agents-as-channels/): `<video muted loop playsinline preload="none" poster=...>` with `cover.mp4` (2 MB) + `cover.webm` (261 KB) + poster jpg, lazy-loaded. That's the delivery format to copy.
- Generation recipe (standalone REPL harness `~/ascolais/development/src/dev/kling.clj`, needs only OPENROUTER_API_KEY which is in `~/ascolais/.env`): still image (gpt-image-2, ~$0.20) hosted at a public HTTPS URL → `POST openrouter.ai/api/v1/videos` model `kwaivgi/kling-v3.0-std`, **same URL as first_frame AND last_frame = seamless loop**, duration 5s, ~$0.42/render, ~1–5 min/job → download mp4 → `ffmpeg` → webm + poster. Cost for 4 heroes with rerolls ≈ $4–7.
- Gotchas (documented in ascolais): public HTTPS image URLs mandatory (base64/localhost silently degrade), per-key spend limit 403 ≠ empty account, keep prompts to pure look/motion language (content policy), poll in separate evals (clj-nrepl-eval 120s timeout).

## Requirements

### Functional
1. **Pages**: Home (hero + proof bar + selected work + services + testimonials + contact), `/projects` (archive of all ~12), `/projects/<slug>` (case-study page per demo, consistent template), `/about`. No blog in v1 (nav slot reserved; highest-leverage later addition).
2. **Home hero = the agent-world town** ("the town is the homepage" — the flagship demo IS the interactive hero): embedded Emberwick replay canvas (iframe to the deployed static viewer, lazy-loaded behind a poster frame for LCP; reduced-motion/mobile fallback = poster image). One "whoa" moment; everything else calm (90/10 rule).
3. **Video hero sections** (Andrew's explicit ask, Brian's format): kling-generated 5s seamless loops as case-study page heroes for the top 3–4 projects (agent-world, trading dashboard, workflow engine, research pipeline), delivered as poster + mp4 + webm, `muted loop playsinline preload="none"`, lazy-loaded, `prefers-reduced-motion` → poster only.
4. **Case-study template** (consistent per-demo page): video/poster hero → one-line outcome → Problem → What I built (architecture, tech chips) → Outcome/numbers → live demo link + GitHub → next/prev project nav. Content from MDX frontmatter + body.
5. **Theming**: system `prefers-color-scheme` default, manual toggle (persisted, no-flash via inline script), dark-leaning palette design; both themes fully designed.
6. **Contractor conversion**: primary CTA ("Hire me on Upwork" / email) in hero + footer; proof bar (years shipping, # live demos, # domains); services/how-I-work section; testimonials section **rendered only when real quotes exist** (data file starts empty — no fabricated quotes, hidden section + TODO for Andrew).
7. **SEO/discoverability**: per-page metadata with exact-match phrases (LangGraph multi-agent system, algorithmic trading dashboard, LLM pipeline...), JSON-LD Person schema, OG image per project (`next/og`), sitemap, archive table crawlable.
8. Cmd-K command palette (terminal-styled garnish, `⌘K`: navigate to projects/sections) — small, last, cut first if time.

### Non-Functional
- Lighthouse ≥95 all categories on home + one case study (static rendering, `next/font` self-hosted, `next/image`, lazy hero).
- No CMS/DB; content in-repo. `pnpm`/`npm` build clean on Vercel.
- Accessible: keyboard nav, contrast in both themes, reduced-motion respected everywhere.
- Deploy: new Vercel project `vandyke-portfolio`; **domain cutover of vandykeportfolio.com from devfolio happens only after Playwright verification of the production deployment** (both themes, mobile + desktop). Old devfolio project left intact for instant rollback.

## Options Considered

1. **Astro 5** — rejected: React island for the hero erases the JS advantage; second framework to maintain forever.
2. **Rewrite inside devfolio repo** — rejected: Gatsby 2 → Next 16 shares nothing; clean repo, old site stays deployed for rollback.
3. **Home hero: kling video vs live agent-world embed** — chosen: agent-world replay embed (it's real, interactive, and proof-of-work in one; video heroes go on case-study pages). Fallback if iframe perf hurts LCP: poster + click-to-load, which is required for mobile anyway.
4. **Testimonials: scrape Upwork quotes vs empty-until-provided** — chosen: empty-until-provided (can't verify/authorize scraped quotes; fabrication is disqualifying).
5. **contentlayer vs @next/mdx + zod loader** — chosen: hand-rolled loader (`lib/content.ts`: glob + gray-matter + zod). contentlayer is abandoned-ish; the loader is ~60 lines and dependency-free.

## Recommendation

Next.js 16 App Router (all static) + Tailwind 4 + MDX content layer + Motion, dark-leaning dual theme, agent-world embed as home hero, kling video heroes on top case-study pages, archive table, JSON-LD + OG images, new Vercel project, verified domain cutover. Phases: 0 spike (scaffold + embed + one kling video end-to-end), 1 foundation (theme/tokens/content layer/shell), 2 home, 3 case studies + videos, 4 polish/SEO/Lighthouse, 5 deploy + cutover + doc sync.

## Open Questions

1. **Kling reliability this week** — Phase 0 generates ONE hero video end-to-end before Phase 3 depends on four. Fallback: CSS/canvas animated gradient heroes + posters (still consistent style), videos added later.
2. **Public still-hosting for kling** — options: commit stills to agent-world's Vercel static deploy `/assets/`, or any public URL. Phase 0 picks the cheapest working path (likely: push stills to a `heroes/` dir in the portfolio repo's Vercel preview deploy or the agent-world deploy).
3. **Exact display/mono font pairing** — decided in Phase 1 against the design; candidates: display = Instrument Serif / Newsreader / General Sans; mono = JetBrains Mono / Commit Mono / Geist Mono. Self-hosted via `next/font`.
4. **Domain cutover mechanics** — vandykeportfolio.com + www currently on the devfolio Vercel project; move via `vercel domains`/dashboard equivalent CLI (`vercel alias` / project domains API). Verified in Phase 5 with instant-rollback notes.

## References

- Requirements from Andrew (2026-07-02): video heroes on several pages; page per demo, consistent, "really nice"; system light/dark + toggle. Brian's reference: brianscaturro.com/posts/cogs-agents-as-channels/.
- Content source: `/home/kingjames/vandykeportfolio/devfolio/gatsby-config.js` (11 projects, experience, about).
- Video pipeline: `~/ascolais/development/src/dev/kling.clj`, `~/ascolais/bases/storyboard/` (README/CLAUDE/STORY_GOAL), cost table in `specs/movie-composition/research.md` ($0.42/5s std clip, $0.20/still).
- Flagship: github.com/vandyand/agent-world, https://agent-world-three.vercel.app, retro at agent-world/specs/agent-world-demo/retro.md.
- Exemplars: bruno-simon.com, rauno.me/craft/novelty, joshwcomeau.com/effective-portfolio, leerob.com, godly.website, awwwards.com/websites/portfolio.
- Stack: motion.dev/docs/react, Tailwind 4, Next 16 App Router View Transitions (leerob precedent).
