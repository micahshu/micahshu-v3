import Image from 'next/image'
import { ComponentProps } from 'react'

type Props = ComponentProps<typeof Image> & {
  hoverSrc?: string
  groupHover?: boolean
  reveal?: boolean
}

export function RevealImage({ hoverSrc, groupHover: _groupHover, reveal, ...props }: Props) {
  if (hoverSrc) {
    return (
      <div className={props.fill ? 'absolute inset-0' : 'relative'}>
        <Image {...props} />
      </div>
    )
  }

  if (reveal) {
    return (
      <Image
        {...props}
        className={[
          'opacity-0 group-hover:opacity-100',
          'transition-opacity duration-[150ms] ease-in-out',
          props.className ?? '',
        ].join(' ')}
      />
    )
  }

  return <Image {...props} />
}
