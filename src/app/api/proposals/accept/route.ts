import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'
import { proposals } from '@/lib/data/proposals'
import { cookies } from 'next/headers'

const resend = new Resend(process.env.RESEND_API_KEY)

interface AcceptedItem {
  name: string
  priceDisplay: string
  isRecurring: boolean
  billingCycle?: string
}

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const { slug, items } = body as { slug: unknown; items: unknown }

  if (typeof slug !== 'string' || !Array.isArray(items)) {
    return NextResponse.json({ error: 'Invalid payload.' }, { status: 422 })
  }

  const proposal = proposals.find((p) => p.slug === slug)
  if (!proposal) {
    return NextResponse.json({ error: 'Proposal not found.' }, { status: 404 })
  }

  // Validate auth cookie server-side
  const cookieStore = await cookies()
  const authCookie = cookieStore.get(`proposal_auth_${slug}`)
  if (!authCookie || authCookie.value !== proposal.passphrase) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  }

  const acceptedItems = items as AcceptedItem[]
  const oneTime = acceptedItems.filter((i) => !i.isRecurring)
  const recurring = acceptedItems.filter((i) => i.isRecurring)

  const itemLines = acceptedItems.map((item) => {
    const cycle = item.isRecurring && item.billingCycle ? ` ${item.billingCycle}` : ''
    return `  • ${item.name}: ${item.priceDisplay}${cycle}`
  })

  const oneTimeTotal = oneTime.reduce((sum, i) => {
    const num = parseInt(i.priceDisplay.replace(/[$,]/g, ''), 10) || 0
    return sum + num
  }, 0)

  const recurringTotal = recurring.reduce((sum, i) => {
    const num = parseInt(i.priceDisplay.replace(/[$,]/g, ''), 10) || 0
    return sum + num
  }, 0)

  const summaryLines = [
    oneTime.length > 0 ? `One-time total: $${oneTimeTotal.toLocaleString()}` : null,
    recurring.length > 0 ? `Monthly recurring: $${recurringTotal.toLocaleString()}/mo` : null,
  ].filter(Boolean)

  const { error } = await resend.emails.send({
    from: 'Proposals <me@micahshu.com>',
    to: 'me@micahshu.com',
    subject: `[Proposal Accepted] ${proposal.clientName} — ${slug}`,
    text: [
      `${proposal.clientName} has accepted proposal: ${slug}`,
      '',
      'Selected services:',
      ...itemLines,
      '',
      ...summaryLines,
    ].join('\n'),
  })

  if (error) {
    console.error('[proposals/accept] Resend error:', error)
    return NextResponse.json({ error: 'Failed to send notification.' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
