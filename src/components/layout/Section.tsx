import { HTMLAttributes } from 'react'

interface SectionProps extends HTMLAttributes<HTMLElement> {
  border?: 'bottom' | 'top' | 'both' | 'none'
}

export default function Section({
  border = 'bottom',
  className = '',
  style,
  children,
  ...props
}: SectionProps) {
  const borderStyle = '1px solid var(--color-border)'

  return (
    <section
      className={`section-py ${className}`}
      style={{
        borderTop:    border === 'top'    || border === 'both' ? borderStyle : undefined,
        borderBottom: border === 'bottom' || border === 'both' ? borderStyle : undefined,
        ...style,
      }}
      {...props}
    >
      {children}
    </section>
  )
}
