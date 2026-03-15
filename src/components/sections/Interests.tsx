"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  FiLayers,
  FiBox,
  FiCpu,
  FiSmile,
  FiGrid,
  FiCheckSquare,
  FiUsers,
  FiZap,
} from "react-icons/fi";

const interests = [
  { key: "designSystems", icon: FiLayers, color: "#0d9488" },
  { key: "webComponents", icon: FiBox, color: "#0f766e" },
  { key: "platformEngineering", icon: FiCpu, color: "#14b8a6" },
  { key: "dx", icon: FiSmile, color: "#115e59" },
  { key: "scalableUI", icon: FiGrid, color: "#2dd4bf" },
  { key: "testing", icon: FiCheckSquare, color: "#0d9488" },
  { key: "performance", icon: FiZap, color: "#14b8a6" },
  { key: "openSource", icon: FiUsers, color: "#0f766e" },
];

export function Interests() {
  const t = useTranslations("interests");

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 24, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring" as const, stiffness: 260, damping: 20 },
    },
  };

  return (
    <section
      id="interests"
      className="py-20 bg-zinc-50 dark:bg-zinc-900/50 relative overflow-hidden"
    >
      {/* Subtle background decoration */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-[0.04] dark:opacity-[0.06]"
          style={{
            background:
              "radial-gradient(circle, #14b8a6 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={container}
          className="max-w-4xl mx-auto"
        >
          {/* Section heading */}
          <motion.div variants={item} className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-sm font-medium text-teal-600 dark:text-teal-400 mb-3 tracking-wide uppercase">
              {t("subtitle")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">{t("title")}</h2>
          </motion.div>

          {/* Interest cards */}
          <motion.div
            variants={container}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {interests.map(({ key, icon: Icon, color }) => (
              <motion.div
                key={key}
                variants={item}
                whileHover={{
                  y: -4,
                  transition: { type: "spring", stiffness: 400, damping: 17 },
                }}
                className="group relative flex items-center gap-4 p-5 rounded-xl
                  bg-white dark:bg-zinc-800/80
                  border border-zinc-200 dark:border-zinc-700/60
                  shadow-sm hover:shadow-md
                  transition-shadow duration-300 cursor-default"
              >
                {/* Icon container */}
                <div
                  className="flex-shrink-0 w-11 h-11 rounded-lg flex items-center justify-center
                    transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `${color}18`,
                  }}
                >
                  <Icon
                    className="w-5 h-5 transition-colors duration-300"
                    style={{ color }}
                  />
                </div>

                {/* Text */}
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200 leading-snug">
                  {t(`items.${key}`)}
                </span>

                {/* Hover accent line */}
                <motion.div
                  className="absolute bottom-0 left-5 right-5 h-[2px] rounded-full origin-left"
                  style={{ backgroundColor: color }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileHover={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
