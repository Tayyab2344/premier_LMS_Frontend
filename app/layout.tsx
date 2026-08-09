import type { Metadata } from 'next'
import { Merriweather, Inter, Space_Grotesk } from 'next/font/google'
import { AuthProvider } from '@/lib/AuthContext'
import { ModalProvider } from '@/lib/ModalContext'
import { Navbar } from '@/components/home/Navbar'
import { Footer } from '@/components/home/CTABannerAndFooter'
import { ScrollProgressBar } from '@/components/layout/ScrollProgressBar'
import { LenisProvider } from '@/components/providers/LenisProvider'
import './globals.css'

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-heading',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-number',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Premier LMS | Professional Education Platform by Raja Gulfam',
  description:
    'Master taxation, accounting, corporate finance, and forensic audit with live interactive masterclasses and accredited certifications instructed by Raja Gulfam.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${merriweather.variable} ${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-body text-heading bg-premier-cream antialiased">
        <LenisProvider>
          <AuthProvider>
            <ModalProvider>
              <ScrollProgressBar />
              <Navbar />
              {children}
              <Footer />
            </ModalProvider>
          </AuthProvider>
        </LenisProvider>
      </body>
    </html>
  )
}
