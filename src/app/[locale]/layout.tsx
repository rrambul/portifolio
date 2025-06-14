import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "../../../i18n.config";
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
  params: Promise<{ locale: string }>;
}) {
  // Await params before accessing properties (Next.js 15 requirement)
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!locales.includes(locale as "en" | "pt")) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
