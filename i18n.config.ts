export const defaultLocale = "en";
export const locales = ["en", "pt"] as const;

export type Locale = (typeof locales)[number];

/** Narrowing type guard: is an arbitrary string one of our supported locales? */
export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
