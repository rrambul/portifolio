"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Footer() {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const bgStyle = {
    backgroundColor:
      mounted && resolvedTheme === "dark" ? "rgba(24, 24, 27, 0.3)" : "#ffffff",
  };

  return (
    <footer
      className="py-12 footer-section relative"
      style={{ ...bgStyle, zIndex: 10 }}
    >
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
                  href="https://github.com/RenanRSilva"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block p-2 text-zinc-600 dark:text-zinc-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 transform hover:scale-110"
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
                  href="https://www.linkedin.com/in/renan-rambul/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block p-2 text-zinc-600 dark:text-zinc-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 transform hover:scale-110"
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
                  href="mailto:renan.rambul@gmail.com"
                  className="inline-block p-2 text-zinc-600 dark:text-zinc-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 transform hover:scale-110"
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
                <Link
                  href="/#about"
                  className="inline-block p-2 text-zinc-600 dark:text-zinc-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 transform hover:translate-x-1"
                  style={{
                    position: "relative",
                    zIndex: 51,
                  }}
                >
                  {t("aboutLink")}
                </Link>
              </li>
              <li>
                <Link
                  href="/#experience"
                  className="inline-block p-2 text-zinc-600 dark:text-zinc-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 transform hover:translate-x-1"
                  style={{
                    position: "relative",
                    zIndex: 51,
                  }}
                >
                  {t("experienceLink")}
                </Link>
              </li>
              <li>
                <Link
                  href="/#skills"
                  className="inline-block p-2 text-zinc-600 dark:text-zinc-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 transform hover:translate-x-1"
                  style={{
                    position: "relative",
                    zIndex: 51,
                  }}
                >
                  {t("skillsLink")}
                </Link>
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
            &copy; {currentYear} Renan Rambul. {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
