import React from "react";

/**
 * Shared manual mock for framer-motion used across the test suite.
 *
 * `motion.<tag>` renders the plain DOM element, stripping animation-only props
 * so they don't leak onto the DOM. Components are memoized per tag so their
 * identity is stable across renders (a state update won't remount the node).
 * The hooks return inert-but-compatible values so components relying on motion
 * values / scroll progress / reduced-motion render without a real engine.
 */

const MOTION_ONLY_PROPS = new Set([
  "transition",
  "variants",
  "viewport",
  "exit",
  "layout",
  "layoutId",
  "drag",
  "dragConstraints",
  "onTapStart",
  "onTap",
  "onTapCancel",
]);

const cache = new Map<
  string,
  React.FC<React.PropsWithChildren<Record<string, unknown>>>
>();

export const motion: Record<
  string,
  React.FC<React.PropsWithChildren<Record<string, unknown>>>
> = new Proxy({} as never, {
  get: (_target, prop: string) => {
    if (!cache.has(prop)) {
      cache.set(prop, ({ children, ...props }) => {
        const Tag = prop as keyof React.JSX.IntrinsicElements;
        const domProps: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(props)) {
          if (
            key.startsWith("while") ||
            key.startsWith("animate") ||
            key.startsWith("initial") ||
            MOTION_ONLY_PROPS.has(key)
          ) {
            continue;
          }
          domProps[key] = value;
        }
        return <Tag {...domProps}>{children}</Tag>;
      });
    }
    return cache.get(prop);
  },
});

export const AnimatePresence = ({ children }: React.PropsWithChildren) => (
  <>{children}</>
);

export const MotionConfig = ({ children }: React.PropsWithChildren) => (
  <>{children}</>
);

export const useReducedMotion = () => false;

export const useMotionValue = (initial: number) => ({
  set: () => {},
  get: () => initial,
});

export const useSpring = (value: unknown) => value;

export const useTransform = (_source: unknown, fn?: (v: number) => number) =>
  typeof fn === "function" ? fn(0) : 0;

export const useScroll = () => ({ scrollYProgress: 0 });
