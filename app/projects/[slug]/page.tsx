import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { preload } from "react-dom";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import EmberwickEmbed from "@/components/EmberwickEmbed";
import VideoHero from "@/components/VideoHero";
import AgenticDemoTabs from "@/components/AgenticDemoTabs";
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

function HeroMedia({ project }: { project: Project }) {
  const alt = project.hero.alt ?? `${project.title} — screenshot`;
  if (project.hero.type === "video" && project.hero.video) {
    return (
      <VideoHero
        base={project.hero.video}
        poster={project.hero.poster ?? `${project.hero.video}/poster.jpg`}
        alt={alt}
      />
    );
  }
  if (project.hero.poster) {
    return (
      <Image
        src={project.hero.poster}
        alt={alt}
        fill
        priority
        sizes="(max-width: 1200px) 100vw, 1104px"
        className="object-cover object-top"
      />
    );
  }
  return (
    <span className="absolute inset-0 grid place-items-center font-mono text-kicker uppercase text-ink-faint">
      {project.title}
    </span>
  );
}

const HERO_FRAME =
  "relative aspect-video w-full overflow-hidden rounded-card border border-line bg-surface shadow-card";

function Hero({ project }: { project: Project }) {
  // The <video poster> attribute isn't preload-scanned, so without this
  // hint the LCP image starts downloading ~1s late. RSC preload() puts a
  // <link rel="preload"> in the SSR'd <head>.
  if (project.hero.type === "video" && project.hero.video) {
    preload(project.hero.poster ?? `${project.hero.video}/poster.jpg`, {
      as: "image",
      fetchPriority: "high",
    });
  }

  // Interactive embed heroes stay unwrapped; everything else with a live URL
  // becomes a big click target to the demo.
  if (project.hero.type === "embed") {
    return <div className={HERO_FRAME}><EmberwickEmbed /></div>;
  }
  if (!project.links.live) {
    return <div className={HERO_FRAME}><HeroMedia project={project} /></div>;
  }

  return (
    <a
      href={project.links.live}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open the live demo of ${project.title} (opens in a new tab)`}
      className={`group block cursor-pointer transition-colors hover:border-accent ${HERO_FRAME}`}
    >
      <HeroMedia project={project} />
      {/* darken slightly on hover so the whole image reads as clickable */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-200 group-hover:bg-black/15"
      />
      {/* persistent, obvious call-to-action badge */}
      <span className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-2 rounded-chip border border-accent/70 bg-surface/85 px-3 py-1.5 font-mono text-xs uppercase tracking-wide text-accent shadow-card backdrop-blur transition-colors group-hover:border-accent group-hover:text-accent-strong">
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
        Live demo <span aria-hidden="true">↗</span>
      </span>
    </a>
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
      {/* Combined multi-demo projects carry their heroes inside the tabs. */}
      {!project.demos && (
        <div className="mt-8">
          <Hero project={project} />
        </div>
      )}

      {/* ── Title block ────────────────────────────────────────── */}
      <header className={project.demos ? "mt-8" : "mt-12 sm:mt-16"}>
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
                className="lift rounded-chip border border-line bg-surface px-2.5 py-1 font-mono text-xs text-ink-muted"
              >
                {tech}
              </li>
            ))}
          </ul>
          {project.demos ? (
            <span className="font-mono text-kicker uppercase text-ink-faint">
              Three live demos <span aria-hidden="true">↓</span>
            </span>
          ) : (
            <div className="flex flex-wrap items-center gap-5 font-mono text-kicker uppercase">
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-accent transition-colors hover:text-accent-strong"
                >
                  Live demo <span aria-hidden="true">↗</span>
                </a>
              )}
              {project.links.repo && (
                <a
                  href={project.links.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-ink-muted transition-colors hover:text-accent"
                >
                  Source <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          )}
        </div>
      </header>

      {/* ── Case-study body ────────────────────────────────────── */}
      <article className="mt-12 max-w-3xl sm:mt-14">
        <MDXRemote source={project.body} components={mdxComponents} />
      </article>

      {/* ── Tabbed multi-demo showcase (combined projects) ─────── */}
      {project.demos && <AgenticDemoTabs demos={project.demos} />}

      {/* ── Next / prev project nav ────────────────────────────── */}
      <nav
        aria-label="More projects"
        className="mt-20 grid gap-4 border-t border-line pt-10 sm:grid-cols-2 sm:gap-6"
      >
        <Link
          href={`/projects/${prev.slug}`}
          rel="prev"
          className="group lift rounded-card border border-line bg-surface p-6 shadow-card transition-colors hover:border-accent"
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
          className="group lift rounded-card border border-line bg-surface p-6 text-right shadow-card transition-colors hover:border-accent"
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
