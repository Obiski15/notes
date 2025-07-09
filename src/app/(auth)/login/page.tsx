import { Metadata } from "next"

import HeaderGroup from "@/components/auth/header-group"
import LoginForm from "@/components/auth/LoginForm"
import Wrapper from "@/components/auth/Wrapper"

export const metadata: Metadata = {
  title: "Login",
}

interface Params {
  redirect?: string
}

async function Login({ searchParams }: { searchParams: Promise<Params> }) {
  const { redirect } = await searchParams

  return (
    <Wrapper>
      <HeaderGroup
        title="Login"
        description="Add your details below to get back into the app"
      />
      <LoginForm redirect={redirect} />
    </Wrapper>
  )
}

export default Login
