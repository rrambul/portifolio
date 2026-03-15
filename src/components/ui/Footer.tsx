"use client";

import { useTranslations } from "next-intl";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { siteConfig } from "@/config/site";
import { scrollToSection } from "@/lib/scroll";

export function Footer() {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 footer-section relative bg-white dark:bg-zinc-900/30 z-10">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">{t("about")}</h3>
            <p className="text-zinc-600 dark:text-zinc-400">{t("aboutText")}</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">{t("social")}</h3>
            <div className="flex space-x-8">
              <div style={{ position: "relative", zIndex: 50 }}>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block p-2 text-zinc-600 dark:text-zinc-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200 transform hover:scale-110"
                  style={{
                    position: "relative",
                    zIndex: 51,
                  }}
                >
                  <FiGithub style={{ width: "24px", height: "24px" }} />
                </a>
              </div>

              <div style={{ position: "relative", zIndex: 50 }}>
                <a
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block p-2 text-zinc-600 dark:text-zinc-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200 transform hover:scale-110"
                  style={{
                    position: "relative",
                    zIndex: 51,
                  }}
                >
                  <FiLinkedin style={{ width: "24px", height: "24px" }} />
                </a>
              </div>

              <div style={{ position: "relative", zIndex: 50 }}>
                <a
                  href={`mailto:${siteConfig.links.email}`}
                  className="inline-block p-2 text-zinc-600 dark:text-zinc-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200 transform hover:scale-110"
                  style={{
                    position: "relative",
                    zIndex: 51,
                  }}
                >
                  <FiMail style={{ width: "24px", height: "24px" }} />
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">{t("links")}</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="inline-block p-2 text-zinc-600 dark:text-zinc-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200 transform hover:translate-x-1"
                  style={{
                    position: "relative",
                    zIndex: 51,
                  }}
                >
                  {t("aboutLink")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("experience")}
                  className="inline-block p-2 text-zinc-600 dark:text-zinc-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200 transform hover:translate-x-1"
                  style={{
                    position: "relative",
                    zIndex: 51,
                  }}
                >
                  {t("experienceLink")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("projects")}
                  className="inline-block p-2 text-zinc-600 dark:text-zinc-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200 transform hover:translate-x-1"
                  style={{
                    position: "relative",
                    zIndex: 51,
                  }}
                >
                  {t("projectsLink")}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">{t("contact")}</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              {t("contactText")}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-zinc-800 mt-12 pt-6 text-center text-zinc-600 dark:text-zinc-400">
          <p>
            &copy; {currentYear} {siteConfig.name}. {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
