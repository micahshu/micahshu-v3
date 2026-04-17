import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { buildContactPageSchema } from '@/lib/schema'
import PageHero from '@/components/ui/PageHero'
import ContactForm from '@/components/sections/ContactForm'

export const metadata: Metadata = {
  title: 'Contact — Micah Shu | Start a Web Project',
  description: 'Ready to build something? Reach out to Micah Shu, freelance web developer in Northern Colorado. Response within one business day.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact — Micah Shu | Start a Web Project',
    description: 'Ready to build something? Reach out to Micah Shu, freelance web developer in Northern Colorado. Response within one business day.',
    url: 'https://micahshu.com/contact',
    type: 'website',
  },
}

const INFO = [
  { label: 'Email', value: 'me@micahshu.com', href: 'mailto:me@micahshu.com' },
  { label: 'Based in', value: 'Berthoud, CO', href: null },
  { label: 'Response time', value: '< 1 business day', href: null },
]

export default function ContactPage() {
  return (
    <main id="main-content">
      <JsonLd schema={buildContactPageSchema()} />
      <PageHero
        eyebrow="Contact"
        title="Start a Project"
        subtitle="Whether you've got a full brief or just a rough idea, let's figure out if we're a fit."
        noBorderBottom
      />

      {/* Main content */}
      <section className="w-full border-t border-b border-[color:var(--color-border)] animate-hero-3">
        <div
          style={{
            maxWidth: 'var(--container-max)',
            marginInline: 'auto',
            paddingInline: 'var(--space-7)',
            paddingTop: 'var(--space-7)',
            paddingBottom: 'var(--space-9)',
          }}
        >
          <div
            className="flex flex-col min-[900px]:grid min-[900px]:items-start"
            style={{ gridTemplateColumns: '2fr 3fr', gap: 'var(--space-8)', maxWidth: 'var(--container-tight)', marginInline: 'auto' }}
          >
            {/* Left — info panel */}
            <div className="flex flex-col animate-hero-4" style={{ gap: 'var(--space-6)', paddingBottom: 'var(--space-7)' }}>
              <div className="flex flex-col" style={{ gap: 'var(--space-4)' }}>
                <span
                  className="font-display uppercase text-[color:var(--color-muted)]"
                  style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em' }}
                >
                  Direct
                </span>
                <p
                  className="font-body text-[color:var(--color-muted)]"
                  style={{ fontSize: 'var(--text-body)', lineHeight: 1.65 }}
                >
                  Use the form, or skip it entirely. I read every email.
                </p>
              </div>

              {/* Info rows */}
              <div
                className="flex flex-col"
                style={{ borderTop: '1px solid var(--color-border-soft)' }}
              >
                {INFO.map(({ label, value, href }) => (
                  <div
                    key={label}
                    className="flex flex-col"
                    style={{
                      paddingBlock: 'var(--space-4)',
                      borderBottom: '1px solid var(--color-border-soft)',
                      gap: 'var(--space-1)',
                    }}
                  >
                    <span
                      className="font-display uppercase text-[color:var(--color-muted)]"
                      style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em' }}
                    >
                      {label}
                    </span>
                    {href ? (
                      <a
                        href={href}
                        className="font-body text-[color:var(--color-fg)] hover:text-[color:var(--color-muted)]"
                        style={{
                          fontSize: 'var(--text-small)',
                          textDecoration: 'none',
                          transition: `color var(--duration-fast) var(--ease-inout)`,
                        }}
                      >
                        {value}
                      </a>
                    ) : (
                      <span
                        className="font-body text-[color:var(--color-fg)]"
                        style={{ fontSize: 'var(--text-small)' }}
                      >
                        {value}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right — form */}
            <div className="animate-hero-5 order-first min-[900px]:order-none" style={{ paddingBottom: 'var(--space-7)' }}>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
