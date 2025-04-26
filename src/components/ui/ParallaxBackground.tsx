"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxProps {
  children: ReactNode;
  speed?: number;
  direction?: "up" | "down";
  className?: string;
  offset?: number;
}

interface ParallaxLayerProps {
  children: ReactNode;
  speed: number;
  className?: string;
}

export function ParallaxLayer({
  children,
  speed,
  className = "",
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Transform scroll progress to y position based on speed
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);

  return (
    <motion.div ref={ref} style={{ y }} className={`relative ${className}`}>
      {children}
    </motion.div>
  );
}

export function ParallaxBackground({
  children,
  speed = 2,
  direction = "up",
  className = "",
  offset = 100,
}: ParallaxProps) {
  const [windowHeight, setWindowHeight] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const actualSpeed = direction === "up" ? -speed : speed;

  // Get window dimensions for calculating parallax effect
  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate scroll-based parallax effect
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, windowHeight], [0, offset * actualSpeed]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y }}
        transition={{ type: "spring", stiffness: 100, damping: 30 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
