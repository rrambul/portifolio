"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useTransition } from "react";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const isEN = locale === "en";

  const switchLocale = (newLocale: string) => {
    if (newLocale === locale || isPending) return;
    startTransition(() => {
      router.replace(pathname, { locale: newLocale, scroll: false });
    });
  };

  const base =
    "flex h-full items-center px-2.5 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:cursor-not-allowed";
  const active = "text-emerald-700 dark:text-emerald-400";
  const inactive =
    "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200";

  return (
    <div
      role="radiogroup"
      aria-label="Language selector"
      className="inline-flex h-9 items-center overflow-hidden rounded-md border border-zinc-200 font-accent-mono text-xs dark:border-white/10"
    >
      <button
        onClick={() => switchLocale("en")}
        role="radio"
        aria-checked={isEN}
        aria-label="English"
        disabled={isPending}
        className={`${base} ${isEN ? active : inactive}`}
      >
        EN
      </button>
      <span
        className="h-full w-px bg-zinc-200 dark:bg-white/10"
        aria-hidden="true"
      />
      <button
        onClick={() => switchLocale("pt")}
        role="radio"
        aria-checked={!isEN}
        aria-label="Português"
        disabled={isPending}
        className={`${base} ${!isEN ? active : inactive}`}
      >
        PT
      </button>
    </div>
  );
}
