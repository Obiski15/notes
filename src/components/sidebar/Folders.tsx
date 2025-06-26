"use client"

import { Folder, FolderOpen, FolderPlus } from "lucide-react"

import { cn } from "@/lib/utils"
import { useFolders } from "@/hooks/react-query/folder/useFolders"
import { useNoteLocation } from "@/hooks/useNoteLocation"

import Heading from "./heading"
import Loader from "./Loader"

function Folders() {
  const { isLoading, error, data } = useFolders()
  const { setFolder, folder } = useNoteLocation()

  if (isLoading) return <Loader count={5} />

  if (error) return <div>something went wrong</div>

  return (
    <div className="space-y-2">
      <Heading Icon={FolderPlus}>folders</Heading>

      {data?.data.folders!.map(({ _id, name }, index) => (
        <button
          key={index}
          onClick={async () => {
            setFolder({ _id, name })
          }}
          className={cn(
            `flex w-full items-center justify-start gap-[15px] px-5 py-2.5`,
            _id === folder._id ? "bg-[#FFFFFF08]" : "bg-transparent"
          )}
        >
          {_id === folder._id ? (
            <FolderOpen className="size-5 text-foreground" />
          ) : (
            <Folder className="size-5 text-foreground" />
          )}

          <p className="font-semibold capitalize text-foreground/60">{name}</p>
        </button>
      ))}
    </div>
  )
}

export default Folders
