import type { Metadata } from "next";
import Image from "next/image";
import { site, socials, UPWORK_PROFILE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Full-stack and AI/ML engineer with a controls-engineering background — React/TypeScript, Python, Clojure, LLM agent systems, and algorithmic trading.",
  alternates: { canonical: `${site.url}/about` },
};

const skills = [
  {
    name: "AI & agent systems",
    items:
      "LangGraph, AutoGen, CrewAI, OpenAI & OpenRouter APIs, schema-driven structured output, multi-agent orchestration, cost-guarded LLM pipelines",
  },
  {
    name: "Frontend",
    items:
      "React, TypeScript, Next.js, Redux, Tailwind CSS, Material UI, HTML5/CSS3",
  },
  {
    name: "Backend",
    items: "Node.js, Python, PHP/Laravel, Clojure, RESTful APIs, FastAPI",
  },
  {
    name: "Data & infrastructure",
    items:
      "PostgreSQL, MySQL, SQL optimization, Docker, Git, AWS, Vercel, Supabase",
  },
  {
    name: "Specialized",
    items:
      "Algorithmic trading (TCN, RL, walk-forward optimization), functional programming, test-driven development, geospatial visualization",
  },
] as const;

const experience = [
  {
    role: "AI/ML & Full-Stack Contractor",
    org: "Upwork",
    period: "Jan 2025 — present",
    link: UPWORK_PROFILE_URL,
    description:
      "Freelance contractor specializing in AI/ML development, full-stack web applications, and algorithmic trading systems. Building agentic workflows, multi-agent systems, and data-driven applications for clients.",
  },
  {
    role: "Controls Engineer II",
    org: "Extol Inc.",
    period: "2024 — 2025",
    link: "https://www.extolinc.com/",
    description:
      "Designed and programmed control systems for plastics manufacturing equipment. Developed PLC systems and collaborated with engineers to implement reliable automation solutions for customers.",
  },
  {
    role: "Software Engineer",
    org: "TeamGantt",
    period: "2020 — 2023",
    link: "https://www.teamgantt.com/",
    description:
      "Built and maintained features for a SaaS project management platform using a React/TypeScript frontend and PHP/Laravel backend services. Contributed to the Clojure codebase for data processing, in a fully remote agile team.",
  },
  {
    role: "Controls Engineer",
    org: "Altron Automation",
    period: "2016 — 2020",
    link: "https://www.altronautomation.com/",
    description:
      "Designed electrical schematics and programmed PLCs for manufacturing automation systems — routing, adhesive dispensing, and material handling. Integrated robots into production lines alongside mechanical engineers.",
  },
] as const;

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 pb-24 pt-16 sm:pt-20">
      {/* ── Intro ────────────────────────────────────────────── */}
      <section className="grid items-start gap-10 md:grid-cols-[1fr_20rem] md:gap-16">
        <div>
          <h1 className="font-display text-display text-ink">
            About<em className="text-accent">.</em>
          </h1>
          <div className="mt-8 flex max-w-xl flex-col gap-5 text-lg leading-relaxed text-ink-muted">
            <p>
              I&rsquo;m Andrew Van Dyke — a full-stack engineer who spent four
              years wiring up factory automation before moving to software,
              and it shows: I care about systems that keep working after the
              demo ends.
            </p>
            <p>
              These days I build{" "}
              <strong className="font-medium text-ink">
                LLM agent systems
              </strong>{" "}
              (LangGraph, AutoGen, CrewAI),{" "}
              <strong className="font-medium text-ink">
                algorithmic trading infrastructure
              </strong>{" "}
              (TCN and RL models trading live across four venues), and{" "}
              <strong className="font-medium text-ink">
                production web apps
              </strong>{" "}
              in React/TypeScript, Python, and Clojure. Before contracting I
              shipped SaaS features at TeamGantt for three years on a
              React/Laravel/Clojure stack.
            </p>
            <p>
              The controls-engineering background is the throughline:
              instrumentation first, hard limits on the dangerous parts, and
              honest measurement of whether the thing actually works.
            </p>
          </div>
        </div>
        <div className="relative aspect-[9/10] w-full max-w-xs overflow-hidden rounded-card border border-line shadow-card md:mt-4">
          <Image
            src="/about/andrew.jpg"
            alt="Andrew Van Dyke smiling in an autumn forest"
            fill
            priority
            sizes="(max-width: 768px) 20rem, 20rem"
            className="object-cover"
          />
        </div>
      </section>

      {/* ── Experience ───────────────────────────────────────── */}
      <section aria-label="Experience" className="mt-20 sm:mt-24">
        <h2 className="font-mono text-kicker uppercase text-ink-faint">
          Experience
        </h2>
        <ol className="mt-8 flex flex-col">
          {experience.map((job, i) => (
            <li
              key={job.role + job.org}
              className={`reveal grid gap-2 py-7 sm:grid-cols-[11rem_1fr] sm:gap-8 ${
                i > 0 ? "border-t border-line" : ""
              }`}
            >
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-faint">
                {job.period}
              </p>
              <div>
                <h3 className="font-display text-2xl text-ink">
                  {job.role}{" "}
                  <span className="text-ink-muted">
                    ·{" "}
                    <a
                      href={job.link}
                      rel="noopener"
                      className="transition-colors hover:text-accent"
                    >
                      {job.org}
                    </a>
                  </span>
                </h3>
                <p className="mt-2.5 max-w-2xl leading-relaxed text-ink-muted">
                  {job.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Skills ───────────────────────────────────────────── */}
      <section aria-label="Skills" className="mt-16 border-t border-line pt-16 sm:mt-20">
        <h2 className="font-mono text-kicker uppercase text-ink-faint">
          Skills
        </h2>
        <dl className="mt-8 grid gap-6 sm:grid-cols-2">
          {skills.map((group) => (
            <div
              key={group.name}
              className="reveal lift rounded-card border border-line bg-surface p-6 shadow-card"
            >
              <dt className="font-display text-xl text-ink">{group.name}</dt>
              <dd className="mt-2.5 text-sm leading-relaxed text-ink-muted">
                {group.items}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section aria-label="Contact" className="mt-20 sm:mt-24">
        <h2 className="max-w-2xl font-display text-display-sm text-ink">
          Sound like the right kind of{" "}
          <em className="text-accent">engineer?</em>
        </h2>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${socials.email}`}
            className="inline-flex items-center rounded-chip bg-accent px-5 py-3 font-mono text-kicker uppercase text-accent-ink transition-colors hover:bg-accent-strong"
          >
            Email me
          </a>
          <a
            href={UPWORK_PROFILE_URL}
            rel="noopener"
            className="inline-flex items-center gap-1.5 rounded-chip border border-line-strong px-5 py-3 font-mono text-kicker uppercase text-ink transition-colors hover:border-accent hover:text-accent"
          >
            Hire me on Upwork <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>
    </main>
  );
}
