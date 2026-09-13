/**
 * The shape of `src/data/mindforge.ts`, which is generated rather than written:
 * a snapshot exported from Mindforge, my own curriculum app.
 *
 * The contract lives here rather than in the generated file so the export script
 * and the page agree on one definition, and so regenerating the data can never
 * quietly change the type the component was built against.
 */

/** One module of a curriculum: a subtopic with a planned set of lessons. */
export interface ForgeModule {
  name: string;
  /**
   * Finished lessons over planned ones, or null for a module whose lessons have
   * not been planned yet. Null is rendered as unknown, never as a zero: a module
   * with no plan is not a module I am at 0% of.
   */
  completed: number | null;
  total: number | null;
}

/** One mission: a topic, its modules, and the fraction over all of them. */
export interface ForgeMission {
  topic: string;
  completed: number;
  total: number;
  modules: ForgeModule[];
}

export interface ForgeSnapshot {
  /** ISO date (YYYY-MM-DD) the export ran. The page says how old it is. */
  snapshotAt: string;
  missions: ForgeMission[];
}
