import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { proposals } from '@/lib/data/proposals'
import UnlockForm from './UnlockForm'

export const metadata: Metadata = {
  title: 'View Proposal',
  robots: { index: false, follow: false },
}

export default async function UnlockPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const proposal = proposals.find((p) => p.slug === slug)
  if (!proposal) notFound()

  return (
    <main id="main-content">
      <section className="w-full" style={{ minHeight: '80vh' }}>
        <div
          className="flex flex-col items-center justify-center"
          style={{
            maxWidth: 'var(--container-tight)',
            marginInline: 'auto',
            paddingInline: 'var(--space-7)',
            paddingBlock: 'var(--space-11)',
            gap: 'var(--space-7)',
          }}
        >
          <div className="flex flex-col items-center" style={{ gap: 'var(--space-4)', textAlign: 'center' }}>
            <span
              className="font-display uppercase text-[color:var(--color-muted)]"
              style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em' }}
            >
              Proposal
            </span>
            <h1
              className="font-display uppercase text-[color:var(--color-fg)]"
              style={{ fontSize: 'var(--text-h1)', letterSpacing: '-0.01em', lineHeight: 1 }}
            >
              For {proposal.clientName}
            </h1>
            <p
              className="font-body text-[color:var(--color-muted)]"
              style={{ fontSize: 'var(--text-body)', lineHeight: 1.65 }}
            >
              This proposal is private. Enter the passphrase you received to view it.
            </p>
          </div>

          <UnlockForm slug={slug} />
        </div>
      </section>
    </main>
  )
}
