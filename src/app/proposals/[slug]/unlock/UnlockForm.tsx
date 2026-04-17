'use client'

import { useState, FormEvent } from 'react'
import { unlockProposal } from './actions'
import Button from '@/components/ui/Button'

const FIELD_STYLE: React.CSSProperties = {
  backgroundColor: 'var(--color-paper-pure)',
  border: '1px solid var(--color-border-soft)',
  borderRadius: 'var(--border-radius-md)',
  padding: 'var(--space-3) var(--space-4)',
  fontSize: 'var(--text-body)',
  color: 'var(--color-fg)',
  fontFamily: 'var(--font-body)',
  width: '100%',
  outline: 'none',
  transition: 'border-color var(--duration-fast) var(--ease-inout)',
}

export default function UnlockForm({ slug }: { slug: string }) {
  const [passphrase, setPassphrase] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const result = await unlockProposal(slug, passphrase)
    // If we get here, redirect didn't happen — show error
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col" style={{ gap: 'var(--space-5)', width: '100%', maxWidth: '400px' }}>
      <div className="flex flex-col" style={{ gap: 'var(--space-2)' }}>
        <label
          htmlFor="passphrase"
          className="font-display uppercase text-[color:var(--color-muted)]"
          style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em' }}
        >
          Passphrase
        </label>
        <input
          id="passphrase"
          type="password"
          value={passphrase}
          onChange={(e) => setPassphrase(e.target.value)}
          placeholder="Enter your passphrase"
          required
          autoFocus
          style={FIELD_STYLE}
          onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)' }}
          onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--color-border-soft)' }}
        />
        {error && (
          <p
            className="font-body"
            style={{ fontSize: 'var(--text-small)', color: 'var(--color-muted)' }}
          >
            {error}
          </p>
        )}
      </div>

      <Button
        type="submit"
        variant="solid"
        disabled={loading || !passphrase}
        style={{
          opacity: loading || !passphrase ? 0.5 : 1,
          cursor: loading || !passphrase ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Unlocking…' : 'View Proposal ↗︎'}
      </Button>
    </form>
  )
}
