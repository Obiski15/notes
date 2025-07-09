import Logo from "./Logo"

function FullPageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="logo_animate">
        <Logo />
      </div>
    </div>
  )
}

export default FullPageLoader
