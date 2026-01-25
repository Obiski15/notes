"use client"

import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"
import { toast } from "sonner"

import { useLogout } from "@/hooks/react-query/auth/useLogout"

import CustomIcon from "../shared/CustomIcon"
import { Button } from "../ui/button"

function Logout() {
  const { logout, isPending } = useLogout()
  const router = useRouter()

  return (
    <div className="space-y-4">
      <Button
        disabled={isPending}
        variant="outline"
        className="w-full justify-start gap-3 text-error hover:bg-error/10 hover:text-error"
        onClick={() =>
          logout(void 0, {
            onSuccess: () => {
              toast.success("Logout successful")
              router.push("/login")
            },
            onError: () => {
              toast.error("Logout failed")
            },
          })
        }
      >
        <CustomIcon Icon={LogOut} className="text-error" />
        Logout
      </Button>
    </div>
  )
}

export default Logout
