'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect, useRef, useCallback } from 'react'
import ThemeToggle from '@/components/ui/ThemeToggle'

const NAV_LINKS = [
  { href: '/',         label: 'Home' },
  { href: '/about',    label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/services', label: 'Services' },
  { href: '/blog',     label: 'Blog' },
  { href: '/resume',   label: 'Resume' },
  { href: '/contact',  label: 'Contact' },
]

const SLIDE_DURATION = 400  // ms — must match --duration-slow
const MENU_ANIM      = 150  // ms — close fade+slide (--duration-fast)

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [menuOpen, setMenuOpen]       = useState(false) // controls DOM presence
  const [menuClosing, setMenuClosing] = useState(false) // drives exit animation
  const [scrolled, setScrolled]       = useState(false)
  const menuCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const reducedMotion = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  const menuAnimDuration = reducedMotion.current ? 0 : MENU_ANIM

  // Clear timer on unmount to prevent state updates on an unmounted component
  useEffect(() => {
    return () => { if (menuCloseTimer.current) clearTimeout(menuCloseTimer.current) }
  }, [])

  const openMenu = useCallback(() => {
    if (menuCloseTimer.current) { clearTimeout(menuCloseTimer.current); menuCloseTimer.current = null }
    setMenuClosing(false)
    setMenuOpen(true)
  }, [])

  const closeMenu = useCallback(() => {
    setMenuClosing(true)
    menuCloseTimer.current = setTimeout(() => {
      setMenuOpen(false)
      setMenuClosing(false)
    }, menuAnimDuration)
  }, [menuAnimDuration])

  // Mobile sliding indicator
  const [mobileIndicator, setMobileIndicator] = useState<{ x: number; y: number; width: number; height: number } | null>(null)
  const [mobileIndicatedIdx, setMobileIndicatedIdx] = useState<number>(-1)
  const mobileItemRefs = useRef<(HTMLLIElement | null)[]>([])
  const mobileListRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) closeMenu()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Snap indicator to the active item when the menu opens.
  // Uses rAF so the DOM is painted before we measure — no entrance animation.
  useEffect(() => {
    if (!menuOpen) {
      setMobileIndicator(null)
      setMobileIndicatedIdx(-1)
      return
    }
    requestAnimationFrame(() => {
      const activeIndex = NAV_LINKS.findIndex(({ href }) =>
        href === '/' ? pathname === '/' : pathname.startsWith(href)
      )
      if (activeIndex < 0) return
      const el = mobileItemRefs.current[activeIndex]
      const list = mobileListRef.current
      if (!el || !list) return
      const elRect = el.getBoundingClientRect()
      const listRect = list.getBoundingClientRect()
      setMobileIndicatedIdx(activeIndex)
      setMobileIndicator({
        x: elRect.left - listRect.left,
        y: elRect.top - listRect.top,
        width: elRect.width,
        height: elRect.height,
      })
    })
  }, [menuOpen, pathname])

  // Re-measure on resize so the indicator doesn't drift (mirrors NavRail fix)
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      const m = measureMobileItem(mobileIndicatedIdx)
      if (m) setMobileIndicator(m)
    })
    if (mobileListRef.current) observer.observe(mobileListRef.current)
    return () => observer.disconnect()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobileIndicatedIdx])

  const measureMobileItem = (index: number) => {
    const el = mobileItemRefs.current[index]
    const list = mobileListRef.current
    if (!el || !list) return null
    const elRect = el.getBoundingClientRect()
    const listRect = list.getBoundingClientRect()
    return {
      x: elRect.left - listRect.left,
      y: elRect.top - listRect.top,
      width: elRect.width,
      height: elRect.height,
    }
  }

  const handleMobileLinkClick = (e: React.MouseEvent, href: string, index: number) => {
    // Already here — just close
    const isCurrent = href === '/' ? pathname === '/' : pathname.startsWith(href)
    if (isCurrent) {
      closeMenu()
      return
    }
    e.preventDefault()
    // Slide indicator to the tapped item, then navigate
    const m = measureMobileItem(index)
    if (m) {
      setMobileIndicatedIdx(index)
      setMobileIndicator(m)
    }
    setTimeout(() => {
      router.push(href)
    }, SLIDE_DURATION)
  }

  const cellBorderStyle = {
    borderColor: scrolled || menuOpen ? 'var(--color-border)' : 'transparent',
    transition: `border-color var(--duration-base) var(--ease-inout)`,
  }

  return (
    <>
      {/* Skip navigation */}
      <a
        href="#main-content"
        className="absolute z-[200] font-body text-[length:var(--text-small)]"
        style={{
          top: 'var(--space-3)',
          left: 'var(--space-5)',
          padding: 'var(--space-2) var(--space-4)',
          background: 'var(--color-fg)',
          color: 'var(--color-bg)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--border-radius-md)',
          textDecoration: 'none',
          transform: 'translateY(-200%)',
          transition: 'transform var(--duration-fast) var(--ease-out)',
          outline: 'none',
        }}
        onFocus={e => { e.currentTarget.style.transform = 'translateY(0)' }}
        onBlur={e => { e.currentTarget.style.transform = 'translateY(-200%)' }}
      >
        Skip to main content
      </a>

      <header
        className="sticky top-0 z-[100] w-full relative"
        style={{
          backgroundColor: scrolled || menuOpen ? 'var(--color-bg)' : 'transparent',
          borderBottom: `1px solid ${scrolled || menuOpen ? 'var(--color-border)' : 'transparent'}`,
          transition: `background-color var(--duration-base) var(--ease-inout), border-color var(--duration-base) var(--ease-inout)`,
        }}
      >
        <nav
          aria-label="Main navigation"
          className="mx-auto flex items-stretch h-16 w-full"
        >
          {/* Logo cell */}
          <div
            className="flex items-center shrink-0 md:border-r"
            style={{ paddingInline: 'var(--space-6)', ...cellBorderStyle }}
          >
            <Link
              href="/"
              aria-label="Micah Shu — Home"
              className="font-display text-[length:var(--text-h2)] text-[color:var(--color-fg)] no-underline"
              style={{ letterSpacing: '-0.01em', lineHeight: 1 }}
            >
              MS
            </Link>
          </div>

          {/* Desktop nav rail — sliding indicator */}
          <NavRail pathname={pathname} />

          {/* Mobile: push controls to the right */}
          <div className="flex-1 md:hidden" />

          {/* Right controls cell */}
          <div
            className="flex items-center shrink-0 md:border-l"
            style={{ paddingInline: 'var(--space-6)', gap: 'var(--space-4)', ...cellBorderStyle }}
          >
            <ThemeToggle disabled={pathname === '/game'} />

            {/* Hamburger — mobile only */}
            <button
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => menuOpen ? closeMenu() : openMenu()}
              className="flex md:hidden flex-col justify-center items-center shrink-0 bg-transparent border-none cursor-pointer"
              style={{ width: 32, height: 32, padding: 4, gap: 5 }}
            >
              <span
                className="block bg-[color:var(--color-fg)]"
                style={{
                  width: 22, height: 1,
                  transition: `transform var(--duration-base) var(--ease-inout), opacity var(--duration-base) var(--ease-inout)`,
                  transform: menuOpen ? 'translateY(6px) rotate(45deg)' : 'none',
                }}
              />
              <span
                className="block bg-[color:var(--color-fg)]"
                style={{
                  width: 22, height: 1,
                  transition: `opacity var(--duration-base) var(--ease-inout)`,
                  opacity: menuOpen ? 0 : 1,
                }}
              />
              <span
                className="block bg-[color:var(--color-fg)]"
                style={{
                  width: 22, height: 1,
                  transition: `transform var(--duration-base) var(--ease-inout)`,
                  transform: menuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none',
                }}
              />
            </button>
          </div>
        </nav>

        {/* Mobile menu — absolutely positioned so it overlays content without pushing it down */}
        {menuOpen && (
        <div
          id="mobile-menu"
          aria-hidden={menuClosing}
          className="md:hidden absolute left-0 right-0 border-t border-b border-[color:var(--color-border)]"
          style={{
            top: '100%',
            background: 'var(--color-bg)',
            zIndex: 99,
            opacity: menuClosing ? 0 : 1,
            transform: menuClosing ? 'translateY(-6px)' : 'translateY(0)',
            transition: `opacity ${menuAnimDuration}ms var(--ease-inout), transform ${menuAnimDuration}ms var(--ease-inout)`,
          }}
        >
          <nav aria-label="Mobile navigation">
            <ul
              ref={mobileListRef}
              role="list"
              className="relative flex flex-col items-center list-none m-0"
              style={{ paddingBlock: 'var(--space-6)', gap: 'var(--space-2)' }}
            >
              {/* Sliding indicator — sized to the link, not full-width */}
              {mobileIndicator !== null && (
                <span
                  aria-hidden
                  className="absolute bg-[color:var(--color-fg)]"
                  style={{
                    top: 0,
                    left: 0,
                    width: mobileIndicator.width,
                    height: mobileIndicator.height,
                    transform: `translate(${mobileIndicator.x}px, ${mobileIndicator.y}px)`,
                    transition: `transform var(--duration-slow) var(--ease-inout)`,
                    borderRadius: 'var(--border-radius-md)',
                    zIndex: 0,
                    pointerEvents: 'none',
                  }}
                />
              )}

              {NAV_LINKS.map(({ href, label }, index) => {
                const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)
                const isIndicated = index === mobileIndicatedIdx
                return (
                  <li
                    key={href}
                    ref={el => { mobileItemRefs.current[index] = el }}
                    className="relative"
                    style={{ zIndex: 1 }}
                  >
                    <Link
                      href={href}
                      aria-current={isActive ? 'page' : undefined}
                      onClick={e => handleMobileLinkClick(e, href, index)}
                      className="block font-display uppercase no-underline"
                      style={{
                        padding: '8px 36px',
                        fontSize: 'var(--text-h3)',
                        letterSpacing: '0.05em',
                        color: isIndicated ? 'var(--color-bg)' : 'var(--color-fg)',
                        transition: `color var(--duration-slow) var(--ease-inout)`,
                      }}
                    >
                      {label.toUpperCase()}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
        )}
      </header>
    </>
  )
}

/* ── Desktop nav rail with sliding indicator ── */
function NavRail({ pathname }: { pathname: string }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLLIElement | null)[]>([])
  const [indicator, setIndicator] = useState<{ x: number; width: number } | null>(null)
  const [indicatedIndex, setIndicatedIndex] = useState<number>(-1)

  const getActiveIndex = () =>
    NAV_LINKS.findIndex(({ href }) =>
      href === '/' ? pathname === '/' : pathname.startsWith(href)
    )

  const measureItem = (index: number) => {
    const el = itemRefs.current[index]
    const track = trackRef.current
    if (!el || !track) return null
    const elRect = el.getBoundingClientRect()
    const trackRect = track.getBoundingClientRect()
    return { x: elRect.left - trackRect.left, width: elRect.width }
  }

  const snapToActive = () => {
    const activeIndex = getActiveIndex()
    setIndicatedIndex(activeIndex)
    setIndicator(activeIndex >= 0 ? measureItem(activeIndex) : null)
  }

  // Snap to active item on mount and route change
  useEffect(() => {
    snapToActive()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  // Re-measure on resize so the indicator doesn't drift
  useEffect(() => {
    const observer = new ResizeObserver(() => snapToActive())
    if (trackRef.current) observer.observe(trackRef.current)
    return () => observer.disconnect()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleMouseEnter = (index: number) => {
    setIndicatedIndex(index)
    setIndicator(measureItem(index))
  }

  const handleMouseLeave = () => {
    const activeIndex = getActiveIndex()
    setIndicatedIndex(activeIndex)
    setIndicator(activeIndex >= 0 ? measureItem(activeIndex) : null)
  }

  return (
    <div className="hidden md:flex flex-1 items-center justify-center">
      {/* Bordered track */}
      <div
        ref={trackRef}
        className="relative flex items-center"
        onMouseLeave={handleMouseLeave}
      >
        {/* Sliding indicator — sits behind the link text */}
        {indicator && (
          <span
            aria-hidden
            className="absolute top-0 bottom-0 bg-[color:var(--color-fg)]"
            style={{
              left: 0,
              width: indicator.width,
              transform: `translateX(${indicator.x}px)`,
              transition: `transform var(--duration-slow) var(--ease-inout), width var(--duration-slow) var(--ease-inout)`,
              borderRadius: 'var(--border-radius-md)',
            }}
          />
        )}

        <ul
          role="list"
          aria-label="Site pages"
          className="relative flex items-center m-0 p-0 list-none"
          style={{ zIndex: 1, gap: 'var(--space-3)' }}
        >
          {NAV_LINKS.map(({ href, label }, index) => {
            const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)
            return (
              <li key={href} ref={el => { itemRefs.current[index] = el }}>
                <NavLink
                  href={href}
                  label={label}
                  isActive={isActive}
                  isIndicated={index === indicatedIndex}
                  onMouseEnter={() => handleMouseEnter(index)}
                />
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

/* ── Nav link — color inverts when indicator is underneath ── */
function NavLink({
  href, label, isActive, isIndicated, onMouseEnter,
}: {
  href: string
  label: string
  isActive: boolean
  isIndicated: boolean
  onMouseEnter: () => void
}) {
  return (
    <Link
      href={href}
      aria-current={isActive ? 'page' : undefined}
      onMouseEnter={onMouseEnter}
      className="relative font-display uppercase whitespace-nowrap no-underline block"
      style={{
        fontSize: 'var(--text-h4)',
        letterSpacing: '0.08em',
        padding: 'var(--space-2) var(--space-5)',
        color: isIndicated ? 'var(--color-bg)' : 'var(--color-fg)',
        transition: `color var(--duration-slow) var(--ease-inout)`,
      }}
    >
      {label.toUpperCase()}
    </Link>
  )
}
