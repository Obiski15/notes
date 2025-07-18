"use client"

import { useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { IError } from "@/services/serviceTypes"
import { Archive, Clipboard, Star, Trash } from "lucide-react"

import { cn, formatDate, toastTrash } from "@/lib/utils"
import { useNotes } from "@/hooks/react-query/notes/useNotes"
import { useUpdateRecentNotes } from "@/hooks/react-query/notes/useUpdateRecentNotes"
import { useUser } from "@/hooks/react-query/user/useUser"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { useNoteLocation } from "@/hooks/useNoteLocation"

import Editor from "../editor/Editor"
import ErrorState from "../shared/Error"
import Info from "../shared/Info"
import CreateNote from "../shared/notes/CreateNote"
import SearchNote from "../shared/notes/SearchNote"
import { Badge } from "../ui/badge"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"
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
  const editorSheetRef = useRef<null | HTMLButtonElement>(null)
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const { folder, status } = useNoteLocation()
  const noteId = useSearchParams().get("note") || ""
  const { data, isLoading, error } = useNotes({
    folder: folder._id,
    status,
  })
  const { user } = useUser()
  const { addRecentNote } = useUpdateRecentNotes()

  useEffect(() => {
    if (noteId && !isDesktop) editorSheetRef.current?.click()
  }, [noteId, isDesktop])

  if (isLoading) return <Loader />

  if (error)
    return <ErrorState message={(error as unknown as IError).error.message} />

  return (
    <>
      {!data?.data.notes.length ? (
        <Info {...emptyState[status]} />
      ) : (
        <div className="h-full space-y-5 px-5 py-7">
          {status === "trash" && !!data?.data.notes.length && (
            <EmptyTrash notes={data.data.notes.map(note => note._id)} />
          )}

          <div className="lg:hidden">
            <SearchNote />
          </div>

          {data?.data.notes.map(note => (
            <div
              key={note._id}
              className={cn(
                "w-full cursor-pointer space-y-2.5 rounded-sm p-5 text-left hover:scale-105",
                noteId === note._id ? "bg-foreground/10" : "bg-[#FFFFFF08]"
              )}
              onClick={async () => {
                if (status === "trash") return toastTrash()
                addRecentNote({
                  id: String(user?.data.user._id),
                  note: { title: String(note.title), _id: String(note._id) },
                })
                if (noteId === note._id) {
                  if (!isDesktop) editorSheetRef.current?.click()
                }
              }}
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="flex-1 break-all text-lg font-semibold capitalize leading-7">
                  {note.title}
                </h3>
                <NoteIcon note={note} />
              </div>

              <div className="flex flex-wrap items-start justify-start gap-2">
                {note.tags.map((tag, index) => (
                  <Badge
                    key={`tag-${tag}-${index}}`}
                    variant="outline"
                    className="capitalize"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <p className="text-foreground/40">{formatDate(note.updateAt)}</p>
            </div>
          ))}
        </div>
      )}

      {!isDesktop && (
        <>
          <Sheet>
            <SheetTrigger ref={editorSheetRef} hidden></SheetTrigger>
            <SheetHeader className="hidden">
              <SheetTitle>Sidebar header</SheetTitle>
              <SheetDescription>Sidebar description</SheetDescription>
            </SheetHeader>

            <SheetContent
              className="w-full overflow-y-scroll border-none p-0"
              side="right"
            >
              <Editor />
            </SheetContent>
          </Sheet>
          <CreateNote />
        </>
      )}
    </>
  )
}

export default Notes
