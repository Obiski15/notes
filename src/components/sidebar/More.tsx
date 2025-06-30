"use client"

import { ForwardRefExoticComponent, RefAttributes } from "react"
import { INoteStatus } from "@/services/serviceTypes"
import { Archive, LucideProps, Star, Trash } from "lucide-react"

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
  const { setStatus, setFolder } = useNoteLocation()

  return (
    <div className="space-y-2">
      <Heading heading="more" />
      {content.map((value, index) => (
        <button
          key={index}
          onClick={() => {
            setStatus(value.status)
            setFolder({ name: "", _id: "" })
          }}
          className="flex w-full items-center justify-start gap-3.5 px-5 py-2.5"
        >
          <CustomIcon Icon={value.Icon} />
          <p className="font-semibold capitalize text-foreground/60">
            {value.name}
          </p>
        </button>
      ))}
    </div>
  )
}

export default More
