import NoteService from "@/services/note.service"
import { IError } from "@/services/serviceTypes"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog"

function EmptyTrash({ notes }: { notes: string[] }) {
  const queryClient = useQueryClient()

  const { mutate: emptyTrash, isPending: isClearingTrash } = useMutation({
    mutationFn: async () => await new NoteService().emptyTrash(notes),
    mutationKey: ["notes"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      })
      toast.success("Trash emptied")
    },
    onError: error => toast.error((error as unknown as IError).error.message),
  })

  return (
    <AlertDialog>
      <AlertDialogTrigger disabled={isClearingTrash} asChild>
        <button className="w-full text-right text-sm font-medium text-error transition-colors duration-200 hover:text-error-hover hover:underline disabled:cursor-not-allowed disabled:opacity-50">
          clear all
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to permanently delete all items in Trash? This
            action is irreversible and will permanently remove all notes
            currently in the Trash.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => emptyTrash()}>
            Empty
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default EmptyTrash
