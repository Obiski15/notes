import ForgotPasswordForm from "@/components/auth/forgot-password-form"
import HeaderGroup from "@/components/auth/header-group"
import Wrapper from "@/components/auth/Wrapper"

function ForgotPassword() {
  return (
    <Wrapper>
      <HeaderGroup
        title="Forgot password"
        description="Enter the email linked to your account and we’ll help you reset your password."
      />
      <ForgotPasswordForm />
    </Wrapper>
  )
}

export default ForgotPassword
