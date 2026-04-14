import PageHero from '@/components/ui/PageHero'
import { RevealImage } from '@/components/ui/RevealImage'
import { getYearsExperience, toWord } from '@/lib/utils'

const yearsWord = toWord(getYearsExperience())

const subtitle = (
  <>
    {yearsWord} years in agencies taught me one thing:<br />
    the best work happens when there&apos;s no one between the developer and the client.<br />
    <span style={{ color: 'var(--color-fg)' }}>That&apos;s the model now.</span>
  </>
)

const EXPERTISE = [
  {
    index: '01',
    title: 'Full-Stack Web Apps',
    category: 'Development',
  },
  {
    index: '02',
    title: 'WordPress & Headless CMS',
    category: 'Development',
  },
  {
    index: '03',
    title: 'Tools & Automation',
    category: 'Development',
  },
  {
    index: '04',
    title: 'Local SEO',
    category: 'Marketing',
  },
]

export default function AboutPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Micah Shu"
        title="Full Stack Developer"
        subtitle={subtitle}
        image={{
          src: '/images/micah.webp',
          alt: 'Micah Shu',
          hoverSrc: '/images/silly_micah.webp',
        }}
        meta={[
          { label: 'Based in', value: 'Berthoud, CO' },
          { label: 'Status', value: 'Available' },
        ]}
      />

      {/* Story section */}
      <section className="w-full border-b border-[color:var(--color-border)]">
        <div
          style={{
            maxWidth: 'var(--container-max)',
            marginInline: 'auto',
            padding: 'var(--space-7) var(--space-7) var(--space-9)',
          }}
        >
          {/* Eyebrow */}
          <span
            className="block font-display uppercase text-[color:var(--color-muted)]"
            style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em', marginBottom: 'var(--space-7)' }}
          >
            The Story
          </span>

          {/* Two-column grid */}
          <div
            className="flex flex-col min-[900px]:grid"
            style={{ gridTemplateColumns: '55fr 45fr', gap: 'var(--space-8)' }}
          >
            {/* Left: pull quote + body */}
            <div className="flex flex-col" style={{ gap: 'var(--space-6)' }}>
              <p
                className="font-display uppercase text-[color:var(--color-fg)]"
                style={{ fontSize: 'var(--text-display)', letterSpacing: '-0.02em', lineHeight: 1.05 }}
              >
                Lorem ipsum dolor sit amet consectetur adipiscing.
              </p>
              <p
                className="font-body text-[color:var(--color-muted)]"
                style={{ fontSize: 'var(--text-body)', lineHeight: 1.7 }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p
                className="font-body text-[color:var(--color-muted)]"
                style={{ fontSize: 'var(--text-body)', lineHeight: 1.7 }}
              >
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>

            {/* Right: image */}
            <div
              className="relative w-full border border-[color:var(--color-border)] overflow-hidden"
              style={{ aspectRatio: '4 / 5' }}
            >
              <RevealImage
                src="/images/family.webp"
                alt="Micah and family"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Expertise section */}
      <section className="w-full border-b border-[color:var(--color-border)]">
        <div
          style={{
            maxWidth: 'var(--container-max)',
            marginInline: 'auto',
            padding: 'var(--space-7) var(--space-7) var(--space-9)',
          }}
        >
          {/* Eyebrow */}
          <span
            className="block font-display uppercase text-[color:var(--color-muted)]"
            style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em', marginBottom: 'var(--space-5)' }}
          >
            Expertise
          </span>

          {/* Heading */}
          <h2
            className="font-display uppercase text-[color:var(--color-fg)]"
            style={{ fontSize: 'var(--text-display)', letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 'var(--space-7)' }}
          >
            What I Build
          </h2>

          {/* Rows */}
          <div className="flex flex-col">
            {EXPERTISE.map((item, i) => (
              <div
                key={item.index}
                className={`group flex items-center hover:border-[color:var(--color-border)] border-b border-[color:var(--color-border-soft)]${i === 0 ? ' border-t' : ''}`}
                style={{
                  paddingBlock: 'var(--space-4)',
                  gap: 'var(--space-4)',
                  transition: 'border-color var(--duration-fast) var(--ease-inout)',
                }}
              >
                {/* Index */}
                <span
                  className="font-display shrink-0 text-[color:var(--color-muted)]"
                  style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em', width: '28px' }}
                >
                  {item.index}
                </span>

                {/* Title */}
                <span
                  className="font-display uppercase text-[color:var(--color-fg)] flex-1 text-[length:var(--text-h2)] min-[1000px]:text-[length:var(--text-h1)]"
                  style={{ letterSpacing: '-0.01em', lineHeight: 1 }}
                >
                  {item.title}
                </span>

                {/* Category — desktop only */}
                <span
                  className="hidden min-[1000px]:block font-display uppercase text-[color:var(--color-muted)] shrink-0"
                  style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em' }}
                >
                  {item.category}
                </span>

                {/* Arrow */}
                <span
                  className="shrink-0 flex items-center justify-center border border-[color:var(--color-border)] group-hover:bg-[color:var(--color-fg)] group-hover:text-[color:var(--color-bg)]"
                  style={{
                    width: 'var(--space-7)',
                    height: 'var(--space-7)',
                    fontSize: 'var(--text-small)',
                    borderRadius: 'var(--border-radius-md)',
                    transition: 'background-color var(--duration-fast) var(--ease-inout), color var(--duration-fast) var(--ease-inout)',
                  }}
                >
                  ↗
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
