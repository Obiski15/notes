import NoteService from "@/services/note.service"
import { useQuery } from "@tanstack/react-query"

export const useNote = ({ noteId = "" }: { noteId: string }) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["notes", noteId],
    queryFn: async () => await new NoteService().getNote(noteId),
    enabled: !!noteId,
  })

  return { data, isLoading, error, refetch }
}
