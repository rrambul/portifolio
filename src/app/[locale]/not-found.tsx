"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { FiArrowLeft } from "react-icons/fi";

export default function NotFound() {
  const t = useTranslations("notFound");
  const locale = useLocale();

  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <p
        className="font-accent-mono text-7xl font-bold text-emerald-700 dark:text-emerald-400 md:text-8xl"
        aria-hidden="true"
      >
        404
      </p>
      <h1 className="mt-4 text-2xl font-bold">{t("title")}</h1>
      <p className="mt-2 max-w-md text-zinc-600 dark:text-zinc-400">
        {t("description")}
      </p>
      <Link
        href={`/${locale}`}
        className="mt-8 inline-flex items-center gap-2 rounded-md bg-zinc-900 px-5 py-2.5 font-accent-mono font-medium text-white transition-colors hover:bg-zinc-700 outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white dark:focus-visible:ring-offset-zinc-900"
      >
        <FiArrowLeft className="h-4 w-4" />
        {t("home")}
      </Link>
    </main>
  );
}
