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

      <PopoverContent className="w-full max-w-[200px] space-y-5 border-none bg-secondary p-3.5">
        <button
          disabled={isUpdating}
          onClick={() =>
            handleNoteAction({
              title: note!.data.note.title,
              status: "favorites",
            })
          }
          className="flex w-full items-center justify-start gap-3.5"
        >
          <CustomIcon Icon={Star} />
          <p>Add to favorites</p>
        </button>

        <div>
          <div className="border-b border-b-[#FFFFFF0D] pb-5">
            <button
              disabled={isUpdating}
              onClick={() =>
                handleNoteAction({
                  title: note!.data.note.title,
                  status: "archive",
                })
              }
              className="flex w-full items-center justify-start gap-3.5"
            >
              <CustomIcon Icon={Archive} />
              <p>Archive</p>
            </button>
          </div>
          <div className="pt-5">
            <button
              disabled={isUpdating}
              onClick={() =>
                handleNoteAction({
                  title: note!.data.note.title,
                  status: "trash",
                })
              }
              className="flex w-full items-center justify-start gap-3.5"
            >
              <CustomIcon Icon={Trash} />
              <p>Move to trash</p>
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default NoteActions
