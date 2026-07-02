import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllProjects } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies and live demos — LLM agent systems, algorithmic trading dashboards, and full-stack products, all shipped and running.",
  alternates: { canonical: `${site.url}/projects` },
};

export default function ProjectsPage() {
  const projects = getAllProjects();
  const featured = projects.filter((p) => p.featured);

  return (
    <main className="mx-auto w-full max-w-6xl px-6 pb-24 pt-16 sm:pt-20">
      <h1 className="max-w-2xl font-display text-display text-ink">
        Work<em className="text-accent">.</em>
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
        Every project here is live — click through for the case study, or go
        straight to the running demo.
      </p>

      {/* ── Featured grid ────────────────────────────────────── */}
      <section aria-label="Featured projects" className="mt-14 sm:mt-16">
        <h2 className="font-mono text-kicker uppercase text-ink-faint">
          Featured
        </h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          {featured.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group block"
            >
              <span className="relative block aspect-video overflow-hidden rounded-card border border-line bg-surface shadow-card transition-colors group-hover:border-accent">
                {project.hero.poster ? (
                  <Image
                    src={project.hero.poster}
                    alt={project.hero.alt ?? project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 552px"
                    className="object-cover object-top transition-transform duration-500 motion-safe:group-hover:scale-[1.02]"
                  />
                ) : (
                  <span className="absolute inset-0 grid place-items-center font-mono text-kicker uppercase text-ink-faint">
                    {project.title}
                  </span>
                )}
              </span>
              <span className="mt-4 flex items-baseline justify-between gap-4">
                <span className="font-display text-2xl text-ink transition-colors group-hover:text-accent">
                  {project.title}
                </span>
                <span className="shrink-0 font-mono text-xs uppercase tracking-[0.14em] text-ink-faint">
                  {project.year}
                </span>
              </span>
              <span className="mt-1.5 block text-sm leading-relaxed text-ink-muted">
                {project.tagline}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Full archive table ───────────────────────────────── */}
      <section aria-label="All projects" className="mt-20 sm:mt-24">
        <h2 className="font-mono text-kicker uppercase text-ink-faint">
          All projects
        </h2>
        <div className="mt-8 overflow-x-auto rounded-card border border-line">
          <table className="w-full min-w-[40rem] border-collapse text-sm">
            <thead className="bg-surface text-left font-mono text-xs uppercase tracking-[0.1em] text-ink-faint">
              <tr>
                <th scope="col" className="border-b border-line px-5 py-3.5 font-medium">
                  Year
                </th>
                <th scope="col" className="border-b border-line px-5 py-3.5 font-medium">
                  Project
                </th>
                <th scope="col" className="border-b border-line px-5 py-3.5 font-medium">
                  Stack
                </th>
                <th scope="col" className="border-b border-line px-5 py-3.5 font-medium">
                  Links
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, i) => (
                <tr
                  key={project.slug}
                  className="group transition-colors hover:bg-surface/60"
                >
                  <td
                    className={`px-5 py-4 align-top font-mono text-xs text-ink-faint ${
                      i > 0 ? "border-t border-line" : ""
                    }`}
                  >
                    {project.year}
                  </td>
                  <td
                    className={`px-5 py-4 align-top ${
                      i > 0 ? "border-t border-line" : ""
                    }`}
                  >
                    <Link
                      href={`/projects/${project.slug}`}
                      className="font-medium text-ink transition-colors hover:text-accent"
                    >
                      {project.title}
                    </Link>
                    <span className="mt-1 block max-w-md text-xs leading-relaxed text-ink-muted">
                      {project.tagline}
                    </span>
                  </td>
                  <td
                    className={`px-5 py-4 align-top font-mono text-xs leading-relaxed text-ink-muted ${
                      i > 0 ? "border-t border-line" : ""
                    }`}
                  >
                    {project.stack.join(", ")}
                  </td>
                  <td
                    className={`px-5 py-4 align-top font-mono text-xs uppercase tracking-[0.1em] ${
                      i > 0 ? "border-t border-line" : ""
                    }`}
                  >
                    <span className="flex flex-col gap-1.5">
                      {project.links.live && (
                        <a
                          href={project.links.live}
                          rel="noopener"
                          className="whitespace-nowrap text-accent transition-colors hover:text-accent-strong"
                        >
                          Live <span aria-hidden="true">↗</span>
                        </a>
                      )}
                      {project.links.repo && (
                        <a
                          href={project.links.repo}
                          rel="noopener"
                          className="whitespace-nowrap text-ink-muted transition-colors hover:text-accent"
                        >
                          Repo <span aria-hidden="true">↗</span>
                        </a>
                      )}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
