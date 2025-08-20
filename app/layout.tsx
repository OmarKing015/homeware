import type { Metadata } from 'next'
import './globals.css'
import Script from 'next/script'
import {Analytics} from "@vercel/analytics/next"
import {SpeedInsights} from "@vercel/speed-insights/next"
import { inter, playfairDisplay } from '@/public/fonts'

export const metadata: Metadata = {
  title: {
    default: 'Talia - Wear Your Mood | Premium Custom Apparel',
    template: '%s | Talia'
  },
  description: 'Discover premium custom apparel at Talia. Wear your mood with our unique collection of customizable clothing. Fast shipping, secure checkout.',
  keywords: [
    'custom apparel',
    'personalized clothing',
    'premium fashion',
    'custom t-shirts',
    'design your own clothes',
    'mood clothing',
    'customizable fashion'
  ],
  authors: [{ name: 'Talia' }],
  creator: 'Talia',
  publisher: 'Talia',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://Talia.vercel.app', // Use canonical domain
 siteName: 'Talia', // Keep site name consistent
    title: 'Talia - Wear Your Mood | Premium Custom Apparel',
    description: 'Discover premium custom apparel at Talia. Wear your mood with our unique collection of customizable clothing.',
    images: [
      {
        url: 'https://Talia.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Talia - Wear Your Mood',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Talia - Wear Your Mood',
    description: 'Discover premium custom apparel at Talia. Wear your mood with our unique collection of customizable clothing.',
    images: ['https://Talia.vercel.app/og-image.jpg'], // Use same image as Open Graph for consistency and clarity
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://Talia.vercel.app',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfairDisplay.variable}`}>
      <Analytics/>
      <SpeedInsights/>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body>
        {children}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Talia",
              "url": "https://Talia.vercel.app",
              "description": "Premium custom apparel - Wear your mood",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://Talia.vercel.app/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </body>
    </html>
  )
}
