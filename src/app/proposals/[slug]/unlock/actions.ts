'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { proposals } from '@/lib/data/proposals'

export async function unlockProposal(
  slug: string,
  passphrase: string,
): Promise<{ error: string }> {
  const proposal = proposals.find((p) => p.slug === slug)

  if (!proposal || proposal.passphrase !== passphrase.trim()) {
    return { error: 'Incorrect passphrase.' }
  }

  const cookieStore = await cookies()
  cookieStore.set(`proposal_auth_${slug}`, passphrase.trim(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: `/proposals/${slug}`,
  })

  redirect(`/proposals/${slug}`)
}
