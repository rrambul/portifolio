# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A bilingual (EN/PT), dark/light personal portfolio. Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind v4 · next-intl · Framer Motion. Deployed on Vercel at **renanrambul.dev**.

## Commands

This project uses **pnpm** (pinned via `packageManager`). Do **not** run `npm install` — it creates a `package-lock.json`, and Vercel deploys with pnpm + `--frozen-lockfile`; a drifting npm lockfile has broken the deploy before. After any dependency change, the `pnpm-lock.yaml` is the one that matters.

```bash
pnpm dev                  # dev server (Turbopack) on :3000
pnpm build                # production build
pnpm lint                 # eslint . (flat config)
pnpm typecheck            # tsc --noEmit
pnpm test                 # vitest run (unit, jsdom)
pnpm test:coverage        # vitest run --coverage (enforces thresholds)
pnpm test:e2e             # playwright (auto-starts `pnpm dev`); includes axe a11y scans
pnpm exec vitest run src/__tests__/components/Hero.test.tsx   # single unit file
pnpm exec vitest run -t "renders the title"                   # single test by name
pnpm exec playwright test accessibility.spec.ts --grep "h1"   # single e2e
```

CI (`.github/workflows/ci.yml`) runs lint, typecheck, `test:coverage`, build, and the full Playwright suite on push to `main` and PRs. Keep all of these green before pushing.

## Architecture

**Routing & document shell.** Everything lives under `src/app/[locale]/` (locales `en`/`pt`, negotiated by `middleware.ts` at the repo root via next-intl). The real document shell — `<html lang>`, fonts, JSON-LD, `ThemeProvider` → `NextIntlClientProvider` → `TransitionProvider` — is in **`src/app/[locale]/layout.tsx`** (there is no root `app/layout.tsx`; the locale-less `/` route is just a redirect, isolated in the `app/(redirect)/` route group with its own minimal shell). The homepage (`[locale]/page.tsx`) composes the section components in order: Hero, About, Experience, SkillsBento, Education, Projects, Contact. `/about`, `/experience`, `/skills` redirect to homepage anchors.

**Content is data + message keys, joined by string.** This is the most important pattern to understand before editing content:
- `src/data/*.ts` holds *structural* data (projects, experiences, education, skills, positions, blog-post metadata) with bare string **keys** like `titleKey: "modularGameStore.title"`, `i18nKey`, `descriptionKey`. `src/data/interests.ts` exports `positions` and `changedMyMind`: the section is a short list of opinions, not a list of topic nouns, so keep new entries as statements someone could disagree with. **Positions is parked**: `<Interests />` and its import are commented out in `[locale]/page.tsx`, and the composition test asserts it stays out. Everything behind it (component, data, copy, tests) is untouched, so bringing it back is uncommenting those two lines and putting `interests` back in the page test's id list.
- `src/messages/{en,pt}/index.json` holds the actual **copy**, looked up by those keys at render via next-intl.
- There is **no compile-time link** between them. When you add or rename a project/experience/skill, you must add the matching key to **both** `en` and `pt`. `src/__tests__/i18n-data-drift.test.ts` walks every data key against both locales and fails CI if one doesn't resolve — run the unit tests after content changes.

**The blog is off the site; the learning log is back.** The `/blog` and `/blog/[slug]` routes, the homepage `Writing` section, and their nav entries and sitemap URLs are still removed. Everything behind them is here and still unit-tested: `Blog`, `Writing`, `src/components/blog/*`, `src/data/blog-posts.ts`, `src/lib/blog-content.ts`, the `blog` message namespace, and the markdown in `content/blog/`. To bring the blog back, restore the route files and re-wire those four surfaces (homepage, nav, sitemap, e2e specs).

**The learning log** lives at `/[locale]/learning` and renders `LearningLog` from `src/data/learning.ts`, above which it lists `src/data/education.ts` (the same data and copy the homepage Education section uses) as a `// education` group: formal study, then the curriculum I set myself, then what I read. Degrees are not log entries, so they stay out of the entry count in the heading. An entry needs only a `title` and a `type`; `url`, `date` and `source` are optional, and `status: "reading"` marks something in progress. That shapes the page into three groups, which is the thing to understand before adding entries: `getInProgress()` (anything `reading`), `getUndated()` (finished but undated, so a book read years ago does not need a made-up date), and `getLearningByMonth()` (dated entries grouped newest-first). An entry with no `url` deliberately renders as plain text rather than a dead link. `learning` is the one nav item that routes instead of scrolling, so it is excluded from the active-section sweep in `Navigation.tsx`.

**Curriculum progress is a generated snapshot.** `src/data/mindforge.ts` is written by `pnpm --filter @mindforge/db export:portfolio` in the **mindforge repo** (`~/brain-gym`) and must not be hand-edited; its shape is `src/types/forge.ts` and the export script imports that contract by path, so renaming a field there breaks the export loudly rather than at runtime. Mindforge runs against a local Supabase and is not deployed, so this is a committed snapshot and not a live read: the page says the date it was taken. Only missions with at least one finished lesson are exported, so a curriculum appears here when it is started rather than when it is planned, and the script's `PRIVATE_TOPICS` list holds the ones that never publish at all. Two rules come with the numbers and are worth keeping, because they are what the app itself promises. A fraction renders as a fraction, never as a percentage or a progress bar. A module whose lessons are not planned yet has `null`, which renders as unknown and never as a zero. `src/lib/forge.ts` picks the one module a mission is actually on; the page shows that rather than all fourteen, because the plans run to dozens of modules and a full list would be a wall of zeroes.

