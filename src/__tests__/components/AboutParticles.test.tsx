import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, cleanup } from "@testing-library/react";

const h = vi.hoisted(() => ({ reduced: { current: false } }));

vi.mock("next-themes", () => ({
  useTheme: () => ({ resolvedTheme: "dark" }),
}));

vi.mock("framer-motion", () => ({
  useReducedMotion: () => h.reduced.current,
}));

import AboutParticles from "@/components/ui/AboutParticles";

beforeEach(() => {
  h.reduced.current = false;
  window.matchMedia = vi.fn().mockReturnValue({ matches: false }) as never;
});

describe("AboutParticles", () => {
  it("renders a canvas on desktop without reduced motion", () => {
    const { container } = render(<AboutParticles />);
    expect(container.querySelector("canvas")).toBeInTheDocument();
  });

  it("renders nothing when the user prefers reduced motion", () => {
    h.reduced.current = true;
    const { container } = render(<AboutParticles />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders nothing on small screens", () => {
    cleanup();
    window.matchMedia = vi.fn().mockReturnValue({ matches: true }) as never;
    const { container } = render(<AboutParticles />);
    expect(container).toBeEmptyDOMElement();
  });
});
