import { Skeleton } from "../ui/skeleton"

function Loader() {
  return (
    <div className="space-y-5">
      {Array.from({ length: 5 }, (_, i) => (
        <Skeleton key={i} className="h-24 w-full rounded-sm" />
      ))}
    </div>
  )
}

export default Loader
