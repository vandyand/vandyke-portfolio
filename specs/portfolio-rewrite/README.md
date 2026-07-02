---
title: "Portfolio Rewrite"
status: planned
date: 2026-07-02
priority: 10
---

# Portfolio Rewrite

## Overview

Full rewrite of vandykeportfolio.com: a highly customized, high-quality contractor portfolio replacing the 2020 Gatsby template. Next.js 16 + Tailwind 4 + MDX + Motion, dual light/dark theming with toggle, the Emberwick agent-world as the interactive home hero, kling-generated **video hero sections** on case-study pages (Brian Scaturro's storyboard-tech format), and a consistent, polished **page per demo**. Optimized for Upwork-client conversion and LangGraph/AutoGen/CrewAI/trading keyword discoverability. Full analysis in [research.md](research.md).

## Goals

- One interactive "whoa" hero (agent-world embed), calm high-craft everything else (90/10 rule).
- Case-study page per project in one consistent template; 4 video heroes (5s seamless kling loops, poster+mp4+webm, reduced-motion safe).
- System light/dark + persisted toggle, both themes fully designed, no flash.
- Content as data: `content/projects/*.mdx`, zod-validated; adding a project = adding a file.
- Lighthouse ≥95 across categories; JSON-LD, per-project OG images, sitemap, archive table.
- New Vercel project; domain cutover only after Playwright-verified production deploy; devfolio kept for rollback.

## Non-Goals

- No blog posts in v1 (nav slot reserved; content strategy says it's the top later addition).
- No CMS/database; no fabricated testimonials (section ships hidden until real quotes provided).
- No 3D/WebGL hero; no full fake-terminal UI (cmd-K palette is optional garnish, first thing cut).

## Key Decisions

See [research.md](research.md) for full options analysis.

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Framework | Next.js 16 App Router, all-static (not Astro) | React hero needs React anyway; monoculture with 4 sibling demos; Vercel-first |
| Styling | Tailwind 4 + design tokens, one display + one mono font via next/font | 2026 typography-led quality signal; zero CLS |
| Content | MDX + hand-rolled zod loader (~60 lines), not contentlayer | contentlayer unmaintained; git is the CMS |
| Motion | motion v12 (LazyMotion/m) + CSS scroll-driven + View Transitions | Native-first, small bundle |
| Home hero | Embedded agent-world replay (lazy, poster LCP, reduced-motion fallback) | The flagship IS the hero — proof of the exact keywords clients search |
| Video heroes | kling-v3.0-std via OpenRouter, same first/last frame = loop, 4 case studies | Andrew's explicit ask; Brian's proven format; ≈$4–7 total |
| Theme | next-themes-style system default + toggle, dark-leaning design | Andrew's explicit ask |
| Testimonials | Data-driven, hidden while empty | No fabricated social proof — disqualifying risk |
| Deploy | New Vercel project; verified cutover; devfolio untouched for rollback | Instant rollback path |

## Implementation Status

See [implementation-plan.md](implementation-plan.md) for detailed task breakdown.

- [ ] Phase 0: Spike — scaffold, agent-world embed, ONE kling hero video end-to-end
- [ ] Phase 1: Foundation — tokens, themes, fonts, content layer, layout shell
- [ ] Phase 2: Home page — hero, proof bar, selected work, services, contact
- [ ] Phase 3: Case studies — template, 6+ project MDX pages, archive, video heroes
- [ ] Phase 4: Polish — motion, SEO/JSON-LD/OG, Lighthouse ≥95, dual-theme Playwright pass
- [ ] Phase 5: Deploy + domain cutover + docs
