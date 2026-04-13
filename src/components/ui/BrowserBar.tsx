interface BrowserBarProps {
  liveUrl?: string
  /**
   * When provided, dot colors are JS-controlled: true = colored, false = grey.
   * When omitted, dots respond to the nearest .group CSS hover.
   */
  active?: boolean
}

const DOT_COLORS = [
  { css: 'var(--color-mac-red)',    groupClass: 'group-hover:bg-[color:var(--color-mac-red)]' },
  { css: 'var(--color-mac-yellow)', groupClass: 'group-hover:bg-[color:var(--color-mac-yellow)]' },
  { css: 'var(--color-mac-green)',  groupClass: 'group-hover:bg-[color:var(--color-mac-green)]' },
]

function safeHostname(url?: string): string {
  if (!url) return '—'
  try {
    return new URL(url).hostname
  } catch {
    return '—'
  }
}

export function BrowserBar({ liveUrl, active }: BrowserBarProps) {
  const hostname = safeHostname(liveUrl)
  const jsControlled = active !== undefined

  return (
    <div
      className="flex items-center shrink-0 border-b border-[color:var(--color-border-soft)]"
      style={{
        height: '28px',
        background: 'var(--color-surface)',
        padding: '0 var(--space-3)',
        gap: 'var(--space-2)',
      }}
    >
      {/* Traffic light dots */}
      <div className="flex items-center" style={{ gap: '5px' }}>
        {DOT_COLORS.map(({ css, groupClass }, i) => (
          <span
            key={i}
            className={
              !jsControlled
                ? `bg-[color:var(--color-border-soft)] ${groupClass}`
                : undefined
            }
            style={{
              display: 'block',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: jsControlled
                ? active
                  ? css
                  : 'var(--color-border-soft)'
                : undefined,
              transition: 'background-color var(--duration-fast) var(--ease-inout)',
            }}
          />
        ))}
      </div>

      {/* URL pill */}
      <div className="flex flex-1 justify-center">
        <div
          className="flex items-center overflow-hidden"
          style={{
            height: '14px',
            background: 'var(--color-bg)',
            borderRadius: 'var(--border-radius-sm)',
            padding: '0 var(--space-2)',
            maxWidth: '180px',
            width: '100%',
          }}
        >
          <span
            className="font-body text-[color:var(--color-muted)] truncate"
            style={{ fontSize: '10px', lineHeight: 1 }}
          >
            {hostname}
          </span>
        </div>
      </div>
    </div>
  )
}
