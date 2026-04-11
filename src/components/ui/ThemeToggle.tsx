'use client'

import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const html = document.documentElement
    if (html.classList.contains('dark')) {
      setIsDark(true)
    } else if (html.classList.contains('light')) {
      setIsDark(false)
    } else {
      setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches)
    }
  }, [])

  function toggle() {
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
    <button
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
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
        flexShrink: 0,
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
  )
}
