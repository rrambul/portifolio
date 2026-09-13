import { describe, it, expect } from "vitest";
import { currentModule } from "@/lib/forge";
import type { ForgeMission } from "@/types/forge";

function mission(modules: ForgeMission["modules"]): ForgeMission {
  const planned = modules.filter((m) => m.total !== null);
  return {
    topic: "Topic",
    completed: planned.reduce((sum, m) => sum + (m.completed ?? 0), 0),
    total: planned.reduce((sum, m) => sum + (m.total ?? 0), 0),
    modules,
  };
}

describe("currentModule", () => {
  it("picks the first module that is not finished, in plan order", () => {
    const current = currentModule(
      mission([
        { name: "Done", completed: 4, total: 4 },
        { name: "Started", completed: 2, total: 5 },
        { name: "Untouched", completed: 0, total: 6 },
      ])
    );

    expect(current).toEqual({
      index: 2,
      count: 3,
      name: "Started",
      completed: 2,
      total: 5,
    });
  });

  it("counts every module, including the ones with no plan", () => {
    const current = currentModule(
      mission([
        { name: "Started", completed: 0, total: 3 },
        { name: "Not planned", completed: null, total: null },
      ])
    );

    expect(current?.count).toBe(2);
    expect(current?.index).toBe(1);
  });

  it("skips a module with no lessons planned rather than reading it as zero", () => {
    const current = currentModule(
      mission([
        { name: "Not planned", completed: null, total: null },
        { name: "Started", completed: 1, total: 2 },
      ])
    );

    expect(current?.name).toBe("Started");
  });

  it("returns null when every planned module is finished", () => {
    expect(
      currentModule(mission([{ name: "Done", completed: 4, total: 4 }]))
    ).toBeNull();
  });

  it("returns null when the mission has no modules at all", () => {
    expect(currentModule(mission([]))).toBeNull();
  });
});
