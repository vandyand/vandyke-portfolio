import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

/**
 * Content layer: content/projects/*.mdx → validated Project objects.
 * Build-time only (fs access). MDX bodies are rendered with
 * next-mdx-remote/rsc in the case-study pages (Phase 3).
 */

const heroSchema = z.object({
  type: z.enum(["video", "poster", "embed"]),
  /** Base dir under /public for video heroes, e.g. "/heroes/agent-world"
   *  (expects cover.webm + cover.mp4 inside). */
  video: z.string().optional(),
  /** Poster/still image. Optional — a project may declare type "poster"
   *  before its asset exists (generated in Phase 3); renderers must
   *  fall back gracefully. */
  poster: z.string().optional(),
  /** Embed URL for type "embed" (e.g. the vendored Emberwick viewer). */
  embed: z.string().optional(),
  /** Alt text for the poster/still. */
  alt: z.string().optional(),
});

/** One sub-demo inside a combined, tabbed project (e.g. "Agentic AI"). */
const demoSchema = z.object({
  key: z.string(),
  title: z.string().min(1),
  tagline: z.string().min(1),
  poster: z.string(),
  alt: z.string().optional(),
  live: z.string().url(),
  repo: z.string().url().optional(),
  highlights: z.array(z.string()).default([]),
});
export type Demo = z.infer<typeof demoSchema>;

export const projectSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  tagline: z.string().min(1),
  year: z.number().int().gte(2015).lte(2100),
  role: z.string().min(1),
  stack: z.array(z.string()).min(1),
  links: z
    .object({
      live: z.string().url().optional(),
      repo: z.string().url().optional(),
    })
    .default({}),
  hero: heroSchema,
  featured: z.boolean().default(false),
  order: z.number().int().default(99),
  outcome: z.string().min(1),
  keywords: z.array(z.string()).default([]),
  /** When present, the case-study page renders a tabbed multi-demo showcase
   *  instead of a single hero + body. */
  demos: z.array(demoSchema).optional(),
});

export type ProjectFrontmatter = z.infer<typeof projectSchema>;
export type Project = ProjectFrontmatter & {
  /** Raw MDX body (compiled per-page with next-mdx-remote/rsc). */
  body: string;
};

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

export function getAllProjects(): Project[] {
  const files = fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .sort();

  const projects = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(PROJECTS_DIR, file), "utf8");
    const { data, content } = matter(raw);
    const parsed = projectSchema.safeParse({ ...data, slug });
    if (!parsed.success) {
      throw new Error(
        `Invalid frontmatter in content/projects/${file}:\n${parsed.error.message}`,
      );
    }
    return { ...parsed.data, body: content };
  });

  return projects.sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug));
}

export function getProject(slug: string): Project | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((p) => p.featured);
}
