import { Archive, CircleEllipsis, Star, Trash } from "lucide-react"

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"

function NoteOptions() {
  return (
    <Popover>
      <PopoverTrigger>
        <CircleEllipsis className="size-5" />
      </PopoverTrigger>

      <PopoverContent className="w-full max-w-[200px] space-y-5 border-none bg-secondary p-[15px]">
        <button className="flex w-full items-center justify-start gap-[15px]">
          <Star className="size-5" />
          <p>Add to favorites</p>
        </button>

        <div>
          <div className="pb-5">
            <button className="flex w-full items-center justify-start gap-[15px] border-b border-b-[#FFFFFF0D]">
              <Archive className="size-5" />
              <p>Archive</p>
            </button>
          </div>
          <div className="pt-5">
            <button className="flex w-full items-center justify-start gap-[15px]">
              <Trash className="size-5" />
              <p>Move to trash</p>
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default NoteOptions
