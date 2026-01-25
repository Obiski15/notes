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
              "flex w-full items-center justify-start gap-3 rounded-md px-5 py-2.5 transition-all duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface-background",
              _id === noteId
                ? "bg-state-active text-text-primary"
                : "bg-transparent text-text-secondary hover:bg-state-hover hover:text-text-primary active:bg-state-active"
            )}
            aria-label={`Open note: ${title}`}
            aria-current={_id === noteId ? "page" : undefined}
          >
            <CustomIcon
              Icon={FileText}
              className={cn(
                "transition-colors duration-200",
                _id === noteId ? "text-primary" : "text-text-tertiary"
              )}
            />
            <p className="line-clamp-1 flex-1 text-left font-medium capitalize">
              {title}
            </p>
          </button>
        ))
      )}
    </div>
  )
}

export default Recents
