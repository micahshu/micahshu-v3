import Link from 'next/link'

const SERVICES = [
  {
    name: 'Lump Sum',
    price: '$3,000',
    description: 'Own your site outright. One payment covers everything.',
    details: [
      '$25/mo hosting after launch',
      '$100/page after 5 pages',
      'Add Maintenance for the full package',
    ],
  },
  {
    name: 'Monthly',
    price: '$200/mo',
    description: 'Spread the cost over time. Hosting, support, and updates included.',
    details: [
      '$500 due at signing',
      '12-month minimum',
      'Drops to $100/mo after year one',
    ],
  },
  {
    name: 'Maintenance',
    price: '$100/mo',
    description: 'Keep your existing site updated, secure, and running smoothly.',
    details: [
      'Up to 5 hrs/mo of edits',
      'Hosting included',
      'Requires site review',
    ],
  },
]

export default function ServicesSection() {
  return (
    <section className="w-full border-b border-[color:var(--color-border)]">
      <div
        className="container-px section-py"
        style={{
          maxWidth: 'var(--container-max)',
          marginInline: 'auto',
        }}
      >
        {/* Eyebrow */}
        <span
          className="block font-display uppercase text-[color:var(--color-muted)]"
          style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em', marginBottom: 'var(--space-5)' }}
        >
          Services
        </span>

        {/* Heading */}
        <h2
          className="font-display uppercase text-[color:var(--color-fg)]"
          style={{ fontSize: 'var(--text-display)', letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 'var(--space-7)' }}
        >
          How I Work
        </h2>

        {/* Cards grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ borderTop: '1px solid var(--color-border)' }}
        >
          {SERVICES.map((service, i) => (
            <div
              key={service.name}
              className={`flex flex-col${i > 0 ? ' border-t md:border-t-0 md:border-l border-[color:var(--color-border)]' : ''}`}
              style={{ padding: 'var(--space-5)' }}
            >
              {/* Service name */}
              <span
                className="block font-display uppercase text-[color:var(--color-muted)]"
                style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em', marginBottom: 'var(--space-4)' }}
              >
                {service.name}
              </span>

              {/* Price */}
              <span
                className="block font-display text-[color:var(--color-fg)]"
                style={{ fontSize: 'var(--text-display)', letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 'var(--space-4)' }}
              >
                {service.price}
              </span>

              {/* Description */}
              <p
                className="font-body text-[color:var(--color-muted)]"
                style={{ fontSize: 'var(--text-small)', marginBottom: 'var(--space-5)' }}
              >
                {service.description}
              </p>

              {/* Divider */}
              <div
                style={{ borderTop: '1px solid var(--color-border-soft)', marginBottom: 'var(--space-5)' }}
              />

              {/* Details */}
              <ul
                className="flex flex-col font-body text-[color:var(--color-fg)]"
                style={{ fontSize: 'var(--text-small)', gap: 'var(--space-2)', listStyle: 'disc', paddingLeft: 'var(--space-5)', flexGrow: 1 }}
              >
                {service.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer row */}
        <div
          className="flex items-center justify-between"
          style={{
            borderTop: '1px solid var(--color-border-soft)',
            paddingTop: 'var(--space-5)',
            marginTop: 'var(--space-5)',
          }}
        >
          <span
            className="font-body text-[color:var(--color-muted)]"
            style={{ fontSize: 'var(--text-small)' }}
          >
            Hourly work billed at $75/hr
          </span>

          <Link
            href="/services"
            className="btn btn-ghost font-body no-underline"
            style={{ fontSize: 'var(--text-small)', padding: 'var(--space-2) var(--space-4)' }}
          >
            View Services
          </Link>
        </div>
      </div>
    </section>
  )
}
