import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

const h = vi.hoisted(() => ({ pathname: { current: "/en" } }));

vi.mock("next/navigation", () => ({
  usePathname: () => h.pathname.current,
}));

vi.mock("framer-motion");

import { TransitionProvider } from "@/providers/TransitionProvider";

beforeEach(() => {
  h.pathname.current = "/en";
});

describe("TransitionProvider", () => {
  it("renders its children", () => {
    render(
      <TransitionProvider>
        <div data-testid="child">content</div>
      </TransitionProvider>
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("does not animate the session's first page", () => {
    const { container } = render(
      <TransitionProvider>
        <div data-testid="child">a</div>
      </TransitionProvider>
    );
    expect(
      container.querySelector(".animate-page-enter")
    ).not.toBeInTheDocument();
  });

  it("animates the entrance once the visitor navigates", () => {
    const { container, rerender } = render(
      <TransitionProvider>
        <div data-testid="child">a</div>
      </TransitionProvider>
    );
    h.pathname.current = "/en/learning";
    rerender(
      <TransitionProvider>
        <div data-testid="child">b</div>
      </TransitionProvider>
    );
    expect(container.querySelector(".animate-page-enter")).toBeInTheDocument();
  });

  it("strips the locale prefix from the transition key", () => {
    h.pathname.current = "/pt/about";
    const { rerender } = render(
      <TransitionProvider>
        <div data-testid="child">a</div>
      </TransitionProvider>
    );
    h.pathname.current = "/en/about";
    rerender(
      <TransitionProvider>
        <div data-testid="child">b</div>
      </TransitionProvider>
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });
});
