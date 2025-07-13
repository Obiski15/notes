import HeaderGroup from "@/components/auth/header-group"
import ResetPasswordForm from "@/components/auth/reset-password-form"
import Wrapper from "@/components/auth/Wrapper"

function ResetPassword() {
  return (
    <Wrapper>
      <HeaderGroup
        title="Reset password"
        description="Enter a new password to regain access to your account. Make sure it's strong and easy for you to remember."
      />
      <ResetPasswordForm />
    </Wrapper>
  )
}

export default ResetPassword
