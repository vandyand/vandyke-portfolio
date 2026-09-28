import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

const postSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  excerpt: z.string().min(1),
  published: z.coerce.date(),
  tags: z.array(z.string().min(1)).default([]),
  draft: z.boolean().default(false),
});

export type BlogPost = z.infer<typeof postSchema> & {
  body: string;
  readingMinutes: number;
};

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

function removeEmDashes(value: unknown): unknown {
  if (typeof value === "string") return value.replaceAll("\u2014", " - ");
  if (value instanceof Date) return value;
  if (Array.isArray(value)) return value.map(removeEmDashes);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [key, removeEmDashes(entry)]),
    );
  }
  return value;
}

function readingMinutes(body: string) {
  return Math.max(1, Math.ceil(body.trim().split(/\s+/).filter(Boolean).length / 220));
}

/** Build-time content layer for content/blog/*.mdx. */
export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const posts = fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .sort()
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
      const { data, content } = matter(raw);
      const parsed = postSchema.safeParse({
        ...(removeEmDashes(data) as Record<string, unknown>),
        slug,
      });

      if (!parsed.success) {
        throw new Error(
          `Invalid frontmatter in content/blog/${file}:\n${parsed.error.message}`,
        );
      }

      const body = removeEmDashes(content) as string;
      return { ...parsed.data, body, readingMinutes: readingMinutes(body) };
    });

  return posts
    .filter((post) => !post.draft)
    .sort((a, b) => b.published.getTime() - a.published.getTime());
}

export function getPost(slug: string): BlogPost | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

export function formatPostDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
