import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import EmberwickEmbed from "@/components/EmberwickEmbed";
import VideoHero from "@/components/VideoHero";
import { mdxComponents } from "@/components/mdx";
import { getAllProjects } from "@/lib/content";
import type { Project } from "@/lib/content";
import { site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getAllProjects().find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.tagline,
    keywords: [...project.keywords, ...project.stack],
    alternates: { canonical: `${site.url}/projects/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.tagline,
      type: "article",
      url: `${site.url}/projects/${project.slug}`,
      images: [{ url: `/og/${project.slug}`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.tagline,
      images: [`/og/${project.slug}`],
    },
  };
}

function Hero({ project }: { project: Project }) {
  const alt = project.hero.alt ?? `${project.title} — screenshot`;

  if (project.hero.type === "embed") {
    return <EmberwickEmbed />;
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-card border border-line bg-surface shadow-card">
      {project.hero.type === "video" && project.hero.video ? (
        <VideoHero
          base={project.hero.video}
          poster={project.hero.poster ?? `${project.hero.video}/poster.jpg`}
          alt={alt}
        />
      ) : project.hero.poster ? (
        <Image
          src={project.hero.poster}
          alt={alt}
          fill
          priority
          sizes="(max-width: 1200px) 100vw, 1104px"
          className="object-cover object-top"
        />
      ) : (
        <span className="absolute inset-0 grid place-items-center font-mono text-kicker uppercase text-ink-faint">
          {project.title}
        </span>
      )}
    </div>
  );
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const projects = getAllProjects();
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  // Cyclic next/prev — the archive is a loop, never a dead end.
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return (
    <main className="mx-auto w-full max-w-6xl px-6 pb-24 pt-10 sm:pt-14">
      {/* ── Breadcrumb ─────────────────────────────────────────── */}
      <nav aria-label="Breadcrumb">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 font-mono text-kicker uppercase text-ink-faint transition-colors hover:text-accent"
        >
          <span aria-hidden="true">←</span> All projects
        </Link>
      </nav>

      {/* ── Hero media ─────────────────────────────────────────── */}
      <div className="mt-8">
        <Hero project={project} />
      </div>

      {/* ── Title block ────────────────────────────────────────── */}
      <header className="mt-12 sm:mt-16">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-faint">
          {project.year} · {project.role}
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-display-sm text-ink sm:text-[3.25rem] sm:leading-[1.06] sm:tracking-[-0.02em]">
          {project.title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">
          {project.outcome}
        </p>

        {/* Meta row: stack chips + live/repo links */}
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5 border-y border-line py-5">
          <ul className="flex flex-wrap gap-2" aria-label="Stack">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-chip border border-line bg-surface px-2.5 py-1 font-mono text-xs text-ink-muted"
              >
                {tech}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-5 font-mono text-kicker uppercase">
            {project.links.live && (
              <a
                href={project.links.live}
                rel="noopener"
                className="inline-flex items-center gap-1.5 text-accent transition-colors hover:text-accent-strong"
              >
                Live demo <span aria-hidden="true">↗</span>
              </a>
            )}
            {project.links.repo && (
              <a
                href={project.links.repo}
                rel="noopener"
                className="inline-flex items-center gap-1.5 text-ink-muted transition-colors hover:text-accent"
              >
                Source <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </div>
      </header>

      {/* ── Case-study body ────────────────────────────────────── */}
      <article className="mt-12 max-w-3xl sm:mt-14">
        <MDXRemote source={project.body} components={mdxComponents} />
      </article>

      {/* ── Next / prev project nav ────────────────────────────── */}
      <nav
        aria-label="More projects"
        className="mt-20 grid gap-4 border-t border-line pt-10 sm:grid-cols-2 sm:gap-6"
      >
        <Link
          href={`/projects/${prev.slug}`}
          rel="prev"
          className="group rounded-card border border-line bg-surface p-6 shadow-card transition-colors hover:border-accent"
        >
          <span className="font-mono text-kicker uppercase text-ink-faint">
            <span aria-hidden="true">←</span> Previous
          </span>
          <span className="mt-2 block font-display text-xl text-ink transition-colors group-hover:text-accent">
            {prev.title}
          </span>
        </Link>
        <Link
          href={`/projects/${next.slug}`}
          rel="next"
          className="group rounded-card border border-line bg-surface p-6 text-right shadow-card transition-colors hover:border-accent"
        >
          <span className="font-mono text-kicker uppercase text-ink-faint">
            Next <span aria-hidden="true">→</span>
          </span>
          <span className="mt-2 block font-display text-xl text-ink transition-colors group-hover:text-accent">
            {next.title}
          </span>
        </Link>
      </nav>
    </main>
  );
}
