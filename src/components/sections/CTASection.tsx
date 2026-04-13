'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function CTASection() {
  const [hovered, setHovered] = useState(false)

  return (
    <section
      className="w-full"
      style={{ overflow: 'hidden', background: 'var(--color-fg)' }}
    >
      {/* Runoff heading — no container, bleeds right */}
      <div style={{ paddingTop: 'var(--space-9)', paddingLeft: 'var(--space-7)' }}>
        <h2
          className="font-display uppercase whitespace-nowrap"
          style={{
            fontSize: 'clamp(96px, 16vw, 220px)',
            letterSpacing: '-0.02em',
            lineHeight: 0.9,
            color: 'var(--color-bg)',
          }}
        >
          START A PROJECT.
        </h2>
      </div>

      {/* Bottom row — constrained */}
      <div style={{ maxWidth: 'var(--container-max)', marginInline: 'auto' }}>
        <div
          className="flex flex-col md:flex-row md:items-center md:justify-between container-px"
          style={{
            borderTop: '1px solid var(--color-bg)',
            marginTop: 'var(--space-6)',
            paddingBlock: 'var(--space-7)',
            gap: 'var(--space-5)',
          }}
        >
          <p
            className="font-body"
            style={{ fontSize: 'var(--text-body)', maxWidth: '480px', color: 'var(--color-bg)', opacity: 0.65 }}
          >
            Open to new clients. Let's talk about what you're building.
          </p>
          <Link
            href="/contact"
            className="font-body no-underline shrink-0"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: 'var(--space-2) var(--space-4)',
              fontSize: 'var(--text-small)',
              border: '1px solid var(--color-bg)',
              borderRadius: 'var(--border-radius-md)',
              background: hovered ? 'transparent' : 'var(--color-bg)',
              color: hovered ? 'var(--color-bg)' : 'var(--color-fg)',
              transition:
                'background-color var(--duration-fast) var(--ease-inout), color var(--duration-fast) var(--ease-inout)',
            }}
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  )
}
