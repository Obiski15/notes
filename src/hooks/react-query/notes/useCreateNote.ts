import NoteService from "@/services/note.service"
import { ICreateNote } from "@/services/serviceTypes"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCreateNote = () => {
  const queryClient = useQueryClient()

  const {
    mutate: createNote,
    isPending: isCreatingNote,
    error,
  } = useMutation({
    mutationFn: async (data: ICreateNote) =>
      await new NoteService().createNote(data),
    mutationKey: ["notes"],
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notes"] }),
  })

  return { createNote, isCreatingNote, error }
}
