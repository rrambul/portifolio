"use client";

import { useTranslations, useLocale } from "next-intl";
import { FiArrowDown } from "react-icons/fi";
import { siteConfig } from "@/config/site";
import { scrollToSection } from "@/lib/scroll";
import { focusRing, sectionCol } from "@/lib/ui";

/*
 * Editorial hero: one narrow column where the type does the work. Identity,
 * a row of plain text links, and the release log rendered as a bare list,
 * no panels or boxes. Entrance animations are CSS (animate-enter-*) rather
 * than framer because the hero is the LCP and JS-driven entrances would keep
 * it hidden until hydration finishes.
 */

export function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();

  const socials = [
    { href: siteConfig.links.github, label: "GitHub" },
    { href: siteConfig.links.linkedin, label: "LinkedIn" },
    { href: `mailto:${siteConfig.links.email}`, label: "Email" },
  ];

  // Release notes. Marker semantics ("+" shipped, "~" in progress) are
  // structural and live here in code; the copy lives in the message files.
  const log = [
    { kind: "add" as const, text: t("logShipped") },
    { kind: "add" as const, text: t("logFortuna") },
    { kind: "add" as const, text: t("logAgents") },
    { kind: "change" as const, text: t("logLearning") },
  ];

  const linkClass = `rounded-sm font-accent-mono text-sm text-zinc-600 underline decoration-zinc-300 underline-offset-4 transition-colors hover:text-emerald-700 hover:decoration-emerald-600/50 dark:text-zinc-400 dark:decoration-zinc-700 dark:hover:text-emerald-400 dark:hover:decoration-emerald-400/50 ${focusRing}`;

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className={sectionCol}>
          <h1
            className="text-4xl font-bold md:text-5xl animate-enter-fade-left"
            style={{ animationDelay: "0.2s" }}
          >
            {t("title")}
          </h1>

          <p
            className="mt-3 text-lg text-zinc-600 dark:text-zinc-400 md:text-xl animate-enter-fade-left"
            style={{ animationDelay: "0.3s" }}
          >
            {t("subtitle")}
          </p>
          <p
            className="mt-1 text-lg text-zinc-600 dark:text-zinc-400 md:text-xl animate-enter-fade-left"
            style={{ animationDelay: "0.38s" }}
          >
            {t("taglineShort")}
          </p>
          <p
            className="mt-4 font-accent-mono text-xs text-zinc-500 dark:text-zinc-400 animate-enter-fade"
            style={{ animationDelay: "0.44s" }}
          >
            {t("currentlyAt")}
          </p>

          {/* Actions and socials as one row of plain text links. The CTA is a
              button (it scrolls, it doesn't navigate) styled like the links
              but in the accent color so it still reads as the primary action. */}
          <div
            className="mt-8 flex flex-wrap items-baseline gap-x-6 gap-y-3 animate-enter-fade-up"
            style={{ animationDelay: "0.55s" }}
          >
            <button
              onClick={() => scrollToSection("contact")}
              className={`rounded-sm font-accent-mono text-sm text-emerald-700 underline decoration-emerald-600/40 underline-offset-4 transition-colors hover:decoration-emerald-600 dark:text-emerald-400 dark:decoration-emerald-400/40 dark:hover:decoration-emerald-400 ${focusRing}`}
            >
              {t("cta")}
            </button>
            <a href={`/api/cv?locale=${locale}`} className={linkClass}>
              {t("downloadCV")}
            </a>
            {socials.map(({ href, label }) => {
              const external = href.startsWith("http");
              return (
                <a
                  key={label}
                  href={href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className={linkClass}
                >
                  {label}
                </a>
              );
            })}
          </div>

          {/* Release log: the signature, kept as a bare list. */}
          <div className="mt-16 animate-enter-fade" style={{ animationDelay: "0.65s" }}>
            <div className="flex items-baseline justify-between gap-4">
              <p className="font-accent-mono text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                {"// "}
                {t("latest")}
              </p>
              <span className="flex shrink-0 items-center gap-2 font-accent-mono text-xs text-emerald-700 dark:text-emerald-400">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400"
                  aria-hidden="true"
                />
                {t("statusShipping")}
              </span>
            </div>

            <ul className="mt-4 space-y-2.5">
              {log.map((entry) => (
                <li
                  key={entry.text}
                  className="flex gap-3 text-zinc-700 dark:text-zinc-300"
                >
                  <span
                    className={`select-none font-accent-mono ${
                      entry.kind === "add"
                        ? "text-emerald-700 dark:text-emerald-400"
                        : "text-zinc-400 dark:text-zinc-500"
                    }`}
                    aria-hidden="true"
                  >
                    {entry.kind === "add" ? "+" : "~"}
                  </span>
                  <span>{entry.text}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => scrollToSection("about")}
              aria-label={t("scrollDown")}
              className={`mt-6 flex items-center gap-1.5 rounded-sm font-accent-mono text-xs text-zinc-500 transition-colors hover:text-emerald-700 dark:text-zinc-400 dark:hover:text-emerald-400 ${focusRing}`}
            >
              {t("fullLog")}
              <FiArrowDown className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
