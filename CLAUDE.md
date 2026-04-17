@AGENTS.md

# micahshu-v3

Personal portfolio for Micah Shu. Minimalist editorial aesthetic — black and white, light/dark mode. Deployed to Vercel.

---

## Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 16.2.3 — App Router, `src/` layout |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 via `@tailwindcss/postcss` — **no `tailwind.config.ts`** |
| Fonts | `next/font/google` — Funnel Sans + Bebas Neue only |
| Content | Markdown (`.md`) flat files in `src/content/blog/` — blog only |
| Email | Resend — transactional via `src/app/api/contact/route.ts` |
| Deployment | Vercel |

---

## File Structure

```
src/
  app/
    page.tsx                    # / (homepage)
    about/
      page.tsx                  # /about
      resume/page.tsx           # /about/resume
    projects/
      page.tsx                  # /projects
      [slug]/page.tsx           # /projects/[slug]
    services/
      page.tsx                  # /services
      [slug]/page.tsx           # /services/[slug]
    blog/
      page.tsx                  # /blog
      [slug]/page.tsx           # /blog/[slug]
    contact/page.tsx            # /contact
    dev/page.tsx                # /dev (internal dev page)
    proposals/
      [slug]/page.tsx           # /proposals/[slug] — passphrase-gated proposal view
      [slug]/unlock/page.tsx    # /proposals/[slug]/unlock — passphrase entry
      [slug]/unlock/UnlockForm.tsx  # Client form — calls unlockProposal action
      [slug]/unlock/actions.ts  # unlockProposal() — validates passphrase, sets cookie
    api/contact/route.ts        # POST handler — Resend email
    api/proposals/accept/route.ts  # POST handler — sends acceptance email via Resend
    layout.tsx                  # Root layout — fonts, theme, metadata
    globals.css                 # All design tokens (@theme), dark mode, base styles
    opengraph-image.tsx         # OG image generator
    robots.ts                   # robots.txt
    sitemap.ts                  # sitemap.xml
    not-found.tsx               # 404 page
  components/
    layout/
      Header.tsx                # Sticky nav, mobile menu, theme toggle
      Footer.tsx                # Footer nav, socials, greeting
      Container.tsx             # Max-width wrapper (default/tight/prose)
      Section.tsx               # Semantic section with border/padding
    ui/
      Button.tsx                # solid/ghost variants, sm/md/lg sizes
      Tag.tsx                   # Tech badge with optional react-icon
      ProjectCard.tsx           # Project card (horizontal/vertical layout)
      PageHero.tsx              # Page header hero with portrait + meta
      RevealImage.tsx           # next/image wrapper with hover/reveal
      BrowserBar.tsx            # macOS-style browser chrome mockup
      ThemeToggle.tsx           # Dark/light mode toggle (client)
      AuthorBio.tsx             # Blog post author bio strip
      FooterGreeting.tsx        # Random greeting (client)
    sections/
      HeroSection.tsx           # Homepage hero
      AboutSection.tsx          # Homepage about strip
      ProjectsSection.tsx       # Homepage featured projects
      ProjectsGrid.tsx          # /projects full grid with tag filter
      ServicesSection.tsx       # Homepage services row list
      ServicesSplitPanel.tsx    # /services split-panel or mobile accordion
      ServiceFAQ.tsx            # Expandable FAQ accordion
      AlaCarteSection.tsx       # À la carte add-ons grid
      BlogSection.tsx           # Homepage 3-post preview
      BlogList.tsx              # /blog full list with category filter
      CTASection.tsx            # Full-width dark CTA strip
      ContactForm.tsx           # Contact form with validation + Resend
      ProposalView.tsx          # Interactive proposal UI — line items, totals, accept button
  lib/
    types.ts                    # All TypeScript interfaces
    content.ts                  # getBlogPosts(), getBlogPostBySlug(), getCaseStudies()
    utils.ts                    # Shared utility functions
    data/
      projects.ts               # Static Project[] array
      services.ts               # Static Service[] array
      alacarte.ts               # Static AlaCarteService[] array
      proposals.ts              # Static Proposal[] array
      tags.ts                   # Tag name → react-icon mapping
  content/
    blog/                       # *.md — one file per post
```

