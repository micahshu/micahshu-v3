@AGENTS.md

# micahshu-v3

Personal portfolio for Micah Shu. Minimalist editorial aesthetic — black and white, light/dark mode.

---

## Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 16.2.3 — App Router, `src/` layout |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 via `@tailwindcss/postcss` — **no `tailwind.config.ts`** |
| Fonts | `next/font/google` — Funnel Sans + Bebas Neue only |
| Content | Markdown (`.md`) flat files — blog only |
| Deployment | Vercel |

---

## Pages & Routes

`/` `/about` `/projects` `/projects/[slug]` `/services` `/services/[slug]` `/blog` `/blog/[slug]` `/contact`

---

## File Structure

```
src/
  app/                        # All routes (App Router)
  components/
    ui/                       # Button, Tag, Card, Input, RevealImage
    layout/                   # Header, Footer, Section, Container
    sections/                 # Homepage section components
  lib/
    content.ts                # getBlogPosts(), getBlogPost(slug) — build-time only
    types.ts                  # All shared TypeScript interfaces
    data/
      projects.ts             # Static project array
      services.ts             # Static service array
      alacarte.ts             # Static à la carte service array
      tags.ts                 # Tag registry
  content/
    blog/                     # *.md — one file per post
```

---

## Content Workflows

### Adding a Blog Post

1. Create `src/content/blog/[slug].md` with YAML frontmatter:

```md
---
title: Post Title
slug: post-slug
date: 'YYYY-MM-DD'
excerpt: One-sentence summary shown in listings.
categories:
  - case-study        # or: process, engineering, design
projectSlug: project-slug   # optional — links post to a project
---

Post body in Markdown.
```

2. No code changes needed — `getBlogPosts()` in `src/lib/content.ts` picks it up automatically.

**Valid categories:** `case-study`, `process`, `engineering`, `design`

---

### Adding a Project

Edit `src/lib/data/projects.ts` and add an entry to the `projects` array:

```ts
{
  title: 'Project Name',
  slug: 'project-slug',           // URL: /projects/project-slug
  category: 'Full-Stack',         // Full-Stack | Front-End | E-Commerce
  description: '...',
  tags: ['Next.js', 'React'],     // Must exist in src/lib/data/tags.ts
  featured: true,                 // Shows on homepage — max 4 at a time
  liveUrl: 'https://...',         // optional
  image: '/images/filename.webp', // optional — place in /public/images/
}
```

- Images go in `/public/images/`. Prefer `.webp` for photos, `.png` for screenshots.
- The project detail page at `/projects/[slug]` is generated automatically via `generateStaticParams`.
- To link a blog post to this project, set `projectSlug` in the post's frontmatter.

---

### Adding or Editing a Service

Services are in `src/lib/data/services.ts`. Each entry matches the `Service` interface in `src/lib/types.ts`:

```ts
{
  name: 'Service Name',
  slug: 'service-slug',           // URL: /services/service-slug
  hook: 'One-line client hook.',
  timeframe: '2–4 weeks',
  startingAt: '$3,000',
  description: 'Short description for listing card.',
  overview: ['Paragraph one.', 'Paragraph two.'],
  includes: ['Deliverable one', 'Deliverable two'],
  idealFor: ['Client type one', 'Client type two'],
  faqs: [
    { q: 'Question?', a: 'Answer.' },
  ],
  relatedTags: ['Next.js'],       // Cross-links to related projects
  relatedCategory: 'Front-End',  // optional
}
```

À la carte add-ons live in `src/lib/data/alacarte.ts` and follow the `AlaCarteService` interface.

---

### Adding a Nav Item

Edit the `NAV_LINKS` array at the top of `src/components/layout/Header.tsx`. The desktop sliding indicator and mobile menu update automatically.

---

## Design System

### Colors — semantic tokens only in components

```
--color-bg / --color-fg          # Background and foreground (theme-aware)
--color-border / --color-border-soft  # Border weight
--color-muted                    # Subdued text
--color-surface                  # Slightly elevated surface (tags, chrome)
--color-paper-pure               # Cards/inputs — pops off bg in light mode
```

