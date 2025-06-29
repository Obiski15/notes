import { Skeleton } from "../ui/skeleton"

function Loader() {
  return (
    <div className="space-y-7">
      <div className="flex w-full items-center justify-between">
        <Skeleton className="h-10 w-full max-w-[457px]" />
        <Skeleton className="size-10 flex-shrink-0 rounded-full" />
      </div>

      <div className="space-y-4">
        <div className="flex w-full items-center justify-start gap-8">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-5 w-16" />
        </div>

        <div className="flex w-full items-center justify-start gap-8">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-5 w-16" />
        </div>
      </div>

      <div className="flex w-full items-center justify-start gap-7">
        <div className="flex items-center justify-start gap-2">
          <Skeleton className="size-5 rounded-sm" />
          <Skeleton className="size-5 rounded-sm" />
          <Skeleton className="size-5 rounded-sm" />
          <Skeleton className="size-5 rounded-sm" />
        </div>
        <div className="flex items-center justify-start gap-2">
          <Skeleton className="size-5 rounded-sm" />
          <Skeleton className="size-5 rounded-sm" />
          <Skeleton className="size-5 rounded-sm" />
        </div>

        <div className="flex items-center justify-start gap-2">
          <Skeleton className="size-5 rounded-sm" />
          <Skeleton className="size-5 rounded-sm" />
          <Skeleton className="size-5 rounded-sm" />
          <Skeleton className="size-5 rounded-sm" />
        </div>
      </div>

      <Skeleton className="h-[500px] w-full" />
    </div>
  )
}

export default Loader