---

## Content Workflows

### Adding a Blog Post

1. Create `src/content/blog/[slug].md` — the filename must match `slug`:

```md
---
title: Post Title
slug: post-slug
date: 'YYYY-MM-DD'
excerpt: One-sentence summary shown in listings and cards.
categories:
  - case-study        # valid: case-study | process | engineering | design
projectSlug: project-slug   # optional — links post to a project detail page
---

Post body in Markdown. Supports headings, code blocks, images, lists.
```

2. No code changes needed — `getBlogPosts()` in `src/lib/content.ts` auto-discovers all `.md` files.
3. Syntax highlighting in code blocks is handled by `rehype-pretty-code` + Shiki — no config needed.
4. If `projectSlug` is set, the post appears in the "Case Studies" section of `/projects/[slug]`.

**Valid categories:** `case-study`, `process`, `engineering`, `design`

---

### Adding a Project

Edit `src/lib/data/projects.ts` — add an entry to the `projects` array. Full interface from `src/lib/types.ts`:

```ts
{
  title: 'Project Name',
  slug: 'project-slug',           // URL: /projects/project-slug
  category: 'Full-Stack',         // Full-Stack | Front-End | E-Commerce
  description: 'One or two sentences shown on cards and the detail page.',
  tags: ['Next.js', 'React'],     // Must exist in src/lib/data/tags.ts — see Adding a Tag
  featured: true,                 // Shows on homepage ProjectsSection — max 4 at a time
  liveUrl: 'https://example.com', // optional — enables live site link
  image: '/images/filename.webp', // optional — place file in /public/images/
}
```

**Image guidelines:**
- Place images in `/public/images/`. Prefer `.webp` for photos, `.png` for screenshots.
- Recommended dimensions: 1200×800px minimum. The `ProjectCard` uses `aspect-video` (16:9).
- The `BrowserBar` + `RevealImage` combo on the homepage uses these images — test both.

**Featured limit:** Only 4 projects show on the homepage. If more than 4 have `featured: true`, extras are hidden. Check `src/components/sections/ProjectsSection.tsx` for the slice logic.

**Detail page:** Generated automatically via `generateStaticParams` in `src/app/projects/[slug]/page.tsx`. No extra work needed.

**Linking blog posts:** Set `projectSlug` in any blog post's frontmatter to the project's `slug`. It will appear in the "Related Writing" section of the project detail page.

---

### Adding or Editing a Service

Services live in `src/lib/data/services.ts`. Full `Service` interface (`src/lib/types.ts`):

```ts
{
  name: 'Service Name',
  slug: 'service-slug',           // URL: /services/service-slug
  hook: 'One-line client-facing pitch.',
  timeframe: '2–4 weeks',         // Shown in listings and detail page
  startingAt: '$3,000',           // Primary price shown in listings
  description: 'Short paragraph for the listing card.',
  overview: [
    'First paragraph of service overview.',
    'Second paragraph.',
  ],
  includes: [
    'Deliverable or feature one',
    'Deliverable or feature two',
  ],
  idealFor: [
    'Client type or use case one',
    'Client type or use case two',
  ],
  faqs: [
    { q: 'Question?', a: 'Answer.' },
  ],
  pricingOptions: [               // optional — replaces startingAt display on detail page
    { label: 'Starter', price: '$3,000', detail: 'Up to 5 pages' },
    { label: 'Growth',  price: '$6,000', detail: 'Up to 12 pages' },
  ],
  relatedTags: ['Next.js', 'React'], // Cross-links to projects using these tags
  relatedCategory: 'Front-End',      // optional — filters related projects by category
  seeAlso: { text: 'See also', href: '/services/other', label: 'Other Service' }, // optional
  hidden: false,                     // true = exists at /services/[slug] but not listed
  subServices: ['add-on-slug'],      // optional — slugs of related AlaCarteServices
}
```

**Updating a price:** Change `startingAt` for the simple listed price, or add/update `pricingOptions` for tiered pricing on the detail page.

**Hiding a service:** Set `hidden: true`. The service is still accessible at its URL but won't appear in listings or the `ServicesSplitPanel`.

---

