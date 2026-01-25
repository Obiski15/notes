import AuthService from "@/services/auth.service"
import { IError, IForgotPassword } from "@/types"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

export const useForgotPassword = () => {
  const {
    mutate: forget,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationKey: ["forgot-password"],
    mutationFn: async (data: IForgotPassword) =>
      await new AuthService().forgotPassword(data),
    onError: error => toast.error((error as unknown as IError).error.message),
    onSuccess: () =>
      toast.success(
        "We've sent a link to reset your password to your email address"
      ),
  })

  return { forget, isLoading, error }
}
