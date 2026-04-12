'use client'

import { useCallback, useEffect, useRef } from 'react'
import { Level, Position, TileType } from './types'

interface UseMazePlayerArgs {
  level: Level
  playerPos: Position
  setPlayerPos: (pos: Position) => void
  isDark: boolean
  toggle: () => void
  hasWon: boolean
  setHasWon: (won: boolean) => void
}

function isPassable(tile: TileType, isDark: boolean): boolean {
  switch (tile) {
    case 'wall':       return false
    case 'dark-wall':  return !isDark   // passable only in light mode
    case 'light-wall': return isDark    // passable only in dark mode
    case 'empty':
    case 'start':
    case 'end':
    case 'switch':     return true
    default:           return false
  }
}

const DIRS: Record<string, { dr: number; dc: number }> = {
  ArrowUp:    { dr: -1, dc:  0 },
  ArrowDown:  { dr:  1, dc:  0 },
  ArrowLeft:  { dr:  0, dc: -1 },
  ArrowRight: { dr:  0, dc:  1 },
}

export function useMazePlayer({
  level,
  playerPos,
  setPlayerPos,
  isDark,
  toggle,
  hasWon,
  setHasWon,
}: UseMazePlayerArgs) {
  // Keep refs so the stable keydown handler always reads fresh values
  const posRef    = useRef(playerPos)
  const darkRef   = useRef(isDark)
  const wonRef    = useRef(hasWon)

  useEffect(() => { posRef.current  = playerPos }, [playerPos])
  useEffect(() => { darkRef.current = isDark     }, [isDark])
  useEffect(() => { wonRef.current  = hasWon     }, [hasWon])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (wonRef.current) return
    const dir = DIRS[e.key]
    if (!dir) return
    e.preventDefault()

    const { row, col } = posRef.current
    const nextRow = row + dir.dr
    const nextCol = col + dir.dc
    const grid = level.grid

    if (nextRow < 0 || nextRow >= grid.length) return
    if (nextCol < 0 || nextCol >= grid[0].length) return

    const tile = grid[nextRow][nextCol]
    if (!isPassable(tile, darkRef.current)) return

    if (tile === 'switch') toggle()
    if (tile === 'end')    setHasWon(true)

    setPlayerPos({ row: nextRow, col: nextCol })
  }, [level, toggle, setPlayerPos, setHasWon])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])
}
