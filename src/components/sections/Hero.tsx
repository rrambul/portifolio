"use client";

import { useTranslations } from "next-intl";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { FiArrowRight, FiGithub, FiLinkedin, FiMail, FiChevronDown } from "react-icons/fi";
import { useEffect } from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { scrollToSection } from "@/lib/scroll";
import { AnimatedButton } from "@/components/ui/AnimatedButton";

export function Hero() {
  const t = useTranslations("hero");
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
            <motion.h2
              className="text-xl md:text-2xl text-teal-600 dark:text-teal-400 font-medium mb-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {t("greeting")}
            </motion.h2>
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-zinc-900 via-teal-600 to-cyan-600 dark:from-white dark:via-teal-300 dark:to-cyan-300 bg-clip-text text-transparent pb-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              {t("title")}
            </motion.h1>
            <motion.p
              className="text-2xl md:text-3xl text-zinc-600 dark:text-zinc-400 mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              {t("subtitle")}
            </motion.p>
            <AnimatedButton
              onClick={scrollToContact}
              size="lg"
              icon={<FiArrowRight className="h-5 w-5" />}
            >
              {t("cta")}
            </AnimatedButton>

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
                className="text-zinc-500 dark:text-zinc-500 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-900"
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
                className="text-zinc-500 dark:text-zinc-500 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-900"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiLinkedin className="w-6 h-6" />
              </motion.a>

              <motion.a
                href={`mailto:${siteConfig.links.email}`}
                aria-label="Email"
                className="text-zinc-500 dark:text-zinc-500 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-900"
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
            {/* Profile photo */}
            <motion.div
              className="relative w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden border-4 border-teal-600 dark:border-teal-400 z-10"
              style={{
                x: photoX,
                y: photoY,
                rotateY: photoRotateY,
                rotateX: photoRotateX,
                boxShadow: "0 0 25px rgba(13, 148, 136, 0.4)",
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(13, 148, 136, 0.4)",
              }}
            >
              <Image
                src="/profile-picture.jpg"
                alt="Renan Rambul"
                fill
                className="object-cover profile-image"
                priority
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll-down cue */}
        <motion.button
          onClick={() => scrollToSection("about")}
          aria-label={t("scrollDown")}
          className="hidden md:flex mx-auto mt-16 items-center justify-center text-zinc-400 dark:text-zinc-500 hover:text-teal-600 dark:hover:text-teal-400 transition-colors rounded-full outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-900"
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
