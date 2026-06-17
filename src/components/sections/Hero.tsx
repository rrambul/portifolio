"use client";

import { useTranslations, useLocale } from "next-intl";
import { m } from "framer-motion";
import {
  FiArrowRight,
  FiArrowDown,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiDownload,
} from "react-icons/fi";
import { siteConfig } from "@/config/site";
import { scrollToSection } from "@/lib/scroll";
import { AnimatedButton } from "@/components/ui/AnimatedButton";

/*
 * The hero is framed as a release header: the site is treated as a product
 * under active development, with a version, a live status, and recent
 * "release notes", instead of a static brochure. Entrance animations are CSS
 * (animate-enter-*) rather than framer because the hero is the LCP and
 * JS-driven entrances would keep it hidden until hydration finishes. Framer
 * only drives post-hydration hover on the social links.
 */

// Illustrative semver, bumped by hand for now. Wiring it (and the notes
// below) to real GitHub activity is the planned follow-up.
const VERSION = "v4.2.0";

export function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();

  const scrollToContact = () => scrollToSection("contact");

  // Repo-style handle for the release panel header (e.g. "renanrambul.dev").
  const repo = siteConfig.url.replace(/^https?:\/\//, "");

  // Release notes. Marker semantics ("+" shipped, "~" in progress) are
  // structural and live here in code; the copy lives in the message files.
  const log = [
    { kind: "add" as const, text: t("logShipped") },
    { kind: "add" as const, text: t("logFortuna") },
    { kind: "add" as const, text: t("logAgents") },
    { kind: "change" as const, text: t("logLearning") },
  ];

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Identity (kept quiet so the release panel carries the page). */}
          <div>
            <h1
              className="mb-3 text-4xl font-bold md:text-6xl animate-enter-fade-left"
              style={{ animationDelay: "0.2s" }}
            >
              {t("title")}
            </h1>

            <p
              className="mb-2 text-xl text-zinc-600 dark:text-zinc-400 md:text-2xl animate-enter-fade-left"
              style={{ animationDelay: "0.3s" }}
            >
              {t("subtitle")}
            </p>
            <p
              className="mb-3 max-w-md text-base text-zinc-600 dark:text-zinc-400 md:text-lg animate-enter-fade-left"
              style={{ animationDelay: "0.38s" }}
            >
              {t("taglineShort")}
            </p>
            <p
              className="mb-8 font-accent-mono text-xs text-zinc-500 dark:text-zinc-400 animate-enter-fade"
              style={{ animationDelay: "0.44s" }}
            >
              {t("currentlyAt")}
            </p>

            <div
              className="flex flex-wrap items-center gap-4 animate-enter-fade-up"
              style={{ animationDelay: "0.55s" }}
            >
              <AnimatedButton
                onClick={scrollToContact}
                size="lg"
                icon={<FiArrowRight className="h-5 w-5" />}
              >
                {t("cta")}
              </AnimatedButton>
              <AnimatedButton
                href={`/api/cv?locale=${locale}`}
                download
                variant="outline"
                size="lg"
                icon={<FiDownload className="h-5 w-5" />}
                iconPosition="left"
              >
                {t("downloadCV")}
              </AnimatedButton>
            </div>

            <div
              className="mt-8 flex items-center gap-6 animate-enter-fade"
              style={{ animationDelay: "0.65s" }}
            >
              <m.a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="rounded-sm text-zinc-500 outline-none transition-colors duration-200 hover:text-emerald-700 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:text-zinc-400 dark:hover:text-emerald-400 dark:focus-visible:ring-offset-zinc-900"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiGithub className="h-6 w-6" />
              </m.a>
              <m.a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="rounded-sm text-zinc-500 outline-none transition-colors duration-200 hover:text-emerald-700 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:text-zinc-400 dark:hover:text-emerald-400 dark:focus-visible:ring-offset-zinc-900"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiLinkedin className="h-6 w-6" />
              </m.a>
              <m.a
                href={`mailto:${siteConfig.links.email}`}
                aria-label="Email"
                className="rounded-sm text-zinc-500 outline-none transition-colors duration-200 hover:text-emerald-700 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:text-zinc-400 dark:hover:text-emerald-400 dark:focus-visible:ring-offset-zinc-900"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiMail className="h-6 w-6" />
              </m.a>
            </div>
          </div>

          {/* Release panel: the signature. A changelog rendered as a release
              card, version tag and live status in the header. */}
          <div
            className="rounded-xl border border-zinc-200 bg-zinc-50/70 p-5 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.03] dark:shadow-none sm:p-6 animate-enter-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="flex items-center justify-between gap-3 font-accent-mono text-sm">
              <span className="truncate text-zinc-700 dark:text-zinc-300">
                {repo}
              </span>
              <span className="shrink-0 rounded-md border border-emerald-600/30 bg-emerald-500/5 px-2 py-0.5 text-emerald-700 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-300">
                {VERSION}
              </span>
            </div>

            <div className="mt-2 flex items-center gap-2 font-accent-mono text-xs text-emerald-700 dark:text-emerald-400">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 dark:bg-emerald-400" />
              </span>
              {t("statusShipping")}
            </div>

            <hr className="my-4 border-zinc-200 dark:border-white/10" />

            <p className="mb-3 font-accent-mono text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              {"// "}
              {t("latest")}
            </p>
            <ul className="space-y-2.5">
              {log.map((entry, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-zinc-700 dark:text-zinc-300"
                >
                  <span
                    className={`select-none font-accent-mono ${
                      entry.kind === "add"
                        ? "text-emerald-700 dark:text-emerald-400"
                        : "text-amber-600 dark:text-amber-400"
                    }`}
                    aria-hidden="true"
                  >
                    {entry.kind === "add" ? "+" : "~"}
                  </span>
                  <span className="text-base md:text-[1.0625rem]">
                    {entry.text}
                  </span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => scrollToSection("about")}
              aria-label={t("scrollDown")}
              className="mt-5 ml-auto flex items-center gap-1.5 rounded-sm font-accent-mono text-xs text-zinc-500 outline-none transition-colors hover:text-emerald-700 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:text-zinc-400 dark:hover:text-emerald-400 dark:focus-visible:ring-offset-zinc-900"
            >
              {t("fullLog")}
              <span className="animate-bob inline-flex">
                <FiArrowDown className="h-4 w-4" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
