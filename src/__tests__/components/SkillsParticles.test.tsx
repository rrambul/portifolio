import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";

const h = vi.hoisted(() => ({ reduced: { current: false } }));

vi.mock("next-themes", () => ({
  useTheme: () => ({ theme: "dark" }),
}));

vi.mock("framer-motion", () => ({
  useReducedMotion: () => h.reduced.current,
}));

const loadSlim = vi.fn();
vi.mock("tsparticles-slim", () => ({ loadSlim: (...a: unknown[]) => loadSlim(...a) }));

vi.mock("react-tsparticles", () => ({
  default: ({ init }: { init?: (engine: unknown) => Promise<void> }) => {
    init?.({});
    return <div data-testid="particles" />;
  },
}));

import SkillsParticles from "@/components/ui/SkillsParticles";

beforeEach(() => {
  h.reduced.current = false;
  loadSlim.mockClear();
  window.matchMedia = vi.fn().mockReturnValue({ matches: false }) as never;
});

describe("SkillsParticles", () => {
  it("renders the particle canvas on desktop without reduced motion", () => {
    render(<SkillsParticles />);
    expect(screen.getByTestId("particles")).toBeInTheDocument();
    expect(loadSlim).toHaveBeenCalled();
  });

  it("renders nothing when the user prefers reduced motion", () => {
    h.reduced.current = true;
    const { container } = render(<SkillsParticles />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders nothing on small screens", () => {
    cleanup();
    window.matchMedia = vi.fn().mockReturnValue({ matches: true }) as never;
    const { container } = render(<SkillsParticles />);
    expect(container).toBeEmptyDOMElement();
  });
});
