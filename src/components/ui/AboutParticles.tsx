"use client";

import React, { useCallback, useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";

export default function AboutParticles() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  if (!mounted) return null;

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
