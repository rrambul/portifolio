"use client";

import { ReactNode, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface AnimatedButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  isExternal?: boolean;
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
}: AnimatedButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  // Apply base styles based on variant and size
  const getBaseClasses = () => {
    let classes =
      "relative inline-flex items-center justify-center font-medium transition-all rounded-md";

    // Variant styles
    switch (variant) {
      case "primary":
        classes += " bg-teal-600 hover:bg-teal-700 text-white";
        break;
      case "secondary":
        classes += " bg-blue-600 hover:bg-blue-700 text-white";
        break;
      case "outline":
        classes +=
          " bg-transparent border-2 border-teal-600 text-teal-600 hover:bg-teal-600/10";
        break;
      case "ghost":
        classes +=
          " bg-transparent hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200";
        break;
      default:
        classes += " bg-teal-600 hover:bg-teal-700 text-white";
    }

    // Size styles
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

    // Disabled styles
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

      {/* Background animation circle */}
      {!disabled && (
        <motion.span
          className="absolute inset-0 bg-white rounded-md pointer-events-none"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: isPressed ? 1 : 0,
            opacity: isPressed ? 0.2 : 0,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      )}
    </>
  );

  // Animation properties
  const motionProps = {
    whileHover: disabled ? {} : { scale: 1.02 },
    whileTap: disabled ? {} : { scale: 0.98 },
    onTapStart: () => setIsPressed(true),
    onTap: () => setIsPressed(false),
    onTapCancel: () => setIsPressed(false),
    transition: { type: "spring" as const, stiffness: 400, damping: 17 },
  };

  // Combined classes
  const combinedClasses = `${getBaseClasses()} ${className}`;

  // If href is provided, render as Link
  if (href) {
    if (isExternal) {
      return (
        <motion.a
          href={href}
          className={combinedClasses}
          target="_blank"
          rel="noopener noreferrer"
          {...motionProps}
        >
          {buttonContent}
        </motion.a>
      );
    }

    return (
      <motion.div {...motionProps}>
        <Link href={href} className={combinedClasses}>
          {buttonContent}
        </Link>
      </motion.div>
    );
  }

  // Otherwise render as button
  return (
    <motion.button
      onClick={onClick}
      className={combinedClasses}
      disabled={disabled}
      type={type}
      {...motionProps}
    >
      {buttonContent}
    </motion.button>
  );
}
