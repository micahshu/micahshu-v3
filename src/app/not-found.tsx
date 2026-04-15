import Link from 'next/link'

const LINKS = [
  { label: 'Home',     href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'About',    href: '/about' },
  { label: 'Contact',  href: '/contact' },
]

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="w-full flex flex-col"
      style={{ minHeight: 'calc(100svh - 64px)' }}
    >
      {/* Hero block */}
      <section
        className="w-full flex-1 flex flex-col justify-center"
        style={{ paddingBlock: 'var(--space-9)', paddingInline: 'var(--space-7)' }}
      >
        <div style={{ maxWidth: 'var(--container-max)', marginInline: 'auto', width: '100%' }}>

          {/* Eyebrow */}
          <span
            className="block font-display uppercase text-[color:var(--color-muted)] animate-hero-1"
            style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em', marginBottom: 'var(--space-5)' }}
          >
            Error
          </span>

          {/* 404 number */}
          <h1
            className="font-display uppercase text-[color:var(--color-fg)] animate-hero-2"
            style={{
              fontSize: 'var(--text-hero)',
              letterSpacing: '-0.02em',
              lineHeight: 0.9,
              marginBottom: 'var(--space-6)',
            }}
          >
            404
          </h1>

          {/* Subheading */}
          <p
            className="font-display uppercase text-[color:var(--color-fg)] animate-hero-3"
            style={{
              fontSize: 'var(--text-display)',
              letterSpacing: '-0.02em',
              lineHeight: 1.0,
              marginBottom: 'var(--space-5)',
            }}
          >
            Nothing here.
          </p>

          {/* Body copy */}
          <p
            className="font-body text-[color:var(--color-muted)] animate-hero-4"
            style={{
              fontSize: 'var(--text-body)',
              lineHeight: 1.7,
              maxWidth: 'var(--container-prose)',
            }}
          >
            That URL leads nowhere — deleted, mistyped, or maybe it never existed at all.
            Either way, you&apos;ve found the edge of the site.
          </p>

        </div>
      </section>

      {/* Section divider — animated separately so it doesn't flash in before content */}
      <div className="w-full border-b border-[color:var(--color-border)] animate-hero-5" />

      {/* Navigation rows */}
      <section className="w-full">
        <div style={{ maxWidth: 'var(--container-max)', marginInline: 'auto' }}>

          {/* Label */}
          <div
            className="border-b border-[color:var(--color-border)] animate-hero-5"
            style={{ paddingBlock: 'var(--space-4)', paddingInline: 'var(--space-7)' }}
          >
            <span
              className="font-display uppercase text-[color:var(--color-muted)]"
              style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em' }}
            >
              Where to go
            </span>
          </div>

          {/* Link rows */}
          <div className="flex flex-col animate-hero-6" style={{ paddingInline: 'var(--space-7)' }}>
            {LINKS.map((item, i) => (
              <div
                key={item.href}
                className={`group relative flex items-center border-b border-[color:var(--color-border-soft)] hover:border-[color:var(--color-border)] hover:bg-[color:var(--color-surface)]${i === 0 ? ' border-t' : ''}`}
                style={{
                  paddingBlock: 'var(--space-4)',
                  transition: 'background-color var(--duration-fast) var(--ease-inout), border-color var(--duration-fast) var(--ease-inout)',
                }}
              >
                <Link href={item.href} className="absolute inset-0" aria-label={`Go to ${item.label}`} />

                {/* Index */}
                <span
                  className="font-display shrink-0 text-[color:var(--color-muted)]"
                  style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em', width: '28px' }}
                >
                  0{i + 1}
                </span>

                {/* Label */}
                <span
                  className="font-display uppercase text-[color:var(--color-fg)] flex-1"
                  style={{ fontSize: 'var(--text-h2)', letterSpacing: '-0.01em', lineHeight: 1 }}
                >
                  {item.label}
                </span>

                {/* Arrow */}
                <span
                  className="shrink-0 pointer-events-none flex items-center justify-center border border-[color:var(--color-border)] text-[color:var(--color-fg)] group-hover:bg-[color:var(--color-fg)] group-hover:text-[color:var(--color-bg)]"
                  style={{
                    width: 'var(--space-7)',
                    height: 'var(--space-7)',
                    fontSize: 'var(--text-small)',
                    transition: 'background-color var(--duration-fast) var(--ease-inout), color var(--duration-fast) var(--ease-inout)',
                  }}
                >
                  ↗
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>
    </main>
  )
}
