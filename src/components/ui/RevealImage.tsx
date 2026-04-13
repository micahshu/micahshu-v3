import Image from 'next/image'
import { ComponentProps } from 'react'

type Props = ComponentProps<typeof Image> & {
  hoverSrc?: string
  /** When true, greyscale lifts on parent group hover instead of self hover */
  groupHover?: boolean
  /** When true, image is hidden by default and reveals in full color on parent group hover */
  reveal?: boolean
}

export function RevealImage({ hoverSrc, groupHover, reveal, ...props }: Props) {
  if (hoverSrc) {
    return (
      <div className={`group ${props.fill ? 'absolute inset-0' : 'relative'}`}>
        <Image
          {...props}
          className={['grayscale', props.className ?? ''].join(' ')}
        />
        <Image
          {...props}
          src={hoverSrc}
          className={[
            'opacity-0 group-hover:opacity-100',
            'transition-opacity duration-[150ms] ease-in-out',
            props.className ?? '',
          ].join(' ')}
        />
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

  const hoverClass = groupHover ? 'group-hover:grayscale-0' : 'hover:grayscale-0'

  return (
    <Image
      {...props}
      className={[
        'grayscale',
        hoverClass,
        'transition-[filter] duration-[150ms] ease-in-out',
        props.className ?? '',
      ].join(' ')}
    />
  )
}
