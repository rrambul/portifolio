import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// jsdom doesn't implement matchMedia; provide a default (non-matching) stub so
// components that read it (e.g. the particle layers) don't throw. Individual
// tests can override window.matchMedia to simulate small screens. (Guarded for
// suites that opt into the node environment, where there is no window.)
if (typeof window !== "undefined" && !window.matchMedia) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}
