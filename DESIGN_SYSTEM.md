# Design System Spec — micahshu.com Rebuild

## Design Philosophy

Editorial typographic minimalism. The aesthetic target is a high-end agency or magazine site
(Pentagram, A24, Are.na) — not a developer template. Everything is intentional: whitespace is
structural, type does the heavy lifting, and the grid breaks on purpose.

Black and white is the foundation. One warm accent color keeps it from reading as sterile.
Motion is subtle but present — it signals craft without showing off.

---

## 1. Color Tokens

All colors defined as CSS custom properties. Tailwind v4 maps these via `@theme`.

```css
@theme {
  /* Base */
  --color-ink:        #0A0A0A;   /* near-black — richer than pure #000 */
  --color-paper:      #F2F2F0;   /* neutral off-white — base background */
  --color-paper-pure: #FFFFFF;   /* pure white — cards, inputs */

  /* Accent — a single desaturated warm amber */
  --color-accent:     #C8A96E;   /* used sparingly: highlights, hover underlines, tags */
  --color-accent-dim: #E8D9BC;   /* tinted backgrounds, selected states */

  /* Neutral scale */
  --color-muted:      #6B6B6B;   /* secondary text, captions, metadata */
  --color-subtle:     #D0D0CE;   /* dividers, inactive borders */
  --color-surface:    #E8E8E6;   /* card backgrounds, code blocks, section fills */

  /* Semantic */
  --color-border:     var(--color-ink);      /* primary borders */
  --color-border-soft: var(--color-subtle);  /* secondary / inner borders */
  --color-fg:         var(--color-ink);
  --color-bg:         var(--color-paper);
}
```

**Usage rules:**
- `ink` on `paper` is the default reading state
- `paper-pure` is reserved for elements that need to pop off the `paper` background
- `accent` appears max 2–3 times per page — link hovers, active nav item, a single decorative element
- Never use `accent` for body text or large fills

---

## 2. Typography

Two fonts. Strict roles. No mixing within a single element.

```css
@theme {
  --font-display: 'Bebas Neue', sans-serif;   /* display, section labels, callouts */
  --font-body:    'Funnel Sans', sans-serif;  /* everything else */
}
```

### Type Scale

Base: `16px`. Scale ratio: `1.333` (perfect fourth) with manual adjustments at the extremes.

| Token          | Size      | Line Height | Weight | Font     | Usage                            |
|----------------|-----------|-------------|--------|----------|----------------------------------|
| `--text-hero`  | `clamp(72px, 10vw, 144px)` | 0.9  | 400 | display  | Homepage hero, single statement  |
| `--text-display` | `clamp(48px, 6vw, 96px)` | 0.95 | 400 | display  | Section heroes, page titles      |
| `--text-h1`    | `48px`    | 1.1         | 700    | body     | Page-level headings              |
| `--text-h2`    | `32px`    | 1.2         | 700    | body     | Section headings                 |
| `--text-h3`    | `22px`    | 1.3         | 600    | body     | Card titles, sub-sections        |
| `--text-h4`    | `18px`    | 1.4         | 600    | body     | Labels, grouped headings, desktop nav links |
| `--text-body`  | `16px`    | 1.65        | 400    | body     | All paragraph text               |
| `--text-small` | `14px`    | 1.5         | 400    | body     | Metadata, dates, secondary info  |
| `--text-caption` | `12px`  | 1.4         | 300    | body     | Tags, footnotes, image captions  |
| `--text-label` | `13px`    | 1.0         | 400    | display  | Section eyebrows                 |

**Typographic rules:**
- `display` font (Bebas Neue) is **uppercase only** — never mixed case
- `--text-hero` and `--text-display` use `letter-spacing: -0.02em`
- `--text-h1` through `--text-h3` use `letter-spacing: -0.01em`
- Body text uses `letter-spacing: 0` — no tracking adjustments
- `--text-label` always uppercase, `letter-spacing: 0.08em` — used for eyebrow labels above sections

---

## 3. Spacing Scale

Base unit: **4px**. All spacing is a multiple of this unit. Defined as a named scale — never
use raw pixel values outside this system.

