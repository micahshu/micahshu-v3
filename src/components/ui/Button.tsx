'use client'

import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

const sizeStyles: Record<NonNullable<ButtonProps['size']>, React.CSSProperties> = {
  sm: { padding: 'var(--space-2) var(--space-3)', fontSize: 'var(--text-small)' },
  md: { padding: '14px 20px',                     fontSize: 'var(--text-body)' },
  lg: { padding: '16px 28px',                     fontSize: 'var(--text-h4)' },
}

export default function Button({
  variant = 'solid',
  size = 'md',
  className = '',
  style,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={[
        'font-body',
        'btn',
        `btn-${variant}`,
        className,
      ].join(' ')}
      style={{ ...sizeStyles[size], ...style }}
      {...props}
    >
      {children}
    </button>
  )
}
