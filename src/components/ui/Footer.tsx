"use client";

import { useTranslations } from "next-intl";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { siteConfig } from "@/config/site";
import { scrollToSection } from "@/lib/scroll";

// Tech I build with.
const STACK = [
  "JavaScript",
  "TypeScript",
  "Web Components",
  "Next.js",
  "Node.js",
  "React",
  "Tailwind",
  "AI",
];

export function Footer() {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { id: "about", label: t("aboutLink") },
    { id: "experience", label: t("experienceLink") },
    { id: "projects", label: t("projectsLink") },
  ];

  const socials = [
    { href: siteConfig.links.github, label: "GitHub", Icon: FiGithub, external: true },
    {
      href: siteConfig.links.linkedin,
      label: "LinkedIn",
      Icon: FiLinkedin,
      external: true,
    },
    { href: `mailto:${siteConfig.links.email}`, label: "Email", Icon: FiMail, external: false },
  ];

  return (
    <footer className="footer-section relative z-10 border-t border-zinc-200 py-12 dark:border-white/10">
      <div className="container mx-auto px-4">
        <div className="mx-auto flex max-w-2xl flex-col gap-10">
          {/* Colophon */}
          <div className="max-w-sm">
            <button
              onClick={() => scrollToSection("about")}
              className="flex items-center gap-1.5 rounded-sm font-accent-mono text-base font-semibold outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              <span
                className="text-emerald-600 dark:text-emerald-400"
                aria-hidden="true"
              >
                ❯
              </span>
              renanrambul.dev
            </button>
            <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
              {t("aboutText")}
            </p>
            <p className="mt-4 font-accent-mono text-xs text-zinc-500 dark:text-zinc-400">
              {STACK.join("  ·  ")}
            </p>
          </div>

          {/* Quick links + social */}
          <div className="flex gap-12">
            <div className="flex flex-col gap-2 font-accent-mono text-sm">
              {quickLinks.map((l) => (
                <button
                  key={l.id}
                  onClick={() => scrollToSection(l.id)}
                  className="rounded-sm text-left text-zinc-500 outline-none transition-colors hover:text-emerald-700 focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-zinc-400 dark:hover:text-emerald-400"
                >
                  {l.label}
                </button>
              ))}
            </div>
            <div className="flex h-fit gap-2">
              {socials.map(({ href, label, Icon, external }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-zinc-200 text-zinc-500 outline-none transition-colors hover:border-emerald-500/50 hover:text-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-white/10 dark:text-zinc-400 dark:hover:text-emerald-400"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom line: copyright + the release tag, echoing the hero. */}
        <div className="mx-auto mt-10 flex max-w-2xl flex-col gap-2 border-t border-zinc-200 pt-6 font-accent-mono text-xs text-zinc-500 dark:border-white/10 dark:text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
          <span>
            &copy; {currentYear} {siteConfig.name}. {t("copyright")}
          </span>
          <span className="flex items-center gap-2">
            <span
              className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400"
              aria-hidden="true"
            />
            v4.2.0
          </span>
        </div>
      </div>
    </footer>
  );
}
