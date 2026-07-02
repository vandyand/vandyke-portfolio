import type { Metadata } from "next";
import EmberwickEmbed from "./EmberwickEmbed";

export const metadata: Metadata = {
  title: "Embed spike — Emberwick",
  robots: { index: false },
};

export default function SpikePage() {
  return (
    <main style={{ maxWidth: 960, margin: "0 auto", padding: "2rem 1rem" }}>
      <h1 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>
        Phase 0 spike: Emberwick embed (poster → click-to-load iframe)
      </h1>
      <EmberwickEmbed />
      <p style={{ marginTop: "1rem", opacity: 0.7, fontSize: "0.875rem" }}>
        Poster paints immediately; the town viewer only loads on explicit
        click. Never auto-loads (reduced-motion safe by construction).
      </p>
    </main>
  );
}