```css
@theme {
  --space-1:  4px;    /* micro — icon gaps, tight inline spacing */
  --space-2:  8px;    /* xs — badge padding, condensed elements */
  --space-3:  12px;   /* sm — input padding, tag gaps */
  --space-4:  16px;   /* base — default gap, button padding */
  --space-5:  24px;   /* md — card padding, form group spacing */
  --space-6:  32px;   /* lg — component separation */
  --space-7:  48px;   /* xl — section internal padding */
  --space-8:  64px;   /* 2xl — section top/bottom padding (mobile) */
  --space-9:  96px;   /* 3xl — section top/bottom padding (desktop) */
  --space-10: 128px;  /* 4xl — hero vertical rhythm, large separators */
  --space-11: 192px;  /* 5xl — maximum top-of-page breathing room */
}
```

**Layout spacing rules:**
- Section vertical padding: `--space-8` mobile, `--space-9` desktop
- Container horizontal padding: `--space-5` mobile, `--space-7` desktop
- Card internal padding: `--space-5` all sides
- Grid gap (cards): `--space-1` — tight grid with borders, NOT gapped cards
- Stack gap (text blocks): `--space-4` between paragraphs, `--space-6` between heading and body

---

## 4. Layout & Grid

```css
@theme {
  --container-max:   1280px;
  --container-prose: 720px;   /* blog posts, about page */
  --container-tight: 960px;   /* services, contact */
}
```

### Grid System

Not a rigid N-column grid. Layouts use one of three patterns:

**Full bleed** — section spans 100vw, content inside `--container-max`
Used for: hero, section headers with background fills, horizontal rule dividers

**Editorial grid** — asymmetric 2-column: `1fr 2fr` or `2fr 3fr`
Used for: about page (label + content), services list, blog post meta + body

**Card grid** — CSS grid with auto-fill
```css
grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
```
Used for: projects, blog archive

**Breaking the grid (intentional):**
- Homepage hero: a single element bleeds past the container by `--space-7`
- Featured project: one card spans 2 columns at desktop
- Section labels: absolutely positioned or outdented into the margin

---

## 5. Borders & Surfaces

The border system creates structure without color. Two weights, two contexts.

```css
@theme {
  --border-width:      1px;
  --border-width-bold: 2px;
  --border-radius-sm:  2px;   /* tags, badges — barely rounded */
  --border-radius-md:  4px;   /* inputs, cards — subtle */
  --border-radius-lg:  8px;   /* modals, popovers — if needed */
  --border-radius-full: 9999px; /* pills */
}
```

**Border rules:**
- Primary borders (section dividers, card outlines): `1px solid var(--color-border)`
- Secondary borders (inner dividers, input fields): `1px solid var(--color-border-soft)`
- Bold borders (active states, featured items): `2px solid var(--color-border)`
- No border-radius on layout elements — only on interactive components
- Cards use `border` not `box-shadow` — shadows are not part of this system

---

## 6. Motion

Subtle. Purposeful. Nothing bounces or springs. The tone is calm and confident.

```css
@theme {
  --duration-instant:  80ms;
  --duration-fast:     150ms;
  --duration-base:     250ms;
  --duration-slow:     400ms;
  --duration-enter:    500ms;

  --ease-out:    cubic-bezier(0.0, 0.0, 0.2, 1.0);  /* elements arriving */
  --ease-in:     cubic-bezier(0.4, 0.0, 1.0, 1.0);  /* elements leaving */
  --ease-inout:  cubic-bezier(0.4, 0.0, 0.2, 1.0);  /* state changes */
  --ease-linear: linear;                              /* progress, underlines */
}
```

**Motion rules:**
- Hover color/background transitions: `--duration-fast` + `--ease-inout`
- Page enter animations: `--duration-enter` + `--ease-out`, `opacity` + `translateY(8px)`
- Sliding UI indicators (e.g. nav): `transform: translateX()` + `width`, `--duration-base` + `--ease-inout`. Animating `width` is acceptable on `position: absolute` elements that cause no layout reflow.
- Never animate `height`, `top`, `left`, or any property that triggers layout reflow — only `transform` and `opacity` on layout elements
- Respect `prefers-reduced-motion` — wrap all enter animations in a media query check

