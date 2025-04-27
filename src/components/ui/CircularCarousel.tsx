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

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    lastPointerX.current = e.clientX;

    // Capture pointer to receive events even when cursor moves outside element
    if (containerRef.current) {
      containerRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;

    const deltaX = e.clientX - lastPointerX.current;
    lastPointerX.current = e.clientX;

    // Very low sensitivity for smooth rotation
    const sensitivity = 0.003;
    setRotation((prev) => prev - deltaX * sensitivity);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;

    // Release pointer capture
    if (containerRef.current) {
      containerRef.current.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div
        ref={containerRef}
        className="w-[350px] h-[350px] relative touch-none cursor-grab active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
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
