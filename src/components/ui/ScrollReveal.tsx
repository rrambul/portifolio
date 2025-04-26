"use client";

import { ReactNode, useRef } from "react";
import { motion, useInView, TargetAndTransition } from "framer-motion";

type AnimationDirection = "up" | "down" | "left" | "right" | "none";
type AnimationVariant = "fade" | "slide" | "scale" | "rotate";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: AnimationDirection;
  variant?: AnimationVariant;
  className?: string;
  once?: boolean;
  threshold?: number;
}

export function ScrollReveal({
  children,
  delay = 0,
  duration = 0.5,
  direction = "up",
  variant = "fade",
  className = "",
  once = true,
  threshold = 0.2,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });

  // Determine initial and animate states based on variant and direction
  const getAnimationProps = () => {
    const initialProps: TargetAndTransition = {
      opacity:
        variant === "fade" ||
        variant === "slide" ||
        variant === "scale" ||
        variant === "rotate"
          ? 0
          : 1,
      scale: variant === "scale" ? 0.8 : 1,
      rotate: variant === "rotate" ? (direction === "left" ? -5 : 5) : 0,
    };

    if (variant === "slide") {
      switch (direction) {
        case "up":
          initialProps.y = 40;
          break;
        case "down":
          initialProps.y = -40;
          break;
        case "left":
          initialProps.x = 40;
          break;
        case "right":
          initialProps.x = -40;
          break;
        default:
          break;
      }
    }

    return initialProps;
  };

  const animateProps: TargetAndTransition = {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    rotate: 0,
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={getAnimationProps()}
      animate={isInView ? animateProps : getAnimationProps()}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}
