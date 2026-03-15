"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useTransition } from "react";
import { motion } from "framer-motion";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const isEN = locale === "en";

  const switchLocale = (newLocale: string) => {
    if (newLocale === locale || isPending) return;
    startTransition(() => {
      router.replace(pathname, { locale: newLocale, scroll: false });
    });
  };

  return (
    <motion.div
      className="relative flex items-center h-9 w-[4.5rem] rounded-full cursor-pointer select-none"
      style={{
        background: isEN
          ? "linear-gradient(135deg, #134e4a, #0f766e)"
          : "linear-gradient(135deg, #134e4a, #0f766e)",
        boxShadow:
          "inset 0 1px 3px rgba(0,0,0,0.3), 0 0 8px rgba(20,184,166,0.15)",
      }}
      whileTap={{ scale: 0.95 }}
      role="radiogroup"
      aria-label="Language selector"
    >
      {/* Sliding knob */}
      <motion.div
        className="absolute top-1 left-1 h-7 w-8 rounded-full z-10"
        style={{
          background: "linear-gradient(135deg, #0d9488, #14b8a6)",
          boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
        }}
        initial={false}
        animate={{ x: isEN ? 0 : 32 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      />

      {/* EN button */}
      <button
        onClick={() => switchLocale("en")}
        className="relative z-20 flex-1 h-full flex items-center justify-center border-0 bg-transparent cursor-pointer outline-none"
        role="radio"
        aria-checked={isEN}
        aria-label="English"
        disabled={isPending}
      >
        <motion.span
          className="text-xs font-bold"
          animate={{
            color: isEN ? "#ffffff" : "rgba(153, 246, 228, 0.5)",
          }}
          transition={{ duration: 0.2 }}
        >
          EN
        </motion.span>
      </button>

      {/* PT button */}
      <button
        onClick={() => switchLocale("pt")}
        className="relative z-20 flex-1 h-full flex items-center justify-center border-0 bg-transparent cursor-pointer outline-none"
        role="radio"
        aria-checked={!isEN}
        aria-label="Português"
        disabled={isPending}
      >
        <motion.span
          className="text-xs font-bold"
          animate={{
            color: !isEN ? "#ffffff" : "rgba(153, 246, 228, 0.5)",
          }}
          transition={{ duration: 0.2 }}
        >
          PT
        </motion.span>
      </button>
    </motion.div>
  );
}
