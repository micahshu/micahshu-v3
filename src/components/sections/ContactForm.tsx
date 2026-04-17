'use client'

import { useState, FormEvent } from 'react'
import Button from '@/components/ui/Button'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

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
  transition: `border-color var(--duration-fast) var(--ease-inout)`,
}

export default function ContactForm() {
  const [status, setStatus] = useState<FormState>('idle')
  const [fields, setFields] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setFields(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('submitting')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      })

      if (!res.ok) {
        setStatus('error')
        return
      }

      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div
        className="flex flex-col items-start justify-center h-full"
        style={{ gap: 'var(--space-4)', paddingBlock: 'var(--space-7)' }}
      >
        <span
          className="font-display uppercase text-[color:var(--color-muted)]"
          style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em' }}
        >
          Sent
        </span>
        <p
          className="font-display uppercase text-[color:var(--color-fg)]"
          style={{ fontSize: 'var(--text-h1)', letterSpacing: '-0.01em', lineHeight: 1.05 }}
        >
          Got it. I'll be in touch.
        </p>
        <p
          className="font-body text-[color:var(--color-muted)]"
          style={{ fontSize: 'var(--text-body)', lineHeight: 1.65 }}
        >
          Expect a reply within one business day.
        </p>
        <button
          onClick={() => { setStatus('idle'); setFields({ name: '', email: '', subject: '', message: '' }) }}
          className="font-body text-[color:var(--color-muted)] underline underline-offset-4"
          style={{ fontSize: 'var(--text-small)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col" style={{ gap: 'var(--space-5)' }} noValidate>
      {/* Name + Email row */}
      <div
        className="grid grid-cols-1 md:grid-cols-2"
        style={{ gap: 'var(--space-5)' }}
      >
        <Field label="Name" required>
          <input
            type="text"
            name="name"
            value={fields.name}
            onChange={handleChange}
            placeholder="Your name"
            required
            style={FIELD_STYLE}
            onFocus={e => { e.currentTarget.style.borderColor = 'var(--color-border)' }}
            onBlur={e => { e.currentTarget.style.borderColor = 'var(--color-border-soft)' }}
          />
        </Field>

        <Field label="Email" required>
          <input
            type="email"
            name="email"
            value={fields.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
            style={FIELD_STYLE}
            onFocus={e => { e.currentTarget.style.borderColor = 'var(--color-border)' }}
            onBlur={e => { e.currentTarget.style.borderColor = 'var(--color-border-soft)' }}
          />
        </Field>
      </div>

      {/* Subject */}
      <Field label="Subject">
        <input
          type="text"
          name="subject"
          value={fields.subject}
          onChange={handleChange}
          placeholder="What are you building?"
          style={FIELD_STYLE}
          onFocus={e => { e.currentTarget.style.borderColor = 'var(--color-border)' }}
          onBlur={e => { e.currentTarget.style.borderColor = 'var(--color-border-soft)' }}
        />
      </Field>

      {/* Message */}
      <Field label="Message" required>
        <textarea
          name="message"
          value={fields.message}
          onChange={handleChange}
          placeholder="Tell me about your project — scope, timeline, budget, whatever you've got."
          required
          rows={6}
          style={{ ...FIELD_STYLE, resize: 'vertical', lineHeight: 1.65 }}
          onFocus={e => { e.currentTarget.style.borderColor = 'var(--color-border)' }}
          onBlur={e => { e.currentTarget.style.borderColor = 'var(--color-border-soft)' }}
        />
      </Field>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between" style={{ gap: 'var(--space-4)' }}>
        <Button
          type="submit"
          variant="solid"
          size="md"
          disabled={status === 'submitting'}
          style={{ opacity: status === 'submitting' ? 0.6 : 1 }}
        >
          {status === 'submitting' ? 'Sending…' : 'Send Message ↗︎'}
        </Button>

        {status === 'error' && (
          <p
            className="font-body text-[color:var(--color-muted)]"
            style={{ fontSize: 'var(--text-small)' }}
          >
            Something went wrong — try emailing directly.
          </p>
        )}
      </div>
    </form>
  )
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col" style={{ gap: 'var(--space-2)' }}>
      <label
        className="font-display uppercase text-[color:var(--color-muted)]"
        style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em' }}
      >
        {label}{required && <span style={{ color: 'var(--color-muted)' }}> *</span>}
      </label>
      {children}
    </div>
  )
}
