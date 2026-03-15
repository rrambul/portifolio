"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { FiArrowRight, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { useEffect, useState } from "react";
import Image from "next/image";

export function Hero() {
  const t = useTranslations("hero");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const calculateMovement = (axis: "x" | "y", strength = 15) => {
    // Check if window is available (client-side)
    if (typeof window === "undefined") return 0;
    
    const center =
      axis === "x" ? window.innerWidth / 2 : window.innerHeight / 2;
    const position = axis === "x" ? mousePosition.x : mousePosition.y;
    const movement =
      ((position - center) /
        (axis === "x" ? window.innerWidth : window.innerHeight)) *
      strength;
    return movement;
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      const offsetTop = contactSection.offsetTop;
      window.scrollTo({
        top: offsetTop - 80, // Adjust for nav height
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-20 md:py-28 overflow-hidden relative">
      {/* Animated background shapes */}
      <motion.div
        className="absolute top-20 left-10 w-60 h-60 rounded-full bg-teal-200 dark:bg-teal-900 opacity-20 blur-3xl"
        aria-hidden="true"
        animate={{
          x: calculateMovement("x", 30),
          y: calculateMovement("y", 30),
        }}
        transition={{ type: "spring", damping: 15 }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-cyan-200 dark:bg-cyan-900 opacity-20 blur-3xl"
        aria-hidden="true"
        animate={{
          x: calculateMovement("x", -30),
          y: calculateMovement("y", -30),
        }}
        transition={{ type: "spring", damping: 15 }}
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
              className="text-4xl md:text-6xl font-bold mb-4"
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
            <button
              onClick={scrollToContact}
              className="inline-flex items-center space-x-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-md transition-all duration-200 cursor-pointer font-medium hover:scale-105 active:scale-95 group"
            >
              <span>{t("cta")}</span>
              <FiArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
            </button>

            {/* Social Media Icons */}
            <motion.div
              className="flex items-center space-x-6 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.7 }}
            >
              <motion.a
                href="https://github.com/rrambul"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 dark:text-zinc-500 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiGithub className="w-6 h-6" />
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/in/renan-rambul/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 dark:text-zinc-500 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiLinkedin className="w-6 h-6" />
              </motion.a>

              <motion.a
                href="mailto:renanrambuls@gmail.com"
                className="text-zinc-500 dark:text-zinc-500 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200"
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
              animate={{
                x: calculateMovement("x", -8),
                y: calculateMovement("y", -8),
                rotateY: calculateMovement("x", 3),
                rotateX: calculateMovement("y", -3),
              }}
              transition={{ type: "spring", damping: 20 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(13, 148, 136, 0.4)",
              }}
              style={{
                boxShadow: "0 0 25px rgba(13, 148, 136, 0.4)",
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
      </div>
    </section>
  );
}
