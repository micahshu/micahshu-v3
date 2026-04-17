import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)
const TO_EMAIL = process.env.CONTACT_TO_EMAIL!

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const { name, email, subject, message } = body as Record<string, unknown>

  // Validate required fields server-side — never trust client validation alone
  if (
    typeof name    !== 'string' || name.trim().length    === 0 ||
    typeof email   !== 'string' || email.trim().length   === 0 ||
    typeof message !== 'string' || message.trim().length === 0
  ) {
    return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 422 })
  }

  // Basic email format check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 422 })
  }

  const subjectLine = typeof subject === 'string' && subject.trim().length > 0
    ? subject.trim()
    : 'New contact form submission'

  const { error } = await resend.emails.send({
    from: 'Contact Form <me@micahshu.com>',
    to: TO_EMAIL,
    replyTo: email.trim(),
    subject: `[micahshu.com] ${subjectLine}`,
    text: [
      `Name:    ${name.trim()}`,
      `Email:   ${email.trim()}`,
      `Subject: ${subjectLine}`,
      '',
      message.trim(),
    ].join('\n'),
  })

  if (error) {
    console.error('[contact] Resend error:', error)
    return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
