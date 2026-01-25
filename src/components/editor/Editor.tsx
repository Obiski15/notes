"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { IError } from "@/services/serviceTypes"
import { Folder, History, Info as InfoIcon, Tag } from "lucide-react"

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
    <div className="h-full px-5 py-10 lg:p-10">
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
        <ErrorState
          message={(error as unknown as IError).error.message}
          onRetry={refetch}
        />
      ) : !data?.data.note ? (
        <Info
          Icon={InfoIcon}
          title="Note not found"
          message="The note you are looking for does not exist or may have been
            removed."
        />
      ) : (
        <div className="space-y-7">
          <div className="flex items-center justify-between gap-2">
            <h1 className="break-all text-2xl font-semibold capitalize lg:text-[32px]">
              {data?.data.note?.title}
            </h1>
            <NoteActions />
          </div>

          <>
            <div className="text-sm font-medium capitalize">
              <div className="space-y-3.5 border-b border-b-border pb-3.5">
                <div className="flex w-full items-center justify-start gap-2">
                  <CustomIcon Icon={History} className="text-text-tertiary" />
                  <p className="min-w-20 text-text-tertiary lg:min-w-24">
                    Last edited
                  </p>
                  <p className="text-text-primary underline">
                    {formatDate(data!.data.note.updateAt)}
                  </p>
                </div>

                <div className="flex w-full items-center justify-start gap-2">
                  <CustomIcon Icon={Tag} className="text-text-tertiary" />
                  <p className="min-w-20 text-text-tertiary lg:min-w-24">
                    Tags
                  </p>
                  <p className="text-text-primary">
                    {data!.data.note.tags.join(", ")}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-start gap-2 pt-3.5">
                <CustomIcon Icon={Folder} className="text-text-tertiary" />
                <p className="min-w-20 text-text-tertiary lg:min-w-24">
                  Folder
                </p>

                {isLoadingFolders ? (
                  <p>Loading folders...</p>
                ) : (
                  <Select value={folder} onValueChange={val => setFolder(val)}>
                    <SelectTrigger
                      id="folder"
                      className="size-fit border-none p-0 capitalize underline focus:ring-0 [&>svg]:hidden"
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
