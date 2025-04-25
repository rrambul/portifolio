"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import { useEffect, useState } from "react";

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
    const center =
      axis === "x" ? window.innerWidth / 2 : window.innerHeight / 2;
    const position = axis === "x" ? mousePosition.x : mousePosition.y;
    const movement =
      ((position - center) /
        (axis === "x" ? window.innerWidth : window.innerHeight)) *
      strength;
    return movement;
  };

  return (
    <section className="py-20 md:py-28 overflow-hidden relative">
      {/* Animated background shapes */}
      <motion.div
        className="absolute top-20 left-10 w-60 h-60 rounded-full bg-purple-200 dark:bg-purple-900 opacity-20 blur-3xl"
        animate={{
          x: calculateMovement("x", 30),
          y: calculateMovement("y", 30),
        }}
        transition={{ type: "spring", damping: 15 }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-indigo-200 dark:bg-indigo-900 opacity-20 blur-3xl"
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
              className="text-xl md:text-2xl text-purple-600 dark:text-purple-400 font-medium mb-2"
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
            <motion.button
              className="inline-flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md transition-all cursor-pointer"
              whileHover={{
                scale: 1.03,
                boxShadow: "0 4px 8px rgba(147, 51, 234, 0.25)",
              }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
            >
              <span>{t("cta")}</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut",
                }}
              >
                <FiArrowRight className="h-5 w-5" />
              </motion.span>
            </motion.button>
          </motion.div>

          <motion.div
            className="flex-1 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
          >
            <motion.div
              className="profile-container relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-purple-600 dark:border-purple-400"
              animate={{
                x: calculateMovement("x", -10),
                y: calculateMovement("y", -10),
                rotateY: calculateMovement("x", 5),
                rotateX: calculateMovement("y", -5),
              }}
              transition={{ type: "spring", damping: 20 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(147, 51, 234, 0.4)",
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
