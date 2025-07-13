import AuthService from "@/services/auth.service"
import { IError, ILogin } from "@/services/serviceTypes"
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
    },
    onError: error => toast.error((error as unknown as IError).error.message),
  })

  return { login, isLoading, error }
}
