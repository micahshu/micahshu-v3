'use client'

import { useEffect, useState } from 'react'
import Button from '@/components/ui/Button'
import { MazeGrid } from './MazeGrid'
import { useTheme } from './useTheme'
import { useMazePlayer } from './useMazePlayer'
import { levels } from './levels'
import type { Position } from './types'

export default function MazeGame() {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0)
  const level = levels[currentLevelIndex]

  const [playerPos, setPlayerPos]         = useState<Position>(level.start)
  const [hasWon, setHasWon]               = useState(false)
  const [ready, setReady]                 = useState(false)
  const [completedLevels, setCompletedLevels] = useState<Set<number>>(new Set())
  const [hoveredLevel, setHoveredLevel]   = useState<number | null>(null)
  const { isDark, toggle, setMode } = useTheme()

  // On mount: check if we're already in light mode — if so, start immediately
  useEffect(() => {
    const html = document.documentElement
    const currentlyDark =
      html.classList.contains('dark') ||
      (!html.classList.contains('light') && window.matchMedia('(prefers-color-scheme: dark)').matches)
    if (!currentlyDark) setReady(true)
  }, [])

  // Reset to light mode on each level advance (once the game is running)
  useEffect(() => {
    if (ready) setMode(false)
  }, [currentLevelIndex])

  // Block player movement until confirmed
  useMazePlayer({
    level,
    playerPos,
    setPlayerPos,
    isDark,
    toggle,
    hasWon: hasWon || !ready,
    setHasWon,
  })

  function confirmStart() {
    setMode(false)
    setReady(true)
  }

  function restart() {
    setMode(false)
    setPlayerPos(level.start)
    setHasWon(false)
  }

  function nextLevel() {
    setCompletedLevels(prev => new Set(prev).add(currentLevelIndex))
    const next = currentLevelIndex + 1
    setCurrentLevelIndex(next)
    setPlayerPos(levels[next].start)
    setHasWon(false)
  }

  function goToLevel(index: number) {
    setCurrentLevelIndex(index)
    setPlayerPos(levels[index].start)
    setHasWon(false)
  }

  function restartFromStart() {
    setCurrentLevelIndex(0)
    setPlayerPos(levels[0].start)
    setHasWon(false)
  }

  const isLastLevel = currentLevelIndex === levels.length - 1

  // Warning screen — shown when the player arrives in dark mode
  if (!ready) {
    return (
      <div
        style={{
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          textAlign:      'center',
          gap:            'var(--space-5)',
          maxWidth:       320,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
          <p
            className="font-display uppercase"
            style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em', color: 'var(--color-muted)' }}
          >
            Heads up
          </p>
          <h1
            className="font-display"
            style={{ fontSize: 'var(--text-h1)', letterSpacing: '-0.01em', color: 'var(--color-fg)', lineHeight: 1.1 }}
          >
            LIGHT/DARK MAZE
          </h1>
        </div>
        <p
          className="font-body"
          style={{ fontSize: 'var(--text-body)', color: 'var(--color-muted)', lineHeight: 1.5 }}
        >
          This game requires light mode to start. Your theme will be switched — you can change it back when you&apos;re done.
        </p>
        <Button variant="solid" size="md" onClick={confirmStart}>
          Switch &amp; play
        </Button>
      </div>
    )
  }

  return (
    <div
      style={{
        display:       'flex',
        flexDirection: 'column',
        alignItems:    'center',
        gap:           'var(--space-3)',
      }}
    >
      {/* Header */}
      <div
        style={{
          textAlign:      'center',
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          gap:            'var(--space-3)',
        }}
      >
        <h1
          className="font-display"
          style={{
            fontSize:      'var(--text-h1)',
            letterSpacing: '-0.01em',
            color:         'var(--color-fg)',
            lineHeight:    1.1,
          }}
        >
          LIGHT/DARK MAZE
        </h1>

        {/* Level indicators */}
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          {levels.map((_, i) => {
            const isComplete = completedLevels.has(i)
            const isCurrent  = i === currentLevelIndex
            const isHovered  = hoveredLevel === i
            // Completed squares invert on hover (solid → ghost)
            const bg    = isComplete && !isHovered ? 'var(--color-fg)' : 'transparent'
            const color = isComplete && !isHovered ? 'var(--color-bg)' : 'var(--color-fg)'
            return (
              <div
                key={i}
                role={isComplete ? 'button' : undefined}
                tabIndex={isComplete ? 0 : undefined}
                onClick={isComplete ? () => goToLevel(i) : undefined}
                onMouseEnter={isComplete ? () => setHoveredLevel(i) : undefined}
                onMouseLeave={isComplete ? () => setHoveredLevel(null) : undefined}
                onKeyDown={isComplete ? (e) => { if (e.key === 'Enter' || e.key === ' ') goToLevel(i) } : undefined}
                style={{
                  width:           32,
                  height:          32,
                  display:         'flex',
                  alignItems:      'center',
                  justifyContent:  'center',
                  fontFamily:      'var(--font-body)',
                  fontSize:        'var(--text-small)',
                  borderRadius:    'var(--border-radius-md)',
                  border:          `${isCurrent ? 2 : 1}px solid var(--color-border)`,
                  background:      bg,
                  color:           color,
                  cursor:          isComplete ? 'pointer' : 'default',
                  transition:      `background-color var(--duration-fast) var(--ease-inout), color var(--duration-fast) var(--ease-inout)`,
                  userSelect:      'none',
                }}
              >
                {i + 1}
              </div>
            )
          })}
        </div>
      </div>

      {/* Maze + win/level-complete overlay */}
      <div style={{ position: 'relative' }}>
        <MazeGrid level={level} playerPos={playerPos} isDark={isDark} />

        {hasWon && (
          <div
            style={{
              position:       'absolute',
              inset:          0,
              display:        'flex',
              flexDirection:  'column',
              alignItems:     'center',
              justifyContent: 'center',
              gap:            'var(--space-4)',
              background:     'var(--color-bg)',
              border:         '1px solid var(--color-border)',
            }}
          >
            {isLastLevel ? (
              <>
                <p
                  className="font-display"
                  style={{
                    fontSize:      'var(--text-display)',
                    letterSpacing: '-0.02em',
                    color:         'var(--color-accent)',
                    lineHeight:    1,
                    textAlign:     'center',
                  }}
                >
                  YOU WIN
                </p>
                <p
                  className="font-body"
                  style={{ fontSize: 'var(--text-small)', color: 'var(--color-muted)' }}
                >
                  All {levels.length} levels complete
                </p>
                <Button variant="ghost" size="sm" onClick={restartFromStart}>
                  Play again
                </Button>
              </>
            ) : (
              <>
                <p
                  className="font-display uppercase"
                  style={{
                    fontSize:      'var(--text-label)',
                    letterSpacing: '0.08em',
                    color:         'var(--color-muted)',
                  }}
                >
                  Level {currentLevelIndex + 1} complete
                </p>
                <p
                  className="font-display"
                  style={{
                    fontSize:      'var(--text-display)',
                    letterSpacing: '-0.02em',
                    color:         'var(--color-accent)',
                    lineHeight:    1,
                  }}
                >
                  NICE
                </p>
                <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                  <Button variant="ghost" size="sm" onClick={restart}>
                    Retry
                  </Button>
                  <Button variant="solid" size="sm" onClick={nextLevel}>
                    Next level
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Instructions + restart */}
      <div
        style={{
          display:        'flex',
          flexDirection:  'column',
          gap:            'var(--space-1)',
          textAlign:      'center',
        }}
      >
        <p
          className="font-body"
          style={{ fontSize: 'var(--text-small)', color: 'var(--color-muted)' }}
        >
          Arrow keys to move · step on <strong style={{ color: 'var(--color-fg)' }}>⇄</strong> to toggle mode
        </p>
        <p className="font-body" style={{ fontSize: 'var(--text-small)', color: 'var(--color-muted)' }}>
          Some walls only exist in one mode ·{' '}
          <button
            onClick={restart}
            style={{
              background:     'none',
              border:         'none',
              padding:        0,
              cursor:         'pointer',
              fontSize:       'var(--text-small)',
              color:          'var(--color-muted)',
              textDecoration: 'underline',
              fontFamily:     'var(--font-body)',
            }}
          >
            restart level
          </button>
        </p>
      </div>
    </div>
  )
}
