import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import EmberwickEmbed from "@/components/EmberwickEmbed";
import { getFeaturedProjects } from "@/lib/content";
import {
  proofStats,
  services,
  site,
  socials,
  testimonials,
  UPWORK_PROFILE_URL,
} from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: `${site.url}/` },
};

/** JSON-LD Person schema — who this site is about, machine-readable. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  jobTitle: "Full-Stack & AI/ML Engineer",
  email: `mailto:${socials.email}`,
  sameAs: [socials.github, socials.upwork],
  knowsAbout: [
    "LLM agent orchestration",
    "LangGraph",
    "AutoGen",
    "CrewAI",
    "Algorithmic trading",
    "Next.js",
    "React",
    "TypeScript",
    "Python",
    "Clojure",
  ],
};

export default function Home() {
  const featured = getFeaturedProjects();

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-6xl px-6 pt-16 sm:pt-24">
        <p className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-3.5 py-1.5 font-mono text-xs uppercase tracking-[0.14em] text-ink-muted">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 motion-safe:animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Available for new projects
        </p>

        <h1 className="mt-8 max-w-3xl font-display text-display text-ink">
          Agentic systems and trading infrastructure,{" "}
          <em className="text-accent">built to ship</em>.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
          Senior full-stack engineer working across LLM agent orchestration,
          algorithmic trading, and production web apps — every project below
          is live, not a mockup.
        </p>

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
            Hire me on Upwork
            <span aria-hidden="true">→</span>
          </a>
        </div>

        {/* The flagship demo IS the hero visual. */}
        <div className="mt-14 sm:mt-16">
          <EmberwickEmbed />
          <p className="mt-4 text-sm leading-relaxed text-ink-muted">
            <strong className="font-medium text-ink">Emberwick</strong> — six
            LLM agents living in a simulated town. This is a real recording.{" "}
            <Link
              href="/projects/agent-world"
              className="whitespace-nowrap text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
            >
              Read the case study →
            </Link>
          </p>
        </div>
      </section>

      {/* ── Proof bar ────────────────────────────────────────── */}
      <section
        aria-label="At a glance"
        className="mt-16 border-y border-line bg-surface/60 sm:mt-20"
      >
        <dl className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-x-8 gap-y-8 px-6 py-10 sm:grid-cols-3">
          {proofStats.map((stat) => (
            <div key={stat.label} className="reveal flex flex-col">
              <dt className="order-last mt-1.5 font-mono text-kicker uppercase text-ink-faint">
                {stat.label}
              </dt>
              <dd className="font-display text-4xl tracking-tight text-ink">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ── Selected work ────────────────────────────────────── */}
      <section
        aria-label="Selected work"
        className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-28"
      >
        <h2 className="font-mono text-kicker uppercase text-ink-faint">
          Selected work
        </h2>

        <div className="mt-10 flex flex-col gap-20 sm:mt-12 sm:gap-24">
          {featured.map((project, i) => (
            <article
              key={project.slug}
              className="reveal grid items-center gap-8 md:grid-cols-2 md:gap-12"
            >
              <Link
                href={`/projects/${project.slug}`}
                tabIndex={-1}
                aria-hidden="true"
                className={`group relative block aspect-[16/10] overflow-hidden rounded-card border border-line bg-surface shadow-card ${
                  i % 2 === 1 ? "md:order-2" : ""
                }`}
              >
                {project.hero.poster ? (
                  <Image
                    src={project.hero.poster}
                    alt={project.hero.alt ?? project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 552px"
                    className="object-cover object-top transition-transform duration-500 motion-safe:group-hover:scale-[1.02]"
                  />
                ) : (
                  <span className="absolute inset-0 grid place-items-center font-mono text-kicker uppercase text-ink-faint">
                    {project.title}
                  </span>
                )}
              </Link>

              <div className={i % 2 === 1 ? "md:order-1" : ""}>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-faint">
                  {project.year} · {project.role}
                </p>
                <h3 className="mt-3 font-display text-display-sm text-ink">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="transition-colors hover:text-accent"
                  >
                    {project.title}
                  </Link>
                </h3>
                <p className="mt-4 max-w-lg leading-relaxed text-ink-muted">
                  {project.outcome}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2" aria-label="Stack">
                  {project.stack.slice(0, 6).map((tech) => (
                    <li
                      key={tech}
                      className="lift rounded-chip border border-line bg-surface px-2.5 py-1 font-mono text-xs text-ink-muted"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/projects/${project.slug}`}
                  className="group/cta mt-7 inline-flex items-center gap-1.5 font-mono text-kicker uppercase text-accent transition-colors hover:text-accent-strong"
                >
                  Read case study
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-200 motion-safe:group-hover/cta:translate-x-0.5"
                  >
                    →
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-16 sm:mt-20">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 rounded-chip border border-line-strong px-5 py-3 font-mono text-kicker uppercase text-ink transition-colors hover:border-accent hover:text-accent"
          >
            All projects
            <span aria-hidden="true">→</span>
          </Link>
        </p>
      </section>

      {/* ── Services / How I work ────────────────────────────── */}
      <section
        aria-label="How I work"
        className="border-t border-line bg-surface/60"
      >
        <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
          <h2 className="font-mono text-kicker uppercase text-ink-faint">
            How I work
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="reveal lift rounded-card border border-line bg-bg p-7 shadow-card"
              >
                <h3 className="font-display text-2xl text-ink">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials (render only when real quotes exist) ── */}
      {testimonials.length > 0 && (
        <section
          aria-label="Testimonials"
          className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24"
        >
          <h2 className="font-mono text-kicker uppercase text-ink-faint">
            Kind words
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {testimonials.map((t) => (
              <figure
                key={t.quote}
                className="rounded-card border border-line bg-surface p-7 shadow-card"
              >
                <blockquote className="font-display text-xl italic leading-relaxed text-ink">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-4 font-mono text-kicker uppercase text-ink-faint">
                  {t.author}
                  {t.role ? ` — ${t.role}` : ""}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* ── Contact ──────────────────────────────────────────── */}
      <section
        id="contact"
        aria-label="Contact"
        className="reveal mx-auto w-full max-w-6xl px-6 py-24 sm:py-32"
      >
        <h2 className="max-w-2xl font-display text-display text-ink">
          Have something <em className="text-accent">to build?</em>
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
          Tell me what you&rsquo;re trying to ship — an agent pipeline, a
          trading system, a product that&rsquo;s stuck. I&rsquo;ll tell you
          honestly whether I&rsquo;m the right person for it.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${socials.email}`}
            className="inline-flex items-center rounded-chip bg-accent px-5 py-3 font-mono text-kicker uppercase text-accent-ink transition-colors hover:bg-accent-strong"
          >
            {socials.email}
          </a>
          <a
            href={UPWORK_PROFILE_URL}
            rel="noopener"
            className="inline-flex items-center gap-1.5 rounded-chip border border-line-strong px-5 py-3 font-mono text-kicker uppercase text-ink transition-colors hover:border-accent hover:text-accent"
          >
            Upwork
            <span aria-hidden="true">→</span>
          </a>
        </div>
        <p className="mt-6 font-mono text-xs uppercase tracking-[0.14em] text-ink-faint">
          I typically reply within one business day.
        </p>
      </section>
    </main>
  );
}
