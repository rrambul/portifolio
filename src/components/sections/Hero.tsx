"use client";

import { useTranslations, useLocale } from "next-intl";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import {
  FiArrowRight,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiChevronDown,
  FiDownload,
} from "react-icons/fi";
import { useEffect } from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { scrollToSection } from "@/lib/scroll";
import { AnimatedButton } from "@/components/ui/AnimatedButton";

export function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const prefersReducedMotion = useReducedMotion();

  // Pointer position as a normalized [-0.5, 0.5] motion value. Using motion
  // values (not state) means the parallax updates without re-rendering React.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const springX = useSpring(pointerX, { stiffness: 100, damping: 15 });
  const springY = useSpring(pointerY, { stiffness: 100, damping: 15 });

  // Derive each element's offset from the smoothed pointer value.
  const blobAX = useTransform(springX, (v) => v * 30);
  const blobAY = useTransform(springY, (v) => v * 30);
  const blobBX = useTransform(springX, (v) => v * -30);
  const blobBY = useTransform(springY, (v) => v * -30);
  const photoX = useTransform(springX, (v) => v * -8);
  const photoY = useTransform(springY, (v) => v * -8);
  const photoRotateY = useTransform(springX, (v) => v * 3);
  const photoRotateX = useTransform(springY, (v) => v * -3);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      pointerX.set(e.clientX / window.innerWidth - 0.5);
      pointerY.set(e.clientY / window.innerHeight - 0.5);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [prefersReducedMotion, pointerX, pointerY]);

  const scrollToContact = () => scrollToSection("contact");

  return (
    <section className="py-20 md:py-28 overflow-hidden relative">
      {/* Animated background shapes */}
      <motion.div
        className="absolute top-20 left-10 w-60 h-60 rounded-full bg-teal-200 dark:bg-teal-900 opacity-20 blur-3xl"
        aria-hidden="true"
        style={{ x: blobAX, y: blobAY }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-cyan-200 dark:bg-cyan-900 opacity-20 blur-3xl"
        aria-hidden="true"
        style={{ x: blobBX, y: blobBY }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Current-role status badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1 mb-5 rounded-full text-xs font-medium bg-violet-50 text-violet-700 border border-violet-200 dark:bg-violet-500/10 dark:text-violet-300 dark:border-violet-500/25"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500 dark:bg-violet-400" />
              </span>
              {t("currentlyAt")}
            </motion.div>

            {/* Not a heading: it precedes the h1 and is purely decorative copy,
                so a heading element here breaks the document outline. */}
            <motion.p
              className="text-xl md:text-2xl text-teal-700 dark:text-teal-400 font-medium mb-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {t("greeting")}
            </motion.p>
            <motion.h1
              className="w-fit text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-zinc-900 via-teal-600 to-violet-600 dark:from-white dark:via-teal-300 dark:to-violet-400 bg-clip-text text-transparent pb-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              {t("title")}
            </motion.h1>
            <motion.p
              className="text-2xl md:text-3xl text-zinc-600 dark:text-zinc-400 mb-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              {t("subtitle")}
            </motion.p>
            <motion.p
              className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 mb-8 max-w-xl"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
            >
              {t("tagline")}
            </motion.p>
            <div className="flex flex-wrap items-center gap-4">
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

            {/* Social Media Icons */}
            <motion.div
              className="flex items-center space-x-6 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.7 }}
            >
              <motion.a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-zinc-500 dark:text-zinc-500 hover:text-teal-700 dark:hover:text-teal-400 transition-colors duration-200 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-900"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiGithub className="w-6 h-6" />
              </motion.a>

              <motion.a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-zinc-500 dark:text-zinc-500 hover:text-teal-700 dark:hover:text-teal-400 transition-colors duration-200 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-900"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiLinkedin className="w-6 h-6" />
              </motion.a>

              <motion.a
                href={`mailto:${siteConfig.links.email}`}
                aria-label="Email"
                className="text-zinc-500 dark:text-zinc-500 hover:text-teal-700 dark:hover:text-teal-400 transition-colors duration-200 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-900"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiMail className="w-6 h-6" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right side with profile photo */}
          <motion.div
            className="flex-1 flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
          >
            {/* Profile photo with a teal-to-violet gradient ring (a padded
                gradient wrapper, since CSS borders can't be gradients on a
                rounded element) */}
            <motion.div
              className="relative w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full p-1 bg-gradient-to-br from-teal-500 via-cyan-400 to-violet-500 dark:from-teal-400 dark:via-cyan-300 dark:to-violet-400 z-10"
              style={{
                x: photoX,
                y: photoY,
                rotateY: photoRotateY,
                rotateX: photoRotateX,
                boxShadow:
                  "0 0 25px rgba(13, 148, 136, 0.35), 0 0 25px rgba(139, 92, 246, 0.25)",
              }}
              whileHover={{
                scale: 1.05,
                boxShadow:
                  "0 10px 30px rgba(13, 148, 136, 0.35), 0 10px 30px rgba(139, 92, 246, 0.35)",
              }}
            >
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image
                  src="/profile-picture.jpg"
                  alt="Renan Rambul"
                  fill
                  className="object-cover profile-image"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll-down cue */}
        <motion.button
          onClick={() => scrollToSection("about")}
          aria-label={t("scrollDown")}
          className="hidden md:flex mx-auto mt-16 items-center justify-center text-zinc-400 dark:text-zinc-500 hover:text-teal-700 dark:hover:text-teal-400 transition-colors rounded-full outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-900"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <FiChevronDown className="h-7 w-7" />
          </motion.span>
        </motion.button>
      </div>
    </section>
  );
}
