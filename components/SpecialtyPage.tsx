import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllProjects } from "@/lib/content";
import { type Specialty, specialties } from "@/lib/specialties";
import { site, socials } from "@/lib/site";

export function specialtyMetadata(specialty: Specialty): Metadata {
  return {
    title: specialty.title,
    description: specialty.description,
    alternates: { canonical: `${site.url}/${specialty.slug}` },
  };
}

export default function SpecialtyPage({ specialty }: { specialty: Specialty }) {
  const allProjects = getAllProjects();
  const projects = specialty.projectSlugs
    .map((slug) => allProjects.find((project) => project.slug === slug))
    .filter((project): project is NonNullable<typeof project> => Boolean(project));
  const otherSpecialties = specialties.filter(
    (item) => item.slug !== specialty.slug,
  );

  return (
    <main className="mx-auto w-full max-w-6xl px-6 pb-24 pt-16 sm:pt-20">
      <section className="max-w-3xl">
        <p className="font-mono text-kicker uppercase text-ink-faint">
          {specialty.eyebrow}
        </p>
        <h1 className="mt-5 font-display text-display text-ink">
          {specialty.title}<em className="text-accent">.</em>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">
          {specialty.intro}
        </p>
      </section>

      <section aria-label={`${specialty.title} projects`} className="mt-16 sm:mt-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-mono text-kicker uppercase text-ink-faint">
              Relevant work
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              Case studies with links to the running applications.
            </p>
          </div>
          <Link
            href="/projects"
            className="font-mono text-kicker uppercase text-accent transition-colors hover:text-accent-strong"
          >
            All work <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.slug}
              className="reveal overflow-hidden rounded-card border border-line bg-surface shadow-card"
            >
              <Link
                href={`/projects/${project.slug}`}
                className="group relative block aspect-video overflow-hidden bg-surface-2"
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
              <div className="p-6 sm:p-7">
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-faint">
                  {project.year} · {project.role}
                </p>
                <h2 className="mt-3 font-display text-2xl text-ink">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="transition-colors hover:text-accent"
                  >
                    {project.title}
                  </Link>
                </h2>
                <p className="mt-3 leading-relaxed text-ink-muted">
                  {project.outcome}
                </p>
                <div className="mt-6 flex flex-wrap gap-4 font-mono text-kicker uppercase">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-accent transition-colors hover:text-accent-strong"
                  >
                    Case study <span aria-hidden="true">→</span>
                  </Link>
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      rel="noopener"
                      className="text-ink-muted transition-colors hover:text-accent"
                    >
                      Live demo <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-20 border-t border-line pt-16 sm:mt-24 sm:pt-20">
        <h2 className="font-mono text-kicker uppercase text-ink-faint">
          Explore another focus
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {otherSpecialties.map((item) => (
            <Link
              key={item.slug}
              href={`/${item.slug}`}
              className="lift rounded-card border border-line bg-surface p-6 shadow-card transition-colors hover:border-accent"
            >
              <p className="font-display text-2xl text-ink">{item.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {item.description}
              </p>
              <span className="mt-4 inline-block font-mono text-kicker uppercase text-accent">
                View work <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section aria-label="Contact" className="mt-20 sm:mt-24">
        <h2 className="font-display text-display-sm text-ink">
          Have a related <em className="text-accent">project?</em>
        </h2>
        <a
          href={`mailto:${socials.email}`}
          className="mt-7 inline-flex items-center rounded-chip bg-accent px-5 py-3 font-mono text-kicker uppercase text-accent-ink transition-colors hover:bg-accent-strong"
        >
          Email me
        </a>
      </section>
    </main>
  );
}
