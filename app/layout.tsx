import type { Metadata } from 'next'
import { Manrope, Inter, Space_Grotesk } from 'next/font/google'
import { AuthProvider } from '@/lib/AuthContext'
import { ModalProvider } from '@/lib/ModalContext'
import { Navbar } from '@/components/home/Navbar'
import { Footer } from '@/components/home/CTABannerAndFooter'
import { ScrollProgressBar } from '@/components/layout/ScrollProgressBar'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
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
    <html lang="en" className={`${manrope.variable} ${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-body text-heading bg-white antialiased">
        <AuthProvider>
          <ModalProvider>
            <ScrollProgressBar />
            <Navbar />
            {children}
            <Footer />
          </ModalProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
