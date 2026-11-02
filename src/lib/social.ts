import { siteConfig } from "@/config/site";

/** The profiles the hero and the footer link to, in display order. */
export const socialLinks = [
  { id: "github", label: "GitHub", href: siteConfig.links.github },
  { id: "linkedin", label: "LinkedIn", href: siteConfig.links.linkedin },
  { id: "email", label: "Email", href: `mailto:${siteConfig.links.email}` },
] as const;

export type SocialId = (typeof socialLinks)[number]["id"];

/** `target` and `rel` for an href: a new tab for the web, the same tab for mailto. */
export function externalLinkProps(href: string) {
  return /^https?:\/\//.test(href)
    ? ({ target: "_blank", rel: "noopener noreferrer" } as const)
    : {};
}
