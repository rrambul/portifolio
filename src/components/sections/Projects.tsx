"use client";

import { useTranslations } from "next-intl";
import { m } from "framer-motion";
import { FiExternalLink, FiGithub, FiFolder, FiStar, FiGitPullRequest } from "react-icons/fi";
import { projects } from "@/data/projects";
import { staggerContainer, fadeInUp, cardHover } from "@/lib/animations";
import { SectionHeading } from "@/components/ui/SectionHeading";

function BannerPattern({ pattern, className }: { pattern: string; className?: string }) {
  switch (pattern) {
    case "grid":
      return (
        <svg className={className} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      );
    case "dots":
      return (
        <svg className={className} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1.5" fill="currentColor" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      );
    case "waves":
      return (
        <svg className={className} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,40 C80,10 160,70 240,40 C320,10 400,70 480,40 C560,10 640,70 720,40 L720,0 L0,0 Z" fill="currentColor" opacity="0.08" />
          <path d="M0,60 C80,30 160,90 240,60 C320,30 400,90 480,60 C560,30 640,90 720,60 L720,0 L0,0 Z" fill="currentColor" opacity="0.05" />
          <path d="M0,80 C100,50 200,110 300,80 C400,50 500,110 600,80 C700,50 720,60 720,60 L720,0 L0,0 Z" fill="currentColor" opacity="0.03" />
        </svg>
      );
    case "circuit":
      return (
        <svg className={className} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <pattern id="circuit" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M30,0 L30,20 M30,40 L30,60 M0,30 L20,30 M40,30 L60,30" stroke="currentColor" strokeWidth="0.5" opacity="0.25" fill="none" />
              <circle cx="30" cy="30" r="3" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
              <circle cx="30" cy="30" r="1" fill="currentColor" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      );
    default:
      return null;
  }
}

export function Projects() {
  const t = useTranslations("projects");

  return (
    <section id="projects" className="py-20 bg-zinc-100 dark:bg-zinc-900/40">
      <div className="container mx-auto px-4">
        <m.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-6xl mx-auto"
        >
          <SectionHeading
            icon={<FiFolder className="text-teal-700 dark:text-teal-400 h-8 w-8" />}
            title={t("title")}
            subtitle={t("subtitle")}
          />

          <m.div
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-8"
          >
            {projects.map((project, idx) => (
              <m.div
                key={idx}
                variants={fadeInUp}
                whileHover={cardHover}
                className="group rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-zinc-700 hover:shadow-xl transition-shadow duration-300"
              >
                {/* Project Banner */}
                <div className="relative h-36 w-full overflow-hidden" style={project.bannerStyle}>
                  {/* Pattern overlay */}
                  <div className="absolute inset-0 text-white/60">
                    <BannerPattern pattern={project.banner.pattern} className="absolute inset-0" />
                  </div>

                  {/* Project icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl opacity-70 drop-shadow select-none">{project.banner.icon}</span>
                  </div>

                  {/* Bottom fade */}
                  <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/20 to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-3 right-3 flex gap-2" style={{ zIndex: 5 }}>
                    {project.isContribution && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-violet-500/90 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
                        <FiGitPullRequest className="h-3 w-3" />
                        {t("contribution")}
                      </span>
                    )}
                    {project.stars && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-black/50 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
                        <FiStar className="h-3 w-3" />
                        {project.stars}
                      </span>
                    )}
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6 flex flex-col bg-white dark:bg-zinc-800" style={{ position: "relative", zIndex: 10 }}>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors">
                    {t(project.titleKey)}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                    {t(project.descriptionKey)}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className="px-3 py-1 bg-teal-50 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300 text-xs rounded-full font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4 pt-3 border-t border-gray-100 dark:border-zinc-700" style={{ position: "relative", zIndex: 20, marginTop: "auto" }}>
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm font-medium text-teal-700 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 hover:underline transition-colors"
                        style={{ position: "relative", zIndex: 21 }}
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
                        className="flex items-center gap-1.5 text-sm font-medium text-teal-700 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 hover:underline transition-colors"
                        style={{ position: "relative", zIndex: 21 }}
                      >
                        <FiGithub className="h-4 w-4" />
                        {t("sourceCode")}
                      </a>
                    )}
                  </div>
                </div>
              </m.div>
            ))}
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
