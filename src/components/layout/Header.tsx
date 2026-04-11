'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import ThemeToggle from '@/components/ui/ThemeToggle'

const NAV_LINKS = [
  { href: '/',         label: 'Home' },
  { href: '/about',    label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/services', label: 'Services' },
  { href: '/blog',     label: 'Blog' },
  { href: '/contact',  label: 'Contact' },
]

export default function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      {/* Skip navigation — visually hidden until focused */}
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
        className="sticky top-0 z-[100] w-full border-b border-[color:var(--color-border)] bg-[color:var(--color-bg)]"
      >
        <nav
          aria-label="Main navigation"
          className="mx-auto flex h-16 items-center justify-between"
          style={{
            maxWidth: 'var(--container-max)',
            paddingInline: 'var(--space-7)',
            gap: 'var(--space-6)',
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label="Micah Shu — Home"
            className="shrink-0 font-display text-[length:var(--text-h3)] text-[color:var(--color-fg)] no-underline"
            style={{ letterSpacing: '-0.01em', lineHeight: 1 }}
          >
            MS
          </Link>

          {/* Desktop nav links — hidden below md */}
          <ul
            role="list"
            aria-label="Site pages"
            className="hidden md:flex items-center m-0 p-0 list-none"
            style={{ gap: 'var(--space-6)' }}
          >
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)
              return (
                <li key={href}>
                  <NavLink href={href} label={label} isActive={isActive} />
                </li>
              )
            })}
          </ul>

          {/* Right controls */}
          <div className="flex shrink-0 items-center" style={{ gap: 'var(--space-4)' }}>
            <ThemeToggle />

            {/* Hamburger — visible below md */}
            <button
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen(prev => !prev)}
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

        {/* Mobile menu — shown below md when open */}
        <div
          id="mobile-menu"
          aria-hidden={!menuOpen}
          className={menuOpen ? 'block md:hidden border-t border-[color:var(--color-border)] bg-[color:var(--color-bg)]' : 'hidden'}
        >
          <nav aria-label="Mobile navigation">
            <ul
              role="list"
              className="list-none m-0"
              style={{ paddingInline: 'var(--space-5)' }}
            >
              {NAV_LINKS.map(({ href, label }) => {
                const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)
                return (
                  <li
                    key={href}
                    className="border-b border-[color:var(--color-border-soft)]"
                  >
                    <Link
                      href={href}
                      aria-current={isActive ? 'page' : undefined}
                      className="block font-display uppercase no-underline"
                      style={{
                        padding: 'var(--space-5) 0',
                        fontSize: 'var(--text-h3)',
                        letterSpacing: '0.05em',
                        color: isActive ? 'var(--color-accent)' : 'var(--color-fg)',
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
      </header>
    </>
  )
}

/* ── Desktop nav link with animated underline ── */
function NavLink({ href, label, isActive }: { href: string; label: string; isActive: boolean }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      href={href}
      aria-current={isActive ? 'page' : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative font-display uppercase whitespace-nowrap no-underline"
      style={{
        fontSize: 'var(--text-label)',
        letterSpacing: '0.08em',
        paddingBottom: 2,
        color: isActive || hovered ? 'var(--color-accent)' : 'var(--color-fg)',
        transition: `color var(--duration-fast) var(--ease-inout)`,
      }}
    >
      {label.toUpperCase()}
      {/* Animated underline */}
      <span
        aria-hidden
        className="absolute bottom-0 left-0"
        style={{
          height: 1,
          background: 'var(--color-accent)',
          width: isActive || hovered ? '100%' : '0%',
          transition: `width var(--duration-base) var(--ease-linear)`,
        }}
      />
    </Link>
  )
}
