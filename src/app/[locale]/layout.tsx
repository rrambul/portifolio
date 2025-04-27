import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { defaultLocale } from "../../../i18n.config";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Renan Rambul | Portfolio",
  description: "Renan Rambul - Software Developer Portfolio",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      {
        url: "/favicon/favicon-16x16.png.svg",
        sizes: "16x16",
        type: "image/svg+xml",
      },
      {
        url: "/favicon/favicon-32x32.png.svg",
        sizes: "32x32",
        type: "image/svg+xml",
      },
      {
        url: "/favicon/favicon-48x48.png.svg",
        sizes: "48x48",
        type: "image/svg+xml",
      },
    ],
    apple: "/favicon/favicon.svg",
  },
};

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "pt" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Fix for the warning about params.locale
  const resolvedLocale = String(params?.locale || defaultLocale);

  let messages;
  try {
    messages = (await import(`@/messages/${resolvedLocale}/index.json`))
      .default;
  } catch {
    notFound();
  }

  return (
    <NextIntlClientProvider locale={resolvedLocale} messages={messages}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