### Adding an À La Carte Add-On

Add-ons live in `src/lib/data/alacarte.ts`. Full `AlaCarteService` interface:

```ts
{
  name: 'Add-On Name',
  slug: 'addon-slug',             // URL: /services/addon-slug
  price: '$25',
  billingCycle: '/mo',            // '/mo' | '/hr' | 'one-time' | etc.
  hook: 'One-line pitch.',
  description: 'Short description for the listing card.',
  includes: ['Feature one', 'Feature two'],
  idealFor: ['Use case one'],
  faqs: [{ q: 'Question?', a: 'Answer.' }],
  parentSlugs: ['web-development'], // Slugs of services this add-on belongs to
  seeAlso: { text: 'See also', href: '/services/web-development' }, // optional
}
```

**Linking to a service:** Add the add-on's `slug` to the parent service's `subServices` array in `services.ts`, and add the parent service's `slug` to the add-on's `parentSlugs` array.

---

### Adding or Editing a Proposal

Proposals live in `src/lib/data/proposals.ts`. They are passphrase-gated — clients visit `/proposals/[slug]`, enter their passphrase at the unlock page, and get a 7-day cookie. Full `Proposal` interface (`src/lib/types.ts`):

```ts
{
  slug: 'client-name-month-year',   // URL: /proposals/[slug]
  passphrase: 'client-passphrase',  // Case-sensitive; shared with client out of band
  clientName: 'Client Name',
  date: 'YYYY-MM-DD',
  expiresAt: 'YYYY-MM-DD',          // optional — shown on proposal
  status: 'draft' | 'sent' | 'accepted',
  title?: 'Website Design & Development', // optional — shown as H1; auto-derived from recommended items if omitted
  coverNote: 'Multi-paragraph intro shown at top of proposal.',
  coverImage: '/images/filename.png',   // optional — macOS browser mockup hero
  coverImageUrl: 'https://...',         // optional — URL the cover image links to
  previewUrl: 'https://...',            // optional — enables "View Full Preview ↗︎" button
  items: ProposalLineItem[],
}
```

**`ProposalLineItem` fields:**

```ts
{
  type: 'service' | 'alacarte',   // resolves from services.ts or alacarte.ts by slug
  slug: 'service-slug',
  id?: 'unique-id',               // required when other items reference this via peerOf/includesItem
  peerOf?: 'parent-item-id',      // renders as a linked add-on below the parent item's group
  pricingOptionLabel?: 'Monthly', // selects a pricingOption from the service by label
  required?: true,                // cannot be deselected
  recommended?: true,             // pre-checked, highlighted badge
  note?: 'Shown below item name.',
  customPrice?: 1000,             // overrides resolved price (number, not string)
  customName?: 'Override Name',   // overrides resolved service name
  customDescription?: 'Override.', // overrides resolved service description
  group?: 'group-key',            // items sharing a group are mutually exclusive (radio)
  groupOptional?: false,          // if true, client can deselect all options in the group
  includesItem?: 'other-item-id', // when this item is checked, the target is auto-checked + shown as "Included"
}
```

**Auth flow:** `src/middleware.ts` intercepts `/proposals/[slug]` and redirects unauthenticated requests to `/proposals/[slug]/unlock`. The unlock page calls `unlockProposal()` (server action in `actions.ts`), which validates the passphrase and sets an `httpOnly` cookie for 7 days. Full validation also runs server-side in the page component.

**Acceptance:** When the client accepts, `POST /api/proposals/accept` sends an email via Resend to the owner summarising selected items.

---

### Adding a Tag

Tags are used on projects and services for cross-linking. To add a new tag:

1. Open `src/lib/data/tags.ts`
2. Add an entry: `'Tag Name': SiIconName` using an icon from `react-icons/si`
3. Use the exact tag name string when adding it to `project.tags` or `service.relatedTags`

Tags without an entry in `tags.ts` will still render as text-only badges — the icon is optional.

---

### Adding a Nav Item

Edit the `NAV_LINKS` array near the top of `src/components/layout/Header.tsx`:

```ts
const NAV_LINKS = [
  { href: '/',         label: 'Home' },
  { href: '/about',    label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog',     label: 'Blog' },
  { href: '/contact',  label: 'Contact' },
]
```

