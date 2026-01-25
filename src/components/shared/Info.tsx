import { ForwardRefExoticComponent, ReactNode, RefAttributes } from "react"
import { LucideProps } from "lucide-react"

import { cn } from "@/lib/utils"

import CustomIcon from "../shared/CustomIcon"

interface InfoProps {
  title: string
  message: string
  IconClass?: string
}

interface WithIcon extends InfoProps {
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >
  children?: undefined
}

interface WithoutIcon extends InfoProps {
  Icon?: undefined
  children: ReactNode
}

type ComponentProps = WithIcon | WithoutIcon

const Info = ({
  title,
  Icon,
  message,
  IconClass,
  children,
}: ComponentProps) => {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="space-y-2.5 rounded-lg p-6 text-center shadow-sm">
        {Icon ? (
          <CustomIcon
            Icon={Icon}
            className={cn("mx-auto size-12", IconClass)}
          />
        ) : (
          children
        )}

        <div className="space-y-2">
          <h2 className="text-3xl font-semibold text-text-primary">{title}</h2>
          <p className="mt-1 text-sm leading-relaxed text-text-secondary">
            {message}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Info
