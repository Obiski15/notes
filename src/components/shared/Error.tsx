import { Info } from "lucide-react"

import { Button } from "../ui/button"
import CustomIcon from "./CustomIcon"

interface Props {
  title?: string
  message?: string
  onRetry?: () => void
}

const ErrorState = ({
  title = "Something went wrong",
  message = "We encountered an error while processing your request.",
  onRetry,
}: Props) => {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="space-y-2.5 rounded-lg p-6 text-center shadow-sm">
        <CustomIcon Icon={Info} className="mx-auto size-12 text-destructive" />

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-destructive">{title}</h2>
          <p className="mt-1 text-sm text-destructive/90">{message}</p>
        </div>

        {onRetry && (
          <Button variant="destructive" className="mx-auto" onClick={onRetry}>
            Retry
          </Button>
        )}
      </div>
    </div>
  )
}

export default ErrorState
