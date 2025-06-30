import { ReactNode } from "react"

import { cn } from "@/lib/utils"

function CompWrapper({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return <div className={cn("px-5", className)}>{children}</div>
}

export default CompWrapper
