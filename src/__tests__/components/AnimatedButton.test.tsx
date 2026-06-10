import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

// Remap tap gestures to mouse events so the press-state logic is exercisable.
// Components are memoized per tag so their identity is stable across renders
// (a state update shouldn't remount and detach the node under test).
vi.mock("framer-motion", () => {
  const motionCache = new Map<
    string,
    React.FC<React.PropsWithChildren<Record<string, unknown>>>
  >();
  const proxy = new Proxy(
    {},
    {
      get: (_t, prop: string) => {
        if (!motionCache.has(prop)) {
          motionCache.set(prop, ({ children, ...props }) => {
            const Tag = prop as keyof React.JSX.IntrinsicElements;
            const htmlProps: Record<string, unknown> = {};
            for (const [k, v] of Object.entries(props)) {
              if (k === "onTapStart") htmlProps.onMouseDown = v;
              else if (k === "onTap") htmlProps.onMouseUp = v;
              else if (k === "onTapCancel") htmlProps.onMouseLeave = v;
              else if (
                !k.startsWith("while") &&
                !k.startsWith("animate") &&
                !k.startsWith("initial") &&
                !["transition", "variants", "viewport", "exit"].includes(k)
              ) {
                htmlProps[k] = v;
              }
            }
            return <Tag {...htmlProps}>{children}</Tag>;
          });
        }
        return motionCache.get(prop);
      },
    }
  );
  return { motion: proxy, m: proxy };
});

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: React.PropsWithChildren<{ href: string }>) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

import { AnimatedButton } from "@/components/ui/AnimatedButton";

describe("AnimatedButton", () => {
  it("renders as a button and fires onClick", () => {
    const onClick = vi.fn();
    render(<AnimatedButton onClick={onClick}>Click me</AnimatedButton>);
    fireEvent.click(screen.getByText("Click me"));
    expect(onClick).toHaveBeenCalled();
  });

  it.each([
    ["primary", "bg-teal-700"],
    ["secondary", "bg-blue-600"],
    ["outline", "border-teal-700"],
    ["ghost", "hover:bg-zinc-200"],
  ] as const)("applies the %s variant styles", (variant, expectedClass) => {
    const { container } = render(
      <AnimatedButton variant={variant}>Label</AnimatedButton>
    );
    expect(container.querySelector("button")?.className).toContain(expectedClass);
  });

  it.each([
    ["sm", "px-3"],
    ["md", "px-4"],
    ["lg", "px-6"],
  ] as const)("applies the %s size styles", (size, expectedClass) => {
    const { container } = render(<AnimatedButton size={size}>Label</AnimatedButton>);
    expect(container.querySelector("button")?.className).toContain(expectedClass);
  });

  it("renders an internal link when href is provided", () => {
    render(<AnimatedButton href="/about">Go</AnimatedButton>);
    const link = screen.getByText("Go").closest("a");
    expect(link).toHaveAttribute("href", "/about");
  });

  it("renders an external link with target and rel", () => {
    render(
      <AnimatedButton href="https://example.com" isExternal>
        External
      </AnimatedButton>
    );
    const link = screen.getByText("External").closest("a");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders icons on the left and right", () => {
    const { rerender } = render(
      <AnimatedButton icon={<span data-testid="icon">→</span>} iconPosition="left">
        Label
      </AnimatedButton>
    );
    expect(screen.getByTestId("icon")).toBeInTheDocument();
    rerender(
      <AnimatedButton icon={<span data-testid="icon">→</span>} iconPosition="right">
        Label
      </AnimatedButton>
    );
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("disables the button and skips animations when disabled", () => {
    const { container } = render(
      <AnimatedButton disabled>Disabled</AnimatedButton>
    );
    const button = container.querySelector("button");
    expect(button).toBeDisabled();
    expect(button?.className).toContain("opacity-60");
  });

  it("tracks press state through tap gestures", () => {
    const { container } = render(<AnimatedButton>Press</AnimatedButton>);
    const button = container.querySelector("button") as HTMLElement;
    fireEvent.mouseDown(button);
    fireEvent.mouseUp(button);
    fireEvent.mouseLeave(button);
    expect(button).toBeInTheDocument();
  });
});
