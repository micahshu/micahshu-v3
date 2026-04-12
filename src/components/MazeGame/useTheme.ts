'use client'

import { useCallback, useEffect, useState } from 'react'

function readThemeFromDOM(): boolean {
  const html = document.documentElement
  if (html.classList.contains('dark')) return true
  if (html.classList.contains('light')) return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function useTheme() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setIsDark(readThemeFromDOM())

    const observer = new MutationObserver(() => setIsDark(readThemeFromDOM()))
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [])

  const toggle = useCallback(() => {
    const html = document.documentElement
    // Read live from DOM to avoid stale closure
    const next = !readThemeFromDOM()

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
  }, [])

  const setMode = useCallback((dark: boolean) => {
    if (readThemeFromDOM() === dark) return
    const html = document.documentElement
    html.classList.add('theme-switching')
    requestAnimationFrame(() => {
      if (dark) {
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
  }, [])

  return { isDark, toggle, setMode }
}
