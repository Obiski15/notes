"use client"

import { useSearchParams } from "next/navigation"
import { INoteStatus } from "@/services/serviceTypes"
import { Archive, CircleEllipsis, Star, Trash } from "lucide-react"
import { toast } from "sonner"

import { useNote } from "@/hooks/react-query/notes/useNote"
import { useUpdateNote } from "@/hooks/react-query/notes/useUpdateNote"

import CustomIcon from "../shared/CustomIcon"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"

function NoteActions() {
  const noteId = useSearchParams().get("note") || ""
  const { update, isUpdating } = useUpdateNote(noteId)
  const { data: note } = useNote({ noteId })

  const handleNoteAction = ({
    title,
    status,
  }: {
    title: string
    status: INoteStatus
  }) => {
    update(
      { status },
      {
        onSuccess: () => toast.info(`${title} added to ${status}`),
        onError: () => toast.error(`Unable to add ${title} to ${status}`),
      }
    )
  }

  return (
    <Popover>
      <PopoverTrigger disabled={note?.data.note.status === "trash"}>
        <CustomIcon Icon={CircleEllipsis} />
      </PopoverTrigger>

      <PopoverContent className="w-full max-w-[200px] space-y-4 border border-border bg-surface-elevated p-3 shadow-lg">
        <button
          disabled={isUpdating}
          onClick={() =>
            handleNoteAction({
              title: note!.data.note.title,
              status: "favorites",
            })
          }
          className="flex w-full items-center justify-start gap-3 rounded-md px-2 py-1.5 text-text-primary transition-all duration-200 hover:bg-state-hover active:bg-state-active disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Add to favorites"
        >
          <CustomIcon Icon={Star} className="text-text-tertiary" />
          <p className="text-sm font-medium">Add to favorites</p>
        </button>

        <div>
          <div className="border-b border-border pb-3">
            <button
              disabled={isUpdating}
              onClick={() =>
                handleNoteAction({
                  title: note!.data.note.title,
                  status: "archive",
                })
              }
              className="flex w-full items-center justify-start gap-3 rounded-md px-2 py-1.5 text-text-primary transition-all duration-200 hover:bg-state-hover active:bg-state-active disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Archive note"
            >
              <CustomIcon Icon={Archive} className="text-text-tertiary" />
              <p className="text-sm font-medium">Archive</p>
            </button>
          </div>
          <div className="pt-3">
            <button
              disabled={isUpdating}
              onClick={() =>
                handleNoteAction({
                  title: note!.data.note.title,
                  status: "trash",
                })
              }
              className="flex w-full items-center justify-start gap-3 rounded-md px-2 py-1.5 text-error transition-all duration-200 hover:bg-error/10 active:bg-error/20 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Move to trash"
            >
              <CustomIcon Icon={Trash} className="text-error" />
              <p className="text-sm font-medium">Move to trash</p>
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default NoteActions
