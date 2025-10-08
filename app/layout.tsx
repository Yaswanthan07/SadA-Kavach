import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { I18nProvider } from "@/hooks/use-i18n"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "SadA Kavach - Smart Mining Safety Monitoring",
  description: "A Smart Safety Monitoring App for Mining Operations and Workers",
  generator: "A Next.js App",
  keywords: ["mining", "safety", "monitoring", "iot", "ppe", "worker safety"],
  authors: [{ name: "SadA Kavach Team" }],
  creator: "SadA Kavach Team",
  publisher: "SadA Kavach",
  robots: "index, follow",
  openGraph: {
    title: "SadA Kavach - Smart Mining Safety Monitoring",
    description: "Real-time safety monitoring for mining operations",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SadA Kavach - Smart Mining Safety Monitoring",
    description: "Real-time safety monitoring for mining operations",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
      <body className="font-sans min-h-[100svh]">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground animate-fade-in"
        >
          Skip to content
        </a>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="animate-pulse flex flex-col items-center">
                <div className="rounded-full bg-primary h-16 w-16 mb-4"></div>
                <div className="h-4 bg-muted rounded w-32"></div>
              </div>
            </div>
          }>
            <I18nProvider>{children}</I18nProvider>
          </Suspense>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}