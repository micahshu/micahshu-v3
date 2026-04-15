import Link from 'next/link'
import { getYearsExperience, toWord } from '@/lib/utils'

const STATS = [
  { label: 'Years Experience', value: String(getYearsExperience()) },
  { label: 'Based In',         value: 'Berthoud, CO' },
]

export default function AboutSection() {
  return (
    <section className="w-full border-b border-[color:var(--color-border)] animate-hero-4">
      <div
        className="container-px"
        style={{
          maxWidth: 'var(--container-max)',
          marginInline: 'auto',
          paddingBlock: 'var(--space-9)',
        }}
      >
        {/* Statement */}
        <div className="animate-hero-5" style={{ marginBottom: 'var(--space-8)' }}>
          <span
            className="block font-display uppercase text-[color:var(--color-muted)]"
            style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em', marginBottom: 'var(--space-5)' }}
          >
            About
          </span>
          <p
            className="font-body text-[color:var(--color-fg)]"
            style={{ fontSize: 'var(--text-h2)', lineHeight: 1.35, letterSpacing: '-0.01em', maxWidth: '720px' }}
          >
            {toWord(getYearsExperience())} years of professional experience building sites. Now working directly with local businesses, without the agency overhead.
          </p>
        </div>

        {/* Stats strip */}
        <div className="flex flex-col sm:flex-row border-t border-[color:var(--color-border)] animate-hero-6">
          {STATS.map(({ label, value }, i) => (
            <div
              key={label}
              className={`flex-1 flex flex-col border-b sm:border-b-0 border-[color:var(--color-border)]${i > 0 ? ' sm:border-l' : ''}`}
              style={{ padding: 'var(--space-6) var(--space-5)' }}
            >
              <span
                className="block font-display uppercase text-[color:var(--color-muted)]"
                style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em', marginBottom: 'var(--space-3)' }}
              >
                {label}
              </span>
              <span
                className="block font-display text-[color:var(--color-fg)]"
                style={{ fontSize: 'var(--text-h1)', letterSpacing: '-0.01em', lineHeight: 1.1 }}
              >
                {value}
              </span>
            </div>
          ))}

          {/* Specialty — linked, hover inverts */}
          <Link
            href="/services/web-development"
            className="group relative flex-1 flex flex-col no-underline sm:border-l border-b sm:border-b-0 border-[color:var(--color-border)] hover:bg-[color:var(--color-fg)]"
            style={{
              padding: 'var(--space-6) var(--space-5)',
              transition: 'background-color var(--duration-fast) var(--ease-inout)',
            }}
          >
            <span
              className="block font-display uppercase text-[color:var(--color-muted)] group-hover:text-[color:var(--color-bg)]"
              style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em', marginBottom: 'var(--space-3)', transition: 'color var(--duration-fast) var(--ease-inout)' }}
            >
              Specialty
            </span>
            <span
              className="block font-display text-[color:var(--color-fg)] group-hover:text-[color:var(--color-bg)]"
              style={{ fontSize: 'var(--text-h1)', letterSpacing: '-0.01em', lineHeight: 1.1, transition: 'color var(--duration-fast) var(--ease-inout)' }}
            >
              Custom Websites
            </span>
            <span
              className="absolute opacity-0 group-hover:opacity-100 text-[color:var(--color-bg)]"
              style={{
                top: 'var(--space-5)',
                right: 'var(--space-5)',
                fontSize: 'var(--text-h1)',
                lineHeight: 1,
                transition: 'opacity var(--duration-fast) var(--ease-inout)',
              }}
            >
              ↗
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
