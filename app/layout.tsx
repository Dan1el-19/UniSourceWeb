import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono, Manrope } from "next/font/google"

import { cn } from "@/lib/utils"

import "./globals.css"

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontHeading = Manrope({
  subsets: ["latin"],
  variable: "--font-heading",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const title = "UniSource — Private. Seamless. Ecosystem."
const description =
  "A private, seamless ecosystem designed around your data, infrastructure and experience."

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "UniSource",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f3f2ee",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "antialiased",
        fontSans.variable,
        fontMono.variable,
        fontHeading.variable
      )}
    >
      <body>{children}</body>
    </html>
  )
}
