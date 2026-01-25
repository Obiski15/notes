import { toast } from "sonner"

export const extractNoteId = (url: string) => {
  const parts = url.split("/")
  return parts[parts.length - 1]
}

export const toastTrash = () =>
  toast.info("This note is in the Trash and can't be edited", {
    description: "To make changes, please restore it first",
  })
