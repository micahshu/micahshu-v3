interface TagProps {
  label: string
  active?: boolean
}

export function Tag({ label, active = false }: TagProps) {
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
        borderRadius: 'var(--border-radius-sm)',
      }}
    >
      {label}
    </span>
  )
}
