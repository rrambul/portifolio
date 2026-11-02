"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { Fragment, useTransition } from "react";
import { locales, type Locale } from "@/i18n/config";

/**
 * Each option is named in its own language on purpose, so a visitor who
 * cannot read the current locale can still find theirs. Only the group label
 * is translated. Keyed by `Locale`, so adding a locale to the config does not
 * compile until it has an entry here.
 */
const OPTIONS: Record<Locale, { code: string; name: string }> = {
  en: { code: "EN", name: "English" },
  pt: { code: "PT", name: "Português" },
};

/**
 * Inset rather than the shared `focusRing`: the buttons fill a container that
 * clips its overflow, so an outset ring with an offset would be cut away.
 */
const FOCUS_INSET =
  "outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-500";

export function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations("language");
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === locale || isPending) return;
    startTransition(() => {
      router.replace(pathname, { locale: newLocale, scroll: false });
    });
  };

  const base = `flex h-full items-center px-2.5 transition-colors disabled:cursor-not-allowed ${FOCUS_INSET}`;
  const active = "text-emerald-700 dark:text-emerald-400";
  const inactive =
    "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200";

  return (
    <div
      role="radiogroup"
      aria-label={t("label")}
      className="inline-flex h-9 items-center overflow-hidden rounded-md border border-zinc-200 font-accent-mono text-xs dark:border-white/10"
    >
      {locales.map((option, index) => (
        <Fragment key={option}>
          {index > 0 && (
            <span className="h-full w-px bg-zinc-200 dark:bg-white/10" aria-hidden="true" />
          )}
          <button
            onClick={() => switchLocale(option)}
            role="radio"
            aria-checked={locale === option}
            aria-label={OPTIONS[option].name}
            disabled={isPending}
            className={`${base} ${locale === option ? active : inactive}`}
          >
            {OPTIONS[option].code}
          </button>
        </Fragment>
      ))}
    </div>
  );
}
