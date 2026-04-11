# Site Brief — micahshu.com Next.js Rebuild

## Overview

Personal portfolio site for a web developer. Currently WordPress + Timber (Twig) + Tailwind +
Alpine.js, exported as static HTML deployed on Cloudflare Workers. The goal is a clean Next.js
rebuild that preserves the design language but improves execution.

---

## Pages

| Route | Purpose |
|---|---|
| `/` | Homepage — hero, tech stack icons, about teaser, featured projects grid, services teaser |
| `/about` | Full about page — bio, skills, background |
| `/projects` | Projects grid with filterable technology tags |
| `/projects/[slug]` | Individual project showcase — description, tech stack, links |
| `/services` | Services listing — expandable items with timeframes |
| `/blog` | Blog post archive |
| `/blog/[slug]` | Individual blog post |
| `/contact` | Contact form |

---

## Custom Content Types

**Project**
```ts
{
  title: string
  slug: string
  description: string
  tags: string[]  // e.g. "wordpress", "tailwind", "alpine-js", "next-js", "react", "mongodb", "woo", "php"
  techIcons: { name: string, icon: string }[]
  liveUrl?: string
  image?: string
}
```

**Service**
```ts
{
  name: string
  timeframe: string  // e.g. "2 weeks", "monthly", "hourly"
  description: string
}
```

**BlogPost**
```ts
{
  title: string
  slug: string
  date: string
  excerpt: string
  content: string  // MDX or markdown
  categories: string[]
}
```

**TechStackItem**
```ts
{
  name: string  // "React", "Next.js", "Tailwind", "WordPress", "Node", "PHP"
  icon: string
}
```

---

## Style & Theme

**Design language:** Minimalist, editorial, black-and-white dominant. Strong typographic hierarchy,
thin 1px black borders, generous whitespace. No decorative gradients or drop shadows.

**Colors:**
- Background: warm off-white `#F5F2EE`
- Foreground/borders: near-black `#0A0A0A`
- Hover states: inverted — `bg-ink text-paper`
- Accent: desaturated warm amber `#C8A96E` — used sparingly
- Subtle neutrals: Tailwind gray scale for secondary text

**Typography:**
- Body/headings: **Funnel Sans** (Google Fonts, variable 300–800)
- Display/labels: **Bebas Neue** — section eyebrows, hero text, callouts
- Hero text: very large (`clamp(72px, 10vw, 144px)`)
- Links: underlined by default

**Layout patterns:**
- Full-width sections separated by `1px solid` horizontal rules
- Responsive grids: 1 col mobile → 2–4 col desktop
- Header: 3-column — logo | nav | CTA button
- Editorial asymmetric layouts on about and services pages

**Navigation:**
- Logo: `micah` (light weight) + `shu` (bold weight)
- Links: Home, About, Projects, Services, Blog
- CTA: "Connect" button (outlined, inverts on hover)

---

## Recommended Next.js Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Content | MDX flat files — no CMS |
| Fonts | `next/font/google` (Funnel Sans + Bebas Neue) |
| Deployment | Cloudflare Pages via `@cloudflare/next-on-pages` |
| Interactivity | React state — no Alpine.js |

---

## Design System

See `DESIGN_SYSTEM.md` for the full token spec covering colors, typography scale, spacing scale,
layout patterns, borders, motion, component defaults, and Tailwind v4 implementation notes.
