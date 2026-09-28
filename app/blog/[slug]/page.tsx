import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import NewsletterForm from "@/components/NewsletterForm";
import { mdxComponents } from "@/components/mdx";
import { formatPostDate, getAllPosts, getPost } from "@/lib/blog";
import { site } from "@/lib/site";

export const dynamicParams = false;

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    alternates: { canonical: `${site.url}/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `${site.url}/blog/${post.slug}`,
      publishedTime: post.published.toISOString(),
    },
  };
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <main className="mx-auto w-full max-w-6xl px-6 pb-24 pt-10 sm:pt-14">
      <nav aria-label="Breadcrumb">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 font-mono text-kicker uppercase text-ink-faint transition-colors hover:text-accent"
        >
          <span aria-hidden="true">←</span> All notes
        </Link>
      </nav>

      <article className="mt-10 max-w-3xl">
        <header>
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-faint">
            {formatPostDate(post.published)} · {post.readingMinutes} min read
          </p>
          <h1 className="mt-4 font-display text-display-sm text-ink sm:text-[3.25rem] sm:leading-[1.06] sm:tracking-[-0.02em]">
            {post.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-muted">
            {post.excerpt}
          </p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Topics">
            {post.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-chip border border-line bg-surface px-2.5 py-1 font-mono text-xs text-ink-muted"
              >
                {tag}
              </li>
            ))}
          </ul>
        </header>

        <div className="mt-12">
          <MDXRemote source={post.body} components={mdxComponents} />
        </div>

        <aside className="mt-16 rounded-card border border-line bg-surface p-7 shadow-card">
          <h2 className="font-display text-2xl text-ink">Want the next one?</h2>
          <p className="mt-3 leading-relaxed text-ink-muted">
            Join the list for new notes on the work behind the demos.
          </p>
          <NewsletterForm />
        </aside>
      </article>
    </main>
  );
}
