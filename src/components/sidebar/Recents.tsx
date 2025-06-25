"use client"

import { useState } from "react"
import { FileText } from "lucide-react"

import { cn } from "@/lib/utils"

import Content from "./Content"
import Heading from "./heading"

const dummy = ["Home sweet home", "Parallax Website", "How to prepare indomie"]

function Recents() {
  const [activeNote, setActiveNote] = useState<number>(0)

  return (
    <div className="space-y-2">
      <Heading>recents</Heading>
      <Content
        data={dummy}
        cb={(val, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveNote(index!)
            }}
            className={cn(
              `flex w-full items-center justify-start gap-[15px] px-5 py-2.5`,
              index === activeNote ? "bg-primary" : "bg-transparent"
            )}
          >
            <FileText className="size-5 text-foreground" />
            <p className="font-semibold capitalize text-foreground/60">{val}</p>
          </button>
        )}
      />
    </div>
  )
}

export default Recents
