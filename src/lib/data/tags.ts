import type { IconType } from 'react-icons'
import {
  SiPhp,
  SiTailwindcss,
  SiWordpress,
  SiNextdotjs,
  SiReact,
  SiPython,
} from 'react-icons/si'

export const TAG_ICONS: Record<string, IconType | null> = {
  'PHP':         SiPhp,
  'Tailwind':    SiTailwindcss,
  'WordPress':   SiWordpress,
  'Next.js':     SiNextdotjs,
  'React':       SiReact,
  'WooCommerce': SiWordpress,
  'Headless':    null,
  'Python':      SiPython,
}
