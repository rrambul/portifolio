"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { focusRing } from "@/lib/ui";

interface AnimatedButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  isExternal?: boolean;
  /** Render a plain same-tab anchor (e.g. file downloads served with
   *  Content-Disposition) instead of a Next.js Link, which would prefetch. */
  download?: boolean;
}

export function AnimatedButton({
  children,
  href,
  onClick,
  className = "",
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "right",
  disabled = false,
  type = "button",
  isExternal = false,
  download = false,
}: AnimatedButtonProps) {
  // Mono label, flat monochrome fills and hairline outlines: the emerald
  // accent stays in the small markers, so buttons only change color on hover.
  const getBaseClasses = () => {
    const PRIMARY =
      " bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white";

    let classes = `inline-flex items-center justify-center font-accent-mono font-medium transition-colors rounded-md ${focusRing}`;

    switch (variant) {
      case "primary":
        classes += PRIMARY;
        break;
      case "outline":
        classes +=
          " bg-transparent border border-zinc-300 text-zinc-800 hover:border-zinc-500 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-400";
        break;
      case "ghost":
        classes +=
          " bg-transparent hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200";
        break;
      default:
        classes += PRIMARY;
    }

    switch (size) {
      case "sm":
        classes += " px-3 py-1.5 text-sm";
        break;
      case "md":
        classes += " px-4 py-2 text-base";
        break;
      case "lg":
        classes += " px-6 py-3 text-lg";
        break;
      default:
        classes += " px-4 py-2 text-base";
    }

    if (disabled) {
      classes += " opacity-60 cursor-not-allowed";
    }

    return classes;
  };

  const buttonContent = (
    <>
      {icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
    </>
  );

  const combinedClasses = `${getBaseClasses()} ${className}`;

  if (href) {
    if (download) {
      return (
        <a href={href} className={combinedClasses}>
          {buttonContent}
        </a>
      );
    }

    if (isExternal) {
      return (
        <a
          href={href}
          className={combinedClasses}
          target="_blank"
          rel="noopener noreferrer"
        >
          {buttonContent}
        </a>
      );
    }

    return (
      <Link href={href} className={combinedClasses}>
        {buttonContent}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={combinedClasses}
      disabled={disabled}
      type={type}
    >
      {buttonContent}
    </button>
  );
}
