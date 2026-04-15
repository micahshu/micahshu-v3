'use client'

import { useState } from 'react'
import type { ServiceFAQ } from '@/lib/types'

export default function ServiceFAQ({ faqs }: { faqs: ServiceFAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="flex flex-col" style={{ borderTop: '1px solid var(--color-border)' }}>
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i
        return (
          <div
            key={i}
            className="animate-faq-row"
            style={{
              borderBottom: '1px solid var(--color-border-soft)',
              animationDelay: `${i * 80}ms`,
            }}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="faq-btn relative w-full flex items-center justify-between text-left bg-transparent border-none cursor-pointer overflow-hidden"
              style={{ paddingBlock: 'var(--space-5)', paddingInline: 'var(--space-5)', gap: 'var(--space-6)' }}
              aria-expanded={isOpen}
            >
              <span
                className="faq-q relative font-display uppercase text-[color:var(--color-muted)]"
                style={{
                  fontSize: 'var(--text-h3)',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.2,
                  transition: 'color var(--duration-fast) var(--ease-inout)',
                  zIndex: 1,
                }}
              >
                {faq.q}
              </span>
              <span
                className="faq-icon relative shrink-0 font-body text-[color:var(--color-muted)]"
                style={{
                  fontSize: 'var(--text-h3)',
                  lineHeight: 1,
                  transform: isOpen ? 'rotate(45deg)' : 'none',
                  transition: 'transform var(--duration-fast) var(--ease-inout), color var(--duration-fast) var(--ease-inout)',
                  zIndex: 1,
                }}
              >
                +
              </span>
            </button>

            <div className={`faq-answer-wrapper${isOpen ? ' open' : ''}`}>
              <div className="faq-answer-inner">
                <p
                  className="font-body text-[color:var(--color-muted)]"
                  style={{ fontSize: 'var(--text-body)', lineHeight: 1.65, paddingBottom: 'var(--space-5)', paddingInline: 'var(--space-5)', maxWidth: 'var(--container-prose)' }}
                >
                  {faq.a}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
