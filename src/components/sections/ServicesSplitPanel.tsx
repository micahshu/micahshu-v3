'use client'

import { useState } from 'react'
import Link from 'next/link'
import { services } from '@/lib/data/services'
function MobileAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div style={{ borderTop: '1px solid var(--color-border)' }}>
      {services.map((service, i) => {
        const isOpen = openIndex === i
        return (
          <div
            key={service.slug}
            style={{ borderBottom: '1px solid var(--color-border-soft)' }}
          >
            {/* Row trigger */}
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center text-left"
              style={{
                paddingBlock: 'var(--space-5)',
                paddingInline: 'var(--space-5)',
                gap: 'var(--space-4)',
                backgroundColor: isOpen ? 'var(--color-fg)' : 'transparent',
                transition: 'background-color var(--duration-fast) var(--ease-inout)',
              }}
            >
              <span
                className="font-display shrink-0"
                style={{
                  fontSize: 'var(--text-label)',
                  letterSpacing: '0.08em',
                  width: '24px',
                  color: isOpen ? 'var(--color-bg)' : 'var(--color-muted)',
                  transition: 'color var(--duration-fast) var(--ease-inout)',
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              <span
                className="font-display uppercase flex-1"
                style={{
                  fontSize: 'var(--text-h3)',
                  letterSpacing: '-0.01em',
                  lineHeight: 1,
                  color: isOpen ? 'var(--color-bg)' : 'var(--color-fg)',
                  transition: 'color var(--duration-fast) var(--ease-inout)',
                }}
              >
                {service.name}
              </span>

              <span
                className="font-display shrink-0"
                style={{
                  fontSize: 'var(--text-h3)',
                  lineHeight: 1,
                  color: isOpen ? 'var(--color-bg)' : 'var(--color-muted)',
                  transition: 'color var(--duration-fast) var(--ease-inout)',
                }}
              >
                {isOpen ? '−' : '+'}
              </span>
            </button>

            {/* Expanded detail */}
            <div className={`faq-answer-wrapper${isOpen ? ' open' : ''}`}>
              <div className="faq-answer-inner">
              <div
                style={{
                  padding: 'var(--space-5)',
                  borderTop: '1px solid var(--color-border-soft)',
                }}
              >
                <span
                  className="block font-display uppercase"
                  style={{
                    fontSize: 'var(--text-label)',
                    letterSpacing: '0.08em',
                    color: 'var(--color-muted)',
                    marginBottom: 'var(--space-4)',
                  }}
                >
                  {service.timeframe}
                </span>

                <p
                  className="font-body"
                  style={{
                    fontSize: 'var(--text-body)',
                    lineHeight: 1.65,
                    color: 'var(--color-muted)',
                    marginBottom: 'var(--space-3)',
                  }}
                >
                  {service.hook}
                </p>

                <p
                  className="font-body"
                  style={{
                    fontSize: 'var(--text-small)',
                    lineHeight: 1.65,
                    color: 'var(--color-muted)',
                    marginBottom: 'var(--space-5)',
                  }}
                >
                  {service.description}
                </p>

                <Link
                  href={`/services/${service.slug}`}
                  className="btn btn-ghost inline-flex no-underline"
                  style={{ fontSize: 'var(--text-small)', padding: '10px 16px' }}
                >
                  Explore ↗
                </Link>
              </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function ServicesSplitPanel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = services[activeIndex]

  return (
    <>
      {/* Mobile: accordion */}
      <div className="md:hidden">
        <MobileAccordion />
      </div>

      {/* Desktop: split panel */}
      <div className="hidden md:flex" style={{ borderTop: '1px solid var(--color-border)' }}>
        {/* Left: service list */}
        <div
          className="flex flex-col shrink-0"
          style={{ width: '42%', borderRight: '1px solid var(--color-border)' }}
        >
          {services.map((service, i) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="w-full flex items-center no-underline"
              onMouseEnter={() => setActiveIndex(i)}
              style={{
                paddingBlock: 'var(--space-5)',
                paddingInline: 'var(--space-6)',
                gap: 'var(--space-4)',
                borderBottom: i === services.length - 1 ? '1px solid var(--color-border)' : '1px solid var(--color-border-soft)',
                backgroundColor: activeIndex === i ? 'var(--color-fg)' : 'transparent',
                transition: 'background-color var(--duration-fast) var(--ease-inout)',
              }}
            >
              <span
                className="font-display shrink-0"
                style={{
                  fontSize: 'var(--text-label)',
                  letterSpacing: '0.08em',
                  width: '24px',
                  color: activeIndex === i ? 'var(--color-bg)' : 'var(--color-muted)',
                  transition: 'color var(--duration-fast) var(--ease-inout)',
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              <span
                className="font-display uppercase flex-1"
                style={{
                  fontSize: 'var(--text-h2)',
                  letterSpacing: '-0.01em',
                  lineHeight: 1,
                  color: activeIndex === i ? 'var(--color-bg)' : 'var(--color-fg)',
                  transition: 'color var(--duration-fast) var(--ease-inout)',
                }}
              >
                {service.name}
              </span>

              <span
                className="font-display uppercase shrink-0 hidden min-[900px]:block"
                style={{
                  fontSize: 'var(--text-label)',
                  letterSpacing: '0.08em',
                  color: activeIndex === i ? 'var(--color-bg)' : 'var(--color-muted)',
                  transition: 'color var(--duration-fast) var(--ease-inout)',
                }}
              >
                {service.timeframe}
              </span>
            </Link>
          ))}
        </div>

        {/* Right: detail panel */}
        <div
          className="flex flex-1 flex-col justify-between"
          style={{ padding: 'var(--space-7)', minHeight: '380px' }}
        >
          <div>
            <span
              className="block font-display uppercase"
              style={{
                fontSize: 'var(--text-label)',
                letterSpacing: '0.08em',
                color: 'var(--color-muted)',
                marginBottom: 'var(--space-4)',
              }}
            >
              {active.timeframe}
            </span>

            <h3
              className="font-display uppercase"
              style={{
                fontSize: 'var(--text-display)',
                letterSpacing: '-0.02em',
                lineHeight: 1,
                color: 'var(--color-fg)',
                marginBottom: 'var(--space-5)',
              }}
            >
              {active.name}
            </h3>

            <p
              className="font-body"
              style={{
                fontSize: 'var(--text-body)',
                lineHeight: 1.65,
                color: 'var(--color-muted)',
                maxWidth: '440px',
                marginBottom: 'var(--space-3)',
              }}
            >
              {active.hook}
            </p>

            <p
              className="font-body"
              style={{
                fontSize: 'var(--text-small)',
                lineHeight: 1.65,
                color: 'var(--color-muted)',
                maxWidth: '440px',
              }}
            >
              {active.description}
            </p>
          </div>

          <Link
            href={`/services/${active.slug}`}
            className="btn btn-ghost self-start no-underline"
            style={{
              padding: '14px 20px',
              fontSize: 'var(--text-body)',
              marginTop: 'var(--space-7)',
            }}
          >
            Explore ↗
          </Link>
        </div>
      </div>
    </>
  )
}
