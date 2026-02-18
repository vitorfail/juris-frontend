import type { Metadata, Viewport } from 'next'
import { Roboto } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
import { CrmLayout } from '@/components/crm-layout'
import './globals.css'

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
})

export const metadata: Metadata = {
  title: 'LexCRM - Gestao Juridica',
  description: 'Sistema de gestao para escritorios de advocacia',
}

export const viewport: Viewport = {
  themeColor: "#1a2332",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${roboto.variable} font-sans antialiased`}>
        <CrmLayout>
          {children}
        </CrmLayout>
        <Toaster richColors position="top-right" />
        <Analytics />
      </body>
    </html>
  )
}
