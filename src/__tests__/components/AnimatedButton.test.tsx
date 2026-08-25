import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

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
    ["primary", "bg-zinc-900"],
    ["outline", "border-zinc-300"],
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

  it("disables the button when disabled", () => {
    const { container } = render(
      <AnimatedButton disabled>Disabled</AnimatedButton>
    );
    const button = container.querySelector("button");
    expect(button).toBeDisabled();
    expect(button?.className).toContain("opacity-60");
  });

  it("renders the download path as a plain same-tab anchor", () => {
    render(
      <AnimatedButton href="/api/cv?locale=en" download>
        CV
      </AnimatedButton>
    );
    const link = screen.getByText("CV").closest("a");
    expect(link).toHaveAttribute("href", "/api/cv?locale=en");
    // Downloads stay in the same tab: no external-link affordances.
    expect(link).not.toHaveAttribute("target", "_blank");
    expect(link).not.toHaveAttribute("rel", "noopener noreferrer");
  });
});