**Blog content is markdown files.** Post bodies live in `content/blog/<slug>.<locale>.md` and are read server-side by `src/lib/blog-content.ts` (`fs`); only metadata is in `src/data/blog-posts.ts`. `getBlogPostContent()` is server-only — never import it into a client component; the post page passes the string down to `<BlogPost content=...>`.

**The CV is generated from the same content.** `GET /api/cv?locale=` renders a PDF via `@react-pdf/renderer` from `src/lib/cv.tsx`, which reads `siteConfig`, `experiences`, `education`, `skillCategories`, and the message JSON directly. So editing experience bullets / skills updates the downloadable CV automatically — regenerate and eyeball it after content edits. Both locales are meant to be two pages, and Portuguese runs noticeably longer than English, so check the PT PDF (not just the EN one) whenever content lands there.

**Metadata.** `src/lib/metadata.ts` `buildMetadata()` is the single helper for OpenGraph/Twitter/canonical/hreflang; `src/config/site.ts` is the single source for the base URL and identity strings. Keep visible copy and these machine-facing strings (title, JSON-LD `jobTitle`, keywords) in sync.

**Animation (Framer Motion via LazyMotion).** `TransitionProvider` wraps the app in `<LazyMotion features={domMax} strict>`. The route-change entrance in that same provider is **CSS** (`.animate-page-enter`), not Framer: as an `AnimatePresence`/`m.div` pair it could stall at `opacity: 0` and leave a page blank until the visitor scrolled (reproducible in a production build by clicking About on the nav from `/learning`), and `e2e/navigation.spec.ts` guards it by asserting painted opacity, since Playwright counts an `opacity: 0` element as visible. Because of `strict`, you must use **`m.`** components, never `motion.` (a full `motion.` import throws at runtime). Above-the-fold Hero entrances are deliberately **CSS keyframes** (`animate-enter-*` in `globals.css`), not Framer, so the LCP isn't gated behind hydration. Reduced motion is honored two ways: a global CSS `@media (prefers-reduced-motion)` block and `MotionConfig reducedMotion="user"`.

**Layout.** Every homepage section goes through one primitive, **`src/components/ui/Section.tsx`**, which owns the measure and the vertical rhythm via two props fed by tokens in `src/lib/ui.ts`. `width` is `text` (`max-w-2xl`, the default reading column), `wide` (`max-w-4xl`) or `display` (`max-w-5xl`); `spacing` is `hero`, `tight`, `normal` or `loose`. Both scales are deliberately uneven: uniform padding gives every section the same weight and no grouping, so `tight` glues a section to the one above it (Skills to Experience, Education to Skills) and `loose` opens a new movement (About, Projects, Contact).

The narrow column is the page's default, and **exactly two things break it on purpose**: the Hero name (`display`, set at `clamp(2.75rem, 13vw, 9rem)`) and Experience (`wide`, a dated rail beside the release notes). That restraint is the point. A constraint only reads as a constraint when something occasionally violates it, so add a third break only with a reason, and never widen a section just because the content is long.

There is also **no rule under a section heading**. Seven identical hairlines at seven identical positions was the page's strongest "template" tell; `SectionHeading` now separates with its mono `// label` eyebrow and whitespace alone. Rules are reserved for separating *items* within a section (the `divide-y` in Projects).

**Styling & fonts.** Tailwind v4 (`@import "tailwindcss"` in `globals.css`). The look is deliberately minimalist and editorial: content as typographic lists, no cards, boxes, icon grids, fills, shadows, gradients, or ambient decoration. Keep it that way. Contrast comes from **type scale**, not from containers: the page runs roughly 12:1 from the hero name down to mono captions, and the Skills stat numbers are the one other place body copy gives way to real scale. The palette is a neutral zinc canvas with **emerald as the single accent**, used sparingly (mono markers, links, focus rings, small status dots). Fonts via `next/font` CSS variables — Space Grotesk for headings (`--font-display`, applied to `h1–h6`), Outfit for body (`--font-outfit`), Geist Mono for technical accents (`--font-mono`, `.font-accent-mono`).

## Testing notes

- Unit tests (Vitest/jsdom) live in `src/__tests__/`. Coverage thresholds are enforced (90% statements/functions/lines, 85% branches) in `vitest.config.ts`. Genuinely un-jsdom-able files are excluded there with rationale: the html-shell layouts, `src/i18n/**` and `middleware.ts` (crash on import outside the Next server runtime), and `src/types/**`.
- **Framer Motion is mocked centrally** at `__mocks__/framer-motion.tsx`. In a test, use a bare `vi.mock("framer-motion")` to pick it up (don't re-inline the proxy). The mock uses `React.JSX.IntrinsicElements` — match that in any new mock (React 19 removed the global `JSX` namespace).
- e2e specs (`e2e/`) run axe-core accessibility scans on the homepage in both themes; these fail on any WCAG violation. Decorative icons/canvas must be `aria-hidden`.

## Conventions

- **No em-dashes** in any copy (site, CV, commit messages) — use commas/colons/parentheses.
- Set `GOOGLE_SITE_VERIFICATION` in the environment to activate Search Console verification (read in `[locale]/layout.tsx`).
- Required env vars for the contact form: `RESEND_API_KEY`, `CONTACT_EMAIL`, `FROM_EMAIL` (see `.env.example`). The contact and CV routes are rate-limited via `src/lib/rate-limit.ts`.
