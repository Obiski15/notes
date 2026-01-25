"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { IError, NOTESTATUS } from "@/types"
import { Archive, Clipboard, Star, Trash } from "lucide-react"

import { extractNoteId, toastTrash } from "@/lib/helpers"
import { cn, formatDate } from "@/lib/utils"
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
  const [isNoteOpen, setIsNoteOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const { folder, status } = useNoteLocation()
  const noteId = extractNoteId(usePathname())

  const { data, isLoading, error } = useNotes({
    folder: folder._id,
    status,
  })
  const { addRecentNote } = useUpdateRecentNotes()
  const { user } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (noteId && !isDesktop && !isNoteOpen) {
      setIsNoteOpen(true)
    }
  }, [noteId, isDesktop])

  const handleOpenChange = (open: boolean) => {
    setIsNoteOpen(open)

    if (!open) {
      setIsNoteOpen(false)
      router.push("/")
    }
  }

  if (isLoading) return <Loader />

  if (error)
    return <ErrorState message={(error as unknown as IError).error.message} />

  return (
    <>
      {!data?.data.notes.length ? (
        <Info {...emptyState[status]} />
      ) : (
        <div className="h-full space-y-5 px-5 py-7">
          {status === NOTESTATUS.TRASH && !!data?.data.notes.length && (
            <EmptyTrash notes={data.data.notes.map(note => note._id)} />
          )}

          <div className="lg:hidden">
            <SearchNote />
          </div>

          {data?.data.notes.map(note => (
            <div
              key={note._id}
              className={cn(
                "w-full cursor-pointer space-y-2.5 rounded-sm p-5 text-left transition-all duration-200",
                noteId === note._id
                  ? "bg-state-active shadow-sm"
                  : "bg-surface hover:bg-state-hover active:bg-state-active"
              )}
              onClick={async () => {
                if (status === NOTESTATUS.TRASH) return toastTrash()
                addRecentNote({
                  id: String(user?.data.user._id),
                  note: { title: String(note.title), _id: String(note._id) },
                })
                if (noteId === note._id) {
                  if (!isDesktop) setIsNoteOpen(true)
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
                    className="capitalize text-text-secondary"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <p className="text-text-tertiary">{formatDate(note.updateAt)}</p>
            </div>
          ))}
        </div>
      )}

      {!isDesktop && (
        <>
          <Sheet open={isNoteOpen} onOpenChange={handleOpenChange}>
            <SheetTrigger hidden></SheetTrigger>
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
