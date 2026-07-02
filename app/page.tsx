import { getAllProjects } from "@/lib/content";

/**
 * Temporary Phase 1 home — proves the shell, tokens, fonts, and content
 * loader in both themes. The real home page lands in Phase 2.
 */
export default function Home() {
  const projects = getAllProjects();

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-28">
      <p className="font-mono text-kicker uppercase text-accent">
        Andrew Van Dyke — Full-Stack &amp; AI/ML Engineer
      </p>
      <h1 className="mt-6 max-w-3xl font-display text-display text-ink">
        Agentic systems and trading infrastructure,{" "}
        <em className="text-accent">built to ship</em>.
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
        Senior full-stack engineer working across LLM agent orchestration,
        algorithmic trading, and production web apps — every project below is
        live, not a mockup.
      </p>

      <section aria-label="Selected work" className="mt-16">
        <h2 className="font-mono text-kicker uppercase text-ink-faint">
          Selected work
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.slug}
              className="rounded-card border border-line bg-surface p-6 shadow-card transition-colors hover:border-line-strong"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-2xl text-ink">
                  {project.title}
                </h3>
                <span className="font-mono text-sm text-ink-faint">
                  {project.year}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                {project.tagline}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Stack">
                {project.stack.slice(0, 5).map((tech) => (
                  <li
                    key={tech}
                    className="rounded-chip border border-line bg-surface-2 px-2.5 py-1 font-mono text-xs text-ink-muted"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
