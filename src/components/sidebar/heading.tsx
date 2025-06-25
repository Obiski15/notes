import { ForwardRefExoticComponent, RefAttributes } from "react"
import { LucideProps } from "lucide-react"

function Heading({
  children,
  Icon,
}: {
  children: string
  Icon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >
}) {
  return (
    <div className="flex items-center justify-between px-5">
      <h3 className="text-sm font-semibold capitalize text-foreground/60">
        {children}
      </h3>
      {Icon && <Icon className="size-5 text-foreground/40" />}
    </div>
  )
}

export default Heading
