import type { Metadata } from "next"
import { Source_Sans_3 } from "next/font/google"

import Header from "@/components/header/Header"
import Sidebar from "@/components/sidebar/Sidebar"

import "../styles/_keyframe-animations.scss"
import "../styles/_variables.scss"
import "./globals.css"

import { Toaster } from "@/components/ui/sonner"
import NoteLocationProvider from "@/providers/note-location-provider"
import ReactQueryProvider from "@/providers/ReactQueryProvider"
import { ThemeProvider } from "@/providers/theme-provider"

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Notes",
  description: "AI powered notes taking app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sourceSans.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            <NoteLocationProvider>
              <div className="grid h-screen grid-cols-12 gap-5 overflow-hidden">
                <Sidebar />
                <div className="col-span-9 h-full">
                  <Header />
                  {children}
                </div>
              </div>
              <Toaster position="top-center" />
            </NoteLocationProvider>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