- Never use `--color-ink` or `--color-paper` directly in components.
- Hover state: always `bg-fg text-bg` (inversion works in both modes).
- All base tokens and dark mode overrides live in `globals.css` under `@theme`.

### Typography

| Font | Variable | Role |
|---|---|---|
| Bebas Neue | `font-display` | Hero, eyebrows, nav, labels |
| Funnel Sans | `font-body` | Everything else |

- Bebas Neue is uppercase only — never on mixed-case text.
- `--text-hero` / `--text-display`: `letter-spacing: -0.02em`
- `--text-h1` through `--text-h3`: `letter-spacing: -0.01em`
- `--text-label`: uppercase + `letter-spacing: 0.08em`

### Spacing

Use `--space-1` through `--space-11` (4px base). Never raw pixel values in layout.

- Section vertical padding: `--space-8` mobile, `--space-9` desktop
- Container horizontal padding: `--space-5` mobile, `--space-7` desktop
- Card padding: `--space-5`. Grid gap: `--space-1`.

### Borders & Surfaces

- Primary: `1px solid var(--color-border)`. Active: `2px`.
- No `box-shadow`, no `border-radius` on layout elements.
- Sections separated by full-width `1px` horizontal rules — no margin gaps.
- `border-radius` only on interactive components: buttons `4px`, tags `2px`, inputs `4px`.

### Motion

- Hover: `--duration-fast` (150ms) + `--ease-inout`
- Page enter: `--duration-enter` (500ms) + `--ease-out` — `opacity` + `translateY(8px)` only
- Only animate `transform` and `opacity`. Exception: `width` on absolutely-positioned indicators (no reflow).
- Never animate `height`, `top`, `left`. Wrap enter animations in `prefers-reduced-motion`.

### Section Anatomy

```
[eyebrow]   font-display, --text-label, uppercase, tracking-[0.08em], color-muted
[heading]   font-display (--text-display) or font-body (--text-h1)
[subtext]   font-body, --text-body, color-muted, max-width --container-prose
[content]
[CTA]       ghost button, right-aligned or centered
```

---

## Tailwind + Tokens

No `tailwind.config.ts`. All tokens in `globals.css` under `@theme`.

- Use Tailwind for structure/layout: flex, grid, sizing, positioning, responsive visibility.
- Use inline `style` props for: spacing tokens (`var(--space-*)`) and dynamic runtime values.
- Never add responsive/utility rules to `globals.css` — Tailwind handles that.

```tsx
<h1 className="font-display text-[length:var(--text-display)] tracking-[-0.02em]">TITLE</h1>
<section style={{ paddingBlock: 'var(--space-9)' }}>
```

---

## Next.js App Router

- `params` / `searchParams` are **Promises** — always `await` them.
- Server Components by default. `'use client'` only for state, effects, event handlers, browser APIs.
- Use `generateStaticParams()` for all dynamic routes.
- Read `node_modules/next/dist/docs/` before using any API you're unsure about.

---

## Email & Contact Form

- API route: `src/app/api/contact/route.ts`
- Transactional email via Resend — `from: me@micahshu.com`, `replyTo` set to submitter
- Required env vars: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`
- Never hardcode API keys.

---

## What NOT To Do

- No `tailwind.config.ts` or `tailwind.config.js`
- No `box-shadow` anywhere
- No `border-radius` on sections, grids, or layout containers
- No Bebas Neue on mixed-case text
- No raw hex values in component files — use `--color-*` tokens
- No Tailwind default spacing (`mt-3`, `py-5`) for layout — use `--space-*` tokens
- No `--color-ink` / `--color-paper` directly in components — use `--color-fg` / `--color-bg`
- No `pages/` router — App Router only
- No synchronous `params` / `searchParams` access
- No animating `height`, `top`, `left`, or layout-triggering properties
- No gradients, decorative blurs, or drop shadows
- No external state management (Zustand, Redux, etc.) — React state only
