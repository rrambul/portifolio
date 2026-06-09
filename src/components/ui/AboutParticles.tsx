"use client";

import { useCallback, useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useReducedMotion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";

export default function AboutParticles() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.matchMedia("(max-width: 768px)").matches);
  }, []);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  // Skip the canvas entirely for reduced-motion users and on small screens,
  // where it's the most expensive and least visible.
  if (!mounted || prefersReducedMotion || isMobile) return null;

  return (
    <Particles
      id="about-particles"
      aria-hidden="true"
      init={particlesInit}
      options={{
        particles: {
          number: {
            value: 20,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          color: {
            value: isDark ? "#0d9488" : "#14b8a6",
          },
          shape: {
            type: "circle",
          },
          opacity: {
            value: 0.2,
            random: true,
          },
          size: {
            value: 6,
            random: true,
          },
          move: {
            enable: true,
            speed: 0.5,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "grab",
            },
          },
          modes: {
            grab: {
              distance: 150,
              line_linked: {
                opacity: 0.3,
              },
            },
          },
        },
        retina_detect: true,
        background: {
          color: {
            value: "transparent",
          },
        },
      }}
    />
  );
}
