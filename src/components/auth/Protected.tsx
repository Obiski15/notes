"use client"

import { ReactNode, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { useUser } from "@/hooks/react-query/user/useUser"

function Protected({ children }: { children: ReactNode }) {
  const { user: userData, isLoading, error } = useUser()
  const [user, setUser] = useState<unknown>(null)
  const router = useRouter()

  useEffect(() => {
    setUser(userData)
  }, [userData])

  useEffect(() => {
    if (error) {
      if (
        `${(error as unknown as { error: { status: number } })?.error.status}`.startsWith(
          "4"
        )
      ) {
        router.push("/login")
      } else {
        router.push("/something")
      }
    }
  }, [error, router])

  if (isLoading) return <div>loading</div>

  if (!isLoading && user) return children
}

export default Protected
