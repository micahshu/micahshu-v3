# Light/Dark Maze Game
**Implementation Outline — Next.js Component**
*For agent handoff*

---

## 1. Overview

A puzzle maze game built as a Next.js component. The core mechanic is switching between light and dark mode to reveal or hide different parts of the maze. The game integrates with the site's existing theme system by reading and writing the `dark` class on the `<html>` element directly.

The player navigates a tile-based grid using arrow keys. Certain tiles are only passable in one mode, forcing the player to strategically toggle the theme to progress through the level.

---

## 2. Key Constraints & Decisions

- Next.js (App or Pages Router — confirm before building)
- Tailwind CSS with class-based dark mode (`darkMode: 'class'` in `tailwind.config`)
- No additional libraries — no `next-themes`, no Framer Motion
- Theme state = presence of `dark` class on `document.documentElement`
- The game toggle and the site's existing toggle share the same source of truth
- Controls: arrow keys only
- Rendering: CSS Grid / DOM tiles (not canvas)

---

## 3. File Structure

All files live under `components/MazeGame/`:

```
components/MazeGame/
  index.tsx            # Root component — owns playerPos, level, win state
  MazeGrid.tsx         # Renders the full tile grid
  MazeTile.tsx         # Single tile — receives type + isDark, handles visuals
  ModeToggle.tsx       # In-game toggle button (calls useTheme)
  useTheme.ts          # Hook: reads/writes dark class on <html>
  useMazePlayer.ts     # Hook: movement logic + collision detection
  levels.ts            # Level definitions as typed 2D arrays
  types.ts             # TileType, Position, Level interfaces
```

---

## 4. Core Types (`types.ts`)

```ts
type TileType =
  | 'empty'       // always passable
  | 'wall'        // always solid
  | 'dark-wall'   // solid only in dark mode
  | 'light-wall'  // solid only in light mode
  | 'gate'        // blocked in one mode, open in the other
  | 'switch'      // stepping on it toggles theme
  | 'start'
  | 'end'

type Position = { row: number; col: number }

interface Level {
  grid: TileType[][]
  start: Position
  end: Position
  gateModes?: Record<string, 'light' | 'dark'> // optional per-gate config
}
```

---

## 5. `useTheme` Hook (`useTheme.ts`)

Encapsulates all DOM reads/writes for theme. This is the single source of truth — nothing else should touch the `dark` class directly.

**Responsibilities:**
- Read initial state from `document.documentElement.classList`
- Expose `isDark: boolean`
- Expose `toggle()` — adds/removes `dark` class on `<html>`
- Listen for external class changes (e.g. user clicking the site toggle) via `MutationObserver`, so `isDark` stays in sync

The `MutationObserver` on the `<html>` classList is important — without it, if the user clicks the site's own toggle while playing, the game's `isDark` state would go stale.

---

## 6. `useMazePlayer` Hook (`useMazePlayer.ts`)

**Responsibilities:**
- Attach `keydown` listener for arrow keys
- On each keypress, calculate the intended next position
- Run collision detection given the current level grid and `isDark`
- If passable, update `playerPos`
- If tile is a `switch`, call `toggle()`
- If tile is `end`, set win state

**Collision logic per tile type:**

| Tile | Passable when |
|---|---|
| `empty` / `start` / `end` | Always |
| `wall` | Never |
| `dark-wall` | `isDark === false` |
| `light-wall` | `isDark === true` |
| `switch` | Always — also triggers `toggle()` |
| `gate` | Determined by `gateModes` config |

---

## 7. Components

### `index.tsx`
- Owns: `playerPos`, `currentLevel`, `hasWon`
- Composes: `MazeGrid`, `ModeToggle`
- Passes `isDark` and `toggle` down from `useTheme`
- Passes `playerPos` and level grid down to `MazeGrid`

### `MazeGrid.tsx`
- Renders the grid using CSS Grid
- Maps over `level.grid` rows and columns
- Renders a `MazeTile` for each cell
- Passes `isPlayer` boolean based on `playerPos` match

### `MazeTile.tsx`
- Receives: `type`, `isDark`, `isPlayer`
- Determines visual state — visible, hidden, or open — based on `type` + `isDark`
- Invisible tiles (e.g. `dark-wall` in light mode) should still occupy grid space but appear transparent/passable visually
- Player renders as a distinct marker on top of whatever tile they occupy

### `ModeToggle.tsx`
- Simple button calling `toggle()` from `useTheme`
- Reflects current `isDark` state in its label or icon
- Visually matches site's existing toggle style — confirm class names

---

## 8. Level Format (`levels.ts`)

Levels are exported as an array of `Level` objects. The grid is a 2D array of `TileType` strings:

```ts
export const levels: Level[] = [
  {
    grid: [
      ['wall',  'wall',       'wall',  'wall',  'wall'],
      ['start', 'empty',      'dark-wall', 'empty', 'wall'],
      ['wall',  'light-wall', 'wall',  'empty', 'wall'],
      ['wall',  'empty',      'switch','empty', 'end'],
      ['wall',  'wall',       'wall',  'wall',  'wall'],
    ],
    start: { row: 1, col: 0 },
    end:   { row: 3, col: 4 },
  }
]
```

Grid dimensions are flexible — collision and rendering logic should not hardcode any size. Level 1 should be small and teach the mechanic clearly: one `dark-wall` the player must pass in light mode, one `light-wall` they must pass in dark mode, and at least one `switch` tile.

---

## 9. Styling Notes

- All styles should use Tailwind utility classes
- The component must respect the site's existing `dark:` variants — do not introduce inline styles or separate CSS files unless necessary
- Tile visual states:
  - `wall` — solid fill (black in light, white in dark)
  - `dark-wall` — solid in dark mode; transparent (no border, no fill) in light mode
  - `light-wall` — solid in light mode; transparent in dark mode
  - `switch` — distinct colour or pattern to signal interactivity
  - `start` / `end` — clearly marked
  - `player` — high contrast dot or icon centred on tile
- Grid lines should be subtle — the walls themselves define structure
- The toggle button should sit outside the grid, clearly labelled

---

## 10. Win State

- When `playerPos` matches `level.end`, set `hasWon = true`
- Render a win message overlay on top of the maze
- Provide a restart button that resets `playerPos` to `start` and `hasWon` to `false`
- Do not reset the theme on restart — leave `isDark` as-is

---

## 11. Open Questions for Builder

- **App Router or Pages Router?** — affects whether `'use client'` is needed at the top of each file
- Confirm the exact class name the site uses for dark mode (assumed: `dark` on `<html>`)
- Confirm Tailwind config has `darkMode: 'class'`
- Should the game trap keyboard events to prevent page scroll on arrow keys? Assumed yes — use `e.preventDefault()` in the keydown handler
- Mobile / touch support out of scope for now — confirm
