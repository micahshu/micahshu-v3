import { TAG_ICONS } from '@/lib/data/tags'

interface TagProps {
  label: string
  active?: boolean
}

export function Tag({ label, active = false }: TagProps) {
  const Icon = TAG_ICONS[label] ?? null

  return (
    <span
      className={[
        'inline-flex items-center font-body uppercase border',
        active
          ? 'bg-[color:var(--color-fg)] text-[color:var(--color-bg)] border-[color:var(--color-border)]'
          : 'bg-[color:var(--color-surface)] text-[color:var(--color-fg)] border-[color:var(--color-border-soft)]',
      ].join(' ')}
      style={{
        fontSize: 'var(--text-caption)',
        letterSpacing: '0.08em',
        paddingBlock: 'var(--space-1)',
        paddingInline: 'var(--space-2)',
        gap: 'var(--space-1)',
      }}
    >
      {Icon && <Icon size={10} style={{ flexShrink: 0 }} />}
      {label}
    </span>
  )
}
