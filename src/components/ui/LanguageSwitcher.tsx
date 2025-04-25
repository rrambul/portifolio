"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { FiGlobe } from "react-icons/fi";

export function LanguageSwitcher() {
  const t = useTranslations("language");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const switchLocale = (newLocale: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="flex items-center space-x-1 rounded-md border p-2 cursor-pointer"
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <FiGlobe className="h-5 w-5" />
        <span className="hidden sm:inline">
          {locale === "en" ? "English" : "Português"}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-48 rounded-md border bg-white shadow-lg dark:bg-zinc-800 dark:border-zinc-700">
          <div className="py-1" role="menu" aria-orientation="vertical">
            <button
              className={`w-full text-left px-4 py-2 text-sm cursor-pointer ${
                locale === "en" ? "bg-purple-100 dark:bg-zinc-700" : ""
              }`}
              onClick={() => switchLocale("en")}
              role="menuitem"
            >
              {t("english")}
            </button>
            <button
              className={`w-full text-left px-4 py-2 text-sm cursor-pointer ${
                locale === "pt" ? "bg-purple-100 dark:bg-zinc-700" : ""
              }`}
              onClick={() => switchLocale("pt")}
              role="menuitem"
            >
              {t("portuguese")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
