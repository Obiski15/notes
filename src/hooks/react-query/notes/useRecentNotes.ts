import { RecentNoteService } from "@/services/note.recent.service"
import { useQuery } from "@tanstack/react-query"

const recentNotes = new RecentNoteService()

export const useRecentNotes = (id?: string) => {
  const { data } = useQuery({
    queryKey: ["recents"],
    queryFn: async () => await recentNotes.getNotes(id!),

    enabled: !!id,
  })

  return { data: data?.notes }
}
