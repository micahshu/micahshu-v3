'use client'

import { TileType } from './types'

export const TILE_SIZE = 40

interface MazeTileProps {
  type: TileType
  isDark: boolean
  isPlayer: boolean
}

function getTileBackground(type: TileType, isDark: boolean): string {
  const isSolid =
    type === 'wall' ||
    (type === 'dark-wall'  && isDark) ||
    (type === 'light-wall' && !isDark)

  if (isSolid)       return 'var(--color-fg)'
  if (type === 'end') return 'var(--color-accent)'
  if (type === 'switch') return 'var(--color-accent-dim)'
  return 'var(--color-bg)'
}

export function MazeTile({ type, isDark, isPlayer }: MazeTileProps) {
  const bg = getTileBackground(type, isDark)

  const isSolid =
    type === 'wall' ||
    (type === 'dark-wall'  && isDark) ||
    (type === 'light-wall' && !isDark)

  // Invisible mode-wall — occupies grid space but looks like floor.
  // The player will see it snap into a wall when they toggle modes.
  const isHiddenWall =
    (type === 'dark-wall'  && !isDark) ||
    (type === 'light-wall' &&  isDark)

  return (
    <div
      style={{
        width:           TILE_SIZE,
        height:          TILE_SIZE,
        backgroundColor: bg,
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
        flexShrink:      0,
        // Subtle inner border on floor tiles to give grid texture;
        // hidden on solid walls and invisible mode-walls
        outline: (!isSolid && !isHiddenWall && type !== 'end' && type !== 'switch')
          ? '1px solid var(--color-border-soft)'
          : undefined,
        outlineOffset: '-1px',
        position: 'relative',
        transition: 'background-color var(--duration-fast) var(--ease-inout)',
      }}
    >
      {/* Switch symbol */}
      {type === 'switch' && !isPlayer && !isSolid && (
        <span
          aria-hidden
          style={{
            fontFamily: 'var(--font-display)',
            fontSize:   'var(--text-caption)',
            letterSpacing: '0.08em',
            color:      'var(--color-ink)',
            userSelect: 'none',
          }}
        >
          ⇄
        </span>
      )}

      {/* End marker */}
      {type === 'end' && !isPlayer && (
        <span
          aria-hidden
          style={{
            fontFamily:    'var(--font-display)',
            fontSize:      'var(--text-caption)',
            letterSpacing: '0.08em',
            color:         'var(--color-ink)',
            userSelect:    'none',
          }}
        >
          END
        </span>
      )}

      {/* Player dot */}
      {isPlayer && (
        <span
          aria-hidden
          style={{
            display:      'block',
            width:        16,
            height:       16,
            borderRadius: '50%',
            background:   'var(--color-fg)',
            flexShrink:   0,
            position:     'relative',
            zIndex:       1,
          }}
        />
      )}
    </div>
  )
}
