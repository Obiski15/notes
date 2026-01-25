import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "bg-surface-surface flex h-9 w-full rounded-md border border-border px-3 py-1 text-base shadow-sm transition-all duration-200",
          "text-text-primary placeholder:text-text-tertiary",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-text-primary",
          "hover:border-border-focus",
          "focus-visible:border-border-focus focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface-background",
          "disabled:cursor-not-allowed disabled:bg-state-disabled-bg disabled:text-state-disabled-text disabled:opacity-50",
          "aria-[invalid=true]:border-border-error aria-[invalid=true]:focus-visible:ring-border-error",
          "md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
