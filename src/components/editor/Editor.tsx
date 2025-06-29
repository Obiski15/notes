"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { CalendarDays, Folder, Info as InfoIcon } from "lucide-react"

import { formatDate } from "@/lib/utils"
import { useFolders } from "@/hooks/react-query/folder/useFolders"
import { useNote } from "@/hooks/react-query/notes/useNote"

import CustomIcon from "../shared/CustomIcon"
import ErrorState from "../shared/Error"
import Info from "../shared/Info"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import Loader from "./Loader"
import NoteActions from "./NoteActions"
import TextEditor from "./TextEditor"

function Editor() {
  const noteId = useSearchParams().get("note") || ""
  const { isLoading, error, data, refetch } = useNote({ noteId })
  const { data: folders, isLoading: isLoadingFolders } = useFolders()

  const [folder, setFolder] = useState<string | undefined>("")

  useEffect(() => {
    setFolder(data?.data.note?.folder?._id)
  }, [data])

  return (
    <div className="h-[calc(100vh-68px) no_scrollbar col-span-8 overflow-y-scroll p-10">
      {!noteId ? (
        <Info
          title="Select a note to view"
          message="Choose a note from the list on the left to view its contents, or
          create a new note to add to your collection."
        >
          <Image
            src="/icons/note.svg"
            alt="note"
            width={80}
            height={80}
            className="mx-auto"
          />
        </Info>
      ) : isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorState onRetry={refetch} />
      ) : !data?.data.note ? (
        <Info
          Icon={InfoIcon}
          title="Note not found"
          message="The note you are looking for does not exist or may have been
            removed."
        />
      ) : (
        <div className="space-y-[30px]">
          <div className="flex items-center justify-between">
            <h1 className="break-all text-[32px] font-semibold">
              {data?.data.note?.title}
            </h1>
            <NoteActions />
          </div>

          <>
            <div className="text-sm font-medium capitalize">
              <div className="flex w-full items-center justify-start gap-2 border-b border-b-foreground/10 pb-[15px]">
                <CustomIcon
                  Icon={CalendarDays}
                  className="text-foreground/60"
                />
                <p className="min-w-[100px] text-foreground/60">Date</p>
                <p className="underline">
                  {formatDate(data!.data.note.updateAt)}
                </p>
              </div>

              <div className="flex items-center justify-start gap-2 pt-[15px]">
                <CustomIcon Icon={Folder} className="text-foreground/60" />
                <p className="min-w-[100px] text-foreground/60">Folder</p>

                {isLoadingFolders ? (
                  <p>Loading folders...</p>
                ) : (
                  <Select value={folder} onValueChange={val => setFolder(val)}>
                    <SelectTrigger
                      id="folder"
                      className="size-fit w-full border-none p-0 capitalize underline focus:ring-0 [&>svg]:hidden"
                      disabled={data.data.note.status === "trash"}
                    >
                      <SelectValue placeholder="Select a folder" />
                    </SelectTrigger>

                    <SelectContent>
                      {folders!.data.folders?.map(folder => (
                        <SelectItem key={folder._id} value={folder._id}>
                          {folder.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>

            <TextEditor folder={folder} />
          </>
        </div>
      )}
    </div>
  )
}

export default Editor
