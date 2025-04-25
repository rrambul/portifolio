"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { motion } from "framer-motion";
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
    <footer className="py-12 footer-section" style={bgStyle}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">{t("about")}</h3>
            <p className="text-zinc-600 dark:text-zinc-400">{t("aboutText")}</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">{t("social")}</h3>
            <div className="flex space-x-4">
              <motion.a
                href="https://github.com/RenanRSilva"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors cursor-pointer"
                aria-label="GitHub"
                whileHover={{ scale: 1.1 }}
              >
                <FiGithub className="h-6 w-6" />
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/in/renan-rambul/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors cursor-pointer"
                aria-label="LinkedIn"
                whileHover={{ scale: 1.1 }}
              >
                <FiLinkedin className="h-6 w-6" />
              </motion.a>

              <motion.a
                href="mailto:contact@example.com"
                className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors cursor-pointer"
                aria-label="Email"
                whileHover={{ scale: 1.1 }}
              >
                <FiMail className="h-6 w-6" />
              </motion.a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">{t("links")}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/#about"
                  className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors cursor-pointer"
                >
                  {t("aboutLink")}
                </Link>
              </li>
              <li>
                <Link
                  href="/#experience"
                  className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors cursor-pointer"
                >
                  {t("experienceLink")}
                </Link>
              </li>
              <li>
                <Link
                  href="/#skills"
                  className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors cursor-pointer"
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
