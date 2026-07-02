import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-start justify-center px-6 py-24">
      <p className="font-mono text-kicker uppercase text-accent">404</p>
      <h1 className="mt-4 font-display text-display-sm text-ink">
        This page wandered off the map.
      </h1>
      <p className="mt-4 max-w-md text-ink-muted">
        Nothing lives at this address. The work, however, is very much alive.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-chip bg-accent px-4 py-2 font-mono text-kicker uppercase text-accent-ink transition-colors hover:bg-accent-strong"
      >
        Back home
      </Link>
    </main>
  );
}
