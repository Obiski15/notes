import { Skeleton } from "../ui/skeleton"

function Loader({ count = 3 }: { count: number }) {
  return (
    <div className="mx-5 space-y-2" aria-label="Loading..." role="status">
      {Array.from({ length: count }, (_, i) => (
        <Skeleton key={i} className="h-10 w-full rounded-md" />
      ))}
    </div>
  )
}

export default Loader
