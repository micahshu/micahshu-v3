'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { ProposalLineItemResolved } from '@/lib/types'
import Button from '@/components/ui/Button'
import { BrowserBar } from '@/components/ui/BrowserBar'

function renderWithLinks(text: string) {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
  const parts: React.ReactNode[] = []
  let lastIndex = 0
  let match
  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index))
    parts.push(
      <a key={match.index} href={match[2]} target="_blank" rel="noopener noreferrer"
        style={{ color: 'var(--color-fg)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
        {match[1]}
      </a>
    )
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex))
  return parts
}

type AcceptStatus = 'idle' | 'submitting' | 'success' | 'error'

interface Props {
  slug: string
  clientName: string
  date: string
  expiresAt?: string
  status: string
  coverNote: string
  coverImage?: string
  coverImageUrl?: string
  previewUrl?: string
  currentSiteUrl?: string
  title?: string
  items: ProposalLineItemResolved[]
}

export default function ProposalView({ slug, clientName, date, expiresAt, coverNote, coverImage, coverImageUrl, previewUrl, currentSiteUrl, title, items }: Props) {
  const [checked, setChecked] = useState<Record<string, boolean>>(
    Object.fromEntries(items.map((item) => [item.key, item.defaultChecked]))
  )
  const [acceptStatus, setAcceptStatus] = useState<AcceptStatus>('idle')

  function toggle(key: string) {
    const item = items.find((i) => i.key === key)
    if (!item || item.required || bundledItemKeys.has(key)) return

    if (item.group) {
      const groupItems = items.filter((i) => i.group === item.group)
      const isCurrentlyChecked = checked[key]
      const willBeChecked = !(isCurrentlyChecked && item.groupOptional)

      setChecked((prev) => {
        const next = { ...prev }

        // Find the previously selected item in this group before changing
        const prevSelected = groupItems.find((gi) => prev[gi.key])

        // Apply radio selection
        groupItems.forEach((gi) => { next[gi.key] = false })
        if (willBeChecked) next[key] = true

        // Transfer linked add-on state from old selection to new selection
        const groupPeers = linkedAddOnsByGroup.get(item.group!) ?? []
        if (groupPeers.length > 0) {
          const oldPeer = prevSelected ? groupPeers.find((p) => p.peerOf === prevSelected.id) : null
          const newPeer = willBeChecked ? groupPeers.find((p) => p.peerOf === item.id) : null
          const addonWasOn = oldPeer ? prev[oldPeer.key] : false

          // Uncheck all peers of this group
          groupPeers.forEach((p) => { next[p.key] = false })
          // Re-check the new peer if the add-on was active and we're switching (not deselecting)
          if (newPeer && addonWasOn && !isCurrentlyChecked) next[newPeer.key] = true
        }

        return next
      })
    } else {
      setChecked((prev) => {
        const next = { ...prev, [key]: !prev[key] }
        // When checking an item that includes another, auto-check the included item
        if (item.includesItem && next[key]) {
          const included = items.find((i) => i.id === item.includesItem)
          if (included) next[included.key] = true
        }
        return next
      })
    }
  }

  // Separate into ordered groups, linked add-ons (peerOf), and standalones
  const groupOrder: string[] = []
  const groupMap = new Map<string, { label: string; description: string; optional: boolean; items: ProposalLineItemResolved[] }>()
  // Maps group key → peer add-on items whose peerOf points to an item in that group
  const linkedAddOnsByGroup = new Map<string, ProposalLineItemResolved[]>()
  const standaloneItems: ProposalLineItemResolved[] = []

  // Build an id→item lookup for resolving peerOf references
  const itemById = new Map<string, ProposalLineItemResolved>()
  for (const item of items) {
    if (item.id) itemById.set(item.id, item)
  }

  for (const item of items) {
    if (item.peerOf) {
      const peer = itemById.get(item.peerOf)
      if (peer?.group) {
        const existing = linkedAddOnsByGroup.get(peer.group) ?? []
        linkedAddOnsByGroup.set(peer.group, [...existing, item])
      }
    } else if (item.group) {
      if (!groupMap.has(item.group)) {
        groupOrder.push(item.group)
        groupMap.set(item.group, {
          label: item.groupLabel ?? item.name,
          description: item.groupDescription ?? item.description,
          optional: item.groupOptional ?? false,
          items: [],
        })
      }
      groupMap.get(item.group)!.items.push(item)
    } else {
      standaloneItems.push(item)
    }
  }

  // Items whose price is bundled into another checked item (shown as "Included", contribute $0)
  const bundledItemKeys = new Set<string>()
  for (const item of items) {
    if (item.includesItem && checked[item.key]) {
      const included = items.find((i) => i.id === item.includesItem)
      if (included) bundledItemKeys.add(included.key)
    }
  }

  const selectedItems = items.filter((item) => checked[item.key])
  const oneTimeItems = selectedItems.filter((i) => !i.isRecurring && !bundledItemKeys.has(i.key))
  const recurringItems = selectedItems.filter((i) => i.isRecurring && !bundledItemKeys.has(i.key))
  const oneTimeTotal = oneTimeItems.reduce((sum, i) => sum + i.price, 0)
  const recurringTotal = recurringItems.reduce((sum, i) => sum + i.price, 0)

  async function handleAccept() {
    setAcceptStatus('submitting')
    try {
      const res = await fetch('/api/proposals/accept', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug,
          items: selectedItems.map((i) => ({
            name: i.name,
            priceDisplay: i.priceDisplay,
            isRecurring: i.isRecurring,
            billingCycle: i.billingCycle,
          })),
        }),
      })
      setAcceptStatus(res.ok ? 'success' : 'error')
    } catch {
      setAcceptStatus('error')
    }
  }

  const displayTitle = (() => {
    if (title) return title
    const seen = new Set<string>()
    const names: string[] = []
    for (const item of items) {
      if (!item.recommended || item.peerOf) continue
      const label = item.group ? (item.groupLabel ?? item.name) : item.name
      if (!seen.has(label)) { seen.add(label); names.push(label) }
    }
    return names.join(' & ')
  })()

  const formattedDate = new Date(date + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  })
  const formattedExpiry = expiresAt
    ? new Date(expiresAt + 'T00:00:00').toLocaleDateString('en-US', {
        month: 'long', day: 'numeric', year: 'numeric',
      })
    : null

  return (
    <main id="main-content">

      {/* ── Header ── */}
      <section className="w-full border-b border-[color:var(--color-border)]">
        <div
          className="flex flex-col md:flex-row md:items-end justify-between"
          style={{ maxWidth: 'var(--container-max)', marginInline: 'auto', padding: 'var(--space-7)', gap: 'var(--space-6)' }}
        >
          <div className="flex flex-col animate-hero-1" style={{ gap: 'var(--space-4)' }}>
            <span
              className="font-display uppercase text-[color:var(--color-muted)]"
              style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em' }}
            >
              Proposal for {clientName}
            </span>
            <h1
              className="font-display uppercase text-[color:var(--color-fg)]"
              style={{ fontSize: 'var(--text-display)', letterSpacing: '-0.02em', lineHeight: 1 }}
            >
              {displayTitle}
            </h1>
          </div>

          <div className="flex flex-col items-start md:items-end animate-hero-2" style={{ gap: 'var(--space-3)' }}>
            <div className="flex flex-col items-start md:items-end" style={{ gap: 'var(--space-1)' }}>
              <span
                className="font-display uppercase text-[color:var(--color-muted)]"
                style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em' }}
              >
                Date
              </span>
              <span className="font-body text-[color:var(--color-fg)]" style={{ fontSize: 'var(--text-body)' }}>
                {formattedDate}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Cover note ── */}
      {coverNote && (
        <section className="w-full border-b border-[color:var(--color-border)] animate-hero-2">
          <div style={{ maxWidth: 'var(--container-max)', marginInline: 'auto', padding: 'var(--space-7)' }}>
            <div className="flex flex-col" style={{ maxWidth: 'var(--container-prose)', gap: 'var(--space-5)' }}>

              {coverImage && (
                <div className="flex flex-col" style={{ gap: 'var(--space-4)', marginBottom: 'var(--space-2)' }}>
                  <div className="w-full overflow-hidden border border-[color:var(--color-border)]">
                    <BrowserBar liveUrl={coverImageUrl} active={false} />
                    <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
                      <Image
                        src={coverImage}
                        alt="Current site preview"
                        fill
                        style={{ objectFit: 'cover', objectPosition: 'top' }}
                      />
                    </div>
                  </div>
                  {(previewUrl || currentSiteUrl) && (
                    <div className="flex flex-wrap" style={{ gap: 'var(--space-3)' }}>
                      {previewUrl && (
                        <a href={previewUrl} target="_blank" rel="noopener noreferrer">
                          <Button variant="solid" size="lg">View Full Preview ↗︎</Button>
                        </a>
                      )}
                      {currentSiteUrl && (
                        <a href={currentSiteUrl} target="_blank" rel="noopener noreferrer">
                          <Button variant="ghost" size="lg">Current Site ↗︎</Button>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              )}

              {coverNote.split('\n\n').map((para, i) => (
                <p
                  key={i}
                  className="font-body text-[color:var(--color-muted)]"
                  style={{ fontSize: 'var(--text-body)', lineHeight: 1.75 }}
                >
                  {renderWithLinks(para)}
                </p>
              ))}

            </div>
          </div>
        </section>
      )}

      {/* ── Line items ── */}
      <section className="w-full border-b border-[color:var(--color-border)] animate-hero-3">
        <div style={{ maxWidth: 'var(--container-max)', marginInline: 'auto' }}>

          <div
            className="border-b border-[color:var(--color-border-soft)]"
            style={{ padding: 'var(--space-5) var(--space-7)' }}
          >
            <span
              className="font-display uppercase text-[color:var(--color-muted)]"
              style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em' }}
            >
              Services
            </span>
          </div>

          {/* ── Grouped items (radio sections) ── */}
          {groupOrder.map((groupKey) => {
            const group = groupMap.get(groupKey)!
            const anySelected = group.items.some((i) => checked[i.key])

            return (
              <div
                key={groupKey}
                className="border-b border-[color:var(--color-border-soft)]"
                style={{ opacity: anySelected || group.optional ? 1 : 0.5, transition: 'opacity var(--duration-fast) var(--ease-inout)' }}
              >
                {/* Group header */}
                <div
                  className="flex items-start justify-between"
                  style={{ padding: 'var(--space-5) var(--space-7) var(--space-3)', gap: 'var(--space-6)' }}
                >
                  <div className="flex flex-col" style={{ gap: 'var(--space-2)' }}>
                    <div className="flex items-center" style={{ gap: 'var(--space-3)' }}>
                      <span
                        className="font-display uppercase text-[color:var(--color-fg)]"
                        style={{ fontSize: 'var(--text-h3)', letterSpacing: '-0.01em', lineHeight: 1 }}
                      >
                        {group.label}
                      </span>
                      {group.optional && (
                        <span
                          className="font-display uppercase text-[color:var(--color-muted)]"
                          style={{
                            fontSize: 'var(--text-caption)',
                            letterSpacing: '0.08em',
                            border: '1px solid var(--color-border-soft)',
                            borderRadius: 'var(--border-radius-sm)',
                            padding: '1px 6px',
                          }}
                        >
                          Optional
                        </span>
                      )}
                    </div>
                    <p
                      className="font-body text-[color:var(--color-muted)]"
                      style={{ fontSize: 'var(--text-small)', lineHeight: 1.55 }}
                    >
                      {group.description}
                    </p>
                  </div>
                </div>

                {/* Radio options */}
                {group.items.map((item) => {
                  const isChecked = checked[item.key]
                  return (
                    <div
                      key={item.key}
                      onClick={() => toggle(item.key)}
                      className="flex items-start justify-between"
                      style={{
                        padding: 'var(--space-3) var(--space-7) var(--space-3) calc(var(--space-7) + 28px)',
                        gap: 'var(--space-6)',
                        cursor: 'pointer',
                        borderTop: '1px solid var(--color-border-soft)',
                      }}
                    >
                      {/* Radio indicator */}
                      <div
                        className="shrink-0 flex items-center justify-center"
                        style={{
                          width: '18px',
                          height: '18px',
                          marginTop: '2px',
                          borderRadius: '50%',
                          border: `2px solid ${isChecked ? 'var(--color-fg)' : 'var(--color-border)'}`,
                          transition: 'border-color var(--duration-fast) var(--ease-inout)',
                          flexShrink: 0,
                          marginLeft: 'calc(-28px)',
                        }}
                      >
                        {isChecked && (
                          <div
                            style={{
                              width: '8px',
                              height: '8px',
                              borderRadius: '50%',
                              backgroundColor: 'var(--color-fg)',
                            }}
                          />
                        )}
                      </div>

                      {/* Label + note */}
                      <div className="flex flex-col flex-1" style={{ gap: 'var(--space-1)', minWidth: 0 }}>
                        <div className="flex items-center flex-wrap" style={{ gap: 'var(--space-3)' }}>
                          <span
                            className="font-display uppercase text-[color:var(--color-fg)]"
                            style={{ fontSize: 'var(--text-body)', letterSpacing: '0.02em', lineHeight: 1.2 }}
                          >
                            {item.tierLabel ?? item.name}
                          </span>
                          {item.recommended && (
                            <span
                              className="font-display uppercase"
                              style={{
                                fontSize: 'var(--text-caption)',
                                letterSpacing: '0.08em',
                                color: 'var(--color-fg)',
                                backgroundColor: 'var(--color-surface)',
                                borderRadius: 'var(--border-radius-sm)',
                                padding: '1px 6px',
                              }}
                            >
                              Recommended
                            </span>
                          )}
                        </div>
                        {item.note && (
                          <p
                            className="font-body text-[color:var(--color-muted)]"
                            style={{ fontSize: 'var(--text-small)', lineHeight: 1.5 }}
                          >
                            {item.note}
                          </p>
                        )}
                      </div>

                      {/* Price */}
                      <div className="flex items-baseline shrink-0" style={{ gap: 'var(--space-1)' }}>
                        <span
                          className="font-display uppercase text-[color:var(--color-fg)]"
                          style={{ fontSize: 'var(--text-h4)', letterSpacing: '-0.01em', lineHeight: 1 }}
                        >
                          {item.priceDisplay}
                        </span>
                        {item.isRecurring && item.billingCycle && (
                          <span
                            className="font-body text-[color:var(--color-muted)]"
                            style={{ fontSize: 'var(--text-caption)' }}
                          >
                            /{item.billingCycle === 'per month' ? 'mo' : item.billingCycle}
                          </span>
                        )}
                      </div>
                    </div>
                  )
                })}

                {/* Optional deselect hint */}
                {group.optional && anySelected && (
                  <div style={{ padding: 'var(--space-2) var(--space-7) var(--space-4)' }}>
                    <button
                      onClick={() => {
                        setChecked((prev) => {
                          const next = { ...prev }
                          group.items.forEach((i) => { next[i.key] = false })
                          return next
                        })
                      }}
                      className="font-body text-[color:var(--color-muted)] underline underline-offset-4"
                      style={{ fontSize: 'var(--text-caption)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                    >
                      Remove
                    </button>
                  </div>
                )}

                {/* ── Linked add-ons ── */}
                {(() => {
                  const addOns = linkedAddOnsByGroup.get(groupKey) ?? []
                  if (addOns.length === 0) return null

                  // Find the currently selected group item to know which peer is active
                  const selectedGroupItem = group.items.find((i) => checked[i.key])
                  if (!selectedGroupItem) return null

                  // Deduplicate by name — collect one representative peer per unique add-on name
                  const seen = new Set<string>()
                  const activeAddOns: ProposalLineItemResolved[] = []
                  for (const addOn of addOns) {
                    if (!seen.has(addOn.name)) {
                      seen.add(addOn.name)
                      // Find the peer that matches the current group selection
                      const activePeer = addOns.find((a) => a.name === addOn.name && a.peerOf === selectedGroupItem.id)
                      if (activePeer) activeAddOns.push(activePeer)
                    }
                  }

                  return (
                    <div style={{ borderTop: '1px solid var(--color-border-soft)' }}>
                      <div style={{ padding: 'var(--space-2) var(--space-7) var(--space-1)' }}>
                        <span
                          className="font-display uppercase text-[color:var(--color-muted)]"
                          style={{ fontSize: 'var(--text-caption)', letterSpacing: '0.08em' }}
                        >
                          Add-Ons
                        </span>
                      </div>
                      {activeAddOns.map((addOn) => {
                        const isChecked = checked[addOn.key]
                        return (
                          <div
                            key={addOn.key}
                            onClick={() => toggle(addOn.key)}
                            className="flex items-start justify-between"
                            style={{
                              padding: 'var(--space-3) var(--space-7)',
                              gap: 'var(--space-6)',
                              cursor: 'pointer',
                              opacity: isChecked ? 1 : 0.5,
                              transition: 'opacity var(--duration-fast) var(--ease-inout)',
                              borderTop: '1px solid var(--color-border-soft)',
                            }}
                          >
                            {/* Checkbox */}
                            <div
                              className="shrink-0 flex items-center justify-center"
                              style={{
                                width: '18px',
                                height: '18px',
                                marginTop: '2px',
                                border: `${isChecked ? 2 : 1}px solid ${isChecked ? 'var(--color-fg)' : 'var(--color-border)'}`,
                                borderRadius: 'var(--border-radius-sm)',
                                backgroundColor: isChecked ? 'var(--color-fg)' : 'transparent',
                                transition: 'all var(--duration-fast) var(--ease-inout)',
                                flexShrink: 0,
                              }}
                            >
                              {isChecked && (
                                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                  <path d="M1 3.5L3.5 6.5L9 1" stroke="var(--color-bg)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                            </div>

                            {/* Name + description + note */}
                            <div className="flex flex-col flex-1" style={{ gap: 'var(--space-1)', minWidth: 0 }}>
                              <span
                                className="font-display uppercase text-[color:var(--color-fg)]"
                                style={{ fontSize: 'var(--text-body)', letterSpacing: '0.02em', lineHeight: 1.2 }}
                              >
                                {addOn.name}
                              </span>
                              <p
                                className="font-body text-[color:var(--color-muted)]"
                                style={{ fontSize: 'var(--text-small)', lineHeight: 1.55 }}
                              >
                                {addOn.description}
                              </p>
                              {addOn.note && (
                                <p
                                  className="font-body"
                                  style={{ fontSize: 'var(--text-small)', lineHeight: 1.55, color: 'var(--color-muted)', fontStyle: 'italic' }}
                                >
                                  {addOn.note}
                                </p>
                              )}
                            </div>

                            {/* Price */}
                            <div className="flex items-baseline shrink-0" style={{ gap: 'var(--space-1)' }}>
                              <span
                                className="font-display uppercase text-[color:var(--color-fg)]"
                                style={{ fontSize: 'var(--text-h4)', letterSpacing: '-0.01em', lineHeight: 1 }}
                              >
                                +{addOn.priceDisplay}
                              </span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )
                })()}
              </div>
            )
          })}

          {/* ── Standalone items (checkboxes) ── */}
          {standaloneItems.map((item) => {
            const isChecked = checked[item.key]
            const isBundled = bundledItemKeys.has(item.key)
            const isLocked = item.required || isBundled
            return (
              <div
                key={item.key}
                onClick={() => !isLocked && toggle(item.key)}
                className="flex items-start justify-between border-b border-[color:var(--color-border-soft)]"
                style={{
                  padding: 'var(--space-5) var(--space-7)',
                  gap: 'var(--space-6)',
                  cursor: isLocked ? 'default' : 'pointer',
                  opacity: isChecked ? 1 : 0.45,
                  transition: 'opacity var(--duration-fast) var(--ease-inout)',
                }}
              >
                {/* Checkbox */}
                <div
                  className="shrink-0 flex items-center justify-center"
                  style={{
                    width: '18px',
                    height: '18px',
                    marginTop: '2px',
                    border: `${isChecked ? 2 : 1}px solid ${isChecked ? 'var(--color-fg)' : 'var(--color-border)'}`,
                    borderRadius: 'var(--border-radius-sm)',
                    backgroundColor: isChecked ? 'var(--color-fg)' : 'transparent',
                    transition: 'all var(--duration-fast) var(--ease-inout)',
                    flexShrink: 0,
                  }}
                >
                  {isChecked && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 3.5L3.5 6.5L9 1" stroke="var(--color-bg)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>

                {/* Name + description + note */}
                <div className="flex flex-col flex-1" style={{ gap: 'var(--space-2)', minWidth: 0 }}>
                  <div className="flex items-center flex-wrap" style={{ gap: 'var(--space-3)' }}>
                    <span
                      className="font-display uppercase text-[color:var(--color-fg)]"
                      style={{ fontSize: 'var(--text-h3)', letterSpacing: '-0.01em', lineHeight: 1 }}
                    >
                      {item.name}
                    </span>
                    {item.required && (
                      <span
                        className="font-display uppercase text-[color:var(--color-muted)]"
                        style={{
                          fontSize: 'var(--text-caption)',
                          letterSpacing: '0.08em',
                          border: '1px solid var(--color-border-soft)',
                          borderRadius: 'var(--border-radius-sm)',
                          padding: '1px 6px',
                        }}
                      >
                        Required
                      </span>
                    )}
                  </div>
                  <p
                    className="font-body text-[color:var(--color-muted)]"
                    style={{ fontSize: 'var(--text-small)', lineHeight: 1.55 }}
                  >
                    {item.description}
                  </p>
                  {item.note && (
                    <p
                      className="font-body"
                      style={{ fontSize: 'var(--text-small)', lineHeight: 1.55, color: 'var(--color-muted)', fontStyle: 'italic' }}
                    >
                      {item.note}
                    </p>
                  )}
                </div>

                {/* Price — show "Included" when bundled by another item */}
                <div className="flex items-baseline shrink-0" style={{ gap: 'var(--space-1)' }}>
                  {isBundled ? (
                    <span
                      className="font-display uppercase text-[color:var(--color-muted)]"
                      style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em' }}
                    >
                      Included
                    </span>
                  ) : (
                    <>
                      <span
                        className="font-display uppercase text-[color:var(--color-fg)]"
                        style={{ fontSize: 'var(--text-h3)', letterSpacing: '-0.01em', lineHeight: 1 }}
                      >
                        {item.priceDisplay}
                      </span>
                      {item.isRecurring && item.billingCycle && (
                        <span className="font-body text-[color:var(--color-muted)]" style={{ fontSize: 'var(--text-caption)' }}>
                          /{item.billingCycle === 'per month' ? 'mo' : item.billingCycle}
                        </span>
                      )}
                    </>
                  )}
                </div>
              </div>
            )
          })}

        </div>
      </section>

      {/* ── Summary + Accept ── */}
      <section className="w-full animate-hero-4">
        <div
          className="flex flex-col md:flex-row md:items-start justify-between"
          style={{ maxWidth: 'var(--container-max)', marginInline: 'auto', padding: 'var(--space-7)', gap: 'var(--space-7)' }}
        >
          {/* Totals */}
          <div className="flex flex-col" style={{ gap: 'var(--space-5)' }}>
            <span
              className="font-display uppercase text-[color:var(--color-muted)]"
              style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em' }}
            >
              Summary
            </span>

            {selectedItems.length === 0 ? (
              <p className="font-body text-[color:var(--color-muted)]" style={{ fontSize: 'var(--text-body)' }}>
                No services selected.
              </p>
            ) : (
              <div className="flex" style={{ gap: 'var(--space-8)' }}>
                {oneTimeItems.length > 0 && (
                  <div className="flex flex-col" style={{ gap: 'var(--space-1)' }}>
                    <span
                      className="font-display uppercase text-[color:var(--color-muted)]"
                      style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em' }}
                    >
                      One-Time
                    </span>
                    <span
                      className="font-display uppercase text-[color:var(--color-fg)]"
                      style={{ fontSize: 'var(--text-h1)', letterSpacing: '-0.01em', lineHeight: 1 }}
                    >
                      ${oneTimeTotal.toLocaleString()}
                    </span>
                  </div>
                )}
                {recurringItems.length > 0 && (
                  <div className="flex flex-col" style={{ gap: 'var(--space-1)' }}>
                    <span
                      className="font-display uppercase text-[color:var(--color-muted)]"
                      style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em' }}
                    >
                      Monthly
                    </span>
                    <div className="flex items-baseline" style={{ gap: 'var(--space-1)' }}>
                      <span
                        className="font-display uppercase text-[color:var(--color-fg)]"
                        style={{ fontSize: 'var(--text-h1)', letterSpacing: '-0.01em', lineHeight: 1 }}
                      >
                        ${recurringTotal.toLocaleString()}
                      </span>
                      <span className="font-body text-[color:var(--color-muted)]" style={{ fontSize: 'var(--text-small)' }}>
                        /mo
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Accept */}
          <div className="flex flex-col items-start md:items-end" style={{ gap: 'var(--space-4)' }}>
            {acceptStatus === 'success' ? (
              <div className="flex flex-col items-start md:items-end" style={{ gap: 'var(--space-3)' }}>
                <p
                  className="font-display uppercase text-[color:var(--color-fg)]"
                  style={{ fontSize: 'var(--text-h2)', letterSpacing: '-0.01em', lineHeight: 1 }}
                >
                  Proposal Accepted
                </p>
                <p
                  className="font-body text-[color:var(--color-muted)]"
                  style={{ fontSize: 'var(--text-body)', lineHeight: 1.65, textAlign: 'right', maxWidth: '320px' }}
                >
                  I've been notified and will follow up within one business day to get things moving.
                </p>
              </div>
            ) : (
              <>
                <p
                  className="font-body text-[color:var(--color-muted)]"
                  style={{ fontSize: 'var(--text-small)', lineHeight: 1.65, textAlign: 'right', maxWidth: '320px' }}
                >
                  By accepting, you confirm the selected services and authorize me to proceed.
                </p>
                <Button
                  variant="solid"
                  size="md"
                  onClick={handleAccept}
                  disabled={acceptStatus === 'submitting' || selectedItems.length === 0}
                  style={{
                    opacity: acceptStatus === 'submitting' || selectedItems.length === 0 ? 0.5 : 1,
                    cursor: acceptStatus === 'submitting' || selectedItems.length === 0 ? 'not-allowed' : 'pointer',
                  }}
                >
                  {acceptStatus === 'submitting' ? 'Sending…' : 'Accept Proposal ↗︎'}
                </Button>
                {acceptStatus === 'error' && (
                  <p className="font-body text-[color:var(--color-muted)]" style={{ fontSize: 'var(--text-small)' }}>
                    Something went wrong — reach out directly to accept.
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </section>

    </main>
  )
}
