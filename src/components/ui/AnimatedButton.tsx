"use client";

import { ReactNode } from "react";
import { m } from "framer-motion";
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
  // Mono label + flat fill to match the terminal/spec language; the only
  // motion is a subtle scale on hover/press.
  const getBaseClasses = () => {
    const PRIMARY =
      " border border-emerald-600/40 bg-emerald-600/10 text-emerald-800 hover:bg-emerald-600/20 hover:border-emerald-600/60 dark:border-emerald-400/40 dark:bg-emerald-400/10 dark:text-emerald-300 dark:hover:bg-emerald-400/20";

    let classes = `inline-flex items-center justify-center font-accent-mono font-medium transition-colors rounded-md ${focusRing}`;

    // Variant styles. Emerald-700 against white text and emerald-400 on the
    // dark base keep the WCAG AA 4.5:1 contrast ratio.
    switch (variant) {
      case "primary":
        classes += PRIMARY;
        break;
      case "outline":
        classes +=
          " bg-transparent border border-emerald-700 text-emerald-700 dark:border-emerald-400 dark:text-emerald-400 hover:bg-emerald-600/10";
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

  const motionProps = {
    whileHover: disabled ? {} : { scale: 1.02 },
    whileTap: disabled ? {} : { scale: 0.98 },
    transition: { type: "spring" as const, stiffness: 400, damping: 17 },
  };

  const combinedClasses = `${getBaseClasses()} ${className}`;

  if (href) {
    if (download) {
      return (
        <m.a href={href} className={combinedClasses} {...motionProps}>
          {buttonContent}
        </m.a>
      );
    }

    if (isExternal) {
      return (
        <m.a
          href={href}
          className={combinedClasses}
          target="_blank"
          rel="noopener noreferrer"
          {...motionProps}
        >
          {buttonContent}
        </m.a>
      );
    }

    return (
      <m.div {...motionProps}>
        <Link href={href} className={combinedClasses}>
          {buttonContent}
        </Link>
      </m.div>
    );
  }

  return (
    <m.button
      onClick={onClick}
      className={combinedClasses}
      disabled={disabled}
      type={type}
      {...motionProps}
    >
      {buttonContent}
    </m.button>
  );
}
