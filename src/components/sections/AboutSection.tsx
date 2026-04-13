const DETAILS = [
  { label: 'Years Experience', value: '5' },
  { label: 'Based In',         value: 'Berthoud, CO' },
  { label: 'Focus',            value: 'Local Business' },
]

export default function AboutSection() {
  return (
    <section className="w-full border-b border-[color:var(--color-border)]">
      <div
        className="container-px"
        style={{
          maxWidth: 'var(--container-max)',
          marginInline: 'auto',
          paddingBlock: 'var(--space-9)',
        }}
      >
        {/* Statement */}
        <div style={{ marginBottom: 'var(--space-8)' }}>
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
            Five years of professional experience building sites. Now working directly with local businesses, without the agency overhead.
          </p>
        </div>

        {/* Stats strip */}
        <div className="flex flex-col sm:flex-row border-t border-[color:var(--color-border)]">
          {DETAILS.map(({ label, value }, i) => (
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
        </div>
      </div>
    </section>
  )
}
