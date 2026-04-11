@AGENTS.md

# micahshu-v3

Personal portfolio for Micah Shu. Minimalist editorial aesthetic — black, white, one warm accent, light/dark mode. See `SITE_BRIEF.md` for site content intent and `DESIGN_SYSTEM.md` for the full token spec.

---

## Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 16.2.3 — App Router, `src/` layout |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 via `@tailwindcss/postcss` — **no `tailwind.config.ts`** |
| Fonts | `next/font/google` — Funnel Sans + Bebas Neue only |
| Content | MDX flat files |
| Deployment | Vercel |

---

## Pages & Routes

`/` `/about` `/projects` `/projects/[slug]` `/services` `/blog` `/blog/[slug]` `/contact`

---

## Content Types

Define in `src/lib/types.ts`. Use these exact shapes:

```ts
interface Project {
  title: string
  slug: string
  description: string
  tags: string[]
  techIcons: { name: string; icon: string }[]
  liveUrl?: string
  image?: string
}

interface Service {
  name: string
  timeframe: string
  description: string
}

interface BlogPost {
  title: string
  slug: string
  date: string
  excerpt: string
  content: string
  categories: string[]
}

interface TechStackItem {
  name: string
  icon: string
}
```

---

## File Structure

```
src/
  app/
    layout.tsx          # Root layout — fonts, metadata
    globals.css         # @import "tailwindcss" + ALL @theme tokens
    page.tsx            # Homepage
    about/page.tsx
    projects/page.tsx
    projects/[slug]/page.tsx
    services/page.tsx
    blog/page.tsx
    blog/[slug]/page.tsx
    contact/page.tsx
  components/
    ui/                 # Button, Tag, Card, Input
    layout/             # Header, Footer, Section, Container
    sections/           # Homepage section components
    mdx/                # MDX component overrides
  lib/
    content.ts          # MDX file reading utilities (build-time only)
    types.ts            # All shared TypeScript interfaces
  content/
    projects/           # *.mdx — one file per project
    blog/               # *.mdx — one file per post
```

---

## Design System

### Colors

All tokens defined in `@theme` in `globals.css`. **Never use raw hex values in component files.**

**Base tokens (fixed values):**

```css
--color-ink:        #0A0A0A
--color-paper:      #F5F2EE
--color-paper-pure: #FFFFFF
--color-accent:     #C8A96E   /* sparingly — max 2–3 uses per page */
--color-accent-dim: #E8D9BC
--color-muted:      #6B6B6B
--color-subtle:     #D4D0CA
--color-surface:    #EDEBE7
```

**Semantic tokens (theme-aware — use these in all components):**

```css
/* Light (default) */
--color-bg:          var(--color-paper)
--color-fg:          var(--color-ink)
--color-border:      var(--color-ink)
--color-border-soft: var(--color-subtle)

/* Dark — override on :root via prefers-color-scheme + optional .dark class */
--color-bg:          var(--color-ink)
--color-fg:          var(--color-paper)
--color-border:      var(--color-paper)
--color-border-soft: #2A2A2A
```

Implement dark mode via:
```css
@media (prefers-color-scheme: dark) {
  :root { /* swap semantic tokens */ }
}
.dark { /* same swap — for manual toggle */ }
```

- Always use `--color-bg`, `--color-fg`, `--color-border` in components — never `--color-ink` or `--color-paper` directly.
- Hover state is always inverted: `bg-fg text-bg` (works in both modes automatically).
- `accent` appears max 2–3 times per page. Never on body text or large fills.
- `paper-pure` is for cards/inputs that need to pop off `--color-bg` in light mode — in dark mode this becomes a slightly elevated surface color.

### Typography

Two fonts. Strict roles. Never mixed within a single element.

| Font | CSS variable | When to use |
|---|---|---|
| Bebas Neue | `font-display` | Hero text, section eyebrows, nav labels, callouts, `--text-hero`, `--text-display`, `--text-label` |
| Funnel Sans | `font-body` | Everything else |

**Bebas Neue is uppercase only.** Never apply it to mixed-case text.

**Type scale (all defined in `@theme`):**

| Token | Size | Usage |
|---|---|---|
| `--text-hero` | `clamp(72px, 10vw, 144px)` | Homepage hero |
| `--text-display` | `clamp(48px, 6vw, 96px)` | Section heroes, page titles |
| `--text-h1` | `48px` | Page-level headings |
| `--text-h2` | `32px` | Section headings |
| `--text-h3` | `22px` | Card titles, sub-sections |
| `--text-h4` | `18px` | Labels, grouped headings |
| `--text-body` | `16px` | All paragraph text |
| `--text-small` | `14px` | Metadata, dates |
| `--text-caption` | `12px` | Tags, footnotes |
| `--text-label` | `13px` | Section eyebrows, nav labels |

Tracking rules:
- `--text-hero`, `--text-display`: `letter-spacing: -0.02em`
- `--text-h1` through `--text-h3`: `letter-spacing: -0.01em`
- `--text-label`: uppercase + `letter-spacing: 0.08em`
- Body text: `letter-spacing: 0`

### Spacing

Base unit: 4px. Use only the named scale. Never raw pixel values in layout.

```
--space-1:  4px     --space-7:  48px
--space-2:  8px     --space-8:  64px
--space-3:  12px    --space-9:  96px
--space-4:  16px    --space-10: 128px
--space-5:  24px    --space-11: 192px
--space-6:  32px
```

- Section vertical padding: `--space-8` mobile, `--space-9` desktop
- Container horizontal padding: `--space-5` mobile, `--space-7` desktop
- Card internal padding: `--space-5` all sides
- Grid gap between cards: `--space-1` (tight bordered grid)

