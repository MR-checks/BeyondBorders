import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTop from "@/components/BackToTop";
import Background from "@/components/Background";
import { siteConfig } from "@/lib/siteConfig";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const description =
  "Visas, study abroad and travel across Turkey and beyond. 6,000+ applicants placed globally, with a 100% visa success rate.";

export const metadata: Metadata = {
  title: {
    template: "%s | BeyondBorders",
    default: "BeyondBorders | Visa, Study Abroad & Turkey Travel",
  },
  description,
  metadataBase: new URL(siteConfig.url),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: "BeyondBorders | Visa, Study Abroad & Turkey Travel",
    description,
    url: siteConfig.url,
    images: [{ url: "/images/turkey/cappadocia.webp", width: 1200, height: 800 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BeyondBorders",
    description,
    images: ["/images/turkey/cappadocia.webp"],
  },
};

/**
 * Colours match --bg-center in globals.css, the top of the page background,
 * so the browser chrome continues the page rather than sitting against it.
 *
 * Deliberately no viewport-fit: cover. Covering the safe area stops the browser
 * tinting the status bar and makes the page responsible for painting it, which
 * is the fragile path. Minaret and mariscapharmacy both leave it at the default
 * and blend correctly.
 *
 * These two entries cover the system preference. ThemeToggle rewrites the tag
 * at runtime when someone overrides the theme by hand.
 */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FDF6EA" },
    { media: "(prefers-color-scheme: dark)", color: "#321608" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nonce = (await headers()).get("x-nonce") ?? "";

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`scroll-smooth ${fraunces.variable} ${manrope.variable}`}
    >
      <body className="antialiased font-sans min-h-screen flex flex-col relative z-0">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[999] focus:rounded-xl focus:bg-cta focus:px-4 focus:py-2 focus:font-bold focus:text-white"
        >
          Skip to content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          nonce={nonce}
        >
          <Background />
          <Nav />
          <main id="main" className="flex-grow">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
          <BackToTop />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
