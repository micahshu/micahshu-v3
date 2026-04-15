import Link from 'next/link'
import { services } from '@/lib/data/services'

export default function ServicesSection() {
  return (
    <section className="w-full border-b border-[color:var(--color-border)]">
      <div
        style={{
          maxWidth: 'var(--container-max)',
          marginInline: 'auto',
          paddingBlock: 'var(--space-9)',
        }}
      >
        {/* Eyebrow + Heading */}
        <div className="container-px" style={{ marginBottom: 'var(--space-7)' }}>
          <span
            className="block font-display uppercase text-[color:var(--color-muted)]"
            style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em', marginBottom: 'var(--space-5)' }}
          >
            Services
          </span>

          <h2
            className="font-display uppercase text-[color:var(--color-fg)]"
            style={{ fontSize: 'var(--text-display)', letterSpacing: '-0.02em', lineHeight: 1 }}
          >
            What I Build
          </h2>
        </div>

        {/* Service rows */}
        <div style={{ borderTop: '1px solid var(--color-border)' }}>
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="service-row container-px flex items-center no-underline text-[color:var(--color-fg)]"
              style={{
                paddingBlock: 'var(--space-4)',
                gap: 'var(--space-4)',
                borderBottom: '1px solid var(--color-border-soft)',
              }}
            >
              {/* Name */}
              <h3
                className="font-display uppercase shrink-0"
                style={{ fontSize: 'var(--text-h2)', letterSpacing: '-0.01em', lineHeight: 1, width: '260px' }}
              >
                {service.name}
              </h3>

              {/* Hook — desktop only */}
              <p
                className="service-row-label hidden md:block font-body text-[color:var(--color-muted)] flex-1"
                style={{
                  fontSize: 'var(--text-small)',
                  lineHeight: 1.5,
                  transition: 'color var(--duration-fast) var(--ease-inout)',
                }}
              >
                {service.hook}
              </p>

              {/* Starting at — desktop only */}
              <span
                className="service-row-label hidden md:block shrink-0 font-display uppercase text-[color:var(--color-muted)]"
                style={{
                  fontSize: 'var(--text-label)',
                  letterSpacing: '0.08em',
                  minWidth: '72px',
                  textAlign: 'right',
                  transition: 'color var(--duration-fast) var(--ease-inout)',
                }}
              >
                {service.startingAt}
              </span>

              {/* Arrow */}
              <span
                className="service-row-label shrink-0 font-body text-[color:var(--color-muted)]"
                style={{
                  fontSize: 'var(--text-h3)',
                  lineHeight: 1,
                  marginLeft: 'auto',
                  transition: 'color var(--duration-fast) var(--ease-inout)',
                }}
              >
                ↗
              </span>
            </Link>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="container-px flex justify-end" style={{ marginTop: 'var(--space-5)' }}>
          <Link
            href="/services"
            className="btn btn-ghost font-body no-underline"
            style={{ fontSize: 'var(--text-small)', padding: 'var(--space-2) var(--space-4)' }}
          >
            View All Services ↗
          </Link>
        </div>
      </div>
    </section>
  )
}
