import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NextAuthSessionProvider from '@/components/NextAuthSessionProvider'
import { LikeProvider } from '@/providers/LikeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CGAfrica Gallery',
  description: 'Digital art gallery showcasing amazing creative works',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthSessionProvider>
          <LikeProvider>
            {children}
          </LikeProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  )
}