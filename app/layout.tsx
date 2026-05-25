import type { Metadata } from "next";
import { headers } from "next/headers";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

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

export const metadata: Metadata = {
  title: {
    template: "%s | BeyondBorders",
    default: "BeyondBorders | Visa & Travel Consultancy",
  },
  description: "Your trusted partner for international education and travel. 6,000+ applicants placed globally. 100% visa success rate.",
  metadataBase: new URL("https://divebeyondborders.com"),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nonce = (await headers()).get('x-nonce') ?? '';

  return (
    <html lang="en" suppressHydrationWarning className={`${fraunces.variable} ${manrope.variable}`}>
      <body className="antialiased font-sans min-h-screen flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange nonce={nonce}>
          <Nav />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
