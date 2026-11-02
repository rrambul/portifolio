/** Bare host of a URL, without a leading "www.": "fortuna.up.railway.app". */
export function hostOf(url: string): string {
  return new URL(url).host.replace(/^www\./, "");
}

/**
 * A URL the way a person would type it: host plus path, no scheme, no "www.",
 * no trailing slash. "https://www.linkedin.com/in/x/" -> "linkedin.com/in/x".
 */
export function displayUrl(url: string): string {
  return `${hostOf(url)}${new URL(url).pathname.replace(/\/$/, "")}`;
}

/** "owner/repo" from a GitHub URL. */
export function repoHandle(url: string): string {
  return new URL(url).pathname.replace(/^\/|\/$/g, "");
}
