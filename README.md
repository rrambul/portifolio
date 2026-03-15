# renanrambul.com — Portfolio

A modern, performant developer portfolio built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. Supports dark/light themes and English/Portuguese localization.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion
- **i18n:** next-intl (EN / PT)
- **Theming:** next-themes (class strategy)
- **Email:** Resend API

## Getting Started

```bash
# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local
# Fill in RESEND_API_KEY, CONTACT_EMAIL, FROM_EMAIL

# Start dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/              # Next.js App Router pages & API routes
│   ├── [locale]/     # Locale-scoped pages (en, pt)
│   └── api/          # API routes (contact form)
├── components/
│   ├── sections/     # Page sections (Hero, About, Experience, etc.)
│   ├── ui/           # Reusable UI components
│   └── blog/         # Blog components
├── config/           # Site-wide configuration
├── data/             # Static data (experiences, projects, interests)
├── hooks/            # Custom React hooks
├── i18n/             # Internationalization setup
├── lib/              # Shared utilities (animations)
├── messages/         # Translation files (en, pt)
├── providers/        # React context providers
└── types/            # TypeScript type definitions
```

## Environment Variables

See [.env.example](.env.example) for required variables.

## Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `pnpm dev`     | Start development server |
| `pnpm build`   | Production build         |
| `pnpm start`   | Start production server  |
| `pnpm lint`    | Run ESLint               |

## License

MIT
