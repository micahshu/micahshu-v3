# MazeGame Component

A tile-based puzzle game. The core mechanic: certain tiles are only passable in one theme mode, forcing the player to strategically toggle light/dark to progress.

Route: `/game`

---

## Architecture

```
index.tsx          # Root — owns playerPos, hasWon. Composes everything.
MazeGrid.tsx       # Renders the grid via CSS Grid. Stateless.
MazeTile.tsx       # Single tile. Derives all visuals from (type, isDark, isPlayer).
ModeToggle.tsx     # In-game toggle button. Identical widget to site ThemeToggle.
useTheme.ts        # Reads/writes .dark/.light on <html>. MutationObserver for sync.
useMazePlayer.ts   # Keydown handler + collision detection.
levels.ts          # Level data — plain typed 2D arrays.
types.ts           # TileType, Position, Level.
```

---

## Theme integration

`useTheme` is the single source of truth for the game's `isDark` state. It reads from `document.documentElement.classList` and uses a `MutationObserver` to stay in sync if the site's own `ThemeToggle` is clicked while the game is open. The game's in-game toggle calls the same `toggle()` function, which writes `.dark`/`.light` to `<html>` and `localStorage` — identical to the site toggle. Both toggles stay in sync automatically via the observer.

**Never read or write theme state any other way inside this component.**

---

## Tile types

```
'wall'        — always solid
'empty'       — always passable
'start'       — always passable (player spawn)
'end'         — always passable, triggers win
'switch'      — always passable, calls toggle() on entry
'dark-wall'   — solid in dark mode,  passable (invisible) in light mode
'light-wall'  — solid in light mode, passable (invisible) in dark mode
```

Mode-walls look identical to floor when they are passable in the current mode — the player only discovers them when they toggle and the wall snaps into view. This is intentional.

**Collision table lives in `isPassable()` in `useMazePlayer.ts`.** If you add a tile type, add a case there and a visual in `MazeTile.tsx`. Nothing else needs to change.

---

## Adding a level

Add an entry to the `levels` array in `levels.ts`. The `Level` interface:

```ts
interface Level {
  grid: TileType[][]   // any dimensions — nothing is hardcoded
  start: Position      // { row, col }
  end: Position
}
```

To enable level progression, add `currentLevelIndex` state to `index.tsx` and advance it on win instead of restarting. `levels[currentLevelIndex]` replaces the hardcoded `levels[0]`.

---

## Adding a tile type

1. Add the string literal to the `TileType` union in `types.ts`
2. Add a `case` to `isPassable()` in `useMazePlayer.ts` — return `true` or `false` (or conditional on `isDark`)
3. Add a background in `getTileBackground()` in `MazeTile.tsx`
4. Optionally render content (label, icon) in the `MazeTile` JSX block

---

## Stale closure pattern in `useMazePlayer`

The keydown listener is registered once via a stable `useCallback`. It reads `playerPos`, `isDark`, and `hasWon` through refs that are kept current by three single-line `useEffect`s. This avoids re-registering the listener on every state change while guaranteeing the handler always sees fresh values.

Do not add `playerPos`, `isDark`, or `hasWon` to the `handleKeyDown` dependency array — that would defeat the pattern. Update the corresponding ref sync effect instead.

---

## Tile visuals

| Tile | Background | Content |
|---|---|---|
| `wall` | `--color-fg` | — |
| `empty` / `start` | `--color-bg` | subtle `--color-border-soft` outline |
| `dark-wall` in dark | `--color-fg` | — |
| `dark-wall` in light | `--color-bg` | outline (looks like floor) |
| `light-wall` in light | `--color-fg` | — |
| `light-wall` in dark | `--color-bg` | outline (looks like floor) |
| `switch` | `--color-accent-dim` | ⇄ symbol |
| `end` | `--color-accent` | END label |
| player | inherited | 16px `--color-fg` circle |

Player dot is always `--color-fg`. It's only ever on passable tiles (floor, switch, end), so there is always contrast.

`TILE_SIZE` is exported from `MazeTile.tsx`. Change it there — no other file hardcodes it.

---

## What NOT to do

- Do not read or write `.dark`/`.light` directly anywhere except `useTheme.ts`
- Do not use `dark:` Tailwind variants — theme is CSS-variable-based, not class-variant-based
- Do not hardcode grid dimensions in `MazeGrid.tsx` or `useMazePlayer.ts`
- Do not add `playerPos` / `isDark` / `hasWon` to the `handleKeyDown` `useCallback` deps — use refs
- Do not call `toggle()` from anywhere except `useTheme.ts` and tile step logic in `useMazePlayer.ts`
- Do not reset theme state on level restart — leave `isDark` as-is
