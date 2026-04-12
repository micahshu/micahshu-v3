import { Level } from './types'

// Level 1 — Tutorial
//
// Path (starting in light mode):
//   [1,0] → right → [1,3]
//   ↓ through [2,3] dark-wall (passable in light mode)
//   ↓ to [4,3]
//   → step on [4,4] switch  (toggles to dark mode)
//   → right to [4,7]
//   ↓ through [5,7] light-wall (passable in dark mode)
//   ↓ to [8,7] end
//
// After the switch [2,3] becomes a wall again, locking the player forward.

// Level 2 — Double Back
//
// Path (starting in light mode):
//   [1,0] → east along row 1 → [1,7]
//   ↓ south along col 7 → [3,7]
//   [4,7] light-wall is SOLID in light — player is blocked (visible obstacle)
//   backtrack: north → [1,7] → west → [1,3] → south [2,3]→[3,3]→[4,3] switch → DARK
//   light-wall [4,7] is now passable
//   [4,3] → east [4,4]→[4,5]→[4,6]→[4,7] → south [5,7]→[8,7] end

// Level 3 — Two Switches
//
// Path (starting in light mode):
//   [1,0] → east → [1,3] switch → DARK
//   [2,3] light-wall now passable → south [2,3]→[4,3]
//   east [4,3]→[4,6] switch → LIGHT
//   [5,6] dark-wall now passable (invisible) but path goes east:
//   [4,7] → south [5,7]→[8,7] end

export const levels: Level[] = [
  {
    grid: [
      ['wall',  'wall',  'wall',      'wall',      'wall',      'wall',      'wall',       'wall',       'wall'],
      ['start', 'empty', 'empty',     'empty',     'wall',      'wall',      'wall',       'wall',       'wall'],
      ['wall',  'wall',  'wall',      'dark-wall', 'wall',      'wall',      'wall',       'wall',       'wall'],
      ['wall',  'wall',  'wall',      'empty',     'wall',      'wall',      'wall',       'wall',       'wall'],
      ['wall',  'wall',  'wall',      'empty',     'switch',    'empty',     'empty',      'empty',      'wall'],
      ['wall',  'wall',  'wall',      'wall',      'wall',      'wall',      'wall',       'light-wall', 'wall'],
      ['wall',  'wall',  'wall',      'wall',      'wall',      'wall',      'wall',       'empty',      'wall'],
      ['wall',  'wall',  'wall',      'wall',      'wall',      'wall',      'wall',       'empty',      'wall'],
      ['wall',  'wall',  'wall',      'wall',      'wall',      'wall',      'wall',       'end',        'wall'],
    ],
    start: { row: 1, col: 0 },
    end:   { row: 8, col: 7 },
  },
  {
    grid: [
      ['wall',  'wall',  'wall',  'wall',  'wall',  'wall',  'wall',       'wall',  'wall'],
      ['start', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty',      'empty', 'wall'],
      ['wall',  'wall',  'wall',  'empty', 'wall',  'wall',  'wall',       'empty', 'wall'],
      ['wall',  'wall',  'wall',  'empty', 'wall',  'wall',  'wall',       'empty', 'wall'],
      ['wall',  'wall',  'wall',  'switch','empty', 'empty', 'empty',      'light-wall', 'wall'],
      ['wall',  'wall',  'wall',  'wall',  'wall',  'wall',  'wall',       'empty', 'wall'],
      ['wall',  'wall',  'wall',  'wall',  'wall',  'wall',  'wall',       'empty', 'wall'],
      ['wall',  'wall',  'wall',  'wall',  'wall',  'wall',  'wall',       'empty', 'wall'],
      ['wall',  'wall',  'wall',  'wall',  'wall',  'wall',  'wall',       'end',   'wall'],
    ],
    start: { row: 1, col: 0 },
    end:   { row: 8, col: 7 },
  },
  {
    grid: [
      ['wall',  'wall',  'wall',  'wall',      'wall',  'wall',      'wall',      'wall',  'wall'],
      ['start', 'empty', 'empty', 'switch',    'wall',  'wall',      'wall',      'wall',  'wall'],
      ['wall',  'wall',  'wall',  'light-wall','wall',  'wall',      'wall',      'wall',  'wall'],
      ['wall',  'wall',  'wall',  'empty',     'wall',  'wall',      'wall',      'wall',  'wall'],
      ['wall',  'wall',  'wall',  'empty',     'empty', 'empty',     'switch',    'empty', 'wall'],
      ['wall',  'wall',  'wall',  'wall',      'wall',  'wall',      'dark-wall', 'empty', 'wall'],
      ['wall',  'wall',  'wall',  'wall',      'wall',  'wall',      'wall',      'empty', 'wall'],
      ['wall',  'wall',  'wall',  'wall',      'wall',  'wall',      'wall',      'empty', 'wall'],
      ['wall',  'wall',  'wall',  'wall',      'wall',  'wall',      'wall',      'end',   'wall'],
    ],
    start: { row: 1, col: 0 },
    end:   { row: 8, col: 7 },
  },
]
