import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

// Mock next-themes
const mockSetTheme = vi.fn();
let mockTheme = "dark";
vi.mock("next-themes", () => ({
  useTheme: () => ({
    theme: mockTheme,
    setTheme: mockSetTheme,
    resolvedTheme: mockTheme,
  }),
}));

// Mock next-intl
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

// Mock framer-motion to render plain elements
vi.mock("framer-motion", () => ({
  motion: {
    button: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
      const htmlProps: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(props)) {
        if (!k.startsWith("while") && !k.startsWith("animate") && !k.startsWith("initial") && k !== "transition" && k !== "variants") {
          htmlProps[k] = v;
        }
      }
      return <button {...htmlProps}>{children}</button>;
    },
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
      const htmlProps: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(props)) {
        if (!k.startsWith("while") && !k.startsWith("animate") && !k.startsWith("initial") && k !== "transition" && k !== "variants") {
          htmlProps[k] = v;
        }
      }
      return <div {...htmlProps}>{children}</div>;
    },
  },
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
}));

import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";

describe("ThemeSwitcher", () => {
  beforeEach(() => {
    mockTheme = "dark";
    mockSetTheme.mockClear();
  });

  it("renders when mounted", () => {
    render(<ThemeSwitcher />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("has aria-label for toggling to light mode when dark", () => {
    render(<ThemeSwitcher />);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label", "light");
  });

  it("calls setTheme with 'light' when dark theme is active", () => {
    render(<ThemeSwitcher />);
    fireEvent.click(screen.getByRole("button"));
    expect(mockSetTheme).toHaveBeenCalledWith("light");
  });

  it("calls setTheme with 'dark' when light theme is active", () => {
    mockTheme = "light";
    render(<ThemeSwitcher />);
    fireEvent.click(screen.getByRole("button"));
    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });
});
