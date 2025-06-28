import { INote, INoteStatus } from "@/services/serviceTypes"
import { ArchiveRestore, History, Star } from "lucide-react"
import { toast } from "sonner"

import { useUpdateNote } from "@/hooks/react-query/notes/useUpdateNote"

import CustomIcon from "../shared/CustomIcon"

function NoteIcon({ note }: { note: INote["data"]["note"] }) {
  const { isUpdating, update } = useUpdateNote(note._id)

  const handleButtonAction = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    { title, status }: { title: string; status: INoteStatus }
  ) => {
    e.stopPropagation()
    update(
      { status: "active" },
      {
        onSuccess: () => toast.info(`${title} removed from ${status}`),
        onError: () =>
          toast.error("Unable to perform action. Please try again"),
      }
    )
  }

  return (
    <button
      className="flex-shrink-0"
      disabled={isUpdating}
      onClick={e =>
        handleButtonAction(e, { title: note.title, status: note.status })
      }
    >
      {note.status === "trash" ? (
        <CustomIcon Icon={History} />
      ) : note.status === "archive" ? (
        <CustomIcon Icon={ArchiveRestore} />
      ) : note.status === "favorites" ? (
        <CustomIcon
          Icon={Star}
          className="text-primary"
          fill="hsl(var(--primary))"
        />
      ) : (
        ""
      )}
    </button>
  )
}

export default NoteIcon
