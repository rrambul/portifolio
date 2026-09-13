"use client";

import { useTranslations } from "next-intl";
import { m } from "framer-motion";
import { forge } from "@/data/mindforge";
import { currentModule } from "@/lib/forge";
import { fadeInUp } from "@/lib/animations";

/**
 * Curriculum progress, from Mindforge: the app I am building to turn a topic
 * into a curriculum and teach it lesson by lesson.
 *
 * The numbers are a snapshot committed by an export script, not a live read, so
 * the page is honest about its date rather than pretending to be a feed. Two
 * rules come with them from the app and are worth keeping here: a fraction is
 * shown as a fraction and never as a percentage or a bar, and a module with no
 * plan has no number rather than a zero.
 */
export function ForgeProgress() {
  const t = useTranslations("learning.forge");

  if (forge.missions.length === 0) return null;

  return (
    <m.div variants={fadeInUp}>
      <h2 className="mb-2 font-accent-mono text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
        {"// "}
        {t("label")}
      </h2>

      <ul className="divide-y divide-zinc-200 dark:divide-white/10">
        {forge.missions.map((mission) => {
          const current = currentModule(mission);

          return (
            <li key={mission.topic} className="py-3">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="flex-1 text-zinc-700 dark:text-zinc-300">
                  {mission.topic}
                </span>
                <span className="shrink-0 font-accent-mono text-xs text-zinc-500 dark:text-zinc-400">
                  {mission.completed}/{mission.total} {t("lessons")}
                </span>
              </div>

              {current ? (
                <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1 font-accent-mono text-xs text-zinc-500 dark:text-zinc-400">
                  <span className="flex-1">
                    {t("module", { index: current.index, count: current.count })}
                    {" · "}
                    {current.name}
                  </span>
                  <span className="shrink-0">
                    {current.completed}/{current.total}
                  </span>
                </div>
              ) : (
                <p className="mt-1 font-accent-mono text-xs text-zinc-500 dark:text-zinc-400">
                  {t("finished")}
                </p>
              )}
            </li>
          );
        })}
      </ul>

      <p className="mt-2 font-accent-mono text-xs text-zinc-500 dark:text-zinc-400">
        {t.rich("snapshot", {
          when: forge.snapshotAt,
          date: (chunks) => <time dateTime={forge.snapshotAt}>{chunks}</time>,
        })}
      </p>
    </m.div>
  );
}
