"use client"

import { useRef } from "react"

import Editor from "../editor/Editor"
import Header from "../header/Header"
import Notes from "../notes/Notes"

function HomeComponent() {
  const headerRef = useRef<HTMLDivElement | null>(null)

  return (
    <div className="col-span-12 h-full lg:col-span-9">
      <Header ref={headerRef} />

      <div
        style={{
          height: `calc(100vh-${headerRef.current?.clientHeight}px`,
        }}
        className="grid grid-cols-12 overflow-hidden"
      >
        <div className="no_scrollbar col-span-12 h-[calc(100vh-68px)] overflow-y-scroll lg:col-span-4">
          <Notes />
        </div>

        <div className="h-[calc(100vh-68px) no_scrollbar col-span-8 overflow-y-scroll max-lg:hidden">
          <Editor />
        </div>
      </div>
    </div>
  )
}
export default HomeComponent
