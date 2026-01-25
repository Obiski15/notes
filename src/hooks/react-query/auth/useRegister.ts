import { useRouter } from "next/navigation"
import AuthService from "@/services/auth.service"
import { IError, IRegister } from "@/types"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

export const useRegister = () => {
  const router = useRouter()
  const {
    mutate: register,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationKey: ["auth"],
    mutationFn: async (data: IRegister) =>
      await new AuthService().register(data),
    onSuccess: () => {
      toast.success("Account created successfully")
      toast.info("Redirecting...")
      router.push("/")
    },
    onError: error => toast.error((error as unknown as IError).error.message),
  })

  return { register, isLoading, error }
}
