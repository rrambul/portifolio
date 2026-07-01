/**
 * Strip the leading locale segment (`/en` or `/pt`) from a pathname so locale
 * switches don't read as a route change (and don't retrigger page transitions).
 *
 * The locale must be a full path segment, i.e. followed by `/` or the end of
 * the string, so paths that merely start with those letters (`/end`, `/enter`,
 * `/ptolemy`) are left untouched. A bare locale (`/en`, `/pt`) normalizes to
 * the root `/`.
 *
 * Mirrors the inline logic previously in TransitionProvider, with a segment
 * boundary added to prevent false-prefix matches.
 */
export function stripLocale(pathname: string): string {
  return pathname.replace(/^\/(en|pt)(?=\/|$)/, "") || "/";
}
