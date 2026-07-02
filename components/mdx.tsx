import type { MDXComponents } from "mdx/types";
import Image from "next/image";

/**
 * Styled MDX primitives for case-study bodies.
 *
 * The convention in content/projects/*.mdx: h2 = section markers
 * (Problem / What I built / Outcome) rendered as mono kickers to echo
 * the home page's section labels; everything else is calm long-form
 * prose.
 */
export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2
      className="mt-14 border-t border-line pt-8 font-mono text-kicker uppercase text-accent first:mt-0 first:border-t-0 first:pt-0"
      {...props}
    />
  ),
  h3: (props) => (
    <h3 className="mt-8 font-display text-2xl text-ink" {...props} />
  ),
  p: (props) => (
    <p className="mt-5 leading-relaxed text-ink-muted" {...props} />
  ),
  ul: (props) => (
    <ul
      className="mt-5 flex list-disc flex-col gap-2.5 pl-5 leading-relaxed text-ink-muted marker:text-accent"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="mt-5 flex list-decimal flex-col gap-2.5 pl-5 leading-relaxed text-ink-muted marker:text-accent"
      {...props}
    />
  ),
  li: (props) => <li className="pl-1" {...props} />,
  strong: (props) => <strong className="font-medium text-ink" {...props} />,
  em: (props) => <em className="text-ink" {...props} />,
  a: (props) => (
    <a
      className="text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
      rel="noopener"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="rounded-[0.25rem] bg-surface-2 px-1.5 py-0.5 font-mono text-[0.85em] text-ink"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="mt-6 overflow-x-auto rounded-card border border-line bg-surface p-5 font-mono text-sm leading-relaxed text-ink-muted [&_code]:bg-transparent [&_code]:p-0"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="mt-6 border-l-2 border-accent pl-5 font-display text-xl italic text-ink"
      {...props}
    />
  ),
  hr: () => <hr className="my-10 border-line" />,
  table: (props) => (
    <div className="mt-6 overflow-x-auto rounded-card border border-line">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  thead: (props) => (
    <thead
      className="bg-surface font-mono text-xs uppercase tracking-[0.1em] text-ink-faint"
      {...props}
    />
  ),
  th: (props) => (
    <th className="border-b border-line px-4 py-3 text-left font-medium" {...props} />
  ),
  td: (props) => (
    <td
      className="border-b border-line px-4 py-3 align-top leading-relaxed text-ink-muted last:border-b-0"
      {...props}
    />
  ),
  img: ({ src, alt }) => (
    // Support images inside MDX bodies — plain rendering, full width.
    <Image
      src={typeof src === "string" ? src : ""}
      alt={alt ?? ""}
      width={1104}
      height={620}
      className="mt-6 w-full rounded-card border border-line shadow-card"
    />
  ),
};
