import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { LucideProps } from "lucide-react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary-hover active:bg-primary-active focus-visible:ring-primary-focus",
        destructive:
          "bg-error text-primary-foreground shadow-sm hover:bg-error-hover active:bg-error-active focus-visible:ring-error",
        outline:
          "border border-border bg-transparent shadow-sm hover:bg-state-hover active:bg-state-active focus-visible:ring-border-focus",
        secondary:
          "bg-neutral-700 text-secondary-foreground shadow-sm hover:bg-neutral-600 active:bg-neutral-500 focus-visible:ring-neutral-600",
        ghost:
          "hover:bg-state-hover active:bg-state-active focus-visible:ring-border-focus",
        link: "text-primary underline-offset-4 hover:underline focus-visible:ring-primary-focus",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  Icon?: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >
  IconPosition?: "left" | "right"
  containerClass?: string
}

const IconComponent = ({ Icon }: { Icon: ButtonProps["Icon"] }) => {
  return Icon && <Icon className="size-5 group-disabled:opacity-50" />
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      children,
      asChild,
      Icon,
      IconPosition,
      containerClass,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"
    return (
      <div
        className={cn("flex items-center justify-start gap-2", containerClass)}
      >
        <Comp
          className={cn("group", buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          {Icon && IconPosition === "left" && <IconComponent Icon={Icon} />}
          {children}
          {Icon && IconPosition === "right" && <IconComponent Icon={Icon} />}
        </Comp>
      </div>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
