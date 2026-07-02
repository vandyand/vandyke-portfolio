import { ImageResponse } from "next/og";
import { getAllProjects } from "@/lib/content";

export const dynamic = "force-static";

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

/**
 * Fetch a Google-hosted font subset for exactly the glyphs we render.
 * Build-time only (route is force-static). Failure is non-fatal — the
 * card falls back to next/og's bundled sans.
 */
async function loadGoogleFont(
  family: string,
  text: string,
  weight = 400,
  italic = false,
): Promise<ArrayBuffer | null> {
  try {
    const fam = `${family.replace(/ /g, "+")}:${italic ? "ital," : ""}wght@${
      italic ? "1," : ""
    }${weight}`;
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=${fam}&text=${encodeURIComponent(text)}`,
      // A UA that gets TTF/OTF back (not woff2 — satori can't parse woff2).
      { headers: { "User-Agent": "Mozilla/5.0 (compatible; satori)" } },
    ).then((r) => r.text());
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    if (!url) return null;
    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const project = getAllProjects().find((p) => p.slug === slug);
  if (!project) return new Response("Not found", { status: 404 });

  const kicker = `${project.year} · Andrew Van Dyke`;
  const stack = project.stack.slice(0, 5);
  const displayText = project.title;
  const monoText = `${kicker}${stack.join("")}vandykeportfolio.com`;

  const [newsreader, jetbrains] = await Promise.all([
    loadGoogleFont("Newsreader", displayText, 500),
    loadGoogleFont("JetBrains Mono", monoText, 400),
  ]);

  const fonts = [
    ...(newsreader
      ? [{ name: "Newsreader", data: newsreader, weight: 500 as const }]
      : []),
    ...(jetbrains
      ? [{ name: "JetBrains Mono", data: jetbrains, weight: 400 as const }]
      : []),
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#16120e",
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 85% -10%, rgba(245,158,11,0.16), rgba(22,18,14,0))",
          color: "#ece5da",
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: jetbrains ? "JetBrains Mono" : "monospace",
            fontSize: 26,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#f59e0b",
          }}
        >
          {kicker}
        </div>

        <div
          style={{
            display: "flex",
            fontFamily: newsreader ? "Newsreader" : "serif",
            fontSize: project.title.length > 28 ? 76 : 92,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            maxWidth: 1000,
          }}
        >
          {project.title}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", gap: 12 }}>
            {stack.map((tech) => (
              <div
                key={tech}
                style={{
                  display: "flex",
                  padding: "10px 18px",
                  borderRadius: 10,
                  border: "1px solid #423a2e",
                  backgroundColor: "#1e1913",
                  fontFamily: jetbrains ? "JetBrains Mono" : "monospace",
                  fontSize: 22,
                  color: "#a89f92",
                }}
              >
                {tech}
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: jetbrains ? "JetBrains Mono" : "monospace",
              fontSize: 22,
              color: "#7a7164",
            }}
          >
            vandykeportfolio.com
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630, fonts: fonts.length ? fonts : undefined },
  );
}
