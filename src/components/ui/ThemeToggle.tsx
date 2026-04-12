'use client'

import { useEffect, useRef, useState } from 'react'

interface ThemeToggleProps {
  disabled?: boolean
}

export default function ThemeToggle({ disabled = false }: ThemeToggleProps) {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [taunt, setTaunt] = useState<string | null>(null)
  const tauntIndex = useRef(0)
  const tauntTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const TAUNTS = [
    'nice try',
    'no shortcuts',
    'cheater',
    'kinda defeats the purpose, huh?',
    'really?',
    'nuh uh',
  ]

  useEffect(() => {
    setMounted(true)
    const html = document.documentElement

    function readTheme() {
      if (html.classList.contains('dark'))  return true
      if (html.classList.contains('light')) return false
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }

    setIsDark(readTheme())

    // Stay in sync when another component (e.g. MazeGame) changes the theme
    const observer = new MutationObserver(() => setIsDark(readTheme()))
    observer.observe(html, { attributes: true, attributeFilter: ['class'] })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    return () => { if (tauntTimer.current) clearTimeout(tauntTimer.current) }
  }, [])

  function handleClick() {
    if (disabled) {
      const message = TAUNTS[tauntIndex.current % TAUNTS.length]
      tauntIndex.current += 1
      setTaunt(message)
      if (tauntTimer.current) clearTimeout(tauntTimer.current)
      tauntTimer.current = setTimeout(() => setTaunt(null), 1800)
      return
    }

    const next = !isDark
    setIsDark(next)
    const html = document.documentElement
    html.classList.add('theme-switching')
    requestAnimationFrame(() => {
      if (next) {
        html.classList.add('dark')
        html.classList.remove('light')
        localStorage.setItem('theme', 'dark')
      } else {
        html.classList.add('light')
        html.classList.remove('dark')
        localStorage.setItem('theme', 'light')
      }
      setTimeout(() => html.classList.remove('theme-switching'), 400)
    })
  }

  // Reserve space during SSR to avoid layout shift
  if (!mounted) {
    return (
      <span
        aria-hidden
        style={{ display: 'inline-block', width: 40, height: 22, flexShrink: 0 }}
      />
    )
  }

  return (
    <div style={{ position: 'relative', flexShrink: 0 }}>
      <button
        onClick={handleClick}
        aria-label={disabled ? 'Theme toggle disabled during maze' : isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        aria-pressed={!disabled ? isDark : undefined}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          width: 40,
          height: 22,
          padding: 3,
          background: 'var(--color-bg)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--border-radius-md)',
          cursor: 'pointer',
          // Reset button defaults
          appearance: 'none',
          WebkitAppearance: 'none',
          outline: 'none',
        }}
      >
        <span
          style={{
            display: 'block',
            width: 16,
            height: 16,
            background: 'var(--color-fg)',
            borderRadius: 'var(--border-radius-sm)',
            // 40px track - 3px*2 padding - 16px slider = 18px travel
            transform: isDark ? 'translateX(18px)' : 'translateX(0)',
            transition: `transform 400ms var(--ease-inout)`,
            willChange: 'transform',
          }}
        />
      </button>

      {taunt && (
        <span
          className="font-body"
          style={{
            position:    'absolute',
            top:         '100%',
            right:       0,
            marginTop:   'var(--space-2)',
            whiteSpace:  'nowrap',
            fontSize:    'var(--text-small)',
            color:       'var(--color-fg)',
            background:  'var(--color-bg)',
            border:      '1px solid var(--color-border)',
            padding:     '2px var(--space-3)',
            borderRadius:'var(--border-radius-md)',
            pointerEvents: 'none',
          }}
        >
          {taunt}
        </span>
      )}
    </div>
  )
}
