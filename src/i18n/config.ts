export const locales = ["en", "pt"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/** Narrowing type guard: is an arbitrary string one of our supported locales? */
export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Narrow a locale that arrived untyped (route params, `useLocale()`) to a
 * supported one, falling back to the default rather than to nothing.
 */
export function toLocale(value: string): Locale {
  return isLocale(value) ? value : defaultLocale;
}

/** BCP 47 tags for the Intl APIs, which want a region to pick date formats. */
const LOCALE_TAGS: Record<Locale, string> = { en: "en-US", pt: "pt-BR" };

export function localeTag(locale: string): string {
  return LOCALE_TAGS[toLocale(locale)];
}

/** OpenGraph wants the underscore form. */
const OG_LOCALES: Record<Locale, string> = { en: "en_US", pt: "pt_BR" };

export function ogLocale(locale: string): string {
  return OG_LOCALES[toLocale(locale)];
}
