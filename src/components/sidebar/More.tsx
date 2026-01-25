"use client"

import { ForwardRefExoticComponent, RefAttributes } from "react"
import { INoteStatus } from "@/services/serviceTypes"
import { Archive, LucideProps, Star, Trash } from "lucide-react"

import { cn } from "@/lib/utils"
import { useNoteLocation } from "@/hooks/useNoteLocation"

import CustomIcon from "../shared/CustomIcon"
import Heading from "./heading"

const content: {
  status: INoteStatus
  name: string
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >
}[] = [
  { name: "favorites", status: "favorites", Icon: Star },
  { name: "trash", status: "trash", Icon: Trash },
  { name: "archived notes", status: "archive", Icon: Archive },
]

function More() {
  const { setStatus, setFolder, status } = useNoteLocation()

  return (
    <div className="space-y-2">
      <Heading heading="more" />
      {content.map((value, index) => {
        const isActive = status === value.status
        return (
          <button
            key={index}
            onClick={() => {
              setStatus(value.status)
              setFolder({ name: "", _id: "" })
            }}
            className={cn(
              "flex w-full items-center justify-start gap-3 rounded-md px-5 py-2.5 transition-all duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface-background",
              isActive
                ? "bg-state-active text-text-primary"
                : "bg-transparent text-text-secondary hover:bg-state-hover hover:text-text-primary active:bg-state-active"
            )}
            aria-label={`View ${value.name}`}
            aria-pressed={isActive}
          >
            <CustomIcon
              Icon={value.Icon}
              className={cn(
                "transition-colors duration-200",
                isActive ? "text-primary" : "text-text-tertiary"
              )}
            />
            <p className="font-medium capitalize">{value.name}</p>
          </button>
        )
      })}
    </div>
  )
}

export default More
