import { describe, it, expect, vi, afterEach } from "vitest";
import { renderHook, act, cleanup } from "@testing-library/react";
import type { RefObject } from "react";
import { useSwipeGesture } from "@/hooks/useSwipeGesture";

function touchEvent(type: string, x?: number, y?: number) {
  const e = new Event(type, { bubbles: true, cancelable: true });
  if (x !== undefined) {
    Object.assign(e, { touches: [{ clientX: x, clientY: y }] });
  }
  return e;
}

function setup(options: Parameters<typeof useSwipeGesture>[1] = {}) {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const ref = { current: el } as RefObject<HTMLElement>;
  const view = renderHook(() => useSwipeGesture(ref, options));
  return { el, view };
}

function swipe(el: HTMLElement, from: [number, number], to: [number, number]) {
  act(() => void el.dispatchEvent(touchEvent("touchstart", from[0], from[1])));
  act(() => void el.dispatchEvent(touchEvent("touchmove", to[0], to[1])));
  act(() => void el.dispatchEvent(touchEvent("touchend")));
}

afterEach(() => cleanup());

describe("useSwipeGesture", () => {
  it("detects a left swipe past the threshold", () => {
    const onSwipe = vi.fn();
    const { el } = setup({ onSwipe, threshold: 50 });
    swipe(el, [200, 100], [100, 100]);
    expect(onSwipe).toHaveBeenCalledWith("left", 100);
  });

  it("detects a right swipe", () => {
    const onSwipe = vi.fn();
    const { el } = setup({ onSwipe, threshold: 50 });
    swipe(el, [100, 100], [220, 100]);
    expect(onSwipe).toHaveBeenCalledWith("right", 120);
  });

  it("detects an up swipe", () => {
    const onSwipe = vi.fn();
    const { el } = setup({ onSwipe, threshold: 50 });
    swipe(el, [100, 200], [100, 80]);
    expect(onSwipe).toHaveBeenCalledWith("up", 120);
  });

  it("detects a down swipe", () => {
    const onSwipe = vi.fn();
    const { el } = setup({ onSwipe, threshold: 50 });
    swipe(el, [100, 100], [100, 220]);
    expect(onSwipe).toHaveBeenCalledWith("down", 120);
  });

  it("does not fire below the threshold", () => {
    const onSwipe = vi.fn();
    const { el } = setup({ onSwipe, threshold: 50 });
    swipe(el, [200, 100], [180, 100]);
    expect(onSwipe).not.toHaveBeenCalled();
  });

  it("exposes the in-progress swipe state", () => {
    const { el, view } = setup({ threshold: 50 });
    act(() => void el.dispatchEvent(touchEvent("touchstart", 200, 100)));
    expect(view.result.current.swiping).toBe(true);
    act(() => void el.dispatchEvent(touchEvent("touchmove", 100, 100)));
    expect(view.result.current.direction).toBe("left");
    expect(view.result.current.distance).toBe(100);
  });

  it("ignores a move with no preceding start", () => {
    const onSwipe = vi.fn();
    const { el } = setup({ onSwipe });
    act(() => void el.dispatchEvent(touchEvent("touchmove", 100, 100)));
    act(() => void el.dispatchEvent(touchEvent("touchend")));
    expect(onSwipe).not.toHaveBeenCalled();
  });

  it("resets without firing when there is no move", () => {
    const onSwipe = vi.fn();
    const { el } = setup({ onSwipe });
    act(() => void el.dispatchEvent(touchEvent("touchstart", 100, 100)));
    act(() => void el.dispatchEvent(touchEvent("touchend")));
    expect(onSwipe).not.toHaveBeenCalled();
  });

  it("prevents scrolling on start when preventScroll is set", () => {
    const { el } = setup({ preventScroll: true });
    const start = touchEvent("touchstart", 100, 100);
    act(() => void el.dispatchEvent(start));
    expect(start.defaultPrevented).toBe(true);
  });

  it("prevents default on a qualifying swipe when configured", () => {
    const onSwipe = vi.fn();
    const { el } = setup({ onSwipe, threshold: 50, preventDefaultOnSwipe: true });
    act(() => void el.dispatchEvent(touchEvent("touchstart", 200, 100)));
    act(() => void el.dispatchEvent(touchEvent("touchmove", 100, 100)));
    const end = touchEvent("touchend");
    act(() => void el.dispatchEvent(end));
    expect(onSwipe).toHaveBeenCalled();
    expect(end.defaultPrevented).toBe(true);
  });

  it("does nothing when the ref is empty", () => {
    const ref = { current: null } as unknown as RefObject<HTMLElement>;
    expect(() => renderHook(() => useSwipeGesture(ref, {}))).not.toThrow();
  });
});
