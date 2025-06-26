"use client"

import { ForwardRefExoticComponent, RefAttributes } from "react"
import { INoteStatus } from "@/services/serviceTypes"
import { Archive, LucideProps, Star, Trash } from "lucide-react"

import { useNoteLocation } from "@/hooks/useNoteLocation"

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
  const { setStatus, setFolder } = useNoteLocation()

  return (
    <div className="space-y-2">
      <Heading>more</Heading>
      {content.map((value, index) => (
        <button
          key={index}
          onClick={() => {
            setStatus(value.status)
            setFolder({ name: "", _id: "" })
          }}
          className="flex w-full items-center justify-start gap-[15px] px-5 py-2.5"
        >
          <value.Icon className="size-5 text-foreground" />
          <p className="font-semibold capitalize text-foreground/60">
            {value.name}
          </p>
        </button>
      ))}
    </div>
  )
}

export default More
