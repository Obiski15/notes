"use client"

import { ReactNode, useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { IError } from "@/services/serviceTypes"

import { useUser } from "@/hooks/react-query/user/useUser"

import FullPageLoader from "../shared/full-page-loader"

function Protected({ children }: { children: ReactNode }) {
  const { user: userData, isLoading, error } = useUser()
  const [user, setUser] = useState<unknown>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    setUser(userData)
  }, [userData])

  useEffect(() => {
    if (error) {
      if (`${(error as unknown as IError).error.status}`.startsWith("4")) {
        router.push(`/login?redirect=${pathname}`)
      } else {
        throw new Error()
      }
    }
  }, [error, router, pathname])

  if (isLoading) return <FullPageLoader />

  if (!isLoading && user) return children
}

export default Protected
