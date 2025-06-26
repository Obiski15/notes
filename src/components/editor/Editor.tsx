"use client"

import { Content } from "@tiptap/react"
import { CalendarDays, Folder } from "lucide-react"

import { formatDate } from "@/lib/utils"
import { useNote } from "@/hooks/react-query/notes/useNote"
import { useNoteLocation } from "@/hooks/useNoteLocation"

import NoSelectedNote from "./no-selected-note"
import NoteOptions from "./NoteOptions"
import TextEditor from "./TextEditor"

function Editor() {
  const { note } = useNoteLocation()
  const { isLoading, error, data } = useNote({ noteId: note })

  return (
    <div className="h-[calc(100vh-68px) no_scrollbar col-span-8 overflow-y-scroll p-10">
      {!note ? (
        <NoSelectedNote />
      ) : isLoading ? (
        <p>Loading</p>
      ) : error ? (
        <p>Something went wrong</p>
      ) : (
        <div className="space-y-[30px]">
          <div className="flex items-center justify-between">
            <h1 className="break-all text-[32px] font-semibold">
              {data?.data.note.title}
            </h1>
            <NoteOptions />
          </div>

          <>
            <div className="text-sm font-medium capitalize">
              <div className="flex w-full items-center justify-start gap-2 border-b border-b-foreground/10 pb-[15px]">
                <CalendarDays className="size-5 text-foreground/60" />
                <p className="min-w-[100px] text-foreground/60">Date</p>
                <p className="underline">
                  {formatDate(data!.data.note.updateAt)}
                </p>
              </div>

              <div className="flex items-center justify-start gap-2 pt-[15px]">
                <Folder className="size-5 text-foreground/60" />
                <p className="min-w-[100px] text-foreground/60">Folder</p>
                <p className="underline">{data!.data.note.folder.name}</p>
              </div>
            </div>
            <TextEditor content={data?.data.note.content as Content} />
          </>
        </div>
      )}
    </div>
  )
}

export default Editor
