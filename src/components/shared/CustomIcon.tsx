import { ForwardRefExoticComponent, RefAttributes } from "react"
import { LucideProps } from "lucide-react"

import { cn } from "@/lib/utils"

interface Props extends LucideProps {
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >
}

export default function CustomIcon({ Icon, className }: Props) {
  return <Icon className={cn("size-5 flex-shrink-0", className)} />
}
