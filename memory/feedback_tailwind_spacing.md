---
name: Tailwind arbitrary CSS-var classes don't work
description: Tailwind arbitrary value classes referencing CSS variables (e.g. px-[var(--space-5)]) do not compile in this project — use inline style props only for spacing tokens
type: feedback
---

Tailwind arbitrary value classes like `px-[var(--space-5)]`, `gap-[var(--space-7)]`, or `min-[900px]:pt-[var(--space-7)]` do not apply in this project.

**Why:** The project uses Tailwind v4 via `@tailwindcss/postcss` with no `tailwind.config.ts`. CSS variable arbitrary values in Tailwind utilities are not compiled/supported in this setup.

**How to apply:** Always use inline `style` props for any spacing token values (`var(--space-*)`). Only use Tailwind classes for structural layout (flex, grid, responsive visibility, etc.) — never for spacing values that reference CSS custom properties.
