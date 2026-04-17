import Link from 'next/link'
import { RevealImage } from '@/components/ui/RevealImage'

const HERO_LINKS = [
  { label: 'About',    description: 'Who I am & how I work',            href: '/about'    },
  { label: 'Projects', description: 'Selected websites & apps',              href: '/projects' },
  { label: 'Contact',  description: 'Open to new projects & collaborations', href: '/contact'  },
]

export default function HeroSection() {
  return (
    <section className="w-full flex flex-col">
      {/* Top band: location */}
      <div
        className="flex justify-end items-center container-px animate-hero-1"
        style={{
          paddingTop: 'var(--space-4)',
          paddingBottom: 'var(--space-4)',
        }}
      >
        <span
          className="font-display uppercase text-[color:var(--color-muted)]"
          style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em' }}
        >
          Berthoud, CO
        </span>
      </div>

      {/* Middle band: hero name left, portrait right */}
      <div className="flex w-full animate-hero-2 md:h-[33.333vw]" style={{ alignItems: 'stretch' }}>
        <div className="flex-1 flex items-center container-px" style={{ paddingBlock: 'var(--space-7)' }}>
          <div className="flex flex-col" style={{ gap: 'var(--space-3)' }}>
            <span
              className="font-display uppercase text-[color:var(--color-muted)]"
              style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em' }}
            >
              Freelance Web Developer
            </span>
            <h1
              className="font-display text-[color:var(--color-fg)]"
              style={{ fontSize: 'var(--text-hero)', letterSpacing: '-0.02em', lineHeight: 0.9 }}
            >
              MICAH SHU
              <span className="sr-only"> — Freelance Web Developer in Fort Collins, CO</span>
            </h1>
            <p
              className="font-body text-[color:var(--color-muted)]"
              style={{ fontSize: 'var(--text-small)', paddingLeft: '3px' }}
            >
              Websites for small businesses in Fort Collins and Northern Colorado.
            </p>
          </div>
        </div>

        {/* Portrait — desktop only */}
        <div
          className="relative hidden md:flex w-1/3 overflow-hidden border-l border-[color:var(--color-border)]"
        >
          <RevealImage
            src="/images/micah.webp"
            alt="Micah Shu, freelance web developer in Fort Collins, CO"
            fill
            sizes="33vw"
            loading="eager"
            style={{ objectFit: 'cover', objectPosition: 'center top' }}
          />
        </div>
      </div>

      {/* Portrait — mobile only, below name band */}
      <div
        className="relative md:hidden w-full border-t border-[color:var(--color-border)] animate-hero-2"
        style={{ height: '100vw' }}
      >
        <RevealImage
          src="/images/micah.webp"
          alt="Micah Shu, freelance web developer in Fort Collins, CO"
          fill
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center top' }}
        />
      </div>

      {/* Three link blocks */}
      <div className="flex flex-col md:flex-row w-full border-t border-b border-[color:var(--color-border)] animate-hero-3">
        {HERO_LINKS.map(({ label, description, href }, i) => (
          <Link
            key={href}
            href={href}
            className={[
              'group relative flex-1 flex flex-col items-start justify-center no-underline container-px',
              'text-[color:var(--color-fg)]',
              'hover:bg-[color:var(--color-fg)] hover:text-[color:var(--color-bg)]',
              i > 0 ? 'border-t md:border-t-0 md:border-l border-[color:var(--color-border)]' : '',
            ].join(' ')}
            style={{
              paddingBlock: 'var(--space-7)',
              transition: 'background-color var(--duration-fast) var(--ease-inout), color var(--duration-fast) var(--ease-inout)',
            }}
          >
            {/* Arrow — absolute so it doesn't affect centering */}
            <span
              className="absolute font-body opacity-100 md:opacity-0 md:group-hover:opacity-100 text-[color:var(--color-muted)] md:text-[color:var(--color-bg)]"
              style={{
                top: 'var(--space-5)',
                right: 'var(--space-5)',
                fontSize: 'var(--text-h1)',
                lineHeight: 1.0,
                transition: 'opacity var(--duration-fast) var(--ease-inout)',
              }}
            >
              ↗︎
            </span>

            <span
              className="font-display uppercase"
              style={{ fontSize: 'var(--text-h1)', letterSpacing: '-0.01em', lineHeight: 1.0 }}
            >
              {label}
            </span>
            <p
              className="font-body text-[color:var(--color-muted)] group-hover:text-[color:var(--color-bg)]"
              style={{
                fontSize: 'var(--text-small)',
                marginTop: 'var(--space-2)',
                transition: 'color var(--duration-fast) var(--ease-inout)',
              }}
            >
              {description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}
