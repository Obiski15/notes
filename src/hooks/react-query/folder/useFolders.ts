import FolderService from "@/services/folder.service"
import { useQuery } from "@tanstack/react-query"

export const useFolders = () => {
  const { data, refetch, isLoading, error } = useQuery({
    queryKey: ["folders"],
    queryFn: async () => await new FolderService().getFolders(),
  })

  return { data, refetch, isLoading, error }
}
