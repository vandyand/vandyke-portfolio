export const specialties = [
  {
    slug: "web-development",
    navLabel: "Web development",
    title: "Web development",
    eyebrow: "Full-stack products",
    description:
      "Production-minded web applications with clear interfaces, durable data models, and the unglamorous pieces that make a product usable after launch.",
    intro:
      "From interactive data tools to paid SaaS, I build full-stack web applications that bring a useful idea all the way through the product loop.",
    projectSlugs: [
      "marble-world",
      "weather-map-explorer",
      "fintecfun",
      "vibe-coded-saas-teardown",
    ],
  },
  {
    slug: "quant-finance",
    navLabel: "Quant finance",
    title: "Quant finance & algo trading",
    eyebrow: "Trading systems",
    description:
      "Observable research and paper-trading systems, built to expose the data, risk, and model behavior instead of hiding them behind a backtest.",
    intro:
      "I build quantitative trading tools around the parts that deserve scrutiny: data quality, out-of-sample testing, risk metrics, and live system state.",
    projectSlugs: ["online-rl-btc", "algo-trading"],
  },
  {
    slug: "agentic-ai",
    navLabel: "Agentic AI",
    title: "Agentic AI & workflow automation",
    eyebrow: "LLM systems",
    description:
      "Structured agent workflows and automations where each hand-off is inspectable, typed, and designed to recover when the real world gets messy.",
    intro:
      "I use LLMs where they create leverage, then surround them with contracts, visibility, and automation that make the workflow dependable.",
    projectSlugs: ["agentic-ai", "agent-world"],
  },
] as const;

export type Specialty = (typeof specialties)[number];

export function getSpecialty(slug: string) {
  return specialties.find((specialty) => specialty.slug === slug);
}
