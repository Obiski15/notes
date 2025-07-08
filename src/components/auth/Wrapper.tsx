import { ReactNode } from "react"

function Wrapper({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-10 shadow-[#00000019_0px_10px_50px]">
      {children}
    </div>
  )
}

export default Wrapper
