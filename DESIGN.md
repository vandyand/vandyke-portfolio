# Portfolio design contract

**Owner:** Andrew VanDyke · **Status:** active · **Last reviewed:** 2026-08-08  
**Implementation:** `app/`, `components/`, `lib/`, and `content/projects/`

## Audience and jobs

Potential clients, hiring managers, and collaborators need to establish Andrew's credibility, locate the work most relevant to their problem, inspect a live application or case study, and contact him. They may arrive on the home page or directly on a specialty page shared with an application.

## Experience principles

- Put proof before claims: show Andrew, running applications, and concrete outcomes early.
- Help visitors recognize their problem area rather than making them infer it from a mixed project archive.
- Give every page one obvious next step: a relevant case study, live demo, another specialty, or contact.
- Keep the visual system editorial and calm; avoid dashboard decoration, competing CTAs, and generic SaaS language.

## Critical journeys

1. **General visitor:** Home → choose Web development, Quant finance, or Agentic AI → relevant case study → live demo or email. A visitor who picked the wrong area can use the cross-links or Work nav without going back.
2. **Referred visitor:** Specialty URL → recognize the area from the title and summary → open a case study or demo → contact Andrew. The page always links to the full archive and the other specialties.
3. **Reader:** Blog → scan a concise article list → read one post → join the new-post list with a clear consent statement. Invalid or unavailable signup states explain what happened and preserve the entered address for correction.

## Information architecture and language

- **Work** is the complete archive.
- **Focus** is an index of all three specialties; the home page also exposes each specialty route directly.
- Specialty routes: `/web-development`, `/quant-finance`, and `/agentic-ai`.
- **Blog** is a chronological set of short, first-person technical notes at `/blog`. Posts use reviewed MDX in `content/blog/`; subscriber addresses live only in the email provider.
- Use “case study,” “live demo,” and “work” rather than internal project-management terms.

## Visual and component rules

- Keep the shared warm light/dark token system in `app/globals.css`; ember is the only accent.
- The home headshot is a square, responsive portrait with meaningful alt text and a text caption. It must remain visible in the first screen at desktop and follow the introduction at smaller widths.
- Specialty project cards have an image link, text case-study link, and a live-demo link only when one exists. All interactive items must show visible keyboard focus.
- At narrow widths, grids collapse to one column with no horizontal scrolling.
- Newsletter forms in narrow sidebars stack the field and button so the call to action remains fully legible. Wider reading columns may place the controls in one row.

## Quality bar

Validate the home and all specialty routes at desktop and mobile widths, including header navigation, direct links, image alt text, and each project/demonstration CTA. Respect reduced-motion preferences and preserve the skip link and semantic landmark structure.
