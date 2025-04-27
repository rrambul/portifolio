"use client";

import { useState, useRef, useEffect } from "react";

interface CarouselItem {
  id: number;
  name: string;
  icon: React.ReactNode;
}

interface CircularCarouselProps {
  items: CarouselItem[];
  radius?: number;
  autoRotate?: boolean;
  rotationSpeed?: number;
}

export function CircularCarousel({
  items,
  radius = 150,
  autoRotate = false,
  rotationSpeed = 0.001,
}: CircularCarouselProps) {
  const [rotation, setRotation] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const lastPointerX = useRef(0);
  const initialTouchY = useRef(0); // To track initial vertical position

  // Auto rotation effect
  useEffect(() => {
    if (!autoRotate || isDragging.current) return;

    let animationId: number;
    const autoRotateAnimation = () => {
      setRotation((prev) => prev + rotationSpeed);
      animationId = requestAnimationFrame(autoRotateAnimation);
    };

    animationId = requestAnimationFrame(autoRotateAnimation);
    return () => cancelAnimationFrame(animationId);
  }, [autoRotate, rotationSpeed, isDragging]);

  // Handle mouse events for desktop
  const handlePointerDown = (e: React.PointerEvent) => {
    // Only handle mouse events for desktop
    if (e.pointerType === "mouse") {
      isDragging.current = true;
      lastPointerX.current = e.clientX;

      if (containerRef.current) {
        containerRef.current.setPointerCapture(e.pointerId);
      }
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    // Only handle mouse events for desktop
    if (!isDragging.current || e.pointerType !== "mouse") return;

    const deltaX = e.clientX - lastPointerX.current;
    lastPointerX.current = e.clientX;

    // Very low sensitivity for smooth rotation
    const sensitivity = 0.003;
    setRotation((prev) => prev - deltaX * sensitivity);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    // Only handle mouse events for desktop
    if (e.pointerType === "mouse") {
      isDragging.current = false;

      if (containerRef.current) {
        containerRef.current.releasePointerCapture(e.pointerId);
      }
    }
  };

  // Handle touch events specifically for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      isDragging.current = true;
      lastPointerX.current = e.touches[0].clientX;
      initialTouchY.current = e.touches[0].clientY;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || e.touches.length !== 1) return;

    const touch = e.touches[0];

    // Check if this is primarily a horizontal or vertical movement
    const deltaX = touch.clientX - lastPointerX.current;
    const totalDeltaY = Math.abs(touch.clientY - initialTouchY.current);

    // If significant vertical movement, let the page scroll naturally
    if (totalDeltaY > 20) return;

    // For primarily horizontal movements, update carousel and prevent scrolling
    const sensitivity = 0.003;
    setRotation((prev) => prev - deltaX * sensitivity);
    lastPointerX.current = touch.clientX;

    // Prevent default to avoid page scrolling during horizontal swipes
    e.preventDefault();
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  return (
    <div className="flex justify-center items-center">
      <div
        ref={containerRef}
        className="w-[350px] h-[350px] relative cursor-grab active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      >
        {items.map((item, index) => {
          // Calculate position in circle
          const angle = (index / items.length) * 2 * Math.PI;
          const x = Math.cos(angle + rotation) * radius;
          const y = Math.sin(angle + rotation) * radius;

          // Determine if item is in front or back half of circle
          const isInFront = y >= 0;

          // Calculate normalized position (0 to 1)
          const normalizedY = Math.abs(y) / radius;

          // Scale calculation - smaller for back items
          const scale = isInFront
            ? 0.7 + normalizedY * 0.3 // 0.7 to 1.0 for front items
            : 0.4 + normalizedY * 0.2; // 0.4 to 0.6 for back items

          // Opacity calculation - much lower for back items
          const opacity = isInFront
            ? normalizedY * 0.7 + 0.3 // 0.3 to 1.0 for front items
            : normalizedY * 0.15 + 0.1; // 0.1 to 0.25 for back items

          return (
            <div
              key={item.id}
              className="absolute left-1/2 top-1/2 flex flex-col items-center justify-center pointer-events-none"
              style={{
                transform: `translate(-50%, -50%) translate(${x}px, ${
                  y * 0.5
                }px) scale(${scale})`,
                opacity: opacity,
                zIndex: Math.round((y + radius) * 10),
              }}
            >
              <div className="bg-white dark:bg-zinc-800 p-3 rounded-full shadow-md">
                {item.icon}
              </div>
              <span className="mt-2 text-sm font-medium opacity-90 whitespace-nowrap">
                {item.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
