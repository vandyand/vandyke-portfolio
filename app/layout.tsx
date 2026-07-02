import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Newsreader } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
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
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
