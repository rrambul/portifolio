# renanrambul.dev · Portfolio

A modern, performant developer portfolio: bilingual (EN/PT), dark/light, accessible, and tested. Live at **[renanrambul.dev](https://renanrambul.dev)**.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript · React 19
- **Styling:** Tailwind CSS v4 (teal/violet palette)
- **Fonts:** Space Grotesk (headings) · Outfit (body) · Geist Mono (accents) via `next/font`
- **Animation:** Framer Motion (LazyMotion)
- **i18n:** next-intl (EN / PT)
- **Theming:** next-themes (class strategy, dark default)
- **Email:** Resend (contact form)
- **PDF:** `@react-pdf/renderer` (downloadable CV generated from site content)
- **Testing:** Vitest (unit) · Playwright + axe-core (e2e + accessibility)
- **Package manager:** pnpm · **Deploy:** Vercel

## Features

- Bilingual content (EN/PT) with locale-prefixed routes
- Dark / light themes
- Animated sections with reduced-motion support
- **Skills** bento grid, **Experience** timeline, **Projects & Contributions**
- **Blog** with Markdown posts (EN/PT)
- **Download CV**: a PDF rendered on demand from the same data that powers the site
- Accessibility enforced in CI (axe-core scans, WCAG 2 AA)

## Getting Started

```bash
pnpm install

cp .env.example .env.local
# Fill in RESEND_API_KEY, CONTACT_EMAIL, FROM_EMAIL

pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

> Uses **pnpm** (pinned via `packageManager`). Avoid `npm install`; the deploy relies on `pnpm-lock.yaml`.

## Scripts

| Command              | Description                                  |
| -------------------- | -------------------------------------------- |
| `pnpm dev`           | Start development server (Turbopack)         |
| `pnpm build`         | Production build                             |
| `pnpm start`         | Start production server                      |
| `pnpm lint`          | Run ESLint                                   |
| `pnpm typecheck`     | Type-check with `tsc`                        |
| `pnpm test`          | Unit tests (Vitest)                          |
| `pnpm test:coverage` | Unit tests with coverage thresholds          |
| `pnpm test:e2e`      | End-to-end + accessibility tests (Playwright)|

CI (GitHub Actions) runs lint, typecheck, coverage, build, and the e2e suite on every push and PR.

## Project Structure

```
src/
├── app/
│   ├── [locale]/     # Locale-scoped pages, layout (document shell), boundaries
│   └── api/          # Route handlers (contact, cv)
├── components/       # sections/, ui/, blog/
├── config/           # siteConfig (single source for URL + identity)
├── data/             # Structural data (projects, experiences, skills, blog metadata)
├── i18n/             # next-intl setup
├── lib/              # buildMetadata, cv, blog-content, rate-limit, animations
├── messages/         # Translations (en, pt)
├── providers/        # Theme + transition providers
└── types/
content/blog/         # Markdown post bodies (<slug>.<locale>.md)
e2e/                  # Playwright specs (incl. axe a11y)
```

Architecture notes for contributors live in [CLAUDE.md](CLAUDE.md).

## Environment Variables

See [.env.example](.env.example). `GOOGLE_SITE_VERIFICATION` is optional (Search Console).

## License

MIT
