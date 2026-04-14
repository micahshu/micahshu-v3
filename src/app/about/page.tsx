import PageHero from '@/components/ui/PageHero'
import { RevealImage } from '@/components/ui/RevealImage'
import CTASection from '@/components/sections/CTASection'
import BlogSection from '@/components/sections/BlogSection'
import { getYearsExperience, toWord } from '@/lib/utils'
const yearsWord = toWord(getYearsExperience())

const subtitle = (
  <>
    Full-stack developer. Father of four.<br />
    <span style={{ color: 'var(--color-fg)' }}>Based in Berthoud, CO.</span>
  </>
)


const APPROACH = [
  {
    index: '01',
    title: 'Direct',
    body: 'One developer, one point of contact. From first conversation to final deploy.',
  },
  {
    index: '02',
    title: 'Opinionated',
    body: "I'll tell you what I think will work. You hired an expert, not an order-taker — expect a recommendation, not just a quote.",
  },
  {
    index: '03',
    title: 'Iterative',
    body: 'Work ships in stages. You see real progress early and often — not a big reveal at the end of a long build.',
  },
]

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
                Two agencies. {yearsWord} years. A family of six in Berthoud.
              </p>
              <p
                className="font-body text-[color:var(--color-muted)]"
                style={{ fontSize: 'var(--text-body)', lineHeight: 1.7 }}
              >
                Got a full-stack cert from the University of Denver, landed a job at a marketing agency in Fort Collins, and never really left the Front Range. The work grew into a tech lead role — and so did life outside of it.
              </p>
              <p
                className="font-body text-[color:var(--color-muted)]"
                style={{ fontSize: 'var(--text-body)', lineHeight: 1.7 }}
              >
                Agency work taught me how to scope a project, talk to clients, and ship under pressure. It also showed me what happens when you strip out the overhead. The work is still one developer, one problem. Everything else is noise.
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
      {/* Stack philosophy section */}
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
            Stack
          </span>

          {/* Two-column layout */}
          <div
            className="flex flex-col min-[900px]:grid"
            style={{ gridTemplateColumns: '1fr 1fr', gap: 'var(--space-8)' }}
          >
            <p
              className="font-display uppercase text-[color:var(--color-fg)]"
              style={{ fontSize: 'var(--text-h1)', letterSpacing: '-0.01em', lineHeight: 1.1 }}
            >
              Tools follow the problem.
            </p>
            <div className="flex flex-col" style={{ gap: 'var(--space-5)', justifyContent: 'center' }}>
              <p
                className="font-body text-[color:var(--color-muted)]"
                style={{ fontSize: 'var(--text-body)', lineHeight: 1.7 }}
              >
                React is home base — Next.js, Node, Tailwind. Mature, well-documented, and easy to hand off.
              </p>
              <p
                className="font-body text-[color:var(--color-muted)]"
                style={{ fontSize: 'var(--text-body)', lineHeight: 1.7 }}
              >
                But defaults aren&apos;t doctrine. WordPress when the client needs to own their content. Python when the problem is data. The stack fits the work, not the other way around.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Approach section */}
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
            Approach
          </span>

          {/* Heading */}
          <h2
            className="font-display uppercase text-[color:var(--color-fg)]"
            style={{ fontSize: 'var(--text-display)', letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 'var(--space-7)' }}
          >
            How I Work
          </h2>

          {/* Three-column grid */}
          <div
            className="grid grid-cols-1 md:grid-cols-3"
            style={{ borderTop: '1px solid var(--color-border)' }}
          >
            {APPROACH.map((item, i) => (
              <div
                key={item.index}
                className={`flex flex-col${i > 0 ? ' border-t md:border-t-0 md:border-l border-[color:var(--color-border)]' : ''}`}
                style={{ padding: 'var(--space-5)' }}
              >
                {/* Index */}
                <span
                  className="block font-display uppercase text-[color:var(--color-muted)]"
                  style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em', marginBottom: 'var(--space-4)' }}
                >
                  {item.index}
                </span>

                {/* Principle */}
                <span
                  className="block font-display uppercase text-[color:var(--color-fg)]"
                  style={{ fontSize: 'var(--text-h1)', letterSpacing: '-0.01em', lineHeight: 1, marginBottom: 'var(--space-4)' }}
                >
                  {item.title}
                </span>

                {/* Divider */}
                <div style={{ borderTop: '1px solid var(--color-border-soft)', marginBottom: 'var(--space-4)' }} />

                {/* Description */}
                <p
                  className="font-body text-[color:var(--color-muted)]"
                  style={{ fontSize: 'var(--text-small)', lineHeight: 1.65 }}
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <BlogSection />
    </main>
  )
}
