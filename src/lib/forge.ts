import type { ForgeMission, ForgeModule } from "@/types/forge";

/** The module a mission is on, and where it sits in the plan. */
export interface CurrentModule {
  /** 1-based, over every module the mission has. */
  index: number;
  count: number;
  name: string;
  completed: number;
  total: number;
}

/** A module with a fraction, which is to say one whose lessons are planned. */
function isPlanned(
  entry: ForgeModule
): entry is ForgeModule & { completed: number; total: number } {
  return entry.completed !== null && entry.total !== null;
}

/**
 * The first module that is not finished, in the curriculum's own order.
 *
 * The page shows one module per mission rather than all fourteen: the plan runs
 * to dozens of modules and only the front of it is in play, so a full list would
 * be a wall of zeroes that says less than one honest line. The index and the
 * count travel with it so the line can say where in the plan it sits.
 *
 * Null when every planned module is done, or when nothing is planned yet. Both
 * are states the page words rather than draws.
 */
export function currentModule(mission: ForgeMission): CurrentModule | null {
  const count = mission.modules.length;
  const index = mission.modules.findIndex(
    (entry) => isPlanned(entry) && entry.completed < entry.total
  );
  if (index === -1) return null;

  const found = mission.modules[index]!;
  return {
    index: index + 1,
    count,
    name: found.name,
    completed: found.completed!,
    total: found.total!,
  };
}
