import { HTMLAttributes } from 'react'

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'default' | 'tight' | 'prose'
}

export default function Container({
  size = 'default',
  className = '',
  style,
  children,
  ...props
}: ContainerProps) {
  const maxWidth = {
    default: 'var(--container-max)',
    tight:   'var(--container-tight)',
    prose:   'var(--container-prose)',
  }[size]

  return (
    <div
      className={`container-px mx-auto w-full ${className}`}
      style={{ maxWidth, ...style }}
      {...props}
    >
      {children}
    </div>
  )
}