The desktop sliding indicator and mobile dropdown menu both derive from this array — no other changes needed.

---

### Adding a New Page

1. Create `src/app/[route]/page.tsx` — Server Component by default.
2. Export a `metadata` object for SEO (`title`, `description`).
3. Use `<Section>` and `<Container>` for layout consistency.
4. If the route is dynamic, export `generateStaticParams()`.
5. Always `await` params: `const { slug } = await params`.

**Style reference:** See `src/app/services/[slug]/page.tsx` for a full dynamic page example.

---

### Adding a New Component

Follow the patterns in existing components. Style references by type:

| Need | Reference file |
|---|---|
| Full-page section with eyebrow/heading/CTA | `src/components/sections/AboutSection.tsx` |
| Card component | `src/components/ui/ProjectCard.tsx` |
| Interactive accordion | `src/components/sections/ServiceFAQ.tsx` |
| Split panel / responsive layout | `src/components/sections/ServicesSplitPanel.tsx` |
| Form with validation + API | `src/components/sections/ContactForm.tsx` |
| Page hero with portrait | `src/components/ui/PageHero.tsx` |
| Image with hover swap | `src/components/ui/RevealImage.tsx` |
| Responsive grid with filter | `src/components/sections/ProjectsGrid.tsx` |
| Button | `src/components/ui/Button.tsx` |
| Inline badge/tag | `src/components/ui/Tag.tsx` |
| Layout wrapper | `src/components/layout/Section.tsx`, `src/components/layout/Container.tsx` |

---

## Design System

All tokens live in `src/app/globals.css` under `@theme`. Never define colors, spacing, or type sizes outside of this file.

### Color Tokens

**Base (fixed, not theme-aware — do not use in components):**
```
--color-ink        #0A0A0A
--color-paper      #F2F2F0
--color-accent-dim #E8D9BC   muted accent (dark: #3D2E12)
--color-muted      #6B6B6B   subdued text
--color-subtle     #D0D0CE   soft dividers
--color-surface    #E8E8E6   slightly elevated surfaces
--color-paper-pure #FFFFFF   cards/inputs (dark: #141414)
```

**Semantic (theme-aware — use these in all components):**
```
--color-fg           foreground text / borders
--color-bg           page background
--color-border       primary 1px border color
--color-border-soft  subtle / secondary borders
--color-muted        subdued text (same token, readable in both modes)
--color-surface      tag backgrounds, chrome
--color-paper-pure   card/input backgrounds
```

Rules:
- Always use semantic tokens in components — never `--color-ink` or `--color-paper` directly.
- Hover inversion: `background: var(--color-fg); color: var(--color-bg)` — works in both modes.
- `--color-accent` is for highlights only — never body text or large fills.
- Dark mode is applied via `.dark` class on `<html>` (manual toggle) and `@media (prefers-color-scheme: dark)` (system).

### Typography

| Font | Tailwind class | CSS var | Role |
|---|---|---|---|
| Bebas Neue | `font-display` | `--font-display` | Hero, eyebrows, nav labels, display headings |
| Funnel Sans | `font-body` | `--font-body` | Body copy, UI text, everything else |

**Type scale:**
```
--text-hero    clamp(72px, 10vw, 144px)   letter-spacing: -0.02em
--text-display clamp(48px, 6vw, 96px)     letter-spacing: -0.02em
--text-h1      48px                        letter-spacing: -0.01em
--text-h2      32px                        letter-spacing: -0.01em
--text-h3      22px                        letter-spacing: -0.01em
--text-h4      18px
--text-body    16px
--text-small   14px
--text-caption 12px
--text-label   13px   uppercase + letter-spacing: 0.08em
```

Rules:
- Bebas Neue is all-caps only — never use it on mixed-case text.
- Apply type scale via Tailwind arbitrary value: `text-[length:var(--text-display)]`.
- `--text-label` always goes with `uppercase tracking-[0.08em]`.

### Spacing

Base unit: 4px. 11 levels:
```
--space-1   4px     --space-5   24px    --space-9   96px
--space-2   8px     --space-6   32px    --space-10  128px
--space-3   12px    --space-7   48px    --space-11  192px
--space-4   16px    --space-8   64px
```

