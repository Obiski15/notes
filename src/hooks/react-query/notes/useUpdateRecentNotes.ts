import { useRouter } from "next/navigation"
import { INote, RecentNoteService } from "@/services/note.recent.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const recentNotes = new RecentNoteService()

export const useUpdateRecentNotes = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const { mutate: addRecentNote } = useMutation({
    mutationKey: ["recents"],
    mutationFn: async (data: INote) => await recentNotes.addNote(data),

    onSuccess: id => {
      queryClient.invalidateQueries({ queryKey: ["recents"] })
      router.push(`/note/${id}`)
    },
  })

  return { addRecentNote }
}
