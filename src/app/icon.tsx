import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default async function Icon() {
  const css = await fetch('https://fonts.googleapis.com/css2?family=Bebas+Neue').then(r => r.text())
  const fontUrl = css.match(/url\(([^)]+)\)/)?.[1]
  const fontData = fontUrl
    ? await fetch(fontUrl).then(r => r.arrayBuffer())
    : null

  return new ImageResponse(
    (
      <div
        style={{
          width: '32px',
          height: '32px',
          backgroundColor: '#0A0A0A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            fontFamily: fontData ? 'Bebas Neue' : 'sans-serif',
            fontWeight: 400,
            fontSize: '20px',
            color: '#F2F2F0',
            letterSpacing: '-0.01em',
            lineHeight: 1,
          }}
        >
          MS
        </span>
      </div>
    ),
    {
      ...size,
      fonts: fontData
        ? [{ name: 'Bebas Neue', data: fontData, style: 'normal' }]
        : [],
    }
  )
}
