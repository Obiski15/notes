import { ReactNode } from "react"

import CompWrapper from "./CompWrapper"

function Heading({
  children,
  heading,
}: {
  children?: ReactNode
  heading: string
}) {
  return (
    <CompWrapper className="flex items-center justify-between">
      <h3 className="text-sm font-semibold capitalize text-foreground/60">
        {heading}
      </h3>
      {children}
    </CompWrapper>
  )
}

export default Heading
