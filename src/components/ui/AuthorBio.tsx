import Link from 'next/link'
import { RevealImage } from '@/components/ui/RevealImage'

export default function AuthorBio() {
  return (
    <section className="w-full border-b border-[color:var(--color-border)]">
      <div
        className="container-px"
        style={{ maxWidth: 'var(--container-prose)', marginInline: 'auto', paddingBlock: 'var(--space-8)' }}
      >
        <span
          className="font-display uppercase text-[color:var(--color-muted)] block"
          style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em', marginBottom: 'var(--space-4)' }}
        >
          Written by
        </span>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-6)' }}>
          <RevealImage
            src="/images/micah.webp"
            alt="Micah Shu"
            width={72}
            height={72}
            className="block flex-shrink-0"
            style={{ objectFit: 'cover', border: '1px solid var(--color-border-soft)' }}
          />
          <div>
            <p
              className="font-display uppercase text-[color:var(--color-fg)]"
              style={{ fontSize: 'var(--text-h3)', letterSpacing: '-0.01em', lineHeight: 1.1, marginBottom: 'var(--space-3)' }}
            >
              Micah Shu
            </p>
            <p
              className="font-body text-[color:var(--color-muted)]"
              style={{ fontSize: 'var(--text-body)', lineHeight: 1.65, maxWidth: '52ch', marginBottom: 'var(--space-4)' }}
            >
              Designer and developer based in Berthoud, CO. I build fast, minimal websites and apps for founders and creative businesses.
            </p>
            <Link
              href="/about"
              className="font-body text-[color:var(--color-fg)] underline underline-offset-2 hover:opacity-60"
              style={{ fontSize: 'var(--text-small)', transition: 'opacity var(--duration-fast) var(--ease-inout)' }}
            >
              More about Micah ↗︎
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
