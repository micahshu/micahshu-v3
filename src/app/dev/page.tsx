import Button from '@/components/ui/Button'
import ThemeToggle from '@/components/ui/ThemeToggle'
import Container from '@/components/layout/Container'
import Section from '@/components/layout/Section'

export default function HomePage() {
  return (
    <main id="main-content">
      {/* Hero */}
      <Section>
        <Container>
          <p className="font-display uppercase" style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em', color: 'var(--color-muted)', marginBottom: 'var(--space-4)' }}>
            Design Engineer
          </p>
          <h1 className="font-display uppercase" style={{ fontSize: 'var(--text-hero)', lineHeight: 0.9, letterSpacing: '-0.02em' }}>
            Micah Shu
          </h1>
          <p className="font-body" style={{ fontSize: 'var(--text-body)', color: 'var(--color-muted)', maxWidth: 'var(--container-prose)', marginTop: 'var(--space-6)', lineHeight: 1.65 }}>
            I build things that work well and look right. Design systems, web applications, and the craft that sits between the two.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-7)' }}>
            <Button variant="solid">View Work</Button>
            <Button variant="ghost">Get in Touch</Button>
          </div>
        </Container>
      </Section>

      {/* Typography specimen */}
      <Section>
        <Container>
          <p className="font-display uppercase" style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em', color: 'var(--color-muted)', marginBottom: 'var(--space-6)' }}>
            Type Scale
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <h2 className="font-display uppercase" style={{ fontSize: 'var(--text-display)', lineHeight: 0.95, letterSpacing: '-0.02em' }}>Display Heading</h2>
            <h3 className="font-body" style={{ fontSize: 'var(--text-h1)', lineHeight: 1.1, letterSpacing: '-0.01em', fontWeight: 700 }}>H1 — Page Level Heading</h3>
            <h4 className="font-body" style={{ fontSize: 'var(--text-h2)', lineHeight: 1.2, letterSpacing: '-0.01em', fontWeight: 700 }}>H2 — Section Heading</h4>
            <p className="font-body" style={{ fontSize: 'var(--text-body)', color: 'var(--color-muted)' }}>Body — The quick brown fox jumps over the lazy dog. Paragraph text at 16px with 1.65 line-height.</p>
            <p className="font-body" style={{ fontSize: 'var(--text-small)', color: 'var(--color-muted)' }}>Small — April 11, 2026 · 4 min read</p>
          </div>
        </Container>
      </Section>

      {/* Color swatches */}
      <Section>
        <Container>
          <p className="font-display uppercase" style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em', color: 'var(--color-muted)', marginBottom: 'var(--space-6)' }}>
            Color Tokens
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-1)' }}>
            {[
              { label: 'bg',         value: 'var(--color-bg)' },
              { label: 'surface',    value: 'var(--color-surface)' },
              { label: 'subtle',     value: 'var(--color-subtle)' },
              { label: 'muted',      value: 'var(--color-muted)' },
              { label: 'fg',         value: 'var(--color-fg)' },
              { label: 'accent',     value: 'var(--color-accent)' },
              { label: 'accent-dim', value: 'var(--color-accent-dim)' },
            ].map(({ label, value }) => (
              <div key={label} style={{ border: '1px solid var(--color-border)' }}>
                <div style={{ width: 96, height: 64, background: value }} />
                <p className="font-body" style={{ fontSize: 'var(--text-caption)', padding: 'var(--space-2)', color: 'var(--color-fg)' }}>
                  {label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Buttons */}
      <Section>
        <Container>
          <p className="font-display uppercase" style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em', color: 'var(--color-muted)', marginBottom: 'var(--space-6)' }}>
            Buttons
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <Button variant="ghost" size="sm">Small</Button>
              <Button variant="ghost" size="md">Medium</Button>
              <Button variant="ghost" size="lg">Large</Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Theme Toggle */}
      <Section>
        <Container>
          <p className="font-display uppercase" style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em', color: 'var(--color-muted)', marginBottom: 'var(--space-6)' }}>
            Theme Toggle
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
            <ThemeToggle />
            <p className="font-body" style={{ fontSize: 'var(--text-small)', color: 'var(--color-muted)' }}>
              Slides between light and dark mode — persists to localStorage
            </p>
          </div>
        </Container>
      </Section>

      {/* Layout: Container sizes */}
      <Section>
        <p
          className="font-display uppercase"
          style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em', color: 'var(--color-muted)', marginBottom: 'var(--space-6)', paddingInline: 'var(--space-5)' }}
        >
          Layout — Container sizes
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {([
            { size: 'default', label: 'default', max: '1280px' },
            { size: 'tight',   label: 'tight',   max: '960px' },
            { size: 'prose',   label: 'prose',   max: '720px' },
          ] as const).map(({ size, label, max }) => (
            <Container key={size} size={size}>
              <div style={{ background: 'var(--color-surface)', padding: 'var(--space-3)', border: '1px dashed var(--color-border-soft)' }}>
                <p className="font-body" style={{ fontSize: 'var(--text-caption)', color: 'var(--color-muted)' }}>
                  size="{label}" — {max} max-width
                </p>
              </div>
            </Container>
          ))}
        </div>
      </Section>

      {/* Tags */}
      <Section border="none">
        <Container>
          <p className="font-display uppercase" style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em', color: 'var(--color-muted)', marginBottom: 'var(--space-6)' }}>
            Tags &amp; Badges
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
            {['Next.js', 'TypeScript', 'Design Systems', 'Web App', 'Consulting'].map((tag) => (
              <span
                key={tag}
                className="font-body uppercase"
                style={{
                  background: 'var(--color-surface)',
                  color: 'var(--color-fg)',
                  border: '1px solid var(--color-border-soft)',
                  borderRadius: 'var(--border-radius-sm)',
                  padding: 'var(--space-1) var(--space-2)',
                  fontSize: 'var(--text-caption)',
                  letterSpacing: '0.05em',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  )
}
