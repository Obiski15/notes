import { ReactNode } from "react"

function Heading({
  children,
  heading,
}: {
  children?: ReactNode
  heading: string
}) {
  return (
    <div className="flex items-center justify-between px-5">
      <h3 className="text-sm font-semibold capitalize text-foreground/60">
        {heading}
      </h3>
      {children}
    </div>
  )
}

export default Heading
