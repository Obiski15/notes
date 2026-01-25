import { ReactNode } from "react"

function Wrapper({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-8 rounded-xl border border-border bg-card p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-sm transition-all hover:shadow-[0_8px_40px_rgb(0,0,0,0.16)]">
      {children}
    </div>
  )
}

export default Wrapper
