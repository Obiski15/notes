import FolderService from "@/services/folder.service"
import { ICreateFolder } from "@/services/serviceTypes"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

const useCreateFolder = () => {
  const queryClient = useQueryClient()

  const {
    isPending: isCreatingFolder,
    mutate: createFolder,
    error,
  } = useMutation({
    mutationFn: async (data: ICreateFolder) =>
      await new FolderService().createFolder(data),
    mutationKey: ["folders"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["folders"],
      })
      toast.info("Folder created successfully")
    },
    onError: error =>
      toast.error(
        (error as unknown as { error: { message: string } }).error.message
      ),
  })

  return { isCreatingFolder, createFolder, error }
}

export default useCreateFolder
