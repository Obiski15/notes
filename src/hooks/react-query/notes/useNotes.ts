import NoteService from "@/services/note.service"
import { useQuery } from "@tanstack/react-query"

export const useNotes = ({
  folder = "",
  status = "active",
}: {
  folder?: string
  status?: string
}) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["notes", folder, status],
    queryFn: async () => await new NoteService().getNotes({ folder, status }),
  })

  return { data, isLoading, error, refetch }
}
