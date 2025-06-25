"use client"

import { Archive, Star, Trash } from "lucide-react"

import Content from "./Content"
import Heading from "./heading"

const dummy = [
  { name: "favorites", Icon: Star },
  { name: "trash", Icon: Trash },
  { name: "archived notes", Icon: Archive },
]

function More() {
  return (
    <div className="space-y-2">
      <Heading>more</Heading>
      <Content
        data={dummy}
        cb={(value, index) => (
          <button
            key={index}
            onClick={() => {}}
            className="flex w-full items-center justify-start gap-[15px] px-5 py-2.5"
          >
            <value.Icon className="size-5 text-foreground" />
            <p className="font-semibold capitalize text-foreground/60">
              {value.name}
            </p>
          </button>
        )}
      />
    </div>
  )
}

export default More
