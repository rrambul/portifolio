import type { Metadata, Viewport } from "next";
import { Outfit, Space_Grotesk, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n/config";
import "../globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { TransitionProvider } from "@/providers/TransitionProvider";
import { siteConfig } from "@/config/site";
import { buildPersonJsonLd, buildWebSiteJsonLd } from "@/lib/structured-data";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Body text.
const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700"],
});

// Headings: geometric + slightly technical, distinct from the body.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

// Monospace accents (status badge, stat numbers): signals "engineer".
const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  // Every page sets its own absolute title through `buildMetadata`; this is
  // the fallback for routes that do not (the 404 page).
  title: siteConfig.title,
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  // Icons (src/app/icon.svg, src/app/favicon.ico) and the web manifest
  // (src/app/manifest.ts) are wired automatically by Next's file conventions,
  // so they are intentionally not declared here (a single source of truth).
  // OpenGraph and Twitter are per page too (src/lib/metadata.ts), because a
  // root default would carry one locale for both languages.
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Set GOOGLE_SITE_VERIFICATION in the environment (e.g. Vercel) to the
  // token from Search Console; rendered only when present.
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0f10" },
  ],
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    // `suppressHydrationWarning`: next-themes sets the theme class on <html>
    // from its own inline script before React hydrates.
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildPersonJsonLd()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildWebSiteJsonLd()),
          }}
        />
      </head>
      <body
        className={`${outfit.variable} ${spaceGrotesk.variable} ${geistMono.variable}`}
      >
        <ThemeProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <TransitionProvider>{children}</TransitionProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
        {/* Cookieless analytics + real-user Web Vitals (production only). */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
