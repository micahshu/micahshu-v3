import Link from 'next/link'
import { SiGithub } from 'react-icons/si'
import { FaLinkedin } from 'react-icons/fa6'
import FooterGreeting from '@/components/ui/FooterGreeting'

const NAV_LINKS = [
  { href: '/about',    label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog',     label: 'Blog' },
  { href: '/contact',  label: 'Contact' },
]


const SOCIAL_LINKS = [
  { href: 'https://github.com/micahshu',   label: 'GitHub',   Icon: SiGithub },
  { href: 'https://linkedin.com/in/micahshu', label: 'LinkedIn', Icon: FaLinkedin },
]

export default function Footer() {
  return (
    <footer
      className="w-full border-t border-[color:var(--color-border)] mt-auto"
    >
      <div className="w-full flex flex-col-reverse md:flex-row md:items-stretch">
        {/* Left cell — social + copyright */}
        <div
          className="flex items-center shrink-0 border-t md:border-t-0 md:border-r border-[color:var(--color-border)]"
          style={{ paddingInline: 'var(--space-6)', paddingBlock: 'var(--space-5)', gap: 'var(--space-6)' }}
        >
          {/* Copyright */}
          <p
            className="font-body text-[color:var(--color-muted)] whitespace-nowrap"
            style={{ fontSize: 'var(--text-caption)' }}
          >
            © {new Date().getFullYear()} Micah Shu
          </p>

          {/* Social icons */}
          <div className="flex items-center" style={{ gap: 'var(--space-4)' }}>
            {SOCIAL_LINKS.map(({ href, label, Icon }) => (
              <a
                key={href}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center text-[color:var(--color-muted)] hover:text-[color:var(--color-fg)]"
                style={{ transition: `color var(--duration-fast) var(--ease-inout)` }}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Nav links cell */}
        <nav
          aria-label="Footer navigation"
          className="flex items-center justify-between flex-1 border-t md:border-t-0 md:border-r border-[color:var(--color-border)]"
          style={{ paddingInline: 'var(--space-6)', paddingBlock: 'var(--space-5)' }}
        >
          <FooterGreeting />
          <ul
            role="list"
            className="flex flex-wrap items-center justify-end list-none m-0 p-0"
            style={{ gap: 'var(--space-5)' }}
          >
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="font-display uppercase no-underline text-[color:var(--color-muted)] hover:text-[color:var(--color-fg)]"
                  style={{
                    fontSize: 'var(--text-label)',
                    letterSpacing: '0.08em',
                    transition: `color var(--duration-fast) var(--ease-inout)`,
                  }}
                >
                  {label.toUpperCase()}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logo cell */}
        <div
          className="flex items-center shrink-0"
          style={{ paddingInline: 'var(--space-6)', paddingBlock: 'var(--space-5)' }}
        >
          <Link
            href="/"
            aria-label="Micah Shu — Home"
            className="font-display text-[length:var(--text-h2)] text-[color:var(--color-fg)] no-underline"
            style={{ letterSpacing: '-0.01em', lineHeight: 1 }}
          >
            MS
          </Link>
        </div>
      </div>
    </footer>
  )
}
