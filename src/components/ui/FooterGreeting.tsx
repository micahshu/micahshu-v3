'use client'

import { useState, useEffect } from 'react'

const MESSAGES = [
  "hello (:",
  "why, hello there",
  "yoooo",
  "welcome back",
  "how's it going?",
  "what's up?",
  "hey hey hey",
  "hi there",
]

export default function FooterGreeting() {
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    setMessage(MESSAGES[Math.floor(Math.random() * MESSAGES.length)])
  }, [])

  if (!message) return null

  return (
    <p
      className="font-body text-[color:var(--color-muted)] whitespace-nowrap"
      style={{ fontSize: 'var(--text-caption)' }}
    >
      {message}
    </p>
  )
}
