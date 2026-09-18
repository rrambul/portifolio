/**
 * Formal schooling only. The self-taught half of the story is copy, not data
 * (`education.subtitle` in the message files), because it has no institution
 * and no honest dates to put beside it.
 */
export interface EducationEntry {
  id: string;
  /** Key under `education.entries` in the message files. */
  i18nKey: string;
  institution: string;
  /** Omitted when there is no honest date to show. */
  period?: string;
  /** Marks a program still running, rendered with the live dot. */
  status?: "in-progress";
}

export const education: EducationEntry[] = [
  {
    id: "fullcycle-mba",
    i18nKey: "fullCycleMba",
    institution: "Full Cycle",
    period: "Sep 2026 - May 2028",
    status: "in-progress",
  },
];
