import Image from "next/image"

import { cn } from "@/lib/utils"

function Spinner({ className }: { className?: string }) {
  return (
    <Image
      className={cn("size-5", className)}
      src="/icons/loading.svg"
      alt="loading"
      width={20}
      height={20}
    />
  )
}

export default Spinner
