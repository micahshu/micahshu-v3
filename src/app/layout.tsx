import type { Metadata } from 'next'
import { Funnel_Sans, Bebas_Neue } from 'next/font/google'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Analytics } from '@vercel/analytics/next'

const funnelSans = Funnel_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500', '600', '700', '800'],
})

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://micahshu.com'),
  title: {
    default: 'Micah Shu — Web Developer in Fort Collins, CO',
    template: '%s — Micah Shu',
  },
  description: 'Freelance web developer in Fort Collins and Northern Colorado.',
  openGraph: {
    siteName: 'Micah Shu',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${funnelSans.variable} ${bebasNeue.variable}`} suppressHydrationWarning>
      <head>
        {/* Prevent flash of wrong theme on load */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'){document.documentElement.classList.add('dark')}else if(t==='light'){document.documentElement.classList.add('light')}}catch(e){}})()`,
          }}
        />
      </head>
      <body>
        <Header />
        <div style={{ flex: 1 }}>{children}</div>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