---

## 7. Component Defaults

### Button

Two variants only: **solid** and **ghost**.

```
Solid:   bg-fg, text-bg, border-fg            → hover: bg-bg, border-fg, text-fg  (neutral inversion)
Ghost:   bg-transparent, text-fg, border-fg   → hover: bg-fg, text-bg             (full inversion)

Note: solid hover and ghost default are the same visual state — they swap on interaction.

Sizes:
  sm:  px-12px  py-8px   text-small
  md:  px-20px  py-14px  text-body     ← default
  lg:  px-28px  py-16px  text-h4

Border-radius: --border-radius-md
No uppercase, no letter-spacing on button labels
Transition: --duration-fast --ease-inout on background-color, color, border-color
```

### Tag / Badge

```
bg-surface, text-ink, border-border-soft
px-space-2  py-space-1  text-caption uppercase letter-spacing-wide
border-radius: --border-radius-sm

Active/selected: bg-ink, text-paper, border-ink
Accent variant:  bg-accent-dim, text-ink, border-accent
```

### Card

```
bg-paper-pure, border-ink 1px
padding: --space-5
border-radius: none on outer corners (sharp edges)
hover: border-width → 2px (bold border)
Transition: --duration-fast on border-width
```

### Input / Textarea

```
bg-paper-pure, border-border-soft 1px, text-body
padding: --space-3 --space-4
border-radius: --border-radius-md
focus: border-ink, outline: none (border handles focus state)
placeholder: color-muted
Transition: --duration-fast on border-color
```

### Nav Link

**Desktop:**
```
font-display, --text-h4, uppercase, letter-spacing: 0.08em
Resting: color-fg, no decoration
Active/hover: sliding bg-fg indicator behind the text; text inverts to color-bg
Indicator animation: transform: translateX() + width, --duration-base --ease-inout
No accent color in desktop nav — inversion only
```

**Mobile:**
```
font-display, --text-h3, uppercase, letter-spacing: 0.05em
Full-width block, padding: --space-5 top/bottom
Active: color-accent
Resting: color-fg
```

---

## 8. Breakpoints

```css
@theme {
  --breakpoint-sm:  480px;   /* large phones */
  --breakpoint-md:  768px;   /* tablets */
  --breakpoint-lg:  1024px;  /* small desktop / landscape tablet */
  --breakpoint-xl:  1280px;  /* standard desktop */
  --breakpoint-2xl: 1536px;  /* large desktop */
}
```

**Mobile-first.** Write base styles for mobile, layer up.

Key layout shifts:
- `md`: header nav becomes horizontal; hero text scale increases
- `lg`: 2-column editorial layouts activate; card grid goes to 2+ columns
- `xl`: container hits max-width and centers; hero text reaches full clamp size

---

## 9. Section Anatomy

Every section follows this structure — consistent regardless of content:

```
[section eyebrow label]   — --text-label, color-muted, uppercase, tracked
[section heading]         — --text-display (Bebas Neue) or --text-h1 (Funnel Sans)
[optional subtext]        — --text-body, color-muted, max-width: --container-prose
[content area]
[optional section CTA]    — ghost button, right-aligned or centered
```

Top/bottom padding: `--space-9` desktop, `--space-8` mobile
Sections separated by `1px solid var(--color-border)` full-width horizontal rule — no margin gaps between sections

---

## 10. Tailwind v4 Implementation Notes

Map all tokens via `@theme` in `globals.css`. Extend with:

```css
@import "tailwindcss";

@theme {
  /* paste all tokens above */

  /* Tailwind utility mappings */
  --font-display: 'Bebas Neue', sans-serif;
  --font-body:    'Funnel Sans', sans-serif;
}
```

Load fonts via `next/font/google`:
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
```

Use CSS variables directly in Tailwind classes:
```html
<h1 class="font-display text-[var(--text-display)]">Section Title</h1>
<p class="font-body text-[var(--text-body)] text-[var(--color-muted)]">...</p>
```
