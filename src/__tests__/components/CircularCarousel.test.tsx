import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, act, cleanup } from "@testing-library/react";
import { CircularCarousel } from "@/components/ui/CircularCarousel";

const items = [
  { id: 1, name: "React", icon: <span data-testid="icon">⚛️</span> },
  { id: 2, name: "TypeScript", icon: <span data-testid="icon">TS</span> },
  { id: 3, name: "Node", icon: <span data-testid="icon">N</span> },
];

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe("CircularCarousel", () => {
  it("renders every item name", () => {
    render(<CircularCarousel items={items} />);
    for (const item of items) {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    }
  });

  it("handles mouse drag without crashing", () => {
    const { container } = render(<CircularCarousel items={items} />);
    const surface = container.querySelector(".cursor-grab") as HTMLElement;
    expect(surface).toBeTruthy();

    // jsdom may not implement pointer capture
    surface.setPointerCapture = vi.fn();
    surface.releasePointerCapture = vi.fn();

    fireEvent.pointerMove(surface, { pointerType: "mouse", clientX: 50 }); // not dragging -> early return
    fireEvent.pointerDown(surface, { pointerType: "mouse", clientX: 100, pointerId: 1 });
    fireEvent.pointerMove(surface, { pointerType: "mouse", clientX: 160, pointerId: 1 });
    fireEvent.pointerUp(surface, { pointerType: "mouse", pointerId: 1 });

    expect(screen.getByText("React")).toBeInTheDocument();
  });

  it("ignores non-mouse pointer events", () => {
    const { container } = render(<CircularCarousel items={items} />);
    const surface = container.querySelector(".cursor-grab") as HTMLElement;
    fireEvent.pointerDown(surface, { pointerType: "touch", clientX: 10, pointerId: 2 });
    expect(screen.getByText("React")).toBeInTheDocument();
  });

  it("rotates on a horizontal touch swipe but ignores vertical swipes", () => {
    const { container } = render(<CircularCarousel items={items} />);
    const surface = container.querySelector(".cursor-grab") as HTMLElement;

    fireEvent.touchStart(surface, { touches: [{ clientX: 100, clientY: 100 }] });
    // vertical movement is ignored (lets the page scroll)
    fireEvent.touchMove(surface, { touches: [{ clientX: 105, clientY: 150 }] });
    // horizontal movement rotates
    fireEvent.touchMove(surface, { touches: [{ clientX: 160, clientY: 102 }] });
    fireEvent.touchEnd(surface);

    expect(screen.getByText("React")).toBeInTheDocument();
  });

  it("auto-rotates when enabled", () => {
    vi.useFakeTimers();
    const rafSpy = vi
      .spyOn(window, "requestAnimationFrame")
      .mockImplementation((cb: FrameRequestCallback) => {
        return setTimeout(() => cb(0), 16) as unknown as number;
      });
    vi.spyOn(window, "cancelAnimationFrame").mockImplementation((id) => {
      clearTimeout(id as unknown as ReturnType<typeof setTimeout>);
    });

    render(<CircularCarousel items={items} autoRotate rotationSpeed={0.01} />);
    act(() => {
      vi.advanceTimersByTime(16);
    });

    expect(rafSpy).toHaveBeenCalled();
    expect(screen.getByText("React")).toBeInTheDocument();
  });
});
