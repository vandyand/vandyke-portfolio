import { site, socials } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-5 font-mono text-kicker uppercase">
          <a
            href={socials.github}
            className="text-ink-muted transition-colors hover:text-accent"
            rel="me noopener"
          >
            GitHub
          </a>
          <a
            href={socials.upwork}
            className="text-ink-muted transition-colors hover:text-accent"
            rel="noopener"
          >
            Upwork
          </a>
          <a
            href={`mailto:${socials.email}`}
            className="text-ink-muted transition-colors hover:text-accent"
          >
            {socials.email}
          </a>
        </div>
        <p className="text-sm text-ink-faint">
          Built with Next.js — designed &amp; built by me.{" "}
          <a
            href={site.sourceRepo}
            className="underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
            rel="noopener"
          >
            Source
          </a>
        </p>
      </div>
    </footer>
  );
}
