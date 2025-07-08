import { useRouter } from "next/navigation"
import AuthService from "@/services/auth.service"
import { ILogin } from "@/services/serviceTypes"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

export const useLogin = () => {
  const router = useRouter()
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
      router.push("/")
    },
    onError: error => toast.error(error.message),
  })

  return { login, isLoading, error }
}
