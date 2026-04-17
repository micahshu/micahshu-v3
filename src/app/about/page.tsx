import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/JsonLd'
import { buildPersonSchema } from '@/lib/schema'
import PageHero from '@/components/ui/PageHero'
import { RevealImage } from '@/components/ui/RevealImage'
import Button from '@/components/ui/Button'
import CTASection from '@/components/sections/CTASection'
import BlogSection from '@/components/sections/BlogSection'
import { getYearsExperience, toWord } from '@/lib/utils'
const yearsWord = toWord(getYearsExperience())

export const metadata: Metadata = {
  title: 'About — Micah Shu | Web Developer in Fort Collins, CO',
  description: 'Full-stack developer based in Berthoud, CO. Building custom websites and web apps for small businesses in Fort Collins and Northern Colorado. One developer, your whole project.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About — Micah Shu | Web Developer in Fort Collins, CO',
    description: 'Full-stack developer based in Berthoud, CO. Building custom websites and web apps for small businesses in Fort Collins and Northern Colorado. One developer, your whole project.',
    url: 'https://micahshu.com/about',
    type: 'website',
  },
}

const subtitle = (
  <>
    Full-stack developer. Father of four.<br />
    <span style={{ color: 'var(--color-fg)' }}>Based in Berthoud, CO.</span>
  </>
)


const APPROACH = [
  {
    index: '01',
    title: 'Scope',
    body: 'I ask a lot of questions up front. The goal is no surprises — for either of us.',
  },
  {
    index: '02',
    title: 'Build',
    body: 'You see the work in stages. Real builds, not mockups — so feedback is grounded in something real.',
  },
  {
    index: '03',
    title: 'Launch',
    body: "I don't disappear at deploy. Handoff includes docs, credentials, and a conversation about what's next.",
  },
]

const EXPERTISE = [
  {
    index: '01',
    title: 'Full-Stack Web Apps',
    serviceHref: '/services/app-development',
  },
  {
    index: '02',
    title: 'WordPress & Headless CMS',
    serviceHref: '/services/web-development',
  },
  {
    index: '03',
    title: 'Tools & Automation',
    serviceHref: '/services/tooling-automation',
  },
  {
    index: '04',
    title: 'Local SEO',
    serviceHref: '/services/local-seo',
  },
]

export default function AboutPage() {
  return (
    <main id="main-content">
      <JsonLd schema={buildPersonSchema()} />
      <PageHero
        eyebrow="Micah Shu"
        title="Full Stack Developer"
        subtitle={subtitle}
        image={{
          src: '/images/hazel-me.webp',
          alt: 'Micah Shu',
          
        }}
        meta={[
          { label: 'Pictured', value: 'My newest web dev intern ↗' },
        ]}
        noBorderBottom
      />

      {/* Story section */}
      <section className="w-full border-t border-b border-[color:var(--color-border)] animate-hero-3">
        <div
          style={{
            maxWidth: 'var(--container-max)',
            marginInline: 'auto',
            padding: 'var(--space-7) var(--space-7) var(--space-9)',
          }}
        >
          {/* Eyebrow */}
          <span
            className="block font-display uppercase text-[color:var(--color-muted)] animate-hero-4"
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
                className="font-display uppercase text-[color:var(--color-fg)] animate-hero-5"
                style={{ fontSize: 'var(--text-display)', letterSpacing: '-0.02em', lineHeight: 1.05 }}
              >
                Agency trained. Freelance focused. Based in Berthoud.
              </p>
              <p
                className="font-body text-[color:var(--color-muted)]"
                style={{ fontSize: 'var(--text-body)', lineHeight: 1.7 }}
              >
                Full-stack cert from the University of Denver. First job at a marketing agency in Fort Collins — the kind of place where you scope the project, build it, and present it yourself. That grew into a tech lead role.
              </p>
              <p
                className="font-body text-[color:var(--color-muted)]"
                style={{ fontSize: 'var(--text-body)', lineHeight: 1.7 }}
              >
                Now I freelance for small businesses across Fort Collins and Northern Colorado. Same skills, no overhead. One developer who owns the whole thing — start to finish.
              </p>
              <p
                className="font-body text-[color:var(--color-muted)]"
                style={{ fontSize: 'var(--text-body)', lineHeight: 1.7 }}
              >
                Outside of work, life in Berthoud is quiet — the kids are not. Father of four, which means the weekends go fast and the coffee goes faster. Small town, good neighbors, short drive to everything that matters.
              </p>
              <div>
                <Link href="/resume">
                  <Button variant="ghost" size="sm">View Resume</Button>
                </Link>
              </div>
            </div>

            {/* Right: image */}
            <div
              className="relative w-full border border-[color:var(--color-border)] overflow-hidden animate-hero-6"
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
                className={`group relative flex items-center border-b border-[color:var(--color-border-soft)] hover:border-[color:var(--color-border)] hover:bg-[color:var(--color-surface)]${i === 0 ? ' border-t' : ''}`}
                style={{
                  paddingBlock: 'var(--space-4)',
                  gap: 'var(--space-4)',
                  transition: 'background-color var(--duration-fast) var(--ease-inout), border-color var(--duration-fast) var(--ease-inout)',
                }}
              >
                {/* Full-row link */}
                <Link href={item.serviceHref} className="absolute inset-0" aria-label={`View ${item.title} services`} />

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

                {/* Arrow indicator */}
                <span
                  className="shrink-0 pointer-events-none flex items-center justify-center border border-[color:var(--color-border)] text-[color:var(--color-fg)] group-hover:bg-[color:var(--color-fg)] group-hover:text-[color:var(--color-bg)]"
                  style={{
                    width: 'var(--space-7)',
                    height: 'var(--space-7)',
                    fontSize: 'var(--text-small)',
                    transition: 'background-color var(--duration-fast) var(--ease-inout), color var(--duration-fast) var(--ease-inout)',
                  }}
                >
                  ↗︎
                </span>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="flex justify-start" style={{ marginTop: 'var(--space-5)' }}>
            <Link href="/projects">
              <Button variant="ghost" size="sm">See all projects</Button>
            </Link>
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
              The stack fits the work. Not the other way around.
            </p>
            <div className="flex flex-col" style={{ gap: 'var(--space-5)', justifyContent: 'center' }}>
              <p
                className="font-body text-[color:var(--color-muted)]"
                style={{ fontSize: 'var(--text-body)', lineHeight: 1.7 }}
              >
                Next.js, Node, Tailwind — modern, well-documented, and easy to hand off when the project is done. Headless CMS when the client needs to own their content without owning the codebase.
              </p>
              <p
                className="font-body text-[color:var(--color-muted)]"
                style={{ fontSize: 'var(--text-body)', lineHeight: 1.7 }}
              >
                WordPress when the client needs to own their content. Python when the job is data. The stack fits the project — not the other way around.
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
            Process
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
