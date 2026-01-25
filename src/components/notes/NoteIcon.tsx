import { IError, INote, NOTESTATUS } from "@/types"
import { ArchiveRestore, History, Star } from "lucide-react"
import { toast } from "sonner"

import { useUpdateNote } from "@/hooks/react-query/notes/useUpdateNote"

import CustomIcon from "../shared/CustomIcon"

function NoteIcon({ note }: { note: INote["data"]["note"] }) {
  const { isUpdating, update } = useUpdateNote(note._id)

  const handleButtonAction = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    { title, status }: { title: string; status: NOTESTATUS }
  ) => {
    e.stopPropagation()
    update(
      { status: NOTESTATUS.ACTIVE },
      {
        onSuccess: () => toast.info(`${title} removed from ${status}`),
        onError: error =>
          toast.error((error as unknown as IError).error.message),
      }
    )
  }

  return (
    <button
      className="flex-shrink-0 rounded-md p-1 transition-all duration-200 hover:bg-state-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus active:bg-state-active disabled:cursor-not-allowed disabled:opacity-50"
      disabled={isUpdating}
      onClick={e =>
        handleButtonAction(e, { title: note.title, status: note.status })
      }
      aria-label={`Restore from ${note.status}`}
    >
      {note.status === NOTESTATUS.TRASH ? (
        <CustomIcon
          Icon={History}
          className="text-text-tertiary transition-colors hover:text-text-primary"
        />
      ) : note.status === NOTESTATUS.ARCHIVED ? (
        <CustomIcon
          Icon={ArchiveRestore}
          className="text-text-tertiary transition-colors hover:text-text-primary"
        />
      ) : note.status === NOTESTATUS.FAVORITES ? (
        <CustomIcon
          Icon={Star}
          className="text-primary"
          fill="hsl(var(--color-primary))"
        />
      ) : (
        ""
      )}
    </button>
  )
}

export default NoteIcon
