"use client"

import { IError } from "@/types"
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
        <ErrorState message={(error as unknown as IError).error.message} />
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
              `focus-ring flex w-full items-center justify-start gap-3 rounded-md px-5 py-2.5 transition-all duration-200`,
              _id === folder._id
                ? "bg-state-active"
                : "bg-transparent hover:bg-state-hover active:bg-state-active"
            )}
            aria-label={`Open folder: ${name}`}
            aria-pressed={_id === folder._id}
          >
            <CustomIcon
              Icon={_id === folder._id ? FolderOpen : Folder}
              className={cn(
                "transition-colors duration-200",
                _id === folder._id ? "text-primary" : "text-text-tertiary"
              )}
            />

            <p className="font-medium capitalize text-text-secondary">{name}</p>
          </button>
        ))
      )}
    </div>
  )
}

export default Folders
