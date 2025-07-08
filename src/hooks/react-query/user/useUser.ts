import UserService from "@/services/user.service"
import { useQuery } from "@tanstack/react-query"

export const useUser = () => {
  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useQuery({
    retry: 1,
    queryKey: ["user"],
    queryFn: async () => await new UserService().getUser(),
  })

  return { user, isLoading, error, refetch }
}
