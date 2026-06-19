"use client";

import { useTranslations } from "next-intl";
import { m } from "framer-motion";
import { FiExternalLink, FiGithub, FiStar, FiGitPullRequest } from "react-icons/fi";
import { projects } from "@/data/projects";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cardClass } from "@/lib/ui";

/** "owner/repo" handle from a GitHub URL, e.g. "rrambul/portifolio". */
function repoHandle(githubUrl?: string) {
  if (!githubUrl) return null;
  return githubUrl.replace(/^https?:\/\/github\.com\//, "").replace(/\/$/, "");
}

/** Bare host of a URL, e.g. "fortuna.up.railway.app" (for live-only projects). */
function siteHandle(url?: string) {
  if (!url) return null;
  return url.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
}

export function Projects() {
  const t = useTranslations("projects");

  return (
    <section id="projects" className="bg-zinc-100 py-20 dark:bg-zinc-900/40">
      <div className="container mx-auto px-4">
        <m.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mx-auto max-w-5xl"
        >
          <SectionHeading
            label="projects"
            title={t("title")}
            subtitle={t("subtitle")}
            meta={`${projects.length} projects`}
          />

          <m.div
            variants={staggerContainer}
            className="grid gap-6 md:grid-cols-2"
          >
            {projects.map((project) => {
              const handle =
                repoHandle(project.githubUrl) ?? siteHandle(project.demoUrl);
              return (
                <m.article
                  key={project.titleKey}
                  variants={fadeInUp}
                  className={`${cardClass} group flex flex-col backdrop-blur-sm hover:border-emerald-500/50 sm:p-6`}
                >
                  {/* Header: repo handle + status tags */}
                  <div className="flex items-center justify-between gap-3 font-accent-mono text-sm">
                    <span className="truncate text-zinc-700 dark:text-zinc-300">
                      {handle ?? t(project.titleKey)}
                    </span>
                    <div className="flex shrink-0 items-center gap-2">
                      {project.isContribution && (
                        <span className="inline-flex items-center gap-1 rounded-md border border-amber-500/30 bg-amber-500/10 px-1.5 py-0.5 text-xs text-amber-700 dark:text-amber-300">
                          <FiGitPullRequest
                            className="h-3 w-3"
                            aria-hidden="true"
                          />
                          {t("contribution")}
                        </span>
                      )}
                      {project.stars ? (
                        <span className="inline-flex items-center gap-1 rounded-md border border-zinc-300/70 px-1.5 py-0.5 text-xs text-zinc-500 dark:border-white/15 dark:text-zinc-400">
                          <FiStar className="h-3 w-3" aria-hidden="true" />
                          <span>{project.stars}</span>
                        </span>
                      ) : null}
                      {project.demoUrl && !project.isContribution ? (
                        <span className="inline-flex items-center gap-1.5 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-1.5 py-0.5 text-xs text-emerald-700 dark:text-emerald-400">
                          <span
                            className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400"
                            aria-hidden="true"
                          />
                          live
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <h3 className="mt-4 text-xl font-bold transition-colors group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                    {t(project.titleKey)}
                  </h3>
                  <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                    {t(project.descriptionKey)}
                  </p>

                  {/* Dependencies (tech stack) */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded border border-zinc-200 px-1.5 py-0.5 font-accent-mono text-xs text-zinc-500 dark:border-white/10 dark:text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="mt-auto flex gap-4 border-t border-zinc-100 pt-4 dark:border-white/10">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 font-accent-mono text-xs text-emerald-700 transition-colors hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
                      >
                        <FiExternalLink className="h-4 w-4" />
                        {t("liveDemo")}
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 font-accent-mono text-xs text-emerald-700 transition-colors hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
                      >
                        <FiGithub className="h-4 w-4" />
                        {t("sourceCode")}
                      </a>
                    )}
                  </div>
                </m.article>
              );
            })}
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
