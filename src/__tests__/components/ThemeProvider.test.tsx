import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@/components/ui/ThemeProvider";

describe("ThemeProvider", () => {
  it("renders its children", () => {
    render(
      <ThemeProvider>
        <div data-testid="child">content</div>
      </ThemeProvider>
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });
});
