import AuthService from "@/services/auth.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useLogout = () => {
  const queryClient = useQueryClient()

  const { mutate, isPending, error } = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => await new AuthService().logout(),
    onSuccess: () => {
      queryClient.clear()
    },
  })

  return { logout: mutate, isPending, error }
}
