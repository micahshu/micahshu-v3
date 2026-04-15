import type { ReactNode } from 'react'
import { RevealImage } from '@/components/ui/RevealImage'

interface PageHeroProps {
  eyebrow?: string
  title: string
  subtitle?: ReactNode
  image?: {
    src: string
    alt: string
    hoverSrc?: string
  }
  meta?: { label: string; value: string }[]
  noBorderBottom?: boolean
}

export default function PageHero({ eyebrow, title, subtitle, image, meta, noBorderBottom }: PageHeroProps) {
  return (
    <section
      className={`w-full grid grid-cols-1 ${noBorderBottom ? '' : 'border-b border-[color:var(--color-border)]'} ${image ? 'md:grid-cols-[1fr_min(28vw,320px)]' : ''}`}
    >

      {/* Title — col 1, row 1 on desktop */}
      <div
        className="flex flex-col justify-end container-px animate-hero-1 md:col-start-1 md:row-start-1"
        style={{ paddingBlock: 'var(--space-9)' }}
      >
        {eyebrow && (
          <span
            className="font-display uppercase text-[color:var(--color-muted)]"
            style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em', marginBottom: 'var(--space-3)' }}
          >
            {eyebrow}
          </span>
        )}
        <h1
          className="font-display uppercase text-[color:var(--color-fg)]"
          style={{ fontSize: 'var(--text-display)', letterSpacing: '-0.02em', lineHeight: 0.95 }}
        >
          {title}
        </h1>
      </div>

      {/* Portrait — aspect ratio on mobile, spans rows 1–2 on desktop */}
      {image && (
        <div
          className="relative border-t border-[color:var(--color-border)] overflow-hidden animate-hero-3 aspect-[4/5] md:aspect-auto md:border-t-0 md:border-b md:border-l md:col-start-2 md:row-start-1 md:row-end-3"
        >
          <RevealImage
            src={image.src}
            alt={image.alt}
            hoverSrc={image.hoverSrc}
            fill
            sizes="(max-width: 768px) 100vw, min(28vw, 320px)"
            loading="eager"
            style={{ objectFit: 'cover', objectPosition: 'center top' }}
          />
        </div>
      )}

      {/* Meta — visible on mobile and desktop */}
      {meta && meta.length > 0 && (
        <div
          className="flex items-center border-t border-[color:var(--color-border)] animate-hero-3 container-px md:border-l md:col-start-1 md:row-start-2 md:justify-self-end md:w-[min(28vw,320px)]"
          style={{ gap: 'var(--space-7)', paddingBlock: 'var(--space-5)' }}
        >
          {meta.map(({ label, value }) => (
            <div key={label} className="flex flex-col" style={{ gap: 'var(--space-1)' }}>
              <span
                className="font-display uppercase text-[color:var(--color-muted)]"
                style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em' }}
              >
                {label}
              </span>
              <span
                className="font-body text-[color:var(--color-fg)]"
                style={{ fontSize: 'var(--text-small)' }}
              >
                {value}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Subtitle — col 1 on desktop */}
      {subtitle && (
        <div
          className="border-t border-[color:var(--color-border)] container-px animate-hero-3 md:col-start-1 md:col-span-2 md:row-start-3"
          style={{ paddingBlock: 'var(--space-6)', minHeight: 'var(--space-10)' }}
        >
          <p
            className="font-body text-[color:var(--color-muted)]"
            style={{ fontSize: 'var(--text-body)', lineHeight: 1.65, maxWidth: 'var(--container-prose)' }}
          >
            {subtitle}
          </p>
        </div>
      )}


    </section>
  )
}
