"use client"

import { useSearchParams } from "next/navigation"
import { FileText } from "lucide-react"

import { cn } from "@/lib/tiptap-utils"
import { useRecentNotes } from "@/hooks/useRecentNotes"

import CustomIcon from "../shared/CustomIcon"
import EmptyState from "./empty-state"
import Heading from "./heading"

function Recents() {
  const { recentNotes, setRecentNotes } = useRecentNotes()
  const noteId = useSearchParams().get("note")

  return (
    <div className="space-y-2">
      <Heading heading="recents" />

      {!recentNotes.length ? (
        <EmptyState
          title="Nothing recent"
          message="Your recent notes will appear here."
        />
      ) : (
        recentNotes.map(({ title, _id }, index) => (
          <button
            key={index}
            onClick={() => {
              setRecentNotes({ title, _id })
            }}
            className={cn(
              `flex w-full items-center justify-start gap-3.5 px-5 py-2.5`,
              _id === noteId ? "bg-primary" : "bg-transparent"
            )}
          >
            <CustomIcon Icon={FileText} />
            <p className="line-clamp-1 font-semibold capitalize text-foreground/60">
              {title}
            </p>
          </button>
        ))
      )}
    </div>
  )
}

export default Recents