- Section vertical padding: `--space-8` mobile → `--space-9` desktop (handled by `.section-py` in globals.css).
- Container horizontal padding: `--space-5` mobile → `--space-7` desktop (handled by `.container-px`).
- Card padding: `--space-5`. Grid gap between cards: `--space-1` (4px border-gap effect).
- Never use Tailwind's spacing scale (`mt-4`, `py-6`) for layout — use inline `style` props with `var(--space-*)`.
- Never use Tailwind arbitrary value classes with CSS vars (e.g. `px-[var(--space-5)]`) — they don't work with Tailwind v4. Use `style={{ paddingInline: 'var(--space-5)' }}` instead.

### Layout Containers

```
--container-max    1280px    default Container
--container-tight   960px    Container size="tight"
--container-prose   720px    Container size="prose"  (blog, long-form)
```

### Borders & Surfaces

- Primary border: `1px solid var(--color-border)`. Active/selected: `2px`.
- No `box-shadow` anywhere — ever.
- No `border-radius` on layout elements, sections, grids, or cards.
- `border-radius` only on interactive components: buttons `4px` (`--border-radius-md`), tags `2px` (`--border-radius-sm`), inputs `4px`.
- Sections are separated by full-width `1px` horizontal rules via `<Section border="bottom">` — no margin gaps between sections.

### Motion

```
--duration-instant  80ms
--duration-fast    150ms    hover transitions
--duration-base    250ms
--duration-slow    400ms    theme switch
--duration-enter   500ms    page enter animations

--ease-out   cubic-bezier(0.0, 0.0, 0.2, 1.0)
--ease-in    cubic-bezier(0.4, 0.0, 1.0, 1.0)
--ease-inout cubic-bezier(0.4, 0.0, 0.2, 1.0)
```

Rules:
- Only animate `transform` and `opacity`. Exception: `width` on absolutely-positioned indicators only (no layout reflow).
- Never animate `height`, `top`, `left`, or any property that triggers layout.
- Page-enter animations use `.animate-hero-1` through `.animate-hero-6` CSS classes (staggered via globals.css).
- All enter animations must be wrapped in `@media (prefers-reduced-motion: no-preference)`.
- Hover: `--duration-fast` + `--ease-inout`. Page enter: `--duration-enter` + `--ease-out`.

### Section Anatomy

Every new section should follow this structure:

```tsx
<Section border="bottom">
  <Container>
    {/* Eyebrow */}
    <p className="font-display text-[length:var(--text-label)] uppercase tracking-[0.08em]"
       style={{ color: 'var(--color-muted)' }}>
      EYEBROW LABEL
    </p>

    {/* Heading — use font-display for display headings, font-body for editorial h1 */}
    <h2 className="font-display text-[length:var(--text-display)] tracking-[-0.02em]">
      SECTION HEADING
    </h2>

    {/* Subtext */}
    <p className="font-body text-[length:var(--text-body)]"
       style={{ color: 'var(--color-muted)', maxWidth: 'var(--container-prose)' }}>
      Supporting copy goes here.
    </p>

    {/* Content */}
    ...

    {/* CTA — ghost button, right-aligned or centered */}
    <Button variant="ghost">VIEW ALL ↗</Button>
  </Container>
</Section>
```

Arrow convention: always use `↗︎` (U+2197 + U+FE0E text variation selector) for navigation/CTA arrows. The variation selector prevents iOS from rendering it as an emoji. Never `→`, and never `↗` without the variation selector.

---

## Tailwind + CSS Token Rules

No `tailwind.config.ts`. All design tokens live in `globals.css` under `@theme`.

| Use Tailwind for | Use inline `style` for |
|---|---|
| Layout: `flex`, `grid`, `relative`, `absolute` | Spacing: `var(--space-*)` |
| Sizing: `w-full`, `h-px`, `aspect-video` | Color tokens: `var(--color-*)` |
| Responsive visibility: `hidden md:block` | Type scale: `var(--text-*)` |
| Position and z-index | Dynamic runtime values |
| Group/peer utilities | Transitions with token durations |

