"use client"

import { ArchiveRestore, History, Star } from "lucide-react"
import { toast } from "sonner"

import { cn, formatDate } from "@/lib/utils"
import { useNotes } from "@/hooks/react-query/notes/useNotes"
import { useNoteLocation } from "@/hooks/useNoteLocation"

function FolderContent() {
  const { folder, note: noteId, status, setNote } = useNoteLocation()
  const { data, isLoading, error } = useNotes({
    folder: folder._id,
    status,
  })

  if (isLoading) return <div>loading</div>

  if (error) return <div>Something went wrong</div>

  const handleButtonAction = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    // perform computation
    // refetch()
    e.stopPropagation()
  }

  return (
    <div className="space-y-5 px-5 py-[30px]">
      {status === "trash" && (
        <button
          className="w-full text-right text-destructive hover:underline"
          onClick={() => toast.info("Trash emptied")}
        >
          Empty trash
        </button>
      )}
      {data?.data.notes.map(note => (
        <div
          key={note._id}
          className={cn(
            "w-full cursor-pointer space-y-2.5 p-5 text-left",
            noteId === note._id ? "bg-foreground/10" : "bg-[#FFFFFF08]"
          )}
          onClick={() => {
            if (status === "trash")
              return toast.info(
                "This note is in the Trash and can't be edited",
                {
                  description: "To make changes, please restore it first",
                }
              )
            setNote(note._id)
          }}
        >
          <div className="flex items-center justify-between gap-2">
            <h3 className="flex-1 break-all text-lg font-semibold leading-7">
              {note.title}
            </h3>
            <button className="flex-shrink-0" onClick={handleButtonAction}>
              {note.status === "trash" ? (
                <History className="size-5" />
              ) : note.status === "archive" ? (
                <ArchiveRestore className="size-5" />
              ) : note.status === "favorites" ? (
                <Star
                  className="size-5 text-primary"
                  fill="hsl(var(--primary))"
                />
              ) : (
                ""
              )}
            </button>
          </div>
          <div className="flex items-center justify-start gap-2.5">
            <p className="text-foreground/40">{formatDate(note.updateAt)}</p>
            {/* <p className="line-clamp-1 text-foreground/60">{note.content}</p> */}
          </div>
        </div>
      ))}
    </div>
  )
}

export default FolderContent
