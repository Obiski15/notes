import type { Metadata } from "next"

import Sidebar from "@/components/sidebar/Sidebar"

import "../../styles/_keyframe-animations.scss"
import "../../styles/_variables.scss"

import Protected from "@/components/auth/Protected"
import NoteLocationProvider from "@/providers/note-location-provider"

export const dynamic = "force-dynamic"

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
          {children}
        </div>
      </NoteLocationProvider>
    </Protected>
  )
}
