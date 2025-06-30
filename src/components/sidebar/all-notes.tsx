"use client"

import { ChevronRight, Home } from "lucide-react"

import { cn } from "@/lib/utils"
import { useNoteLocation } from "@/hooks/useNoteLocation"

import CustomIcon from "../shared/CustomIcon"
import { Button } from "../ui/button"
import CompWrapper from "./CompWrapper"

function AllNotes() {
  const { setFolder, setStatus, status } = useNoteLocation()

  return (
    <CompWrapper>
      <Button
        variant="secondary"
        className={cn(
          "flex w-full items-center justify-between gap-2 py-3",
          status === "active"
            ? "shadow-sm ring-1 ring-inset ring-foreground/10"
            : ""
        )}
        onClick={() => {
          setStatus("active")
          setFolder({ name: "", _id: "" })
        }}
      >
        <div className="flex flex-1 items-center justify-start gap-2">
          <CustomIcon Icon={Home} className="text-primary" />
          <span className="flex-1 text-left">All Notes</span>
        </div>

        <CustomIcon Icon={ChevronRight} />
      </Button>
    </CompWrapper>
  )
}

export default AllNotes
