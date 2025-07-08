import HeaderGroup from "@/components/auth/header-group"
import LoginForm from "@/components/auth/LoginForm"
import Wrapper from "@/components/auth/Wrapper"

function Login() {
  return (
    <Wrapper>
      <HeaderGroup
        title="Login"
        description="Add your details below to get back into the app"
      />
      <LoginForm />
    </Wrapper>
  )
}

export default Login
