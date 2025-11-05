import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Self-Love Journal for Women - Complete KDP Blueprint',
  description: '30 Days of Daily Affirmations, Guided Prompts, and Self-Care Exercises to Build Confidence and Inner Strength',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
