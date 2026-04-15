import type { Metadata } from 'next'
import PageHero from '@/components/ui/PageHero'

export const metadata: Metadata = {
  title: 'Services — Micah Shu | Web Design & Development in Fort Collins, CO',
  description: 'Custom website design and web development for small businesses in Fort Collins and Northern Colorado. Affordable, full-stack — one developer, no handoffs.',
}
import CTASection from '@/components/sections/CTASection'
import BlogSection from '@/components/sections/BlogSection'
import ServicesSplitPanel from '@/components/sections/ServicesSplitPanel'
import AlaCarteSection from '@/components/sections/AlaCarteSection'

const PROCESS = [
  {
    index: '01',
    title: 'Scope',
    body: 'We define the problem, timeline, and what done looks like. No surprises later.',
  },
  {
    index: '02',
    title: 'Build',
    body: 'Work ships in stages. You see real progress early — not a big reveal at the end.',
  },
  {
    index: '03',
    title: 'Launch',
    body: 'Handoff includes everything: docs, credentials, and support options going forward.',
  },
]

export default function ServicesPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Services"
        title="What I Build"
        subtitle="Custom websites and web apps for small businesses in Fort Collins and Northern Colorado. One developer, start to finish."
        noBorderBottom
      />

      {/* Services — split panel */}
      <section className="w-full border-t border-b border-[color:var(--color-border)] animate-hero-3">
        <div className="animate-hero-4" style={{ maxWidth: 'var(--container-max)', marginInline: 'auto', paddingBlock: 'var(--space-9)' }}>
          <ServicesSplitPanel />
        </div>
      </section>

      <AlaCarteSection />

      {/* Process */}
      <section className="w-full border-b border-[color:var(--color-border)]">
        <div
          style={{
            maxWidth: 'var(--container-max)',
            marginInline: 'auto',
            padding: 'var(--space-7) var(--space-7) var(--space-9)',
          }}
        >
          <span
            className="block font-display uppercase text-[color:var(--color-muted)]"
            style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em', marginBottom: 'var(--space-5)' }}
          >
            Process
          </span>

          <h2
            className="font-display uppercase text-[color:var(--color-fg)]"
            style={{ fontSize: 'var(--text-display)', letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 'var(--space-7)' }}
          >
            How It Works
          </h2>

          <div
            className="grid grid-cols-1 md:grid-cols-3"
            style={{ borderTop: '1px solid var(--color-border)' }}
          >
            {PROCESS.map((step, i) => (
              <div
                key={step.index}
                className={`flex flex-col${i > 0 ? ' border-t md:border-t-0 md:border-l border-[color:var(--color-border)]' : ''}`}
                style={{ padding: 'var(--space-5)' }}
              >
                <span
                  className="block font-display uppercase text-[color:var(--color-muted)]"
                  style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em', marginBottom: 'var(--space-4)' }}
                >
                  {step.index}
                </span>

                <span
                  className="block font-display uppercase text-[color:var(--color-fg)]"
                  style={{ fontSize: 'var(--text-h1)', letterSpacing: '-0.01em', lineHeight: 1, marginBottom: 'var(--space-4)' }}
                >
                  {step.title}
                </span>

                <div style={{ borderTop: '1px solid var(--color-border-soft)', marginBottom: 'var(--space-4)' }} />

                <p
                  className="font-body text-[color:var(--color-muted)]"
                  style={{ fontSize: 'var(--text-small)', lineHeight: 1.65 }}
                >
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <BlogSection />
    </main>
  )
}
