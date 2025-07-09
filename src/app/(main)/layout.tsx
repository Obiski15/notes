import type { Metadata } from "next"

import Header from "@/components/header/Header"
import Sidebar from "@/components/sidebar/Sidebar"

import "../../styles/_keyframe-animations.scss"
import "../../styles/_variables.scss"

import Protected from "@/components/auth/Protected"
import NoteLocationProvider from "@/providers/note-location-provider"

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
    <Protected>
      <NoteLocationProvider>
        <div className="grid h-screen grid-cols-12 gap-5 overflow-hidden">
          <div className="max-lg:hidden lg:col-span-3">
            <Sidebar />
          </div>

          <div className="col-span-12 h-full lg:col-span-9">
            <Header />
            {children}
          </div>
        </div>
      </NoteLocationProvider>
    </Protected>
  )
}
