"use client"

import { SessionProvider, signIn } from "next-auth/react"
import Image from "next/image"

import { Button, ButtonProps } from "../ui/button"

const GoogleAuth = ({ children, ...rest }: ButtonProps) => {
  return (
    <SessionProvider>
      <Button
        type="button"
        variant="outline"
        className="w-full"
        {...rest}
        onClick={() => signIn("google", { callbackUrl: "/" })}
      >
        <Image src="/icons/google.svg" alt="google" width={20} height={20} />{" "}
        {children}
      </Button>
    </SessionProvider>
  )
}

export default GoogleAuth
