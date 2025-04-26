"use client";

import { ReactNode, useEffect } from "react";
import { motion, useAnimation, Variant } from "framer-motion";
import { useInView } from "react-intersection-observer";

type AnimationVariant =
  | "fadeIn"
  | "fadeInUp"
  | "fadeInDown"
  | "fadeInLeft"
  | "fadeInRight"
  | "zoomIn"
  | "staggered";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  threshold?: number;
  staggerChildren?: number;
  once?: boolean;
}

interface AnimationVariants {
  hidden: Variant;
  fadeIn: Variant;
  fadeInUp: Variant;
  fadeInDown: Variant;
  fadeInLeft: Variant;
  fadeInRight: Variant;
  zoomIn: Variant;
  staggered: Variant & { transition?: { staggerChildren: number } };
}

// Combined type for variants with transition properties
interface VariantWithTransition {
  opacity?: number;
  y?: number;
  x?: number;
  scale?: number;
  transition?: {
    staggerChildren?: number;
    duration?: number;
    delay?: number;
    [key: string]: unknown;
  };
}

const variants: AnimationVariants = {
  hidden: {
    opacity: 0,
    y: 0,
    x: 0,
    scale: 1,
  },
  fadeIn: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
  },
  fadeInUp: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
  },
  fadeInDown: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
  },
  fadeInLeft: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
  },
  fadeInRight: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
  },
  zoomIn: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
  },
  staggered: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const getHiddenVariant = (variant: AnimationVariant): Variant => {
  switch (variant) {
    case "fadeInUp":
      return { ...variants.hidden, y: 40 };
    case "fadeInDown":
      return { ...variants.hidden, y: -40 };
    case "fadeInLeft":
      return { ...variants.hidden, x: -40 };
    case "fadeInRight":
      return { ...variants.hidden, x: 40 };
    case "zoomIn":
      return { ...variants.hidden, scale: 0.9 };
    default:
      return variants.hidden;
  }
};

export function AnimatedSection({
  children,
  className = "",
  variant = "fadeInUp",
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  staggerChildren = 0.1,
  once = true,
}: AnimatedSectionProps) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold,
    triggerOnce: once,
  });

  useEffect(() => {
    if (inView) {
      controls.start(variant);
    } else if (!once) {
      controls.start("hidden");
    }
  }, [controls, inView, variant, once]);

  const hiddenVariant = getHiddenVariant(variant);
  const visibleVariant = variants[variant];

  // Pass staggerChildren to appropriate variant
  if (variant === "staggered" && visibleVariant.transition) {
    visibleVariant.transition.staggerChildren = staggerChildren;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: hiddenVariant,
        [variant]: {
          ...visibleVariant,
          transition: {
            ...(visibleVariant.transition || {}),
            duration,
            delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedItem({
  children,
  className = "",
  variant = "fadeInUp",
  delay = 0,
  duration = 0.5,
}: Omit<AnimatedSectionProps, "threshold" | "once" | "staggerChildren">) {
  const hiddenVariant = getHiddenVariant(variant);
  const selectedVariant = variants[variant] as unknown as VariantWithTransition;

  return (
    <motion.div
      className={className}
      variants={{
        hidden: hiddenVariant,
        [variant]: {
          ...selectedVariant,
          transition: {
            ...(selectedVariant.transition || {}),
            duration,
            delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
