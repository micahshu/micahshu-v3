import { notFound, redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import type { Metadata } from 'next'
import { proposals } from '@/lib/data/proposals'
import { services } from '@/lib/data/services'
import { alaCarteServices } from '@/lib/data/alacarte'
import { parsePrice, formatPrice } from '@/lib/utils'
import type { ProposalLineItemResolved } from '@/lib/types'
import ProposalView from '@/components/sections/ProposalView'

export const metadata: Metadata = {
  title: 'Proposal',
  robots: { index: false, follow: false },
}

export default async function ProposalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const proposal = proposals.find((p) => p.slug === slug)
  if (!proposal) notFound()

  // Double-check auth cookie server-side (middleware only checks existence)
  const cookieStore = await cookies()
  const authCookie = cookieStore.get(`proposal_auth_${slug}`)
  if (!authCookie || authCookie.value !== proposal.passphrase) {
    redirect(`/proposals/${slug}/unlock`)
  }

  const resolvedItems: ProposalLineItemResolved[] = proposal.items.map((item, index) => {
    if (item.type === 'service') {
      const service = services.find((s) => s.slug === item.slug)
      if (!service) throw new Error(`Service not found: ${item.slug}`)

      let price: number
      let priceDisplay: string

      if (item.customPrice != null) {
        price = item.customPrice
        priceDisplay = formatPrice(item.customPrice)
      } else if (item.pricingOptionLabel && service.pricingOptions) {
        const option = service.pricingOptions.find((o) => o.label === item.pricingOptionLabel)
        price = option ? parsePrice(option.price) : parsePrice(service.startingAt)
        priceDisplay = option ? option.price : service.startingAt
      } else {
        price = parsePrice(service.startingAt)
        priceDisplay = service.startingAt
      }

      // isRecurring: group items and standalone services follow priceDisplay; peer add-ons follow pricingOptionLabel
      const isRecurring = item.group
        ? priceDisplay.includes('/mo')
        : item.peerOf
        ? item.pricingOptionLabel === 'Monthly'
        : priceDisplay.includes('/mo')

      const resolvedPriceDisplay = isRecurring && item.peerOf && !priceDisplay.includes('/mo')
        ? priceDisplay + '/mo'
        : priceDisplay

      const defaultChecked = item.required
        ? true
        : item.group
        ? (item.recommended ?? false)
        : item.peerOf
        ? false
        : (item.recommended ?? true)

      return {
        key: item.id ?? `${item.type}-${item.slug}-${index}`,
        type: 'service',
        slug: item.slug,
        id: item.id,
        peerOf: item.peerOf,
        name: item.customName ?? (item.pricingOptionLabel ? `${service.name} — ${item.pricingOptionLabel}` : service.name),
        description: item.customDescription ?? service.hook,
        price,
        priceDisplay: resolvedPriceDisplay,
        isRecurring,
        billingCycle: undefined,
        required: item.required ?? false,
        recommended: item.recommended,
        defaultChecked,
        note: item.note,
        group: item.group,
        groupOptional: item.groupOptional,
        groupLabel: item.group ? service.name : undefined,
        groupDescription: item.group ? (item.customDescription ?? service.hook) : undefined,
        tierLabel: item.group ? (item.pricingOptionLabel ?? item.customName ?? service.name) : undefined,
        includesItem: item.includesItem,
      }
    } else {
      const alacarte = alaCarteServices.find((a) => a.slug === item.slug)
      if (!alacarte) throw new Error(`À la carte service not found: ${item.slug}`)

      const price = item.customPrice ?? parsePrice(alacarte.price)
      const priceDisplay = item.customPrice ? formatPrice(item.customPrice) : alacarte.price
      const isRecurring = !['one-time', ''].includes(alacarte.billingCycle)

      return {
        key: item.id ?? `${item.type}-${item.slug}-${index}`,
        type: 'alacarte',
        slug: item.slug,
        id: item.id,
        peerOf: item.peerOf,
        name: item.customName ?? alacarte.name,
        description: item.customDescription ?? alacarte.hook,
        price,
        priceDisplay,
        isRecurring,
        billingCycle: isRecurring ? alacarte.billingCycle : undefined,
        required: item.required ?? false,
        defaultChecked: item.required ? true : (item.recommended ?? false),
        note: item.note,
        includesItem: item.includesItem,
      }
    }
  })

  return (
    <ProposalView
      slug={proposal.slug}
      clientName={proposal.clientName}
      date={proposal.date}
      expiresAt={proposal.expiresAt}
      status={proposal.status}
      coverNote={proposal.coverNote}
      coverImage={proposal.coverImage}
      coverImageUrl={proposal.coverImageUrl}
      previewUrl={proposal.previewUrl}
      title={proposal.title}
      items={resolvedItems}
    />
  )
}
