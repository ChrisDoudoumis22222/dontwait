// app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'dontwait.gr',
  description: 'Η λύση για τις online κρατήσεις σας',
  icons: {
    icon: 'https://i.ibb.co/DPmSsDrN/2025-02-10-203844.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="el">
      <body>{children}</body>
    </html>
  )
}
