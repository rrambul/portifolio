import { readFileSync } from "fs";
import { join } from "path";

const CONTENT_DIR = join(process.cwd(), "content", "blog");

/**
 * Read a post's markdown body for a given locale from `content/blog/`.
 * Server-only — it touches the filesystem, so never import it into a client
 * component. Pass the returned string down as a prop instead.
 */
export function getBlogPostContent(
  slug: string,
  locale: "en" | "pt"
): string {
  return readFileSync(join(CONTENT_DIR, `${slug}.${locale}.md`), "utf8");
}
