'use client'

import { Level, Position } from './types'
import { MazeTile, TILE_SIZE } from './MazeTile'

interface MazeGridProps {
  level: Level
  playerPos: Position
  isDark: boolean
}

export function MazeGrid({ level, playerPos, isDark }: MazeGridProps) {
  const cols = level.grid[0].length

  return (
    <div
      style={{
        display:             'grid',
        gridTemplateColumns: `repeat(${cols}, ${TILE_SIZE}px)`,
        border:              '1px solid var(--color-border)',
      }}
    >
      {level.grid.map((row, r) =>
        row.map((tile, c) => (
          <MazeTile
            key={`${r}-${c}`}
            type={tile}
            isDark={isDark}
            isPlayer={playerPos.row === r && playerPos.col === c}
          />
        ))
      )}
    </div>
  )
}
