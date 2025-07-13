"use client"

import { useSearchParams } from "next/navigation"
import { FileText } from "lucide-react"

import { cn } from "@/lib/tiptap-utils"
import { useRecentNotes } from "@/hooks/react-query/notes/useRecentNotes"
import { useUpdateRecentNotes } from "@/hooks/react-query/notes/useUpdateRecentNotes"
import { useUser } from "@/hooks/react-query/user/useUser"

import CustomIcon from "../shared/CustomIcon"
import EmptyState from "./empty-state"
import Heading from "./heading"

function Recents() {
  const noteId = useSearchParams().get("note")
  const { addRecentNote } = useUpdateRecentNotes()

  const { user } = useUser()
  const { data: recentNotes } = useRecentNotes(user?.data.user._id)

  return (
    <div className="space-y-2">
      <Heading heading="recents" />

      {!recentNotes?.length ? (
        <EmptyState
          title="Nothing recent"
          message="Your recent notes will appear here."
        />
      ) : (
        recentNotes.map(({ title, _id }, index) => (
          <button
            key={index}
            onClick={() => {
              addRecentNote({
                id: String(user?.data.user._id),
                note: { title, _id },
              })
            }}
            className={cn(
              `flex w-full items-center justify-start gap-3.5 px-5 py-2.5 transition-all`,
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
