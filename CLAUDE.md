# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (Turbopack) at http://localhost:3000
npm run build    # Production build
npm run lint     # ESLint
```

**No test suite exists.** There is no automated testing framework in this project.

### Dev server management

Turbopack has a known CSS hot-reload bug where keyframe changes in `globals.css` don't compile into updated chunk hashes. After any change to `app/globals.css` (especially `@keyframes`), a **full server restart is required**:

```bash
pkill -9 -f "next" && rm -f .next/dev/lock && npm run dev
```

## Architecture

**Next.js 16 App Router** with React 19 and Tailwind CSS v4. No config file for Tailwind — it uses `@import "tailwindcss"` in `app/globals.css` and the `@theme inline` block for custom tokens.

### Fonts

Two fonts loaded in `app/layout.tsx`:
- `--font-playfair` → local file `TAN-MEMORIES-Regular.ttf` (display/headings)
- `--font-poppins` → Google Fonts (body)

Reference in JSX as `font-[family-name:var(--font-playfair)]`.

### Data layer (`lib/`)

All content is static TypeScript — no database or CMS.

- **`lib/projects.ts`** — `Project[]` with `slug`, `vimeoId`, `serviceTypes: string[]`, prev/next slugs for navigation. Key functions: `getProject(slug)`, `getAllProjects()`, `getProjectsByService(serviceSlug)`, `getAdjacentProjects(slug)`.
- **`lib/services.ts`** — `Service[]` with `slug`, `category: "Photography" | "Videography"`, deliverables, process steps, testimonials. Key functions: `getService(slug)`, `getAllServices()`, `getServicesByCategory(category)`.

Projects link to services via `serviceTypes` (array of service slugs). To surface a project on a service page, add its service slug to the project's `serviceTypes` array.

### Routes

- `/` — single-page home (`app/page.tsx`), all sections rendered in order: Nav, Hero, ProjectsHover, Services, Testimonials, About, QualificationForm, Footer, VinylPlayer
- `/projects/[slug]` — dynamic project case study pages, data from `lib/projects.ts`
- `/services/[slug]` — dynamic service pages, data from `lib/services.ts`

Both dynamic routes use `generateStaticParams()` for static generation.

### CSS architecture

All custom CSS lives in `app/globals.css`. Tailwind v4 has no `tailwind.config.ts`. Custom colours (`--color-gold`, `--color-pink`) and fonts are defined in `@theme inline`.

Avoid inline `animation:` style props — use CSS classes defined in `globals.css` instead, as Turbopack sometimes fails to apply inline animation styles during dev.

SVG animations use SMIL (`<animate>`) rather than CSS `clip-path: inset()`, which doesn't work on SVG elements.

### Notable components

- **`VinylPlayer.tsx`** — fixed bottom-right easter egg, three-layer SVG structure (spinning disc / cyan hover overlay / play-pause icon). Audio via `new Audio()`. CSS classes: `.vinyl-btn`, `.vinyl-disc-spinning`, `.vinyl-cyan-overlay`, `.vinyl-icon`.
- **`ProjectsHover.tsx`** — project list with floating Vimeo preview popup on hover (desktop only).
- **`QualificationForm.tsx`** — contact/qualification form with service category pills matching the 6 services in `lib/services.ts`.
