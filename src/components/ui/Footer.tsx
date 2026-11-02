"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import type { IconType } from "react-icons";
import { siteConfig } from "@/config/site";
import { anchor, navigateTo } from "@/lib/nav";
import { socialLinks, externalLinkProps, type SocialId } from "@/lib/social";
import { StatusDot } from "@/components/ui/Status";
import { focusRing } from "@/lib/ui";

const SOCIAL_ICONS: Record<SocialId, IconType> = {
  github: FiGithub,
  linkedin: FiLinkedin,
  email: FiMail,
};

export function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const router = useRouter();
  const currentYear = new Date().getFullYear();

  // Homepage anchors. Going through `navigateTo` means they still work from a
  // page that has no sections, such as /learning, by routing to the homepage.
  const quickLinks = [
    { id: "about", label: t("aboutLink") },
    { id: "experience", label: t("experienceLink") },
    { id: "projects", label: t("projectsLink") },
  ];

  const goTo = (id: string) => navigateTo(router, locale, anchor(id));

  return (
    <footer className="footer-section relative z-10 border-t border-zinc-200 py-12 dark:border-white/10">
      <div className="container mx-auto px-4">
        <div className="mx-auto flex max-w-2xl flex-col gap-10">
          {/* Colophon */}
          <div className="max-w-sm">
            <button
              onClick={() => goTo("about")}
              className={`flex items-center gap-1.5 rounded-sm font-accent-mono text-base font-semibold ${focusRing}`}
            >
              <span className="text-emerald-600 dark:text-emerald-400" aria-hidden="true">
                ❯
              </span>
              {siteConfig.host}
            </button>
            <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">{t("aboutText")}</p>
          </div>

          {/* Quick links + social */}
          <div className="flex gap-12">
            <div className="flex flex-col gap-2 font-accent-mono text-sm">
              {quickLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => goTo(link.id)}
                  className={`rounded-sm text-left text-zinc-500 transition-colors hover:text-emerald-700 dark:text-zinc-400 dark:hover:text-emerald-400 ${focusRing}`}
                >
                  {link.label}
                </button>
              ))}
            </div>
            <div className="flex h-fit gap-2">
              {socialLinks.map(({ id, href, label }) => {
                const Icon = SOCIAL_ICONS[id];
                return (
                  <a
                    key={id}
                    href={href}
                    aria-label={label}
                    {...externalLinkProps(href)}
                    className={`inline-flex h-9 w-9 items-center justify-center rounded-md border border-zinc-200 text-zinc-500 transition-colors hover:border-emerald-500/50 hover:text-emerald-600 dark:border-white/10 dark:text-zinc-400 dark:hover:text-emerald-400 ${focusRing}`}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom line: copyright + the release tag, echoing the hero. */}
        <div className="mx-auto mt-10 flex max-w-2xl flex-col gap-2 border-t border-zinc-200 pt-6 font-accent-mono text-xs text-zinc-500 dark:border-white/10 dark:text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
          <span>
            &copy; {currentYear} {siteConfig.name}. {t("copyright")}
          </span>
          <span className="flex items-center gap-2">
            <StatusDot />
            v4.2.0
          </span>
        </div>
      </div>
    </footer>
  );
}
