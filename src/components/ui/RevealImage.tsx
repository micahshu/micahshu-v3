import Image from 'next/image'
import { ComponentProps } from 'react'

type Props = ComponentProps<typeof Image>

export function RevealImage(props: Props) {
  return (
    <Image
      {...props}
      className={[
        'grayscale hover:grayscale-0',
        'transition-[filter] duration-150 ease-in-out',
        props.className ?? '',
      ].join(' ')}
    />
  )
}
