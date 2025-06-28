import NoteService from "@/services/note.service"
import { IUpdateNote } from "@/services/serviceTypes"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useUpdateNote = (id: string) => {
  const queryClient = useQueryClient()
  const {
    data,
    mutate: update,
    isPending: isUpdating,
  } = useMutation({
    mutationKey: ["notes"],
    mutationFn: async (data: IUpdateNote) =>
      await new NoteService().updateNote(id, data),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      }),
  })

  return { data, update, isUpdating }
}
