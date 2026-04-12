'use client'

interface ModeToggleProps {
  isDark: boolean
  onToggle: () => void
}

// Matches the visual style of src/components/ui/ThemeToggle.tsx
export function ModeToggle({ isDark, onToggle }: ModeToggleProps) {
  return (
    <button
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      style={{
        display:          'inline-flex',
        alignItems:       'center',
        width:            40,
        height:           22,
        padding:          3,
        background:       'var(--color-bg)',
        border:           '1px solid var(--color-border)',
        borderRadius:     'var(--border-radius-md)',
        cursor:           'pointer',
        flexShrink:       0,
        appearance:       'none',
        WebkitAppearance: 'none',
        outline:          'none',
      }}
    >
      <span
        style={{
          display:      'block',
          width:        16,
          height:       16,
          background:   'var(--color-fg)',
          borderRadius: 'var(--border-radius-sm)',
          // 40px track − 3px×2 padding − 16px thumb = 18px travel
          transform:    isDark ? 'translateX(18px)' : 'translateX(0)',
          transition:   `transform 400ms var(--ease-inout)`,
          willChange:   'transform',
        }}
      />
    </button>
  )
}
