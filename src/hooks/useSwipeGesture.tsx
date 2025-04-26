"use client";

import { useRef, useEffect, useState } from "react";

type SwipeDirection = "left" | "right" | "up" | "down";
type SwipeHandler = (direction: SwipeDirection, distance: number) => void;

interface SwipeOptions {
  threshold?: number;
  onSwipe?: SwipeHandler;
  preventScroll?: boolean;
  preventDefaultOnSwipe?: boolean;
}

export function useSwipeGesture(
  ref: React.RefObject<HTMLElement>,
  options: SwipeOptions = {}
) {
  const {
    threshold = 50,
    onSwipe,
    preventScroll = false,
    preventDefaultOnSwipe = false,
  } = options;

  const [swiping, setSwiping] = useState(false);
  const [direction, setDirection] = useState<SwipeDirection | null>(null);
  const [distance, setDistance] = useState(0);

  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);
  const touchEndYRef = useRef<number | null>(null);

  // Setup touch handlers
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartXRef.current = e.touches[0].clientX;
      touchStartYRef.current = e.touches[0].clientY;
      setSwiping(true);

      if (preventScroll) {
        e.preventDefault();
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartXRef.current || !touchStartYRef.current) return;

      touchEndXRef.current = e.touches[0].clientX;
      touchEndYRef.current = e.touches[0].clientY;

      // Calculate deltas
      const deltaX = touchStartXRef.current - touchEndXRef.current;
      const deltaY = touchStartYRef.current - touchEndYRef.current;

      // Determine direction based on larger delta
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        setDirection(deltaX > 0 ? "left" : "right");
        setDistance(Math.abs(deltaX));
      } else {
        setDirection(deltaY > 0 ? "up" : "down");
        setDistance(Math.abs(deltaY));
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (
        !touchStartXRef.current ||
        !touchStartYRef.current ||
        !touchEndXRef.current ||
        !touchEndYRef.current ||
        !direction
      ) {
        resetTouchState();
        return;
      }

      // Check if swipe distance exceeds threshold
      if (distance > threshold && onSwipe) {
        onSwipe(direction, distance);

        if (preventDefaultOnSwipe) {
          e.preventDefault();
          e.stopPropagation();
        }
      }

      resetTouchState();
    };

    const resetTouchState = () => {
      touchStartXRef.current = null;
      touchStartYRef.current = null;
      touchEndXRef.current = null;
      touchEndYRef.current = null;
      setSwiping(false);
      setDirection(null);
      setDistance(0);
    };

    // Add event listeners
    element.addEventListener("touchstart", handleTouchStart, {
      passive: !preventScroll,
    });
    element.addEventListener("touchmove", handleTouchMove, { passive: true });
    element.addEventListener("touchend", handleTouchEnd);

    // Clean up
    return () => {
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchmove", handleTouchMove);
      element.removeEventListener("touchend", handleTouchEnd);
    };
  }, [
    ref,
    threshold,
    onSwipe,
    preventScroll,
    preventDefaultOnSwipe,
    distance,
    direction,
  ]);

  return { swiping, direction, distance };
}