### Borders & Surfaces

- Primary: `1px solid var(--color-border)`
- Secondary: `1px solid var(--color-border-soft)`
- Active/featured: `2px solid var(--color-border)`
- No `box-shadow` anywhere — cards use border, not shadow.
- No `border-radius` on layout elements. Only on interactive components:
  - Buttons: `--border-radius-md` (4px)
  - Tags/badges: `--border-radius-sm` (2px)
  - Inputs: `--border-radius-md` (4px)
- Sections separated by full-width `1px solid var(--color-border)` horizontal rules. No margin gaps between sections.

### Motion

- Hover transitions: `--duration-fast` (150ms) + `--ease-inout`
- Page enter: `--duration-enter` (500ms) + `--ease-out`, `opacity` + `translateY(8px)` only
- Underline hover: width `0%` → `100%`, `--ease-linear`, `--duration-base` (250ms)
- Only animate `transform` and `opacity`. Never `width`, `height`, `top`, `left`, or any layout property.
- Wrap all enter animations in `@media (prefers-reduced-motion: no-preference)`.

### Section Anatomy

Every section follows this structure:

```
[eyebrow]   font-display, --text-label, uppercase, letter-spacing 0.08em, color-muted
[heading]   font-display (--text-display) or font-body (--text-h1)
[subtext]   font-body, --text-body, color-muted, max-width --container-prose
[content]
[CTA]       ghost button, right-aligned or centered
```

### Component Specs

**Button** — two variants only:
- Solid: `bg-fg text-bg border-fg` → hover: `bg-accent border-accent text-ink`
- Ghost: `bg-transparent text-fg border-fg` → hover: `bg-fg text-bg`
- No uppercase on button labels. No letter-spacing on button labels.
- Transition: `--duration-fast --ease-inout` on `background-color`, `color`, `border-color`

**Card:** `bg-[var(--color-paper-pure)] border border-[var(--color-border)]`, no border-radius, hover: `border-2`. Transition: `--duration-fast` on border-width.

**Tag/Badge:** `bg-[var(--color-surface)] text-fg border-border-soft`, `text-caption uppercase tracking-wide`, `border-radius-sm`. Active: `bg-fg text-bg`.

**Input/Textarea:** `bg-[var(--color-paper-pure)] border border-[var(--color-border-soft)]`, focus: `border-[var(--color-border)] outline-none`. placeholder: `color-muted`.

**Nav Link:** `font-display text-label uppercase tracking-widest text-fg`, hover: `color-accent`. Active: `color-accent` + underline.

---

## Tailwind v4 Usage

No `tailwind.config.ts`. All tokens live in `globals.css` under `@theme`:

```css
@import "tailwindcss";

@theme {
  /* all color, font, spacing, motion tokens here */
}
```

Reference tokens in JSX with type hints in arbitrary value brackets:

```tsx
<h1 className="font-display text-[length:var(--text-display)] tracking-[-0.02em]">
  SECTION TITLE
</h1>
<p className="font-body text-[length:var(--text-body)] text-[color:var(--color-muted)]">
  Body copy
</p>
```

Inline styles are acceptable when token-based spacing would produce clunky Tailwind output:

```tsx
<section style={{ paddingBlock: 'var(--space-9)' }}>
```

---

## Font Loading

In `src/app/layout.tsx`:

```ts
import { Funnel_Sans, Bebas_Neue } from 'next/font/google'

const funnelSans = Funnel_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500', '600', '700', '800'],
})

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400'],
})

// Apply both to <html>:
<html lang="en" className={`${funnelSans.variable} ${bebasNeue.variable}`}>
```

---

## MDX Content

MDX files live in `src/content/` — not in `src/app/`. They are read at build time via Node `fs`.

- Install: `@next/mdx @mdx-js/loader @mdx-js/react @types/mdx gray-matter`
- Each file has YAML frontmatter matching the relevant TypeScript interface
- Expose `getProjects()`, `getBlogPosts()` etc. in `src/lib/content.ts`
- Custom MDX component overrides (headings, paragraphs, links, code) live in `src/components/mdx/`

---

## Next.js App Router — Breaking Changes

- `params` and `searchParams` in pages/layouts are **Promises** — always `await` them:
  ```tsx
  export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
  }
  ```
- All pages/layouts are Server Components by default. Add `'use client'` only for `useState`, `useEffect`, event handlers, or browser APIs.
- Use `generateStaticParams()` for all dynamic routes.
- Read `node_modules/next/dist/docs/` before using any API you're unsure about.

---

## What NOT To Do

- Do not create `tailwind.config.ts` or `tailwind.config.js`
- Do not use `box-shadow` anywhere
- Do not add `border-radius` to sections, grids, or layout containers
- Do not use Bebas Neue on mixed-case text
- Do not use raw hex values in component files — always reference `--color-*` tokens
- Do not use Tailwind's default spacing scale (`mt-3`, `py-5`, etc.) for layout spacing — use `--space-*` tokens
- Do not use `--color-accent` for body text or large background fills
- Do not use `--color-ink` / `--color-paper` directly in components — use semantic tokens (`--color-fg`, `--color-bg`) so dark mode works automatically
- Do not use the `pages/` router — App Router only
- Do not access `params` or `searchParams` synchronously
- Do not animate `width`, `height`, `top`, `left`, or any layout property
- Do not add gradients, decorative blurs, or drop shadows
- Do not introduce external state management (Zustand, Redux, etc.) — React state only
