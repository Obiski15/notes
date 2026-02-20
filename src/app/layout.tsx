import type { Metadata } from "next"
import { Source_Sans_3 } from "next/font/google"

import "./globals.css"

import { Toaster } from "@/components/ui/sonner"
import KeyboardShortcutProvider from "@/providers/KeyboardShortcutProvider"
import ReactQueryProvider from "@/providers/ReactQueryProvider"
import { ThemeProvider } from "@/providers/theme-provider"

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "Notes",
    template: "Notes | %s",
  },
  description: "AI powered notes taking app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${sourceSans.variable} mx-auto min-w-[250px] max-w-[1440px] overflow-hidden antialiased`}
      >
        <KeyboardShortcutProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <ReactQueryProvider>{children}</ReactQueryProvider>
            <Toaster position="top-center" />
          </ThemeProvider>
        </KeyboardShortcutProvider>
      </body>
    </html>
  )
}
