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

**Routing & document shell.** Everything lives under `src/app/[locale]/` (locales `en`/`pt`, negotiated by `middleware.ts` at the repo root via next-intl). The real document shell — `<html lang>`, fonts, JSON-LD, `ThemeProvider` → `NextIntlClientProvider` → `TransitionProvider` — is in **`src/app/[locale]/layout.tsx`** (there is no root `app/layout.tsx`; the locale-less `/` route is just a redirect, isolated in the `app/(redirect)/` route group with its own minimal shell). The homepage (`[locale]/page.tsx`) composes the section components in order: Hero, About, Experience, SkillsBento, Projects, Interests, Contact. `/about`, `/experience`, `/skills` redirect to homepage anchors; `/blog` and `/blog/[slug]` are real pages.

**Content is data + message keys, joined by string.** This is the most important pattern to understand before editing content:
- `src/data/*.ts` holds *structural* data (projects, experiences, skills, interests, blog-post metadata) with bare string **keys** like `titleKey: "modularGameStore.title"`, `i18nKey`, `descriptionKey`.
- `src/messages/{en,pt}/index.json` holds the actual **copy**, looked up by those keys at render via next-intl.
- There is **no compile-time link** between them. When you add or rename a project/experience/skill, you must add the matching key to **both** `en` and `pt`. `src/__tests__/i18n-data-drift.test.ts` walks every data key against both locales and fails CI if one doesn't resolve — run the unit tests after content changes.

**Blog content is markdown files.** Post bodies live in `content/blog/<slug>.<locale>.md` and are read server-side by `src/lib/blog-content.ts` (`fs`); only metadata is in `src/data/blog-posts.ts`. `getBlogPostContent()` is server-only — never import it into a client component; the post page passes the string down to `<BlogPost content=...>`.

**The CV is generated from the same content.** `GET /api/cv?locale=` renders a PDF via `@react-pdf/renderer` from `src/lib/cv.tsx`, which reads `siteConfig`, `experiences`, `skillCategories`, and the message JSON directly. So editing experience bullets / skills updates the downloadable CV automatically — regenerate and eyeball it after content edits.

**Metadata.** `src/lib/metadata.ts` `buildMetadata()` is the single helper for OpenGraph/Twitter/canonical/hreflang; `src/config/site.ts` is the single source for the base URL and identity strings. Keep visible copy and these machine-facing strings (title, JSON-LD `jobTitle`, keywords) in sync.

**Animation (Framer Motion via LazyMotion).** `TransitionProvider` wraps the app in `<LazyMotion features={domMax} strict>`. Because of `strict`, you must use **`m.`** components, never `motion.` (a full `motion.` import throws at runtime). Above-the-fold Hero entrances are deliberately **CSS keyframes** (`animate-enter-*` in `globals.css`), not Framer, so the LCP isn't gated behind hydration. Reduced motion is honored two ways: a global CSS `@media (prefers-reduced-motion)` block and `MotionConfig reducedMotion="user"`.

**Styling & fonts.** Tailwind v4 (`@import "tailwindcss"` in `globals.css`). Palette: emerald primary + amber secondary accent (the green-terminal aesthetic). Fonts via `next/font` CSS variables — Space Grotesk for headings (`--font-display`, applied to `h1–h6`), Outfit for body (`--font-outfit`), Geist Mono for technical accents (`--font-mono`, `.font-accent-mono`).

## Testing notes

- Unit tests (Vitest/jsdom) live in `src/__tests__/`. Coverage thresholds are enforced (90% statements/functions/lines, 85% branches) in `vitest.config.ts`. Genuinely un-jsdom-able files are excluded there with rationale: the html-shell layouts, `src/i18n/**` and `middleware.ts` (crash on import outside the Next server runtime), `src/types/**`, and `AboutParticles.tsx` (canvas has no 2D context in jsdom).
- **Framer Motion is mocked centrally** at `__mocks__/framer-motion.tsx`. In a test, use a bare `vi.mock("framer-motion")` to pick it up (don't re-inline the proxy). The mock uses `React.JSX.IntrinsicElements` — match that in any new mock (React 19 removed the global `JSX` namespace).
- e2e specs (`e2e/`) run axe-core accessibility scans on the homepage (both themes), blog index, and a post; these fail on any WCAG violation. Decorative icons/canvas must be `aria-hidden`.

## Conventions

- **No em-dashes** in any copy (site, CV, commit messages) — use commas/colons/parentheses.
- Set `GOOGLE_SITE_VERIFICATION` in the environment to activate Search Console verification (read in `[locale]/layout.tsx`).
- Required env vars for the contact form: `RESEND_API_KEY`, `CONTACT_EMAIL`, `FROM_EMAIL` (see `.env.example`). The contact and CV routes are rate-limited via `src/lib/rate-limit.ts`.
