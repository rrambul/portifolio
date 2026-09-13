import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import type { ForgeSnapshot } from "@/types/forge";

const h = vi.hoisted(() => ({
  snapshot: { snapshotAt: "2026-09-12", missions: [] } as ForgeSnapshot,
}));

/**
 * `t` echoes the key and `t.rich` resolves its tags, so a test asserts on
 * structure rather than on copy that lives in the message files.
 */
vi.mock("next-intl", () => {
  const t = Object.assign((key: string) => key, {
    rich: (_key: string, values: Record<string, unknown>) =>
      (values.date as (chunks: unknown) => unknown)(values.when),
  });
  return { useTranslations: () => t };
});

vi.mock("framer-motion");

vi.mock("@/data/mindforge", () => ({
  get forge() {
    return h.snapshot;
  },
}));

import { ForgeProgress } from "@/components/sections/ForgeProgress";

beforeEach(() => {
  h.snapshot = { snapshotAt: "2026-09-12", missions: [] };
});

describe("ForgeProgress", () => {
  it("renders nothing when the snapshot holds no missions", () => {
    const { container } = render(<ForgeProgress />);
    expect(container).toBeEmptyDOMElement();
  });

  it("shows a mission's own fraction and the first module not yet finished", () => {
    h.snapshot = {
      snapshotAt: "2026-09-12",
      missions: [
        {
          topic: "System design",
          completed: 3,
          total: 9,
          modules: [
            { name: "Requirements", completed: 3, total: 4 },
            { name: "Estimation", completed: 0, total: 5 },
          ],
        },
      ],
    };

    render(<ForgeProgress />);

    expect(screen.getByText("System design")).toBeInTheDocument();
    expect(screen.getByText(/3\/9/)).toBeInTheDocument();
    // Requirements, not Estimation: 3 of 4 is where the work actually is.
    expect(screen.getByText(/Requirements/)).toBeInTheDocument();
    expect(screen.getByText("3/4")).toBeInTheDocument();
    expect(screen.queryByText(/Estimation/)).not.toBeInTheDocument();
  });

  it("says so when every planned module is finished", () => {
    h.snapshot = {
      snapshotAt: "2026-09-12",
      missions: [
        {
          topic: "Done mission",
          completed: 4,
          total: 4,
          modules: [{ name: "Only module", completed: 4, total: 4 }],
        },
      ],
    };

    render(<ForgeProgress />);

    expect(screen.getByText("finished")).toBeInTheDocument();
  });

  it("dates the snapshot in a machine-readable time element", () => {
    h.snapshot = {
      snapshotAt: "2026-09-12",
      missions: [
        {
          topic: "Any",
          completed: 0,
          total: 2,
          modules: [{ name: "First", completed: 0, total: 2 }],
        },
      ],
    };

    const { container } = render(<ForgeProgress />);
    const time = container.querySelector("time");

    expect(time).toHaveAttribute("dateTime", "2026-09-12");
    expect(time).toHaveTextContent("2026-09-12");
  });
});
