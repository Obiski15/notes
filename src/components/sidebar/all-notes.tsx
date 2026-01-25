"use client"

import { NOTESTATUS } from "@/types"
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
          "flex w-full items-center justify-between gap-3 py-2.5 transition-all duration-200",
          status === NOTESTATUS.ACTIVE
            ? "bg-state-active shadow-sm ring-2 ring-primary/20"
            : "hover:bg-state-hover active:bg-state-active"
        )}
        onClick={() => {
          setStatus(NOTESTATUS.ACTIVE)
          setFolder({ name: "", _id: "" })
        }}
        aria-label="View all notes"
        aria-pressed={status === NOTESTATUS.ACTIVE}
      >
        <div className="flex flex-1 items-center justify-start gap-3">
          <CustomIcon Icon={Home} className="text-primary" />
          <span className="flex-1 text-left font-medium">All Notes</span>
        </div>

        <CustomIcon Icon={ChevronRight} className="text-text-tertiary" />
      </Button>
    </CompWrapper>
  )
}

export default AllNotes
