/**
 * Global site data — nav, socials, services, proof stats, testimonials.
 * Content lives here (not in components) so copy edits never touch markup.
 */

export const site = {
  name: "Andrew Van Dyke",
  title: "Andrew Van Dyke — Full-Stack & AI/ML Engineer",
  description:
    "Senior full-stack + AI/ML engineer building agentic systems and trading infrastructure.",
  url: "https://www.vandykeportfolio.com",
  sourceRepo: "https://github.com/vandyand/vandyke-portfolio",
} as const;

/** Upwork profile link — single constant so it's trivial to swap later. */
export const UPWORK_PROFILE_URL =
  "https://www.upwork.com/freelancers/vandyand";

export const nav = [
  { label: "Work", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "mailto:venturevd@gmail.com" },
] as const;

export const socials = {
  github: "https://github.com/vandyand",
  email: "venturevd@gmail.com",
  upwork: UPWORK_PROFILE_URL,
} as const;

/** Three engagement shapes for the Services / How I work section. */
export const services = [
  {
    title: "Build sprint",
    description:
      "A scoped feature or prototype, shipped in a fixed window. Clear spec up front, working software at the end — demos over decks.",
  },
  {
    title: "Ongoing development",
    description:
      "A standing engagement on your product: agentic pipelines, trading systems, full-stack features. Weekly cadence, direct communication, code you own.",
  },
  {
    title: "Audit & rescue",
    description:
      "Your LLM pipeline is flaky or your app stalled mid-build. I find the real problem, write it down, and fix it — instrumentation first, opinions second.",
  },
] as const;

/** Real, verifiable numbers only — no invented outcomes. */
export const proofStats = [
  { value: "12+", label: "live demos & production apps" },
  { value: "3", label: "domains — trading, LLM agents, full-stack" },
  { value: "6+", label: "years shipping software" },
] as const;

/**
 * Testimonials render ONLY when this array is non-empty.
 * TODO(Andrew): add real, authorized quotes — never fabricate.
 */
export const testimonials: {
  quote: string;
  author: string;
  role?: string;
}[] = [];
