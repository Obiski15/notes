import HeaderGroup from "@/components/auth/header-group"
import RegisterForm from "@/components/auth/RegisterForm"
import Wrapper from "@/components/auth/Wrapper"

function Register() {
  return (
    <Wrapper>
      <HeaderGroup
        title="Create Account"
        description="Let's get you started. Start your next big thought with just a tap"
      />
      <RegisterForm />
    </Wrapper>
  )
}

export default Register
