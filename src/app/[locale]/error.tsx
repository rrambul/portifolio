"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { FiRefreshCw, FiArrowLeft } from "react-icons/fi";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("error");
  const locale = useLocale();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-2xl font-bold">{t("title")}</h1>
      <p className="mt-2 max-w-md text-zinc-600 dark:text-zinc-400">
        {t("description")}
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-md bg-teal-700 hover:bg-teal-800 px-5 py-2.5 font-medium text-white transition-colors outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-900"
        >
          <FiRefreshCw className="h-4 w-4" />
          {t("retry")}
        </button>
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 rounded-md border border-zinc-300 dark:border-zinc-700 px-5 py-2.5 font-medium transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-900"
        >
          <FiArrowLeft className="h-4 w-4" />
          {t("home")}
        </Link>
      </div>
    </main>
  );
}
