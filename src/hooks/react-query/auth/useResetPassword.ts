import { useRouter } from "next/navigation"
import AuthService from "@/services/auth.service"
import { IError, IResetPassword } from "@/services/serviceTypes"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

export const useResetPassword = () => {
  const router = useRouter()
  const {
    mutate: resetPassword,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationKey: ["reset-password"],
    mutationFn: async (data: IResetPassword) =>
      await new AuthService().resetPassword(data),
    onError: error => toast.error((error as unknown as IError).error.message),
    onSuccess: () => {
      toast.success(
        "Your password has been updated. You can now log in with your new credentials"
      )
      router.push("/login")
    },
  })

  return { resetPassword, isLoading, error }
}
