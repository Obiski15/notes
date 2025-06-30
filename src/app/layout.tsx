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
import RecentNotesProvider from "@/providers/recent-notes-provider"
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
      <body
        className={`${sourceSans.variable} mx-auto min-w-[250px] max-w-[1440px] overflow-hidden antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            <NoteLocationProvider>
              <RecentNotesProvider>
                <div className="grid h-screen grid-cols-12 gap-5 overflow-hidden">
                  <div className="max-lg:hidden lg:col-span-3">
                    <Sidebar />
                  </div>

                  <div className="col-span-12 h-full lg:col-span-9">
                    <Header />
                    {children}
                  </div>
                </div>
                <Toaster position="top-center" />
              </RecentNotesProvider>
            </NoteLocationProvider>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
