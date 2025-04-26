"use client";

import { motion } from "framer-motion";

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
  animate?: boolean;
}

interface SkeletonTextProps extends SkeletonProps {
  lines?: number;
  lineHeight?: string | number;
  spacing?: string | number;
}

// Base skeleton component that shows a loading placeholder
export function Skeleton({
  className = "",
  width = "100%",
  height = "1rem",
  borderRadius = "0.25rem",
  animate = true,
}: SkeletonProps) {
  return (
    <div
      className={`bg-zinc-200 dark:bg-zinc-700 relative overflow-hidden ${className}`}
      style={{
        width,
        height,
        borderRadius,
      }}
    >
      {animate && (
        <motion.div
          className="absolute inset-0 -translate-x-full"
          animate={{
            x: ["0%", "200%"],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent)",
          }}
        />
      )}
    </div>
  );
}

// Text skeleton with multiple lines
export function SkeletonText({
  lines = 3,
  lineHeight = "1rem",
  spacing = "0.5rem",
  width,
  className = "",
  animate = true,
  borderRadius = "0.25rem",
}: SkeletonTextProps) {
  // Create array with number of lines
  const items = Array.from({ length: lines }, (_, i) => i);

  return (
    <div
      className={`space-y-${
        typeof spacing === "string" ? spacing : `[${spacing}]`
      } ${className}`}
    >
      {items.map((i) => (
        <Skeleton
          key={i}
          width={
            i === items.length - 1 && typeof width === "string"
              ? `calc(${width} * 0.6)`
              : width
          }
          height={lineHeight}
          borderRadius={borderRadius}
          animate={animate}
        />
      ))}
    </div>
  );
}

// Card skeleton
export function SkeletonCard({
  className = "",
  height = "20rem",
  animate = true,
}: SkeletonProps) {
  return (
    <div className={`rounded-lg overflow-hidden shadow ${className}`}>
      <Skeleton height="10rem" animate={animate} />
      <div className="p-4 space-y-3">
        <Skeleton height="1.5rem" width="70%" animate={animate} />
        <SkeletonText lines={3} animate={animate} />
        <div className="flex gap-2 pt-2">
          <Skeleton
            width="5rem"
            height="2rem"
            animate={animate}
            borderRadius="9999px"
          />
          <Skeleton
            width="5rem"
            height="2rem"
            animate={animate}
            borderRadius="9999px"
          />
        </div>
      </div>
    </div>
  );
}

// Avatar skeleton
export function SkeletonAvatar({
  size = "3rem",
  animate = true,
  className = "",
}: SkeletonProps & { size?: string | number }) {
  return (
    <Skeleton
      width={size}
      height={size}
      borderRadius="9999px"
      animate={animate}
      className={className}
    />
  );
}

// Grid of skeleton items
export function SkeletonGrid({
  items = 6,
  columns = 3,
  gap = "1rem",
  className = "",
  itemHeight = "20rem",
}) {
  return (
    <div
      className={`grid gap-${
        typeof gap === "string" ? gap : `[${gap}]`
      } ${className}`}
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}
    >
      {Array.from({ length: items }, (_, i) => (
        <SkeletonCard key={i} height={itemHeight} />
      ))}
    </div>
  );
}

// Content loader that shows skeleton while loading
export function ContentLoader({
  children,
  isLoading,
  skeleton,
  className = "",
}) {
  return <div className={className}>{isLoading ? skeleton : children}</div>;
}
