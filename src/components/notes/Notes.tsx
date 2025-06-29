"use client"

import { useSearchParams } from "next/navigation"
import { Archive, Clipboard, Star, Trash } from "lucide-react"

import { cn, formatDate, toastTrash } from "@/lib/utils"
import { useNotes } from "@/hooks/react-query/notes/useNotes"
import { useNoteLocation } from "@/hooks/useNoteLocation"
import { useRecentNotes } from "@/hooks/useRecentNotes"

import ErrorState from "../shared/Error"
import Info from "../shared/Info"
import EmptyTrash from "./EmptyTrash"
import Loader from "./Loader"
import NoteIcon from "./NoteIcon"

const emptyState = {
  active: {
    title: "No notes yet",
    message: "You haven't created any notes. Start writing your first one!",
    Icon: Clipboard,
  },
  archive: {
    title: "No archived notes",
    message: "You haven't archived any notes yet.",
    Icon: Archive,
  },
  favorites: {
    title: "No favorites yet",
    message: "Mark notes as favorites to find them here easily.",
    Icon: Star,
  },
  trash: {
    title: "Trash is empty",
    message: "Deleted notes will appear here before being permanently removed.",
    Icon: Trash,
  },
}

function Notes() {
  const { folder, status } = useNoteLocation()
  const noteId = useSearchParams().get("note") || ""
  const { data, isLoading, error } = useNotes({
    folder: folder._id,
    status,
  })
  const { setRecentNotes } = useRecentNotes()

  if (isLoading) return <Loader />

  if (error) return <ErrorState />

  if (!data?.data.notes.length) return <Info {...emptyState[status]} />

  return (
    <div className="space-y-5 px-5 py-[30px]">
      {status === "trash" && !!data?.data.notes.length && (
        <EmptyTrash notes={data.data.notes.map(note => note._id)} />
      )}
      {data?.data.notes.map(note => (
        <div
          key={note._id}
          className={cn(
            "w-full cursor-pointer space-y-2.5 p-5 text-left",
            noteId === note._id ? "bg-foreground/10" : "bg-[#FFFFFF08]"
          )}
          onClick={() => {
            if (status === "trash") return toastTrash()
            setRecentNotes({ title: note!.title, _id: note!._id })
          }}
        >
          <div className="flex items-center justify-between gap-2">
            <h3 className="flex-1 break-all text-lg font-semibold leading-7">
              {note.title}
            </h3>
            <NoteIcon note={note} />
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

export default Notes
