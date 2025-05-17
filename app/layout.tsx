import type React from "react"
import type { Metadata } from "next"
import { Amiri, Nunito } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" })
const amiri = Amiri({ weight: ["400", "700"], subsets: ["arabic"], variable: "--font-amiri" })

export const metadata: Metadata = {
  title: "Shariah Audit Assistant",
  description: "Automated Islamic Finance Compliance Checker",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className={`${nunito.variable} ${amiri.variable} font-nunito`}>
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
