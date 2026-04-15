import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Micah Shu — Web Developer in Fort Collins, CO'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          backgroundColor: '#0A0A0A',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top rule */}
        <div style={{ width: '100%', height: '1px', backgroundColor: '#333' }} />

        {/* Main content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div
            style={{
              fontSize: '13px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#6B6B6B',
            }}
          >
            Fort Collins, CO — Available for projects
          </div>
          <div
            style={{
              fontSize: '96px',
              fontWeight: 700,
              color: '#F2F2F0',
              lineHeight: 1,
              letterSpacing: '-0.02em',
            }}
          >
            MICAH SHU
          </div>
          <div
            style={{
              fontSize: '28px',
              color: '#6B6B6B',
              fontWeight: 400,
              maxWidth: '600px',
              lineHeight: 1.4,
            }}
          >
            Freelance web developer for small businesses in Northern Colorado.
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ fontSize: '16px', color: '#6B6B6B' }}>micahshu.com</div>
          <div
            style={{
              fontSize: '13px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#6B6B6B',
            }}
          >
            Web Development
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
