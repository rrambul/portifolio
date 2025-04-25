import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { defaultLocale } from "../../../i18n.config";
import { ThemeProvider } from "@/providers/ThemeProvider";

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
