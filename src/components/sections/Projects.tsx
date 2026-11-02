"use client";

import { useTranslations } from "next-intl";
import { m } from "framer-motion";
import { FiExternalLink, FiGithub, FiStar, FiGitPullRequest } from "react-icons/fi";
import { projects } from "@/data/projects";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { hostOf, repoHandle } from "@/lib/url";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Section } from "@/components/ui/Section";
import { LiveStatus } from "@/components/ui/Status";

const LINK =
  "inline-flex items-center gap-1.5 text-emerald-700 transition-colors hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300";

export function Projects() {
  const t = useTranslations("projects");

  return (
    /* `loose`: projects open a new movement after the experience/skills pair. */
    <Section id="projects" spacing="loose">
      <m.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <SectionHeading
          label="projects"
          title={t("title")}
          subtitle={t("subtitle")}
          meta={t("count", { count: projects.length })}
        />

        {/* Projects as an editorial list separated by hairline rules. */}
        <m.div
          variants={staggerContainer}
          className="divide-y divide-zinc-200 dark:divide-white/10"
        >
          {projects.map((project) => {
            // The repo handle when there is one, else the bare host of the live site.
            const handle = project.githubUrl
              ? repoHandle(project.githubUrl)
              : project.demoUrl
                ? hostOf(project.demoUrl)
                : null;
            return (
              <m.article
                key={project.id}
                variants={fadeInUp}
                className="py-8 first:pt-0 last:pb-0"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-lg font-bold">{t(`${project.id}.title`)}</h3>
                  {handle ? (
                    <span className="font-accent-mono text-xs text-zinc-500 dark:text-zinc-400">
                      {handle}
                    </span>
                  ) : null}
                </div>

                <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                  {t(`${project.id}.description`)}
                </p>

                {/* Status and links in one mono line. */}
                <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 font-accent-mono text-xs">
                  {project.demoUrl && !project.isContribution ? (
                    <LiveStatus>{t("live")}</LiveStatus>
                  ) : null}
                  {project.isContribution && (
                    <span className="inline-flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
                      <FiGitPullRequest className="h-3 w-3" aria-hidden="true" />
                      {t("contribution")}
                    </span>
                  )}
                  {project.stars ? (
                    <span className="inline-flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
                      <FiStar className="h-3 w-3" aria-hidden="true" />
                      <span>{project.stars}</span>
                    </span>
                  ) : null}
                  {project.demoUrl && (
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className={LINK}>
                      <FiExternalLink className="h-3.5 w-3.5" />
                      {t("liveDemo")}
                    </a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={LINK}>
                      <FiGithub className="h-3.5 w-3.5" />
                      {t("sourceCode")}
                    </a>
                  )}
                </div>

                {/* Dependencies (tech stack) */}
                <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
                  {project.tags.map((tag) => (
                    <span key={tag} className="font-accent-mono text-xs text-zinc-500 dark:text-zinc-400">
                      {tag}
                    </span>
                  ))}
                </div>
              </m.article>
            );
          })}
        </m.div>
      </m.div>
    </Section>
  );
}
