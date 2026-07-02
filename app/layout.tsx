import type { Metadata } from "next";
import * as React from "react";
import { Inter, JetBrains_Mono, Newsreader } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/**
 * React's <ViewTransition> (enabled by `experimental.viewTransition`
 * in next.config.ts). Next vendors a React build that exports it, but
 * @types/react doesn't know about it yet — hence the cast. Wrapping
 * the route children gives a ~180ms cross-fade between pages;
 * globals.css turns it off under prefers-reduced-motion.
 */
const ViewTransition = (
  React as unknown as {
    ViewTransition: React.ComponentType<{ children: React.ReactNode }>;
  }
).ViewTransition;

/**
 * All three fonts use display:"optional": they're self-hosted +
 * preloaded so they win the render race on normal connections, but a
 * slow first visit falls back to system fonts instead of re-painting
 * the hero headline later (that font-swap repaint was costing ~2s of
 * LCP on throttled mobile).
 */
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: "400", // only weight used — static files beat the variable font
  display: "optional",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "optional",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "optional",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.vandykeportfolio.com"),
  title: {
    default: "Andrew Van Dyke — Full-Stack & AI/ML Engineer",
    template: "%s — Andrew Van Dyke",
  },
  description:
    "Senior full-stack + AI/ML engineer building agentic systems and trading infrastructure. Live demos, case studies, and ways to work together.",
};

/**
 * No-flash theme boot: runs before first paint (blocking inline script,
 * first child of <body>). localStorage 'theme' wins; otherwise the system
 * preference decides, defaulting dark.
 */
const themeInitScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}document.documentElement.setAttribute("data-theme",t)}catch(e){document.documentElement.setAttribute("data-theme","dark")}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${newsreader.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-ink font-sans">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-chip focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-kicker focus:uppercase focus:text-accent-ink"
        >
          Skip to content
        </a>
        <Header />
        <div id="main" className="flex-1 flex flex-col">
          <ViewTransition>{children}</ViewTransition>
        </div>
        <Footer />
      </body>
    </html>
  );
}
