"use client"

import { useSearchParams } from "next/navigation"
import { FileText } from "lucide-react"

import { cn } from "@/lib/tiptap-utils"
import { useNoteLocation } from "@/hooks/useNoteLocation"
import { useRecentNotes } from "@/hooks/useRecentNotes"

import CustomIcon from "../shared/CustomIcon"
import Heading from "./heading"

function Recents() {
  const { recentNotes, setRecentNotes } = useRecentNotes()
  const { setFolder, setStatus } = useNoteLocation()
  const noteId = useSearchParams().get("note")

  return (
    <div className="space-y-2">
      <Heading heading="recents">
        <button
          className="cursor-pointer text-sm font-semibold text-foreground hover:underline"
          onClick={() => {
            setStatus("active")
            setFolder({ name: "", _id: "" })
          }}
        >
          all notes
        </button>
      </Heading>

      {!recentNotes.length ? (
        <div className="px-5">No recent notes </div>
      ) : (
        recentNotes.map(({ title, _id }, index) => (
          <button
            key={index}
            onClick={() => {
              setRecentNotes({ title, _id })
            }}
            className={cn(
              `flex w-full items-center justify-start gap-[15px] px-5 py-2.5`,
              _id === noteId ? "bg-primary" : "bg-transparent"
            )}
          >
            <CustomIcon Icon={FileText} />
            <p className="font-semibold capitalize text-foreground/60">
              {title}
            </p>
          </button>
        ))
      )}
    </div>
  )
}

export default Recents
