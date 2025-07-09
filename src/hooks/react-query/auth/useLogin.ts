import AuthService from "@/services/auth.service"
import { ILogin } from "@/services/serviceTypes"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

export const useLogin = () => {
  const {
    mutate: login,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationKey: ["auth"],
    mutationFn: async (data: ILogin) => await new AuthService().login(data),
    onSuccess: () => {
      toast.success("Login successful")
      toast.info("Redirecting...")
    },
    onError: error =>
      toast.error(
        (error as unknown as { error: { message: string } }).error.message
      ),
  })

  return { login, isLoading, error }
}
