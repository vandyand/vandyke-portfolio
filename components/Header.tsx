import Link from "next/link";
import { nav, site } from "@/lib/site";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="whitespace-nowrap font-display text-xl tracking-tight text-ink transition-colors hover:text-accent"
        >
          Andrew Van&thinsp;Dyke
        </Link>
        <nav aria-label="Main" className="flex items-center gap-1 sm:gap-2">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-chip px-2.5 py-2 font-mono text-kicker uppercase text-ink-muted transition-colors hover:bg-surface hover:text-ink sm:px-3 ${
                item.href.startsWith("mailto:") ? "hidden sm:inline-flex" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
          <span className="mx-1 h-5 w-px bg-line" aria-hidden="true" />
          <ThemeToggle />
        </nav>
        <span className="sr-only">{site.name}</span>
      </div>
    </header>
  );
}
