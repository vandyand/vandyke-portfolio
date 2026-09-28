import type { Metadata } from "next";
import Link from "next/link";
import { specialties } from "@/lib/specialties";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Focus areas",
  description:
    "Andrew VanDyke builds full-stack web applications, quantitative trading systems, and agentic AI workflows.",
  alternates: { canonical: `${site.url}/focus` },
};

export default function FocusPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 pb-24 pt-16 sm:pt-20">
      <section className="max-w-3xl">
        <p className="font-mono text-kicker uppercase text-ink-faint">
          Focus areas
        </p>
        <h1 className="mt-5 font-display text-display text-ink">
          Find the right <em className="text-accent">work.</em>
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-ink-muted">
          Choose the kind of problem you&rsquo;re solving to see relevant
          applications, case studies, and live demos.
        </p>
      </section>

      <nav aria-label="Focus areas" className="mt-14 grid gap-5 md:grid-cols-3">
        {specialties.map((specialty) => (
          <Link
            key={specialty.slug}
            href={`/${specialty.slug}`}
            className="lift rounded-card border border-line bg-surface p-7 shadow-card transition-colors hover:border-accent"
          >
            <p className="font-display text-2xl text-ink">{specialty.title}</p>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              {specialty.description}
            </p>
            <span className="mt-6 inline-block font-mono text-kicker uppercase text-accent">
              Explore work <span aria-hidden="true">→</span>
            </span>
          </Link>
        ))}
      </nav>
    </main>
  );
}
