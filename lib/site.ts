/**
 * Global site data: nav, socials, services, proof stats, testimonials.
 * Content lives here (not in components) so copy edits never touch markup.
 */

export const site = {
  name: "Andrew VanDyke",
  title: "Andrew VanDyke | Full-Stack & AI/ML Engineer",
  description:
    "Full-stack and AI/ML engineer building agent systems, paper-trading tools, and web apps.",
  url: "https://www.vandykeportfolio.com",
  sourceRepo: "https://github.com/vandyand/vandyke-portfolio",
} as const;

/** Upwork profile link, kept in one place for easy updates. */
export const UPWORK_PROFILE_URL =
  "https://www.upwork.com/freelancers/vandyand";

export const nav = [
  { label: "Work", href: "/projects" },
  { label: "Focus", href: "/focus" },
  { label: "Blog", href: "/blog" },
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
      "A scoped feature or prototype with a clear target and a working result at the end. I keep the process simple and keep you close to the work.",
  },
  {
    title: "Ongoing development",
    description:
      "Ongoing help with agent workflows, trading tools, or full-stack features. You get direct communication, a steady cadence, and code that stays yours.",
  },
  {
    title: "Audit & rescue",
    description:
      "If an LLM pipeline is flaky or a build has stalled, I can help sort out what is actually happening and make a practical plan to fix it.",
  },
] as const;

/** Real, verifiable numbers only. */
export const proofStats = [
  { value: "13+", label: "running demos and production apps" },
  { value: "3", label: "full-stack web dev, agentic systems, algorithmic trading" },
  { value: "6+", label: "years shipping software" },
] as const;

/**
 * Testimonials render ONLY when this array is non-empty.
 * Real Upwork client reviews (provided by Andrew 2026-07-02); quotes are
 * verbatim prefixes of the originals; never fabricate or complete them.
 */
export const testimonials: {
  quote: string;
  author: string;
  role?: string;
}[] = [
  {
    quote:
      "Andrew was great to work with. Very responsive and an excellent communicator. … I would definitely recommend working with him for projects of any size.",
    author: "Upwork client | 5.0 stars",
    role: "Senior Advisor, Playwright Implementation | Mar 2026",
  },
  {
    quote:
      "Andrew was great to work with. He is easy to talk to, and brought great energy to the session. He was knowledgeable about stock trading and machine learning, and he explained concepts in a practical, straightforward way. I left the consultation with a much clearer understanding of the gaps I have in my plan.",
    author: "Upwork client | 5.0 stars",
    role: "ML for Stock Market Data, consultation | Jan 2026",
  },
];

/**
 * Client endorsement tags from Upwork engagements (Product Engineer,
 * Next.js/Node, Mar–Jul 2026 among others). Real tags only.
 */
export const clientEndorsements = [
  "Reliable",
  "Solution Oriented",
  "Clear Communicator",
  "Detail Oriented",
  "Professional",
] as const;
