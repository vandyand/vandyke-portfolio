import type { Metadata } from "next";
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";
import { formatPostDate, getAllPosts } from "@/lib/blog";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on building agent systems, trading tools, and production web applications.",
  alternates: { canonical: `${site.url}/blog` },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <main className="mx-auto w-full max-w-6xl px-6 pb-24 pt-12 sm:pt-16">
      <header className="max-w-3xl">
        <p className="font-mono text-kicker uppercase text-ink-faint">Blog</p>
        <h1 className="mt-4 font-display text-display text-ink">
          Build notes from <em className="text-accent">the work.</em>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">
          Practical notes on agent workflows, trading-system instrumentation,
          and the web applications that make ideas usable.
        </p>
      </header>

      <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
        <section aria-label="Articles">
          {posts.length ? (
            <div className="divide-y divide-line border-y border-line">
              {posts.map((post) => (
                <article key={post.slug} className="py-8 first:pt-0 last:pb-0">
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-faint">
                    {formatPostDate(post.published)} · {post.readingMinutes} min read
                  </p>
                  <h2 className="mt-3 font-display text-display-sm text-ink">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="transition-colors hover:text-accent"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-4 max-w-2xl leading-relaxed text-ink-muted">
                    {post.excerpt}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2" aria-label="Topics">
                    {post.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-chip border border-line bg-surface px-2.5 py-1 font-mono text-xs text-ink-muted"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-6 inline-flex items-center gap-1.5 font-mono text-kicker uppercase text-accent transition-colors hover:text-accent-strong"
                  >
                    Read note <span aria-hidden="true">→</span>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <p className="rounded-card border border-line bg-surface p-6 text-ink-muted">
              Notes are being prepared. Join the list and the next one will find you.
            </p>
          )}
        </section>

        <aside className="rounded-card border border-line bg-surface p-6 shadow-card">
          <h2 className="font-display text-2xl text-ink">Get the next note</h2>
          <p className="mt-3 leading-relaxed text-ink-muted">
            New articles land here first, then in your inbox if you want them.
          </p>
          <NewsletterForm compact />
        </aside>
      </div>
    </main>
  );
}