```tsx
// Correct — type scale via Tailwind arbitrary length
<h1 className="font-display text-[length:var(--text-display)] tracking-[-0.02em]">TITLE</h1>

// Correct — spacing via inline style
<section style={{ paddingBlock: 'var(--space-9)' }}>

// Correct — color via inline style
<p style={{ color: 'var(--color-muted)' }}>Subdued text</p>

// WRONG — Tailwind spacing scale
<section className="py-24">

// WRONG — arbitrary CSS var in Tailwind class (broken in v4)
<div className="px-[var(--space-5)]">
```

---

## TypeScript Interfaces

All interfaces are in `src/lib/types.ts`. Quick reference:

```ts
Project          { title, slug, category, description, tags[], featured?, liveUrl?, image? }
Service          { name, slug, hook, timeframe, startingAt, description, overview[], includes[],
                   idealFor[], faqs[], pricingOptions?, relatedTags[], relatedCategory?,
                   seeAlso?, hidden?, subServices? }
AlaCarteService  { name, slug, price, billingCycle, hook, description, includes[], idealFor[],
                   faqs[], parentSlugs[], seeAlso? }
BlogPost         { title, slug, date, excerpt, content, categories[], projectSlug? }
ServiceFAQ       { q, a }
ServicePricingOption  { label, price, detail? }
Proposal         { slug, passphrase, clientName, date, status, coverNote, items[],
                   expiresAt?, coverImage?, coverImageUrl?, previewUrl? }
ProposalLineItem { type, slug, id?, peerOf?, pricingOptionLabel?, required?, recommended?,
                   note?, customPrice?, customName?, customDescription?, group?,
                   groupOptional?, includesItem? }
ProposalLineItemResolved  — resolved at render time in proposals/[slug]/page.tsx; do not construct manually
```

---

## Next.js App Router

- `params` and `searchParams` are **Promises** — always `await` them: `const { slug } = await params`.
- Server Components by default. Add `'use client'` only when you need: `useState`, `useEffect`, `useRef`, event handlers, or browser APIs.
- Dynamic routes require `generateStaticParams()` — see `src/app/projects/[slug]/page.tsx`.
- Export `metadata` (static) or `generateMetadata` (dynamic) from every page.
- When unsure about an API, read `node_modules/next/dist/docs/` before writing code.

---

## Email & Contact Form

- API route: `src/app/api/contact/route.ts`
- Email service: Resend — `from: me@micahshu.com`, `replyTo` set to the form submitter's email
- Required env vars (set in Vercel dashboard and `.env.local`):
  - `RESEND_API_KEY` — Resend API key
  - `CONTACT_TO_EMAIL` — recipient address for contact form submissions
- Never hardcode API keys in source files.

---

## What NOT To Do

- Do not create `tailwind.config.ts` or `tailwind.config.js`
- Do not use `box-shadow` anywhere
- Do not add `border-radius` to sections, grids, cards, or layout containers
- Do not use Bebas Neue on mixed-case text
- Do not use raw hex values in component files — always reference `--color-*` tokens
- Do not use Tailwind's default spacing scale (`mt-3`, `py-5`, etc.) for layout — use inline style + `--space-*`
- Do not use Tailwind arbitrary value classes with CSS variables (`px-[var(--space-5)]`) — broken in v4
- Do not use `--color-accent` for body text or large fills — highlights only
- Do not use `--color-ink` or `--color-paper` directly in components — use `--color-fg` / `--color-bg`
- Do not use the `pages/` router — App Router only
- Do not access `params` or `searchParams` synchronously — they are Promises
- Do not animate `height`, `top`, `left`, or any layout-triggering property
- Do not animate `width` on layout elements (only on absolutely-positioned UI indicators)
- Do not add gradients, decorative blurs, or drop shadows
- Do not use `→` for arrows — use `↗︎` (U+2197 + U+FE0E)
- Do not use `↗` without the U+FE0E variation selector — iOS renders it as an emoji
- Do not use a raw `<button>` element — always use `<Button>` from `src/components/ui/Button.tsx`
- Do not introduce external state management (Zustand, Redux, etc.) — React state only
- Do not add comments that describe what the code does — only comment non-obvious constraints or workarounds
