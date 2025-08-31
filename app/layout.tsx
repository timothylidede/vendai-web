import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: "vendai - The AI Retail Platform",
  description:
    "Transform your minimart with AI-powered inventory management, direct distributor connections, and smart business insights. Free for minimarts.",
  generator: "v0.app",
  keywords: "AI retail, minimart management, inventory system, Kenya retail, distributor network",
  authors: [{ name: "vendai Team" }],
  icons: {
    icon: "/logo-icon.png",
  },
  openGraph: {
    title: "vendai - AI that runs the shop for you",
    description:
      "Inventory, restocking & direct distributor orders — powered by an LLM OS that speaks your shop's language.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "vendai - AI-Powered Retail Platform",
    description: "Transform your minimart with AI-powered inventory management and direct distributor connections.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
  <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Suspense fallback={null}>{children}</Suspense>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
