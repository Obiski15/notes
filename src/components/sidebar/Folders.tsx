"use client"

import { Folder, FolderOpen } from "lucide-react"

import { cn } from "@/lib/utils"
import { useFolders } from "@/hooks/react-query/folder/useFolders"
import { useNoteLocation } from "@/hooks/useNoteLocation"

import CustomIcon from "../shared/CustomIcon"
import ErrorState from "../shared/Error"
import CreateFolder from "./CreateFolder"
import EmptyState from "./empty-state"
import Heading from "./heading"
import Loader from "./Loader"

function Folders() {
  const { isLoading, error, data } = useFolders()
  const { setFolder, folder } = useNoteLocation()

  if (isLoading) return <Loader count={5} />

  return (
    <div className="space-y-2">
      <Heading heading="folders">
        <CreateFolder />
      </Heading>

      {error ? (
        <ErrorState />
      ) : !data?.data.folders?.length ? (
        <EmptyState
          title="No folders yet"
          message="Organize your notes by creating folders."
        />
      ) : (
        data?.data.folders!.map(({ _id, name }, index) => (
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
            <CustomIcon Icon={_id === folder._id ? FolderOpen : Folder} />

            <p className="font-semibold capitalize text-foreground/60">
              {name}
            </p>
          </button>
        ))
      )}
    </div>
  )
}

export default Folders
