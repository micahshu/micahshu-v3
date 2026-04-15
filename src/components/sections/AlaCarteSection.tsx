import Link from 'next/link'
import { alaCarteServices } from '@/lib/data/alacarte'

export default function AlaCarteSection() {
  return (
    <section className="w-full border-b border-[color:var(--color-border)]">
      <div style={{ maxWidth: 'var(--container-max)', marginInline: 'auto', paddingBlock: 'var(--space-9)', paddingInline: 'var(--space-7)' }}>

        <span
          className="block font-display uppercase text-[color:var(--color-muted)]"
          style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em', marginBottom: 'var(--space-5)' }}
        >
          À La Carte
        </span>

        <h2
          className="font-display uppercase text-[color:var(--color-fg)]"
          style={{ fontSize: 'var(--text-display)', letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 'var(--space-7)' }}
        >
          Also Available
        </h2>

        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ borderTop: '1px solid var(--color-border)' }}
        >
          {alaCarteServices.map((item) => (
            <Link
              key={item.slug}
              href={`/services/${item.slug}`}
              className="group flex flex-col no-underline border-b border-[color:var(--color-border)] md:odd:border-r"
              style={{
                padding: 'var(--space-6)',
                gap: 'var(--space-4)',
                transition: 'background-color var(--duration-fast) var(--ease-inout)',
              }}
            >
              {/* Price */}
              <div className="flex items-baseline" style={{ gap: 'var(--space-2)' }}>
                <span
                  className="font-display uppercase text-[color:var(--color-fg)]"
                  style={{ fontSize: 'var(--text-display)', letterSpacing: '-0.02em', lineHeight: 1 }}
                >
                  {item.price}
                </span>
                <span
                  className="font-body text-[color:var(--color-muted)]"
                  style={{ fontSize: 'var(--text-small)' }}
                >
                  {item.billingCycle}
                </span>
              </div>

              {/* Name */}
              <h3
                className="font-display uppercase text-[color:var(--color-fg)]"
                style={{ fontSize: 'var(--text-h2)', letterSpacing: '-0.01em', lineHeight: 1 }}
              >
                {item.name}
              </h3>

              {/* Divider */}
              <div style={{ borderTop: '1px solid var(--color-border-soft)' }} />

              {/* Description */}
              <p
                className="font-body text-[color:var(--color-muted)] flex-1"
                style={{ fontSize: 'var(--text-small)', lineHeight: 1.65 }}
              >
                {item.description}
              </p>

              {/* CTA */}
              <span
                className="font-display uppercase text-[color:var(--color-muted)] group-hover:text-[color:var(--color-fg)]"
                style={{
                  fontSize: 'var(--text-label)',
                  letterSpacing: '0.08em',
                  transition: 'color var(--duration-fast) var(--ease-inout)',
                }}
              >
                Learn More ↗
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
